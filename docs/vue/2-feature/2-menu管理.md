# 菜单管理


## 创建菜单


### parentId

获取目前的`menuList`列表，然后可以使用`handleTree()`整理为树状结构，点击选择就可以选中某一个菜单，获取对应的id

```js
const getList = () => {
  return async (pageNo: number, pageSize: number) => {
    const data: ResponseData<NetworkMenu[]> = await networkGetMenuList();
    menuArray.value = data.data;
    const treeData = handleTree(data.data, "menuId");
    data.data = treeData;
    console.info(treeData);
    return data;
  };
};
```




### 校验
配置`element-plus`对应的规则

```js
const formRules: FormRules<MenuDialogForm> = {
  menuName: [{required: true, message: "菜单名称不能为空", trigger: "blur"}],
  orderNum: [{required: true, message: "菜单顺序不能为空", trigger: "blur"}],
  path: [{required: true, message: "路由地址不能为空", trigger: "blur"}],
};
```

如果校验不通过，则无法进行对应的网络请求

```js
const submitForm = () => {
  checkRulesAndSubmit(async () => {
      // api/menu提交网络请求
  });
};
```


### 发起网络请求

```js
const submitForm = () => {
  // api/menu提交网络请求
  checkRulesAndSubmit(async () => {
    const addRes = await networkCreateMenu(formData);
    ElMessage({message: "新增菜单成功", type: "success", duration: 20 * 1000});
  });
};
```

## 菜单列表



## 更新菜单栏



