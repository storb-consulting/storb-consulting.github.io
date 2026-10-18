---
layout: post
title: "Ubuntu 24.04 auf WSL unter Windows installieren"
slug: "ubuntu-wsl"
date: 2025-03-14 14:33:43 +0100
categories: [net, iot, linux, open-source, softwareentwicklung]
description: "Die Kombination von Windows und Linux in einem System bietet unschätzbare Flexibilität. Mit Windows Subsystem for Linux (WSL) kannst du Linux direkt auf deine..."
tags: [entwicklung, git-installieren, linux-auf-windows, linux-anleitung, linux-integration, microsoft-store, paketquellen-aktualisieren, software-entwicklung, ubuntu-2404, ubuntu-einrichtung, ubuntu-installieren, virtualmachineplatform, windows-subsystem-for-linux, windows-features-aktivieren, wsl, wsl-2]
author: 
  name: "Christian Storb" 
  url: "/author/christian-storb/"
image: /assets/images/consulting/blog/wsl-auf-windows.jpg
locale: "de_DE"
seo:
  type: BlogPosting
redirect_from:
  - /.NET/IoT/Linux/Open Source/Programmierung/Softwareentwicklung/Tech Tips/Technologie/Windows/2025/03/14/ubuntu-24-04-auf-wsl-unter-windows-installieren-ein-leitfaden.html
---
Die Kombination von Windows und Linux in einem System bietet unschätzbare Flexibilität. Mit Windows Subsystem for Linux (WSL) kannst du Linux direkt auf deinem Windows-Rechner ausführen. **Dieser Artikel konzentriert sich auf praktische Beispiele mit minimaler Erläuterung**, um dir eine klare und einfache Anleitung zu bieten.

## Inhalt

- [Warum WSL?](#warum-wsl)
- [Schritt 1: WSL über die Benutzeroberfläche aktivieren](#schritt-1-wsl-über-die-benutzeroberfläche-aktivieren)
- [Schritt 2: WSL 2 aktivieren](#schritt-2-wsl-2-aktivieren)
- [Schritt 3: Ubuntu 24.04 aus dem Microsoft Store installieren](#schritt-3-ubuntu-2404-aus-dem-microsoft-store-installieren)
- [Schritt 4: Erste Einrichtung von Ubuntu](#schritt-4-erste-einrichtung-von-ubuntu)
- [Schritt 5: Ubuntu einrichten](#schritt-5-ubuntu-einrichten)
- [Schritt 6: Überprüfe deine Internetverbindung](#schritt-6-überprüfe-deine-internetverbindung)
- [Schritt 7: DNS-Server überprüfen](#schritt-7-dns-server-überprüfen)
- [Fazit](#fazit)

### Warum WSL?

WSL ermöglicht die Ausführung eines vollständigen Linux-Subsystems direkt auf Windows – ohne Dual-Boot oder virtuelle Maschinen. Es ist ideal für Entwickler und Power-User, die die nahtlose Integration beider Betriebssysteme nutzen möchten.

### **Schritt 1: WSL über die Benutzeroberfläche aktivieren**

- Öffne das **Startmenü** und suche nach „Windows-Features“.

- Klicke auf **Windows-Features aktivieren oder deaktivieren**.

- Scrolle nach unten und setze ein Häkchen bei **Windows-Subsystem für Linux**.

- Aktiviere auch **Plattform für virtuelle Computer**, um WSL 2 zu unterstützen.

- Bestätige mit **OK** und lasse die Änderungen installieren.

- Starte deinen PC neu.

### **Schritt 2: WSL 2 aktivieren**

Die Version 2 von WSL bietet signifikante Leistungsverbesserungen. So aktivierst du sie:

- Öffne PowerShell als Administrator.

- Gib diesen Befehl ein:<br>`wsl --set-default-version 2 `<br>Falls eine Fehlermeldung erscheint, installiere das WSL 2-Kernel-Update von Microsoft.

### **Schritt 3: Ubuntu 24.04 aus dem Microsoft Store installieren**

- Öffne den **Microsoft Store**.

- Suche nach „Ubuntu“ und wähle die Version „Ubuntu 24.04“.

- Klicke auf **Installieren** und warte, bis der Prozess abgeschlossen ist.

- Starte anschließend Ubuntu über das Startmenü oder gib `wsl` in die Suchleiste ein.

### **Schritt 4: Erste Einrichtung von Ubuntu**

Beim ersten Start wirst du aufgefordert, einen Benutzernamen und ein Passwort zu erstellen. Diese gelten nur für dein Linux-System.

### **Schritt 5: Ubuntu einrichten**

- Aktualisiere die Paketquellen:<br>`sudo apt update && sudo apt upgrade -y`

- Installiere wichtige Tools wie `git`:<br>`sudo apt install git`

### **Schritt 6: Überprüfe deine Internetverbindung**

- Stelle sicher, dass dein System mit dem Internet verbunden ist.

- Teste die Verbindung mit einem einfachen Befehl wie:<br>`ping google.com`

<div class="affiliate-box ">
  <style>
    .affiliate-box { box-sizing: border-box; padding: 1rem; border: 1px solid rgba(255,255,255,0.1); border-radius: var(--stc-radius); width: 100%; max-width: 900px; margin: 0.75rem auto; background: transparent; }
    .affiliate-box p { margin: 0 0 0.5rem; font-size: 0.95rem; }
    .affiliate-box a { display: block; text-align: center; }
    .affiliate-box img { max-width: 100%; height: auto; display: block; margin: 0 auto; object-fit: contain; }
    @media (max-width: 480px) { .affiliate-box { padding: 0.75rem; } }
  </style>
  <p><strong>Hinweis:</strong> Wenn du Webspace oder Domains suchst, kann ich dir lima‑city empfehlen. Ich nutze es selbst für Hosting‑Projekte.</p>
  <a rel="sponsored" href="https://www.lima-city.de/webhosting?cref=447478">
    <img src="https://www.lima-city.de/assets/banner/banner5.jpg" alt="lima-city: Webhosting, Domains und Cloud" loading="lazy" decoding="async">
  </a>
</div>

### **Schritt 7: DSN-Server überprüfen**

Falls ein Problem mit der Internetverbindung besteht, könnte es an deinem DNS-Server liegen. Du kannst temporär auf einen öffentlichen DNS-Server wie Google DNS wechseln:<br>
`sudo nano /etc/resolv.conf`<br>
Füge folgende Zeile hinzu:<br>
`nameserver 8.8.8.8`

### **Fazit**

Mit WSL und Ubuntu 24.04 kannst du die Vorteile von Linux nutzen, ohne Windows verlassen zu müssen. Diese Kombination ist perfekt für Entwicklung, Experimentieren und produktives Arbeiten. Ich hoffe, dieser Leitfaden erleichtert dir den Einstieg – viel Erfolg!

### Referenzen

- [Ubuntu beim Start von Windows automatisch starten: Ein Leitfaden](/automatisierung/iot/open-source/softwareentwicklung/wsl/2025/03/15/ubuntu-windows-start.html)
