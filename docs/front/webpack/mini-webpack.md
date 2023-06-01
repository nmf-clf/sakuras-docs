# Mini-webpack

> 俗话说，要学好 `webpack` 最好的方法就是手写一个 `mini-webpack`

## 如何手写

回想一下一开始使用 webpack 的步骤；

> 1. `npm init -y`：初始化 - 自动生成一个 `package.json` 依赖包管理文件
> 2. `npm install webpack webpack-cli --save-dev`：`webpack-cli` 作用是在命令行中执行 `webpack` 命令，`webpack-cli` 依赖 webpack，所以一起安装
> 3. 然后编写 `webpack.config.js` ，[如何编写](https://webpack.docschina.org/guides/getting-started/#npm-scripts)
> 4. `npx webpack --config webpack.config.js` 打包，将打包后文件输出到指定目录
> 5. 最后通过 `html` 文件的 `script` 标签将打包后的 `js` 文件引入，在浏览器中打开 `html`

因此我们要实现一个自己的 `skpack`，就需要满足以下：

-   如何执行打包命令，如 `npx skpack` ：`npx` 可以执行 `node_modules` 目录下的包
-   打包完输出到 `dist` 目录，通过 `html` 文件引入并在浏览器上运行

怎么实现：
-   通过分析打包生成的文件 `bundle.js`，明白它的结构，以便自己生成一个这样的文件
-   例如：执行 `npx skpack` 命令，根据 `skpack.config.js` 打包项目并生成 `bundle.js` 结构的文件

接下来我们通过查看打包后的 `bundle.js` 文件分析结构：

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
在 webpack 打包时，它会递归地遍历所有的模块，并将每个模块的代码和元数据添加到 `__webpack_modules__` 数组中。这些元数据包括模块的 ID、依赖关系、代码块等信息，这些信息在 webpack 运行时非常重要。
    - 在 webpack 运行时，它会使用 `__webpack_modules__` `数组中的模块信息，依据模块的依赖关系和代码块等信息，构建出应用程序的依赖图，并执行应用程序的逻辑。因此，__webpack_modules__` 数组是 webpack 打包后的 JavaScript 文件中非常重要的一部分。
- `__webpack_module_cache__`
    - 是 webpack 在运行时维护的一个模块缓存对象，它用于存储已经加载的模块的信息，以便在后续的模块加载中能够快速地获取到已经加载的模块。
    - 当 webpack 加载一个模块时，它会先检查 `__webpack_module_cache__` 对象中是否已经存在该模块的缓存信息。如果存在缓存信息，则 webpack 会直接从缓存中获取该模块的导出值，而无需再次加载和编译该模块。这样可以显著提高模块加载的速度和性能。
    - `__webpack_module_cache__` 对象的键是模块的路径，值是模块的导出值。在 webpack 打包后的 JavaScript 文件中，可以看到 `__webpack_module_cache__` 对象的定义和使用

总结：打包后的文件是一个`自执行函数`，其中定义了三个变量：模块对象数组，缓存模块对象，自定义require函数：
- 模块对象数组，其中对象的 `key` 为文件路径，值为一个函数，该函数返回 `eval()` 执行结果，`eval` 方法接收字符串，其中原 `require` 方法被重新输出为 `__webpack_require__` 自定义方法
- 然后第二个变量 `__webpack_module_cache__` 定义模块缓存对象，对象的 `key` 为文件路径，
- 第三个变量 `__webpack_require__` 定义 `require` 函数，并且会默认执行 `1` 次，将入口文件路径如`./src/index.js` 作为参数传入，然后执行 `__webpack_modules__` 对应路径的函数代码，在此期间，会先从缓存对象里查找该路径的文件是否存在缓存里，如果没有就设置 module.exports 为空对象，<u>并将 module对象通过 `自定义require函数` 参数传入，且在执行该文件对应的代码时，如果代码内部存在 module.exports = xxx；则进行赋值，由于对象引用传递，因此缓存对象里就有路径对应的导出内容了。</u>
- 同时如果在执行 `__webpack_require__` 的 `__webpack_modules__` 对应的 eval 代码里遇到了对其他文件的引用，则递归调用 `__webpack_require__`
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
        /* 
            #! /usr/bin/env node
            该代码是一个 Shebang（也称为 Hashbang 或者 Sharpbang），它是一个特殊的注释，用于指定脚本文件的解释器。
            在这个例子中，Shebang 指定了脚本文件的解释器为 Node.js，即 #! /usr/bin/env node。这意味着当你在终端中执行这个脚本文件时，系统会使用 Node.js 解释器来解析并执行该脚本文件。
            Shebang 注释位于脚本文件的第一行，并以 #! 开始，后面跟着解释器的路径和参数（如果需要）。在这个例子中，/usr/bin/env 是一个用于定位系统环境中可执行程序的标准工具，它会自动搜索 PATH 环境变量中指定的目录，找到 node 命令的路径，并将其作为解释器来执行脚本文件。
            Shebang 是一种非常常见的技术，在 Unix 和类 Unix 系统中广泛应用于命令行工具和脚本文件中，它可以让用户无需显式地指定解释器，而直接运行脚本文件。同时，Shebang 也可以指定其他解释器，例如 Python、Ruby 等，以便更方便地执行各种脚本任务。
            需要注意的是，Shebang 只对可执行脚本文件有效，对于其他类型的文件，系统会忽略 Shebang 注释。此外，Shebang 注释必须位于文件的第一行，并且必须与 #! 相邻，否则系统会忽略该注释。
            总之，该代码中的 Shebang 注释指定了脚本文件的解释器为 Node.js，并使得用户可以直接运行脚本文件，而无需显式地指定解释器。这是一种非常常见的技术，在编写命令行工具和脚本文件时经常会使用到。
        */
    ```
    这段代码意思是告诉系统使用 `node` 来执行这个文件，并在控制台输出 `"Hello, skpack!"`

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
3. 生成命令，`npm link` - 会在全局目录下生成一个 `skpack` 命令（创建全局快捷方式），你可以在全局 `npm` 包的 `node_modules` 目录下找到 `skpack` 的快捷方式，它指向了你的项目目录下的 `bin/index.js` 文件
4. 执行 `npx skpack` 命令，会打印出 `hello skpack`，说明命令创建成功

## 复习 Node Api
以下 Node API 将会在后面的代码中用到，这里先做一个简单的复习：
- `process.cwd()`：返回 Node.js 进程的当前工作目录。
- `path.resolve`：将路径或路径片段的序列解析为绝对路径
- `path.relative`：根据当前工作目录返回 from 到 to 的相对路径
- `path.join`：使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径
- `path.dirname`：返回 path 的目录名，即当前文件所在的目录名

## 编写 skpack 基础代码
### 1. 创建 `lib/Compiler.js` 文件，编写 `Compiler` 类
```js
// 编译器
class Compiler {
    constructor(options) {
        // webpack配置
        const { entry, output } = options;
        // 入口
        this.entry = entry;
        // 出口
        this.output = output;
        // 模块
        this.modules = [];
        // 当前目录
        this.root = process.cwd(); // 返回 Node.js 进程的当前工作目录。
    }
    buildModule() {
        console.log("buildModule...");
    }
    // 构建启动
    run() {
        // 开始构建
        this.buildModule();
    }
}
module.exports = Compiler;
```
### 2. 修改`/bin/index.js`，引入`Compiler`类，并执行`run`方法
```js
#! /usr/bin/env node
let path = require("path");
let config = require(path.resolve("skpack.config.js")); // path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。
// 编译器
let Compiler = require("../lib/Compiler");
let compiler = new Compiler(config);
// 编译
compiler.run();
```
### 3. 构建依赖
将 `模块默认入口` 传入，并获取所有模块的依赖关系
- 读取代码内容
- 读取模块文件相对路径 - 要与 `__webpack_require__` 里的路径一致
- 读取模块文件中子依赖包，首先需要解析当前模块
- 解析结果：是否存在子依赖包 `dependencies`，如果存在则递归解析子依赖包，以及解析的源码 `sourceCode`
- 代码解析：`vue--→html` `less--→css` `es6--→es5`
    ```js
    // 构建模块 - modulePath: 模块绝对路径 - isEntry: 是否是入口文件
    buildModule(modulePath, isEntry) {
        console.log("----------------------------------------------------");
        console.log("构建模块>>>", modulePath);
        // 1. 读取代码内容
        let source = this.getSource(modulePath);
        // 2. 获取模块相对路径
        let moduleName = "./" + path.relative(this.root, modulePath); // 获取相对路径的目的是为了在后面的递归加载依赖模块时，需要获取依赖模块的绝对路径
        console.log("模块名(相对路径)::", moduleName); // ./src/index.js
        if (isEntry) {
            this.entryId = moduleName; // 保存入口的名字
        }
        // 3. 解析需要把 source 源码进行改造，返回一个依赖列表 - dependencies: 依赖列表通常是相对路径
        let { sourceCode, dependencies } = this.parse(
            source,
            path.dirname(moduleName)
        );
        // 4. 把相对路径和模块中的内容对应起来
        this.modules[moduleName] = sourceCode;
        // 5. 递归加载依赖模块
        dependencies.forEach((dep) => {
            // 依赖模块的递归加载 - 需要获取依赖模块的绝对路径
            this.buildModule(path.join(this.root, dep), false);
        });
    }
    // 构建启动
    run() {
        // 开始构建 - 从入口开始 - 拿到入口文件的绝对路径
        this.buildModule(path.resolve(this.root, this.entry), true);
    }
    ```
### 4. 模块解析
使用 [ast语法树](https://astexplorer.net/) 解析代码
- 使用 [babylon](https://github.com/babel/babylon/) - 将源码转换成 ast √
- 使用 [babel-traverse](https://babeljs.io/docs/en/babel-traverse) 遍历语法树 √
- 使用 [babel-types](https://babeljs.io/docs/en/babel-types) 生成 es5 代码 √
- 使用 [babel-generator](https://babeljs.io/docs/en/babel-generator) 生成 es5 代码 √
> npm install babylon @babel/traverse @babel/types @babel/generator -S

步骤：
1. 将源码转换成 `AST`
2. 遍历 `AST`，根据需要找到对应的节点，进行处理
    - 将代码中的 `require` 替换成 `__webpack_require__`
    - 将代码中的 `require("./test")` 补全成 `require("./test.js")`
    - 获取模块的相对路径（模块的引用名字 + 扩展名 + 父级目录）
    - 依赖收集 + 覆盖原路径名字
3. 将 `AST` 转换成源码，收集依赖 `dependencies`
4. 返回 `sourceCode` 和 `dependencies`
- 模块解析部分实现：
    ```js
    // 解析源码
    parse(source, parentPath) {
        // 1. 将源码转换成 AST
        let ast = babylon.parse(source);
        // 2. 遍历 AST
        let dependencies = []; // 依赖列表
        traverse(ast , { // traverse - 遍历 AST
            CallExpression(p) { // CallExpression - 遍历所有的函数调用
                let node = p.node; // 对应的节点
                if(node.callee.name === 'require') { 
                    node.callee.name = '__webpack_require__'; // 替换 require 为 __webpack_require__
                    let moduleName = node.arguments[0].value; // 模块的引用名字 
                    moduleName = moduleName + (path.extname(moduleName) ? '' : '.js'); // 模块的引用名字 + 扩展名 
                    moduleName = './' + path.join(parentPath, moduleName); // 模块的引用名字 + 扩展名 + 父级目录
                    dependencies.push(moduleName); // 依赖列表
                    node.arguments = [types.stringLiteral(moduleName)]; // 将更新后的子模块依赖名写回去 types.stringLiteral - 创建一个字符串文字节点
                }
            }
        })
        // 3. 将 AST 转换成源码
        let sourceCode = generator(ast).code;
        return {
            sourceCode,
            dependencies
        }
    }
    ```

### 5. 模板生成
- 使用模板生成 `bundle.js`，传入的参数必须是动态的
- 模板 - [ejs模板](https://ejs.bootcss.com/) <%=xxx%>
    - 首先创建模板文件 `lib/bundle.ejs`
    - 在 `lib/Compiler.js` 中引入 `ejs` 模板（可以使用 `webpack` 打包后的 `bundle.js` 为基础模板进行更改）
    - 使用 `ejs` 将模板转换成函数
    - 使用 `ejs` 函数将模板转换成字符串
    - 使用 `fs` 将替换后的模板写入到文件 `bundle.js` 中，使用 `index.html` 引入打开测试与 `webpack` 打包的结果一致
> 安装 ejs：npm install ejs -S
- 模板生成实现：
    ```js
    // 打包文件
    emitFile() {
        // 1. 获取文件内容
        let main = this.getSource(path.resolve(__dirname, 'bundle.ejs'));
        // 2. 模板渲染
        let code = ejs.render(main, {
            entryId: this.entryId,
            modules: this.modules
        })
    }
    // 构建启动
    run() {
        this.buildModule(path.resolve(this.root, this.entry), true);
        // 打包文件
    +   this.emitFile();
    }
    ```
- 模板渲染替换 - `lib/bundle.ejs`
### 6. 打包输出
```js
emitFile() {
    // ...

    // 3. 输出到哪个目录下
    let mainPath = path.join(this.output.path, this.output.filename);
    // 4. 写入文件
    // this.assets = {}; // 作用是为了在后面的 emit 钩子中使用
    // this.assets[main] = code; // 作用是为了在后面的 emit 钩子中使用
    // fs.writeFileSync(main, this.assets[main]); // 为什么 this.assets[main] 不直接用 code 代替，因为在后面的 emit 钩子中需要使用 this.assets[main]
    fs.writeFileSync(mainPath, code);
}
// 构建启动
run() {
    this.buildModule(path.resolve(this.root, this.entry), true);
    // 打包文件
+   this.emitFile();
}
```

## 实现 loader
### 1. 为什么要用 loader？
由于 `webpack` 只能识别 `js` 文件，因此需要使用 `loader` 将资源转换为 `webpack` 可以识别的语言。

`loader` 是一个函数，接收一个参数，返回一个转换后的结果，例如：
- 使用 `loader` 转换 样式资源，如：`css`、`less`、`sass` 等
- 使用 `loader` 转换 图片资源，如：`png`、`jpg`、`gif`、`svg`、`mp4`、`mp3`、`webm` 等
- 使用 `loader` 转换 js语法，如：`babel-loader` 等
- 使用 `loader` 转换 其他资源，如：`vue-loader`、`html-loader`、`markdown-loader` 等

### 2. 复习 loader 的使用
在学习如何实现 `loader` 之前，我们先来看看 `webpack` 中的 `loader` 是如何使用的

先安装并使用 `less`
- 安装
    > `npm install less less-loader css-loader style-loader -D`
- 在 `index.js` 中引入 `less` 文件
- 在 `webpack.config.js` 中配置 `loader`
    ```js
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    "style-loader", // 将样式通过 style 标签插入到 head 中
                    "css-loader", // 将 css 转换成 commonjs 模块
                    "less-loader", // 将 less 转换成 css
                ],
            }
        ]
    }
    ```
- 执行 `npx webpack`，在 `dist` 目录下可以看到 `bundle.js` 文件，打开 `index.html` 可以看到样式已经生效

通过以上代码发现，`use` 数组中的 `loader` 是从后往前执行的，即：`less-loader` -> `css-loader` -> `style-loader`; \
在 `webpack` 源码中，每个 `loader` 都会将转换后的结果传递给下一个 `loader`; \
因此我们可以以此为思路，先实现 `style-loader`，再实现 `css-loader`，最后实现 `less-loader`（以下实现略过 `css-loader`）。

### 3. 创建 `根目录/loader` 目录
通常我们将 `自定义loader` 存放在指定的目录里，这里我们创建 `根目录/loader` 目录，用于存放自定义 `loader`。
### 4. 编写自定义 `loader` 
以转换 `less` 为例
- 在 `/loader/less-loader.js` 中编写 `less-loader`，将 `less` 转换为 `css`
    ```js
    // 根目录/loader/less-loader.js
    const less = require("less");

    function loader(source) { // source - less 文件的内容
        let css = '';
        less.render(source, (err, res) => { // less.render() - 将 less 转换为 css
            css = res.css;
        });
        css = css.replace(/\n/g, "\\n"); // 处理换行符 - 将 css 中的换行符替换为 \n 字符 - 因为在 style-loader 中使用的是 innerHTML，因此需要将换行符转换为 \n 字符
        return css;
    }

    module.exports = loader;
    ```
- 在 `/loader/style-loader.js` 中编写 `style-loader`，将 `css` 插入到 `head` 中
    ```js
    function loader(sourceCss) {
        return `
            let style = document.createElement("style");
            style.innerHTML = ${JSON.stringify(sourceCss)};
            document.head.appendChild(style);
        `;
    }

    module.exports = loader;
    ```
### 5. 在 `skpack.config.js` 中配置 `loader`
```js
module: {
    rules: [
        {
            test: /\.less$/,
            use: [
                path.resolve(__dirname, "loader", "style-loader.js"),
                path.resolve(__dirname, "loader", "less-loader.js"),
                // path.resolve(require('./loader/style-loader.js')) // 这是不推荐的写法
                /*  需要注意的是，use 参数的传入完全取决于 loader 是如何调用的：
                    以 webpack 源码为例，use 接收一个字符串数组，因此这里我们自定义的 loader 应该使用绝对路径，且不可以使用函数形式导入
                    例如以上注释部分是不推荐的写法，因为在 skpack 编译器调用 use → loader 时，我们并没有直接调用 loader，
                    而是使用了 require(loader绝对路径) 获取 loader 函数，从而执行 loader
                */
            ],
        }
    ]
}
```
### 6. 重构 `skpack/lib/Compiler.js`
我们已经写好了 `自定义loader`，但是应该如何使用呢？

因此我们需要在读取文件资源的时候：
- 遍历配置项 `module.rules` 判断当前文件是否需要转换；
- 同时将 `use` 数组的 `loader` 方法按照从下往上的顺序依次执行，每次执行的返回值为字符串，作为下一个 `loader` 的参数
- 如果 `use` 存在多个 `loader`，递归执行，直到所有 `loader` 执行完毕，返回最终的结果

```js
// 读取资源
getSource(modulePath) {
    let content = fs.readFileSync(modulePath, "utf8");
    // 获取对应的 loader
    let rules = this.config.module.rules;
    for (let i = 0; i < rules.length; i++) {
        let rule = rules[i];
        let { test, use } = rule;
        let len = use.length - 1;
        if (test.test(modulePath)) { // 匹配到对应的 loader
            function normalLoader() {
                let loader = require(use[len--]);
                content = loader(content);
                if (len >= 0) {
                    normalLoader();
                }
            }
            normalLoader();
        }
    }
    return content;
}
```
### 7. 执行测试
执行 `npx skpack`，在 `dist` 目录下可以看到 `bundle.js` 文件，打开 `index.html` 可以看到样式已经生效



## 实现 plugin

## 实现源码
### `/bin/index.js`
```js
#! /usr/bin/env node
console.log("skpack...");

