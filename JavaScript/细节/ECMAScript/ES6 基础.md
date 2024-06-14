https://github.com/Geek-James/Blog/issues/24

# ES6 基础

##  let const

### var 和 let/const的区别

- var 声明的变量会挂到 window 上，而 let 和 const 不会
- var 声明的变量存在变量提升，而 let 和 const 不会
- let 和 const 声明形成块作用域，只能在块作用域里访问，不能跨块访问，也不能跨函数访问
- 同一作用域下 let 和 const 不能声明同名变量，而 var 可以
- 暂时性死区，let 和 const 声明的变量不能在声明前被使用

### 暂时性死区(Temporal Dead Zone)

let 和 const 声明的变量不会被提升到作用域顶部，如果在声明之前访问这些变量，会导致报错：

```
console.log(typeof value); // Uncaught ReferenceError: value is not defined
let value = 1;
```



这是因为 JavaScript 引擎在扫描代码发现变量声明时，要么将它们提升到作用域顶部(遇到 var 声明)，要么将声明放在 TDZ 中(遇到 let 和 const 声明)。访问 TDZ 中的变量会触发运行时错误。只有执行过变量声明语句后，变量才会从 TDZ 中移出，然后方可访问。

### 最佳实践

在我们开发的时候，可能认为应该默认使用 let 而不是 var ，这种情况下，对于需要写保护的变量要使用 const。然而另一种做法日益普及：默认使用 const，只有当确实需要改变变量的值的时候才使用 let。这是因为大部分的变量的值在初始化后不应再改变，而预料之外的变量之的改变是很多 bug 的源头。

## 函数的扩展

### 箭头函数

箭头函数最主要的用途有2个：

1. 缩减代码，其实就是语法糖，让函数定义更简单了
2. 改变this指向，箭头函数中的this就是父级作用域中的this，没有各种复杂的情况需要去判断this的指向，解决了js的痛点

> 使用注意点：
> （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
> （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
> （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
> （4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

## rest 参数

ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。

rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

## 展开运算符

与剩余参数关联最密切的就是扩展运算符。剩余参数允许你把多个独立的参数合并到一个数组中；而扩展运算符则允许将一个数组分割，并将各个项作为分离的参数传给函数。

当用在字符串或数组前面时称为扩展运算符，可以理解为rest参数的逆运算，用于将数组或字符串进行拆解。有些时候，函数不允许传入数组，此时使用展开运算符就很方便。

## 解构赋值

