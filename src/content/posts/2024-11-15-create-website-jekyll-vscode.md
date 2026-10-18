---
layout: post
title: "Eine Website mit Jekyll und VS Code erstellen"
slug: "create-website-jekyll-vscode"
date: 2024-11-15 19:23:35 +0100
categories: [jekyll, ruby, github-pages, vs-code]
description: "Eine Anleitung zur effizienten Erstellung von Jekyll-Websites mit Visual Studio Code."
tags: [jekyll, ruby, github-pages, vs-code]
author: 
  name: "Christian Storb" 
  url: "/author/christian-storb/"
image: /assets/images/consulting/blog/jekyll+vscode.png
locale: "de_DE"
seo: 
  type: WebPage
redirect_from:
  - /Jekyll/Ruby/GitHub Pages/VS Code/2024/11/15/jekyll-vscode.html
---
Jekyll ist ein statischer Site-Generator, der besonders gut mit GitHub Pages harmoniert.  
In diesem Artikel zeige ich allgemein, wie man eine eigene Website mit Jekyll erstellt und dabei **Visual Studio Code (VS Code)** als Entwicklungsumgebung nutzt.

## 🚀 Voraussetzungen

Um mit Jekyll zu starten, benötigt man:
- **Ruby** (unter Windows am besten mit RubyInstaller inkl. MSYS2).  
- **Bundler** und **Jekyll**, installiert über `gem install bundler jekyll`.  
- **VS Code** als IDE mit Extensions wie *Ruby LSP* und *Jekyll Helper*.  
- Ein GitHub Repository, z. B. `username.github.io`.

## 📂 Projekt starten

Ein neues Projekt wird mit folgendem Befehl angelegt:

```bash
jekyll new mysite
```

Wenn man bereits ein Repository hat, kann man die Struktur auch direkt dort erzeugen:

```bash
jekyll new . --force
```

Zur lokalen Vorschau startet man den eingebauten Server:

```bash
bundle exec jekyll serve
```

Die Seite läuft dann unter http://localhost:4000.

## 🛠 Arbeiten mit VS Code 

Die typische Struktur einer Jekyll-Seite umfasst:

_posts/ für Blogartikel

pages/ für statische Seiten

_layouts/ für Layouts

_includes/ für wiederverwendbare Teile (z. B. Navigation, Footer)

assets/ für CSS und Bilder

Hilfreiche Extensions in VS Code:

Ruby LSP für Syntax und Autocomplete.

Jekyll Helper zum Erstellen neuer Posts direkt in VS Code.

Jekyll Snippets für Liquid-Templates und Front Matter.

## 🔧 Konfiguration 

In der Datei _config.yml werden zentrale Einstellungen gepflegt:

```yaml
title: "Meine Jekyll Seite"
description: "Einfach und schnell mit VS Code erstellt."
url: "https://username.github.io"
lang: "de"
plugins:
  - jekyll-sitemap
  - jekyll-seo-tag
```

## 📈 SEO und Sitemap 

Für Suchmaschinenoptimierung sind zwei Plugins besonders wichtig:

jekyll-sitemap: erzeugt automatisch eine sitemap.xml.

jekyll-seo-tag: fügt Meta-Tags für Suchmaschinen und Social Media hinzu.

Zusätzlich empfiehlt sich eine robots.txt im Root:

```txt
User-agent: *
Allow: /
Sitemap: https://username.github.io/sitemap.xml
```

## 🎯 Fazit 

Mit Jekyll, Ruby und VS Code lässt sich schnell eine statische Website erstellen. Die Kombination aus klarer Projektstruktur, hilfreichen Extensions und automatischer SEO-Optimierung macht den Einstieg einfach. GitHub Pages übernimmt das Hosting, sodass die Seite sofort online verfügbar ist.
