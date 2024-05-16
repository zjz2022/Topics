 DOM的重绘和回流 

重绘:元素的样式改变(但宽高、大小、位置不变)

回流:元素的大小或者位置发生了变化(当页面布局和几何信息发生变化的时候)，触发了重新布局，导致渲染树重新计算布局和渲染



注意:回流一定触发重绘，重绘不一定触发回流

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641795828693-f48237db-e5e0-4adf-91f5-6f63bc4d76bf.webp)



 产生回流原因: 

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641875539929-84a2885b-0115-4b98-a74a-df525555cf92.webp)



 产生重绘原因: 

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641875603844-45ad86c0-0c45-4714-963f-6f36ea3d2cb3.webp)





 性能优化:如何避免DOM的回流 

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641875664296-aec6f906-73d9-41f3-8863-bf35142730c4.webp)



1、放弃传统操作dom的时代，基于vue/react开始数据影响视图模式

例如:mvvm/mvc/virtual dom/dom diff



2、分离读写操作(现代的浏览器都有渲染队列的机制)

这些操作会刷新渲染队列(会引发回流)

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641795893500-23c381c9-f078-495d-86ea-baece6aaafd3.webp)



现代浏览器存在渲染队列，会自动读取当前修改样式的下一行判断其是否也是修改样式，如果是的话就将其放到渲染队列里面，直到某行代码不会改变样式

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641796095128-2dc01287-c67a-4bd9-bf41-aec2dbf8cc20.webp)



上图引发一次回流



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641796245928-35bc9d8d-b152-4108-96be-b4c2867fbff7.webp)



上图触发两次回流



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641796275079-c3622528-4cbc-4366-b6ca-b6e0cff29da0.webp)



上图触发三次回流

3、缓存布局信息

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641797054343-80520555-3af8-4f39-8e27-45fee39b20c7.webp)



4、元素批量修改

以下这种情况会触发10次回流

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641875428080-a3bf3b26-6271-493f-ad07-0c23222e36de.webp)



所以可以通过模板字符串批量修改

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641875386117-c658ed2d-ad26-4757-b5ff-b1cb7f385a2d.webp)



5、fragment文档碎片

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1641875332180-66d016bc-30d1-4460-961e-98f46d98f93f.webp)





