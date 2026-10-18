---
layout: post
title: "Azure IoT Edge auf Raspberry Pi 4 B installieren"
slug: "installation-aziotedge-auf-raspi4b"
date: 2024-12-25 15:34:53 +0100
categories: [azure, raspberry-pi]
description: "In der heutigen vernetzten Welt ist das Internet der Dinge (IoT) nicht mehr wegzudenken. Mit  kannst du deine IoT-Geräte intelligent und effizient verwalten. ..."
tags: [devops, iot, iot-edge, moby]
author: 
  name: "Christian Storb" 
  url: "/author/christian-storb/"
image: /assets/images/consulting/blog/computer-8045000_1280.webp
locale: "de_DE"
seo:
  type: BlogPosting
redirect_from:
  - /Azure/Raspberry Pi/2024/12/25/installation-von-azure-iot-edge-auf-einem-raspberry-pi-4-b.html
---
In der heutigen vernetzten Welt ist das Internet der Dinge (IoT) nicht mehr wegzudenken. Mit [Azure IoT Edge](https://azure.microsoft.com/de-de/products/iot-edge/) kannst du deine IoT-Geräte intelligent und effizient verwalten. In diesem Artikel zeigen wir dir, wie du Azure IoT Edge auf einem [Raspberry Pi 4 B](https://www.raspberrypi.com) installierst und konfigurierst. Los geht's!

#### Voraussetzungen

Bevor wir beginnen, stelle sicher, dass die folgenden Voraussetzungen erfüllt sind. Du benötigst: 

- Ein Raspberry Pi 4 B.

- Eine SD-Karte mit mindestens 8 GB Speicherplatz.

- Ein [Azure-Konto mit einem IoT Hub](https://portal.azure.com).

- Einen separaten, mit dem Internet verbundenen Computer (z. B. PC oder Notebook).

#### Schritt 1: Raspberry Pi OS (Bookworm) installieren

- **Raspberry Pi Imager herunterladen**:

Besuche die [Raspberry Pi-Website](https://www.raspberrypi.com/software/) und lade den Raspberry Pi Imager herunter. Der Raspberry Pi Imager ist ein offizielles Tool der Raspberry Pi Foundation, das dazu dient, Betriebssysteme und andere Software auf eine SD-Karte zu schreiben, die dann mit einem Raspberry Pi verwendet werden kann.

Installiere den Imager auf deinem Computer.

- **Raspberry Pi OS auswählen**: 

Öffne den Raspberry Pi Imager.<br><br>
<img src="/assets/images/consulting/blog/raspberrypiimager.png" alt="Raspberry Pi Imager Startbildschirm"><br>

Wähle **Raspberry Pi 4** aus der Liste der verfügbaren Modelle.<br><br> <img src="/assets/images/consulting/blog/raspberrypi4modell-1.png" alt="Raspberry Pi 4 Modell Auswahl">

Wähle aus der Liste der Betriebssysteme erst **Raspberry Pi OS (other)** und dann **Raspberry Pi OS (Legacy, 32-bit) Lite - A port of Debian Bullseye with security updates and no desktop environment** aus.<br><br><img src="/assets/images/consulting/blog/debian-bullseye-32-big.png" alt="Raspberry Pi OS Lite (32-bit)"><br>

- **SD-Karte vorbereiten**:

Lege eine SD-Karte mit mindestens 8 GB Speicherplatz in deinen Computer ein. 

Wähle die SD-Karte im Raspberry Pi Imager aus und klicke auf **Weiter**.<br><br><img src="/assets/images/consulting/blog/raspberrypiimagersdkarteauswaehlen.png" alt="SD-Karte im Raspberry Pi Imager auswählen"><br>

Klicke auf **Einstellungen bearbeiten**.<br><br>
<img src="/assets/images/consulting/blog/raspiimagereinstellungenbearbeiten.png" alt="Raspberry Pi Imager OS Anpassungen bearbeiten"><br>

Gib einen Hostnamen, Benutzernamen und Passwort für dein Raspberry sowie den Namen deines WLANs (die SSID) und das Passwort für dein WLAN ein. Die anderen Einstellungen kannst du einfach übernehmen. Klicke auf **Speichern**, um deine Änderungen zu sichern.<br><br><img src="/assets/images/consulting/blog/raspieinstellungen.png" alt="Raspberry Pi OS Einstellungen Hostname und WLAN"><br>

Klicke dann auf **Ja**, um deine OS Anpassungen anzuwenden.<br><br>
<img src="/assets/images/consulting/blog/raspiosanpassungenanwenden.png" alt="Raspberry Pi OS Anpassungen anwenden Bestätigung"><br>

Bestätige die folgende Sicherheitsabfrage mit **Ja**, um den Schreibvorgang zu starten. Danach wird das OS auf die SD-Karte geschrieben.<br><br><img src="/assets/images/consulting/blog/raspiosschreiben.png" alt="Schreibvorgang auf SD-Karte starten Bestätigungsdialog"><br>

- **Raspberry Pi starten**:

Entferne die SD-Karte aus deinem Computer und stecke sie in deinen Raspberry Pi.

Schalte den Raspberry Pi ein.

- **Installation von PuTTY auf deinem Computer:** 

Download: Besuche die offizielle [PuTTY-Website](https://www.putty.org) und lade die neueste Version für dein Betriebssystem (hier Windows) herunter.

Lade die Installationsdatei herunter und führe sie aus. Folge den Anweisungen des Installationsassistenten.

- **Über PuTTy mit dem Raspberry Pi verbinden:**

Öffne PuTTY auf deinem Computer und gibt den Hostnamen in das Feld "Host Name (or IP address)" ein. Stelle scher, dass der Verbindungsport auf 22 (Standard-SSH-Pot) eingestellt ist und der Verbindungstyp auf "SSH" gesetzt ist. Klicke dann auf "Open", um die Verbindung zu deinem Raspberry Pi herzustellen.<br><br><img src="/assets/images/consulting/blog/putty.png" alt="PuTTY SSH Verbindungseinstellungen"><br>

Du hast jetzt Zugriff auf die Kommandozeile deines Raspberry Pi und wirst aufgefordert, deinen Benutzernamen und dein Passwort einzugeben.

- **Dateisystem auf dem Raspberry Pi erweitern**

Gibt in die Kommandozeile den folgenden Befehl ein um das raspi-config Tool zu starten:<br>`sudo raspi-config`<br>

Menüpunkt 6 "Advanced Options" auswählen.<br><br>
<img src="/assets/images/consulting/blog/raspiconfigadvancedoptions.png" alt="Raspberry Pi Configuration Advanced Options Menü"><br>

Menüpunkt A1 "Expand Filesystem" auswählen.<br><br><img src="/assets/images/consulting/blog/raspiconfigexpandfilesystem.png" alt="Raspberry Pi Configuration Expand Filesystem Auswahl"><br>

- Klicke später auf **<Ok>**, um das System zu rebooten.

- Bestätige die Abfrage "Would you like to reboot now?" mit einen Klick auf **<Yes>**.

- Nach dem Reboot kannst du dich via PuTTy neu verbinden und anmelden.


#### Schritt 2: IoT Edge Runtime installieren

**Microsoft-Paketrepository hinzufügen**:
```bash
curl https://packages.microsoft.com/config/debian/11/packages-microsoft-prod.deb > ./packages-microsoft-prod.deb
sudo apt install ./packages-microsoft-prod.deb
```

**Moby-Engine installieren**:
```bash
sudo apt-get update
sudo apt-get install moby-engine
```

**Container Configurieren**:

```bash
sudo nano /etc/docker/daemon.json

{
   "log-driver": "local",
   "log-opts": { 
      "max-size": "10m", 
      "max-file": "3" 
   },
   "dns": ["8.8.8.8", "8.8.4.4"]
}

sudo systemctl restart docker
```

**IoT Edge installieren**:
```bash
sudo apt-get update
sudo apt-get install aziot-edge
```

#### Schritt 3: IoT Edge konfigurieren

**Azure IoT Hub**:
```bash 
sudo iotedge config mp --connection-string 'DEINE_VERBINDUNGSZEICHENFOLGE'   
sudo iotedge config apply   
sudo nano /etc/aziot/config.toml
```

**Azure IoT Central**:
```bash   
sudo nano /etc/aziot/config.toml

   [provisioning]
   source = "dps"
   global_endpoint = "https://global.azure-devices-provisioning.net"
   id_scope = "DEIN_ID_SCOPE"

   [provisioning.attestation]
   method = "symmetric_key"
   registration_id = "DEINE_REGISTRATION_ID"
   symmetric_key = { value = "DEIN_SYMMETRIC_KEY" }
   auto_reprovisioning_mode = "OnErrorOnly"
   prefer_module_identity_cache = false
   .
   .
   .
sudo iotedge config apply
```

#### Schritt 4: Überprüfen der Installation
```bash
sudo iotedge system status
sudo iotedge list
sudo iotedge check
```

#### Fazit

Mit diesen Schritten hast du Raspberry Pi OS (Bookworm) erfolgreich auf deinem Raspberry Pi 4 B installiert und Azure IoT Edge konfiguriert. Dein Gerät ist nun bereit, Daten zu sammeln und zu verarbeiten. Weitere Informationen und detaillierte Anweisungen findest du auf der [Microsoft Learn-Seite](https://learn.microsoft.com/de-de/azure/iot-edge/how-to-provision-single-device-linux-symmetric?view=iotedge-1.5&tabs=azure-portal%2Cubuntu).

Viel Erfolg bei deinem IoT-Projekt!

### Weblinks

- Erstellen und Bereitstellen eines IoT Edge-Geräts unter Linux mithilfe von symmetrischen Schlüsseln, [https://learn.microsoft.com/de-de/azure/iot-edge/how-to-provision-single-device-linux-symmetric?view=iotedge-1.5&tabs=azure-portal%2Cdebian](https://learn.microsoft.com/de-de/azure/iot-edge/how-to-provision-single-device-linux-symmetric?view=iotedge-1.5&tabs=azure-portal%2Cdebian)

**Bildnachweis**: Bild von [Pete Linforth](//pixabay.com/users/thedigitalartist-202249/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=8045000“) aus [Pixabay](//pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=8045000“)
