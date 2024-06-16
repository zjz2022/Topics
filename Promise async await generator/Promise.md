> Promise，什么情况下用到，解决了什么问题
>
> promise是用来干什么的，解决了什么问题，Promise优缺点，特性
>
> 如何理解 Promise, 有哪些常见的方法
>
> 聊聊 Promise
>
> 介绍下 promise 的特性、优缺点，内部是如何实现的，动手实现 Promise

https://github.com/mqyqingfeng/Blog/issues/98

https://github.com/lgwebdream/FE-Interview/issues/29

https://github.com/amandakelake/blog/issues/30

https://github.com/lgwebdream/FE-Interview/issues/29

答案：

（第一步）什么是 PromiseA+规范

PromiseA+规范中写到：

一个对象或者函数，里面有一个 then 方法，那么这个对象或者函数就是一个 Promise (Like)

在 PromiseA+规范中，Promise 可以互相操作，所以无论是 PromiseA+规范中的 Promise，还是 ES6 用构造函数 Promise 生成的 Promise，都可以互相操作

（第二步）只要是符合 PromiseA+规范并且包含 then 方法的对象或者函数，就是 Promise

（第三步）而 ES6 出现之后，它带来了一个构造函数 Promise，通过这个构造函数，可以创建一个满足 PromiseA+规范的 Promise

这就解释了：Promise 是什么

下面的整理这个回答需要的基础知识：

（1）PromiseA+规范中写到：

一个对象或者函数，里面有一个 then 方法，那么这个对象或者函数就是一个 Promise

对象

{

    then:function(...){}

}

函数

function A(){}

A.then = function(){}

在 PromiseA+规范中，Promise 可以互相操作，所以无论是 PromiseA+规范中的 Promise，还是 ES6 用构造函数 Promise 生成的 Promise，都可以互相操作

（2）后来，ES6 规定了一个构造函数 Promise

当我们用构造函数 Promise 创建一个实例对象，创建的这个实例对象是满足 PromiseA+规范的

也就是说，ES6 吸纳了 PromiseA+规范

const p = new Promise()

这里创建的 p，就是 PromiseA+里面的 Promise

除了这个，ES6 还给 Promise 加了很多东西，包括

方法：p.catch p.finally

静态函数：Promise.all .race .resolve
