### cookie能跨域携带吗?

- 前端请求时在request对象中配置"withCredentials": true；

- 服务端在response的header中配置"Access-Control-Allow-Origin", "http://xxx:${port}";

- 服务端在response的header中配置"Access-Control-Allow-Credentials", "true"