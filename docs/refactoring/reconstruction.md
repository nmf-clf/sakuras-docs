# 项目重构

使用 React18 + Vite4 + TypeScript。

## 实现目标

### 基础建设

1. 使用 Prettier 统一格式化代码，集成 Eslint、Stylelint 代码校验规范（项目规范配置）
2. Mock 数据
3. 浏览器兼容 - postcss
4. 安全管理
5. 自动编译发布 Jenkins（非紧要）
6. 灰度发布（非紧要）
7. 埋点系统和监控报警系统（非紧要）

### 业务功能

1. MPA 模式：车险、续保、个人 三个模块

## 过程

### 1. 创建 vite + react-ts 项目

```shell
npm create vite@latest vite-react-ts -- --template react-ts
```

安装依赖、启动项目

### 2. [Prettier](https://www.prettier.cn/)

prettier 的作用是统一我们的`代码风格`，我们可以通过应用商店安装 prettier 插件来格式化代码，也可以通过配置文件来格式化代码（推荐）。

#### 插件安装使用

-   如果通过编辑器插件安装，则需要在全局 `settings.json` 文件修改配置。如果多人开发项目则需要每个人都修改自己本地的配置，非常不方便。

#### 配置文件使用

-   直接在项目根目录创建 `.prettierrc` 文件，并配置 JSON 代码：

    -   此时如果想要保存时自动格式化代码，需要在全局 `settings.json` 文件配置相应字段，如果全局没有配置，则需要在项目根目录创建 `.vscode/settings.json` 文件，用以覆盖全局配置，同理也可以配置当前项目所需的其他覆盖全局的自定义配置。

-   为什么有的开源项目里是 `.prettierrc.js`、`.prettierc.cjs`，而不是 `.prettierrc`？

    -   由于`.prettiercc`是 JSON 格式文件，JSON 里无法写注释，因此定义一个 `.prettierrc.js` 文件就很有必要，以上三种格式文件都可以被插件识别。

-   自己定义的 `prettiercc.js`、`prettiercc.cjs` 后缀的配置文件不生效？

    1. 名称问题：确保你文件名如上，否则格式化代码时找不到项目配置文件则会将全局配置文件用作回退。
    2. 导出问题： `package.json` 中 `type` 定义为 `module` 的模块化，而你 `.prettierrc` 导出方式为 `module.export = {}` 的 `CommonJs` 导出，则会报错（相反也是），可以根据编辑器输出错误信息修改，例如：去掉 `type: module` 或将 `.prettierrc.js` 改为 `.prettierrc.cjs` 以支持 `CommonJs` 规范。
    3. 缓存问题：如果修改了配置文件，但是格式化时代码并未生效，则需要重启编辑器以重新加载配置。

-   什么时候需要通过 `npm` 安装 `prettier` 包？

    1. 学习通过命令行格式化文件时，例如：`npx prettier --write .`
    2. 自定义 `package.json` 的 `script` 脚本命令时：例如

    ```json
    // package.json
    {
        "scripts": {
            "lint:prettier": "prettier . --write",
            "lint:prettier-check": "prettier . --check"
        }
    }
    ```

-   如果你想要在提交代码之前自动格式化代码，则可以使用 husky 和 lint-staged。

    ```shell
    npm install --save-dev husky lint-staged
    npx husky install
    npm pkg set scripts.prepare="husky install"
    npx husky add .husky/pre-commit "npx lint-staged"
    ```

    -   `husky` 是一个工具，可以让你在提交 Git 之前运行自定义脚本
    -   `lint-staged` 是一个工具，可以运行对暂存区文件的检查，例如代码格式化和代码风格检查。
    -   `npx husky install` 会在项目中设置 husky，并创建一个隐藏的 `.husky` 目录，其中包含一个 `pre-commit` 文件。用于存放 Git 钩子脚本。
    -   `npm pkg set scripts.prepare="husky install"`：在 package.json 中添加 prepare 脚本。
    -   `npx husky add .husky/pre-commit "npx lint-staged"`：在指定文件里添加 `npx lint-staged` 命令。

> **特别注意**：必须要在编辑器扩展商店安装 prettier 插件，才可以通过快捷键或保存时格式化代码，仅仅通过 npm 安装是不行的，npm 安装方式是统一版本，并且可以使用命令行方式去格式化代码，通常配置在 package.json 里面的 scripts 字段中，例如：`"lint:prettier": "prettier . --write",`。

#### 配置 .prettierignore 文件

除了上述通常的配置，我们还可以配置 `.prettierignore` 文件，用于忽略某些文件或文件夹。

```shell
# /xxx/* 忽略xxx目录下所有文件
# xxx 忽略项目根目录下名为 xxx 的文件
# /xxx/** 忽略 xxx 及其子目录下的所有文件
# **/*.xxx 忽略所有 .xxx 结尾的文件

/dist/*
.local
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

### 3. [ESLint](https://zh-hans.eslint.org/)

ESLint 可以帮助我们规范`代码质量`，它是一个 JavaScript 语法和编码检测工具，可以检测到一些常见的 JavaScript 错误，比如未定义变量、未使用变量、变量名不规范、代码格式问题等等。

使用脚手架创建项目时，默认已经集成了 ESLint。

以下是手动创建 ESLint 配置的一些注意点。

1. 根据官网教程安装 ESLint 包，需要注意的是，`eslint.config.js` 或其他配置文件内的导出方式如果为 ES6 导出，则文件名后缀应该为 `.mjs`。
2. 如果使用的是 v9 及以上版本，已经不支持设置 `.eslingignore` 文件忽略文件，而是使用 `.eslintrc.js` 文件的 `ignorePatterns` 属性来设置忽略文件。

#### 配置文件

```js
import js from "@eslint/js";

export default [
    js.configs.recommended,
    /*
	 * "off" 或 0    ==>  关闭规则
	 * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
	 * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
	 */
   {
       rules: {
           "no-unused-vars": "warn",
           "no-undef": "warn",
           "prefer-const": "off", // 此规则旨在标记使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
        //    "semi": ["error", "always"]
       },
        // ignore: ["dist", "config/*"],
        // ignores: ["dist/*"],
   },
];
```

#### 命令行
