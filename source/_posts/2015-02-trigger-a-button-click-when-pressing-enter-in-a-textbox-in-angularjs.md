---
layout: post
title: Trigger a button click when pressing enter in a textbox in AngularJS
tags:
  - angular.js
categories:
  - angularjs
  - javascript
  - programming
date: 2015-02-14 19:43:43
---

This post explains how to trigger a button click when pressing enter in a textbox in AngularJS. 

Here's the HTML view containing an input textbox and a button.  Note that we use the ng-keypress to call a function in the associated controller, `$scope.data.onFolderNumberKeyPress()`.

```html
<input 
  data-ng-keypress="data.onFolderNumberKeyPress($event)"   
  id="txtFolderNumber" 
  class="form-control smallMarginRight width20Percent" 
  data-ng-model="data.patientNumber" 
  type="text" 
  autofocus 
  placeholder="{ {messages.EnterFolderNumber}}" 
  data-ng-cloak />

<button 
  id="btnSearch" 
  class="btn btn-primary" 
  data-ng-cloak 
  data-ng-click="data.search()" 
  data-ng-disabled="data.isBusy">
    { {data.searchButtonMessage}}
</button>
```

In the controller we check if enter was pressed (as opposed to all the other letters the user types as input) and if so, then we call the function the button normally calls when clicked.

```js
$scope.data.onFolderNumberKeyPress = function(event)
{
    if (event.charCode == 13) //if enter then hit the search button
        $scope.data.search();
}
```
