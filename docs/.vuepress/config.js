/*
 * @Author: mengfei
 * @Date: 2022-07-01 20:09:18
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-10-14 09:30:13
 */
const { defaultTheme } = require('vuepress')
const { navbar, sidebar } = require('./static')

module.exports = {
    /* 站点配置 */
    base: "/sakuras-docs/",
    // dest: './dist', //打包输出路径和名称
    lang: 'zh-CN',
    title: '夜语清梦',
    description: '静夜听雨声，飞花入清梦',
    // markdown: {
    //     code: {
    //         // lineNumbers: false, //配置代码块行号, type: boolean/number
    //     },
    // },
    theme: defaultTheme({
        logo: "/imgs/night.jpg",
        lastUpdated: 'Last Updated',
        navbar,
        sidebar,
    }),
}