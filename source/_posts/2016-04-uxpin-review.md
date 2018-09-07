---
layout: post
title: UXPin review (and Pidoco & web Balsamiq)
tags:
  - balsamiq
  - pidoco
  - uxpin
  - wireframe
categories:
  - design
date: 2016-04-10 14:27:01
---

Our small team has been using UXPin for a week to wireframe a public web app. We bought the standard version for four people for a month.  Here's what we found: The good:

*   Support is good. Emails usually get a reply in a day.
*   It does pretty much what you expect for a wireframe system.

The bad:

*   Templates or master pages are called 'smart components'. I.e. your menu on every page is a smart component. Change it once, it changes on every page. But you can't put smart components inside smart components! So you can't have two parts of a menu that you reuse in different ways of different pages. This is really horrible and very limiting. (Imagine if in your code functions you call aren't allowed to call other functions)
*   The UI is really tiny in a sidebar. Instead of having a tab for widgets, pages, and templates they're all crammed into a little sidebar in their own panels that you have to drag up and down constantly to see what you need.
*   And when you want to add a link on click from a widget to a page you have to scroll through the entire site map - you can't minimise any page trees to make it faster.
*   In fact, adding interactions overall is very tedious - many clicks. There's a 'recent interactions' list - but it doesn't show you the pages it links to! Pointless. Rather just keep a page of commonly used hotspots and copy paste.
*   The navbar widget can't have interactions (links) on each menu item. Nor can the dropdown widget. So they're useless. Instead you'll add long list of url link widgets in place of a menu on your page.
*   Unlike every other graphics app in the universe, your lasso select tool selects everything it touches, not everything it encompasses. So you'll always over-select lots of widget then have to individually deselect them from your group.
*   Things in preview mode (when demoing) look different from design mode. Especially white space in text. Your buttons with wrapped text in design mode don't wrap when the wireframe is running.
*   One time live preview didn't work at all. This was a once off server problem they had, but if we were demoing to a client it would have been embarrassing.
*   You'd assume you can give your team members standard or pro accounts. But you can't. You have to pay for an entire team to upgrade to pro for one person. Ripoff.
*   Collaboration isn't real time. When testing the demo version we seem to remember being able to see elements move around as someone else worked on them. Now we have to refresh the entire page to get an updated site map and page elements from other people.
*   Loading is slow. More so than other sites. But it's usable. Minor complaint.

I tried too Pidoco because it is MUCH cheaper. But it had similar problems with not being able to add hotspots to menus or have nested reusable components. Web Balsamiq is even worse. It can run only using Flash (an ancient technology) and doesn't have site maps - all pages are in a long flat list with a scrollbar. And saving must be explicitly clicked. So in conclusion I'd probably use Pidoco next time because it's cheap and does most of what you want. But none of the collaborative wireframing tools have everything you need.

2016-04-27 - UPDATE
-------------------

Pidoco read this review & say you can do some stuff after all (so they now get my number one vote for both price & features):

*   Hotspots in menus: You can link your menu entries to other pages as follows: After adding the menu stencil to your canvas, double-click it to edit it. Highlight any row with your mouse cursor and select the desired target page from the dropdown at the top. You will see something like "* \[page123 Your highlighted entry\]", which shows you that the entry has been linked. This wiki syntax may take a moment to get used to, but it is very fast, once you have done it a couple of times.
*   Linking a dropdown element: To link the entries of a dropdown (or combobox) stencil, you need to add an interaction and use the "changes the selection" trigger. You can add one interaction for each entry of the dropdown.
*   Nesting of "smart components": In Pidoco, there are two types of smart components: "Layers" can be used once on every page and are always in the same x/y position; they cannot be nested, but you can have several different ones for different use cases. "Custom stencils" can be nested and can be used multiple times on a page in various x/y positions. You can have as many different custom stencils as desired, and you can detach them from the parent if you wish to stop updating them. This can be very useful if you have a lot of similar, but slightly different components - simply use a custom stencil as template, detach the instances, and edit them. After detaching, the custom stencils become a group first, so you may need to ungroup them in order to edit.
*   Stencil search: If you want to avoid manually scrolling through the stencil palette, try our Quick Search: Just start typing the name of the stencil you're looking for and the palette will dynamically filter. You can navigate the palette using the arrow keys and add stencils to the canvas by hitting enter.
*   Duplicating interactions: If you have already used a certain interaction on an element and want to use it on other elements as well, simply select the first element with the interaction and all the other elements that should use the same interaction holding the Ctrl key. Then open the context menu, go to the "Interactions" tab and click the "Apply interaction to selection" button. The respective interaction will be added to all elements in the selection.
