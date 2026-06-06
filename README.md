# F1 Fahrervergleich

Kleine React-App für Modul 294. Vergleicht zwei F1-Fahrer nach Punkten
(als Ratespiel) und bietet einen Admin-Bereich zum Verwalten der Fahrer (CRUD).

## Live-Demo

- **Frontend (GitHub Pages):** https://likedoni.github.io/f1-fahrervergleich/

Die Live-Seite läuft im **Demo-Modus**: Die Daten werden direkt im Browser
gehalten (Seed aus `db.json`, gespeichert im `localStorage`). Dadurch
funktionieren Vergleich **und** Admin-CRUD sofort, ganz ohne Backend.
Änderungen bleiben pro Browser gespeichert (kein gemeinsamer Server-Stand).

## Dokumentation

Die Projektdokumentation liegt im Repo:
[`docs/Projektdokumentation_F1_Ratespiel.pdf`](docs/Projektdokumentation_F1_Ratespiel.pdf)

## Lokal starten

Voraussetzung: Node.js 18+

```bash
npm install
npm run server   # startet json-server auf Port 3001 (Terminal 1)
npm run dev      # startet das Frontend (Terminal 2)
```

Dann im Browser: http://localhost:5173

Die Backend-URL kommt aus `VITE_API_URL` (siehe `.env.example`). Ohne `.env`
fällt die App auf `http://localhost:3001` zurück.

## Tests

```bash
npm test
```

## Struktur

- `src/api/driversApi.js` – alle fetch-Aufrufe (CRUD + Fehlerhandling)
- `src/utils/compare.js` – Vergleichslogik + Validierung (rein, testbar)
- `src/pages/` – die vier Seiten (Start, Vergleich, Admin, Formular)
- `src/components/Navbar.jsx` – Navigation
- `db.json` – Daten für json-server
