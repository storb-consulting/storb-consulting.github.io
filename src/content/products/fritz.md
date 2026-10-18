---
layout: product
title: "Fritz#"
description: "NET‑Bibliothek für eine nahtlose Anbindung der AVM‑Fritz!Box über TR‑064 – schnell, stabil, integrationsbereit."
version: "1.1.0"
date: 2024-01-01 12:00:00 +0100
nuget_id: "Fritz"
repo_url: "https://github.com/chstorb/Fritz"
---

## Overview

Fritz is a .NET library designed to simplify interaction with AVM Fritz!Box routers via the TR-064 protocol. It provides easy access to features like phonebook exports and device information.

## Quick Start

Here is a simple example of how to authenticate and export the phonebook as a CSV file.

```csharp
using Fritz;
var client = new FritzClient("http://fritz.box", "username", "password");
await client.AuthenticateAsync();
var csv = await client.Phonebook.ExportCsvAsync();
File.WriteAllText("phonebook.csv", csv);
```

For more details, visit the [GitHub Repository](https://github.com/chstorb/Fritz).
