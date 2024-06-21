https://github.com/WindrunnerMax/EveryDay/blob/master/Vue/Vue%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.md

https://github.com/ballooninmyhand/notes/blob/master/Vue/%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E8%AF%A6%E8%A7%A3.md

### Vue2



1） beforeCreate -> created

​		初始化vue实例，进行数据观测，此时 data，methods 等内部没有初始化，无法获取响应数据。

2） created

​		完成数据观测，属性与方法的运算，watch、event事件回调的配置。		可调用methods中的方法，**访问和修改data数据**触发响应式渲染dom，可通过computed和watch完成数据计算。此时vm.$el 并没有被创建。

​		常用于自动 ajax 请求、事件监听、定时器开启等。

3）created -> beforeMount

​		判断是否存在el选项，若不存在则停止编译，直到调用vm.$mount(el)才会继续编译		优先级：render > template > outerHTML		vm.el获取到的是挂载DOM的

4）beforeMount

​		在此阶段可获取到vm.el，此阶段vm.el虽已完成DOM初始化，但并未挂载在el选项上。

​		可以获取初始数据，实现函数自执行。

5）beforeMount -> mounted

​		此阶段vm.el完成挂载，vm.$el生成的DOM替换了el选项所对应的DOM

6）mounted

​		vm.el已完成DOM的挂载与渲染，此刻打印vm.$el，发现之前的挂载点及内容已被替换成新的DOM

7）beforeUpdate

​		更新的数据必须是被渲染在模板上的（el、template、render之一）		此时view层还未更新，若在beforeUpdate中再次修改数据，不会再次触发更新方法

​		内存中的数据已经改变，页面上的还没更新。

8）updated

​		完成view层的更新		若在updated中再次修改数据，会再次触发更新方法（beforeUpdate、updated）

9）beforeDestroy

​		实例被销毁前调用，此时实例属性与方法仍可访问

10）destroyed

​		完全销毁一个实例。可清理它与其它实例的连接，解绑它的全部指令及事件监听器		并不能清除DOM，仅仅销毁实例

```
//执行顺序
父组件----beforeCreate
父组件----created
父组件----beforeMount
子组件----beforeCreate
子组件----created
子组件----beforeMount
子组件----mounted
父组件----mounted
父组件----beforeUpdate(beforeDestory)
子组件----beforeUpdate(beforeDestory)
子组件----updated(destoryed)
父组件----updated(destoryed)
```
