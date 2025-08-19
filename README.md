# Instrukcja instalacji

## Backend (`replit-like-online/backend`)

1. Przejdź do katalogu `replit-like-online/backend`.
2. Zainstaluj zależności:
   ```
   npm install
   ```
3. Uruchom backend w trybie deweloperskim:
   ```
   npm run dev
   ```
4. Endpoint `/run` przyjmuje JSON `{ "lang", "code" }` i zwraca `{ "jobId" }`.
5. Wyniki są streamowane po WebSocket do subskrybowanego `jobId`.

## Frontend (`replit-like-online/frontend`)

1. Przejdź do katalogu `replit-like-online/frontend`.
2. Utwórz plik `.env` z zawartością:
   ```
   VITE_API_URL=https://adres-backendu
   ```
   *(Podstaw adres swojego backendu)*
3. Zainstaluj zależności:
   ```
   npm install
   ```
4. Uruchom frontend lokalnie:
   ```
   npm run dev
   ```
   *(Uruchamia lokalny serwer Vite)*
5. Po wdrożeniu na Vercel możesz dodać aplikację do ekranu głównego w Chrome.

---

**Wymagania**: Node.js (zalecana najnowsza LTS), npm.
