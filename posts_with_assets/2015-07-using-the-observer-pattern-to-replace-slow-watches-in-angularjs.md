---
layout: layout_post.html
title: Using the observer pattern to replace slow watches in AngularJS
tags: post
#   - angular.js
# categories:
#   - angularjs
date: 2015-07-01 15:22:44
---

Here's a snippet of code you can use in your service to alert controllers of changes to data.

It's better than `$watch` as it fires only on changes, whereas $watches fire far too much for good performance.  The page uses Underscore.js.

This is the service:

```javascript
app.factory("AccountService", ....
{
  var _serviceToReturn = {};
  var _signedInWatchers = [];

  //returns a function you can call to stop watching (e.g. on controller destroy)
  _serviceToReturn.WatchSignIn = function (callback)
  {
    //add the observers to our list
    _signedInWatchers.push(callback);
    //remove the observers from our list when called
    return function() { _signedInWatchers = _.without(_signedInWatchers, callback); };
  };

  _serviceToReturn.SignIn = function (username, password)
  {
    //tell controllers data has changed now that someone signed in
    AlertSignedInWatchers();
    ...
  }

  function AlertSignedInWatchers()
  {
    //alert every observer
    _.each(_signedInWatchers, function (callback) { callback();});
  }
```
And here's the controller that uses it:

```javascript
app.controller('NavbarController',...
{
   _stopWatchingSignIn = AccountService.WatchSignIn(updateNavbar);

  function updateNavbar()
  {
    $scope.data.message = 'welcome';
  }

  $scope.$on('$destroy', function ()
  {
    _stopWatchingSignIn();
  });
```
