---
layout: post
title: Deploying Azure web apps (faster) & remote debugging
url: 7544.html
id: 7544
categories:
  - Azure
  - 'C#'
  - programming
date: 2014-09-12 14:30:18
tags:
---

This article briefly describes publishing Azure web applications (web sites in a cloud service), a potential way of doing it faster, and how to debug your site remotely.

Publishing your application
===========================

Assume we have a solution with a cloud service that has a web application, as shown below: [![wv1](http://richardcooke.info/wp-content/uploads/2014/09/wv1.png)](http://richardcooke.info/wp-content/uploads/2014/09/wv1.png) To publish, right click the service, not the site and choose Publish: [![wv2](http://richardcooke.info/wp-content/uploads/2014/09/wv2.png)](http://richardcooke.info/wp-content/uploads/2014/09/wv2.png) In the publish form settings be sure to select all the debug and remote debugging options: [![wv3](http://richardcooke.info/wp-content/uploads/2014/09/wv3.png)](http://richardcooke.info/wp-content/uploads/2014/09/wv3.png) Choosing Build configuration 'Debug' allows the debugger to see symbol information when attaching to the remote process.  When deploying your final production site change this to 'Release'. 'Enable Web Deploy' allows you to deploy the **website** rather than the **cloud service** in future publishes.  I.e. the deployment won't instantiate a whole new virtual machine like it normally does, it will just copy the the application files to the existing instance. [![wv4](http://richardcooke.info/wp-content/uploads/2014/09/wv4.png)](http://richardcooke.info/wp-content/uploads/2014/09/wv4.png)

Publishing with Web Deploy to deploy to Azure faster
====================================================

Allegedly Web Deploy deploys faster than a full publish because its just copies files, and doesn't create a new instance.  However I found it to be no faster than a full publish (20 minutes on average).  But give it a try, maybe it will work better for you. To web deploy, publish the website, not the cloud service:[![wv5](http://richardcooke.info/wp-content/uploads/2014/09/wv5.png)](http://richardcooke.info/wp-content/uploads/2014/09/wv5.png)

Remote debugging
================

To remote debug follow these steps:

1.  Publish your application, as explained above.
2.  Browse to it in a web browser (if you don't do this it won't start the IIS process for you to attach to).
3.  Open Server Explorer in Visual Studio, browse to Azure, and attach to your process (it will be called w3wp.exe, the same as a local IIS instance).
4.  Debugging works as normal from here on, except slower.

[![wv6](http://richardcooke.info/wp-content/uploads/2014/09/wv6.png)](http://richardcooke.info/wp-content/uploads/2014/09/wv6.png)