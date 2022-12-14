# 个人网站搭建
该笔记记录下个人网站 [sakuras.group](sakuras.group) 搭建过程：
- 前端项目使用`vue3 + element-plus + less + webpack`，基于`vue-cli`开发
- 后端项目使用`nodejs + mongodb`

## 开始
+ 1、vue-create appName 脚手架创建工程、删除无用文件
+ 2、创建及配置部分文件夹：
    - 创建src/router文件夹，同时配置路由及路由规则，
    - 创建src/pages文件夹，用于存放前端路由页面
    - 创建src/components，用于存放前端公共组件
+ 3、安装less-loader：支持less编译
+ 4、安装html-loader markdown-loader，highlightjs-line-numbers.js和github-markdown-css：支持md文件转化为html文件以及定义样式`暂时弃用`
+ 5、安装element-plus：支持使用vue-plus组件库
+ 6、安装unplugin-auto-import、unplugin-vue-components：支持组件库按需加载
+ 7、安装@element-plus/icons-vue：支持使用官方图标组件库
+ 8、配置@符访问路径，但是无法鼠标左键跳转
+ 9、考虑到未来某个模块可能有多个路由页面，以及某个公共组件可能由多个子组件组成：
    - 因此将pages和components目录下的.vue文件放在以模块/组件命名的文件夹内，即`pages/Home.vue → pages/Home/Home.vue`
+ 安装并配置vuex：因为要做响应式布局，需要存储和监听页面的变化以及基准比例，采用getters监听store里state数据变化
+ 10、通过查找组件内引入组件BUG的原因，清楚了组件应该如何引用，即全局方法或者局部引入方法(2022/04/24)
+ 11、引入动画库animate.css，用于封装侧边栏等具有动画的常用组件(2022/04/26)

## 变更
> 2022/11/7：使用  `Vue3 + TypeScript +  Element-Plus` 重构
### [安装](https://cli.vuejs.org/zh/guide/installation.html)
> npm install -g @vue/cli   //全局安装脚手架  \
> vue -v    //检查是否安装成功 \
> vue-create sakuras-vue    //创建自己的项目

