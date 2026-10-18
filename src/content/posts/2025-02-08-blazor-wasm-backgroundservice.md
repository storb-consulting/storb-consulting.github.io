---
layout: post
title: "Periodische Datenabrufe in Blazor WebAssembly"
slug: "blazor-wasm-backgroundservice"
date: 2025-02-08 11:39:09 +0100
permalink: /blog/2025/02/08/periodische-datenabrufe-blazor-webassembly-backgroundservice/
categories: [net, blazor, echtzeit-kommunikation, javascript, signalr, softwareentwicklung,  webentwicklung]
description: "Blazor WebAssembly bietet eine erstaunliche Möglichkeit, Client-seitige Webanwendungen mit C# und .NET zu entwickeln. Doch es gibt einige Unterschiede zu Blazor Server..."
tags: [net-core, aspnet-core, backgroundservice, blazor-webassembly, c, client-seitige-entwicklung, datenbertragung, echtzeit-daten, hub, ijsruntime, live-daten, periodische-aufrufe, signalr-hub, timer, webanwendungen]
author: 
  name: "Christian Storb" 
  url: "/author/christian-storb/"
locale: "de_DE"
image: /assets/images/consulting/blog/network-4774766_1280.webp
seo:
  type: BlogPosting

---
Blazor WebAssembly bietet eine erstaunliche Möglichkeit, Client-seitige Webanwendungen mit C# und .NET zu entwickeln. Doch es gibt einige Unterschiede zu Blazor Server, die beachtet werden müssen. Einer dieser Unterschiede betrifft den Umgang mit Hintergrunddiensten. In Blazor WebAssembly funktioniert ein `BackgroundService` nicht auf die gleiche Weise wie in einer Blazor Server App, da WebAssembly keine kontinuierlichen Hintergrunddienste unterstützt. Das bedeutet, dass Entwickler eine andere Methode verwenden müssen, um regelmäßig Daten abzurufen und an die Benutzeroberfläche zu senden.

In diesem Blogartikel werde ich zwei übliche Ansätze vorstellen: die Verwendung von `Timer` und `IJSRuntime` für periodische Aufrufe. Dieser Artikel konzentriert sich auf praktische Beispiele mit minimaler Erläuterung.

**1. Verwendung von Timer**

Eine einfache und effektive Methode, um periodische Datenabrufe zu implementieren, ist die Verwendung eines Timers. Mit einem Timer kannst du in regelmäßigen Abständen eine Methode aufrufen, die die Daten abruft und an die Benutzeroberfläche sendet. Hier ist ein Beispiel, wie du dies in einer Blazor WebAssembly App umsetzen kannst:

```razor
@page "/periodische-daten"
@inject IHttpClientFactory HttpClientFactory

<h3>Datenaktualisierung mit Timer</h3>

<button @onclick="StartDataFetch">Start Data Fetching</button>

@code {
    private System.Timers.Timer _timer;

    protected override void OnInitialized()
    {
        // Timer alle 60 Sekunden ausführen
        _timer = new System.Timers.Timer(60000);
        _timer.Elapsed += async (sender, e) => await FetchDataAsync();
    }

    private async Task FetchDataAsync()
    {
        var client = HttpClientFactory.CreateClient("MyApiClient");
        var response = await client.GetAsync("https://api.example.com/data");
        if (response.IsSuccessStatusCode)
        {
            var data = await response.Content.ReadAsStringAsync();
            // Aktualisiere die Benutzeroberfläche mit den neuen Daten
        }
    }

    private void StartDataFetch()
    {
        _timer.Start();
    }
}
```

In diesem Beispiel initialisieren wir einen Timer, der alle 60 Sekunden die `FetchDataAsync` Methode aufruft, um Daten abzurufen und die Benutzeroberfläche zu aktualisieren.

**2. Verwendung von IJSRuntime**

Eine andere Methode besteht darin, `IJSRuntime` zu verwenden, um periodische Aufrufe mittels JavaScript zu planen. Dies kann nützlich sein, wenn du eine nahtlose Integration mit JavaScript und die Nutzung von `setInterval` bevorzugst. Hier ist ein Beispiel:

```razor
@page "/periodische-daten"
@inject IJSRuntime JSRuntime
@inject IHttpClientFactory HttpClientFactory

<h3>Datenaktualisierung mit IJSRuntime</h3>

<button @onclick="StartDataFetch">Start Data Fetching</button>

<!-- Hier das Diagramm oder die Benutzeroberfläche einfügen -->

@code {
    private DotNetObjectReference<MyComponent> _objRef;

    protected override void OnInitialized()
    {
        _objRef = DotNetObjectReference.Create(this);
    }

    [JSInvokable]
    public async Task FetchDataAsync()
    {
        var client = HttpClientFactory.CreateClient("MyApiClient");
        var response = await client.GetAsync("https://api.example.com/data");
        if (response.IsSuccessStatusCode)
        {
            var data = await response.Content.ReadAsStringAsync();
            // Aktualisiere die Benutzeroberfläche mit den neuen Daten
        }
    }

    private async Task StartDataFetch()
    {
        await JSRuntime.InvokeVoidAsync("startDataFetch", _objRef);
    }
}
```

Und das dazugehörige JavaScript:

```javascript
function startDataFetch(dotNetHelper) {
    setInterval(function() {
        dotNetHelper.invokeMethodAsync('FetchDataAsync');
    }, 60000); // Alle 60 Sekunden
}
```

In diesem Beispiel verwenden wir `IJSRuntime`, um den `setInterval`-Aufruf zu starten, der alle 60 Sekunden die `FetchDataAsync` Methode aufruft.

**Fazit**

Während Blazor WebAssembly keine kontinuierlichen Hintergrunddienste unterstützt, gibt es dennoch effektive Methoden, um regelmäßig Daten abzurufen und an die Benutzeroberfläche zu senden. Die Verwendung von `Timer` und `IJSRuntime` bietet flexible und leistungsfähige Lösungen, um sicherzustellen, dass deine Anwendung stets mit den neuesten Daten aktualisiert wird.

### Benötigen Sie Unterstützung bei Ihrer Blazor-Entwicklung?
Als Experte für .NET und Webtechnologien unterstütze ich Sie bei der Umsetzung moderner Web-Anwendungen. [Entdecken Sie hier meine Services](/services/).

Experimentiere mit diesen Ansätzen und finde heraus, welcher am besten zu deinem Projekt passt. Viel Erfolg bei der Implementierung!

Bildnachweis: Bild von [Gerd Altmann](https://pixabay.com/users/geralt-9301/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4774766) auf [Pixabay](https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4774766)
