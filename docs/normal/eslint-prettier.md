# eslint

## 介绍
检查代码质量与风格的工具，配置规则，检查出代码中不符合规则的地方，部分问题支持自动修复:
- 代码质量检查：使用未声明的变量；修改const变量等
- 代码格式化：必须使用分号；双引号还是单引号等

## 配置

1. 安装`eslint`依赖
2. 在根目录配置`.eslintrc.js`或者`.eslintrc.json`文件，或者在根项目的`package.json`中配置`eslintConfig`规则

# prettier

## 介绍

对代码进行格式化，并不关注代码质量潜在问题的检查
> 更加倾向于代码风格的规范或者统一，除了js文件外，还支持对多种文件类型进行格式化

## 配置

Prettier插件获取配置文件有一个优先级：.prettierrc > .editorconfig > vscode默认配置。

> 上面的前两者并不是说.prettierrc和.editorconfig同时存在时，后者的配置内容就被忽略，实际的表现： 
> 
> .prettierrc和.editorconfig同时存在时，二者内容会进行合并，若配置项有冲突，这.prettierrc的优先级更高。

# eslint和prettier冲突

## 两者不同

- ESLint 安装和配置比较麻烦，而且 lint 的速度并不快
- Prettier 并不只针对 JavaScript，它可以格式化各种流行语言
- Prettier 的配置选项没那么眼花缭乱，比 ESLint 少很多，这在Prettier选项的哲学中说明精简的原因。

## 原因

- 重叠的格式化规则不一致
- 同时开启二者进行格式化


## 解决方法

1. 找出冲突的地方
2. 取其中一方的规则适配


# 总结


# 参考
1. [彻底搞懂ESLint与Prettier在vscode中的代码自动格式化](https://juejin.cn/post/7156893291726782500)
2. [用 eslint 和 prettier 让跨 IDE 协作更舒服](https://segmentfault.com/a/1190000040927431)