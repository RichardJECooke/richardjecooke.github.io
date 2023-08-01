---
title: The best cloud storage for Linux (Ubuntu · Kubuntu) - OneDrive · Dropbox · Mega · IceDrive · pCloud · InSync · ProtonDrive · Google Drive
layout: layout_post.html
date: 2022-06-29 10:00:00
tags: ['post', 'cloud storage', 'linux', 'ubuntu', 'kubuntu']
---

I switched from Windows 10 to Ubuntu 22.04.
The first challenge I had was wondering how to integrate my current cloud storage data backup service, OneDrive, with Linux.

I investigated all the options briefly and here's what I chose. (Bear in mind I need to backup about 60GB, if you need less space consider the free pricing plans of some of these options.)

## OneDrive
- 1 TB is $60 per year.
- Does not have a Linux app.

## IceDrive
- 1 TB is $50 (and even cheaper p.a. for a lifetime purchase).
- The Linux snap client crashes, but the app image downloaded from their site works. However their folder setup is unnecessarily complicated.
- Does not have selective sync.

## InSync
- A management service, not a storage service.
- $50 for a lifetime purchase of managing *one* cloud account (e.g. OneDrive, Dropbox, etc) for multiple devices.
- Has a Linux app.
- Reviews claim it is buggy — files going missing and aren't synched correctly.

## Mega
- 2 TB for $126.
- 20 GB free storage (compared to most other services 5GB). But they delete your files after 3 months inactivity.
- The only company that limits bandwidth in addition to storage size. This was very unattractive for me, even though I probably would never reach their bandwidth use. What if you need to sync many computers in future, or reinstall lots of times?

## Dropbox
- 2 TB for $126.
- Works across all devices with a native app, including Linux. Very easy to install and use.
- Maximum 3 devices on free version.
- This service has never deleted my files for inactivity.

## pCloud
- $175 for lifetime 500 GB.
- Has a Linux app.
- The company has very bad discussions on Reddit — people's accounts being suspended without refund for no reason.

## Proton Drive
- $120 for 500 GB.
- No app for any device.
- While I admire the company, this is still in beta.

## Google Drive
- Ubuntu provides an account sign in mechanism as opposed to an independent app.
- My Google Drive is already filled with app backups, phone photos, and online documents. I don't want to get confused and clutter it more with file backups.

## Conclusion
I chose ProtonDrive for my main backup due its end-to-end encryption. This requires manually copying any folders I change on my local machine into the web app.

For files that change frequently, like notes and my current projects, I use Dropbox free (5 GB). It syncs between my Linux and Window machines.

For transferring files to my phone and tablet, such as books for reading, I use Sync.com. I drag them manually from my computer into the web interface — a one-way transfer.

Finally, while reading all the reviews on Reddit, I was reminded that you should always encrypt your files (e.g. with 7zip and a password) that you save on cloud storage. These companies have full access to your files, and regularly scan them for any content they deem inappropriate. They can cancel your account at any time with no recourse.

And if they were truly malicious they could alter your files without you knowing if you don't encrypt the files you upload.

## P.S.
You might also want to look into `par` and `lzip` to handle error recovery in case your files ever get corrupted during years of storage.

I do not recommend the encryption app Cryptomator. It corrupted my files irrecoverably.