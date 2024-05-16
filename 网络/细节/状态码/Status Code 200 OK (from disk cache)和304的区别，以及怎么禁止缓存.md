# Status Code:200 OK (from disk cache)和 304 的区别，以及怎么禁止缓存

有时候缓存是 200 OK (from disk cache)有时候会是 304 ? 看运维是否移除了 Entity Tag。移除了，就总是 200 OK (from cache)。没有移除，就两者交替出现。![img](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/Center.png)

他们两个的区别是 200 OK (from disk cache) 是浏览器没有跟服务器确认， 就是它直接用浏览器缓存。

304 是浏览器和服务器确认了一次缓存有效性，再用的缓存。

那么禁止200 OK (from disk cache) 这个缓存的方法是，ajax 请求是带上参数 cache: false
