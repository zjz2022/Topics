更简洁的异步方案（async/await），它们是如何实现像同步一样调用异步任务的

async 一个 函数，这个函数就会返回一个 Promise

await 是配合 async 使用的语法糖，在 async 一个函数后，可以在里面使用 await，await 的作用是阻塞后面的代码，比如 await fn()，意思是等待 fn() 执行完毕，再执行 await fn() 这行代码下面的代码
