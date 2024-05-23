## EventBus注册在全局上时，路由切换时会重复触发事件，如何解决呢？

* 添加Bus.\$off来关闭

  beforeDestroy () {

  bus.\$off('get', this.myhandle)

  }

* 如果想要用bus 来进行页面组件之间的数据传递，需要注意亮点，组件emit事件应在beforeDestory声明周期内。其次，组件B内的\$on记得要销毁。