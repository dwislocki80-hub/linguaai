# LinguaAI — uruchomienie

## Wymagania
- Node.js w wersji 18 lub nowszej (sprawdzisz poleceniem `node --version`)
- klucz API OpenAI (platform.openai.com → API keys); do samego testowania wystarczy tryb demo

## Tryb demo (bez klucza API)
W folderze projektu uruchom w terminalu:

    npm run demo

i otwórz w przeglądarce http://localhost:3000. Fiszki są przykładowe, ale cały przepływ
(formularz, ładowanie, fiszki, quiz, wynik) działa tak samo jak z prawdziwym AI.

## Tryb z AI
1. Skopiuj plik `.env.example` i nazwij kopię `.env`.
2. W pliku `.env` wklej swój klucz w linii `OPENAI_API_KEY=`.
3. Uruchom:

       npm start

4. Otwórz http://localhost:3000, przejdź do „Nowa lekcja”, wpisz temat i kliknij „Generuj lekcję”.

Nie otwieraj `platforma.html` podwójnym kliknięciem — strona musi być serwowana przez serwer,
inaczej nie ma z czym się połączyć.

## Struktura plików
- `platforma.html` — struktura widoków (warstwa prezentacji)
- `style.css` — wygląd i responsywność
- `app.js` — logika interfejsu: fiszki, quiz, komunikacja z serwerem
- `server.js` — warstwa logiki: walidacja, prompt, wywołanie API, walidacja JSON, ponawianie
- `.env` — klucz API (tylko lokalnie, nigdy nie wysyłaj go do repozytorium)
