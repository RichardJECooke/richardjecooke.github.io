# Todo
- add music - https://github.com/EYHN/hexo-tag-cplayer, check out helpers first

- Deploy to richardcooke.info too: https://github.com/frikeldon/hexo-deployer-jsftp
- move to richardcooke.info/site and put other code in apps
- disable wordpress site

- check that analytics works
- fix image links in cv to ekaya and eccr
- fix graphic score maker
- list of best software
- check that test comment on ekaya page showson bitbucket and info domains
  - work out data-href problem and update post and plugin readme to use guid?
- add search
- envato
- metapop
- check out next theme / or make a theme with bootstrap
- delete wordpress site

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
`./node_modules/.bin/hexo server`

# Deploy
- https://hexo.io/docs/deployment.html
- This site deploys to https://richardjecooke.bitbucket.io/ and https://richardcooke.info
- Set your main branch in bitbucket or github to 'deployed' and set this branch in your config to deploy too.
- Keep committing locally to master.
```bash
./node_modules/.bin/hexo clean && ./node_modules/.bin/hexo generate
./node_modules/.bin/hexo deploy
```
- Username is email address (when asked for credentials by git)

# Themes
- Using my own fork of cactus (must be copied manually to update): https://bitbucket.org/rjeapps/hexo_cactus_theme_fork/src/master/
forked from https://probberechts.github.io/hexo-theme-cactus/cactus-dark/public/
