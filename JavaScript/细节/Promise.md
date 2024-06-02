# Promise 

ES6语法规范中增加的内置类，用来处理js异步编程的，而所谓的promise设计模式，就是基于promise对异步操作进行管理



 Promise三个状态: 

●待定（pending）: 初始状态，既没有被兑现，也没有被拒绝。

●已兑现（fulfilled）: 意味着操作成功完成。

●已拒绝（rejected）: 意味着操作失败。



new Promise([executor])

[[executor]简称EXE]

1、New Promise的时候会执行一个函数，创建一个Promise的一个实例

2、Promise把EXE执行，而且还给EXE传递了两个参数(这两个参数也是函数类型):

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641879490527-b965c0e5-d229-4b4c-aa76-73d8920ded38.webp)



====》resolve函数:它代表PROMISE处理的异步事情是成功的，把Promise状态改为fulfilled

====》reject函数:它代表PROMISE处理的异步事情是失败的，把Promise状态改为rejected

3、EXE函数中放的就是当前要处理的异步操作事情

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641879538427-e993eae4-7446-4b6f-81b2-4e26ab42bdf0.webp)





 Promise构造函数原型上的方法 

 then方法 

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641880708296-a527457d-8637-44ea-869f-e8307cd31363.webp)



 catch方法 

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641880813564-814ab13b-d934-4446-a03e-1117b12bf1ae.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641880849095-b3b2822c-7dc8-4326-a951-c13b508c5c8d.webp)



类似于js里的try、catch(错误捕获)

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641881465821-f6817834-c41a-4b3f-9e29-4f7df991375a.webp)



 finally方法 

无论成功还是失败都会执行的方法(一般不用)

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641881043976-c8b63eeb-d35c-44ff-bf79-8cad2e50c7a9.webp)





执行then/catch/finally是一个全新的promise实例，所以可以链式写下去；下一个then中哪个方式会被执行，由上一个then中某个方法执行的结果来决定

上一个then中某个方法的返回值会传递给下一个then方法

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641892679548-d539c5d1-822f-43ff-84f7-374b3cca740c.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641893234217-d1027223-173a-4b00-91d2-375970770371.webp)





 PROMISE链式调用 

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641894179539-3d83a208-859b-4b00-b5ca-691aafcb8201.webp)



输出2 3 AAA 5



 Promise类方法 

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641897871454-086d2180-f293-48d0-9d48-a7548925ccba.webp)



 all方法 

all要都执行完之后才会有结果

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641894413903-96359836-7f7f-49d4-836d-e2235b0e60eb.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641894383661-c34de00d-d548-47c9-b0c3-657a8ae8f147.webp)



 race方法 

哪个promise方法先处理完，以最先处理完为主

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641894717755-bc0d7d54-cb81-41e6-b424-ff71b03f4b33.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641894697879-49c33487-be02-4aef-a499-d4cb07a42c8b.webp)







Promise的执行机制

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641897609788-6dd9cfae-5584-42bd-8d0b-10ec76649315.webp)