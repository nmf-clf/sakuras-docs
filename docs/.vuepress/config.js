/*
 * @Author: niumengfei
 * @Date: 2022-07-01 20:09:18
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-07-28 18:06:27
 */
const { defaultTheme } = require('vuepress')

module.exports = {
    /* 站点配置 */
    base: "/sakuras-docs/",
    // dest: './dist', //打包输出路径和名称
    lang: 'zh-CN',
    title: '夜语清梦',
    description: '静夜听雨声，飞花入清梦',
    theme: defaultTheme({
        // logo: "/imgs/favicon.ico",
        lastUpdated: false,
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
                text: "功能",
                link: "/function/",
            },
            {
                text: "原理",
                link: "/origin/",
                children:[
                    { text: "webpack原理", link: "/origin/webpack" },
                ]
            },
            {
                text: "工具",
                link: "/tools/",
                children:[
                    { text: "RGB转换", link: "https://www.sioe.cn/yingyong/yanse-rgb-16/" },
                    { text: "DNS查询", link: "https://tools.ipip.net/dns.php" },
                    { text: "vsCode", link: "" },
                ]
            },
        ],
        sidebar: {
            /* 前端 */
            "/front/javascript": [
                {
                  text: "JavaScript",
                  children: ["/front/javascript/README.md"],
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
                    "/front/react/React脚手架配置代理", "/front/react/React-Router6.md", "/front/react/思考.md", ],
                },
            ],

            /*  */
            "/intro/": [
                {
                text: "课程介绍",
                children: ["/intro/README.md", "/intro/pre.md", "/intro/group.md", "/intro/learn.md", "/intro/asset.md"],
                },
            ],
            "/base/": [
                {
                text: "基础配置1",
                children: [
                    "/base/README.md",
                    "/base/base.md",
                    "/base/config.md",
                    "/base/development.md",
                    "/base/css.md",
                    "/base/image.md",
                    "/base/output.md",
                    "/base/clean.md",
                    "/base/font.md",
                    "/base/other.md",
                    "/base/javascript.md",
                    "/base/html.md",
                    "/base/server.md",
                    "/base/production.md",
                    "/base/optimizeCss.md",
                    "/base/minifyHtml.md",
                    "/base/summary.md",
                ],
                },
            ],
            "/senior/": [
                {
                text: "高级优化",
                children: ["/senior/README.md", "/senior/enhanceExperience.md", "/senior/liftingSpeed.md", "/senior/reduceVolume.md", "/senior/optimizePerformance.md", "/senior/summary.md"],
                },
            ],
            "/project/": [
                {
                text: "项目配置",
                children: ["/project/README.md", "/project/react-cli.md", "/project/vue-cli.md", "/project/summary.md"],
                },
            ],
            /* 原理 */
            "/origin/": [
                {
                text: "原理分析",
                children: ["/origin/README.md"]
                },
            ],
            "/origin/webpack/": [
                {
                text: "webpack原理分析",
                children: ["/origin/webpack/README.md", "/origin/webpack/loader.md", "/origin/webpack/plugin.md", "/origin/webpack/summary.md"],
                },
            ],
        },
    }),
}