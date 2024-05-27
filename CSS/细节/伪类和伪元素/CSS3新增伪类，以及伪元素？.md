### CSS3新增伪类，以及伪元素？

**CSS3 新增伪类**

p:first-of-type 选择属于其父元素的首个<p>元素的每个<p>元素

p:last-of-type 选择属于其父元素的最后<p>元素的每个<p>元素

p:nth-child(n) 选择属于其父元素的第 n 个子元素的每个<p>元素

p:nth-last-child(n) 选择属于其父元素的倒数第 n 个子元素的每个<p>元素

p:nth-of-type(n) 选择属于其父元素第 n 个<p>元素的每个<p>元素

p:nth-last-of-type(n) 

选择属于其父元素倒数第 n 个<p>元素的每个<p>元素

p:last-child 选择属于其父元素最后一个子元素的每个<p>元素

p:target 

选择当前活动的<p>元素

:not(p) 选择非<p>元素的每个元素

:enabled 控制表单控件的可用状态

:disabled 

控制表单控件的禁用状态

:checked 

单选框或复选框被选中

**伪元素**

::first-letter 将样式添加到文本的首字母

::first-line 将样式添加到文本的首行

::before 在某元素之前插入某些内容

::after 在某元素之后插入某些内容