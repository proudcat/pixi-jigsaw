# 拼图游戏
>基于pixi.js v5版本，使用`es8`语法，演示了怎么用`webpack`搭建一个完整`pixi`游戏的开发环境，从开发到最终构建。

[体验地址](http://testactivity.goooku.com/ishop-demo/jigsaw/index.html) 

### 截屏
* ![demo](./demo.png)

### 快速开始
* 需要安装`nodejs`环境。
* 在项目根目录运行`npm install`来安装项目依赖的库。
* 运行`npm start`启动`http`服务器，然后浏览器访问`http://localhost:9090`就能看到项目效果。

### 需要会的技术栈(你能学到什么)
* 代码采用es7编写，正式打包时候会用`webpack`将所有`js`文件合并为一个文件`game.min.js`，并且转换为`es5`。
* 使用`pixi.js`v5版本
* 使用`texturepacker`工具制作图集。
* 项目为nodejs项目。
* 构建脚本使用`gulp`，脚本会调用`webpack`合并混淆`js`文件、压缩图片等等。
* 需要少量的`css`和`html`知识，当浏览器视口大小发生变化时候，利用`css`对`canvas`进行屏幕自适应。

### 目录及文件说明
* `res`: 存放工程文件,例如`texturepacker`图集项目，字体等等。
* `src`: 存放完整游戏项目，包括自己编写的`js`，第三方库，游戏资源(图片，音频等等)，游戏的`html`页面。
* `dist`: 此目录为构建脚本动态生成，存放构建完成的项目文件，每次构建都会重新生成这个目录。
* `.eslintrc.json`文件: 配置`es6`语法检查器语法检查规则
* `.eslintignore`文件: 配置`es6`语法检查器忽略检查的目录和文件
* `.gitattributes`文件: `git`提交时候`mac/unix`和`windows`换行符不一致，利用这个将所有系统换行符都统一。
* `.gitignore`文件: 配置`git`仓库忽略的文件。
* `.webpack.config.js`文件: webpack脚本。
* `.gulpfile.js`文件:`gulp`构建脚本，用于发布项目时候时候构建和优化整个项目。
* `package.json`文件: `node`项目的配置文件。


### 项目构建
* 项目根目录运行`npm run debug`可构建`debug`版本的项目，最终所有文件会拷贝到`dist`目录下，会合并所有的`js`文件，但并未混淆用于排错。
* 项目根目录运行`npm run dist`可构建`release`版本的项目，最终所有文件会拷贝到`dist`目录下，会合并所有的`js`文件并混淆，优化图片资源。