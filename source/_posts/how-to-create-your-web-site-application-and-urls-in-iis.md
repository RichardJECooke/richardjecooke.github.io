---
layout: post
title: 'How to create your web site, application, and URLs in IIS'
tags:
  - iis
url: 7814.html
id: 7814
categories:
  - IIS
date: 2015-09-22 20:54:36
---

My team had just finished a .NET web service and AngularJS web app that used it and we wanted to deploy to IIS.

Adding applications to the default site
---------------------------------------

When newly installed, IIS has one default website that listens for calls on the standard HTTP port, 80. [According to Microsoft](https://www.iis.net/learn/get-started/planning-your-iis-architecture/understanding-sites-applications-and-virtual-directories-on-iis), each website you create needs at least one application. So one option is to add your service and app to the default site. However, each app you add must have an alias. This alias is appended the URL of the default site.  For instance, below I've added two apps to the default site, with aliases **a** and **b**. [![default iis](http://richardcooke.info/wp-content/uploads/2015/09/default-iis.png)](http://richardcooke.info/wp-content/uploads/2015/09/default-iis.png) You can browse to the b app by browsing to **http://localhost/b**.

### Problems with this approach

But what if your client doesn't want to type **/b** to view the website?  For instance, they might have configured **www.b.com** on their intranet to point to server **192.168.0.1**. But in the setup above they would have to browse to **www.b.com/b**. Very annoying. Secondly, [it's better to have each app in it's own site](http://serverfault.com/questions/427531/in-iis-is-it-better-to-host-multiple-applications-as-independent-web-sites-or-a) to allow greater control, being able to restart each site individually, and avoiding web.config clashes. (To redirect a URL to a specific server, alter your [hosts file](https://en.wikipedia.org/wiki/Hosts_%28file%29), like this: [![hosts](http://richardcooke.info/wp-content/uploads/2015/09/hosts.png)](http://richardcooke.info/wp-content/uploads/2015/09/hosts.png)

Put each app in its own site
----------------------------

So rather delete the default web site and create a site for **a** and a site for **b**, both on port 80, with apps for each inside each site, like this: [![separate iis sites](http://richardcooke.info/wp-content/uploads/2015/09/separate-iis-sites.png)](http://richardcooke.info/wp-content/uploads/2015/09/separate-iis-sites.png)   In this example, if you browse to **http://localhost/a** you'll hit web app **a**, and if you browse to **http://www.b.com** you'll hit web app **b**. [![browsing sites](http://richardcooke.info/wp-content/uploads/2015/09/browsing-sites.png)](http://richardcooke.info/wp-content/uploads/2015/09/browsing-sites.png) The important trick here is when creating web site **b** you need to [set the **host name**](https://technet.microsoft.com/en-us/library/cc753195%28v=ws.10%29.aspx), otherwise IIS will tell you it can't handle two sites both trying to listen on port 80. This setting is checked by IIS when receiving a web request and is part of the HTTP request header. [![host header](http://richardcooke.info/wp-content/uploads/2015/09/host-header.png)](http://richardcooke.info/wp-content/uploads/2015/09/host-header.png)  

Another way of configuring URLs
-------------------------------

If the technique above doesn't satisfy what you need to do in your configuration, maybe [rewriting](http://blogs.technet.com/b/mspfe/archive/2013/11/27/how-to-create-a-url-alias-using-iis-url-rewrite.aspx) can help you.