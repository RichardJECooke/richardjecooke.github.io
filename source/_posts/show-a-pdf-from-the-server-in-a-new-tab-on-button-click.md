---
layout: post
title: Show a PDF from the server in a new tab on button click
tags:
  - 'C#'
  - PDF
url: 7727.html
id: 7727
categories:
  - Javascript
date: 2015-05-26 11:56:58
---

Loading a PDF using a link with the src attribute pointing to a public PDF is easy. But how to display a PDF retrieved from a web service in Javascript?  Use a dynamically added form. Below is the browser code (vanilla Javascript) to create a dynamic hidden form and submit it in a new tab to hold the PDF:

var url = UrlService.GetUrlOfWebApi() + 'Pdf/GetPdfForConsultation?consultationId=' + consultation.Id;
var tabName = "PdfDisplayTab";
var form = document.createElement("form");
form.setAttribute("id", "noid");
form.setAttribute("method", "post");
form.setAttribute("action", url);
form.setAttribute("target", tabName);
form.setAttribute("style", "display: none;");

var field = document.createElement("input"); //add a post data value
field.setAttribute("name", 'token');
field.setAttribute("value", AccountService.GetAuthenticationToken());
form.appendChild(field);

document.body.appendChild(form);
window.open('about:blank', tabName); //open form in new window
form.submit();

The server code (C# WebAPI) to return a PDF:

\[Route("GetPdfForConsultation")\]
\[HttpPost\]
public IHttpActionResult GetPdfForConsultation(HttpRequestMessage request, long consultationId)
{
	var content = request.Content.ReadAsStringAsync().Result;
	var token = content.Substring(6); //"token=243lblahblahblah"	
	var path = HostingEnvironment.MapPath(@"~/" + Core.Configuration.PdfFolder + "2015-05-25-13h41m54-TBH20949482.pdf");
	byte\[\] fileBytes = System.IO.File.ReadAllBytes(path);
	
	var response = new HttpResponseMessage(HttpStatusCode.OK);
	response.Content = new ByteArrayContent(fileBytes);	
	response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("inline"); //opens in tab, use 'attachment' to download instead
	response.Content.Headers.ContentDisposition.FileName = "2015-05-25-13h41m54-TBH20949482.pdf";
	response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
	return ResponseMessage(response);