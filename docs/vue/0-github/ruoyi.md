# RuoYi-Vue3源码解析
## [官方文档总结](http://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html)

> 基于Vue2模式下的官方文档，可能跟Vue3实际代码有一些出入

### 内置功能
> 包含前端和后台
1. 用户管理：用户是系统操作者，该功能主要完成系统用户配置。 
2. 部门管理：配置系统组织机构（公司、部门、小组），树结构展现支持数据权限。 
3. 岗位管理：配置系统用户所属担任职务。 
4. 菜单管理：配置系统菜单，操作权限，按钮权限标识等。 
5. 角色管理：角色菜单权限分配、设置角色按机构进行数据范围权限划分。 
6. 字典管理：对系统中经常使用的一些较为固定的数据进行维护。 
7. 参数管理：对系统动态配置常用参数。 
8. 通知公告：系统通知公告信息发布维护。 
9. 操作日志：系统正常操作日志记录和查询；系统异常信息日志记录和查询。 
10. 登录日志：系统登录日志记录查询包含登录异常。 
11. 在线用户：当前系统中活跃用户状态监控。 
12. 定时任务：在线（添加、修改、删除)任务调度包含执行结果日志。 
13. 代码生成：前后端代码的生成（java、html、xml、sql）支持CRUD下载 。 
14. 系统接口：根据业务代码自动生成相关的api接口文档。 
15. 服务监控：监视当前系统CPU、内存、磁盘、堆栈等相关信息。 
16. 缓存监控：对系统的缓存信息查询，命令统计等。 
17. 在线构建器：拖动表单元素生成相应的HTML代码。
18. 连接池监视：监视当前系统数据库连接池状态，可进行分析SQL找出系统性能瓶颈。
### 在线体验
演示地址：http://vue.ruoyi.vip
<br/>
账号：admin
<br/>
密码：admin123

文档地址：http://doc.ruoyi.vip
### 前端功能概述
<br/>

#### 权限管理
- 用户管理
- 角色管理
- 菜单管理
- 部门管理
- 岗位管理
#### 参数管理
- 字典管理
- 参数设置
#### 通知公告
- 通知公告
#### 系统监控
- 日志管理
  - 操作日志
  - 登录日志
- 在线用户：统计目前登录用户的ip、登录地点、浏览器、操作系统、登录时间等等
- 定时任务：定期执行程序任务
- 数据监控：
- 服务监控：监控后台服务器一些实时参数
- 缓存监控：后台缓存数据监控
- 缓存列表：后台缓存数据列表
#### 系统工具
- 表单构建：`Form Generator`第三方库低代码表单生成
- 代码生成：`table`数据增删改查，并且能够生成对应的后端和前端代码
- 系统接口

### 代码架构概述
<br/>

#### 自定义命令

- $tab对象：页签操作、刷新页签、关闭页签、打开页签、修改页签
- $modal对象：消息提示、通知提示、对话框提醒、二次确认、遮罩
- $auth对象：用于验证用户是否拥有某（些）权限或角色
- $cache对象：用于处理缓存，为了避免直接使用sessionStorage或localStorage，因为项目的缓存策略可能发生变化，通过$cache对象做一层调用代理则是一个不错的选择
- $download对象：用于文件下载

#### 开发规范

- @/views：一个路由对应一个文件，该模块下的功能在本文件夹下创建一个新文件夹，各个功能模块维护自己的utils或components组件
- @/apis：对应的网络请求api服务，文件名称对应`@/view`
- @/components：全局的组件，比如各种搜索组件，封装的分页组件等等，每个页面或者模块特定的业务组件则会写在当前`@/view`下面
- @/style：全局的样式，每一个页面的样式就写在当前`@/view`下面


#### 前后端交互流程

所有请求都放在`@/apis`文件夹中
<br>
流程为：
- UI 组件交互操作；
- 调用统一管理的 api service 请求函数；
- 使用封装的 request.js 发送请求；
- 获取服务端返回；
- 更新 data；

#### 动态路由

动态路由可以在系统管理-菜单管理进行新增和修改操作，前端加载会自动请求接口获取菜单信息并转换成前端对应的路由

