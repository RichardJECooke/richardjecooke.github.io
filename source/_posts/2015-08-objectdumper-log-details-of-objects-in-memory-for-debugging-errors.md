---
layout: post
title: ObjectDumper - log details of objects in memory for debugging errors
tags:
  - .NET
  - ObjectDumper
categories:
  - 'C#'
date: 2015-08-14 14:13:48
---

If you have an error (e.g. null object exception) in .NET code that you can't debug locally - for instance if your app is running on a client's server - then write out all relevant details in memory to a file.

Install ObjectDumper using nuget: https://www.nuget.org/packages/ObjectDumper/

ObjectDumper creates extension methods on objects like `DumpToString` and `Dump`.

So log the object to examine straight to a file or using log4net:
`_logger.Error(result.DumpToString("GetAllPatientConsultationDataForPdf"));`
