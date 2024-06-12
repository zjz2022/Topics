https://github.com/Lmagic16/blog/issues/6

https://github.com/haizlin/fe-interview/issues/1866

## setTimeout与setInterval区别

- setTimeout()是设定一个定时器，当定时器到时后，环境会把回调函数放到事件循环中。如果此时事件队列中有多个事件，那么该回调就会等待，所以setTimeout定时器的精度可能不高，只能确保回调函数不会在指定的时间间隔之前运行。
- setInterval()是设定间隔定时器，假如间隔为1秒。就是从当前开始，每隔1秒将回调函数加入到事件循环中。并不是意味着函数执行的时间间隔为1秒。所以setIntervel具有累积效应，若某个操作特别耗时，超过了时间间隔，那么加入到事件队列中的事件就会被累积起来，然后会在很短的时间内被连续触发，这样就有可能造成性能问题，比如集中触发ajax请求。
- 结论：最好使用setTimeout超时调用来模拟setInterval间隔调用。
- HTML5标准规定，setInterval的最短间隔时间是10毫秒，也就是说，小于10毫秒的时间间隔会被调整到10毫秒。





- setTimeout(fn,t),超时调用，超过时间t，就执行fn，只调用一次。
- setInterval(fn,t),间歇调用，调用周期t，执行fn，可循环调用多次。

二者调用后，均返回一个**数值ID**，此ID是计划执行代码的唯一标识符，可以通过它来**取消尚未执行的调用**。**`clearTimeout(id)`和`clearInterval(id)`**。**取消间歇调用的重要性要远远高于取消超时调用**，因为在不加干涉的情况下，间歇调用将会一直执行到页面卸载。



setTimeout只执行一次，而setInterval可以一直执行，setTimeout可以模拟setInterval操作：

```js
function timeFun() {
    setTimeout(() => {
        timeFun()
        console.log('setTimeout');
    }, 1000)
}

setTimeout(() => {
    timeFun()
}, 1000)
```



在模拟的时候可以在内部根据逻辑判断终止循环执行，而setInterval必须通过手动通过clearInterval才能终止循环执行。