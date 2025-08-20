#!/bin/bash
# Test script dla Helper.md - sprawdza czy instalacja działa poprawnie

echo "🧪 Test instalacji Code Runner Online..."

# Test 1: Sprawdź Node.js
echo "📋 Sprawdzanie Node.js..."
if command -v node >/dev/null 2>&1; then
    node_version=$(node --version)
    echo "✅ Node.js: $node_version"
else
    echo "❌ Node.js nie jest zainstalowany"
    exit 1
fi

# Test 2: Sprawdź npm
echo "📋 Sprawdzanie npm..."
if command -v npm >/dev/null 2>&1; then
    npm_version=$(npm --version)
    echo "✅ npm: $npm_version"
else
    echo "❌ npm nie jest zainstalowany"
    exit 1
fi

# Test 3: Sprawdź Python
echo "📋 Sprawdzanie Python..."
if command -v python3 >/dev/null 2>&1; then
    python_version=$(python3 --version)
    echo "✅ Python: $python_version"
else
    echo "⚠️  Python3 nie jest zainstalowany - kod Python nie będzie działał"
fi

# Test 4: Sprawdź zależności
echo "📋 Sprawdzanie zależności..."
if [ -d "node_modules" ]; then
    echo "✅ node_modules istnieje"
else
    echo "❌ Uruchom: npm install"
    exit 1
fi

# Test 5: Test budowania
echo "📋 Test budowania..."
if npm run build >/dev/null 2>&1; then
    echo "✅ Budowanie przebiegło pomyślnie"
else
    echo "❌ Błąd podczas budowania"
    exit 1
fi

# Test 6: Sprawdź czy dist istnieje
if [ -d "dist" ]; then
    echo "✅ Folder dist został utworzony"
else
    echo "❌ Folder dist nie został utworzony"
    exit 1
fi

echo ""
echo "🎉 Wszystkie testy przeszły pomyślnie!"
echo "📖 Przeczytaj Helper.md aby uruchomić aplikację"