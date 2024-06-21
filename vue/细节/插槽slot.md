https://github.com/liutao/vue2.0-source/blob/master/slot%E5%92%8C%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD.md

https://github.com/kd-cloud-web/Blog/issues/32

https://github.com/alibaba/formily/discussions/2514

> vue slot？有什么作用？原理？

### 插槽slot

1.插槽是使用在子组件中的。

2.插槽是为了将父组件中的子组件模板数据正常显示

```
//home.vue
<test>
     Hello Word
</test>
//test.vue
<a href="#">
	 <slot></slot>
</a>
//当组件渲染的时候，<slot></slot>会被替换为Hello Word
```

3 插槽内可以包含普通文本，也可以包含任何模板代码，包括HTML

```
//home.vue
<test>
	//插槽可以获取到home组件里的内容
	Hello {{enhavo}}
</test>

data(){
	return{
		enhavo:'word'
	}
}
//home.vue
//这里是获取不到name的，因为这个值是传给<test>的
<test name='you'>
    Hello {{name}}
</test>
```

4 插槽跟模板其他地方一样都可以访问相同的实例属性(也就是相同的"作用域")，而不能访问<test>的作用域。原因是父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。

**具名插槽**

​		有时候我们一个组件里需要**多个插槽**，对于这样的情况，`<slot>`元素有一个特殊的特性：`name` ，这个特性可以用来**定义额外的插槽**

​		如果一个`<slot>`不带`name`属性的话，那么它的`name`默认为`default`。在向具名插槽提供内容的时候，我们可以在`<template>`元素上使用`v-slot`指令，并以参数的形式提供其名称

具名插槽的缩写(2.6.0新增)

​		跟 `v-on` 和 `v-bind` 一样，`v-slot` 也有缩写，即把参数之前的所有内容 `(v-slot:)` 替换为字符 `#`。例如 `v-slot:header` 可以被重写为 `#header`：

**作用域插槽**

我们可以在父组件中使用slot-scope 特性从子组件获取数据， 前提是需要在子组件中使用:data=data  先传递data 的数据。

**动态插槽**

动态指令参数也可以用在v-slot上，来定义动态的插槽名：

```
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

### 