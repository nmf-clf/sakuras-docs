/*
 * @Author: niumengfei
 * @Date: 2022-07-01 20:09:18
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-07-02 12:57:34
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
        // 默认主题配置
        navbar: [
            {
                text: '首页',
                link: '/',
            },
        ],
    }),
}