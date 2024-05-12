# 项目踩坑

 Vue全局代码飘红但可正常运行的情况 

出现问题:删除node modules后重新npm i后出现的这个问题,

原因:vue3项目需要用volar而不是vetur，安装最新版volar后就解决了





 mitt使用后出现报错 

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1650856393412-142bd438-74ec-4fc9-a9bc-9a460853e822.webp)



解决方法:

这是由于mitt的版本问题 第一种方式：安装2.1.0版本即可

这里如果原来有的，下载之后如果还报错，那么先看package-lock.json中mitt版本是否改过来了，然后把node_modules右键删除，重新输入指令npm install,即可

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1650856438976-36c3f412-23d5-4543-b497-aab6275dfddb.webp)



第二种方式，在最新版本当中需要定义其类型，解决如下即可

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1650856458378-6e270d50-06dc-4eb6-93ae-f2322f85f799.webp)