ES6 新增了解构，这是将一个数据结构分解为更小的部分的过程，是一个非常有用且常用的 ES6 功能。
如何使用不再赘述，看阮一峰的ES6教程就可以了：[变量的解构赋值 - ECMAScript 6入门](https://es6.ruanyifeng.com/?search=rest&x=0&y=0#docs/destructuring)。

## Set Map WeakSet WeakMap

JavaScript 的默认对象表示方式 `{}` 可以视为其他语言中的 `Map` 或 `Dictionary` 的数据结构，即一组键值对。
但是 JavaScript 的对象有个小问题，就是键必须是字符串。但实际上 `Number` 或者其他数据类型作为键也是非常合理的。为了解决这个问题，最新的 ES6 规范引入了新的数据类型： 字典 `Map` 和 集合 `Set`。

Set 和 Map 主要的应用场景在于**数据重组**和**数据储存**。

### Set

ES6 新增的一种新的数据结构，类似于数组，但成员是唯一且无序的，没有重复的值。
Set 本身是一种构造函数，用来生成 Set 数据结构。

Set 对象允许你储存任何类型的唯一值，无论是原始值或者是对象引用。
向 Set 加入值的时候，不会发生类型转换，所以 `5` 和 `"5"` 是两个不同的值。Set 内部判断两个值是否不同，使用的算法叫做 “Same-value-zero equality”，它类似于精确相等运算符（`===`），主要的区别是： Set 认为 `NaN` 等于自身，而精确相等运算符认为 `NaN` 不等于自身。

```
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}

let set1 = new Set()
set1.add(5)
set1.add('5')
console.log([...set1])	// [5, "5"]
```



### Map

类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适；

Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。

如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如 `0` 和 `-0` 就是一个键，布尔值 `true` 和字符串 `"true"` 则是两个不同的键。另外，`undefined` 和 `null` 也是两个不同的键。虽然 `NaN` 不严格相等于自身，但 Map 将其视为同一个键。

集合和字典的区别：

- 共同点：集合、字典可以存储不重复的值
- 不同点：集合是以[值，值]的形式存储元素，字典是以[键，值]的形式存储

### WeakSet

WeakSet 对象允许你将弱引用对象储存在一个集合中

WeakSet 与 Set 的区别：

- WeakSet 只能储存对象引用，不能存放值，而 Set 对象都可以
- WeakSet 对象中储存的对象值都是被弱引用的，即垃圾回收机制不考虑 WeakSet 对该对象的应用，如果没有其他的变量或属性引用这个对象值，则这个对象将会被垃圾回收掉（不考虑该对象还存在于 WeakSet 中），所以，WeakSet 对象里有多少个成员元素，取决于垃圾回收机制有没有运行，运行前后成员个数可能不一致，遍历结束之后，有的成员可能取不到了（被垃圾回收了），WeakSet 对象是无法被遍历的（ES6 规定 WeakSet 不可遍历），也没有办法拿到它包含的所有元素

### WeakMap

WeakMap 对象是一组键值对的集合，其中的键是弱引用对象，而值可以是任意。

> 注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。

WeakMap 中，每个键对自己所引用对象的引用都是弱引用，在没有其他引用和该键引用同一对象，这个对象将会被垃圾回收（相应的key则变成无效的），所以，WeakMap 的 key 是不可枚举的。

### 总结

- Set
  - 成员唯一、无序且不重复
  - [value, value]，键值与键名是一致的（或者说只有键值，没有键名）
  - 可以遍历，方法有：add、delete、has
- WeakSet
  - 成员都是对象
  - 成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏
  - 不能遍历，方法有add、delete、has
- Map
  - 本质上是键值对的集合，类似集合
  - 可以遍历，方法很多可以跟各种数据格式转换
- WeakMap
  - 只接受对象作为键名（null除外），不接受其他类型的值作为键名
  - 键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
  - 不能遍历，方法有get、set、has、delete

## Symbol

为了解决 ES5 之前对象属性名冲突， ES6 引入了新的原始类型(primitive) `Symbol`，他是JavaScript中的第七种数据类型。

## Promsie

单独文章深入

## async await

单独文章深入

## Class

单独文章深入

## module

ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，旨在成为浏览器和服务器通用的模块解决方案。其模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

看一下两种使用方法：

1. 已知的变量或者函数名，需要用 `{}`包裹

```
/** 定义模块 math.js **/
var basicNum = 0;
var add = function (a, b) {
    return a + b;
};

export { basicNum, add };
/** 引用模块 **/
import { basicNum, add } from './math';
function test(ele) {
    ele.textContent = add(99 + basicNum);
}
```



或者这种写法

```
// export.js
export function fn() {}
// 或者 export 一个变量
export let fn = function() {}

// import.js
import {fn} from './export.js'
```



1. 默认的导出模块

```
// export-default.js
export default function () {
  console.log('foo');
}

// import-default.js
import customName from './export-default';
customName(); // 'foo'
```



不管是 export 还是 import 都可以用as来更改变量名：

```
export {fn as anotherFn}

import {anotherFn as fn}
```



## Iterator（遍历器）

单独文章深入

### 拓展：在ES5环境下实现const

实现 const 的关键在于 `Object.defineProperty()` 这个API，这个API用于在一个对象上增加或修改属性。通过配置属性描述符，可以精确地控制属性行为。`Object.defineProperty()` 接收三个参数：

```
Object.defineProperty(obj, prop, desc)
```



- obj：要在其上定义属性的对象
- prop：要定义或修改的属性的名称
- descriptor：将被定义或修改的属性描述符

| 属性描述符   | 说明                                                         | 默认值    |
| ------------ | ------------------------------------------------------------ | --------- |
| value        | 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined | undefined |
| get          | 一个给属性提供 getter 的方法，如果没有 getter 则为 undefined | undefined |
| set          | 一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。当属性值修改时，触发执行该方法 | undefined |
| writable     | 当且仅当该属性的writable为true时，value才能被赋值运算符改变。默认为 false | false     |
| enumerable   | enumerable定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举 | false     |
| Configurable | configurable特性表示对象的属性是否可以被删除，以及除value和writable特性外的其他特性是否可以被修改 | false     |

对于const不可修改的特性，我们通过设置writable属性来实现：

```
function _const(key, value) {    
    const desc = {        
        value,        
        writable: false    
    }    
    Object.defineProperty(window, key, desc)
}
    
_const('obj', {a: 1})   //定义obj
obj.b = 2               //可以正常给obj的属性赋值
obj = {}                //无法赋值新对象
```



参考资料：[如何在 ES5 环境下实现一个const ？](https://juejin.cn/post/6844903848008482824)

## 参考文档

- [ES6 系列之 let 和 const · Issue #82 · mqyqingfeng/Blog](https://github.com/mqyqingfeng/Blog/issues/82)
- [Set、WeakSet、Map及WeakMap · Issue #24 · sisterAn/blog](https://github.com/sisterAn/blog/issues/24)
- [ES6核心特性 · Issue #10 · ljianshu/Blog](https://github.com/ljianshu/Blog/issues/10)