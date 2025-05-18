# Mobile-Expenses – Prosty Menadżer Wydatków (PWA)

Mobile-Expenses to lekka aplikacja webowa z funkcjonalnością Progressive Web App (PWA). Pozwala na szybkie dodawanie wydatków, przeglądanie bieżących list oraz podsumowań, przy jednoczesnym działaniu offline dzięki wykorzystaniu Service Workera. Projekt jest stworzony z myślą o użytkownikach mobilnych oraz desktopowych, dbając o responsywność, wydajność i intuicyjność interfejsu.

---

## Funkcje

- **Dodawanie wydatków:** Wprowadzanie kwoty, kategorii i opisu wydatku w zaledwie kilku kliknięciach.
- **Podsumowanie:** Szybkie obliczanie całkowitych wydatków oraz przeglądanie podsumowania według kategorii.
- **Historia wydatków:** Przeglądanie listy ostatnich wpisów z datą, kwotą, kategorią i opisem.
- **Tryb offline:** Aplikacja działa nawet bez połączenia z Internetem dzięki pre-cachingowi zasobów i strategii stale-while-revalidate.
- **Instalacja jako PWA:** Umożliwia instalację na urządzeniach mobilnych, zapewniając wygląd i działanie natywnej aplikacji.

---

## Instalacja & Quick Start

### Wymagania

- Python 3
- SQLite
- Node.js (opcjonalnie, do testowania frontendu przy użyciu prostego serwera)

### Backend (Flask + SQLite)

1. Przejdź do katalogu backend:
   ```bash
   cd backend

   2. Utwórz wirtualne środowisko i aktywuj je:
python -m venv venv
# Windows
venv\Scripts\activate
# Unix/MacOS
source venv/bin/activate

3. Zainstaluj zależności:
pip install -r requirements.txt

4. Uruchom aplikację:
python app.py

Aplikacja backendowa będzie dostępna pod adresem http://localhost:8000.

Frontend

1. Przejdź do katalogu frontend:
cd ../frontend

2. Uruchom prosty serwer statyczny (np. za pomocą Pythona):
python -m http.server 3000

3. Otwórz przeglądarkę i przejdź do: 
http://localhost:3000


--------------------------------------------------------


Przykłady użycia
Dodawanie wydatku: Wypełnij formularz na stronie głównej, wpisując kwotę, kategorię i (opcjonalnie) opis, a następnie kliknij przycisk "Dodaj".
Przeglądanie historii: Po dodaniu wydatków, lista ostatnich wpisów oraz podsumowanie pojawią się poniżej formularza.
Offline: Odłącz się od sieci i odśwież stronę – aplikacja nadal powinna wyświetlać ostatnio zbuforowane dane oraz komunikat o braku połączenia (offline.html).
Technologie
Backend: Flask 3, SQLite
Zapewnia prosty REST API do obsługi dodawania, przeglądania i podsumowania wydatków.

Frontend: HTML, CSS (Bootstrap 5), Vanilla JavaScript
Interfejs użytkownika został zaprojektowany z myślą o responsywności oraz łatwości użytkowania, wspierając instalację jako PWA.

PWA: Service Worker (sw.js) oraz manifest webowy (manifest.webmanifest) zapewniają wsparcie dla trybu offline oraz instalację na urządzeniach mobilnych.

Mobile Usage
Aplikacja jest testowana na smartfonach (Android/iOS).
Priorytet: responsywność, łatwa obsługa dotykiem, wysoka wydajność, instalacja jako PWA (Progressive Web App).
Znane problemy: [wymień jeśli są]
<input checked="" disabled="" type="checkbox"> Dodano manifest.webmanifest i service-worker.js dla wsparcia mobilnego.
Dla Codex/AI
Test responsywności: Przetestuj interfejs na urządzeniach mobilnych (Android/iOS) i upewnij się, że elementy są dobrze skalowane i intuicyjne w obsłudze.
Ocena użyteczności: Wypisz funkcje, które są nieintuicyjne lub powodują problemy w użyciu na smartfonie.
Sugestie zmian: Zasugeruj modyfikacje interfejsu, które mogą poprawić komfort użytkowania i zmniejszyć frustrację podczas korzystania z aplikacji.
Test trybu offline: Sprawdź działanie aplikacji w trybie offline i funkcjonowanie service workera.
Checklist:
<input disabled="" type="checkbox"> Czy aplikacja jest gotowa do instalacji jako PWA?
<input disabled="" type="checkbox"> Czy interfejs jest responsywny i przyjazny w dotykowej obsłudze?
<input disabled="" type="checkbox"> Czy wykryto i rozwiązano problemy z wydajnością na urządzeniach mobilnych?
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
