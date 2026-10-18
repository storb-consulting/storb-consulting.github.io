---
layout: post
title: "Git Cheat Sheet: Die wichtigsten Befehle"
slug: "git-cheat-sheet"
date: 2026-01-30
categories: [git, development, tools]
tags: [git, cheat-sheet, version-control]
description: "Ein umfassendes Git Cheat Sheet für Entwickler: Status, Staging, Commits, Branching, Merging, Diffs, Tags und nützliche Kurzbefehle – klar strukturiert und sofort einsetzbar."
toc: true
toc_label: "Inhaltsverzeichnis"
toc_icon: "list"
author:
  name: "Christian Storb"
  url: "/author/christian-storb/"
image: /assets/images/consulting/blog/artificial-intelligence-3382507_1920.jpg
locale: de_DE
seo:
  type: BlogPosting
---

Ein kompaktes Git Cheat Sheet für den täglichen Einsatz.  
Alle Befehle sind übersichtlich gruppiert und tabellarisch dargestellt.

---

## Status und Übersicht

| Befehl | Bedeutung |
|--------|-----------|
| git status | Zeigt geänderte, neue und gestagte Dateien |
| git diff | Zeigt Änderungen im Working Directory |
| git diff --staged | Zeigt Änderungen, die bereits gestaged sind |
| git diff --name-status | Zeigt neue, geänderte und gelöschte Dateien |

---

## Staging

| Befehl | Bedeutung |
|--------|-----------|
| git add \<datei> | Datei zum Staging hinzufügen |
| git add . | Alle Änderungen stagen |
| git restore --staged \<datei> | Datei aus dem Staging entfernen |
| git restore \<datei> | Änderungen an Datei verwerfen |

---

## Commit und Historie

| Befehl | Bedeutung |
|--------|-----------|
| git commit -m "Nachricht" | Commit erstellen |
| git commit -am "Nachricht" | Änderungen an getrackten Dateien committen |
| git log | Commit-Historie anzeigen |
| git log --oneline --graph --decorate | Kompakte, visuelle Historie |

---

## Branching und Merging

| Befehl | Bedeutung |
|--------|-----------|
| git branch | Lokale Branches anzeigen |
| git branch \<name> | Neuen Branch erstellen |
| git switch \<name> | Zu Branch wechseln |
| git merge \<branch> | Branch in aktuellen Branch mergen |
| git rebase \<branch> | Commits auf neuen Stand bringen |

---

## Remote und Push/Pull

| Befehl | Bedeutung |
|--------|-----------|
| git remote -v | Remote-Repos anzeigen |
| git fetch | Änderungen vom Remote holen |
| git pull | Änderungen holen und mergen |
| git push | Lokale Commits hochladen |
| git push -u origin \<branch> | Branch erstmals pushen |

---

## Aufräumen und Rückgängig machen

| Befehl | Bedeutung |
|--------|-----------|
| git restore \<datei> | Änderungen verwerfen |
| git reset --hard | Working Directory auf letzten Commit zurücksetzen |
| git reset --soft HEAD~1 | Letzten Commit rückgängig machen, Änderungen behalten |
| git revert \<commit> | Commit rückgängig machen (neuer Commit) |
| git clean -fd | Untracked Dateien und Ordner löschen |

---

## Vergleiche und Diffs

| Befehl | Bedeutung |
|--------|-----------|
| git diff HEAD | Änderungen seit letztem Commit |
| git diff \<branch1> \<branch2> | Branches vergleichen |
| git diff \<commit1> \<commit2> | Commits vergleichen |

---

## Tags

| Befehl | Bedeutung |
|--------|-----------|
| git tag | Tags anzeigen |
| git tag \<name> | Tag erstellen |
| git push --tags | Tags pushen |

---

## Nützliche Kurzbefehle

| Befehl | Bedeutung |
|--------|-----------|
| git stash | Änderungen zwischenspeichern |
| git stash pop | Stash anwenden und entfernen |
| git blame \<datei> | Zeigt, wer welche Zeile zuletzt geändert hat |
| git show \<commit> | Details zu Commit anzeigen |

---
