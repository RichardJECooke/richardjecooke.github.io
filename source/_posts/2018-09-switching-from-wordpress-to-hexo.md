---
title: Switching from Wordpress to Hexo
date: 2018-09-03 12:33:09
categories:
- coding
tags:
- hexo
- wordpress
- javascript
---

I've just deleted my old Wordpress site and switched to [Hexo.js](https://hexo.io/).

## Hexo benefits
- Far faster and easier to work with. Posts are just Markdown files I create in Visual Studio Code, commit in git, and hit `./node_modules/.bin/hexo deploy`. My updated site is automatically uploaded to my web server, bitbucket pages, and github pages.
- My site will last forever. Even once I die and stop paying for my domain name the site will live on bitbucket and github for free for as long as they last.
- Better control. No need to hassle with Wordpress altering all your writing when you switch between text and visual mode. And I want to create a custom layout I just make an HTML page however I want and I'm done.
- No hassling with themes and visual editors. It's just CSS and HTML files in your project folder.
- No plugins/updates/security woes. The site is just HTML pages and JS I upload so there's zero maintenance.
- The Hexo docs themselves are written in Hexo. I've found poor information that I corrected in a fork of the site and submitted to the maintainers in a pull request.

## Reasons not use Hexo
- If you're maintaining a site with lots of people who aren't programmers
- If the site needs lots of plugins like ecommerce
- If you're building the site for a customer and someone else will maintain it.

Basically it's great for a personal or project page, not or standard multi-user web apps. 
