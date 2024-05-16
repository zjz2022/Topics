深拷贝中，JSON.stringfy和parse有什么缺陷

- 解决不了循环引用的问题

```js
let obj = {
  a: {
	b: obj.a;
  }
}
```

- 使用deepClone调用上面的对象会出现循环引用的问题，应该怎么解决？
- 有没有看过lodash相关的源码？
- 在深度克隆的过程中维护一个**缓存（或映射）表**，如使用weakMap，用于跟踪已经克隆过的对象