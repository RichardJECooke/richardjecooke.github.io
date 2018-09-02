---
layout: post
title: Export SVN to Git
tags:
  - git
  - SVN
url: 7522.html
id: 7522
categories:
  - Git
  - SVN
date: 2014-07-18 21:51:47
---

This article explains the fastest and easiest way to export an SVN repository to Git.  There are lots of explanations of this online but none handle complex SVN folder structures well.

Simple versus complex SVN folders
=================================

If your SVN repository has only trunk, branch, and tags you can use the standard export command:

    git svn clone -r0:HEAD --follow-parent --prefix=origin/ --stdlayout http://svn.com/svn/project

But if your repository starts in a subfolder or has branches in subfolders this process will break. For example:

    http://svn.com/svn/ourcompany/project/trunk
    http://svn.com/svn/ourcompany/project/branches/features/newlogo
    http://svn.com/svn/ourcompany/project/branches/bugfixes/updatelogin

The complete process
====================

*   Make a temporary folder somewhere and open a command prompt in it. Run:

    git svn init --prefix=svnorigin/ --no-minimize-url --trunk=trunk http://svn.com/svn/ourcompany/project

*   Alter the config file in the .git folder to add every branch you want to take to Git. The SVN folder is on the left and the new Git branch name is on the right:

    [svn-remote "svn"]
        url = http://svn.com/svn/ourcompany
        fetch = project/trunk:refs/remotes/svnorigin/prod
        fetch = project/features/newlogo:refs/remotes/svnorigin/feature_newlogo
        fetch = project/bugfixes/updatelogin:refs/remotes/svnorigin/bugfix_updatelogin

*   Run this for a few hours (Note: run all git commands in the folder above .git, not in .git). You can run this command multiple times to keep getting updates from SVN if people are still working on it:

    git svn fetch > clonewars.txt

*   Copy the folder and work in the new one so you have a backup.
*   Create a local branch for each remote you want (ignore the @number branches). To do this right-click on the folder - TortoiseSVN - Switch/Checkout
*   Delete the entire svn-remote section above from the config file.
*   Open a command prompt in the folder and run this to copy your project to Github (or BitBucket or wherever):

    git remote add github https://github.com/MyCompany/project.git
    git push github --all

*   Make prod the default branch in the Github project settings page and delete the master branch

How to empty a Github repository entirely without deleting it
=============================================================

If you make a mistake and need to clear github entirely do this in a new folder:

    git init
    (Add an empty file and commit it)
    git remote add github https://github.com/MyCompany/project.git
    git push github --mirror

 

Add issue numbers in commits like TortoiseSVN
=============================================

Finally, if you want to add numbers to commits in TortoiseGit put the following section in your new repository's /.git/config file:

    [bugtraq]
        url = http://jira.mycompany.com:8080/browse/%BUGID%
        number = false
        warnifnoissue = true
        message = http://jira.mycompany.com:8080/browse/%BUGID%
        label = Issue number
        append = false