# Helper.md - Przewodnik instalacji i uruchomienia Code Runner Online

## Opis aplikacji

Code Runner Online to aplikacja webowa umożliwiająca uruchamianie kodu w językach Python i JavaScript bezpośrednio w przeglądarce. Aplikacja składa się z:

- **Frontend (React + Vite)**: Interfejs użytkownika z edytorem kodu Monaco
- **Backend (Node.js + Express)**: Serwer do wykonywania kodu i komunikacji WebSocket
- **Socket.io**: Komunikacja w czasie rzeczywistym dla wyników wykonania

## Wymagania systemowe

### Podstawowe wymagania:
- **Node.js**: wersja 18.0 lub nowsza (zalecana 20+)
- **npm**: wersja 8.0 lub nowsza (zwykle dostarczana z Node.js)
- **Python**: wersja 3.8 lub nowsza (dla uruchamiania kodu Python)

### Sprawdzenie wersji:
```bash
node --version    # Powinno pokazać v18.0+ lub nowsze
npm --version     # Powinno pokazać 8.0+ lub nowsze
python3 --version # Powinno pokazać Python 3.8+ lub nowsze
```

## Instrukcja instalacji

### 1. Klonowanie repozytorium
```bash
git clone https://github.com/Fervv268/ProTek_v22.git
cd ProTek_v22
```

### 2. Instalacja zależności
```bash
# Instalacja wszystkich zależności (frontend + backend)
npm install

# Jeśli wystąpią problemy, zainstaluj zależności backend osobno:
npm install express socket.io body-parser cors
```

### 3. Budowanie aplikacji frontend
```bash
# Budowanie produkcyjnej wersji frontend
npm run build

# Opcjonalnie: tryb deweloperski z hot-reload
npm run dev
```

### 4. Test instalacji (opcjonalnie)
```bash
# Sprawdź czy wszystko zostało poprawnie zainstalowane
./test-install.sh
```

## Uruchamianie aplikacji

### Metoda 1: Uruchomienie serwera backend (zalecana)
```bash
# Uruchomienie serwera backend na porcie 3000
node server.js
```

Serwer będzie dostępny pod adresem: `http://localhost:3000`

### Metoda 2: Tryb deweloperski frontend
```bash
# W pierwszym terminalu - uruchom backend
node server.js

# W drugim terminalu - uruchom frontend dev server
npm run dev
```

Frontend dev server będzie dostępny pod adresem: `http://localhost:5173`

## Korzystanie z aplikacji

1. **Otwórz przeglądarkę** i przejdź na odpowiedni adres
2. **Wybierz język programowania** (Python lub JavaScript)
3. **Napisz kod** w edytorze Monaco
4. **Kliknij "Uruchom kod"** aby wykonać program
5. **Zobacz wyniki** w panelu wyjścia po prawej stronie

### Przykłady kodu:

**Python:**
```python
print("Hello, World!")
for i in range(5):
    print(f"Liczba: {i}")
```

**JavaScript:**
```javascript
console.log("Hello, World!");
for (let i = 0; i < 5; i++) {
    console.log(`Liczba: ${i}`);
}
```

## Struktura projektu

```
ProTek_v22/
├── src/                 # Kod źródłowy frontend
│   ├── main.jsx        # Punkt wejścia React
│   └── App.jsx         # Główny komponent aplikacji
├── dist/               # Zbudowana wersja frontend (po npm run build)
├── node_modules/       # Zainstalowane zależności
├── server.js           # Serwer backend
├── package.json        # Konfiguracja i zależności
├── vite.config.js      # Konfiguracja Vite
├── index.html          # Główny plik HTML
└── Helper.md           # Ten przewodnik
```

## Konfiguracja portów

### Domyślne porty:
- **Backend**: 3000 (można zmienić przez zmienną środowiskową `PORT`)
- **Frontend dev**: 5173 (konfigurowane przez Vite)

### Zmiana portu backend:
```bash
# Linux/Mac
PORT=8080 node server.js

# Windows
set PORT=8080 && node server.js
```

## Rozwiązywanie problemów

### Problem: "Cannot find module 'express'"
**Rozwiązanie:**
```bash
npm install express socket.io body-parser cors
```

### Problem: Frontend nie łączy się z backend
**Sprawdź:**
1. Czy serwer backend działa (`http://localhost:3000`)
2. Czy w konsoli przeglądarki nie ma błędów CORS
3. Czy adres w `src/App.jsx` jest poprawny

### Problem: "Python not found" przy uruchamianiu kodu Python
**Rozwiązanie:**
```bash
# Sprawdź czy Python jest zainstalowany
python3 --version

# Jeśli nie, zainstaluj Python:
# Ubuntu/Debian: sudo apt install python3
# macOS: brew install python3
# Windows: Pobierz z python.org
```

### Problem: Błędy podczas budowania
**Rozwiązanie:**
```bash
# Wyczyść cache i zainstaluj ponownie
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Dodatkowe funkcje

### Zmienne środowiskowe:
- `PORT`: Port serwera backend (domyślnie 3000)
- `NODE_ENV`: Środowisko (development/production)

### Logi serwera:
Serwer loguje informacje o:
- Połączeniach klientów
- Wykonywanych żądaniach
- Błędach wykonania kodu

## Bezpieczeństwo

⚠️ **UWAGA**: Ta aplikacja wykonuje kod bezpośrednio na serwerze. W środowisku produkcyjnym należy:

1. Uruchomić w kontenerze (Docker)
2. Ograniczyć uprawnienia użytkownika
3. Dodać timeout dla wykonywania kodu
4. Ograniczyć dostępne funkcje systemowe
5. Dodać autoryzację użytkowników

## Wsparcie i rozwój

Jeśli napotkasz problemy:
1. Sprawdź czy spełniasz wymagania systemowe
2. Przeczytaj sekcję rozwiązywania problemów
3. Sprawdź logi w konsoli przeglądarki i terminalu
4. Utwórz issue w repozytorium GitHub

## Licencja

Projekt dostępny na zasadach licencji określonej w repozytorium.