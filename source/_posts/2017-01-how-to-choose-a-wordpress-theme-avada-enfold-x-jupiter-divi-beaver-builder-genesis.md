---
layout: post
title: >-
  How to choose a WordPress theme: Avada vs Enfold vs X vs Jupiter vs Divi vs
  Beaver Builder vs Genesis
tags:
  - Avada
  - Beaver Builder
  - Divi
  - Enfold
  - Envato
  - Genesis
  - Jupiter
  - WordPress
categories:
  - Wordpress
date: 2017-01-28 21:14:05
---

Are you trying to choose your first WordPress theme and starting down a rabbit hole of review websites, YouTube reviews, and dazzling sales pages?  I've just finished that process and have the best answer for you.

## Envato
I started at [ThemeForest](https://themeforest.net/popular_item/by_category?category=wordpress) (Envato) looking at the top selling themes: Avada, X, Jupiter, Enfold.

These are $60 each for a year for use on one site and have visual page builders and lots of fancy plugin widgets. Seems good, I thought, now to review and pick one.

## Divi
Then I discovered [Divi](https://www.elegantthemes.com/gallery/divi/) by Elegant Themes and realised that Envato's cost & licenses are restrictive and expensive for the features they offer. 

In contrast, an Elegant Themes lifetime membership is only $250 to use **all** their themes and plugins on unlimited sites (including clients) forever (or you can pay $90 per site if you prefer). 

Their visual page builder looks simple, they have lots of templates, and lots of powerful widgets.

## The problem with themes
Before I purchased Divi I Googled one last concept that no theme reviews mention: **code cleanliness and reusability** (which is important to programmers like me, but not so much to designers & YouTube entrepreneurs that do most WordPress theme reviews). 

Luckily I found this life changing article: [http://chrislema.com/divi-theme-forever/](http://chrislema.com/divi-theme-forever/). Basically it says that all the themes I mentioned above use \[shortcodes\] - snippets of text that a theme uses as special instructions to display your site that become pages of meaningless garbage if you ever try to change your theme. Go see the image in the article I just linked. 

Ideally, a theme should just save CSS & HTML, and **never** use shortcodes (that's what plugins are for). 

If you use any of the themes above then the sites you build will probably never be able to change theme and you make maintainability vastly more difficult for the programmers who work on them next.

## Beaver Builder
There is one only visual page builder that doesn't use shortcodes: [Beaver Builder](https://www.wpbeaverbuilder.com/). This means you can use it to quickly build a site visually, like the other themes above that use Visual Composer and Cornerstone and Divi as their page builders. Beaver just outputs HTML & CSS, so if you ever change theme your content will still be usable. And you can carry on using Beaver Builder with the new theme. It comes with a good theme too, that has over a dozen page templates and layouts - Beaver Theme. 

It's $199 to use on unlimited sites forever, but you get updates & support only for a year, so it's more expensive than Divi.  And it has fewer widgets than other themes, so you'll have to do a bit of hand-coding for more complex work, or buy an add-on. 

Later if you need more clean themes to use it with, look at the [Genesis Framework](http://www.studiopress.com/), where you can buy shortcode-free themes that work well with Beaver. $500 for all their themes forever.

## Conclusion
Buy a Pro Beaver Builder + Theme license to make clean sites easily if you care about maintaining sites in the future. 

But if you're making lots of small once-off sites that you don't care at all about maintaining in the future, never edit the CSS manually yourself for custom styles, or never changing theme, then an Elegant Themes (Divi) membership might be better for you.

> UPDATE 2018:
Beaver Builder is not as great as I thought initially. Firstly, it completely disables writing pages and posts in text - instead you have to use their graphical editor forevermore. Secondly, once the subscription expires if you upgrade wordpress you can no longer edit your pages! I've thus switched to [Hexo](https://hexo.io), a static site generator, for my homepage. If I were to make a site for someone else that had to use Wordpress I would just make a custom theme in CSS, or use a Divi theme. And teach my client how to write their posts in [Markdown on Wordpress](https://en.support.wordpress.com/markdown/) after all the hassle I've had with Wordpress altering my markup when saving, and all my tables breaking when changing table plugins.
