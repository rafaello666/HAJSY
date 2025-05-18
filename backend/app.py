"""
MINI-apka „Wydatki” – Dodaj + Wyczyść historię (lista Ostatnie wpisy).
• Flask + SQLite   (pip install flask)
• Uruchom: python app.py
"""

import sqlite3
import os
from flask import Flask, request, redirect, url_for, render_template_string, jsonify
from flask_cors import CORS

DB = os.environ.get("DB_PATH", "expenses.db")
app = Flask(__name__)
CORS(app)
# ---------- BAZA ----------
def init_db():
    with sqlite3.connect(DB) as c:
        c.execute("""
            CREATE TABLE IF NOT EXISTS expenses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                amount   REAL NOT NULL,
                category TEXT NOT NULL,
                note     TEXT,
                ts       TEXT NOT NULL DEFAULT (datetime('now','localtime'))
            )
        """)

def add_expense(a, cat, note):
    with sqlite3.connect(DB) as c:
        c.execute("INSERT INTO expenses (amount, category, note) VALUES (?,?,?)",
                  (a, cat, note))

def clear_expenses():
    with sqlite3.connect(DB) as c:
        c.execute("DELETE FROM expenses")

def list_expenses():
    with sqlite3.connect(DB) as c:
        c.row_factory = sqlite3.Row
        return c.execute("SELECT * FROM expenses ORDER BY ts DESC").fetchall()

def summary():
    with sqlite3.connect(DB) as c:
        tot  = c.execute("SELECT SUM(amount) FROM expenses").fetchone()[0] or 0
        cats = c.execute("SELECT category, SUM(amount) FROM expenses GROUP BY category").fetchall()
        return tot, cats

init_db()

# ---------- HTML ----------
HTML = """
<!doctype html><html lang=pl>
<head>
<meta charset=utf-8><title>Wydatki mini</title>
<style>
 body{font-family:sans-serif;max-width:600px;margin:2rem auto}
 table{border-collapse:collapse;width:100%}td,th{border:1px solid #ccc;padding:.4rem}
 form div{margin:.5rem 0}input{padding:.3rem}
 button{cursor:pointer}
</style>
</head><body>
  <h1>📒 Wydatki (mini)</h1>

  <!-- FORMULARZ DODAWANIA -->
  <h2>Dodaj</h2>
  <form method="post" action="{{ url_for('add') }}">
    <div>Kwota PLN: <input name=amount type=number step=0.01 required></div>
    <div>Kategoria: <input name=category required></div>
    <div>Notatka (opc.): <input name=note></div>
    <button>Dodaj</button>
  </form>

  <!-- PRZYCISK CZYSZCZENIA -->
  <h2>Akcje</h2>
  <form method="post" action="{{ url_for('clear') }}">
    <button style="background:#e74c3c;color:#fff">Wyczyść historię (Ostatnie wpisy)</button>
  </form>

  <!-- PODSUMOWANIE -->
  <h2>Podsumowanie</h2>
  <p><b>Suma:</b> {{ total|round(2) }} PLN</p>
  <ul>
    {% for cat,sum in cats %}<li>{{ cat }} – {{ "%.2f"|format(sum) }} PLN</li>{% endfor %}
  </ul>

  <!-- LISTA WYDATKÓW -->
  <h2>Ostatnie wpisy</h2>
  <table>
    <tr><th>Data</th><th>Kwota</th><th>Kategoria</th><th>Notatka</th></tr>
    {% for r in rows %}
      <tr>
        <td>{{ r['ts'][:10] }}</td>
        <td>{{ "%.2f"|format(r['amount']) }}</td>
        <td>{{ r['category'] }}</td>
        <td>{{ r['note'] }}</td>
      </tr>
    {% endfor %}
  </table>
</body></html>
"""

# ---------- ROUTES ----------
@app.route("/")
def home():
    total, cats = summary()
    return render_template_string(HTML, rows=list_expenses(), total=total, cats=cats)

@app.post("/add")
def add():
    a   = request.form.get("amount", type=float)
    cat = request.form.get("category","").strip()
    note= request.form.get("note","").strip()
    if a and cat:
        add_expense(a, cat, note)
    return redirect(url_for("home"), code=303)

@app.post("/clear")
def clear():
    clear_expenses()           # kasuje wszystkie wpisy ⇒ lista pusta
    return redirect(url_for("home"), code=303)

# ---------- RUN ----------
# ---------- API ----------

@app.get("/api/expenses")
def api_get_expenses():
    rows = [dict(r) for r in list_expenses()]
    return jsonify(rows)


@app.post("/api/expenses")
def api_add_expense():
    data = request.get_json(silent=True) or {}
    amount = data.get("amount")
    category = (data.get("category") or "").strip()
    note = (data.get("note") or "").strip()
    if amount is None or not category:
        return jsonify({"error": "bad request"}), 400
    add_expense(float(amount), category, note)
    return jsonify({"status": "ok"})


@app.get("/api/summary")
def api_summary_view():
    tot, cats = summary()
    data = {
        "total": tot,
        "by_category": [
            {"category": c[0], "sum": c[1]} for c in cats
        ],
    }
    return jsonify(data)


if __name__ == "__main__":
        host = os.getenv("APP_HOST", "127.0.0.1")
    port = int(os.getenv("PORT", os.getenv("APP_PORT", 8000)))
    debug = os.getenv("DEBUG", "False").lower() == "true"
    app.run(host=host, port=port, debug=debug)
