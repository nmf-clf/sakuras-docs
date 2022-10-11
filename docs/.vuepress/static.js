/*
 * @Author: niumengfei
 * @Date: 2022-10-08 09:46:47
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-10-08 11:14:36
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
                { text: "构建工具", link: "", children:[
                        { text: "webpack", link: "/front/webpack/" },
                        { text: "vite", link: "/front/vite/" },
                ]},
            ]
        },
        {
            text: "后端",
            link: "/after/",
            children:[
                { text: "基础", link: "", children:[
                    { text: "Nodejs", link: "/after/nodejs/" },
                    { text: "Java", link: "/after/java/" },
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
        /* {
            text: "功能",
            link: "/function/",
        }, */
        {
            text: "项目升级",
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
        "/front/javascript": [
            {
              text: "JavaScript",
              children: ["/front/javascript/README.md", "/front/javascript/01-基础.md", "/front/javascript/02-高级.md", "/front/javascript/03-ES6.md"],
            },
        ],
        "/front/vue": [
            {
              text: "Vue",
              children: ["/front/vue/README.md", "/front/vue/vue-basic.md", "/front/vue/vue3.md", "/front/vue/vue-cli.md"],
            },
        ],
        "/front/react": [
            {
              text: "React",
              children: ["/front/react/README.md", "/front/react/React基础.md", "/front/react/React扩展.md",
                "/front/react/React脚手架配置代理", "/front/react/React-Router6.md", "/front/react/思考.md", 
                "/front/react/面向面试.md"
              ],
            },
        ],
        "/front/typescript": [
            {
              text: "typescript",
              children: ["/front/typescript/README.md", "/front/typescript/01-快速入门.md", "/front/typescript/02-面向对象.md"],
            },
        ],
        /* 高频手写 */
        "/written/": [
            {
              text: "高频手写",
              children: ["/written/README.md", "/written/01-js.md"],
            },
        ],
        /* 原理 */
        "/origin/webpack/": [
            {
                text: "webpack原理分析",
                children: ["/origin/webpack/README.md", "/origin/webpack/loader.md", "/origin/webpack/plugin.md", "/origin/webpack/summary.md"],
            },
        ],
        /* 项目升级 */
        "/refactoring/": [
            {   
                text: "项目升级/重构",
                children: ["/refactoring/README.md"],
            }
        ],
        /* 面试总结 */
        "/interview/": [
            {
              text: "面试总结",
              children: ["/interview/README.md", "/interview/performance.md"],
            },
        ],
        /* 工具 */
        "/tools/online": [
            {
              text: "在线资源",
              children: ["/tools/online/README.md"],
            },
        ],
        /* MD入门 */
        "/markdown/": [
            {   
                text: "Markdown基本语法",
                children: ["/markdown/README.md", "/markdown/其他.md"],
            }
        ],
    },
}