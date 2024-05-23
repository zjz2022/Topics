### 家人们，setTimeout不准时是因为同步操作时间过长导致的，有啥解决方案吗,我寻思只能尽量减少高时延的同步操作

![image-20240225150853512](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/image-20240225150853512.png)

requestAnimationFrame / Web Workers ，

第一个不是以时间为单位，它比setTimeout准，但还是在浏览器局限内

真在意就用后端时间戳记录什么的，前端本身就不应该太长的定时2333

有个前端技巧叫做时间补偿，就是用settimeout配合记录本地时间来实现setinterval，这样就解决了浏览器的页面休眠和线程阻塞造成的延迟