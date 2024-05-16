https://juejin.cn/post/6948666607455436830

## 1：操作数数量不同

typeof的操作数是 1个
 instanceof的操作数是 2个

```javascript
# 1个操作数
console.log(typeof('strings'));

# 2个操作数
var c = new String('Hellos');
console.log(c instanceof String);
```

## 2：返回值不同

typeof返回的是字符串 数据类型
 instanceof返回的是布尔值

## 3：操作数类型不同

typeof操作的可以是简单数据类型，函数，或者对象
 instanceof操作的 左边必须是引用类型 右边必须是函数
 具体代码：见区别1

## 4：typeof能识别引用类型但是不能再细分

![img](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/61dc90e2e4b74c12b05e7043602353b4tplv-k3u1fbpfcp-jj-mark3024000q75.png)

## 5：instanceof 的简单理解

```css
判断A是否是B的实例
A instanceof B
```
