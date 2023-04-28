# 格式化代码

## eslint

### 介绍

检查代码质量与风格的工具，配置规则，检查出代码中不符合规则的地方，部分问题支持自动修复:

- 代码质量检查：使用未声明的变量；修改const变量等
- 代码格式化：必须使用分号；双引号还是单引号等

> eslint主要解决的是代码质量问题

### 配置

1. 安装`eslint`依赖

```shell
npm install --dev eslint
```

2. 在根目录配置`.eslintrc.js`或者`.eslintrc.json`文件，或者在根项目的`package.json`中配置`eslintConfig`规则

### 使用extends规则

如果我们不想手写，我们可以其它现成的配置规则，比如使用`Airbnb`公司的`eslint`规则

```shell
npm install --dev eslint-config-airbnb
```

```json
{
  "extends": [
    "airbnb"
  ]
}
```

## prettier

### 介绍

代码格式化工具，对代码进行风格格式化，并不关注代码质量潜在问题的检查
> 更加倾向于代码风格的规范或者统一，除了js文件外，还支持对多种文件类型进行格式化

### 配置

1. 安装`prettier`依赖

```shell
npm install --dev prettier
```

2. 配置文件优先级

Prettier插件获取配置文件有一个优先级：.prettierrc > .editorconfig > vscode默认配置。

> 上面的前两者并不是说.prettierrc和.editorconfig同时存在时，后者的配置内容就被忽略，实际的表现：
>
> .prettierrc和.editorconfig同时存在时，二者内容会进行合并，若配置项有冲突，这.prettierrc的优先级更高。

## eslint和prettier冲突

### 两者不同

- `eslint` 安装和配置比较麻烦，而且 `lint` 的速度并不快
- `prettier` 并不只针对 `JavaScript`，它可以格式化各种流行语言
- `prettier` 的配置选项没那么眼花缭乱，比 `eslint` 少很多

### 冲突原因

- 重叠的格式化规则不一致
- 同时开启二者进行格式化

### 解决方法

1. `eslint-config-prettier` 关掉 所有和 `prettier` 冲突的 `eslint`  的配置

```shell
npm install --dev eslint-config-prettier
```

```json
{
  "extends": [
    "prettier"
    // prettier 一定要是最后一个，才能确保覆盖
  ]
}
```

2. 启用 `eslint-plugin-prettier` ，将 `prettier` 的 `rules` 以插件的形式加入到 `eslint` 里面，这样报错的来源依旧是`eslint`

```json
{
  "plugins": [
    "prettier"
  ],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

上面两个步骤合在一起，就是

```json
{
  "extends": [
    "plugin:prettier/recommended"
  ]
}
```

## IDE配置

### WebStorm

在`Settings`中搜索`Prettier`，填入目前的`xxxx/node_modules/prettier`的路径

在`Settings`中搜索`ESLint`，填入目前的`xxxx/node_modules/eslint`的路径

> 然后我们就可以发现规则已经生效，对于`{**/*,*}.{js,ts,jsx,tsx,vue}`类型的文件都会生效

## vue项目的配置

> 上面列举的是一些基础配置以及简单项目的手动初始化，对于一些大型项目，需要另外配置更多，下面将一步一步手动介绍如何初始化项目的格式化配置

1. 安装`eslint`依赖

```shell
npm install --dev eslint
```

2. 初始化配置

> 会弹出提示，让你选择然后进行配置，比如选择为vue项目配置，会配置`plugin:vue/essential`等特殊插件

```shell
npx eslint --init
```

> 经过上面的配置，我们已经配置好了`js`、`ts`、`vue`的`eslint`规则

3. 安装vite-plugin-eslint

```shell
// 说明: 该包是用于配置vite运行的时候自动检测eslint规范 不符合页面会报错
npm add -D vite-plugin-eslint
```

4. 安装eslint-parser

```shell
npm add - D @babel/core
npm add - D @babel/eslint-parser
```

5. 配置vite.config.ts

```javascript
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        eslintPlugin({
            include: ["src/**/*.ts", "src/**/*.vue", "src/*.ts", "src/*.vue"],
        }),
    ],
});
```

6. 安装prettier

```shell
npm add -D prettier
npm add -D eslint-config-prettier #eslint兼容的插件
npm add -D eslint-plugin-prettier #eslint的prettier
```

7. 配置.prettier.json文件

```json
{
  "singleQuote": false,
  "semi": true,
  "bracketSpacing": false,
  "htmlWhitespaceSensitivity": "ignore",
  "printWidth": 2000
}
```

8. 使用plugin:prettier/recommended解决eslint和prettier冲突问题

`plugin:prettier/recommended`的作用为：

- 继承`.prettierrc.js`文件规则
- 开启`rules`的 `"prettier/prettier": "error" `
- `eslint fix`的同时执行`prettier`格式化

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "plugin:vue/vue3-essential",
    "standard-with-typescript",
    "plugin:prettier/recommended"
  ],
  "overrides": [
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "vue"
  ],
  "rules": {
  }
}

```

9. 增加其它配置

- `extends`增加`eslint:recommended`
- `parserOptions`增加`tsconfig.json`

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    // 使用推荐的eslint

    "plugin:vue/vue3-essential",
    "standard-with-typescript",
    "plugin:prettier/recommended"
  ],
  "overrides": [
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": [
      "tsconfig.json"
    ]
  },
  "plugins": [
    "vue"
  ],
  "rules": {
  }
}
```

## 参考

1. [彻底搞懂ESLint与Prettier在vscode中的代码自动格式化](https://juejin.cn/post/7156893291726782500)
2. [用 eslint 和 prettier 让跨 IDE 协作更舒服](https://segmentfault.com/a/1190000040927431)
3. [搞懂 ESLint 和 Prettier](https://zhuanlan.zhihu.com/p/80574300)