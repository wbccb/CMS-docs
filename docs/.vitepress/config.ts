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
                    {text: '登录', link: '/vue/2-feature/login'},
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
                    {text: '初始化', link: '/koa/1-init/init'},
                    {text: '概要设计',
                        items: [
                            {text: 'HTTP授权种类', link: '/koa/2-base/HTTP授权种类'},
                            {text: 'jwt', link: '/koa/2-base/jwt'},
                            {text: '数据库相关知识', link: '/koa/2-base/数据库相关知识'},
                            {text: '错误处理与数据返回', link: '/koa/2-base/错误处理与数据返回'},
                        ]
                    },
                    {text: '详细设计',
                        items: [
                            {text: '注册', link: '/koa/3-feature/0-注册'},
                            {text: '登录', link: '/koa/3-feature/1-登录'},
                            {text: 'token', link: '/koa/3-feature/2-token'},
                            {text: '权限控制', link: '/koa/3-feature/3-权限控制'},
                        ]
                    },
                ]
            },
            {
                text: '常见小问题',
                items: [
                    {text: 'vite配置别名不生效', link: '/problem/vite-alias'},
                    {text: '比较特殊的路由匹配规则', link: '/problem/vue-router-rules'},
                ]
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/wbccb'}
        ]
    }
})
