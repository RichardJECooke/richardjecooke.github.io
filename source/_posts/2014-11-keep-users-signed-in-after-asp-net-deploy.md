---
layout: post
title: Keep users signed in after ASP.NET deploy
tags:
  - asp.net
  - azure
categories:
  - asp.net
  - azure
  - 'c#'
  - programming
date: 2014-11-18 14:11:10
---

## Problem
After redeploying our Azure ASP.NET MVC site we found that users were receiving an error when trying to sign in for the first time: _The anti-forgery cookie token and form field token do not match_.

## Cause
This happens because Azure creates an entirely new virtual machine at every deployment.  The new IIS instance the new VM contains will have a new machineKey - the key that is used to validate authentication tokens. 

So the sign in form has an `<input __RequestVerificationToken>` field with a new value that differs from the old `RequestVerificationToken` cookie value that is in the users' browsers from their last sign in.

## A solution if you don't use Azure
If you are using a normal IIS server that you have control over, then set your own custom `machineKey` for your application in the web.config file so that authentication tokens never expire.  This key is used instead of the machine's `machineKey` value.

```xml
<system.web>
<machineKey
	validationKey="8BD520C9D14734C556DA74704FCABD3F8D59D7F851D563514208A86511884E"
	decryptionKey="CFB832E5A77F28A9A5B58DBE71AFC4D9C99D700F2488B"
	validation="SHA1" decryption="AES"
/>
```

Generate your own custom key using a tool like this: [http://www.developerfusion.com/tools/generatemachinekey/](http://www.developerfusion.com/tools/generatemachinekey/ "http://www.developerfusion.com/tools/generatemachinekey/")

### Doesn't work on Azure
Unfortunately Azure overrides your application machineKey with its own, so this solution works only for non-Azure ASP.NET sites: "_All Windows Azure instances running behind the load balancer on the different VM`s. And each of them must operate the same machineKey (it is used for VewState and Session State encryption). Thats why Azure emulator trying to change the Web.config when you run your app._" - [forum](https://social.msdn.microsoft.com/Forums/azure/en-US/2779cf87-7389-4293-a790-0f21cfd03dc3/machinekey-gets-automatically-inserted-into-webconfig-when-debugging-in-azure-emulator?forum=windowsazuredevelopment)

## A solution for any ASP.NET site
A solution that works on Azure has to update the users' `__RequestionVerificationToken` cookies when loading the sign in page. Use this code in your AccountController GET method for the sign in and sign up page:

```csharp
private void SetANewRequestVerificationTokenManuallyInCookieAndOnTheForm()
{
    if (Response == null)
        return;
    string cookieToken, formToken;
    AntiForgery.GetTokens(null, out cookieToken, out formToken);
    SetCookie("__RequestVerificationToken", cookieToken);
    ViewBag.FormToken = formToken;
}

private void SetCookie(string name, string value)
{
   if (Response.Cookies.AllKeys.Contains(name))
       Response.Cookies\[name\].Value = value;
   else
       Response.Cookies.Add(new HttpCookie(name, value));
}
```

Then in your view add the form token you generated in the controller so the token pair matches:

```csharp
@if (ViewBag.FormToken != null)
{
    <text><input name="__RequestVerificationToken" type="hidden" value="@ViewBag.FormToken" /></text>
}
else
{
    <text>@Html.AntiForgeryToken()</text>
}
```

## Anti-forgery tokens are essential on sign in and sign up pages
Perhaps you thought you could just remove the `[ValidateAntiForgeryToken]` attribute from your sign in action to save yourself this trouble? This would be a dangerous mistake. See an example attack here: [http://security.stackexchange.com/questions/2120/when-the-use-of-a-antiforgerytoken-is-not-required-needed](http://security.stackexchange.com/questions/2120/when-the-use-of-a-antiforgerytoken-is-not-required-needed). 

In short, a hacker could sign someone else's browser into your website, e.g. Paypal, as the hacker and then get them to perform an action, e.g. adding a credit card to their account.  This action would then be performed on the hacker's account instead and they would get the benefit of the action.
