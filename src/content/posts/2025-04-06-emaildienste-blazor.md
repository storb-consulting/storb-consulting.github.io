---
layout: post
title: "E-Mail-Dienste in Blazor mit Twilio SendGrid"
slug: "emaildienste-blazor"
date: 2025-04-06 13:20:52 +0100
categories: [net, azure, blazor, softwareentwicklung, visual-studio, webentwicklung]
description: "Im Folgenden wird erläutert, wie Sie in Visual Studio 2022 Funktionen für Kontobestätigung und Kennwortwiederherstellung in einer ASP.NET Core Blazor-Webanwen..."
tags: [e-mail-dienst, sendgrid]
author: 
  name: "Christian Storb" 
  url: "/author/christian-storb/"
image: /assets/images/consulting/blog/kontobestaetigung-identity.jpg
locale: "de_DE"
seo:
  type: BlogPosting
redirect_from:
  - /.NET/Azure/Blazor/Programmierung/Softwareentwicklung/Visual Studio/Webentwicklung/2025/04/06/405.html
---
Im Folgenden wird erläutert, wie Sie in Visual Studio 2022 Funktionen für Kontobestätigung und Kennwortwiederherstellung in einer ASP.NET Core Blazor-Webanwendung implementieren können. Dabei nutzen wir Twilio SendGrid mit dem SendGrid NuGet Package. Das Package kann sowohl über den dotnet-Befehl als auch den NuGet Package Manager in Visual Studio installiert werden.

**Dieser Artikel konzentriert sich auf praktische Beispiele mit minimaler Erläuterung.**

## 1. Einrichtung von Twilio SendGrid

- Installieren Sie das `SendGrid`-NuGet-Paket mit einem der folgenden Befehle:<br><br>

```bash
dotnet add package SendGrid
```

oder

```bash
Install-Package SendGrid
```
<br><br>
- Erstellen Sie einen API-Schlüssel in Ihrem Twilio SendGrid-Konto und speichern Sie ihn sicher. Der API-Schlüssel sollte während der Entwicklung als geheimer Benutzerschlüssel gespeichert werden. Für produktive Umgebungen empfiehlt es sich jedoch, den Schlüssel sicherer zu verwalten. Dies kann in Azure App Service durch Verwendung von Umgebungsvariablen oder durch Speicherung in der Azure App Configuration erfolgen. Eine noch sicherere Option ist die Verwendung von Azure Key Vault, um sensible Daten wie API-Schlüssel zu schützen und den Zugriff darauf besser zu kontrollieren.

## 2. Konfiguration der AuthMessageSenderOptions

Fügen Sie eine die Klasse `AuthMessageSenderOptions` hinzu. Die Klasse wird verwendet, um den API-Schlüssel aus der Konfiguration auszulesen.

```csharp
namespace BlazorWebApp;
public class AuthMessageSenderOptions {
    public string? SendGridKey { get; set; }
}
```

## 3. Registrierung der Konfiguration in `Program.cs`

```csharp
builder.Services.Configure<AuthMessageSenderOptions>(builder.Configuration);
```

## 4. Implementierung von `IEmailSender`

Erstellen Sie eine Klasse `EmailSender`, um das Senden von E-Mails zu implementieren:

```csharp
namespace BlazorWebApp.Components.Account;

using BlazorWebApp.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

internal class EmailSender(IOptions<AuthMessageSenderOptions> optionsAccessor,
    ILogger<EmailSender> logger) : IEmailSender<ApplicationUser>
{
    private readonly ILogger logger = logger;

    public AuthMessageSenderOptions Options { get; } = optionsAccessor.Value;

    public Task SendConfirmationLinkAsync(ApplicationUser user, string email, string confirmationLink) => SendEmailAsync(email,
            "Confirm your email",
            $"Please confirm your account by opening the following link in your browser '{confirmationLink}'.",
            $"<html lang=\"en\"><head></head><body>Please confirm your account by <a href='{confirmationLink}'>clicking here</a>.</body></html>");

    public Task SendPasswordResetLinkAsync(ApplicationUser user, string email, string resetLink) => SendEmailAsync(email,
            "Reset your password",
            $"Please reset your password by opening the following link in your browser '{resetLink}'.",
            "<html lang=\"en\"><head></head><body>Please reset your password by " + $"<a href='{resetLink}'>clicking here</a>.</body></html>");

    public Task SendPasswordResetCodeAsync(ApplicationUser user, string email, string resetCode) => SendEmailAsync(email,
            "Reset your password",
            $"Please reset your password using the following code: {resetCode}",
            "<html lang=\"en\"><head></head><body>Please reset your password " + $"using the following code:<br>{resetCode}</body></html>");

    public async Task SendEmailAsync(string toEmail, string subject, string plainTextContent, string htmlContent)
    {
        if (string.IsNullOrEmpty(Options.EmailAuthKey))
        {
            throw new Exception("Null EmailAuthKey");
        }

        await Execute(Options.EmailAuthKey, subject, plainTextContent, htmlContent, toEmail);
    }

    public async Task Execute(string apiKey, string subject, string plainTextContent, string htmlContent, string toEmail)
    {
        var client = new SendGridClient(apiKey);
        var from = new EmailAddress("info@storbconsulting.de", "STC STORB Consulting");
        var to = new EmailAddress(toEmail, toEmail);

        var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
        var response = await client.SendEmailAsync(msg).ConfigureAwait(false);

        logger.LogInformation("Email to {EmailAddress} sent!", toEmail);
    }
}
```

## 5. Konfiguration in `Program.cs`

```csharp
builder.Services.AddSingleton<IEmailSender, EmailSender>();
```

Mit diesen Schritten können Sie E-Mails für Kontobestätigung und Kennwortwiederherstellung in Ihrer Blazor-Webanwendung implementieren.

## Referenzen

- [Kontobestätigung und Kennwortwiederherstellung in ASP.NET Core Blazor](https://learn.microsoft.com/de-de/aspnet/core/blazor/security/account-confirmation-and-password-recovery?view=aspnetcore-9.0)

- [TWILIO SendGrid](https://github.com/sendgrid/sendgrid-csharp)
