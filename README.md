## Todo
- upgrade version
- find todos
- use new music logo with better crotchet
- article on eleventy - darekkay, nunjucks, folder structur, passhtrough, nojekyll, plugins, bulma problems - heading sizes changed, bullet points gone, scroll overflow changed, container margins don't work
- set twitter and facebook metadata
- put tags in post layout, and articles page
- get ideas from https://darekkay.com/blog/hexo-to-eleventy/
- add search
- 404 - https://www.11ty.dev/docs/quicktips/not-found/
- run lighthouse test


## Notes
- /docs is the output folder (because github uses it to make websites)
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
nvm ls-remote # get latest version
nvm install 18.17.0
nvm alias default 18.17.0
nvm alias system 18.17.0
nvm use 18.17.0
```

## Run locally on localhost:8080
```bash
cd ~/code/richardjecooke.github.io;
npm update;
clear && rm -rf ./docs && npx @11ty/eleventy --serve;    #  run local server
clear && rm -rf ./docs && npx @11ty/eleventy;    #  build for deploy
clear && rm -rf ./docs && DEBUG=Eleventy* npx @11ty/eleventy;  # debug
```

Alternative command: `node ../node_modules/@11ty/eleventy/cmd.js`

## Deploy
- This site deploys to https://richardjecooke.github.io and https://richardcooke.info

### richardcooke.info deploy
```bash
rm -rf ./docs && npx @11ty/eleventy
```
- Log in with WinSCP or Filezilla and copy the `docs` folder contents into the public_html folder manually.

### Github deploy
- Build and push to github. The `docs` folder is automatically output as the webpage.
- Username is richard.j.e.cooke@protonmail.com (when asked for credentials by git)
- Check https://richardjecooke.github.io/