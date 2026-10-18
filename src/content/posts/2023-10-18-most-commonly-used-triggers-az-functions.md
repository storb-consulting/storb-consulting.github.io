---
layout: post
title: "Most commonly used triggers in Azure Functions"
slug: "most-commonly-used-triggers-az-functions"
date: 2023-10-18 14:23:27 +0100
categories: [azure]
description: "Azure Functions provides a wide range of triggers that can be used to run your functions. Here are some of the most commonly used triggers"
tags: [azure-functions]
author: 
  name: "Christian Storb" 
  url: "/author/christian-storb/"
image: /assets/images/consulting/blog/artificial-intelligence-3382507_1920.jpg
locale: "en_US"
seo:
  type: BlogPosting
redirect_from:
  - /Azure/2023/10/18/most-commonly-used-triggers-in-azure-functions.html
---
Azure Functions provides a wide range of triggers that can be used to run your functions. Here are some of the most commonly used triggers:
	
- HTTP trigger: This trigger allows you to invoke your function via an HTTP request. You can use this trigger to create RESTful APIs or webhooks.
- Blob storage trigger: This trigger runs your function when a new or updated blob is detected in Azure Blob Storage.
- Queue storage trigger: This trigger runs your function when a new message is added to an Azure Storage queue.
- Event Grid trigger: This trigger runs your function when an event is published to an Azure Event Grid topic.
- Service Bus queue trigger: This trigger runs your function when a new message is added to an Azure Service Bus queue.
	
You can find more information about these triggers and how to use them in the official Microsoft documentation.

## References  

- [Triggers and bindings in Azure Functions - Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings).
- [Execute an Azure Function with triggers - Training](https://learn.microsoft.com/en-us/training/modules/execute-azure-function-with-triggers).
- [Azure Functions HTTP trigger - Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook-trigger).
