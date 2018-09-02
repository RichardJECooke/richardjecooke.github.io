---
layout: post
title: Dynamically (programmatically) add a directive to an AngularJS view on click
tags:
  - Angular.js
url: 7716.html
id: 7716
categories:
  - AngularJS
  - Javascript
  - programming
date: 2015-04-14 15:38:43
---

This post explains how to add a directive to a view when clicking a button - as opposed to having the directive in the HTML already when the page loads. This is the directive:

myapp.directive('myappDischargeReferral', \['datepickerPopupConfig', 'dateParser', 'dateFilter', function (datepickerPopupConfig, dateParser, dateFilter)
{
    var _directive =
    {
        restrict: 'E',
        replace: true,    
        scope: {}, //ensure this directive uses isolate scope
        template: '<div><a href="http://google.com"> Click me to go to Google</a></div>',
    };
    return _directive;
}\]);

This is the view we want to add it to when clicking the button:

<div  data-ng-controller="myController">
	<div id="referralsContainer"></div>
	<a class="btn btn-default" data-ng-click="data.addDischargeReferralDiv();">		
		Add
	</a>          
</div>

This is the controller for the view that adds it:

myapp.controller('myController', \['$compile', function ($compile)
{    
    $scope.data ={};
    
    $scope.data.addDischargeReferralDiv = function ()
    {        
        var referralDivFactory = $compile("<myapp-discharge-referral></myapp-discharge-referral>");
        var referralDiv = referralDivFactory($scope);
        var containerDiv = document.getElementById('referralsContainer');
        angular.element(containerDiv).append(referralDiv);
    }
    
}\]);