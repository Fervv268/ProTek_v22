# Code Runner Backend

1. npm install
2. npm run dev — tryb deweloperski
3. Endpoint /run przyjmuje JSON { "lang", "code" } i zwraca { "jobId" }
4. Wyniki są streamowane po WebSocket do subskrybowanego jobId