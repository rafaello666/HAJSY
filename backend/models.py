import sqlite3

def init_db():
    conn = sqlite3.connect('expenses.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount REAL NOT NULL,
            category TEXT NOT NULL,
            note TEXT,
            ts TEXT DEFAULT (datetime('now', 'localtime'))
        )
    ''')
    conn.commit()
    conn.close()

def execute(query, args=()):
    conn = sqlite3.connect('expenses.db')
    c = conn.cursor()
    c.execute(query, args)
    conn.commit()
    conn.close()

def fetchall(query, args=()):
    conn = sqlite3.connect('expenses.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute(query, args)
    rows = c.fetchall()
    conn.close()
    return rows

def fetchone(query, args=()):
    conn = sqlite3.connect('expenses.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute(query, args)
    row = c.fetchone()
    conn.close()
    return row
