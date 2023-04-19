import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "CMS Docs",
    description: "内容管理系统开发文档",
    base: "/cms-docs/",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: '主页', link: '/'},
            {text: '文档', link: '/vue/index'}
        ],

        sidebar: [
            {
                text: 'CMS-Vue',
                items: [
                    {text: '简介', link: '/vue/index'},
                ]
            },
            {
                text: 'CMS-React',
                items: [
                    {text: '简介', link: '/react/index'},
                ]
            },
            {
                text: 'CMS-Koa',
                items: [
                    {text: '简介', link: '/koa/index'},
                ]
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/wbccb'}
        ]
    }
})
