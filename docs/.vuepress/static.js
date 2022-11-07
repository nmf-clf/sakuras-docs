/*
 * @Author: niumengfei
 * @Date: 2022-10-08 09:46:47
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-11-07 17:14:37
 */
module.exports = {
    navbar: [
        {
            text: "主页",
            link: "/",
        },
        {
            text: "前端",
            link: "/front/",
            children:[
                { text: "基础", link: "", children:[
                        { text: "Html", link: "/front/html/" },
                        { text: "Css", link: "/front/css/" },
                        { text: "JavaScript", link: "/front/javascript/" },
                        { text: "TypeScript", link: "/front/typescript/" },
                ]},
                { text: "框架", link: "", children: [
                        { text: "React", link: "/front/react/" },
                        { text: "Vue", link: "/front/vue/" },
                ]},
                { text: "跨平台", link: "", children: [
                    { text: "小程序", link: "/front/applet" },
                ]},
                { text: "构建工具", link: "", children:[
                        { text: "Webpack", link: "/front/webpack/" },
                        { text: "Vite", link: "/front/vite/" },
                        { text: "Turbopack", link: "/front/turbopack/basic.md" },
                ]},
                { text: "其他", link: "", children:[
                    { text: "Git", link: "/front/git/" },
                ]},
            ]
        },
        {
            text: "后端",
            link: "/after/",
            children:[
                { text: "基础", link: "", children:[
                    { text: "NodeJs", link: "/after/nodejs/" },
                    // { text: "Java", link: "/after/java/" },
                ]},
                { text: "框架", link: "", children: [
                    { text: "Express", link: "/after/express/" },
                ]},
                { text: "数据库", link: "", children: [
                    { text: "MongoDB", link: "/after/mongodb/" },
                ]},
                { text: "服务器", link: "", children: [
                    { text: "Nginx", link: "/after/nginx/basic.md" },
                ]},
            ]
        },
        {
            text: "计算机基础",
            link: "/cs-basic/",
            children:[
                { text: "基础", link: "", children:[
                    { text: "数据结构", link: "/cs-basic/structure" },
                    { text: "计算机组成原理", link: "/cs-basic/comprise" },
                    { text: "计算机网络", link: "/cs-basic/network" },
                    { text: "操作系统", link: "/cs-basic/os" },
                ]},
            ]
        },
        {
            text: "高频手写",
            link: "/written/",
        },
        {
            text: "项目",
            link: "/refactoring/deploy_before.md",
        },
        {
            text: "原理",
            link: "/origin/",
            children:[
                { text: "webpack原理", link: "/origin/webpack" },
            ]
        },
        {
            text: "面试",
            link: "/interview/",
            children:[
                { text: "前端", link: "/interview/front/"},
                { text: "后端", link: "/interview/after/"},
            ]
        },
        {
            text: "工具",
            link: "/tools/",
            children:[
                { text: "在线资源", link: "/tools/online" },
            ]
        },
        {
            text: "VSCode",
            link: "/vscode/vs_basic.md",
        },
        {
            text: "MD",
            link: "/markdown/",
        },
    ],
    sidebar: {
        /* 前端 */
        "/front/javascript": require('../front/javascript/sidebar'),
        "/front/vue": require('../front/vue/sidebar'),
        "/front/react": require('../front/react/sidebar'),
        "/front/typescript": require('../front/typescript/zIndex'),
        "/front/applet": require('../front/applet/sidebar'),
        "/front/webpack": require('../front/webpack/sidebar'),
        "/front/git": require('../front/git/sidebar'),
        /* 后端 */
        "/after/nodejs": require('../after/nodejs/sidebar'),
        "/after/express": require('../after/express/sidebar'),
        "/after/mongodb": require('../after/mongodb/sidebar'),
        "/after/nginx": require('../after/nginx/zIndex'),
        /* 高频手写 */
        "/written/": require('../written/sidebar'),
        /* 原理 */
        "/origin/webpack/": require('../origin/webpack/sidebar'),
        /* 项目升级 */
        "/refactoring/": require('../refactoring/zIndex'),
        /* 面试 */
        "/interview/front": require('../interview/front/sidebar'),
        "/interview/after": require('../interview/after/sidebar'),
        // /* 工具 */
        "/tools/online": require('../tools/online/sidebar'),
        /* VSCode */
        "/vscode/": require('../vscode/zIndex'),
        /* MD入门 */
        "/markdown/": require('../markdown/sidebar'),
    },
}