动态路由代表那些需要根据用户动态判断权限并通过addRoutes动态添加的页面，在`@/store/modules/permission.js`加载后端接口路由配置


#### 自定义指令：权限封装

使用权限字符串 v-hasPermi

```javascript
// 单个
<el-button v-hasPermi="['system:user:add']">存在权限字符串才能看到</el-button>
// 多个
<el-button v-hasPermi="['system:user:add', 'system:user:edit']">包含权限字符串才能看到</el-button>
```

使用角色字符串 v-hasRole
```javascript
// 单个
<el-button v-hasRole="['admin']">管理员才能看到</el-button>
// 多个
<el-button v-hasRole="['role1', 'role2']">包含角色才能看到</el-button>
```

::: warning 前端有了鉴权后端还需要鉴权吗?

前端的鉴权只是一个辅助功能，对于专业人员这些限制都是可以轻松绕过的，为保证服务器安全，无论前端是否进行了权限校验，后端接口都需要对会话请求再次进行权限校验！
:::

#### 图标

`svg`图标全局注册，放在`@/icons/index.js`

使用方式：
```vue
<!-- icon-class 为 icon 的名字; class-name 为 icon 自定义 class-->
<svg-icon icon-class="password"  class-name='custom-class' />
```

#### 字典

字典管理是用来维护数据类型的数据，如下拉框、单选按钮、复选框、树选择的数据，方便系统管理员维护。

主要功能包括：字典分类管理、字典数据管理

```javascript
import DictData from '@/components/DictData'
DictData.install();
```

```javascript
<el-option
  v-for="dict in dict.type.字典类型"
  :key="dict.value"
  :label="dict.label"
  :value="dict.value"
/>

export default {
  dicts: ['字典类型'],
  ...
}
```

多语言翻译
```vue
// 字典标签组件翻译
<el-table-column label="名称" align="center" prop="name">
  <template slot-scope="scope">
    <dict-tag :options="dict.type.字典类型" :value="scope.row.name"/>
  </template>
</el-table-column>

// 自定义方法翻译
{{ xxxxFormat(form) }}

xxxxFormat(row, column) {
  return this.selectDictLabel(this.dict.type.字典类型, row.name);
},
```

#### 全局组件介绍

放在`src/components`文件夹中，有一些是使用第三方组件，有一些是`ruoyi`作者自己封装的普通全局组件

#### 插件集成
> 借助第三方库实现一些前端通用功能
- `aj-captcha`：滑块验证码
- `watermark`：在网站浏览中，常常需要网页水印，以便防止用户截图或录屏暴露敏感信息后，方便追踪用户来源
- `easyexcel`：阿里巴巴开源的一个excel处理框架，excel的增强解决方案，使用简单、功能特性多、以节省内存著称
- `browscap`：在网站浏览中，常常需要网页水印，以便防止用户截图或录屏暴露敏感信息后，方便追踪用户来源


## 入口main.js

除了常规的`router.js`、`store.js`、`element-plus`组件库的注册外，还进行了自定义指令的注册和权限js的调用


### router
1. 如果路由地址为空，则重定向到`/index`路由
2. 如果跳转到个人中心`/user`，则设置为不重定向

:::info  constantRoutes
不需要权限就加载的两个基础页面：首页和个人中心
:::

```javascript
export const constantRoutes = [
  {
    path: '',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/index'),
        name: 'Index',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/system/user/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  }
]
```

