# STORB Consulting – Astro Website (`storb-consulting.github.io`)

Dieses Repository enthält die von Jekyll (`chstorb.github.io`) nach **Astro 6** migrierte Website von **Christian Storb / STORB Consulting**.

## Projektstruktur

- `public/` – Statische Assets (`assets/css`, `assets/js`, `assets/images`, `assets/fonts`, `audio/`, `spotify/`, `ads.txt`, `robots.txt`, `favicon.ico`, etc.)
- `src/content/posts/` – Alle 39 Blogbeiträge als Astro Content Collection (`posts`)
- `src/content/products/` – Alle 4 Produktseiten (`adcanvas`, `fritz`, `money`, `travelengine`) als Astro Content Collection (`products`)
- `src/data/` – Strukturierte YAML-Daten (`_data/*.yml`) und Werbe-Snippets (`ads/*.html`)
- `src/components/` – Wiederverwendbare Astro-Komponenten (`Navbar`, `Footer`, `SeoHead`, `AdCarousel`, `GoogleAd`, `Icon`, `Mermaid`, `BlogList`, Schema.org JSON-LD)
- `src/layouts/` – Seiten-Layouts (`DefaultLayout`, `PostLayout`, `ProductLayout`)
- `src/pages/` – Alle Seitenrouten, Blog-Paginierung (`/blog/`, `/blog/2/`..`/blog/4/`), dynamische Beitrags- & Redirect-Routen (`[...slug].astro`), RSS-Feed (`feed.xml.ts`) und Sitemap (`sitemap.xml.ts`)

## Entwicklung & Build

```bash
# Abhängigkeiten installieren
npm install

# Lokalen Entwicklungsserver starten
npm run dev

# Produktions-Build erstellen (Ausgabe in ./dist)
npm run build

# Produktions-Build lokal testen
npm run preview
```
