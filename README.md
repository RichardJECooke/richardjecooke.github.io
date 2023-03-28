## Todo
- upgrade version
- article on eleventy - darekkay, nunjucks, folder structur, passhtrough, nojekyll, plugins, bulma problems - heading sizes changed, bullet points gone, scroll overflow changed, container margins don't work
- set twitter and facebook metadata
- put tags in post layout, and articles page
- get ideas from https://darekkay.com/blog/hexo-to-eleventy/
- add search
- 404 - https://www.11ty.dev/docs/quicktips/not-found/
- run lighthouse test


## Notes
- /docs is the output folder (because github uses it to make websites)
- node 16.15.0
- https://www.11ty.dev/docs (version in the package.json file)

## Setup
```
clear &&
sudo apt-get update -y &&
sudo apt-get install curl -y &&
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash &&
nvm install node &&
# restart terminal
sudo apt install npm -y &&
nvm install 16.15.0 &&
nvm alias default 16.15.0 &&
nvm alias system 16.15.0 &&
nvm use 16.15.0
```

## Run locally on localhost:8080
```
cd ~/mi/code/mysite
npm update
clear && rm -rf ./docs && npx @11ty/eleventy --serve    #  run local server
clear && rm -rf ./docs && npx @11ty/eleventy    #  build for deploy
clear && rm -rf ./docs && DEBUG=Eleventy* npx @11ty/eleventy  # debug
```

Alternative command: `node ../node_modules/@11ty/eleventy/cmd.js`

## Deploy
- This site deploys to https://richardjecooke.github.io and https://richardcooke.info

### richardcooke.info deploy
- rm -rf ./docs && npx @11ty/eleventy
- Log in with WinSCP and copy the `docs` folder contents into the public_html folder manually.

### Github deploy
- Build and push to github. The docs folder is automatically output as the webpage.
- Username is richard.j.e.cooke@gmail.com (when asked for credentials by git)