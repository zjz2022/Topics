### token存在哪里呢?

1. 存储在localStorage中，每次调用接口的时候都把它当成一个字段传给后台
2. 存储在cookie中，让它自动发送，不过缺点就是不能跨域
3. 拿到之后存储在localStorage中，每次调用接口的时候放在HTTP请求头的Authorization字段里面