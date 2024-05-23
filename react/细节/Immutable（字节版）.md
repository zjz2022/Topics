## Immutable

**1 Immutable**

​		Immutable.js 源自 Facebook ，一个非常棒的不可变数据结构的库。使用另一套数据结构的 API，将所有的原生数据类型转化成Immutable.js 的内部对象,并且任何操作最终都会返回一个新的`Immutable`值

`Immutable` 实现的原理是 `Persistent Data Structure`（持久化数据结构）:

- 用一种数据结构来保存数据
- 当数据被修改时，会返回一个对象，但是新的对象会尽可能的利用之前的数据结构而不会对内存造成浪费

其出现场景在于弥补 Javascript 没有不可变数据结构的问题，通过 structural sharing来解决的性能问题，内部提供了一套完整的 Persistent Data Structure，还有很多易用的数据类型，如`Collection`、`List`、`Map`、`Set`、`Record`、`Seq`，其中：

- List: 有序索引集，类似 JavaScript 中的 Array
- Map: 无序索引集，类似 JavaScript 中的 Object
- Set: 没有重复值的集合

主要方法：

- fromJS()：将js数据转化成Immutable数据；
- toJS()：将一个Immutable数据转换为JS类型的数据；
- is()：对两个对象进行比较
- get(key)：对数据或对象取值

使用 `Immutable`可以给 `React` 应用带来性能的优化，主要体现在减少渲染的次数

在做`react`性能优化的时候，为了避免重复渲染，我们会在`shouldComponentUpdate()`中做对比，当返回`true`执行`render`方法

`Immutable`通过`is`方法则可以完成对比，而无需像一样通过深度比较的方式比较

**2 Immer**

​		深层次的对象在没有修改的情况仍然能保证严格相等。这也是它另外一个特点：深层嵌套对象的结构共享相比与 Immer.js，Immutable.js 的不足：

- 自己维护一套数据结构、JavaScript 的数据类型和 Immutable.js 需要相互转换，有入侵性
- 他的操作结果需要通过 toJS 方法才能得到原生对象，这样导致在开发中需要时刻关注操作的是原生对象还是 Immutable.js 返回的结果
- 库的体积大约在 63KB、而 Immer.js 仅有12KB
- API 丰富、学习成本较高

immer 缺点：

- 兼容性：对于不支持`proxy`的浏览器使用`defineProperty`实现，在性能上为`proxy`的两倍