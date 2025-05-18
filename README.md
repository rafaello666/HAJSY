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