如果需要支持ts + vite等需要选择第三个更多的选项以支持更多的特性：
- Babel 支持babel(选上)
- TypeScript 安装ts（选上）
- Progressive Web App (PWA) Support（一般不选）
- Router 路由模块（选上）
- Vuex 状态管理（需要用到就选上）
- CSS Pre-processors css预处理器（选上）
- Linter / Formatter 代码校验（选上）
- Unit Testing 单元测试（一般不需要）
- E2E Testing 端到端测试（一般不用）
- [查看更多](https://blog.csdn.net/qq_41131745/article/details/123852620)


## 过程
### 首页模块
- 响应式布局：首页利用 `媒体查询media` + `rem` + `vuex存储根节点font-size` 的方式实现响应式布局。

### 登录/注册模块
创建 `utils` 文件目录
- 封装axios / Fetch
- 封装TnLog
- 封装表单验证Validator
- 封装存储操作(未完成)
- 处理跨域
- 基于 vuex + localStorage 实现用户本地登录状态持久化
- 密码加密(未完成)

### 后台-基础模块
创建 `vdmin`文件目录，用于存放后台管理系统的相关页面 \
创建 `styles` 文件目录，用于配置/覆盖全局样式 
- 使用less 变量配置后台管理系统的主题色
- 构建页面结构，采用品字布局
- 侧边栏展开折叠功能
- Tabs路由导航功能

### 后台-文章模块
- 封装公共组件：搜索栏、表格
- 增删改查
- 富文本编辑器

### 打包构建
- 配置路径别名
- 配置 Element-Plus 按需加载
- 配置跨域
- 配置全局变量：webpack.DefinePlugin()

## 问题
### 1. Router配置问题
配置router时，vue3与vue2的使用方法不一样。
- 见官网描述，比如引入，创建，通过路由跳转, vue2配置router(3)vuex(3) vue3配置router(4)vuex(4) 
```js
import router from '@/router/index.js';
//等同于
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
// useRoute 和 useRouter 的区别在于：
// useRoute访问当前路由：每一个路由都会有一个 route 对象，是一个局部的对象，可以获取对应的 name, path, params, query 等属性。
// useRouter访问的路由器：是一个全局的路由器对象，包含了很多属性和对象（比如 history 对象），任何页面都可以调用其 push(), replace(), go() 等方法。
```

### 2. 配置element-plus按需加载
配置按需加载element-plus组件库时，采用的是官方的方式。
-   在vue.config.js里配置configureWebpack.plugins: []

### 3. 图标组件库使用问题 
配置图标组件库时发现，图标组件库官方尚未完成按需加载和CDN引入，因此需要在全局注册：
- 某些图标组件可以1全局注册来使用，也可以采用2组件内去引入: 例如ArrowDown: 
```js
    //第一种方案 main.js
    import { ArrowDown } from '@element-plus/icons-vue';
    app.component(ArrowDown.name, ArrowDown)
    //如果不全局注册，则报错如下：
    //Failed to resolve component: arrow-down. If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.
    //第二种方案 FrontHome.vue
    import { Search, Expand } from '@element-plus/icons-vue'
    export default {
        components: { MySideBar, Expand },
    }
```
- 而通过表达式引入的图标组件则需要在文件里引入组件，并在setup里导出，例如一下这种用法：
```js
    //FrontHome.vue
    /* html */
    <el-input :prefix-icon="Search" />
    /* script */
    import { Search } from '@element-plus/icons-vue'
    setup(){
        return{ Serach }
        //如果不在setup里导出，则报错如下：
        //[Vue warn]: Property "Search" was accessed during render but is not defined on instance. 
    }
```
### 4. 组件库样式覆盖问题
在使用组件库的搜索组件时发现，自定义的样式即便加了!important也无法生效(`尚未知道原因`)，解决方案如下：
- 1. `>>>方式暂不支持(未知)`
- 2. ::v-deep 样式选择器名{}，(深度穿透)，编译警告如下：
    ```js
    //[@vue/compiler-sfc] ::v-deep usage as a combinator has been deprecated. Use :deep(<inner-selector>) instead.
    //则需要使用 :deep()方式
    ```
- 3. :deep(样式选择器名){}

### 5. TS下vue文件默认导出问题
由于TS不理解.vue文件类型，因此这个文件告诉TS .vue文件是何类型
```ts
/* shim-vue.d.ts */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```
> `Module LoginForm.vue has no default export` \
> 如果在vue文件中导入另一个vue文件出现此错误，可能是 vscode 的 Vetur 插件问题，Vetur插件与Volar插件应该仅使用其一

### 6. webpack.DefinePlugin注册全局变量问题
在ts下必须通过此方式 声明一个命名空间给全局变量，才可以使webpack.DefinePlugin生效
```ts
/* shim-vue.d.ts */
declare namespace ProcessEnv { 
  const env: string;
  const runDependencies: {
    dev: string,
    pro: string,
  };
}
/* vue.config.js */
const pk = require('./package.json');
plugins: [ 
    new webpack.DefinePlugin({ ProcessEnv: JSON.stringify({ ...process.env, ...pk }) }) // ProcessEnv 要与命名空间 名称一样
],
/* 使用：在任意文件下直接使用 ProcessEnv 变量即可 */
/* axios.js */
const { runDependencies } = ProcessEnv;
```

### 7. vue3中vuex使用问题
与vue2不同，vue3中使用store里的数据，需要通过 `vuex` 的 `useStore()` 方法 \
且vue3中使用store里的state数据，如果涉及到当前页面DOM更新的值，则需要通过函数形式使用
```ts
import { useStore } from "vuex";
const store = useStore();
const isCollapse = store.state.admin.isCollapse; //普通情况
const isCollapse = () => store.state.admin.isCollapse; //当前DOM变化如需依赖此状态，使用 isCollapse()
```

### 8. 组件库表单验证问题
封装rules会造成 当前组件的状态虽然传入到了函数内部 但是验证规则里的函数方法内部无法获取最新的数据值
```ts
const ruleForm = reactive<LoginParamsType>({
    password: '',
    passwordAgain: '',
})

const rules: FormRules = reactive({ //表单校验规则
    passwordAgain: Validator.sameWithAnother({ msg: '请输入密码', compareVal: ruleForm.password }),
})

export default {
    sameWithAnother: (params: ParamsType = {}) => { //两次输入是否一致
        let { msg, trigger, compareVal } = params;
        return [{ 
            validator: (rule: any, value: any, callback: any) => {
                console.log(1234, value, compareVal); // 此处 compareVal 是无变化的
                value === '' ? callback(new Error(msg))
                : value !== compareVal ? callback(new Error("两次输入不匹配!"))
                : callback()
            }, 
            trigger
        }]
    },
}

```

