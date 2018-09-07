maitree gilda asar halant

# Todo
- add comments: facebook - https://github.com/lsmoura/hexo-fbcomments
- add cv
- add music - https://github.com/EYHN/hexo-tag-cplayer
- add homepage
- search for post and all links search for richardcooke
- add search
- add rss
- add google analytics
- envato
- fix graphic score maker
- Deploy to richardcooke.info too: https://github.com/frikeldon/hexo-deployer-jsftp
- move to richardcooke.info/site and put other code in apps
- disable wordpress site
- list of best software

# Notes
- Forum: https://gitter.im/hexojs/hexo
- https://github.com/probberechts/hexo-theme-cactus

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
