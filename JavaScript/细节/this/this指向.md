https://github.com/YvetteLau/Blog/issues/6

首先this并不会指向函数本身。
1，当函数在没有任何修饰的情况下调用，非严格模式下，this指向window，严格模式下this指向undefined。（默认绑定）
2，当函数由一个对象引导调用时，this指向该对象。（隐式绑定）
3，函数通过apply,call,bind绑定时，this指向绑定的对象。（显式绑定）
4，当函数被当做构造函数使用，又new引导调用时，this只想new创建出来的对象。（new绑定）；
其优先级为：new绑定 > 显示绑定 > 隐式绑定 > 默认绑定；
箭头函数其this取决于函数定义时所在的上下文。