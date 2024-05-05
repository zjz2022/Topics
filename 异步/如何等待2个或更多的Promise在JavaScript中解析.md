# 如何等待 2 个或更多的 Promise 在 JavaScript 中解析

假设您需要启动 2 个或更多的[Promise](https://flaviocopes.com/javascript-promises/)并等待其结果。

双方都解决后，您就想继续。

如何使用 JavaScript？

您使用 `Promise.all()` ：

```js
const promise1 = //...
const promise2 = //...

const data = await Promise.all([promise1, promise2])

const dataFromPromise1 = data[0]
const dataFromPromise2 = data[1]
```

如果您更喜欢使用纯承诺而不是[async / await](https://flaviocopes.com/javascript-async-await/) ，请使用以下语法：

```js
const promise1 = //...
const promise2 = //...

Promise.all([promise1, promise2]).then(data => {
	const dataFromPromise1 = data[0]
	const dataFromPromise2 = data[1]
})
```
