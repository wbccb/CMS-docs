---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "CMS-docs"
  text: "内容管理系统开发文档"
  tagline: a simple cms docs
  actions:
    - theme: brand
      text: Vue系统相关文档
      link: /vue/index
    - theme: alt
      text: React系统相关文档
      link: /react/index
    - theme: alt
      text: Koa系统相关文档
      link: /koa/index

features:
  - title: 可复用
    details: 所有的功能都应该基于一个文件夹，比如css、js、vue文件都应该放在一个文件夹，如果有其它项目想要移植该功能，能够直接复制文件夹即可复用该功能
  - title: 易扩展
    details: 80%的代码应该是基础代码；20%比较复杂定制化的业务代码应该抽离到另外的文件夹进行存放；如果想要扩展，可以轻易使用基础代码进行扩展
  - title: 组件化，框架无关
    details: 每一个可复用的功能都应该简单明了，有注释说明，如果想要使用其它框架，可以直接复用该功能的css+js文件

  

---

