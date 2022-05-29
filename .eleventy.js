"use strict";

module.exports = function(config)
{
	const folderSetup =
	{
		dir: {
			input: './src',
			output: './docs'
		}
	};
	config.addPassthroughCopy('./src/media/');

	return folderSetup
};

/* # Hexo Configuration
## Docs: https://hexo.io/docs/configuration.html
## Source: https://github.com/hexojs/hexo/

# Site
title: Richard JE Cooke
subtitle:
description:
keywords:
author: Richard JE Cooke
language: en
timezone: UTC

# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: https://richardcooke.info
root: /
permalink: :lang/:year/:title/
permalink_defaults:
  lang: en

# Directory
source_dir: source
public_dir: docs
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: downloads/code
i18n_dir: :lang
skip_render:
  - assets/**
  - google1515058ef76c5056.html
  - .nojekyll

# Writing
new_post_name: :year-:month-:title.md # File name of new posts
default_layout: post
titlecase: false # Transform title into titlecase
# external_link: true # Open external links in new tab
filename_case: 0
render_drafts: false
post_asset_folder: true # keep assets in post folder
relative_link: false
future: true
highlight:
  enable: true
  line_number: true
  auto_detect: false
  tab_replace:

# Home page setting
# path: Root path for your blogs index page. (default = '')
# per_page: Posts displayed per page. (0 = disable pagination)
# order_by: Posts order. (Order by date descending by default)
index_generator:
  path: ''
  per_page: 10
  order_by: -date

# Category & Tag
default_category: uncategorized
category_map:
tag_map:

# Date / Time format
## Hexo uses Moment.js to parse and display date
## You can customize the date format as defined in
## http://momentjs.com/docs/#/displaying/format/
date_format: YYYY-MM-DD
time_format: HH:mm:ss

# Pagination
## Set per_page to 0 to disable pagination
per_page: 100
pagination_dir: page

# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
# - type: git
#   repo: https://github.com/RichardJECooke/richardjecooke.github.io
#   branch: main
# - type: ftp
#   connection:
#     host: richardcooke.info
#     port: 21
#     user: harmonar
#     # password: <ftp password> - never put this in
#     keepalive: 5000
#   root: public_html

# Other
theme: cactus

# Atom feed
feed:
  type: atom
  path: atom.xml
  limit: 200
  hub:
  content: true
  content_limit: 200
  content_limit_delim: '.'
  order_by: -date

# Markdown options for hexo-renderer-marked
marked:
  gfm: true

*/