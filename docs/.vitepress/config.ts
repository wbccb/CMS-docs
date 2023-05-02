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
                    {
                        text: '第三方库源码解析', items: [
                            {text: 'ruoyi', link: "/vue/0-github/ruoyi"}
                        ]
                    },
                    {text: '简介', link: '/vue/index'},
                    {
                        text: '初始化', items: [
                            {text: '格式化配置', link: "/normal/eslint-prettier"}
                        ]
                    },
                    {text: '登录', link: '/vue/2-login'},
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
            },
            {
                text: '常见小问题',
                items: [
                    {text: 'vite配置别名不生效', link: '/problem/vite-alias'},
                ]
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/wbccb'}
        ]
    }
})
