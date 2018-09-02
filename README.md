# Todo
- migrate existing site - - https://tryshchenko.com/archives/moving-from-wordpress-to-static-html-using-hexo/
- make page
- list of best software
- write article on hexo
- https://github.com/probberechts/hexo-theme-cactus
- add comments: facebook / disqus
- add search
- add rss
- get custom pages (apps) to work
    - npm install --save --only=prod hexo-include
    - https://github.com/pirtleshell/hexo-include
    - 
-Deploy to richardcooke.info too: https://github.com/frikeldon/hexo-deployer-jsftp
- disable wordpress site
- https://github.com/poacher2k/hexo-featured-image
- audio - https://github.com/EYHN/hexo-tag-cplayer
- search for richardcooke

# Notes
- Forum: https://gitter.im/hexojs/hexo

# Initial creation
```
npm install hexo-cli
.node_modules/.bin/hexo init mysite
//copy it up a folder
npm install hexo-renderer-asciidoc
npm install hexo-deployer-git
npm install hexo-deployer-jsftp
git remote add origin https://bitbucket.org/RichardJECooke/richardjecooke.bitbucket.io
```

# Run locally
`.node_modules/.bin/hexo server`

# Deploy
- https://hexo.io/docs/deployment.html
- This site deploys to https://richardjecooke.bitbucket.io/ and https://richardcooke.info
- Set your main branch in bitbucket or github to 'deployed' and set this branch in your config to deploy too.
- Keep committing locally to master.
- `.node_modules/.bin/hexo deploy`

# Themes
- Using my own fork of cactus (must be copied manually to update): https://bitbucket.org/rjeapps/hexo_cactus_theme_fork/src/master/
forked from https://probberechts.github.io/hexo-theme-cactus/cactus-dark/public/

---
---
---
---
---

# Markdown syntax

Markdown Syntax Guide

SourceForge uses markdown syntax everywhere to allow you to create rich
text markup, and extends markdown in several ways to allow for quick linking
to other artifacts in your project.

Markdown was created to be easy to read, easy to write, and still readable in plain text format.

# Lists

1. asdf
1. asfd

- asdf
    - asdf
        - asdf
- asdf

# Links

Most URLs will automatically be turned into links. To be explicit, just write it like this:

<http://someurl>

<somebbob@example.com>

To use text for the link, write it: [like this](http://someurl)

This is [an example](http://example.com/ "Title") inline link.

[This link](http://example.net/) has no title attribute.

# Reference Links

You can also put the [link URL][1] below the current paragraph
like [this][2].

[1]: http://url
[2]: http://another.url "A funky title"

Here the text "link URL" gets linked to "http://url", and the lines showing "[1]: http://url" won't show anything.

Or you can use a [shortcut][] reference, which links the text "shortcut" to the link named "[shortcut]" on the next paragraph.

Or you can use a [shortcut][] reference, which links the text
"shortcut" to the link named "[shortcut]" on the next paragraph.

[shortcut]: http://goes/with/the/link/name/text

# Basic Text Formatting

*this is in italic*  and _so is this_

**this is in bold**  and __so is this__

***this is bold and italic***  and ___so is this___

~~Mistaken text.~~

Two carriage returns make a new paragraph.

Blockquotes

> Use it if you're quoting a person, a song or whatever.

> You can use *italic* or lists inside them also.
And just like with other paragraphs,
all of these lines are still
part of the blockquote, even without the > character in front.

> To end the blockquote, just put a blank line before the following
>
> paragraph.

linebreak = <br/>
  


# Preformatted Text \ Code

If you want some text to show up exactly as you write it, without Markdown doing anything to it, just indent every line by at least 4 spaces (or 1 tab). As an alternative to indenting, you can make a code block use 3 or more tildes (~) or backticks (`) on a line before and after the text (syntax details). See examples in the Code Highlighting section.

    This line won't *have any markdown* formatting applied.
    I can even write <b>HTML</b> and it will show up as text.
    This is great for showing program source code, or HTML or even
    Markdown. <b>this won't show up as HTML</b> but
    exactly <i>as you see it in this text file</i>.

Within a paragraph, you can use backquotes to do the same thing.
`This won't be *italic* or **bold** at all.`

```python
x = 5
runx()
```

# Tables


  First Header   | Second Header
  -------------  | -------------
  *Content Cell* | Content Cell
  Content Cell   | Content Cell

You can also create tables using HTML code.

| Left | Center | Right |
|:-----|:------:|------:|
|aaa   |bbb     |ccc    |
|ddd   |eee     |fff    |

 A | B 
---|---
123|456

# Images

To include an image, just put a "!" in front of a text link:

![alternate text](https://sourceforge.net/images/icon_linux.gif)

alternate text

The "alternate text" will show up if the browser can't load the image.

You can also use a title if you want, like this:

![tiny arrow](https://sourceforge.net/images/icon_linux.gif "tiny arrow")

To reference an attached image, just use the img macro. You can add more attributes:

[[img src=attached-image.jpg alt=foobar]]

# Videos

To embed a YouTube video, use the `embed` macro (only YouTube is supported at this time):

[[embed url=http://www.youtube.com/watch?v=6YbBmqUnoQM]]

# Escapes and HTML

What if you want to just show asterisks, not italics?

* this shows up in italics: *a happy day*
* this shows the asterisks: \*a happy day\*

Many simple HTML tags are allowed, for example <b> And unknown tags will be dropped. To show a literal <b> or an unknown tag like <foobar> you need escape it with HTML entities: :

<b>this will be bold</b>  
you should escape &lt;unknown&gt; tags  
&copy; special entities work  
&amp;copy; if you want to escape it  

HTML tags that are block-level like <div> can be used, but if there is markdown formatting within it, you must add a "markdown" attribute: <div markdown> Some safe attributes are also allowed, permitting basic styling and layout: <div markdown style="float:left">

Individual ampersands (&) and less-than signs (<) are fine, they will be shown as expected.

# More Headers

# this is a huge header #
## this is a smaller header ##
### this is even smaller ###
#### more small ####
##### even smaller #####
###### smallest still: `<h6>` header

# Table of Contents

You can display a list of links to jump to headers in a document. Sub-headers will be nested.

[TOC]
# Section 1
## Sub-section 1
# Section 2

# Code Highlighting

The code highlighting syntax uses CodeHilite and is colored with Pygments. It follows the same syntax as regular Markdown code blocks, with ways to tell the highlighter what language to use for the code block.

The language will be detected automatically, if possible. Or you can specify it on the first line with 3 colons and the language name.

    :::python
    import abc

If the first line of the codeblock contains a shebang, the language is derived from that and line numbers are used. If shebang line contains a full path, it will be included in the output. If it does not contain a path (a single / or even a space), then that shebang line will be omitted from output.

    #!/usr/bin/python
    import abc

#!/usr/bin/python
import abc

If using a code block of tildes or backticks, you can also specify the language on the first divider line

~~~html
<a href="#">My code</a>
~~~

```html
<a href="#">My code</a>
```

Many languages are supported. See all the "short names" listed in the Pygments docs.
