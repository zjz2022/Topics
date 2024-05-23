### cookie有过期时间吗?

cookie:通过 Expires、Max-Age 中的一种
Expires属性指定一个具体的到期时间，到了指定时间以后，浏览器就不再保留这个 Cookie。它的值是 UTC 格式。如果不设置该属性，或者设为null，Cookie 只在当前会话（session）有效，浏览器窗口一旦关闭，当前 Session 结束，该 Cookie 就会被删除。另外，浏览器根据本地时间，决定 Cookie 是否过期，由于本地时间是不精确的，所以没有办法保证 Cookie 一定会在服务器指定的时间过期。
Max-Age属性指定从现在开始 Cookie 存在的秒数，比如60  *60*  24 * 365（即一年）。过了这个时间以后，浏览器就不再保留这个 Cookie。
如果同时指定了Expires和Max-Age，那么Max-Age的值将优先生效。
如果Set-Cookie字段没有指定Expires或Max-Age属性，那么这个 Cookie 就是 Session Cookie，即它只在本次对话存在，一旦用户关闭浏览器，浏览器就不会再保留这个 Cookie。