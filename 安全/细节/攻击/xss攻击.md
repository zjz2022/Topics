 xss攻击 

web页面:包含html和js文件 嵌入可执行的代码(js),xss攻击网络传输的时候,js

文件 是可以被下载或通过ajax提交的



xss危害

用户提交的数据，未经处理之前====》改变js

强行改变程序的执行方式



为什么会攻击js

因为js容易被攻击，访问网站时js会被下载下来



怎么预防xss攻击

1.文件设置成只读

2.通过后台程序检测文件大小的改变，报警更换文件

3.校验用户输入的信息(登录时做校验)

4.对特殊符号!/?/@...进行过滤