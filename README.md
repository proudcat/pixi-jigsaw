# Jigsaw Puzzle
>In this tutorial you’re going to find out how to make `pixi.js` with v5, how to utilize the latest `es` feature, how to separate `.js`files(`es module`), how to load resource, how to fit the screen automatically, how to play `sound` and `video`, how to split `layer` , how to `extends pixi class`,how to make `internationalization`, how to use `webpack` and `babel` to develop and distribute the game(optimize the image files,tree shake, combine and obfuscate the `js` files) and so on.

[try the game](http://testactivity.goooku.com/ishop-demo/jigsaw/index.html) 

[中文文档](./doc/README_CN.md)

### Screenshot
![demo](./doc/demo.png)

### Setup
* you should have `nodejs` installed.
* run `npm install` command to install the dependencies.
* run `npm start` command to start `http` server, then you can play the game by accessing the URL `http://localhost:8080`.

### Required Knowledge
* based on pixi.js version 5.2.
* use `webpack` to debug the project at deveopment phase, and combine, obfuscate `js` files at distribution phase.
* the code is written in es8 and use `bable` to convert `js` files to `es5`.
* use `texturepacker` tool to create atlas.
* use `gulp` script to combine all compile tools and build the project.
* basic `css`and`html`knowledge, the `canvas` will auto fit the screen when viewport changed.

### File Structure
* `res`: `texturepacker` project and original font files etc.
* `src`:all game resource and source code.
* `dist`: distribute the final game project here.
* `.webpack.config.js`: webpack configuration file.
* `.gulpfile.js`:`gulp` configuration file.
* `package.json`: `node` configuration file.


### Distribution
* run `npm run debug` command to build the project with `debug` version, all the files will copy into `dist` directory with out any optimization.
* run `npm run dist`command to `release` the project, all the files will copy into `dist` directory, all `.js` files will combined and obfuscate, all pictures will be optimized.