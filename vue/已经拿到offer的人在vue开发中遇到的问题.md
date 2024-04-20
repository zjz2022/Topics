## 5 vue开发

### 5.1 项目优化

**（1）代码层面的优化**

* v-if 和 v-show 区分使用场景
* computed 和 watch 区分使用场景
* v-for 遍历必须为 item 添加 key，且避免同时使用 v-if
* 长列表性能优化
* 事件的销毁
* 图片资源懒加载
* 路由懒加载
* 第三方插件的按需引入
* 优化无限列表性能
* 服务端渲染 SSR or 预渲染

**（2）Webpack 层面的优化**

* Webpack 对图片进行压缩
* 减少 ES6 转为 ES5 的冗余代码
* 提取公共代码
* 模板预编译
* 提取组件的 CSS
* 优化 SourceMap
* 构建结果输出分析
* Vue 项目的编译优化

**（3）基础的 Web 技术的优化**

* 开启 gzip 压缩
* 浏览器缓存
* CDN 的使用
* 使用 Chrome Performance 查找性能瓶颈

### 5.2 vue遇到的坑，如何解决的？

* 用webpack打包后访问index.html出现资源加载404问题，解决：开发环境的static文件夹是基于根目录的，所以直接用‘/’ 。
* vue中，假如，你引入某个样式，然后这个样式里面有引用到图片，如果你的文件中没有这个图片，这时候，即使你没有引用这个图片对应的类名，但是只要你有引入这个css文件，他找不到相应路径图片也会报错！！！
* 用for循环出来的列表，在设置列表中的元素的动态属性时，需要加bind属性“：”，不然动态属性设置不出来
* 在vue中的html中的img中的src不可以直接设置为变量，在data里面直接引路径，只能通过import的形式引入,值得注意的是，引用这个方式的时候src是变量需要加“：”，不然会报错！！！！！
* 在中使用v-for="(item ,index) in list"进行循环时，需要注意加：\:key=“index”,不然会出现警告！
* 父组件ajax异步更新数据，子组件props获取不到

应用场景

当父组件  axjos  获取数据，子组件使用  props  接收数据时，执行  mounted  的时候  axjos  还没有返回数据，而且  mounted 只执行一次，这时   props  中接收的数据为空

解决方案：在对应组件中判断数据的长度

### 5.3 在浏览器解析渲染过程中vue做了哪些优化（答：响应式，diff算法）

### 5.4 如果自己写一个select下拉单选的组件，你会怎么设计？

实现一个自定义的下拉单选其实并不太复杂，主要是实现其中选项的展示和选择功能。具体来说，我会参考以下步骤来进行：

首先，我们需要一个按钮或者输入框用来触发下拉菜单的显示和隐藏。下拉菜单部分则是一个列表，里面的每一个项目用来展示可供选择的选项。

然后，我们需要一个数据源来填充这个列表。这个数据源可能是直接写在组件内部的一份数据，也可能是从父组件接收的属性。

对于列表中的每个选项，我们需要给它添加点击事件，并在事件中实现选择功能。当用户点击某个选项时，我们应该把这个选项的值存储在组件的状态中，并修改输入框显示的内容。

我们还需要一个方法来控制下拉列表的显示和隐藏。当用户点击输入框或者触发按钮时，这个方法应该能够切换下拉列表的显示，当用户点击了列表之外的区域时，这个方法应该能够隐藏下拉列表。

如果想进一步优化这个组件，我们可以添加一些其他的功能。比如，我们可以添加一个搜索功能，让用户可以通过输入关键字来过滤下拉菜单的选项。我们还可以添加一些动画效果，提升用户体验。

代码可能类似于这样：

```vue
<template>
  <div class="dropdown">
    <input type="text" @click="openMenu" v-model="chosenItem" readonly />
    <ul v-if="isOpen">
      <li v-for="item in items" :key="item.id" @click="selectItem(item)">
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    items: Array
  },
  data() {
    return {
      isOpen: false,
      chosenItem: ""
    };
  },
  methods: {
    openMenu() {
      this.isOpen = !this.isOpen;
    },
    selectItem(item) {
      this.chosenItem = item.label;
      this.isOpen = false;
      this.$emit('input', item.value);
    }
  }
};
</script>
```


以上就是一个最基础版本的下拉单选组件设计思路。实际使用中可能还会有一些定制化的需求需要进行扩展和改进

