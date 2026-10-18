---
layout: post
title: "Update ECDSA Host Key"
slug: "update-ecdsa-host-key"
date: 2023-10-15 20:04:01 +0100
categories: [raspberry-pi]
description: "To update the ECDSA host key, you can remove the cached key for the IP address of the server on your local machine using the following command: ssh-keygen -R ..."
tags: [raspberry-pi]
author: 
  name: "Christian Storb" 
  url: "/author/christian-storb/"
locale: "en_US"
image: /assets/images/consulting/blog/kontobestaetigung-identity.jpg
seo:
  type: BlogPosting
redirect_from:
  - /Raspberry Pi/2023/10/15/update-ecdsa-host-key.html
---
To update the ECDSA host key, you can remove the cached key for the IP address of the server on your local machine using the following command: 

```bash
ssh-keygen -R <IP address>
```

This will remove the old key from your known_hosts file.

Alternatively, you can update the key instead of removing it by using 

```bash
ssh-keyscan -t ecdsa <server domain or IP address> >> ~/.ssh/known_hosts
```

This will add the new key to your known_hosts file and hash the hostname/address.
