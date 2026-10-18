---
layout: default
title: "AdCanvas"
description: "Eine leichte, modulare Werbe‑ und Content‑Engine für moderne Websites."
version: "1.0.0"
date: 2026-03-07 12:00:00 +0100
nuget_id: null
repo_url: "https://github.com/chstorb/adcanvas"
---

<div class="container-fluid">

  <!-- Intro -->
  <div class="row justify-content-center mb-5">
    <div class="col-lg-9 text-center">
      <div class="mb-3">
         <img src="/assets/images/products/adcanvas.png" class="img-fluid" width="40%" alt="AdCanvas">
      </div>
      <p class="lead mb-3">
        Eine leichte, modulare Werbe‑ und Content‑Engine für moderne Websites.
      </p>
      <h3 class="mt-4">Warum AdCanvas?</h3>
      <p class="text-muted">
        AdCanvas ist ein framework‑agnostisches Rendering‑System für Anzeigen und Content‑Module.
        Es ist schnell, modular, leichtgewichtig und funktioniert in jeder Umgebung – von statischen
        Seiten bis zu komplexen Web‑Apps.
      </p>
    <p>
     <a href="https://codepen.io/editor/chstorb/pen/019d15fb-6659-7aa0-a61b-00233f8df247">📍 Live Demo</a> | <a href="https://github.com/chstorb/adcanvas">🔗 Repository</a>
    </p>
    </div>
  </div>

  <hr class="my-5 opacity-10">

    <ul class="list-group mb-4">
        <li class="list-group-item">⚡ Keine Abhängigkeiten – funktioniert überall</li>
        <li class="list-group-item">🎨 Mehrere Layouts: List, Multiplex, In‑Feed, Sidebar, Hero, Carousel</li>
        <li class="list-group-item">🧩 Themes: Light, Dark, Premium</li>
        <li class="list-group-item">📦 Einfache Integration über CDN</li>
        <li class="list-group-item">🛠️ Entwickelt für Publisher, Blogs und Content‑Plattformen</li>
    </ul>

    <h3 class="mt-5">Installation</h3>

    <div class="row">
        <h4 class="mt-4">CDN</h4>
        <pre>
&lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/chstorb/adcanvas@latest/dist/adcanvas.min.css"&gt;
&lt;script type="module" src="https://cdn.jsdelivr.net/gh/chstorb/adcanvas@latest/dist/adcanvas.min.js" defer&gt;&lt;/script&gt;
        </pre>
    </div>
    
    <div class="row">
        <h3 class="mt-5">Quickstart</h3>
        <p>Ein Beispiel mit dem <strong>Carousel Layout</strong>:</p>
        <div class="demo-block mb-4 p-3 border rounded bg-light">
            <div class="adcanvas-ad-slot" data-layout="carousel" data-count="10" data-autoplay="true" data-interval="3000"></div>
        </div>    
        <pre>
    &lt;div class="adcanvas-ad-slot" data-layout="carousel" data-count="10" data-autoplay="true" data-interval="3000"&gt;&lt;/div&gt;
        </pre>
    </div>

    <div class="row">
        <h3 class="mt-5">Die Demo‑Seite</h3>

    <p>Eine vollständige, interaktive Demo findest du hier:</p>

    <p>👉 <a href="https://codepen.io/editor/chstorb/pen/019d15fb-6659-7aa0-a61b-00233f8df247">https://codepen.io/editor/chstorb/pen/019d15fb-6659-7aa0-a61b-00233f8df247</a></p>

    <p>Die Demo zeigt das grundlegende Rendering, ein Custom‑Template und das Laden eines echten Travel‑Feeds.</p>
    </div>

    <hr class="my-5">

    <h3 class="mt-5">Themes</h3>

    <div class="row">
        <h3 class="mt-5">Custom Theme (CSS Variables)</h3>
        <p>Passe Layout und Farben nahtlos an, indem du die CSS‑Variablen <code>--adcanvas-</code> überschreibst.</p>
        <div class="demo-block">
            <div class="adcanvas-ad-slot my-custom-theme" data-layout="infeed" data-count="2"></div>
            <pre>
                &lt;style&gt;
                .my-custom-theme {
                --adcanvas-bg: #e1f5fe;
                --adcanvas-text: #01579b;
                --adcanvas-border: #4fc3f7;
                --adcanvas-radius-md: 16px;
                --adcanvas-radius-sm: 8px;
                --adcanvas-spacing-md: 20px;
                }
                &lt;/style&gt;

                &lt;div class="adcanvas-ad-slot my-custom-theme" data-layout="infeed" data-count="2"&gt;&lt;/div&gt;
            </pre>
        </div>
    </div>

    <div class="row">
        <h4 class="mt-4">Dark Theme</h4>
        <div class="demo-block mb-4 p-3 border rounded bg-dark text-white">
            <div class="adcanvas-ad-slot" data-layout="list" data-theme="dark" data-count="2"></div>
        </div>
    </div>

    <div class="row">
        <h4 class="mt-4">Premium Theme</h4>
        <div class="demo-block mb-4 p-3 border rounded bg-light">
            <div class="adcanvas-ad-slot" data-layout="multiplex" data-theme="premium" data-count="4"></div>
        </div>
    </div>

    <hr class="my-5">

    <h3 class="mt-5">Layouts</h3>

    <div class="row">
        <h4 class="mt-4">List Layout</h4>
        <div class="demo-block mb-4 p-3 border rounded bg-light">
            <div class="adcanvas-ad-slot" data-layout="list" data-count="3" data-label="Anzeige"></div>
        </div>
    </div>

    <div class="row">
        <h4>Multiplex Layout</h4>
        <div class="demo-block mb-4 p-3 border rounded bg-light">
            <div class="adcanvas-ad-slot" data-layout="multiplex" data-count="6"></div>
        </div>
    </div>

    <div class="row">
        <h4>In‑Feed Layout</h4>
        <div class="demo-block mb-4 p-3 border rounded bg-light">
            <div class="adcanvas-ad-slot" data-layout="infeed" data-count="3"></div>
        </div>
    </div>

    <div class="row">
        <h4>Sidebar Layout</h4>
        <div class="demo-block mb-4 p-3 border rounded bg-light">
            <div class="adcanvas-ad-slot" data-layout="sidebar" data-count="2"></div>
        </div>
    </div>

    <div class="row">
        <h4>Hero Layout</h4>
        <div class="demo-block mb-4 p-3 border rounded bg-light">
            <div class="adcanvas-ad-slot" data-layout="hero" data-count="1"></div>
        </div>
    </div>

    <hr class="my-5">

    <p>
        Weitere Informationen findest du im
        <a href="https://github.com/chstorb/adcanvas" class="fw-semibold">GitHub‑Repository</a>.
    </p>

</div>
