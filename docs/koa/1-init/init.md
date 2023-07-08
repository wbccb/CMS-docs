# 初始化Koa项目

## 全局安装
`npm install -g koa-generator`

## koa初始化项目
`koa xxx(projectName)` 或者直接`koa`


## 框架设计


### 代码结构设计

- api: 路由封装
- config: 全局配置的常量
- dao: 数据库表操作
- extension: 文件操作类比较大的模块分类
- lib: 全局异常处理、数据辅助类
- middleware: 中间件，比如检测是否授权相关中间件、错误处理中间件
- model: 实体逻辑操作类
- validator: 请求数据校验


### 错误处理

> lib/http-exception

封装常见的状态码、状态码原因、错误码

### 检验器

以`validator`第三方库为基础，进行`isInt`字段+自定义校验函数的封装

### 建立数据库

#### Docker
1. 使用`Docker`创建数据库容器
2. 配置对应的账号和密码
3. 使用第三方库`sequelize`进行数据库的操作
> 自动执行SQL语句，创建、更新、删除、新增等操作


## 业务功能

- `validators.xxx`: 校验器，可自定义字段校验和自定义校验方法
- `models/xxx`: 逻辑操作类，进行数据库相关的操作以及其它业务操作
- `api/xxx`: 路由选择，进行`koa-router`，然后调用校验器进行参数校验，调用逻辑操作类进行数据的处理，然后进行返回数据给用户
