---
layout: post
title: "Echtzeit-Daten in Blazor WebAssembly mit SignalR"
slug: "blazor-wasm-signalr"
date: 2025-02-08 11:44:55 +0100
permalink: /blog/2025/02/08/echtzeit-datenabrufe-blazor-webassembly-signalr/
categories: [net, blazor, frontend-entwicklung, softwareentwicklung, webentwicklung]
description: "Blazor WebAssembly eröffnet spannende Möglichkeiten für die Entwicklung von Client-seitigen Webanwendungen mit C# und .NET. Doch es gibt einige Unterschiede zu Blazor Server..."
tags: [net-core, aspnet-core, backgroundservice, blazor-webassembly, c, client-seitige-entwicklung, datenbertragung, echtzeit-daten, echtzeit-kommunikation, hub, ijsruntime, live-daten, periodische-aufrufe, signalr, signalr-hub, timer, webanwendungen]
author: 
  name: "Christian Storb" 
  url: "/author/christian-storb/"
image: /assets/images/consulting/blog/signalr.webp
locale: "de_DE"
seo:
  type: BlogPosting
redirect_from:
  - /.NET/Blazor/Frontend-Entwicklung/Programmierung/Softwareentwicklung/Tech Tips/Webentwicklung/2025/02/08/echtzeit-datenabrufe-in-blazor-webassembly-nutzung-von-signalr.html
---
Blazor WebAssembly eröffnet spannende Möglichkeiten für die Entwicklung von Client-seitigen Webanwendungen mit C# und .NET. Doch es gibt einige Unterschiede zu Blazor Server, die Entwickler beachten müssen, insbesondere im Umgang mit Hintergrunddiensten. In einer Blazor WebAssembly App funktionieren `BackgroundService`-Dienste anders, da WebAssembly keine kontinuierlichen Hintergrunddienste unterstützt. Dies stellt Entwickler vor die Herausforderung, regelmäßig Daten abzurufen und an die Benutzeroberfläche zu senden, ohne auf traditionelle Hintergrunddienste zurückgreifen zu können.

Eine effektive Lösung für diese Herausforderung ist die Nutzung von SignalR. SignalR ermöglicht es, Daten in Echtzeit vom Server an die Clients zu pushen, ohne dass diese aktiv Anfragen stellen müssen. Dies ist besonders nützlich in Szenarien, in denen Daten in Echtzeit aktualisiert werden müssen, wie beispielsweise bei Benachrichtigungen, Chats oder Live-Datenströmen. In diesem Szenario wird der SignalR-Hub auf einem separaten Server (z.B. einem ASP.NET Core-Server) eingerichtet, mit dem die Blazor WebAssembly-Anwendung kommunizieren kann.

In diesem Blogartikel werde ich dir zeigen, wie du SignalR in einer Blazor WebAssembly App integrieren kannst, um Echtzeit-Daten abzurufen und an die Benutzeroberfläche zu senden. Dies stellt sicher, dass deine Anwendung stets auf dem neuesten Stand ist und Benutzer eine nahtlose und aktuelle Erfahrung genießen. Dieser Artikel konzentriert sich auf praktische Beispiele mit minimaler Erläuterung.

**1. SignalR Hub im Backend einrichten**

Erstelle einen SignalR Hub in deinem ASP.NET Core Backend-Projekt:

```csharp
public class DataHub : Hub
{
    public async Task SendData(string data)
    {
        await Clients.All.SendAsync("ReceiveData", data);
    }
}
```

**2. SignalR in der **`Startup.cs`** oder **`Program.cs`** konfigurieren**

Füge die erforderlichen Konfigurationen hinzu, um SignalR in deinem Backend zu aktivieren:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddSignalR(); 
    builder.Services.AddResponseCompression(opts =>
    {
          opts.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(
                 ["application/octet-stream"]);
    });
    // Weitere Service-Registrierungen
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseResponseCompression();
    app.MapHub<DiagramDataHub>("/datahub")
}
```

**3. Blazor WebAssembly App konfigurieren**

In deiner Blazor WebAssembly App kannst du den SignalR-Client konfigurieren, um Daten vom Server zu empfangen:

```razor
@page "/realtime-data"
@using Microsoft.AspNetCore.SignalR.Client
@inject NavigationManager Navigation

<h3>Echtzeit-Daten mit SignalR</h3>

<!-- Hier das Diagramm oder die Benutzeroberfläche einfügen -->

@code {
    private HubConnection? _hubConnection;

    protected override async Task OnInitializedAsync()
    {
        _hubConnection = new HubConnectionBuilder()
            .WithUrl(Navigation.ToAbsoluteUri("/datahub"))
            .Build();

        _hubConnection.On<string>("ReceiveData", (data) =>
        {
            // Diagramm oder Benutzeroberfläche mit den neuen Daten aktualisieren

            InvokeAsync(StateHasChanged);
        });

        await _hubConnection.StartAsync();
    }

    public async Task StopConnection()
    {
        if (_hubConnection.State == HubConnectionState.Connected)
        {
            await _hubConnection.StopAsync();
        }
    }

    public async ValueTask DisposeAsync()
    {
        if (_hubConnection is not null)
        {
            await _hubConnection.DisposeAsync();
        }
    }
}
```

**4. Daten vom Server an den Hub senden**

Wenn du Daten an die Clients senden möchtest, kannst du dies vom Server aus tun, z.B. in einem Controller oder Service:

```csharp
public class DataFetchService
{
    private readonly IHubContext<DataHub> _hubContext;

    public DataFetchService(IHubContext<DataHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task FetchDataAsync()
    {
        // Daten abrufen
        var data = "Neue Daten"; // Beispiel-Daten

        // Daten an den Hub senden
        await _hubContext.Clients.All.SendAsync("ReceiveData", data);
    }
}
```

**Fazit**

Während Blazor WebAssembly keine kontinuierlichen Hintergrunddienste unterstützt, bietet SignalR eine leistungsstarke Lösung für Echtzeit-Datenübertragungen. Durch die Integration von SignalR kannst du sicherstellen, dass deine Blazor WebAssembly Anwendung stets mit den neuesten Daten aktualisiert wird, indem der Server Daten direkt an die Clients pusht.

Experimentiere mit dieser Methode und finde heraus, wie SignalR deine Blazor WebAssembly App verbessern kann. Viel Erfolg bei der Implementierung!

#### Referenzen

- [Verwenden von ASP.NET Core SignalR mit Blazor](https://learn.microsoft.com/de-de/aspnet/core/blazor/tutorials/signalr-blazor)

Bildnachweis: KI-generiert mit Gemini [https://gemini.google.com](https://gemini.google.com)
