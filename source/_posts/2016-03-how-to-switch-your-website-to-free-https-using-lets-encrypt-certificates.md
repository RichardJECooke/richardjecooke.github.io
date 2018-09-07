---
layout: post
title: How to switch your website to free HTTPS using Let's Encrypt certificates
tags:
  - http
  - https
  - let's encrypt
  - ssl
  - tls
categories:
  - security
date: 2016-03-20 10:02:52
---

Add the certificate
-------------------

Sign in to cPanel of your webhost. Under security - click 'Let's Encypt' - Click issue. ![letsencrypt](letsencrypt-211x300.png)

Redirect any HTTP request to your site to HTTPS
-----------------------------------------------

In an FTP program (e.g. WinSCP on Windows) connect to your site and browse to public_html. Edit the .htaccess file, add the lines below to the very bottom, save it, refresh your site to see that it worked.

```
# REDIRECT HTTP TO HTTPS
RewriteEngine On
RewriteCond %{ENV:HTTPS} !on
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```
