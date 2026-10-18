---
layout: post
title: "PuTTY: Verbindung zum Raspberry Pi einrichten"
slug: "putty-tool-raspi"
date: 2024-12-28 18:54:19 +0100
categories: [raspberry-pi]
description: "PuTTY ist ein leistungsstarkes und vielseitiges Terminal-Emulator-Programm, das es dir ermöglicht, sichere Verbindungen zu Remote-Servern herzustellen. Besonders nü..."
tags: [netzwerkadministration, putty]
author: 
  name: "Christian Storb" 
  url: "/author/christian-storb/"
image: /assets/images/consulting/blog/connections-4393377_1280.webp
locale: "de_DE"
seo:
  type: BlogPosting
redirect_from:
  - /Raspberry Pi/Tech Tips/2024/12/28/putty-ein-unverzichtbares-tool-fur-die-verbindung-mit-deinem-raspberry-pi.html
---
[PuTTY ](https://www.putty.org)ist ein leistungsstarkes und vielseitiges Terminal-Emulator-Programm, das es dir ermöglicht, sichere Verbindungen zu Remote-Servern herzustellen. Besonders nützlich ist es für die Verwaltung von Raspberry Pi-Geräten über SSH (Secure Shell). In diesem Artikel erfährst du, was [PuTTY](https://www.putty.org) ist und wie du es einrichtest, um dich mit deinem Raspberry Pi zu verbinden.

#### Was ist PuTTY?

[PuTTY ](https://www.putty.org)ist eine freie Software, die als Terminal-Emulator dient und Verbindungen über SSH, Telnet, Remote Login oder serielle Schnittstellen ermöglicht. Es ist besonders nützlich für die Verwaltung von Remote-Servern und die Durchführung von textbasierten Terminalsitzungen.

#### Installation von PuTTY

- **Download**: Besuche die offizielle [PuTTY-Website](https://www.putty.org) und lade die neueste Version für dein Betriebssystem herunter. Es gibt Versionen für Windows, Linux und macOS.

- **Installation**:
- **Windows**: Lade die Installationsdatei herunter und führe sie aus. Folge den Anweisungen des Installationsassistenten.

- **macOS und Linux**: [PuTTY ](https://www.putty.org)ist oft in den Paketquellen enthalten. Du kannst es über den Paketmanager deiner Distribution installieren. Zum Beispiel:
- **macOS**: Verwende Homebrew:<br>`brew install putty`

- **Ubuntu/Debian**: Verwende APT:<br>`sudo apt-get install putty`

- **Fedora**: Verwende DNF:<br>`sudo dnf install putty`

#### Verbindung mit dem Raspberry Pi via SSH

- **Ermittle die IP-Adresse deines Raspberry Pi**: Du kannst die IP-Adresse deines [Raspberry Pi](https://www.raspberrypi.com) herausfinden, indem du auf dem Raspberry Pi das Terminal öffnest und den Befehl <br>`hostname -I` <br>eingibst.

- **Starte PuTTY**: Öffne [PuTTY](https://www.putty.org) auf deinem Computer.

- **Verbindungseinstellungen**: Gib die IP-Adresse deines Raspberry Pi in das Feld "Host Name (or IP address)" ein. Stelle sicher, dass der Verbindungsport auf 22 (Standard-SSH-Port) eingestellt ist und die Verbindungstyp auf "SSH" gesetzt ist.<br><br><img src="/assets/images/consulting/blog/putty.png" alt="PuTTY Konfiguration Host Name und Port Einstellungen"><br>

- **Verbindung herstellen**: Klicke auf "Open", um die Verbindung zu deinem [Raspberry Pi](https://www.raspberrypi.com) herzustellen.

- **Anmelden**: Du wirst aufgefordert, deinen Benutzernamen und dein Passwort einzugeben. Standardmäßig ist der Benutzername `pi` und das Passwort `raspberry`, es sei denn, du hast diese geändert.

Nach der Anmeldung solltest du Zugriff auf die Kommandozeile deines Raspberry Pi haben und kannst Befehle ausführen, als ob du direkt darauf arbeiten würdest.

#### Fazit

PuTTY ist ein unverzichtbares Tool für jeden, der mit einem [Raspberry Pi](https://www.raspberrypi.com) arbeitet. Es ermöglicht eine einfache und sichere Verbindung über SSH und bietet eine Vielzahl von Funktionen, die die Verwaltung deines [Raspberry Pi](https://www.raspberrypi.com) erleichtern. Mit dieser Anleitung solltest du in der Lage sein, [PuTTY](https://www.putty.org) zu installieren und dich problemlos mit deinem [Raspberry Pi](https://www.raspberrypi.com) zu verbinden.

#### Weblinks

- PuTTY, [https://www.putty.org](https://www.putty.org)

- Raspberry Pi, [https://www.raspberrypi.com](https://www.raspberrypi.com)

**Bildnachweis**: Das Beitragsbild wurde freundlicherweise von [Bru-nO](https://pixabay.com/users/bru-no-1161770) auf Pixabay zur Verfügung gestellt.
