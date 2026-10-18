---
layout: post
title: "Logging-Konfiguration in .NET: Logaufkommen reduzieren"
slug: "konfiguration-logging-net-app"
date: 2025-01-25 17:51:35 +0100
categories: [net, azure, logging, visual-studio]
description: "In einer .NET-Anwendung ist das Logging ein wesentlicher Bestandteil zur Überwachung und Fehlerdiagnose. Allerdings kann ein übermäßiges Logaufkommen die Perf..."
author: 
  name: "Christian Storb" 
  url: "/author/christian-storb/"
image: /assets/images/consulting/blog/dotnet-logging.webp 
locale: "de_DE"
seo:
  type: BlogPosting
redirect_from:
  - /.NET/Azure/Logging/Visual Studio/2025/01/25/konfiguration-des-logging-in-einer-net-app-reduzierung-des-logaufkommens.html
---
In einer .NET-Anwendung ist das Logging ein wesentlicher Bestandteil zur Überwachung und Fehlerdiagnose. Allerdings kann ein übermäßiges Logaufkommen die Performance beeinträchtigen und die Protokolle unnötig aufblähen. Eine effektive Methode, um das Logaufkommen zu reduzieren, besteht darin, den LogLevel in den `appsettings`-Dateien entsprechend der Umgebung anzupassen.

#### LogLevel in den `appsettings`-Dateien

Die `appsettings.json`-Datei wird verwendet, um Konfigurationseinstellungen für eine .NET-Anwendung zu definieren. Hier ist ein Beispiel, wie Sie den LogLevel für die Produktionsumgebung auf `Warning` und für die Entwicklungsumgebung auf `Information` setzen können:

**appsettings.json** (Standardkonfiguration):

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  }
}
```

**appsettings.Development.json** (Entwicklungskonfiguration):

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  }
}
```

#### Vorteile der Anpassung des LogLevels

- **Reduzierung des Logaufkommens**: Durch das Setzen des LogLevels auf `Warning` in der Produktionsumgebung werden nur Warnungen, Fehler und kritische Meldungen protokolliert. Dies reduziert die Menge der geloggten Informationen erheblich und sorgt für schlankere Protokolldateien.

- **Verbesserte Performance**: Weniger Logeinträge bedeuten weniger I/O-Operationen, was die Performance der Anwendung verbessern kann.

- **Gezielte Fehlerdiagnose**: In der Entwicklungsumgebung ist es sinnvoll, detailliertere Informationen zu protokollieren, um Fehler schneller zu identifizieren und zu beheben. Daher wird der LogLevel auf `Information` gesetzt, um mehr Einblicke in den Ablauf der Anwendung zu erhalten.

#### Fazit

Die Anpassung des LogLevels in den `appsettings`-Dateien ist eine einfache und effektive Methode, um das Logaufkommen in einer .NET-Anwendung zu steuern. Durch die Konfiguration des LogLevels auf `Warning` in der Produktionsumgebung und `Information` in der Entwicklungsumgebung können Sie sicherstellen, dass nur relevante Informationen protokolliert werden, ohne die Performance zu beeinträchtigen.

#### Referenzen

- [Protokollierung in C# und .NET](https://learn.microsoft.com/de-de/dotnet/core/extensions/logging?tabs=command-line)
