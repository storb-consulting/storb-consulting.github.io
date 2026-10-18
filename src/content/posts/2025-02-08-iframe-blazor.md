---
layout: post
title: "iframes in Blazor-Seiten vollständig anpassen"
slug: "iframe-blazor"
date: 2025-02-08 15:53:39 +0100
categories: [net, blazor, webentwicklung]
description: "Einleitung In diesem Artikel zeigen wir, wie man einen iframe in einer Blazor-Anwendung so konfiguriert, dass er die gesamte verfügbare Fläche in einem Seiten..."
tags: [blazor-komponente, css, html, iframe, parameter, scoped-css]
author: 
  name: "Christian Storb" 
  url: "/author/christian-storb/"
image: /assets/images/consulting/blog/coding-924920_1280.webp
locale: "de_DE"
seo:
  type: BlogPosting
redirect_from:
  - /.NET/Blazor/Frontend-Entwicklung/Programmierung/Softwareentwicklung/Tech Tips/Webentwicklung/2025/02/08/wie-man-einen-iframe-in-einer-blazor-seite-vollstandig-anpasst-und-einen-parameter-fur-die-webseite-hinzufugt.html
---

In diesem Artikel zeigen wir, wie man einen `iframe` in einer Blazor-Anwendung so konfiguriert, dass er die gesamte verfügbare Fläche in einem Seitenbereich einnimmt und dabei einen erforderlichen Parameter für die Webseite verwendet. Zusätzlich werden wir scoped CSS verwenden, um das Styling auf die spezifische Komponente zu beschränken.

**Schritt 1: Erstellen der Blazor-Komponente mit erforderlichem Parameter**

Erstellen Sie eine neue Blazor-Komponente (`.razor`-Datei), zum Beispiel `IframeComponent.razor`, und fügen Sie einen erforderlichen Parameter für die Webseite hinzu.

```razor
<div class="iframe-container">
    <iframe src="@Url"></iframe>
</div>

@code {
    [Parameter]
    public required string Url { get; set; }
}
```

**Schritt 2: Scoped CSS hinzufügen**

Erstellen Sie eine CSS-Datei mit dem gleichen Namen wie Ihre Komponente, aber mit der Endung `.razor.css` (zum Beispiel `IframeComponent.razor.css`). Dieses CSS wird nur auf Ihre Komponente angewendet.

```css
/* IframeComponent.razor.css */
.iframe-container {
    position: relative;
    width: 100%;
    height: 100vh; /* oder eine andere Höhe, die Sie benötigen */
    overflow: hidden;
}

.iframe-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
}
```

**Schritt 3: Erstellen einer Blazor-Seite und Einbinden der Komponente**

Erstellen Sie eine neue Blazor-Seite (`.razor`-Datei), zum Beispiel `IframePage.razor`, und fügen Sie die erstellte Komponente in diese Seite ein. Übergeben Sie den gewünschten URL-Parameter.

```razor
@page "/iframepage"

<PageTitle>Iframe Beispiel</PageTitle>

<div class="container">
    <IframeComponent Url="https://jsfiddle.net/u/chstorb/fiddles/" />
</div>
```

**Fazit**

Mit diesen einfachen Schritten können Sie einen `iframe` in Ihrer Blazor-Anwendung so konfigurieren, dass er die gesamte verfügbare Fläche in einem Seitenbereich einnimmt und dabei einen erforderlichen Parameter für die Webseite verwendet. Durch die Verwendung von scoped CSS stellen Sie sicher, dass das Styling nur auf die spezifische Komponente angewendet wird, wodurch mögliche Konflikte mit anderen Stilen vermieden werden.
