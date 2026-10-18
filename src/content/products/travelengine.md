---
layout: default
title: "Travel Engine"
description: "Automatisierte Content-Engine für Instagram – modular, zuverlässig, datengesteuert."
version: "1.0.0"
date: 2026-03-07 12:00:00 +0100
nuget_id: null
repo_url: "https://github.com/chstorb/TravelEngine"
---

# Travel Engine  
**Automatisierte Content‑Engine für Instagram – modular, zuverlässig, datengesteuert**

Die Travel Engine ist ein vollständig automatisiertes Publishing‑System für Instagram‑Stories und Feed‑Posts. Sie kombiniert planbare Veröffentlichungslogik, intelligente Medienverwaltung und robuste API‑Anbindung zu einem zuverlässigen Content‑Workflow für Unternehmen, Creator und Agenturen.

---

## Funktionen

### Zeitgesteuerte Veröffentlichung
Die Engine führt automatisierte Veröffentlichungen an definierten Wochentagen aus:

- **Montag** – automatische Story  
- **Donnerstag** – automatische Story  
- **Sonntag** – automatischer Feed‑Post  

Die Logik ist modular erweiterbar (z. B. Kampagnen, Feiertage, dynamische Planung).

### Einheitlicher Publikations‑Flow
Stories und Feed‑Posts nutzen eine gemeinsame interne Logik:

- `Code_publishInstagramPost()`  
- `Code_publishInstagramStory()`  
- beide greifen auf `Code_runPublicationFlow_(isStory)` zurück  

Das sorgt für konsistente Abläufe und klare Erweiterbarkeit.

### Intelligente Medienverwaltung
Ein **UsedPhotoRepository** verhindert doppelte Veröffentlichungen und trennt Story‑ und Feed‑Pipelines sauber voneinander.  
Medien werden systematisch verwaltet und nach Nutzung markiert.

### Erweiterbare Architektur
Die Engine basiert auf klar getrennten Modulen:

- API‑Anbindung (Instagram Graph API, Facebook, Dropbox, Blogger)  
- Datenquellen (Google Sheets)  
- Hilfsbibliotheken (OAuth2, Underscore, Gemini)  
- Repository‑Logik  
- Trigger‑Logik  

Diese Struktur ermöglicht schnelle Anpassungen und neue Content‑Typen.

---

## Einsatzszenarien

- **Travel‑Content‑Automatisierung**  
  Regelmäßige Stories und Posts aus kuratierten Medienquellen.

- **Agentur‑Workflows**  
  Automatisierte Veröffentlichung für mehrere Kundenkonten.

- **Corporate Social Media**  
  Wiederkehrende Inhalte wie Wochenstart, Rückblicke oder Kampagnen.

- **Creator‑Pipelines**  
  Automatisierte Story‑Serien und Feed‑Planung.

---

## Datenschutz & Sicherheit
Die Engine arbeitet ausschließlich mit autorisierten Business‑Assets und nutzt sichere OAuth‑Flows.  
Alle Daten werden in kontrollierten Google‑Workspace‑Umgebungen verarbeitet.  
Es findet keine Weitergabe an Dritte statt.

---

## Warum diese Engine besonders ist
- Vollständig automatisiert  
- Modular aufgebaut  
- Stabil durch klare Trennung von Trigger, Flow und Repository  
- Erweiterbar für B2B‑Tooling und Consulting‑Produktisierung  
- Ideal für Unternehmen, die konsistenten Instagram‑Content benötigen  

---

*STC Travel Engine ist ein internes Produkt von STORB Consulting und dient als technische Grundlage für automatisierte Content‑Workflows im Travel‑ und Business‑Bereich.*
