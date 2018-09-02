---
layout: post
title: 'Best practice for using npm, and Typescript definitions'
tags:
  - javascript
  - npm
  - typescript
url: 7836.html
id: 7836
categories:
  - programming
date: 2016-02-05 15:52:53
---

Summary
-------

1.  Specify exact versions of all npm modules, e.g. **"alt": "0.17.8"**
2.  Commit your node_modules folder into source control
3.  Don't use DefinitelyTyped or any other external library Typescript definition tools

Why?
----

Some of these principles might be controversial, so here's my reasoning:

### Specify exact versions of all npm modules

Semver (semantic versioning) says that breaking changes should occur only if the major version changes. So you should be able to say just **"alt": "0.17"** But I've found in practice that even patch changes (bugfixes) can break your application - because libraries that rely on these libraries often expect some tiny behaviour in a particular version not to change. So in order for all your particular versions of particular libraries to work they need to rely on exact versions of other libraries.

### Commit your node_modules folder into source control

I first assumed that all versions of famous npm libraries would remain there indefinitely. But I then discovered that creators often remove old versions of their software from npm - which then breaks the cascading chain of exact version number dependencies you've configured for your app. Yes, committing all your npm libraries will take up space in your repository, but they're text files after all, not .DLLs, so they'll get compressed really small. And the alternative is one day not being able to compile your app at all on a new computer because a library has been completely removed from npm.

### Don't use DefinitelyTyped or any other external library Typescript definition tools

It's wonderful to be given compile errors for external tools you use. But I've found it's not worth the effort because:

*   there's no way to match the definition file version number and npm library version number, so you get definitions that are out of sync with the library you are using
*   they often have bugs
*   the type bugs you catch at compile time are probably going to occur in your own app, not in how you call external libraries

Instead of using .d.ts files for external libraries, just say:

declare module 'lodash'
{
    let x: any;
    export = x;
}

Or use the --allowJS flag in Typescript 1.8 onwards.