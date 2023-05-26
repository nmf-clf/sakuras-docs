# Mini-webpack

目标：通过手写一个 简易的 webpack，理解 webpack 运行原理

## 如何手写

回想一下一开始使用 webpack 的步骤；

> 1. npm init -y：初始化 自动生成一个 package.json 依赖包管理文件
> 2. npm install webpack webpack-cli --save-dev
> 3. 然后编写 webpack.config.js ，[如何编写](https://webpack.docschina.org/guides/getting-started/#npm-scripts)
> 4. npx webpack --config webpack.config.js 打包，将打包后文件输出到指定目录
> 5. 最后通过 html 文件的 script 标签将打包后的 js 文件引入，在浏览器中打开 html

因此我们要实现一个自己的 webpack，就需要满足以下：

-   如何执行打包命令，如 npx webpack，npx 可以执行 node_modules 目录下的包
-   打包完输出到 dist 目录，通过 html 文件引入并在浏览器上运行
-   分析打包生成的文件 bundle.js，明白它的结构，以便自己生成一个这样的文件
-   实现：执行 xx 命令，根据 webpack.config.js 打包项目并生成 bundle.js 结构的文件

接下来我们通过查看打包后的 bundle.js 文件分析结构：

```js
(() => {
    var __webpack_modules__ = ({
        "./src/index.js": ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
            eval("console.log('index.js....');\r\nconst test = __webpack_require__(/*! ./test */ \"./src/test.js\");\r\nconsole.log('自定义打包工具：' + test);\r\n\r\n\n\n//# sourceURL=webpack://01-easy/./src/index.js?");
        }),
        "./src/test.js": ((module) => {
            eval("console.log('test.js ...');\r\nlet name = 'mini-webpack'\r\nmodule.exports = name;\n\n//# sourceURL=webpack://01-easy/./src/test.js?");
        });
    })
    var __webpack_module_cache__ = {}; // webpack 在运行时维护的一个模块缓存对象，它用于存储已经加载的模块的信息，以便在后续的模块加载中能够快速地获取到已经加载的模块
	// The require function
	function __webpack_require__(moduleId) {
		// Check if module is in cache
		var cachedModule = __webpack_module_cache__[moduleId];
		if (cachedModule !== undefined) {
			return cachedModule.exports;
		}
		// Create a new module (and put it into the cache)
		var module = __webpack_module_cache__[moduleId] = {
			// no module.id needed
			// no module.loaded needed
			exports: {}
		};
		// Execute the module function
		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
		// Return the exports of the module
		return module.exports;
	}
	var __webpack_exports__ = __webpack_require__("./src/index.js");
})();
```
可以注意到输出文件定义了三个变量：
- `__webpack_modules__`
    - 是 webpack 在打包时生成的一个模块数组，它包含了所有需要被打包的模块的代码和元数据。
在 webpack 打包时，它会递归地遍历所有的模块，并将每个模块的代码和元数据添加到 __webpack_modules__ 数组中。这些元数据包括模块的 ID、依赖关系、代码块等信息，这些信息在 webpack 运行时非常重要。
    - 在 webpack 运行时，它会使用 __webpack_modules__ 数组中的模块信息，依据模块的依赖关系和代码块等信息，构建出应用程序的依赖图，并执行应用程序的逻辑。因此，__webpack_modules__ 数组是 webpack 打包后的 JavaScript 文件中非常重要的一部分。
- `__webpack_module_cache__`
    - 是 webpack 在运行时维护的一个模块缓存对象，它用于存储已经加载的模块的信息，以便在后续的模块加载中能够快速地获取到已经加载的模块。
    - 当 webpack 加载一个模块时，它会先检查 __webpack_module_cache__ 对象中是否已经存在该模块的缓存信息。如果存在缓存信息，则 webpack 会直接从缓存中获取该模块的导出值，而无需再次加载和编译该模块。这样可以显著提高模块加载的速度和性能。
    - __webpack_module_cache__ 对象的键是模块的路径，值是模块的导出值。在 webpack 打包后的 JavaScript 文件中，可以看到 __webpack_module_cache__ 对象的定义和使用

总结：打包后的文件是一个`自执行函数`，其中定义了三个变量：模块对象数组，缓存模块对象，自定义require函数：
- 模块对象数组，其中对象的 key 为文件路径，值为一个函数，该函数返回 `eval()` 执行结果，eval 方法接收字符串，其中原 require 方法被重新输出为 __webpack_require__ 自定义方法
- 然后第二个变量 __webpack_module_cache__ 定义模块缓存对象，对象的 key 为文件路径，
- 第三个变量 __webpack_require__ 定义 require 函数，并且会默认执行 1 次，将入口文件路径如`./src/index.js` 作为参数传入，然后执行 __webpack_modules__ 对应路径的函数代码，在此期间，会先从缓存对象里查找该路径的文件是否存在缓存里，如果没有就设置 module.exports 为空对象，<u>并将 module对象通过 自定义require函数参数传入，且在执行该文件对应的代码时，如果代码内部存在 module.exports = xxx；则进行赋值，由于对象引用传递，因此缓存对象里就有路径对应的导出内容了。</u>
- 同时如果在执行 __webpack_require__ 的 __webpack_modules__ 对应的 eval 代码里遇到了对其他文件的引用，则递归调用 __webpack_require__
```js
/* index.js */
const test = require('./test.js');
/* bundle.js */
"./src/index.js": ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
    eval("console.log('index.js....');\r\nconst test = __webpack_require__(/*! ./test */ \"./src/test.js\");\r\nconsole.log('自定义打包工具：' + test);\r\n\r\n\n\n//# sourceURL=webpack://01-easy/./src/index.js?");
```

## 创建打包命令 skpack
1. 创建 `skpack` 命令的目录，如下：
    ```
    - skpack
        - bin
            - index.js --- ``
        - lib
    ```
    并在 `bin/index.js` 文件中写入如下代码：
    ```js
        #! /usr/bin/env node
        console.log('hello skpack');
    ```
    这段代码意思是告诉系统使用 node 来执行这个文件，并在控制台输出 "Hello, skpack!"

2. 生成 `package.json` 文件 - 执行`npm init -y`
    ```json
    {
        "name": "skpack",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "bin": {
            "skpack": "bin/index.js"
        },
        "directories": {
            "lib": "lib"
        },
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        "keywords": [],
        "author": "",
        "license": "ISC"
    }
    ```
3. 生成命令，`npm link` - 会在全局目录下生成一个 `skpack` 命令（创建全局快捷方式），你可以在全局 npm 包的 node_modules 目录下找到 skpack 的快捷方式，它指向了你的项目目录下的 bin/index.js 文件
4. 执行 `npx skpack` 命令，会打印出 `hello skpack`，说明命令创建成功

## 编写 skpack 代码
1. 创建 `lib/Compiler.js` 文件，用于编写打包逻辑

