---
layout: post
title: jQuery Mobile notification popup
tags:
  - jquery mobile
categories:
  - javascript
  - coding
date: 2014-02-05 20:06:12
---

This function adds a jQuery Mobile popup programmatically to a page and displays it.  The user needs to click to dismiss it. If you want it to fade automatically then close it using `setTimeout()`.

```js
function notify(message)
{
    var id = "popupid";
    try {$("#"+id).remove();} catch(e) {}
    var popup = document.createElement('div');
    popup.setAttribute("data-role", "popup");
    popup.setAttribute("data-transition", "pop");
    popup.setAttribute("data-theme", "a");
    popup.setAttribute("data-overlay-theme", "c");
    popup.setAttribute("id", id);
    popup.innerHTML = "<p style='margin:1em 2em 1em 2em'>" + message + "</p>";
    $('div\[data-role="content"\]').append(popup);
    $("#"+id).popup();
    $("#"+id).popup("open");
};

notify("Stop!");
```

- Line 3 deletes the popup div if it has been used before.
- Line 10 adds the popup inside the content element of the jQuery Mobile page. This is essential or it won't display. This is the page without the notification:![nopopup](nopopup.png)](http://richardcooke.info/wp-content/uploads/2014/02/nopopup.png)

And this is the page with the notification:![popup](popup.png)
