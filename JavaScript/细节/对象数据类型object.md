# 对象数据类型object 

### 对象类型

   普通对象 {}

   数组对象 []

   正则对象 /^[+-]?$/

   Mah数学函数对象

   日期对象

函数数据类型function

 Math对象 

数学函数:但是它不是函数，它是一个对象，对象中存储了很多操作数字的属性方法，因此被称为数学函数

1.math.abs([value]):获取绝对值，永远是正数或0

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640666995742-ee34fda2-5752-486b-bfb1-8be0f7c0b306.webp)



2.ceil和floor([number value])

把一个数向上取整和向下取整

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640667298076-eb5014ca-bb5c-45a2-a61f-9ce42542e0b5.webp)

69



3.Math.round()四舍五入

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640667454273-112cfd32-8afc-4113-8db0-ce9b2ec7f53f.webp)



四舍五入负数0.5是舍弃，正数0.5是加入

4.Math.max/min（）获取最大值最小值

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640667696813-66d8d0a1-38c6-4847-a231-f35df60fb083.webp)



传的必须是数字，如果要传数组可以用...运算符

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640667738441-fc5110f2-e213-4522-aee5-6f884ea92194.webp)



5.Math.sqrt()/pow()

sqrt:给一个数开平方(负数不能开平方)

pow:计算一个数的多少次幂函

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640667935887-eab5cbdb-6da3-479c-b3de-978c7c414a1f.webp)

 



6.Math.random()随机数

扩展:获取[n,m]之间的随机整数

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640668490203-52acb987-1a54-4be3-9141-7cc112a7e9bf.webp)



例如:获取[25,96]之间的随机整数





 Date日期对象 

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640775199877-e1ff0e51-fadc-4204-bd7c-dc1eb6fd302b.webp)



### 获取属性名对应的属性值:

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640526694861-fb9fd9d9-9242-4c26-83f6-1c4072834780.webp)



newDate除了获取当前时间，还可以把一个时间格式字符串转换为标准的时间格式

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640777561288-d493bc91-e7a9-4c51-994c-bc96f6c5ab7a.webp)







# 