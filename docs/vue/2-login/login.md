# 登录逻辑

## 检测是否登录

在`initDynamicRoute.ts`中进行`router.beforeEach()`的路由劫持，如果已经登录，则进行`handleDynamicRoute()`的路由合并处理

```ts
// 检测是否已经登录，如果没有登录则跳转到注册/登录页面，如果已经登录，则next()
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (!getToken()) {
    if (notNeedLoginPath.includes(to.path)) {
      next();
    } else {
      next("/login");
    }
  } else {
    handleAlreadyLogin(to, from, next);
  }
});
function handleAlreadyLogin(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) {
    // 已经登录的情况，重新进入页面
    if (to.path === "/login") {
        next({path: "/"});
        NProgress.done();
    } else {
        // 跳转到path: "/"页面
        // 检测是否获取userInfo数据，因为根据账户获取动态路由
        const userStore = useUserStore(); // pinia可以在任意地方使用store
        if (userStore.roles.length === 0) {
            handleDynamicRoute(to, from, next);
        } else {
            // 已经合并过动态路由
            next();
        }
    }
}
```

## 根据权限合并动态路由


### 基础动态路由

在`route.ts`中，有基础的路由，也就是不用登录就可以展示的路由，比如首页、错误页面等等
```ts
const basicRouters: RouteRecordRaw[] = [
  {
    path: "/:path(.*)*", // "/:path(.*)*"代表: "/a/b"->params: [ "a", "b" ]
    component: () => import("@/views/error/404.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "",
    component: LayoutIndex,
    redirect: "/index",
    children: [
      {
        path: "/index",
        redirect: "/system/user",
        component: () => import("@/views/index.vue"),
      },
    ],
    meta: {
      title: "首页",
    },
  },
  ...notNeedLogin,
]
```

也有动态的常见路由，比如分配角色、分配用户等，它是必定存在的路由，但是这个部分需要根据用户权限进行筛选

```ts
const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: '/system/user-auth',
    component: LayoutIndex,
    meta: {
      hidden: true,
      permissions: ['system:user:edit'],
    },
    children: [
      {
        path: 'role/:userId(\\d+)',
        component: () => import('@/views/system/user/AuthRole.vue'),
        name: 'AuthRole',
        meta: {
          title: '分配角色',
          permissions: ['system:user:edit'],
          activeMenu: '/system/user'
        }
      }
    ]
  },
  {
    path: '/system/role-auth',
    component: LayoutIndex,
    meta: {
      hidden: true,
      permissions: ['system:user:edit'],
    },
    children: [
      {
        path: 'user/:roleId(\\d+)',
        component: () => import('@/views/system/role/AuthUser.vue'),
        name: 'AuthUser',
        meta: { title: '分配用户', activeMenu: '/system/role' }
      }
    ]
  }
];
```


### 根据权限筛选固定的动态路由

```ts
async filterDynamicRoutes(routes: RouteRecordRaw[]) {
  const res: RouteRecordRaw[] = [];
  for (let route of routes) {
    // route.permissions = ["system:user:edit"],
    const permission: string[] = ((route.meta && route.meta.permissions) || []) as string[];
    const roles: string[] = ((route.meta && route.meta.roles) || []) as string[];
    if (permission && this.checkRoutePermission(permission)) {
      // 检测用户拿到的权限是否包含着某一个路由的权限(只要有触及即可，不要求全包括，因为我们要显示一个菜单，那必须有一定权限操作该菜单)
      res.push(route);
    } else if (roles && this.checkRouteRole(roles)) {
      res.push(route);
    }
  }
  return res;
}
```

使用路由所持有的`meta.permissions`或者`meta.roles`跟目前用户账户拿到的`permissions`/`roles`（如下面代码块所示），进行比对，然后返回目前账户可以使用的路由


```json
{
  "permissions":["*:*:*"], 
  "roles":["admin"]
}
```

### 根据权限筛选一些动态添加的路由
> 后台管理系统支持自定义路由，因此这个方法要筛选的就是这种自定义路由是否具有权限，是否可以显示和使用

目前还没完善权限方面的路由，因此只做`isHttp()`的检测，然后添加到路由中显示

> 因此目前左侧菜单栏有一些路由是无法使用的，后期再完善

```ts
rewriteRoutes.forEach((route) => {
  if (!isHttp(route.path)) {
    console.warn("rewriteRoutes添加的路由", route);
    router.addRoute(route);
  }
});
```

