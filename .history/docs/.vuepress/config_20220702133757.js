/*
 * @Author: niumengfei
 * @Date: 2022-07-01 20:09:18
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-07-02 13:37:02
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
                text: "课程介绍",
                link: "/intro/",
            },,
            {
                text: "课程介绍",
                link: "/intro/",
            },
            {
                text: "基础",
                link: "/base/",
            },
            {
                text: "高级",
                link: "/senior/",
            },
            {
                text: "项目",
                link: "/project/",
            },
            {
                text: "原理",
                link: "/origin/",
            },
        ],
        sidebar: {
            "/intro/": [
                {
                  text: "前端",
                  children: ["/intro/README.md", "/intro/pre.md", "/intro/group.md", "/intro/learn.md", "/intro/asset.md"],
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
              children: ["/origin/README.md", "/origin/loader.md", "/origin/plugin.md", "/origin/summary.md"],
            },
          ],
        },
      }),
}