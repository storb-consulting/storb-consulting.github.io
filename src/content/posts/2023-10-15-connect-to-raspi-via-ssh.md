---
layout: post
title: "Connect to Raspberry Pi via SSH"
slug: "connect-to-raspi-via-ssh"
date: 2023-10-15 20:00:30 +0100
categories: [raspberry-pi]
description: "To connect to your Raspberry Pi via SSH, you need to enable SSH on your Raspberry Pi and then use the command prompt on your computer to connect to it. Here a..."
author: 
  name: "Christian Storb" 
  url: "/author/christian-storb/"
locale: "en_US"
image: /assets/images/consulting/blog/computer-8045000_1280.webp
seo:
  type: BlogPosting
redirect_from:
  - /Raspberry Pi/2023/10/15/connect-to-raspberry-pi-via-ssh.html
---
- **Enable SSH on your Raspberry Pi**: To enable SSH from the terminal, type `sudo raspi-config` and select "Interfacing Options" > "P2 SSH" > "Yes" when asked if you want to enable the SSH server .
- **Discover the IP address or hostname of your Raspberry Pi**: You'll need to know the IP address or hostname of your Raspberry Pi. From the terminal, type `hostname -i` to get a list of IP addresses for your Raspberry Pi. Make note of the address or hostname for later .
- **Connect to your Raspberry Pi via SSH**: Open a command prompt on your computer and enter `ssh <username>@<IP or Host Name>` where `<username>` is your username and `<IP or Host Name>` is the IP address or hostname of your Raspberry Pi. Enter your password when prompted and you will be connected .
  