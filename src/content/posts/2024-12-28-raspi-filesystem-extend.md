---
layout: post
title: "Raspberry Pi: Dateisystem erweitern - Anleitung"
slug: "raspi-filesystem-extend"
date: 2024-12-28 21:09:09 +0100
categories: [raspberry-pi]
description: "Wenn du einen  einrichtest, ist es wichtig, das Dateisystem zu erweitern, um den gesamten verfügbaren Speicherplatz auf deiner SD-Karte zu nutzen. Hier erfähr..."
tags: [filesystem]
image: /assets/images/consulting/blog/digital-data-carriers-1443484_1280.webp
author: 
  name: "Christian Storb" 
  url: "/author/christian-storb/"
locale: "de_DE"
seo:
  type: BlogPosting
redirect_from:
  - /Raspberry Pi/Tech Tips/2024/12/28/warum-und-wie-du-das-dateisystem-auf-deinem-raspberry-pi-erweiterst.html
---
Wenn du einen [Raspberry Pi](https://www.raspberrypi.com/) einrichtest, ist es wichtig, das Dateisystem zu erweitern, um den gesamten verfügbaren Speicherplatz auf deiner SD-Karte zu nutzen. Hier erfährst du, warum das so wichtig ist und wie du es machst.  

#### Warum das Dateisystem erweitern?  

- **Maximale Nutzung des Speicherplatzes**: Standardmäßig wird das Betriebssystem auf einer kleinen Partition der SD-Karte installiert. Durch das Erweitern des Dateisystems wird die Partition auf die gesamte Größe der SD-Karte erweitert, sodass du den gesamten verfügbaren Speicherplatz nutzen kannst.

- **Vermeidung von Speicherproblemen**: Wenn das Dateisystem nicht erweitert wird, kann es schnell zu Speicherplatzproblemen kommen, insbesondere wenn du zusätzliche Software installierst oder große Dateien speicherst.  

- **Systemstabilität**: Ein ausreichender Speicherplatz ist wichtig für die Stabilität und Leistung des Systems. Durch das Erweitern des Dateisystems stellst du sicher, dass genügend Platz für Systemprozesse und temporäre Dateien vorhanden ist.

#### Wie du das Dateisystem erweiterst  

Das Erweitern des Dateisystems ist ein einfacher Schritt, der in der Regel über das **`raspi-config` Tool** durchgeführt wird. Hier ist eine Schritt-für-Schritt-Anleitung:  

- **Öffne das Terminal**: Verbinde dich mit deinem Raspberry Pi und öffne das Terminal.

- **Starte** `raspi-config`: Gib den folgenden Befehl ein, um das Konfigurationstool zu starten: `sudo raspi-config`

- **Wähle die Option "Expand Filesystem"**: <br>Navigiere zu "Advanced Options" und wähle "Expand Filesystem".<br><br><img src="/assets/images/consulting/blog/raspiconfigadvancedoptions.png" alt="Raspberry Pi Configuration Advanced Options Menü"><br><br><img src="/assets/images/consulting/blog/raspiconfigexpandfilesystem.png" alt="Raspberry Pi Configuration Expand Filesystem Option"><br><br>Dies wird das Dateisystem auf die gesamte Größe der SD-Karte erweitern.<br>

- **Neustart**: Starte deinen Raspberry Pi neu, damit die Änderungen wirksam werden.

Nach dem Neustart wird dein [Raspberry Pi](https://www.raspberrypi.com) den gesamten verfügbaren Speicherplatz auf der SD-Karte nutzen können.

#### Weblinks

- Raspberry Pi, [https://www.raspberrypi.com/](https://www.raspberrypi.com/)

**Bildnachweis**: Bild von [asphotohrapy ](https://pixabay.com/users/asphotohrapy-1546875)auf Pixabay
