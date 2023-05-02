# vite.config.ts

`vite.config.ts`的`alias`实际是`@rollup/plugin-alias`这个插件的配置项，是构建时进行路径的查找

```javascript
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    }
})
```

# tsconfig.json

而实际开发中，如果提示`@/layout`找不到，本质是因为`tsconfig.json`没有配置别名参数，因此`IDE`无法识别出`@`这个别名

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```


# jsconfig.json

在一些`IDE`编辑中，还需要配置`jsconfig.json`，才能让编辑器识别出正常路径，然后可以鼠标点击跳转到具体的路径

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```


