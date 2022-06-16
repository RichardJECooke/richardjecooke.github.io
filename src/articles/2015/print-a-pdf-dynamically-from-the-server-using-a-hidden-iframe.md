---
layout: layout_post.html
title: Print a PDF dynamically from the server using a hidden iframe
tags: ['post', 'iframe', 'pdf', 'print', 'coding']
date: 2015-06-03 10:57:44
---

Loading a PDF using a link with the src attribute pointing to a public PDF is easy. But how to print a PDF retrieved from a web service in Javascript, without displaying it on the screen first?  Use a dynamically added form in a hidden iframe.

If you just want to display the PDF dynamically, then see my other PDF [post](/articles/2015/show-a-pdf-from-the-server-in-a-new-tab-on-button-click/).


Below is the browser code (vanilla Javascript) to create a dynamic hidden form in a dynamic hidden iframe, submit it, wait for the PDF to return, and then print it:

```js
//have a div in your html somewhere with this id. height=0 width=0
var div = document.getElementById('pdfDiv');
//we make a new iframe every time we print or the DOM manipulation below breaks
div.innerHTML = '<iframe width="0" height="0" id="pdfFrame"></iframe>';
var frame = document.getElementById('pdfFrame');
frame.contentWindow.document.open();
//add a <body> to the iframe so we can add a form to it below
frame.contentWindow.document.write('<body></body>');
frame.contentWindow.document.close();

var url = 'http://localhost/Pdf/GetPdfForConsultation?consultationId=' + consultation.Id;
//make a form to call the url above and return the pdf
var form = frame.contentWindow.document.createElement("form");
form.setAttribute("id", "pdfForm");
form.setAttribute("method", "post");
form.setAttribute("action", url);
//add as many input fields as your service needs
var field = document.createElement("input");
field.setAttribute("name", 'token');
field.setAttribute("value", AccountService.GetAuthenticationToken());
form.appendChild(field);
//add the form to the new iframe body
frame.contentWindow.document.body.appendChild(form);
//wait until the pdf has loaded until printing just this hidden frame, not the surrounding page
frame.onload = function ()
{
    frame.contentWindow.focus();
    frame.contentWindow.print();
};
//start loading the pdf from the server
form.submit();
```

The server code (C# WebAPI) to return a PDF:

```csharp
[Route("GetPdfForConsultation")]
[HttpPost]
public IHttpActionResult GetPdfForConsultation(HttpRequestMessage request, long consultationId)
{
	var content = request.Content.ReadAsStringAsync().Result;
	var token = content.Substring(6); //"token=243lblahblahblah"
	var path = HostingEnvironment.MapPath(@"~/" + Core.Configuration.PdfFolder + "2015-05-25-13h41m54-TBH20949482.pdf");
	byte[] fileBytes = System.IO.File.ReadAllBytes(path);

	var response = new HttpResponseMessage(HttpStatusCode.OK);
	response.Content = new ByteArrayContent(fileBytes);
	response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("inline"); //opens in tab, use 'attachment' to download instead
	response.Content.Headers.ContentDisposition.FileName = "2015-05-25-13h41m54-TBH20949482.pdf";
	response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
	return ResponseMessage(response);
```
