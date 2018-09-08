---
layout: post
title: Create a PDF from an HTML page in C#
tags:
  - 'c#'
  - html
  - pdf
  - tuespechkin
categories:
  - coding
date: 2015-06-03 12:15:59
---

There are lots of libraries in .NET to create PDFs. We chose because TuesPechkin because it creates PDFs from HTML, and HTML is easy to make and has a flexible layout - so containers expand to fit content on the page.

Add TuesPechkin to your project
-------------------------------

Use Nuget to add TuesPechkin and either TuesPechkin.Wkhtmltox.Win64 or 32. Note that adding these unmanaged 64 or 32 bit DLLs mean your application is no longer machine agnostic - you now **must** deploy to a 64 or 32 bit server. (Ensure you have installed VC runtime on any server you deploy to: https://www.microsoft.com/en-us/download/confirmation.aspx?id=40784)

Make some PDF templates
-----------------------

Add some .html files to your App_Data folder. Use some special string of letters like %% as markers for fields you will replace in code:

```html
<!doctype html>
<html lang='en'>
<head>
    <meta charset='utf-8' />
    <title>%%Title%%</title>
    <meta name='description' content='%%Title%%' />
    <meta name='author' content='ECCR' />
    %%Style%%   
</head>
<body>
    %%DraftStamp%%
    %%Header%%
    %%Admission%%
    %%IcdCodes%%
    %%History%%
    %%Investigation%%
    %%Future%%
</body>
</html>
```

In your stylesheet you can use most modern CSS, such as web fonts. I used tables instead of flexbox and Bootstrap though, the latter didn't seem to convert properly:

```css
    <style>
        @font-face
        {
            font-family: 'Barcode';
            src: url(../Fonts/fre3of9x.ttf);
        }
        @font-face
        {
            font-family: 'RobotoLight';
            src: url(../Fonts/Roboto-Light.ttf);
        }
        .barcode
        {
            font-family: 'Barcode';
            font-size: 36pt;
        }
        html
        {
            font-family: 'RobotoLight';
            font-size: 10pt;
        }
        table 
        {
            border-collapse: collapse;
            width: 100%;
        }
        td 
        {
            padding: 2px;
        }
```

Load the root template and replace all placeholders
---------------------------------------------------

Open the main html file, e.g. _report.html_, and then simple do string replacement of all special fields you added.  Where a field refers to another html template then load that file and replace its fields, and so on. Don't forget to HtmlEncode() your data so it doesn't break the html tags.

```csharp
private string GetFuture(PatientVisitConsultation data, string imageFolder, string pdfTemplatesFolder)
{
    var html = File.ReadAllText(pdfTemplatesFolder + "Future.html");
    if (data.Consultation.Administration.FormTypeId == 3)
        html = html.Replace("%%FutureHeader%%", WebUtility.HtmlEncode("POST-MORTEM REQUIREMENTS"));
    else
        html = html.Replace("%%FutureHeader%%", WebUtility.HtmlEncode("FUTURE MANAGEMENT, OUTSTANDING INVESTIGATIONS, AND DESIRED OUTCOME"));
    html = html.Replace("%%FutureText%%", _futureBuilder.GetText(data));
    return html;
}
```

Save the html to a single file (or two if you want more pages):

```csharp
File.WriteAllText(pdfFolder + filenameWithoutExtension + "Page2.html", html.ToString());
```

### Warning - don't use opacity

It increased my final PDF file size from 30kb to 350kb.

Convert the html pages to a PDF
-------------------------------

Create a singleton instance of TuesPechkin in your IoC container like this:

```csharp
private static readonly IConverter _pdfConverter = 
	new ThreadSafeConverter(
		new RemotingToolset<PdfToolset>(
			new Win64EmbeddedDeployment(
			    new TempFolderDeployment())));
```

Then convert the html to PDF like this:

```csharp
private void CreatePdfFromHtmlPage(PatientVisitConsultation data, string pdfFolder, string filenameWithoutExtension)
{            
    var document = new HtmlToPdfDocument
    {
        GlobalSettings =
        {
            ProduceOutline = true,
            DocumentTitle = filenameWithoutExtension,
            PaperSize = PaperKind.A4,
            Margins =
            {
                All = 0.1,
                Unit = Unit.Centimeters
            }
        },
        Objects = {}
    };
    if (data.Consultation.Administration.FormTypeId == 2)
    {
        document.Objects.Add(new ObjectSettings { PageUrl = pdfFolder + filenameWithoutExtension + "Page1.html"});
        document.Objects.Add(new ObjectSettings { PageUrl = pdfFolder + filenameWithoutExtension + "Page2.html"});
    }
    else document.Objects.Add(new ObjectSettings { PageUrl = pdfFolder + filenameWithoutExtension + ".html" });
    byte\[\] result = _pdfConverter.Convert(document);
    File.WriteAllBytes(pdfFolder + filenameWithoutExtension + ".pdf", result);
}
```

Return the PDF in a web service
-------------------------------

If you want to send the PDF to a browser then use this method:

```csharp
\[Route("GetPdfForConsultation")\]
\[HttpPost\]
public IHttpActionResult GetPdfForConsultation(HttpRequestMessage request, long consultationId)
{
    var token = request.Content.ReadAsStringAsync().Result.Substring(6); //"token=243lblahblahblah"
    var hisSignInModel = _tokenManager.ValidateToken(token);
    _userManager.ThrowExceptionIfUserDoesNotHavePermission(token, PermissionName.ViewDischargeSummaries, null);
            
    var pdfFolder = HostingEnvironment.MapPath(@"~/" + Core.Configuration.DischargePdfFolder);
    var imageFolder = HostingEnvironment.MapPath(@"~/" + Core.Configuration.ImageFolder);
    var pdfTemplatesFolder = HostingEnvironment.MapPath(@"~/" + Core.Configuration.PdfTemplatesFolder);
    _pdfManager.DeleteOldPdfs(pdfFolder);
    var filename = _pdfManager.CreateDischargePdfAndReturnFilename(consultationId, pdfFolder, hisSignInModel, imageFolder, pdfTemplatesFolder);
            
    //return pdf
    var path = pdfFolder + filename;
    byte\[\] fileBytes = System.IO.File.ReadAllBytes(path);
    var response = new HttpResponseMessage(HttpStatusCode.OK);
    response.Content = new ByteArrayContent(fileBytes);
    response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("inline"); //'attachment' will download instead
    response.Content.Headers.ContentDisposition.FileName = filename;
    response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
    return ResponseMessage(response);        
}
```
