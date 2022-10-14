/*
 * @Author: niumengfei
 * @Date: 2022-10-08 09:46:47
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-10-14 16:17:47
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
                        { text: "html", link: "/front/html/" },
                        { text: "css", link: "/front/css/" },
                        { text: "javascript", link: "/front/javascript/" },
                        { text: "typescript", link: "/front/typescript/" },
                ]},
                { text: "框架", link: "", children: [
                        { text: "react", link: "/front/react/" },
                        { text: "vue", link: "/front/vue/" },
                ]},
                { text: "跨平台", link: "", children: [
                    { text: "小程序", link: "/front/applet" },
                ]},
                { text: "构建工具", link: "", children:[
                        { text: "webpack", link: "/front/webpack/" },
                        { text: "vite", link: "/front/vite/" },
                ]},
                { text: "其他", link: "", children:[
                    { text: "git", link: "/front/git/" },
                ]},
            ]
        },
        {
            text: "后端",
            link: "/after/",
            children:[
                { text: "基础", link: "", children:[
                    { text: "nodejs", link: "/after/nodejs/" },
                    // { text: "Java", link: "/after/java/" },
                ]},
                { text: "框架", link: "", children: [
                    { text: "express", link: "/after/express/" },
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
            link: "/refactoring/",
        },
        {
            text: "原理",
            link: "/origin/",
            children:[
                { text: "webpack原理", link: "/origin/webpack" },
            ]
        },
        {
            text: "面试总结",
            link: "/interview/",
        },
        {
            text: "工具",
            link: "/tools/",
            children:[
                { text: "在线资源", link: "/tools/online" },
            ]
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
        "/front/typescript": require('../front/typescript/sidebar'),
        "/front/applet": require('../front/applet/sidebar'),
        "/front/webpack": require('../front/webpack/sidebar'),
        "/front/git": require('../front/git/sidebar'),
        /* 后端 */
        "/after/nodejs": require('../after/nodejs/sidebar'),
        "/after/express": require('../after/express/sidebar'),
        /* 高频手写 */
        "/written/": require('../written/sidebar'),
        /* 原理 */
        "/origin/webpack/": require('../origin/webpack/sidebar'),
        /* 项目升级 */
        "/refactoring/": require('../refactoring/sidebar'),
        /* 面试总结 */
        "/interview/": require('../interview/sidebar'),
        // /* 工具 */
        "/tools/online": require('../tools/online/sidebar'),
        /* MD入门 */
        "/markdown/": require('../markdown/sidebar'),
    },
}