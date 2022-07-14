---
title: The best cloud storage for Linux (Ubuntu · Kubuntu) - OneDrive · Dropbox · Mega · IceDrive · pCloud · InSync · ProtonDrive · Google Drive
layout: layout_post.html
date: 2022-06-29 10:00:00
tags: ['post', 'cloud storage', 'linux', 'ubuntu', 'kubuntu']
---

I switched from Windows 10 to Ubuntu 22.04 (Kubuntu).
The first challenge I had was wondering how to integrate my current cloud storage data backup service, OneDrive, with Linux.

I investigated all the options briefly and here's what I chose. (Bear in mind I need to backup about 60GB, if you need less space consider the free pricing plans of some of these options.)

## OneDrive
- 1TB is $60 per year.
- Does not have a Linux app.

## IceDrive
- 1TB is $50 (and even cheaper p.a. for a lifetime purchase).
- The Linux snap client crashes, but the app image downloaded from their site works. However their folder setup is unnecessarily complicated.
- Does not have selective sync.

## InSync
- A management service, not a storage service.
- $50 for a lifetime purchase of managing *one* cloud account (e.g. OneDrive, Dropbox, etc) for multiple devices.
- Has a Linux app.
- Reviews claim it is buggy - files going missing and aren't synched correctly.

## Mega
- 2TB for $126.
- 20 GB free storage (compared to most other services 5GB). But they delete your files after 3 months inactivity!
- The only company that limits bandwidth in addition to storage size. This was very unattractive for me, even though I probably would never reach their bandwidth use. What if you need to sync many computers in future, or reinstall lots of times?

## Dropbox
- 2TB for $126.
- Works across all devices with a native app, including Linux. Very easy to install and use.
- Maximum 3 devices on free version.
- This service has never deleted my files for inactivity.

## pCloud
- $175 for lifetime 500GB.
- Has a Linux app.
- The company has very bad discussions on Reddit - people's accounts being suspended without refund for no reason.

## Proton Drive
- $120 for 500GB.
- No app for any device.
- While I admire the company, this is still in beta.

## Google Drive
- Ubuntu provides an account sign in mechanism as opposed to an independent app.
- My Google Drive is already filled with app backups, phone photos, and online documents. I don't want to get confused and clutter it more with file backups.

## Conclusion
In the end I chose to stay with OneDrive for most of my backups, and simply backup my files manually through their web interface.
It has proven to be a trustworthy service, with good selective sync, and Android support.

I use Dropbox free (5GB) to sync between two computers and my phone for current work and notes.

Dropbox would be the best solution for all my needs, but 2TB is more expensive for more space than I use.

Finally, while reading all the reviews on Reddit, I was reminded that you should always encrypt your files (e.g. with 7zip and a password) that you save on cloud storage. These companies have full access to your files, and regularly scan them for any content they deem inappropriate. They can cancel your account at any time with no recourse.

And if they were truly malicious they could alter your files without you knowing, if you don't encrypt the files you upload.

## P.S.
You might also want to look into `par` and `lzip` to handle error recovery in case your files ever get corrupted during years of storage.