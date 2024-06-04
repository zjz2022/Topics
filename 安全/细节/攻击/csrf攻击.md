csrf攻击 

提交方法:

1.form action="提交路径"

2.<a href="a/java/id=3">

3.ajax url提交

4.js提交 onsubmit事件



csrf解决:

1.token添加二次验证(就是登录时的token验证，请求头携带token)

2.验证码 手机号 微信验证