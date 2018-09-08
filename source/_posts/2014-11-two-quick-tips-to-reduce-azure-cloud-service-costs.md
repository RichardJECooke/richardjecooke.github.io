---
layout: post
title: Two quick tips to reduce Azure cloud service costs
tags:
  - azure
categories:
  - azure
  - coding
date: 2014-11-12 22:05:04
---

Here are two quick tips to reduce your Azure fees:

1.  The default of a cloud service size is 'small'.  You can change it to extra small in your cloud service - properties - settings. This will reduce your costs from $90 to $30 a month at the time of writing.  The difference between 'extra small' and 'small' is that the virtual machine memory is 780 MB instead of 1780 MB.
2.  All instances are billed all the time even if they're off.  And staging and live instances of the same cloud service are billed separately.  So delete staging deployments when you're done with them immediately.
