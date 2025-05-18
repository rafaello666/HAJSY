# Agents Guidelines

## Wskazówki dla AI i ludzi

### Konwencje kodu
- Używaj jednolitego formatowania oraz czytelnych nazw zmiennych i funkcji.
- Stosuj zasady DRY (Don't Repeat Yourself) i KISS (Keep It Simple, Stupid).
- Komentarze są mile widziane tam, gdzie logika może być nieoczywista.

### Organizacja katalogów
- Pliki backendowe umieszczaj w katalogu `backend`.
- Pliki frontendowe umieszczaj w katalogu `frontend`.
- Dokumentację, zasoby graficzne i konfiguracje trzymaj w dedykowanych folderach lub w głównym katalogu projektu.

### Styl commitów
- Commity powinny być krótkie, zwięzłe i opisowe.
- Używaj trybu rozkazującego w komunikatach (np. „Dodaj funkcję …”, „Popraw błąd …”).
- Jeżeli dotyczy dokumentacji, poprzedź commit tagiem `docs:`.

### Dobry workflow
- Pracuj na oddzielnych branchach dla nowych funkcji lub poprawek.
- Regularnie synchronizuj zmiany z gałęzią główną, aby unikać konfliktów.
- Przejrzyj i przetestuj kod (code review) przed scaleniem zmian do głównego repozytorium.

### Reguły testowania
- Pisz testy jednostkowe oraz end-to-end (E2E) dla istotnych funkcjonalności.
- Upewnij się, że wszystkie testy przechodzą przed wdrożeniem zmian.
- Wykorzystuj narzędzia CI/CD do automatyzacji testów i deploymentu.

---

## Mobile-First / PWA

- **Responsywność:**  
  Kod frontendu MUSI być responsywny. Zaleca się użycie frameworków takich jak Bootstrap lub Tailwind, lub implementację własnych media queries, aby zapewnić poprawne wyświetlanie na różnych urządzeniach.

- **Testowanie na urządzeniach mobilnych:**  
  Aby sprawdzić działanie aplikacji na urządzeniu mobilnym:
  - Uruchom komendę testową:
    ```bash
    npm run test:e2e
    ```
    (Testy E2E wykonane przy użyciu Cypress.)
  - Testuj aplikację na emulatorze Chrome Mobile lub przy użyciu DevTools, aby upewnić się, że interfejs jest intuicyjny i łatwy w obsłudze dotykiem.

- **Funkcjonalność i komfort użytkowania:**  
  Funkcjonalność aplikacji powinna być identyczna lub lepsza na telefonie niż na desktopie. Upewnij się, że:
  - Wszystkie elementy interfejsu są zoptymalizowane pod kątem dotykowej obsługi.
  - Nawigacja i układ treści są dostosowane do mniejszych ekranów.
  - Tryb offline (PWA) działa poprawnie, umożliwiając korzystanie z aplikacji bez stałego połączenia z Internetem.

# AGENTS.md
