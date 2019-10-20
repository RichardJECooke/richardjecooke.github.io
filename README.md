# Todo
- use rsync instead of ftp (or ftps?)
- add search
- pond5 / metapop / audiojungle
- check out next theme / or make a theme with bootstrap
- add new options to hexo cplayer https://github.com/EYHN/hexo-tag-cplayer/issues/4
  - or switch to aplayer - https://github.com/MoePlayer/APlayer
  - https://github.com/MoePlayer/hexo-tag-aplayer
  - then add to docs

# Notes
- Forum: https://gitter.im/hexojs/hexo
- https://github.com/probberechts/hexo-theme-cactus
- https://github.com/EYHN/hexo-tag-cplayer
- https://www.npmjs.com/package/cplayer

# What to install 
Run Ubuntu console (install from Windows store & programs & features - turn windows settings on or off - windows subsystem for linux)
```
sudo apt-get update -y &&
sudo apt-get install curl -y &&
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash &&
nvm install node
#restart
sudo apt install npm
```

# Initial creation
Run Ubuntu console
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
Run Ubuntu console
```
cd /mnt/c/data/site
npm update
./node_modules/.bin/hexo server
```

# Deploy
- https://hexo.io/docs/deployment.html
- This site deploys to https://richardjecooke.bitbucket.io/ and https://richardcooke.info

## richardcooke.info deploy
```
./node_modules/.bin/hexo clean && ./node_modules/.bin/hexo generate
# ./node_modules/.bin/hexo deploy password=enter_password
```
Log in with WinSCP and copy the public folder contents into the public_html folder manually.
The ftp deployer doesn't seem to work.

## Bitbucket deploy
- Set your main branch in bitbucket or github to 'deployed' and set this branch in your config to deploy too.
- Keep committing locally to master.
```bash
./node_modules/.bin/hexo clean && ./node_modules/.bin/hexo generate
./node_modules/.bin/hexo deploy
```
- Username is richard.j.e.cooke@gmail.com (when asked for credentials by git)

# Themes
- Using my own fork of cactus (must be copied manually to update): https://bitbucket.org/rjeapps/hexo_cactus_theme_fork/src/master/
forked from https://probberechts.github.io/hexo-theme-cactus/cactus-dark/public/

# New post
hexo new [layout] <title>
