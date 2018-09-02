---
layout: post
title: How to post cron job results or any other script to Slack
tags:
  - cron
  - devops
  - Slack
url: 8082.html
id: 8082
categories:
  - programming
date: 2017-01-05 10:16:42
---

Setting up email for cron job results is more complicated than using Slack. And is dangerous when users become accustomed to lots of cron job spam and ignore errors. Rather make two Slack channels:

* automated\_task\_logs
* automated\_task\_errors

Spam (successes) goes to logs, only errors go the errors channel. In a channel in Slack go to `channel settings - add an app or integration - Build - add something just for my team - add a incoming webhook`. You'll now have a secret url you can add to the end of your cron bash scripts that will post to Slack like so:

```bash
#!/bin/bash
set +e #ignore errors and continue
set +x #echo off

{
  make\_temp\_file &&
  backup_database &&  
  curl -X POST --data-urlencode 'payload={"channel": "#automated\_task\_logs", "username": "SSL\_bot", "text": "SSL certificate upgraded successfully", "icon\_emoji": ":scroll:"}' https://hooks.slack.com/services/A02TFF7EE/HK63KNHCM/ABat54LXcG6JPIaUlCW15kjLA
} || {
  curl -X POST --data-urlencode 'payload={"channel": "#automated\_task\_errors", "username": "SSL\_bot", "text": "SSL certificate upgrade failed", "icon\_emoji": ":scroll:"}' https://hooks.slack.com/services/A02TFF7EE/HK63KNHCM/ABat54LXcG6JPIaUlCW15kjLA
}
```
<br/>
[![Slackbot](http://richardcooke.info/wp-content/uploads/2017/01/Untitled-1.png)](http://richardcooke.info/wp-content/uploads/2017/01/Untitled-1.png)

Change the username, emoji, and channel name to match what each of your jobs does.