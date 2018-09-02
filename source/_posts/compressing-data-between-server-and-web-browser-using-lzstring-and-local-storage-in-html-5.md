---
layout: post
title: >-
  Compressing data between server and web browser using LZstring and local
  storage in HTML 5
tags:
  - 'C#'
  - compression
  - JSON
  - LZstring
  - zip
url: 7691.html
id: 7691
categories:
  - 'C#'
  - Javascript
  - programming
date: 2015-03-11 21:36:58
---

Assume you have a large JSON string full of reference data you want to use in the browser (for instance displaying 60 000 ICD codes in a tree view). If it's 8 MB in size and it's not a static file you'll want to compress it manually before sending it to the client. It's tricky to find a zip library that is both in your server language (C#, Python, PHP, etc) and in Javascript.  You also want a library that keeps compressed data as a string, not as some funny array of bytes - because you'll want to store your string in your browser's local storage. The best one I found is [lz-string](http://pieroxy.net/blog/pages/lz-string/index.html "lz-string"). There's a C# version [here](https://github.com/jawa-the-hutt/lz-string-csharp "https://github.com/jawa-the-hutt/lz-string-csharp"), though I had to change the string field 'str' to StringBuilder before it ran fast enough (I think the author has added my change to the code now so it should be fine).  lz-string compressed my file to 7% of its original size (300 kb) Here's how to use the code: C#:

var compressedString = LZString.compressToUTF16(jsonString);

Javascript:

//store your compressed string in local storage (here using the AngularJS library ngStorage)
localStorage\['data'\] = compressedJsonFromServer; 

//get it from local storage
var bigJsonString = LZString.decompressFromUTF16(localStorage\['data'\]);
var json = JSON.parse(bigJsonString);