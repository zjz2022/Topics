https://github.com/fairyly/myvue/blob/gh-pages/1.3.4%20EventBus%E6%B3%A8%E5%86%8C%E5%9C%A8%E5%85%A8%E5%B1%80%E4%B8%8A%E6%97%B6%EF%BC%8C%E8%B7%AF%E7%94%B1%E5%88%87%E6%8D%A2%E6%97%B6%E4%BC%9A%E9%87%8D%E5%A4%8D%E8%A7%A6%E5%8F%91%E4%BA%8B%E4%BB%B6%E9%97%AE%E9%A2%98.md

https://github.com/haizlin/fe-interview/issues/456

## EventBus注册在全局上时，路由切换时会重复触发事件，如何解决呢？

* 添加Bus.\$off来关闭

  beforeDestroy () {

  bus.\$off('get', this.myhandle)

  }

* 如果想要用bus 来进行页面组件之间的数据传递，需要注意亮点，组件emit事件应在beforeDestory声明周期内。其次，组件B内的\$on记得要销毁。