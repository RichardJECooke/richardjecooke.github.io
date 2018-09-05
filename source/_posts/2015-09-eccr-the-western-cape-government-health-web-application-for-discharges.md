---
layout: post
title: ECCR - The Western Cape Government Health web application for discharges
tags:
  - Angular.js
  - ASP.NET
  - 'C#'
  - ECCR
  - HST
  - Saratoga
categories:
  - AngularJS
  - 'C#'
  - design
  - Intersystems Caché
  - Javascript
  - portfolio
  - programming
  - software
date: 2015-09-14 23:03:24
---

I've just finished creating a web app to create and share patients' discharge summaries at public hospitals. _ECCR_ was written with my team of [Saratoga](http://saratoga.co.za/) and [HST](http://www.healthsystems.co.za/) colleagues, in conjunction with [WCG Department of Health](https://www.westerncape.gov.za/dept/health). 

_(ECCR stands for 'electronic continuity of care record')_

A tour of the site
------------------

{% asset_img "1_signin.png" "" %}
**Sign in.** Clinicians use their existing credentials on the hospitals' information system (HIS).

{% asset_img "2_home.png" "" %}
**Dashboard.** Doctors & case managers can scan a folder number to quickly open a patient's record to edit, see junior doctors' work to approve, and be notified of any important changes to their patients' records by other clinicians.     

{% asset_img "3_search.png" "" %}
**Search.** Users can also search for patients by personal details rather than folder number, if they have permission at that facility.   

{% asset_img "4_allEpisodes.png" "" %}
**Patient records.** All a patient's records on the HIS are available for a doctor to peruse to understand the patient's medical history.     

{% asset_img "5_patienttab.png" "" %}
**Patient record.** Choosing a patient record displays the discharge details for reading and editing. Once it's complete it can be approved by a senior doctor to be given to the patient.  

{% asset_img "6_diagnosis.png" "" %}   
**ICD codes.** All ICD-10 diagnosis codes and ICD-9 procedure codes are provided with additional details. The full code tree is instantly filterable using a full text index. Codes are saved on the HIS and changes made on the HIS are shown to doctors for approval.     

{% asset_img "7_tb.png" "" %}   
**Summary forms.** The summary tab provides forms for common conditions that doctors need to complete.     

{% asset_img "8_summary.png" "" %}   
**Summary.** The final summary to be printed is displayed for review.     

{% asset_img "9_discharge.png" "" %}   
**Discharge.** The discharge tab allows for referring a patient to another facility if necessary.     

{% asset_img "10_meds.png" "" %}   
**Prescriptions.** All medications available on the JAC system are searchable and can be prescribed to patients.     

{% asset_img "11_editmeds.png" "" %}   
**Edit medication.** Prescription details are editable and doctors are provided with buttons to quickly insert common instructions.     

{% asset_img "14_validationandsaving.png" "" %}   
**Validation.** Validation and messages are shown using color to alert doctors to any outstanding information. The record is autosaved every two minutes to avoid doctors losing any of their work.     

{% asset_img "11_print.png" "" %}   
**Printing.** Once the discharge is complete doctors can print or save the PDF.     

{% asset_img "12_roles.png" "" %}   
**Permissions.** Permissions are assigned to role, which are assigned to users (in the next screenshot).     

{% asset_img "13_users.png" "" %}   
**Users.** Users are saved in the HIS, but are assigned to roles with specific permissions at hospitals where the users work in ECCR.    

Technical description
---------------------

### The database
Intersystems Caché. The server communicates with the database through plain ADO.NET ANSI SQL queries. No Caché specific stuff is used, like classes or stored procedures. 

### The server
*   Written in C# ASP.NET WebAPI.
*   Unit tests were written at the controller level using VS native test framework.
*   Autofac manages dependencies.

### The web site
*   AngularJS
*   Bootstrap (AngularUI)
*   LessCSS (using VS Web Essentials)
*   Package management by Bower
*   Bundling (managed by VS Web Essentials)
*   angular-lz-string for zipping
*   lunr.js for full text indexing
*   pikaday for date pickers
*   Additional libraries: underscore.js, chance.js, moment.js, font-awesome

Lessons learnt
--------------

Overall the project was a success. Delivered on time to a happy client from a happy team. Below are some things I would do differently, and some things I would do similarly.

### Software development using Agile and the client

Our clients were doctors and medical specialists. As expected, they were happy with whatever development methodology we proposed as long as they got their software at the end. 

An initial analysis team of two people listed the requirements and estimated large times for all of them. These **large estimates actually turned out to be correct** by the end of the project as meetings, discussions, changes by the client, and hidden complexities discovered in the details ate through our development time. 

We made two weekly software demos to the clients and presented our stories for the next sprint. Our business analyst tried to keep one sprint ahead of the two programmers preparing the details of each story with the client.  This system worked well except for one point: **we should have presented wireframes for the next sprint to the client at every meeting**. 

Though the clients were happy with the functionality suggested before each sprint, there were quite a few sprints where the final product did not match what they imagined and we had to make alterations. 

I tried as much as possible to have every suggestion made by the clients included on the backlog, but constantly asked them to **ruthlessly prioritse the most important features** to the top. This worked, as by the end of the project although we had more features remaining than time, the most important ones had been done. 

We had one or two sprint retrospectives but then gave up. As everyone was happy and productive after the first couple of sprints the **retros became pointless**. We'll have a final project retro with the client in a few days' time.

### Testing

The clients preferred not to test or even play with the app after each two weekly demo. Instead we had a couple of internal testers do as much rigorous testing as possible. 

While I initially thought this would end in tears once the doctors got their hands on the final system it actually turned out fine. The internal testers were thorough, and our demos and discussions were very comprehensive, so there were few surprises at the end of the project.

### UX, UI, and styling

I see design having three stages:

*   Product - solve the problem
*   Interaction - make it easy to use
*   Style - make it beautiful

As analysts and programmers, our team focused heavily on the first two stages. Given what the doctors told us, we had a few **internal design workshops** to review their main path through the system using the following process:

*   List all the tasks that need to be done
*   Rank them by the most commonly performed
*   Use the ranking to create a group or path with most frequent task, and another group for all the others
*   Ask each team member to individually design a UI for both on paper, using Gestalt principles of emphasis to priorise the highest ranked items on the page
*   Collaboratively take the best ideas from every team member to draw the final UI on a whiteboard
*   Make the interface simpler and simpler by repeatedly asking 'How can we reduce the number of times the user needs to click or type in this task path?'

**Styling we left to the very end of the project** \- colors, fonts, margins, icons. Layout was done as part of the earlier UI wireframe design. The team **did not want to spend money on a professional graphic designer** so I picked some colors from the clients' logo and added some background textures and colors to the sections of each page to make them more distinct. 

Finally, we did some **cubicle testing** with our colleagues in the building to make small changes, like instructions and wording. 

I think the site is currently highly usable and pleasant enough. I hope if it's successfully adopted by the users the clients will be willing to spend a few days of a designer's time to make it visually appealling.

### JWT

Session tokens are kept in the browser memory in a **Javascript Web Token instead of a cookie**.  Keeping the token in a [JWT](https://www.google.com/search?q=JwtSecurityTokenHandler) means that the web service can be called by any program that has a token, and not just a web browser. It makes the server truly stateless and client agnostic. 

The token is not kept in the browser storage to prevent hackers accessing it. Thus the user has to sign in again after closing the window. 

Any call to the server passes in the token and gets a new token back, with a new expiry time of 15 minutes.

### AngularJS is slow

For small apps AngularJS is fast enough. But we found opening a patient's record with six tabs on it was unusably slow on one of our computers. 

First, we **turned off the 'Limit CPU'** option on the computer's power settings. That made a huge difference. 

But the page still took almost a minute to load. Using **Batarang** we saw the majority of the time was spent in the date pickers (Angular UI), of which we had about twenty on various tabs. This is because the **date pickers use watches, which are super slow**. 

We tried another Angular date picker but that had the same problem. So eventually we used the [Pikaday](https://github.com/dbushell/Pikaday) date picker and wrapped it in our own Angular directive. This was a very wasteful exercise and I wish I'd known in advance **how terribly bad Angular components** can be.  Rewriting the date pickers improved our load speed to about 30 seconds. 

We then used **'track by id' in all our ng-repeat** elements (for the ICD trees, and other trees). This improved load speed to twenty seconds. 

Finally, we **changed all our message text bindings to once off**, `{{::messages.HelloWorld}}` and changed our largest watches to [use a publish-subscribe system](http://richardcooke.info/using-the-observer-pattern-to-replace-slow-watches-in-angularjs/). This improved load speed to under ten seconds on the slowest machines, which our client is happy with.

### Use Angular Material

[Angular Material](https://material.angularjs.org/latest/#/) looks far prettier than Bootstrap. If I'd known about it when starting the project I would have used it instead. 

But if I were to do the project again I'd try React.js and Flux, which look like they solve the complexities of [user driven event madness](https://www.youtube.com/watch?v=nYkdrAPrdcw).

### Lunr.js and web workers

Our ICD trees (and facilities and medications) have a LOT of items (60 000 diagnosis codes).  We decided to send them all to the browser and use lunr.js full text indexing to make searching them instant as the user is typing.  The indexing takes a while so you need to [perform it on a Javascript background thread](http://richardcooke.info/use-a-web-worker-to-asynchronously-populate-a-lunr-js-full-text-search-index/). 

We also wanted to avoid sending all this data to the browser on every page load. So we zip the [JSON on the server](http://richardcooke.info/compressing-data-between-server-and-web-browser-using-lzstring-and-local-storage-in-html-5/), send it to the browser, and store it in HTML5 local storage. When the application loads it retrieves the data, unzips it, and calculates the search index.

### Refactoring Javascript

Refactoring a large Javascript app with lots of calls passing different objects between services is a fragile process because Javascript is a dynamically typed language. We created a large number of bugs with incorrectly called methods and incorrect property names in objects. For my next project I would definitely **try a statically typed language that compiles to Javascript**, like **Typescript**, which seems to have won.

### Logging, events, and notifications

One of the system requirements was that **all changes to any patient or medical information has to be logged**. Doctors also wanted notifications for certain important events (like ICD codes that affected medical insurance changing). We used a two part system for this:

*   **Events** \- one table that holds: the table that changed, the row number, the old value, the new value, and the user that made the change
*   **Notifications** \- another table that holds: a user to be notified, the event that caused the notification and the patient record it pertains to, message text

One technical challenge we had was: **how do we know what changed when a user clicks save?** Especially since different users on the system have permissions to save only parts of a record. Ideas included:

*   checking what changed on the client and sending only the differences to the server
*   checking what changed on the server and saving only that
*   sending and saving everything

Each of these options has drawbacks around: **security** (not trusting what a client might send us), **log size** and **accuracy** (logging something that might not be a change), and **speed** (comparing every field on a record that has to reassembled from calls to our databse and the external hospital system). We eventually settled on the middle option:

*   the clients sends an entire record to the server when clicking save
*   the server looks in memory to see if it has a copy of that record from when the client first requested it, else it loads the whole thing again from external systems
*   the server compares the tabs on both records and saves only what's changed, if the user has permission to save it
*   the event manager code logs events in the event table for every field changed
*   the notification manager code is called for every event and has a chance to save a notification for any relevant users in the notification table
