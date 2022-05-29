# Eleventy

## General
- content files and layouts are both templates
- about.md becomes folder about/index.html. This adds security as their is no folder view of all filenames
- layout files contain content files
- the `_data` folder contains .json files (in subfolders) with data that is accessible in every singe template
- passthrough images unaltered to final site: `config.addPassthroughCopy('./src/images/');`
- `<img src="/assets/img/image.png" width="50" height="50" />`
- `<img src="{{ '/assets/img/image.png' | url }}" width="50" height="50" />`

## Front matter
- Has to appear above all the html or markdown in a file
- Nested files can use each other's variables. The lowest file takes precedence.
```html
---
title: Birds
birds:
  - robin
  - finch
  - sparrow
tags: post
date: 2019-01-01
layout: layout.html
---
<!DOCTYPE html>
```

## Liquid templating language
Reference:
- https://shopify.dev/api/liquid#liquid-syntax
- https://shopify.github.io/liquid/basics/introduction/

```html
<title>{{ title }}</title>
	<ul>
		{% for bird in birds -%} <!-- dash prevents linebreak -->
		<li>{{ bird }}</li>
		{% endfor -%}
	</ul>
```

## Layouts
- Any file that uses this layout will have its content put in the content tag. So each layout should have only one content tag.
Template file:
```html
<!DOCTYPE html>
<html>
<head>
	<title>LAYOUT TITLE</title>
</head>
<body>
	{{ content -}}
</body>
</html>
```
Markdown file:

```markdown
---
layout: layout.html
---

# Animals About Page

This is the Animals about page
```

## Collections
- Collections group any file by its tags
- `| safe` ensures the post content is changed to html first
```
{% for post in collections.post -%}
<li>{{ post.data.title }}, {{ post.data.date }}</li>
{{ post.templateContent | safe }}
{% endfor -%}

---
tag: post
---
```

## Partials
- intended to be a component in a page, not a full page
- `{% include _head.html %}`
- sought in the _includes folder by default
- named with underscore by default
