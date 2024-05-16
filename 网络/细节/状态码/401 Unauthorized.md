(401) You don't have the needed authorization for this workspace (mvskiran).

# 401 Unauthorized

状态码 **`401 Unauthorized`** 代表客户端错误，指的是由于缺乏目标资源要求的身份验证凭证，发送的请求未得到满足。

这个状态码会与 [`WWW-Authenticate`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/WWW-Authenticate) 首部一起发送，其中包含有如何进行验证的信息。

这个状态类似于 [`403`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/403)，但是在该情况下，依然可以进行身份验证。

## [状态](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/401#状态)

```
401 Unauthorized
```

## [响应示例](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/401#响应示例)

```
HTTP/1.1 401 Unauthorized
Date: Wed, 21 Oct 2015 07:28:00 GMT
WWW-Authenticate: Basic realm="Access to staging site"
```