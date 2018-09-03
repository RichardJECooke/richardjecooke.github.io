---
layout: post
title: >-
  How to install Reaper, Drum Pro, and Helm synthesizer in Ubuntu Linux fast &
  easily
tags:
  - Helm
  - Linux
  - Reaper
  - Ubuntu
url: 8390.html
id: 8390
categories:
  - music
date: 2018-01-09 03:58:43
---

It used to be hard, now it's quick, and it works. This quick set of steps shows to install Reaper as fast as possible, as well as two free VST plugins - a clear synthesizer with useful presets, and a decent drum machine.

## The commands
* In a console run `sudo apt install jack`
* Install PlayOnLinux through the software manager
* Download 32 bit [Reaper](https://www.reaper.fm/download.php), [Helm](http://tytel.org/helm/direct_downloads/), [Drum Pro](https://www.studiolinked.com/drum-pro/)
* Run PlayOnLinux and install all three apps in the same virtual drive (you can use the default drive)
* Run Reaper, select the default WaveOut audio (it won't play yet), restart PlayOnLinux and Reaper (audio now works)
* Set the VST plugins folder to include Helm and Drum Pro (`/home/PlayOnLinux's virtual drives/drive_c/Program Files/VstPlugins` and the Steinberg folder too)
* Add two new tracks in a Reaper project, add your free synth and drums and write music. Easy.

## Stuff that doesn't work

I ignored anything online I found about wineasio because I couldn't get it to work.  
I tried LMMS too but it couldn't run either plugin - they showed up as blank GUI boxes. And installing the Linux version of Helm seems pointless as all Linux DAWs run only Windows VSTs.
