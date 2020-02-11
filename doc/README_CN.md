# 拼图游戏
>这个教程面对初学者，通过创建一个拼图游戏，来演示怎么完整开发一款`pixi`游戏并最终发布。
>
>在此项目中可以学会`pixi`游戏开发时候怎么`划分模块`，怎么`加载资源`，怎么进行`屏幕自适应`，怎么播放`音频`和`视频`，怎么`分层`，怎么通过`继承pixi类`来扩展功能，怎么实现`多国语言`，怎么用`webpack`进行开发期的`调试`以及最终怎么`构建发布`游戏。

[体验地址](http://testactivity.goooku.com/ishop-demo/jigsaw/index.html) 

### 截屏
![demo](./demo.png)

### 快速开始
* 需要安装`nodejs`环境。
* 在项目根目录运行`npm install`来安装项目依赖的库。
* 运行`npm start`启动项目服务器，将自动打开chrome浏览器。

### 需要会的技术栈(你能学到什么)
* 使用`pixi.js`v5版本。
* 使用`webpack`开发调试，最终将所有`js`文件合并和混淆,并且利用tree shake将最终代码尺寸优化到最小(库里无用的模块不会被打进最终文件)。
* 使用`babel`将代码最终转换为`es5`。
* 使用`texturepacker`工具制作图集。
* 构建脚本使用`gulp`，调用`webpack`合并混淆`js`文件和压缩图片等等。
* 少量的`css`和`html`知识，当浏览器视口大小发生变化时候，利用`css`对`canvas`进行屏幕自适应。

### 目录及文件说明
* `res`: 存放工程文件,例如`texturepacker`图集项目，字体等等。
* `src`: 存放完整游戏项目，包括自己编写的`js`，第三方库，游戏资源(图片，音频等等)，游戏的`html`页面。
* `dist`: 此目录为构建脚本动态生成，存放构建完成的项目文件，每次构建都会重新生成这个目录。
* `.webpack.common.js`文件: webpack公共脚本。
* `.webpack.dev.js`文件: webpack开发配置脚本。
* `.webpack.prod.js`文件: webpack发布配置脚本。
* `.gulpfile.js`文件:`gulp`构建脚本，用于发布项目时候时候构建和优化整个项目。
* `package.json`文件: `node`项目的配置文件。


### 项目构建
* 项目根目录运行`npm run build`可构建`release`版本的项目，最终所有文件会拷贝到`dist`目录下，会合并所有的`js`文件并混淆，优化图片资源。