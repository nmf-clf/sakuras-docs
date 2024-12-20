/*
 * @Author: niumengfei
 * @Date: 2022-10-08 09:46:47
 * @LastEditors: niumengfei
 * @LastEditTime: 2024-05-14 15:30:22
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
            children: [
                {
                    text: "基础",
                    link: "",
                    children: [
                        { text: "Html", link: "/front/html/HTML基础.md" },
                        { text: "Css / Less", link: "/front/css/CSS基础.md" },
                        { text: "JavaScript", link: "/front/javascript/" },
                        { text: "TypeScript", link: "/front/typescript/" },
                    ],
                },
                {
                    text: "框架",
                    link: "",
                    children: [
                        { text: "React", link: "/front/react/react基础.md" },
                        { text: "Vue", link: "/front/vue/_vue核心基础.md" },
                    ],
                },
                { text: "跨平台", link: "", children: [{ text: "小程序", link: "/front/applet" }] },
                {
                    text: "构建工具",
                    link: "",
                    children: [
                        { text: "Webpack", link: "/front/webpack/" },
                        { text: "Vite", link: "/front/vite/" },
                        { text: "Turbopack", link: "/front/turbopack/basic.md" },
                    ],
                },
                { text: "其他", link: "", children: [{ text: "Git", link: "/front/git/" }] },
            ],
        },
        {
            text: "React生态",
            link: "/react/",
            children: [
                { text: "基础", link: "", children: [{ text: "入门", link: "/front/react" }] },
                { text: "框架", link: "", children: [{ text: "Next.js", link: "/react/nextjs" }] },
            ],
        },
        {
            text: "后端",
            link: "/after/",
            children: [
                {
                    text: "基础",
                    link: "",
                    children: [
                        { text: "NodeJs", link: "/after/nodejs/" },
                        { text: "Java", link: "/after/java/" },
                    ],
                },
                { text: "框架", link: "", children: [{ text: "Express", link: "/after/express/" }] },
                { text: "数据库", link: "", children: [{ text: "MongoDB", link: "/after/mongodb/" }] },
                { text: "服务器", link: "", children: [{ text: "Nginx", link: "/after/nginx/basic.md" }] },
            ],
        },
        {
            text: "计算机基础",
            link: "/cs/",
            children: [
                {
                    text: "基础",
                    link: "",
                    children: [
                        { text: "数据结构", link: "/cs/structure/index.md" },
                        { text: "计算机组成原理", link: "/cs/comprise" },
                        { text: "计算机网络", link: "/cs/network" },
                        { text: "操作系统", link: "/cs/os" },
                    ],
                },
            ],
        },
        {
            text: "高频手写",
            link: "/written/01-js.md",
        },
        {
            text: "项目",
            link: "/refactoring/deploy_before.md",
        },
        {
            text: "常见问题",
            link: "/problem/css.md",
        },
        {
            text: "原理",
            link: "/origin/",
            children: [{ text: "webpack原理", link: "/origin/webpack" }],
        },
        {
            text: "工具",
            link: "/tools/",
            children: [{ text: "在线资源", link: "/tools/online" }],
        },
        {
            text: "InterView",
            link: "/interview/front/performance.md",
            // children:[
            //     { text: "前端", link: "/interview/front/"},
            //     { text: "后端", link: "/interview/after/"},
            // ]
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
        "/front/html": require("../front/html/zIndex"),
        "/front/css": require("../front/css/zIndex"),
        "/front/javascript": require("../front/javascript/zIndex"),
        "/front/vue": require("../front/vue/sidebar"),
        "/front/react": require("../front/react/sidebar"),
        "/front/typescript": require("../front/typescript/zIndex"),
        "/front/applet": require("../front/applet/sidebar"),
        "/front/webpack": require("../front/webpack/sidebar"),
        "/front/vite": require("../front/vite/zIndex"),
        "/front/git": require("../front/git/sidebar"),
        /* React生态 */
        // "/react/": require("../react/zIndex"),
        "/react/nextjs": require("../react/nextjs/zIndex"),
        /* 后端 */
        "/after/nodejs": require("../after/nodejs/sidebar"),
        "/after/java/": require("../after/java/zIndex"),
        "/after/express": require("../after/express/sidebar"),
        "/after/mongodb": require("../after/mongodb/zIndex"),
        "/after/nginx": require("../after/nginx/zIndex"),
        /* 计算机基础 */
        "/cs/structure/": require("../cs/structure/zIndex"),
        "/cs/comprise/": require("../cs/comprise/zIndex"),
        "/cs/network/": require("../cs/network/zIndex"),
        "/cs/os/": require("../cs/os/zIndex"),
        /* 高频手写 */
        "/written/": require("../written/sidebar"),
        /* 原理 */
        "/origin/webpack/": require("../origin/webpack/sidebar"),
        /* 项目升级 */
        "/refactoring/": require("../refactoring/zIndex"),
        /* 常见问题 */
        "/problem/": require("../problem/zIndex"),
        /* 面试 */
        "/interview/": require("../interview/sidebar"),
        /* 工具 */
        "/tools/online": require("../tools/online/sidebar"),
        /* VSCode */
        "/vscode/": require("../vscode/zIndex"),
        /* MD入门 */
        "/markdown/": require("../markdown/sidebar"),
    },
};
