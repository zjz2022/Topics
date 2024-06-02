#  this问题 

面向对象中私有/公有方法中this的遵循原则: 1、方法执行看前面是否有点，点前面是谁This就是谁

 2、把方法中的this进行替换

 3、再基于原型链查找的方法确定结果即可

一道题理解面向对象中this问题

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641380170260-24d56afa-ee88-45fa-b232-8a1d0f76e2ad.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641380181865-0400ae5e-68e6-4358-a4ad-5770431a8e68.webp)



基于内置类扩展方法: 1、如果我们写的方法把内置方法覆盖了，那么调用时候就会出现问题(比如我重写一个push方法把数组原型上的push方法给覆盖掉了，就很恶心)



需要注意: 1、自己扩展方法不能影响原有内置方法

链式写法：

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641381539698-8ffc083e-8021-49df-988f-5801159d3c91.webp)





 this问题及面向对象习题 

题一

已知左边代码求

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641383213896-78b36529-1d40-454a-83f9-42966674a1dc.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641383443402-3f078f66-a4b0-4ce0-80c3-b1098bb0e732.webp)



题二、重构类的原型问题

重构类的原型:让某个类的原型指向新的堆内存地址(冲定向指向)

问题1:重定向后的空间中不一定有constructor属性(只有默认给prototype开辟的堆内存中才存在constructor)，这样导致类和原型机制不完整，所以需要手动给新的原型空间设置constructor属性



问题2:原有属性和方法没啥用了(如果需要克隆到新的原型堆内存中，需要额外的处理)

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641383555846-7e981a91-e141-4b7e-8d33-dc9be43b8616.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641384143537-ec59d08d-64ba-4d7b-ab35-36fc3db6e79d.webp)



题三、

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641384368017-96dcf18a-a928-4487-9d6c-da657a95d51a.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641384355225-67a5b172-1645-4d0d-b096-6d5aa8202ea0.webp)



题四

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641384587713-87985013-a316-4437-8343-d96b6dcb618f.webp)



题五（原型重定向最难题）

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641384804827-cc72cc6c-e346-4077-86e2-860119b4b3df.webp)



面向对象第五视频还没看

题六

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641385464451-6c1b9036-0925-429f-a3bb-dbb3a3fc3fa9.webp)



题7阿里面试题(超级难)

题目

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641454697725-707f347c-0dd6-4a13-99ac-82d91477f998.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641455320244-e4109862-ee53-406b-9128-ff80b8d2374b.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641455340407-9b685b53-432c-4b89-ac8b-873f1655ebc9.webp)







 call、bind和apply的区别 

共同点:

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641456200854-86000c08-de28-4dcf-a18c-13095fde23a3.webp)



 Call方法 

执行过程:

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641456308354-f7dc5898-bdaf-4c9a-bc57-779693a71881.webp)



call的机制

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641457035489-1234ea5e-eba9-498e-b342-5604637f3e1f.webp)



想让fn执行时指向obj，那就给obj加个fn属性



call的执行规律

### 如果只有一个call让call左边的那串东西执行，

### 如果有两个或两个以上的call让括号里传的参数执行

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641465770553-38d680d0-bf36-4056-9393-0dac225e8d15.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641465787949-bbc1eec1-5477-44c8-b11d-fb600c5848c7.webp)



 apply方法 

apply与call的区别在于传递给函数参数的方式不同



call是一个个传承

apply是按照数组传参



 bind方法 

和call/apply一样，也是用来改变函数中的this关键字的，只不过基于bind改变this，当前方法并没有被执行，类似于预先知道this

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641466264268-eb93d988-626d-415a-bba9-4be4d1279f25.webp)



 call与apply的区别，哪个性能更好 

共同点:

都是Function原型上的方法，改变this指向

call是一个个传参

apply是按照数组传参

还有一个bind，bind是改变this指向，不执行

call的性能要比apply好一些，尤其是在传递函数参数超过3个的时候





深入使用与面向对象关联

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641470759717-98b37b22-7272-4a32-860a-46bb6b9d1486.webp)



由于类数组原型没有指向Array.prototype，所以