在`main.js`中会加载`permission.js`文件，会进行`beforeEach`全局守卫的劫持，我们在[Vue3相关源码-Vue Router源码解析(二)](https://segmentfault.com/a/1190000043639539)中知道：

> 参考官方文档的资料，我们可以推断出`/child1`->`/child2`导航守卫的调用顺序为

- 【组件守卫】在失活的组件里调用 `beforeRouteLeave` 守卫
- 【全局守卫】`beforeEach`
- 【路由守卫】`beforeEnter`
- 解析异步路由组件
- 【组件守卫】在被激活的组件里调用 `beforeRouteEnter`(无法访问this，实例未创建)
- 【全局守卫】`beforeResolve`
- 导航被确认
- 【全局守卫】`afterEach`
- 【vue生命周期】`beforeCreate`、`created`、`beforeMount`
- 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入
- 【vue生命周期】`mounted`

----

> 参考官方文档的资料，我们可以推断出路由`/user/:id`从`/user/a`->`/user/b`导航守卫的调用顺序为

- 【全局守卫】`beforeEach`
- 【组件守卫】在重用的组件里调用 `beforeRouteUpdate` 守卫(2.2+)
- 【全局守卫】`beforeResolve`
- 【全局守卫】`afterEach`
- 【vue生命周期】`beforeUpdate`、`updated`

----

在`permission.js`中，我们会进行`token`的获取，如果没有`token`则重定向到`login路由`

如果有`token`，我们会进行向后端请求路由数据（该账号拥有的路由权限），然后将数据放置到`store`中，最后再进行动态路由的添加

```javascript
 usePermissionStore().generateRoutes().then(accessRoutes => {
  // 根据roles权限生成可访问的路由表
  accessRoutes.forEach(route => {
    if (!isHttp(route.path)) {
      router.addRoute(route) // 动态添加可访问路由表
    }
  })
  next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
})
```

### store

- `app.js`: 当前设备，比如是移动端/桌面应用等状态的缓存
- `dict.js`: 管理从网络请求获取的字典数据
- `permission.js`: 根据账号权限获取的路由数据
- `settings.js`: 一些主题的设置数据缓存
- `tagsView.js`: 多菜单栏的状态的保存
- `user.js`: 账号的一些数据缓存

### directive

注册了三种指令
```javascript
export default function directive(app){
  app.directive('hasRole', hasRole)
  app.directive('hasPermi', hasPermi)
  app.directive('copyText', copyText)
}
```

- `v-copyText`: 复制文本内容
- `v-hasPermi`: 操作权限处理，如果一个组件`<button v-hasPermi=false>`，那么这个组件会隐藏
- `v-hasRole`: 角色权限处理
> 代码中还没有使用这个`v-hasRole`指令

### permission
> 在上面`router`已经解释`permission.js`的相关作用


## 布局架构
```javascript
export const constantRoutes = [
  {
    path: '',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/index'),
        name: 'Index',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/system/user/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  }
]
```

基础路由上使用了`@/layout/index.vue`

```vue
<template>
  <div :class="classObj" class="app-wrapper" :style="{ '--current-color': theme }">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar v-if="!sidebar.hide" class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView, sidebarHide: sidebar.hide }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar @setLayout="setLayout" />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <settings ref="settingRef" />
    </div> 
  </div>
</template>
```

主要分为：
- `sidebar`：侧边菜单栏
- `navbar`：右边布局的顶部布局
- `tags-view`：多菜单栏，可以选择多个窗口
- `app-main`：主页面，跟侧边菜单栏联动，可以切换不同的子组件

----

进行不同组件切换的是`app-main`

```vue
<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="tagsViewStore.cachedViews">
          <component v-if="!route.meta.link" :is="Component" :key="route.path"/>
        </keep-alive>
      </transition>
    </router-view>
    <iframe-toggle />
  </section>
</template>
```

而切换不同组件放在`@/views/xxx`文件夹中，而主要的布局文件放在`@/layout/xxx`文件夹中，就很好分离了基础布局和业务代码

如果想要增加不同的业务代码，只需要增加对应的路由`router`，然后在业务文件夹`@/layout/xxx`增加对应的组件代码逻辑

## 权限管理

角色管理：超级管理员、系统管理员、普通角色
:::tip 角色管理
角色可以跟左侧菜单栏挂钩，比如系统管理员可以查看系统管理的菜单栏，不可以查看工具菜单栏
:::


> 部门管理、岗位管理、用户管理:
> 
> 只是一个数据字段，没有什么实际作用，比如可以查看某个人的具体手机号码等



## 菜单栏管理

涉及到菜单栏的新增改查，与`路由router`进行绑定
