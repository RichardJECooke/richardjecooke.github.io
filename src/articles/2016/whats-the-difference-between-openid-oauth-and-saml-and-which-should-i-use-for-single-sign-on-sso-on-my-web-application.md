---
layout: layout_post.html
title: >-
  What's the difference between OpenID, OAuth, and SAML - and which should I use
  for single sign on (SSO) on my web application?
tags: ['post', 'oauth', 'openid connect', 'security', 'sso', 'coding']
date: 2016-03-18 11:30:12
---

Disclaimer: This is a summary of all the articles I can find on the Net. I'm not a security expert, nor have I implemented SSO yet - once I have I'll update this document.

The goal of single sign on (SSO)
--------------------------------

You want your users to be able to click one button to sign in (the same button for sign up if they're new users on your site) without having to enter a username or password. And the benefit for you is that you don't have to store & manage your users' passwords (getting encryption right, coding lost password pages).

Terminology
-----------

*   Provider (IDP) - Google, Yahoo, Facebook, etc
*   Relying party (RP) - your app (your app relies on the provider)
*   Authentication - your app trusts that the user is who she says she is
*   Authorisation - the user allows your app to access Facebook **\** Google **\** etc and do stuff on it (e.g. make a post on your behalf)

SAML
----

SAML is a legacy XML server to server protocol not suitable for modern mobile and web apps.

OpenID
------

OpenID provides authentication. Its major benefit is that the user can use any provider to sign in - you don't have to code separate functionality for each provider.

OAuth
-----

OAuth provides authorisation. And can be used for pseudo-authentication because the provider gives your app a token it can use to ask the provider questions. The problem is you need to code support for each provider separately.

### Security flaws in OAuth

If you're writing any app where security is crucial, like finance or medical, then [don't use OAuth](http://security.stackexchange.com/questions/94995/oauth-2-vs-openid-connect-to-secure-api). From Wikipedia:

OAuth 2.0 has had numerous security flaws exposed in implementations.[\[17\]](https://en.wikipedia.org/wiki/OAuth#cite_note-17) The protocol itself has been described as inherently insecure by security experts and a primary contributor to the specification stated that implementation mistakes are almost inevitable.[\[18\]](https://en.wikipedia.org/wiki/OAuth#cite_note-18)[\[19\]](https://en.wikipedia.org/wiki/OAuth#cite_note-19)

In January 2013, the Internet Engineering Task Force published a number of threat models for OAuth 2.0.[\[20\]](https://en.wikipedia.org/wiki/OAuth#cite_note-rfc-20) Among them was one called "Open Redirector"; in the spring of 2014, this was described under the name "Covert Redirect" by Wang Jing.[\[21\]](https://en.wikipedia.org/wiki/OAuth#cite_note-OAuth_Covert_Redirect-21)[\[22\]](https://en.wikipedia.org/wiki/OAuth#cite_note-CNET-22)[\[23\]](https://en.wikipedia.org/wiki/OAuth#cite_note-PhysOrg-23)[\[24\]](https://en.wikipedia.org/wiki/OAuth#cite_note-Covert_Redirect-24)

Possibly the most devastating OAuth security failure is phishing vulnerability:[\[25\]](https://en.wikipedia.org/wiki/OAuth#cite_note-25) every web site using OAuth is visually (but not technically) asking end users for their username and password of their master identity, which prevents ordinary users from understanding that they should not type those in should they encounter an attacker's web site that visually emulates this process to steal credentials. Two-factor authentication does not prevent this attack, because the phishing site can steal that as well (and use it right away).

So we should use OpenID for SSO because it's far less coding?
-------------------------------------------------------------

No. Unfortunately the biggest providers, Facebook, Google & Twitter, don't support OpenID.

OpenID Connect
--------------

OpenID Connect is a new technology that implements OpenID as a JSON webservice on top of OAuth (it's kinda OpenID 3). In other words you get the simplicity and smallness of code of OpenID with the large number of providers offering OAuth. Well, except Facebook. Watch this video: [https://www.youtube.com/watch?v=Kb56GzQ2pSk](https://www.youtube.com/watch?v=Kb56GzQ2pSk)

Does your programming language have a OpenID Connect library?
-------------------------------------------------------------

http://openid.net/developers/libraries/

Is it being used & has it won the protocol war?
-----------------------------------------------

Yes, I can't find any alternative.

What companies use OpenID Connect?
----------------------------------

Google, Microsoft, PayPal. The specification was finalised in 2015 so it's still new, hopefully more providers will join. Facebook has their own API. Twitter & LinkedIn don't support OpenId Connect.

Conclusion
----------

Since Twitter & LinkedIn & FB don't support Connect then you can't use it for your app yet because you'll exclude users. And you can't use OAuth 2 because it's not secure. So your only options are:

*   use standard old email & password sign in and wait until (if) the big providers support Connect
*   write your own more secure protocol on top of separate OAuth 2 connections to each of the big providers (ha)

Sources
-------

*   http://stackoverflow.com/questions/1087031/whats-the-difference-between-openid-and-oauth
*   https://en.wikipedia.org/wiki/OAuth
*   https://en.wikipedia.org/wiki/OpenId
*   http://stackoverflow.com/questions/1827997/is-facebook-an-openid-provider
*   https://en.wikipedia.org/wiki/OpenID_Connect
*   http://security.stackexchange.com/questions/37818/why-use-openid-connect-instead-of-plain-oauth
*   https://www.mutuallyhuman.com/blog/2015/07/17/an-updated-look-at-choosing-between-oauth2-and-saml/
*   http://stackoverflow.com/questions/36080561/why-dont-twitter-facebook-and-linkedin-support-openid-connect
*   http://stackoverflow.com/questions/36080422/if-i-my-app-uses-open-id-connect-does-it-also-have-to-support-oauth
