---
layout: post
title: How to connect Visual Studio 2013 to Intersystems Caché through ODBC
tags:
  - Intersystems Cacheé
  - ODBC
  - Visual Studio
categories:
  - Intersystems Caché
  - coding
  - Visual Studio
date: 2014-12-05 07:40:42
---

> Update: Don't use the ODBC driver. We later found it to be buggy. Use the native Cache.Data.dll driver for ADO.NET instead.

[comment]: # (This actually is the most platform independent comment)

1.  Install the 32 bit driver: cache.2014.1.0.ODBCDriver_x86.exe
2.  Start menu - administrative tools - ODBC data sources 32 bit - system DSN - AddChoose Intersystems ODBC or 35 (the 35 is just a 3.5 ODBC version and will use 2.5 protocol where necessary, so it makes no difference): ![odbccache](odbccache.png)
3.  Enter your database details and save after testing the connection: ![odbccache2](odbccache2.png)
4.  In Visual Studio open your web.config file and add:
```xml
    <configuration>
      <connectionStrings>
        <add name="MyConnection" connectionString="Dsn=Cach" providerName="System.Data.Odbc"/>
      </connectionStrings>
```
5.  Browse to the database Server Explorer and secondary click to run a new query:![vsodbc](vsodbc.png)

## SSMS fails
Unfortunately connecting to SQL Server Management Studio is not as easy.  Neither the 32 bit nor 64 bit connections work and allow me to run queries.  I've posted a Stackoverflow.com question about the problem [here.](http://stackoverflow.com/questions/27309207/how-to-connect-ssms-2012-to-intersystems-cach%C3%A9-via-odbc)
