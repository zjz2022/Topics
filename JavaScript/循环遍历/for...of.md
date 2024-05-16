## for...of

### for...of使用

 `for...of` 是 JavaScript 提供的一种遍历迭代器（例如数组、字符串、Set、Map等）的循环结构。它可以用来遍历任何实现了可迭代协议的对象。

下面是 `for...of` 的使用方法：

```js
for (const value of iterableObject) {
  // 执行操作
}
```

在这里，iterableObject 是一个可迭代对象（例如数组、字符串或者 Map），value 是从这个可迭代对象中取出的每一个元素。在每一次循环中，我们都可以获取到当前迭代元素并对其进行操作。

下面是一个对数组进行遍历的例子：

```js
const array = [1, 2, 3, 4, 5];

for(const value of array) {
    console.log(value);
}
```

此代码将会打印出数组中的每一个元素：1, 2, 3, 4, 5。

对于字符串：

```js
const string = "hello";

for(const char of string) {
    console.log(char);
}
```

此代码将会打印出字符串中的每一个字符：h, e, l, l, o。

`for...of` 语句创建了一个循环来迭代可迭代的对象。 在 ES6 中引入，`for...of` 语法相比传统的 for 循环来说在处理复杂的数据结构时更为直观和便捷。

### for of 可以遍历哪些对象？

for..of..: 它是es6新增的一个遍历方法，但只限于迭代器(iterator), 所以普通的对象用for..of遍历
是会报错的。
可迭代的对象：包括Array, Map, Set, String, TypedArray, arguments对象等等