# token使用


1. 每一个请求都需要携带`token`
2. `token`可以放在`body`、`header`、`url?token=xx`进行传递


## token检测中间件

`HttpBasicAuth`是一种携带`token`的方式，属于`HTTP授权机制`的一种

1. 使用`basic-auth`第三方库进行`token`的获取
```js
const token = basicAuth(ctx.req);
```

2. 使用`jsonwebtoken`第三方库进行`token`的校验
```js
jwt.verify(token.name, secretKey);
```

3. 校验成功后，使用密钥进行`token`中包裹信息的提取，拿到对应的数据，赋值给`ctx.auth`

4. 如果发生错误，进行全局错误的throw
```js
throw new XXXXExcetpion()
```

5. 触发下一个中间件`await next()`
