---
layout: post
title: Joomla user list component
tags:
  - Joomla
categories:
  - Joomla
  - PHP
  - coding
date: 2014-06-21 21:14:02
---

A friend made a poison control website in Joomla. He asked me if there was a way to collect user profile information and display it in a list. The best free plugin I could find for this is Malkesh's [MProfile](http://malkesh.com/joomla-extensions/item/36-user-profile-custom-fields-joomla-2-5).  

It has an admin page that allows you to add any fields you want to the user sign up page.  Like this: 
![MProfile](MProfile.png)

The problem is that Joomla can't display the users' custom fields.  So I built a plugin to do it, using Biswarup's excellent [tutorials on YouTube](https://www.youtube.com/watch?v=KWRsCvRZiH4). 

Here's what it looks like, completely unstyled: 
![MProfileUserList](MProfileUserList.png)

And here is the menu entry and empty settings page: 
![MProfileUserList admin](MProfileUserList-admin.png)

It was my first time using PHP and Joomla and it took about 12 hours in total. 

To download the component to use for Joomla or view the open source code, visit [https://bitbucket.org/RichardCooke/mprofileuserlist](https://bitbucket.org/RichardCooke/mprofileuserlist).
