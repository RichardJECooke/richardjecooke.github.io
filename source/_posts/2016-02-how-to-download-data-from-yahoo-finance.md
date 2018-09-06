---
layout: post
title: How to download data from Yahoo finance
tags:
  - finance
  - Yahoo
categories:
  - finance
date: 2016-02-18 14:17:27
---

To get a .csv file of stock prices from Yahoo you can use a url like:

http://ichart.finance.yahoo.com/table.csv?s=URTH&g=m&c=2015&a=9&b=1&f=2016&d=2&e=1

In detail:

http://ichart.finance.yahoo.com/table.csv?

    s=URTH              //this is the stock symbol to get data for
    &g=m                //d=daily m=monthly
    &c=2015 &a=9 &b=1   //from year month day
    &f=2016 &d=2 &e=1   //to   year month day
