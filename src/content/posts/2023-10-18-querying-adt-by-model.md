---
layout: post
title: "Querying Azure Digital Twins by Model"
slug: "querying-adt-by-model"
date: 2023-10-18 15:36:01 +0100
categories: [azure]
description: "To query Azure Digital Twins by model, you can use the Azure Digital Twins query language. The query language allows you to filter based on the twin's model, ..."
tags: [digital-twins, query]
author: 
  name: "Christian Storb" 
  url: "/author/christian-storb/"
image: /assets/images/consulting/blog/kontobestaetigung-identity.jpg
locale: "en_US"
seo:
  type: BlogPosting
redirect_from:
  - /Azure/2023/10/18/querying-azure-digital-twins-by-model.html
---
To query Azure Digital Twins by model, you can use the **Azure Digital Twins query language**. The query language allows you to filter based on the twin's model, including inheritance and model versioning. Here is an examples of how to get all digital twins that are based on the Room model. Enter the following query in the Query field and click the Run Query button in Azure Digital Twins Explorer:

```sql
SELECT * FROM DIGITALTWINS WHERE IS_OF_MODEL ('dtmi:com:smartbuilding:Room;1')
```
