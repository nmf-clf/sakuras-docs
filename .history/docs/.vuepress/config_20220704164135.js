/*
 * @Author: niumengfei
 * @Date: 2022-07-01 20:09:18
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-07-04 16:41:35
 */
const { defaultTheme } = require('vuepress')

module.exports = {
    /* 站点配置 */
    base: "/sakuras-docs/",
    // dest: './dist', //打包输出路径和名称
    lang: 'zh-CN',
    title: '夜语清梦',
    description: '这是我的第一个VuePress 站点',
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
                    { text: "html", link: "/front/html/" },
                    { text: "css", link: "/front/css/" },
                    { text: "javascript", link: "/front/javascript/" },
                    { text: "react", link: "/front/react/" },
                    { text: "vue", link: "/front/vue/" },
                    { text: "webpack", link: "/front/webpack/" },
                ]
            },
            {
                text: "后端",
                link: "/after/",
                children:[
                    { text: "nodejs", link: "/nodejs/" },
                ]
            },
            {
                text: "计算机基础",
                link: "/after/",
                children:[
                    { text: "nodejs", link: "/nodejs/" },
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
                ]
            },
            // {
            //     text: "课程介绍",
            //     link: "/intro/",
            // },
            // {
            //     text: "基础",
            //     link: "/base/",
            // },
            // {
            //     text: "高级",
            //     link: "/senior/",
            // },
            // {
            //     text: "项目",
            //     link: "/project/",
            // },
        ],
        sidebar: {
            "/front/javascript": [
                {
                  text: "JavaScript",
                  children: ["/front/javascript/README.md"],
                },
              ],
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
    plugins: [
        // [
        //   "@vuepress/plugin-search",
        //   {
        //     locales: {
        //       "/": {
        //         placeholder: "Search",
        //       },
        //       "/zh/": {
        //         placeholder: "搜索",
        //       },
        //     },
        //   },
        // ],
    ],
}