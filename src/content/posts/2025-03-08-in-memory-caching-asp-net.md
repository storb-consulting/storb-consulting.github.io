---
layout: post
title: "In-Memory Caching in ASP.NET Core: Ein Überblick"
slug: "in-memory-caching-asp-net"
date: 2025-03-08 11:25:19 +0100
categories: [net, performance-optimierung, webentwicklung]
description: "In der heutigen digitalen Welt ist die Leistungsfähigkeit einer Anwendung entscheidend für ihren Erfolg. Eine effektive Methode, um die Geschwindigkeit und Sk..."
tags: [caching, imemorycache, skalierbarkeit]
author: 
  name: "Christian Storb" 
  url: "/author/christian-storb/"
image: /assets/images/consulting/blog/in-memory-caching-in-asp.net-core.jpg
locale: "de_DE"
seo:
  type: BlogPosting
redirect_from:
  - /.NET/Performance Optimierung/Programmierung/Tech Tips/Webentwicklung/2025/03/08/in-memory-caching-in-asp-net-core-ein-uberblick.html
---
In der heutigen digitalen Welt ist die Leistungsfähigkeit einer Anwendung entscheidend für ihren Erfolg. Eine effektive Methode, um die Geschwindigkeit und Skalierbarkeit einer Anwendung zu verbessern, ist das In-Memory-Caching. In diesem Artikel geben wir einen Überblick über das In-Memory-Caching in ASP.NET Core und wie es implementiert werden kann.

### Was ist In-Memory-Caching?

In-Memory-Caching ist eine Technik, bei der Daten im Arbeitsspeicher des Webservers gespeichert werden, um die Leistung und Skalierbarkeit einer Anwendung zu verbessern. Dies ist besonders nützlich für Daten, die sich selten ändern und deren Abruf teuer ist. Durch das Caching wird eine Kopie der Daten erstellt, die wesentlich schneller zurückgegeben werden kann, als wenn sie erneut aus der Quelle abgerufen würden.

### Einführung in das `IMemoryCache` Interface

Das `IMemoryCache` Interface ist der Kern des In-Memory-Cachings in ASP.NET Core. Es repräsentiert einen Cache, der im Arbeitsspeicher des Webservers gespeichert ist. Dies ist ideal für häufig abgerufene Daten, die schnell verfügbar sein müssen.

### Vorteile des In-Memory-Cachings

- **Leistungsverbesserung**: Durch das Speichern häufig abgerufener Daten im Arbeitsspeicher kann die Anwendungsleistung erheblich verbessert werden.

- **Skalierbarkeit**: Da der Zugriff auf den Arbeitsspeicher schneller ist als der Zugriff auf externe Datenquellen, kann das Caching die Skalierbarkeit der Anwendung erhöhen.

- **Einfache Implementierung**: Das `IMemoryCache` Interface ist einfach zu implementieren und bietet flexible Optionen zur Verwaltung des Caches.

### Implementierung von In-Memory-Caching in ASP.NET Core

Hier ist ein grundlegendes Beispiel, wie `IMemoryCache` in einer ASP.NET Core-Anwendung verwendet wird:

```csharp
public class MyService
{
    private readonly IMemoryCache _cache;

    public MyService(IMemoryCache cache)
    {
        _cache = cache;
    }

    public string GetCachedData(string key)
    {
        if (!_cache.TryGetValue(key, out string cachedData))
        {
            // Daten nicht im Cache, daher aus der Quelle abrufen
            cachedData = "Dies sind die zu cachenden Daten";

            // Cache-Optionen festlegen
            var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetSlidingExpiration(TimeSpan.FromMinutes(5));

            // Daten im Cache speichern
            _cache.Set(key, cachedData, cacheEntryOptions);
        }

        return cachedData;
    }
}
```

In diesem Beispiel verwenden wir das `IMemoryCache` Interface, um Daten mit einer Ablaufzeit von 5 Minuten im Cache zu speichern. Wenn die Daten nicht im Cache gefunden werden, werden sie aus der Quelle abgerufen und im Cache gespeichert.

### Best Practices für das In-Memory-Caching

- **Fallback-Optionen**: Stellen Sie sicher, dass immer eine Fallback-Option zum Abrufen der Daten vorhanden ist und verlassen Sie sich nicht ausschließlich auf den Cache.

- **Cache-Wachstum begrenzen**: Verwenden Sie Ablaufzeiten und Größenbeschränkungen, um das Wachstum des Caches zu begrenzen.

- **Sicherheitsüberlegungen**: Vermeiden Sie das Einfügen externer Eingaben in den Cache, um unvorhersehbaren Speicherverbrauch zu verhindern.

### Fazit

In-Memory-Caching ist eine leistungsstarke Technik zur Verbesserung der Leistung und Skalierbarkeit Ihrer ASP.NET Core-Anwendung. Durch die Implementierung von `IMemoryCache` können Sie sicherstellen, dass häufig abgerufene Daten schnell und effizient verfügbar sind.

### Refrenzen

- [Zwischenspeichern im Arbeitsspeicher in ASP.NET Core](https://learn.microsoft.com/de-de/aspnet/core/performance/caching/memory?view=aspnetcore-9.0)
