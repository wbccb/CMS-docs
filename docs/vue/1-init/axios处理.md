# axios封装

在`networkUtil.ts`中，我们进行response数据的劫持，进行普遍性的检测code，进行一些普遍逻辑的处理

如下面代码所示，我们会进行`code`的判断，如果是`200`或者`201`，则返回成功的结果
如果是其它`code`，则进行处理，比如
- 登录过期
- 服务器未知错误
- 警告信息
- 
```js
server.interceptors.response.use(
  (res) => {
    debugger;
    // 由于返回的数据层级较多，因此解析出res数据，拼接为简单的数据结构返回
    const code: number = res.data.code || 200;
    const msg = errorCodeText[code] || res.data.message || errorCodeText["default"];

    if (res.request.responseType === "blob" || res.request.responseType === "arraybuffer") {
      return res.data;
    }

    if (code !== 200 && code !== 201) {
      // 具体的业务代码应该在各自的.vue组件中进行，比如Login.vue弹出登录成功的提示
      // 这里的提示只是一种普遍性的检测code
      switch (code) {
        case 401:
          console.error("返回401，会话过期，需要重新登录");
          // 登录过期提示
          ElMessage({message: msg, type: "error"});
          const userStore = useUserStore();
          userStore.storeLogout().then(() => {
            router.push("/login");
          });
          return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
        case 500:
          ElMessage({message: msg, type: "error", duration: 20 * 1000});
          return Promise.reject(new Error(msg));
        case 601:
          ElMessage({message: msg, type: "warning"});
          return Promise.reject(new Error(msg));
        default:
          ElNotification.error({title: msg});
          return Promise.reject("error");
      }
      return Promise.reject("error");
    }

    return Promise.resolve(res.data);
  },
  (error) => {
    let {message} = error;
    ElMessage({message, type: "error", duration: 5 * 1000});
    return Promise.reject(error);
  }
);
```