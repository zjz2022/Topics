## vue3组合式API生命周期钩子函数有变化吗?

setup 是围绕 beforeCreate 和 created 生命周期钩子运行的，所以不需要显示的定义它们。其他的钩子都可以编写到 setup 内