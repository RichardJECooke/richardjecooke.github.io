---
layout: post
title: Why is my error not being caught by Application_Error() on Azure?
tags:
  - ASP.NET
  - Azure
categories:
  - ASP.NET
  - Azure
  - 'C#'
  - programming
date: 2014-11-14 15:51:16
---

Are you having errors that are triggering `Global.asax.cs.Application_Error()` locally correctly but don't work when you deploy to Azure or another remote IIS host?

Check if the value of CustomErrors in your web.config is 'On' or 'RemoteOnly' (or missing - which defaults to 'RemoteOnly'). 'RemoteOnly' means that the full error message is hidden from the user on remote sites, like Azure, but will be shown when running on your local machine.So when an error occurs on Azure MVC doesn't go to `Global.asax.cs` to call the `Application_Error` method, it instead redirects to the first Error view page it can find and discards the error.

## Solution
The solution is just to add a custom filter to log the error in addition to showing the page.

Make this class:

```csharp
using log4net;
using StructureMap;
using System;
using System.Web;
using System.Web.Mvc;

public class ErrorHandlingFilter : IExceptionFilter
{

    public void OnException(ExceptionContext context)
    {
        try
        {
            var exception = context.Exception;
            if (!(exception is HttpException)) //ignore "file not found"
                ObjectFactory.GetInstance<ILog>().Error("An unhandled exception was caught in ErrorHandlingFilter.OnException()", exception);
        }
        finally
        {
            context.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Shared", action = "Error" }));
            context.Result.ExecuteResult(context.Controller.ControllerContext);
        }
    }
}
```

Then add it to your startup FilterConfig.cs:

```csharp
public class FilterConfig
{
    public static void RegisterGlobalFilters(GlobalFilterCollection filters)
    {
        filters.Add(new ErrorHandlingFilter()); //must be before HandleErrorAttribute
        filters.Add(new HandleErrorAttribute());
    }
}
```

For more info see: [http://stackoverflow.com/questions/6508415/application-error-not-firing-when-customerrors-on#answer-7551256](http://stackoverflow.com/questions/6508415/application-error-not-firing-when-customerrors-on#answer-7551256)
