https://github.com/vuejs/rfcs/discussions/519

https://juejin.cn/post/7122281979462533128

https://www.nowcoder.com/discuss/513503986318696448

### vue中v-if和v-for优先级在vue2和vue3中的区别

实践中不管是vue2或者vue3都不应该把v-if和v-for放在一起使用。

* 在 vue x 中，在一个元素上同时使用 v-if 和 v-for 时， v-for 会优先作用。
* 在 vue x 中， v-if 总是优先于 v-for 生效。
* vue2中v-for的优先级是高于v-if的，放在一起，会先执行循环在判断条件，并且如果值渲染列表中一小部分元素，也得再每次重渲染的时候遍历整个列表，比较浪费资源。
* vue3中v-if的优先级是高于v-for的，所以v-if执行时，它调用相应的变量如果不存在，就会导致异常