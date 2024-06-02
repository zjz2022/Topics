# DOM 

 获取dom的方式的9种方法 

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640778706581-ed9a2fd1-2ca1-4ab8-a8b9-5c2915af130a.webp)



 JS中的节点和描述节点之间的属性 

节点:Node

节点集合:NodeList(getElementsByName/querySelectorAll获取的都是节点集合)

节点分类:

元素节点、文本节点、注释节点、文档节点document

.......

### 描述节点之间关系的属性

childNodes:获取所有的子节点

children:获取所有的元素子节点(子元素标签集合)

firstChild:获取第一个子节点

lastChild:获取最后一个子节点

firstElementChild/lastElementChild:获取第一个和最后一个元素子节点(不兼容ie6，7，8)

previousSibling:获取上一个哥哥节点

nextSibling:获取下一个弟弟节点

previousElementSibling/nextElementSibling:获取哥哥和弟弟元素节点(不兼容IE6，7，8)

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640831979688-97c97b75-15b1-47e9-abdc-f38fc693f876.webp)



由于IE6,7,8会把注释当作元素节点所以自己封装

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640832005691-f6db58f4-9c2c-49e6-8924-c396960888af.webp)



 JS中动态增删改元素 

createElement创建元素对象

createTextNode:创建文本对象

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640832800769-7f88d3d6-eff8-4433-97bc-c5fccfae9f12.webp)



appendChild:把元素添加到容器的末尾

insertBefore:把元素添加到指定容器中指定元素的前面

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640832812363-44067670-6cc3-4fe6-8711-2fac7c0d6177.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640832954614-f502f6be-3b49-4a8d-a78f-065d8c7a3f8c.webp)



cloneNode:克隆，参数true为深克隆，参数false为浅克隆

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640833310681-1d25ab56-909d-4338-9de2-04dfc2b496b6.webp)



removeChild:移除容器中的某个元素

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640833412919-63b293dd-88d3-45e0-8602-06f06c290dbc.webp)



setAttribute():设置自定义属性

getAttribute():获取某个属性

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640833885430-aa22fb54-3b42-470d-98d7-f5fac9358859.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640834181513-ccfde948-a58e-4c8a-b7d2-fad07861629a.webp)

