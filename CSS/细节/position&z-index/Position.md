## Position的属性有哪些，默认是？分别有哪些作用，分别相对于谁定位

https://developer.mozilla.org/zh-CN/docs/Web/CSS/position

https://www.arryblog.com/guide/css3/css-position.html#%E4%BA%8C%E3%80%81%E7%9B%B8%E5%AF%B9%E5%AE%9A%E4%BD%8D%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF

position（定位）

**position** — 作为css属性三巨头（*position、display、float*）之一，它的作用是用来决定元素在文档中的定位方式。其属性值有五种，分别是 — static（正常定位）、relative（相对定位）、absolute（绝对定位）、fixed（固定定位）、sticky（粘性定位）。

**static（正常定位）**

static(正常定位) 是元素position属性的默认值，包含此属性的元素遵循常规流[1]。

**relative（相对定位）**

postion属性值为relative(相对定位) 的元素在不设置**top、right、bottom、left**这些属性时，其自身在文档中的定位效果与static并无区别，但加上**top、right、bottom、left**这些属性后，便会**相对于自身在常规流中的位置进行定位**。

在上文中阐述static时用到的ID为relative的元素用的就是相对定位，从其对应的效果图可以看出，虽然元素中含有值为-100px的top属性，将元素显示的位置相对于自身在常规流中的位置往上移动了100像素，但其自身在常规流中的位置仍然保留。

**absolute（绝对定位）**

absolute（绝对定位）与relative（相对定位）之间的区别是：relative（相对定位）并没有脱离文档流，而absolute（绝对定位）脱离了文档流；relative（相对定位）相对于自身在常规流中的位置进行偏移定位，而absolute（绝对定位）相对于离自身最近的定位祖先元素的位置进行偏移定位。

**fixed（固定定位）**

fixed（固定定位）和absolute（绝对定位）很像，但也有两点不同：absolute（绝对定位）相对于定位祖先元素进行偏移定位，而fixed（固定定位）相对于窗口进行偏移定位；absolute（绝对定位）的定位祖先元素可以是相对定位的元素，而fixed（固定定位）的定位祖先元素只能是窗口。

**sticky（粘性定位）**

sticky（粘性定位）类似relative和fixed的结合，当元素设置position属性为sticky时，如果top、right、bottom、left四个属性都不设置具体值，sticky（粘性定位）不会生效，其表现效果与static一致[3]。
当在top、right、bottom、left四个属性中至少设置一个具体值时，元素具备两种状态 — **类似relative（相对定位状态）和类似fixed（固定定位状态）**。以top:10px为例 ：当元素相对于窗口顶部的距离大于10px时，元素处于**类似relative（相对定位状态）**，一旦元素相对于窗口顶部的距离小于或等于10px时，元素立马切换到**类似fixed（固定定位状态）**





