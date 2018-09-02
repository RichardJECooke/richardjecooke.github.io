---
layout: post
title: AWS cloud hosting vs. a local managed server host for a web app in Cape Town
tags:
  - AWS
  - cloud
  - hosting
url: 7916.html
id: 7916
categories:
  - infrastructure
date: 2016-04-19 16:14:44
---

Host your new web app on AWS or on your own server at a local hosting company?  If you're in most countries AWS wins, but not in South Africa.

Cloud advantages
----------------

*   Autoscaling up and down as load changes
*   Price flexibility - scale up, scale down easily
*   Less maintenance: no need to ever upgrade or patch anything - servers or databases
*   We can separate components more safely on isolated machines - less chance of breaking the live website server

### Minor advantages

*   Slightly more reliable
*   Slightly more secure
*   Slightly cheaper

Cloud disadvantages
-------------------

*   150 ms latency on each request to the server (but total load time is the same)

### Minor disadvantages

*   Slight currency risk (more expensive as rand depreciates)

Costs
-----

Costs for AWS and a dedicated box are about the same:

*   A high quality box at Hetzner in South Africa costs R2400 p.m. in 2016 (quad core 3.2 GHz, 16 GB RAM, 2 TB drive).
*   AWS instances will be roughly the same, depending on exactly how much power you want.

The speed test
--------------

I created a 22MB static web page (some text & seven images) and deployed it to AWS in Ireland and to Hetzner in Westerford, Cape Town. The load times for AWS were 500 ms for the text (DOM) and 30 s for the full page. The load times for local were 28 ms for the text (DOM) and 28 s for the full page.

Conclusion
----------

Even though the time taken to load a full page is the same on AWS & locally, having a user wait an extra 200 ms or so on every button click makes a big difference to the appearance of speed on a modern web app. We decided to use a local server. But we can always cancel our monthly subscription any time and move to AWS later if we want. All components will run in Docker instances on one server so they're isolated.