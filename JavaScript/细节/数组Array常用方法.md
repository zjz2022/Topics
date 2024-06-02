



#  数组Array常用方法 

特殊的对象，数字作为索引，length代表长度



方法的作用和含义

方法的实参(类型和含义)

方法的返回值

原来的数组是否会发生改变

 数组增删改的方法(会改变原数组) 

 这一部分方法会修改原有的数组

向数组末尾增加内容

### push方法

@parmas 多个任意类型

@return 新增后数组的长度

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640669482684-fbaa2be3-d939-436b-81ba-16ca10983be7.webp)



### 直接用数组[索引]

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640669570360-bb8f3ac2-b113-4ee0-a24f-083e3d57a1a2.webp)



### 扩展运算符

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640670317475-ad62196b-eb28-4d00-8a3d-5b0df8527b58.webp)





向数组开头添加内容

### unshift方法

@parmas 多个任意类型

@return 新增后数组的长度

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640670110544-f94cc674-0a10-42c4-8553-104e43a8babc.webp)



### 扩展运算符

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640670271721-26abbccb-eaad-420b-bfe6-861112567b04.webp)



  

### 删除数组中的第一项

#### shift方法

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640670526287-e78e0c60-88d3-4f06-a0b2-cb7efb125744.webp)



#### delete方法

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640670671056-dbc842bd-df1a-40fd-a8d1-2115c3e5fae4.webp)



但是数组的长度不会变，所以项目中不会用

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640670693911-f1970351-253a-4d10-8a9b-87e3820d8232.webp)





### 删除数组中的最后一项

#### pop方法

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640670794914-5c22208a-784c-41ba-9875-80a15f4672e8.webp)



#### delete同上

没啥用

#### 通过修改length(牛逼)

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640670895488-c71f190f-f7d1-4bf2-8960-71b7f7813e99.webp)



### 通过splice方法

ary.splice(ary.length-1)





### splice:实现数组的增加、删除、修改

实现删除:

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640683179651-02e29d47-6dde-463b-b184-1426f1421b85.webp)



实现增加/修改:

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640685359380-d2249bf7-ffee-451f-9a70-641d405a4e8d.webp)





 数组查询和拼接的方法(不会改变原数组) 

### slice方法

数组查询

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640689948752-afa8f545-c03e-40b5-8926-fd786ab322c8.webp)



### concat方法

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640690208051-fd55481c-5ef5-4b80-be4e-0d58948a60f7.webp)







 数组转换为字符串的方法(不会改变原数组) 

### toString方法

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640690434699-9eef4854-f8ac-4604-914a-327cc35e0d4a.webp)



### Join方法

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640690627205-b2d6c85e-8ad5-48b2-b51d-75db4e3af006.webp)



 检测数组中包含某项(不会改变原数组) 

### indexOf和lastIndexOf

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640691224803-e9f2996d-06ca-4bba-a9dd-b01b4a8bd778.webp)



### includes

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640691287548-edbd6312-ab9f-4689-9db4-6d10c99e53ff.webp)





 数组的排序或排列 

### reverse数组反转

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640691695298-a84356ed-c209-4c27-a75c-2ccbb4f65cf0.webp)



### sort数组排序

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640692149488-7d997fbe-f221-4fc7-af1b-c8a3b5af01f5.webp)





 遍历数组的方法 

### forEach方法(原理数组不变)

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640692553890-85c04546-91fe-475b-838a-b1429fffa19e.webp)



 数组去重的方法 

### 循环原有数组中每一项

1.for循环方法

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640692754423-ae865c11-b0b7-48c7-81ad-992ca381319b.webp)



2.forEach优化版

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640693001142-7c3037a7-5a65-4aca-8c27-217c76e7e3d2.webp)



3.set版本

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640693231644-96be15f5-071b-4ebc-a9e6-ac4c77f98f18.webp)



4通过对象数组去重

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640744177880-b7baceec-777e-44ca-8d3b-46c393414b0d.webp)



#  