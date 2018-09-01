# Todo
configuration - https://hexo.io/docs/configuration
fork theme and update
make page
write article on hexo
migrate existing site - https://tryshchenko.com/archives/moving-from-wordpress-to-static-html-using-hexo/

# Notes
Forum: https://gitter.im/hexojs/hexo

# Initial creation
npm install hexo-cli
.node_modules/.bin/hexo init mysite
copy it up a folder
npm install hexo-renderer-asciidoc
npm install hexo-deployer-git
git remote add origin https://bitbucket.org/RichardJECooke/richardjecooke.bitbucket.io

# Run locally
.node_modules/.bin/hexo server

# Deploy
https://hexo.io/docs/deployment.html
Set your main branch in bitbucket or github to 'deployed' and set this branch in your config to deploy to.
Keep committing locally to master.
.node_modules/.bin/hexo deploy

# Themes
Must support asciidoctor.
git clone https://github.com/probberechts/hexo-theme-cactus.git themes/cactus
Does this? https://probberechts.github.io/hexo-theme-cactus/cactus-dark/public/