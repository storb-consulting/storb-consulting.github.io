---
layout: product
title: "Money on GitHub"
description: ".NET‑Bibliothek zum Erstellen von SEPA‑Zahlungsdateien (pain.001) und zum Einlesen sowie Auswerten von Kontoauszügen."
version: "0.9.0"
date: 2024-01-01 12:00:00 +0100
nuget_id: "Money.Unifi"
repo_url: "https://github.com/chstorb/Money"
---

## Overview

Money on GitHub provides a robust set of tools for working with financial data formats, specifically SEPA XML messages. It supports generating `pain.001` credit transfer files and can be extended for various banking needs.

## Quick Start

Create a SEPA Credit Transfer (pain.001) file with just a few lines of code:

```csharp
using Money.Unifi;
var payment = new Pain001Builder()
    .WithDebtor("DE1234567890", "ACME GmbH")
    .AddCreditTransfer("DE0987654321", 100.00m, "Invoice 123")
    .Build();
var xml = payment.ToXml();
File.WriteAllText("pain.001.xml", xml);
```

Check out the [GitHub Repository](https://github.com/chstorb/Money) for full documentation.
