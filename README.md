 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/README.md b/README.md
index c9025a0..4b4c59b 100644
--- a/README.md
+++ b/README.md
@@ -21,131 +21,119 @@ Lekka aplikacja **web + PWA** pozwalająca z telefonu lub komputera:
 | **Offline-First** (cache-first + stale-while-revalidate) | Prosty plik DB – brak zewnętrznego silnika |
 | Tryb ciemny ⬛/⬜ (adapt. CSS) | CORS dla SPA / lokalnego dev |
 
 ---
 
 ## 🗂️ Struktura repozytorium
 
 mobile-expenses/
 ├── backend/
 │ ├── app.py # główny plik Flask
 │ ├── models.py # prosty wrapper SQLite
 │ ├── schema.sql # definicja tabeli
 │ └── requirements.txt
 ├── frontend/
 │ ├── index.html
 │ ├── app.js
 │ ├── style.css
 │ ├── sw.js # Service Worker
 │ ├── offline.html
 │ ├── manifest.webmanifest
 │ └── icons/
 │ ├── icon-192.png
 │ └── icon-512.png
 └── README.md # <— ten plik
 
-yaml
-Kopiuj
-Edytuj
-
 ---
 
 ## 🚀 Szybki start (tryb deweloperski)
 
 ### 1. Backend – Flask + SQLite
 
 ```bash
 cd backend
 python -m venv venv && source venv/bin/activate   # Windows -> venv\Scripts\activate
 pip install -r requirements.txt
 python app.py            # API rusza na http://localhost:8000/
-2. Frontend – statyczny serwer
-bash
-Kopiuj
-Edytuj
+```
+### 2. Frontend – statyczny serwer
+```bash
 cd ../frontend
 python -m http.server 3000        # lub inny prosty serwer statyczny
 # Otwórz w przeglądarce: http://localhost:3000
 Telefon w tej samej sieci Wi-Fi?
 Wejdź na http://<IP-Twojego-komputera>:3000 i dodaj aplikację “Do ekranu głównego”.
+```
 
 🐳 Uruchomienie produkcyjne (Docker Compose)
-yaml
-Kopiuj
-Edytuj
+```yaml
 # docker-compose.yml (przykład)
 version: "3"
 
 services:
   backend:
     build: ./backend
     ports: ["8000:8000"]
 
   frontend:
     image: nginx:alpine
     volumes:
       - ./frontend:/usr/share/nginx/html:ro
     ports: ["80:80"]
-bash
-Kopiuj
-Edytuj
+```
+```bash
 docker compose up --build
+```
 Backend działa na :8000, pliki statyczne serwuje Nginx na :80.
 
 🔌 API reference
 Endpoint	Metoda	Body / Query	Odpowiedź
 /api/expenses	GET	–	[{id, amount, category, note, ts}, …]
 POST	{amount, category, note?}	{status:"ok"}
 /api/summary	GET	–	{total, by_category:[{category,sum}]}
 
 Timestamp (ts) w formacie ISO UTC.
 
 Kwoty przyjmowane jako number (PLN, separator kropka).
 
 📲 Progressive Web App
 manifest.webmanifest – nazwa, kolory, ikony (192 px / 512 px).
 
 sw.js –
 
 Pre-cache zasobów statycznych
 
 Strategie:
 
 cache-first dla HTML/CSS/JS
 
 stale-while-revalidate dla /api/*
 
 offline.html jako fallback przy braku sieci
 
 Limit dynamicznego cache’u → 60 obiektów
 
 Po instalacji użytkownik uruchamia aplikację jak natywną, offline w tunelach 🚇 też zadziała.
 
 🛡️ Bezpieczeństwo
 Headers Content-Type: application/json.
 
 Dane z formularza renderowane wyłącznie przez textContent (brak XSS).
 
 W przypadku utraty sieci zamiast błędu mamy komunikat “Offline”.
 
 CORS ograniczony do developmentu (Flask-CORS w trybie prod można wyłączyć).
 
 ➕ Rozwój & TODO
 👤 Autoryzacja użytkowników (JWT)
 
 📈 Wykresy (Chart.js) dzienne/tygodniowe
 
 📨 Web Push: alert, gdy zbliżasz się do limitu budżetu
 
-☁️ Deploy GitHub → Railway/Render (CI CD)
-
-🏷️ OCR paragonu (Tesseract JS) dla ekspresowego dodawania wydatku ze zdjęcia
-
-🗄️ Eksport CSV/XLSX (endpoint /export)
-
 PR-y mile widziane!
 
 📝 Licencja
 Projekt udostępniany na licencji MIT – korzystaj, modyfikuj, dawaj znać o problemach.
 
 Miłego ogarniania hajsu!
-Jeśli pojawią się pytania lub pomysły na usprawnienia – otwórz issue lub skontaktuj się bezpośrednio.
+Jeśli pojawią się pytania lub pomysły na usprawnienia – otwórz issue lub skontaktuj się bezpośrednio.
 
EOF
)
