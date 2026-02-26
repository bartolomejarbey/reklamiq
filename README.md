# REKLAMIQ 🔴

Marketing bez starostí pro české firmy.

## Struktura projektu

```
reklamiq/
├── public/              ← Statické soubory (Vercel servíruje z této složky)
│   ├── index.html       ← Landing page + generátor
│   ├── css/
│   │   └── style.css    ← Hlavní styly
│   └── js/
│       └── app.js       ← Frontend logika (generátor, demo data)
├── api/                 ← Vercel Serverless Functions
│   └── generate.js      ← Claude API endpoint pro generování obsahu
├── vercel.json          ← Vercel konfigurace
├── package.json
├── .env.example         ← Šablona pro environment variables
└── .gitignore
```

## Spuštění – krok za krokem

### 1. Otevři projekt ve VS Code

```bash
cd reklamiq
code .
```

### 2. Nainstaluj dependencies

```bash
npm install
```

### 3. Vytvoř .env.local

```bash
cp .env.example .env.local
```

Vyplň hodnoty (zatím stačí ANTHROPIC_API_KEY pro generování textů).

### 4. Spusť lokálně

```bash
npx vercel dev
```

Otevři `http://localhost:3000`

### 5. Nasaď na Vercel

```bash
# Poprvé – propojení s Vercel projektem
npx vercel

# Produkční deploy
npx vercel --prod
```

### 6. Nastav doménu

V Vercel dashboardu → Settings → Domains → přidej `reklamiq.cz`

### 7. Nastav environment variables na Vercelu

Vercel Dashboard → Settings → Environment Variables:
- `ANTHROPIC_API_KEY` = tvůj Claude API klíč
- (později: SUPABASE_URL, PLACID_API_KEY, STRIPE_SECRET_KEY)

## Co funguje teď (beta)

- ✅ Landing page s ceníkem (40% sleva)
- ✅ Demo generátor (simulovaný obsah)
- ✅ 1 odemčený post + 11 locked
- ✅ Toggle s textem / bez textu
- ✅ Claude API endpoint (`/api/generate`) – ready pro produkci

## Co je další krok

1. **Napojit Claude API** – v `app.js` změnit `startGeneration()` aby volal `/api/generate` místo demo dat
2. **Supabase** – uživatelé, Brand DNA profily, uložené posty
3. **Placid.app** – reálné grafické šablony (fotka + text + brand barvy)
4. **Stripe** – platby za Starter/Pro/Individual plány
5. **Dashboard** – klientský panel s historií a plánováním

## Tech Stack

| Komponenta | Nástroj |
|-----------|---------|
| Frontend | HTML + CSS + JS (vanilla) |
| Hosting | Vercel (free) |
| API | Vercel Serverless Functions |
| AI texty | Claude API (Anthropic) |
| Grafika | Placid.app (šablony) |
| Databáze | Supabase (připraveno) |
| Platby | Stripe (připraveno) |
# reklamiq
