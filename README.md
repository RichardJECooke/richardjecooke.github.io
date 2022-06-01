## Todo
- https://music.youtube.com/channel/UCB9ymHb9ZybTNH1GmQD0FYg
- download all fonts, js, styles instead of cdn
- get ideas from https://darekkay.com/blog/hexo-to-eleventy/
- add search
- pond5 / metapop / audiojungle
- check out next theme / or make a theme with bootstrap

## Notes
- node 16.15.0
- https://www.11ty.dev/docs (version in the package.json file)
- Bulma 0.9.4: https://bulma.io/documentation/overview/start/

## Setup
Run Ubuntu console (install from Windows store & programs & features - turn windows settings on or off - windows subsystem for linux)
```
sudo apt-get update -y &&
sudo apt-get install curl -y &&
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash &&
nvm install node
#restart
sudo apt install npm
nvm install 16.15.0
nvm alias default 16.15.0
nvm alias system 16.15.0
nvm use 16.15.0
```

## Run locally on localhost:8080
Run Ubuntu console
```
cd /mnt/c/data/mysite
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