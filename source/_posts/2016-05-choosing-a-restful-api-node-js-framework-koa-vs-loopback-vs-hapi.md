---
layout: post
title: 'Choosing a RESTful API node.js framework: koa vs loopback vs hapi'
tags:
  - api
  - hapi
  - javascript
  - koa
  - loopback
  - node
  - typescript
categories:
  - node.js
date: 2016-05-05 12:22:45
---

We want to choose an API framework that has the following features:

* runs in node.js
* is API only (no oldschool MVC client side stuff, please. The website is a separate React project)
* has an ORM / database framework & supports transactions
* widely used and robust
* ideally has Typescript definitions

## The options

First we go to [http://nodeframework.com/](http://nodeframework.com/) to see the options with a lot of github stars. We ignore the full MVC client frameworks:  

Name | Stars | Comment
-|-|-|-
[koa.js](http://koajs.com/)|10050 |[Has TS support.](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/koa) No ORM. 2013. 
[LoopBack](http://loopback.io/)|6544|No TS support. [Used by GoDaddy & Symantec.](http://loopback.io/users/) [Has a powerful ORM.](http://loopback.io/examples/) 2013
[hapi](http://hapijs.com/)|5960|[Has TS support.](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/hapi) [Used by Paypal & Walmart & npm.](http://hapijs.com/community) No ORM. 2011. 
[total.js](https://www.totaljs.com/)|1749|No ORM. Small. 
[actionHero.js](http://www.actionherojs.com)|1328|No ORM. Small. 
[flatiron](http://flatironjs.org/)|1312|No ORM. Small.

## ORMs

Since Loopback is the only framework with an ORM let's look at general ORMs in node.js.  [Sequelize](http://docs.sequelizejs.com/en/latest/) is the biggest Javascript ORM| but has [mixed reviews](https://www.reddit.com/r/node/comments/3bye2l/has_anyone_used_an_orm_with_nodejs_that_they/). It does have [TS definitions](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/sequelize) though. [Knex](http://knexjs.org) has good reviews but is just a SQL query generator.

## Comments from Reddit searches

*   Koa has the smallest code. It was started by [TJ Holowaychuk](http://thefullstack.xyz/history-express-javascript-framework/), the creator of Express.js. Express was sold to Strongloop (the creators of Loopback.js) who did nothing with it (it was maintained solely by Doug Wilson). It's not stable yet.
*   People like Hapi. And it's maintained by Walmart so it's stable.
*   Can't find many people with opinions on Loopback. It seems fast to code, but tightly coupled to the database model magically. Every route needs a database model. And people don't seem to like its opinionated convention over configuration style.
*   Loopback has a steep learning curve because it has so many features.
*   Loopback's ORM documentation has inaccuracies.

## Conclusion

Loopback seems to have everything we need but I can't find any posts by anyone actually using it. And there are lots of posts about Hapi and everyone likes it - there are zero complaints. Thus I think it would be best to start with Hapi & Sequelize. If there are too many difficulties we could switch to Loopback.

> UPDATE 2017: I would strongly look into Adonis.js now if I were to do this again. Or perhaps Scala if I wanted a server that is typed and functional.
