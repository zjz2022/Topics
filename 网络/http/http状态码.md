 HTTP状态码 

2开头

-200:成功(ok)

-201:CREATED:一般用于告诉服务器创建一个新文件，最后服务器创建成功后返回的状态码

-204:NO CONTENT:对于某些请求(例如:PUT或DELETE)，服务器不想处理，可以返回空内容，并且用204状态码告知

-301:Moved Permanently:永久重定向(永久转移)

  例子:京东以前www.360buy.com,现在只要输入这个网址就会永久重定向到京东

-302:Moved Temporaril:临时重定向，很早以前用302来做，现在主要用307来处理，307的意思就是临时重定向===>

作用:服务器的负载均衡、视频防盗

-304:Not Modified:设置HTTP的协商缓存

-307:临时重定向

-400:Bad Request:传递给服务器的参数错误

-401:Unauthorized:无权限访问

-404:Not Found:请求地址错误

-500:Internal Server Error:未知服务器错误

-503:Service Unavailable:服务器超负荷