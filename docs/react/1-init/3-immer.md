# immer


## 安装

```js
npm install immer --save
```


## 作用

代替`setState`进行数据的管理，可以解决不可变数据每次都得传入一个新的值的问题

> 有时候会忘记传入新的值，可能没有进行旧的值的一些属性的合并

```js
import produce from "immer";

const [list, setList] = useState([]);
setList(produce(draft => {
    draft.push("item1");
}))
```