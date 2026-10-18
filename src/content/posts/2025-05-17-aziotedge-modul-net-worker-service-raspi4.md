---
layout: post
title: "Azure IoT Edge Modul mit .NET auf Raspberry Pi 4"
slug: "aziotedge-modul-net-worker-service-raspi4"
date: 2025-05-17 13:10:43 +0100
categories: [net, azure-iot, cloud-technologie, raspberry-pi, softwareentwicklung]
description: "<p> Azure IoT Edge ermöglicht es, Container-basierte Module auf Geräten wie dem Raspberry Pi 4 auszuführen. Mit .NET 6 und dem Worker Service-Template lassen ..."
tags: [net-6, azure-iot-edge, backgroundservice, c, docker, edge-computing, edge-deployment, iot-modul, raspberry-pi-4, rest-api, worker-service]
author: 
  name: "Christian Storb" 
  url: "/author/christian-storb/"
image: /assets/images/consulting/blog/azureiotedgeundnetworker.png
locale: "de_DE"
seo:
  type: BlogPosting
redirect_from:
  - /.NET/Azure IOT/Cloud-Technologie/Raspberry Pi/Softwareentwicklung/2025/05/17/azure-iot-edge-modul-mit-net-worker-service-auf-dem-raspberry-pi-4-praktische-beispiele.html
---
<p>
Azure IoT Edge ermöglicht es, Container-basierte Module auf Geräten wie dem Raspberry Pi 4 auszuführen. Mit .NET 6 und dem Worker Service-Template lassen sich robuste Hintergrunddienste für Edge-Szenarien entwickeln. In diesem Beitrag zeigen wir, wie ein IoT Edge Modul als Worker Service implementiert wird, das zu festgelegten Zeiten an bestimmten Wochentagen einen REST-API-Endpunkt per POST aufruft – ideal für Automatisierung und Integration von Cloud- und Edge-Workflows. Dieser Artikel konzentriert sich auf praktische Beispiele mit minimaler Erläuterung.
</p>

## Projekt anlegen und vorbereiten
```bash
dotnet new worker -n EdgeRestScheduler
```
<p>
Füge ein `Dockerfile` hinzu und aktiviere Docker-Unterstützung in Visual Studio oder per Hand.
</p>

## Zeitgesteuerte REST-API-Aufrufe im Worker Service
```csharp
using System.Net.Http;

public class TimedRestWorker : BackgroundService
{
    private readonly ILogger _logger;
    private readonly HttpClient _httpClient = new();
    private readonly string _apiUrl = $"https://script.google.com/macros/s/{provisioningId}/exec?x-functions-key={apiKey}";

    // Beispiel: Mo-Fr, 08:00 und 16:00 Uhr
    private readonly Dictionary<DayOfWeek, List> _schedule = new()
    {
        { DayOfWeek.Monday,    new() { new TimeSpan(8,0,0), new TimeSpan(16,0,0) } },
        { DayOfWeek.Tuesday,   new() { new TimeSpan(8,0,0), new TimeSpan(16,0,0) } },
        { DayOfWeek.Wednesday, new() { new TimeSpan(8,0,0), new TimeSpan(16,0,0) } },
        { DayOfWeek.Thursday,  new() { new TimeSpan(8,0,0), new TimeSpan(16,0,0) } },
        { DayOfWeek.Friday,    new() { new TimeSpan(8,0,0), new TimeSpan(16,0,0) } }
    };

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var alreadyTriggered = new HashSet();
        while (!stoppingToken.IsCancellationRequested)
        {
            var now = DateTime.Now;
            if (_schedule.TryGetValue(now.DayOfWeek, out var times))
            {
                foreach (var time in times)
                {
                    var triggerKey = $"{now:yyyyMMdd}_{time}";
                    if (now.TimeOfDay >= time && !alreadyTriggered.Contains(triggerKey) && now.TimeOfDay <time> 0 && now.TimeOfDay < TimeSpan.FromHours(1))
                    alreadyTriggered.Clear();
                    await CallRestApiAsync(stoppingToken);
                    await Task.Delay(TimeSpan.FromSeconds(20), stoppingToken);
                    _logger.LogInformation("API-Call um {0} an {1} ausgelöst.", time, now.DayOfWeek);
        }
    }
}

private async Task CallRestApiAsync(CancellationToken cancellationToken)
{
    try
    {
        var response = await _httpClient.PostAsync(_apiUrl, null, cancellationToken);
        if (response.IsSuccessStatusCode)
        {
            _logger.LogInformation("REST API erfolgreich aufgerufen.");
        }
        else
        {
            _logger.LogWarning("REST API Fehler: {0}", response.StatusCode);
        }
    }
    catch (Exception ex)
    {
        _logger.LogError("Fehler beim Aufruf der REST API: {0}", ex.Message);
    }
}
// ... (restlicher Code)
```

## Konfiguration und Deployment

- API-URL, Zeiten und Schlüssel sollten über `appsettings.json` oder Umgebungsvariablen konfigurierbar sein.
- Das fertige Docker-Image kann als IoT Edge Modul auf dem Raspberry Pi 4 bereitgestellt werden.

## Fazit
<p>
Mit wenigen Schritten lässt sich ein zeitgesteuertes Azure IoT Edge Modul auf Basis von .NET Worker Service realisieren. Die Lösung ist flexibel, robust und ideal für Automatisierungsaufgaben am Edge.
</p>
<p>
Falls du eine **individuelle Beratung** benötigst, um die beste Lösung für dein Projekt zu finden, lass es uns wissen und kontaktiere uns noch heute: **STC ist dein Partner!**
</p>
