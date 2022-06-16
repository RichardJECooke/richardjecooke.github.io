---
layout: layout_post.html
title: Use a web worker to asynchronously populate a lunr.js full text search index
tags: ['post', 'async.js', 'lunr.js', 'underscore.js', 'web worker', 'coding']
date: 2015-03-16 15:18:28
---

I was using [underscorejs](http://underscorejs.org "underscorejs") to loop through a list of 60 00 ICD codes to put in a [lunr.js](http://lunrjs.com/ "lunrjs.com") full text search index, like this:

```js
_.each(dictionary, function (document) { index.add(document); });
```

Too slow
--------

This took about 5 seconds and was freezing the browser page.

Async.js
--------

I then tried using [async.js](https://github.com/caolan/async "async.js"), thinking that it would run my code asynchronously giving the browser some time to draw.

```js
async.eachSeries(Object.keys(dictionary), function (key, callback)
{
  index.add(dictionary[key]);
  callback(); //and also tried 'nextTick' to do this asynchronously
});
```

Unfortunately that made no difference.  I realised although this code is being called asynchronously once called it still monopolises the processor for five seconds.

SetTimeout()
------------

I then tried putting my code in a loop and every 100 or 1000 entries taking a break using setTimeout(100) to let the browser handle events.  This also made no difference.

Web worker
-----------

Finally I tried to use a web worker - an HTML 5 background thread specifically provided for intensive calculations that might freeze the browser.  For a tutorial see [http://www.html5rocks.com/en/tutorials/workers/basics/](http://www.html5rocks.com/en/tutorials/workers/basics/ "html5rocks"). This worked perfectly. My main thread (UI code) now looks like this:

```js
function createFullTextSearchIndexInWebWorker(dictionary)
{
  var worker = new Worker("Content/js/workers/AddDocumentsToSearchIndex.js"); //create a web worker to add documents to full text index in the background
  worker.onmessage = function (e) //update our full text when the worker sends us its output when finished
  {
     _icdDiagnosisCodesFullTextIndex = lunr.Index.load(JSON.parse(e.data))
     worker.terminate(); //kill the thread cos it no longer benefits us and must die
  }
  worker.postMessage(dictionary); //start the worker by giving it the documents to index
}
```

and my web worker js file looks like this

```js
(function ()
{
  self.importScripts
  (
    "../../bower_components/underscore/underscore.js"
    ,"../../bower_components/lunr.js/lunr.min.js"
  );

  self.addEventListener
  (
    'message'
    , function (e)
    {
      var index = lunr(function ()
      {
        this.field('Name');
        this.field('Code');
        this.field('Instructions_Includes');
        this.field('Instructions_Excludes');
        this.field('Instructions_Notes');
        this.field('Instructions_Terminology');
        this.field('Instructions_Morbidity');
        this.ref('Id');
      });
      _.each(e.data, function (document) { index.add(document); });
      self.postMessage(JSON.stringify(index.toJSON()));
    }
    , false
  );

}());
```