let path = require("path");
let config = require(path.resolve("skpack.config.js"));
console.log('default config url>>', path.resolve("skpack.config.js"));
// 编译器
let Compiler = require("../lib/Compiler");
// console.log('Compiler>>', Compiler);
console.log('config::', config);
let compiler = new Compiler(config);

// 编译
compiler.run();
```
### `/lib/compiler.js`
```js
let path = require("path");
let fs = require("fs");
let babylon = require("babylon"); // 将源码转换成 AST
let traverse = require("@babel/traverse").default; // 对 AST 进行遍历
let types = require("@babel/types"); // AST 节点类型
let generator = require("@babel/generator").default; // 将 AST 转换成源码
let ejs = require("ejs"); // 模板引擎
// 编译器
class Compiler {
    constructor(options) {
        // webpack配置
        const { entry, output } = options;
        // 入口
        this.entry = entry;
        // 出口
        this.output = output;
        // 模块
        this.modules = [];
        // 当前目录
        this.root = process.cwd(); // 返回 Node.js 进程的当前工作目录
        // 入口文件的路径
        this.entryId;
    }
    // 获取文件内容
    getSource(modulePath) {
        // 读取模块内容
        let content = fs.readFileSync(modulePath, "utf8");
        return content;
    }
    // 解析源码
    parse(source, parentPath) {
        console.log("父级节点>>>", parentPath);
        // 1. 将源码转换成 AST
        let ast = babylon.parse(source);
        // 2. 遍历 AST
        let dependencies = []; // 依赖列表
        traverse(ast , { // traverse - 遍历 AST
            CallExpression(p) { // CallExpression - 遍历所有的函数调用
                let node = p.node; // 对应的节点
                if(node.callee.name === 'require') { 
                    node.callee.name = '__webpack_require__'; // 替换 require 为 __webpack_require__
                    let moduleName = node.arguments[0].value; // 模块的引用名字 
                    moduleName = moduleName + (path.extname(moduleName) ? '' : '.js'); // 模块的引用名字 + 扩展名 
                    moduleName = './' + path.join(parentPath, moduleName); // 模块的引用名字 + 扩展名 + 父级目录
                    dependencies.push(moduleName); // 依赖列表
                    node.arguments = [types.stringLiteral(moduleName)]; // 将更新后的子模块依赖名写回去 types.stringLiteral - 创建一个字符串文字节点
                }
            }
        })
        // 3. 将 AST 转换成源码
        let sourceCode = generator(ast).code;
        console.log('解析后源码>>', sourceCode);
        console.log('依赖列表>>', dependencies);
        return {
            sourceCode,
            dependencies
        }
    }
    // 构建模块 - modulePath: 模块绝对路径 - isEntry: 是否是入口文件
    buildModule(modulePath, isEntry) {
        console.log('----------------------------------------------------');
        console.log("构建模块>>>", modulePath);
        // 1. 读取代码内容
        let source = this.getSource(modulePath);
        // 2. 获取模块相对路径
        let moduleName = "./" + path.relative(this.root, modulePath); // 获取相对路径的目的是为了在后面的递归加载依赖模块时，需要获取依赖模块的绝对路径
        console.log('模块名(相对路径)::', moduleName); // ./src/index.js
        if(isEntry) {
            this.entryId = moduleName; // 保存入口的名字
        }
        // 3. 解析需要把 source 源码进行改造，返回一个依赖列表 - dependencies: 依赖列表通常是相对路径
        let { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName));
        // 4. 把相对路径和模块中的内容对应起来
        this.modules[moduleName] = sourceCode;
        // 5. 递归加载依赖模块
        dependencies.forEach(dep => {
            // 依赖模块的递归加载 - 需要获取依赖模块的绝对路径
            this.buildModule(path.join(this.root, dep), false); 
        });
    }
    // 打包文件
    emitFile() {
        // 1. 获取文件内容
        let main = this.getSource(path.resolve(__dirname, 'bundle.ejs'));
        // 2. 模板渲染
        let code = ejs.render(main, {
            entryId: this.entryId,
            modules: this.modules
        })
        // 3. 输出到哪个目录下
        let mainPath = path.join(this.output.path, this.output.filename);
        console.log('输出模板渲染后内容>>>', code);
        // 4. 写入文件
        // this.assets = {}; // 作用是为了在后面的 emit 钩子中使用
        // this.assets[main] = code; // 作用是为了在后面的 emit 钩子中使用
        // fs.writeFileSync(main, this.assets[main]); // 为什么 this.assets[main] 不直接用 code 代替，因为在后面的 emit 钩子中需要使用 this.assets[main]
        fs.writeFileSync(mainPath, code);
    }
    // 构建启动
    run() {
        // 开始构建 - 从入口开始 - 拿到入口文件的绝对路径
        this.buildModule(path.resolve(this.root, this.entry), true);
        // 打包文件
        this.emitFile();
    }
}

module.exports = Compiler;
```
### `/lib/bundle.ejs`
```ejs
/*
* ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
* This devtool is neither made for production nor for readable output files.
* It uses "eval()" calls to create a separate source file in the browser devtools.
* If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
* or disable the default devtool with "devtool: false".
* If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
*/
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({
        <!-- 模板渲染之模块对象 -->
        <% for(let key in modules) { %>
            "<%- key %>": (
                ((module, __unused_webpack_exports, __webpack_require__) => {
                    eval(`<%- modules[key] %>`);
                })
            ),
        <% } %>
/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("<%= entryId %>"); <!-- 模板渲染之默认入口 -->
/******/ 	
/******/ })()
;
```



