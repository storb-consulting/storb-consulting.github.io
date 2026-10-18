---
layout: post
title: "Moby-Engine auf Ubuntu 24.04 in WSL installieren"
slug: "moby-engine-ubuntu-wsl"
date: 2025-03-10 15:35:47 +0100
categories: [container-technologie, linux, softwareentwicklung, wsl]
description: "Dieser Artikel konzentriert sich auf praktische Beispiele mit minimaler Erläuterung, um dir eine klare und einfache Anleitung zur Installation der Moby-Engine..."
tags: [iot-edge, docker, moby, ubuntu, wsl]
author: 
  name: "Christian Storb" 
  url: "/author/christian-storb/"
locale: "de_DE"
image: /assets/images/consulting/blog/moby-engine-auf-ubuntu-24.04-in-wsl.jpg
seo:
  type: BlogPosting
redirect_from:
  - /Container-Technologie/Linux/Softwareentwicklung/Systemadministration/Technologie/WSL/2025/03/10/moby-engine-auf-ubuntu-24-04-in-wsl-installieren-ein-praktischer-leitfaden.html
---
Dieser Artikel konzentriert sich auf praktische Beispiele mit minimaler Erläuterung, um dir eine klare und einfache Anleitung zur Installation der Moby-Engine auf Ubuntu 24.04 in Windows Subsystem for Linux (WSL) zu geben.

### Warum die Moby-Engine?

Die Moby-Engine ist eine leichtgewichtige, OCI-kompatible Container-Engine, die für Produktionsumgebungen optimiert ist. Sie ist die offizielle Container-Engine für Azure IoT Edge und mit Docker-Containern kompatibel.

### Schritt 1: Voraussetzungen prüfen

Bevor du die Moby-Engine installierst, stelle sicher, dass folgende Voraussetzungen erfüllt sind:

- **WSL 2 ist aktiviert:** Du kannst die neueste Version von WSL verwenden, indem du den folgenden Befehl ausführst:<br>`wsl --set-default-version 2`

- **Ubuntu 24.04 ist installiert:** Falls nicht, kannst du es über den Microsoft Store hinzufügen.

### Schritt 2: Microsoft-Paketquellen hinzufügen

Um die Moby-Engine zu installieren, musst du die Microsoft-Paketquellen zu deinem Ubuntu hinzufügen:

- Öffne ein Terminal in WSL und führe folgende Befehle aus:<br>`wget https://packages.microsoft.com/config/ubuntu/24.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb 
sudo dpkg -i packages-microsoft-prod.deb 
rm packages-microsoft-prod.deb`

- Aktualisiere anschließend die Paketliste:<br>`sudo apt-get update`

### Schritt 3: Moby-Engine installieren

- Installiere die Moby-Engine mit folgendem Befehl:<br>`sudo apt-get install moby-engine`

- Starte den Moby-Daemon neu, um sicherzustellen, dass die Änderungen wirksam werden:<br>`sudo systemctl restart docker`

### Optional: Protokollierung konfigurieren

Standardmäßig speichert die Moby-Engine Containerprotokolle ohne Größenlimit. Um Speicherplatz zu sparen, kannst du die Protokollierung auf "local" setzen:

- Bearbeite die Konfigurationsdatei:<br>`sudo nano /etc/docker/daemon.json`

- Füge folgenden Inhalt hinzu:<br>`{ 
   "log-driver": "local" 
}`

- Speichere die Datei und starte die Moby-Engine neu:<br>`sudo systemctl restart docker`

### Fazit

Mit der Installation der Moby-Engine auf Ubuntu 24.04 unter WSL hast du eine leistungsstarke Container-Engine eingerichtet, die für lokale Entwicklung und Produktionsszenarien gleichermaßen geeignet ist. Dieser Leitfaden hat dir hoffentlich geholfen, die Einrichtung einfach und effizient durchzuführen.

### Referenzen

- [Ubuntu beim Start von Windows automatisch starten: Ein Leitfaden](https://storbconsulting.wordpress.com/2025/03/15/ubuntu-beim-start-von-windows-automatisch-starten-ein-leitfaden/)

- [Ubuntu 24.04 auf WSL unter Windows installieren: Ein Leitfaden](https://storbconsulting.wordpress.com/2025/03/15/ubuntu-24-04-auf-wsl-unter-windows-installieren-ein-leitfaden/)

- [Erstellen und Bereitstellen eines IoT Edge-Geräts unter Linux mithilfe von symmetrischen Schlüsseln](https://learn.microsoft.com/de-de/azure/iot-edge/how-to-provision-single-device-linux-symmetric?tabs=azure-portal%2Cubuntu)
