# Jigsaw Puzzle
>the project is based on pixi.js v5, demostrate how to build a game with webpack and utilize the latest ES feature.

[try the game](http://testactivity.goooku.com/ishop-demo/jigsaw/index.html) 

[中文文档](./doc/README_CN.md)

### Screenshot
![demo](./doc/demo.png)

### Setup
* you should have `nodejs` installed.
* run `npm install` command to install the dependencies.
* run `npm start` command to start`http`server,then you can play the game by access the url `http://localhost:8080`.

### Required Knowledge
* the code write in es8 and use pixi.js version 5.2.
* use `webpack` to combine and uglify the `js`files into one file `game.min.js`, and convert it to `es5`.
* use `texturepacker` tool to create atlas。
* use `gulp` as compile tool, `gulp` will invoke `webpack` to compile `js`files and optimize the pictures.
* you should have basic `css`and`html`knowledge, the `canvas` will auto fit the screen when viewport changed.

### File Structure
* `res`: `texturepacker` project and original font files etc.
* `src`:all game resource and source code.
* `dist`: distribute the final game project here.
* `.eslintrc.json`: eslint configuration file.
* `.eslintignore`: eslint ingore configuration.
* `.webpack.config.js`: webpack configuraion file.
* `.gulpfile.js`:`gulp` configuration file.
* `package.json`: `node` configuration file.


### Distribution
* run `npm run debug` command to build the project with `debug` version, all the files will copy into `dist` directory and  wont uglify the js files.
* run`npm run dist`command to `release` the project,all the files will copy into `dist` directory, all js files will combined and uglified,all pictures will be optimized.