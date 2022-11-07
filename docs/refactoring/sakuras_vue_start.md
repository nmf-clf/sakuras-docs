# Sakuras.group网站搭建
该笔记记录下个人网站 [sakuras.group](sakuras.group) 搭建过程：
- 前端项目使用`vue3 + element-plus + less`，基于`vue-cli`开发
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

## 基础更换
> 2022/11/7：使用 `Vue3 + TypeScript +  Element-Plus + Vite`构建
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



## 遇到的问题
+ 1、配置router时，发现vue3跟vue2的使用方法不一样，见官网描述，比如引入，创建，通过路由跳转, vue2配置router(3)vuex(3) vue3配置router(4)vuex(4)
+ 2、配置按需加载ant-plus组件库时，采用的是官方的方式，在vue.config.js里配置configureWebpack.plugins: []
+ 3、配置图标组件库时发现，图标组件库官方尚未完成按需加载和CDN引入，因此需要在全局注册：
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
+ 4、在使用组件库的搜索组件时发现，自定义的样式即便加了!important也无法生效(`尚未知道原因`)，解决方案如下：
    - 1. `>>>方式暂不支持(未知)`
    - 2. ::v-deep 样式选择器名{}，(深度穿透)，编译警告如下：
        ```js
        //[@vue/compiler-sfc] ::v-deep usage as a combinator has been deprecated. Use :deep(<inner-selector>) instead.
        //则需要使用 :deep()方式
        ```
    - 3. :deep(样式选择器名){}
