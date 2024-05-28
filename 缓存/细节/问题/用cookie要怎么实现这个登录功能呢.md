### 用cookie要怎么实现这个登录功能呢?



前端可以自己创建 cookie，如果服务端创建的 cookie 没加HttpOnly，那恭喜你也可以修改他给的 cookie。
调用document.cookie可以创建、修改 cookie，和 HTTP 一样，一次document.cookie能且只能操作一个 cookie。

### cookie+sesson的流程是咋样的?

![image-20240317113430371](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/image-20240317113430371.png)

服务器端的 SessionId 可能存放在很多地方，例如：内存、文件、数据库等。

![image-20240317113451593](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/image-20240317113451593.png)