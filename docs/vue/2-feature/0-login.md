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

