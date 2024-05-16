# 循环遍历 in JavaScript

##  for 循环

```
const array = ['a', 'b', 'c'];
for (let i = 0; i < array.length; i++) {  
	console.log(i, array[i]);  
}  
```



- for 循环只能遍历数组和字符串，不能遍历对象
- 可以使用 `continue` 跳过循环， `break` 终结循环
- 得到的是下标，无法直接使用值

> 注意事项：
>
> - 为了避免遍历时执行多遍计算数组长度的操作，影响效率,，建议在循环开始以变量的形式缓存下数组长度，若在循环内部有可能改变数组长度，请务必慎重处理，**避免数组越界**
> - JavaScript 中并没有类似 java 的块级作用域，for 循环内部定义的变量会直接暴露在外（如 i，循环退出后，i 变量将等于数组长度，后续代码将能访问到 i 变量的值)，因此建议将 for 循环置于闭包内或者使用 ES6 中的 let 来申明 i。特别要注意的是：如果在循环内部，前一个元素的遍历有可能影响到后一个元素的遍历，那么 for 循环内部方法也需要置于闭包之内

```
const array = ['a', 'b', 'c'];
for (var i = 0; i < array.length; i++) {  
		setTimeout(() =>console.log(i, array[i]), 0) ;
}  

// 会打印3个 3, undefinded
// 而用 let 来申明 i 或者将内部用闭包包裹一下则会得到正确结果
```



## forEach

forEach 回调 function 默认有三个参数：item、index、array。

```
array.forEach(function(item) {  
    console.log(item);  
});
```



- forEach 无法使用 break，continue 跳出循环，使用 return 时，效果和在 for 循环中使用 continue 一致
- 使用简单，得到的是值，而不仅仅是下标。

## for in

```
for(let index in array) {  
        console.log(index, array[index]);  
    };  
```



- 无法使用 `continue` 和 `break`。
- 输出的只是数组的索引和对象的 key，我们可以通过索引和 key 取到对应的值
- 用 for in 不仅可以对数组，也可以对 enumerable 对象操作
- for...in 循环会遍历一个 object 所有的可枚举属性。

for...in 语句以任意顺序遍历一个对象的可枚举属性。对于每个不同的属性，语句都会被执行。每次迭代时，分配的是属性名　　

> 补充 : 因为迭代的顺序是依赖于执行环境的，所以数组遍历不一定按次序访问元素。 因此当迭代那些访问次序重要的 arrays 时用整数索引去进行 for 循环 (或者使用 Array.prototype.forEach() 或 for...of 循环) 。

## for of (ES6)

```
 for(let v of array) {  
        console.log(v);  
    }; 
```



- 可以由 break、throw continue 或 return 终止，但只读不能写
- 使用很简单，直接得到的就是值，无法直接取到下标
- for...of 会遍历具有 iterator 接口的数据结构 （可以使用在 Map、Set 上，无法使用在对象上）

> 原生具备 Iterator 接口的数据结构如下：
>
> - Array
> - Map Set String
> - TypedArray
> - 函数的 arguments 对象
> - NodeList 对象

## for in 和 for of 的区别

除了迭代时分配的一个是属性名、一个是属性值外，for in 和 for of 还有其他不同 (MDN文档： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)

- for...in循环会遍历一个object所有的可枚举属性。
- for...of会遍历具有iterator接口的数据结构
- for...in 遍历（当前对象及其原型上的）每一个属性名称,而 for...of遍历（当前对象上的）每一个属性值

## 效率

1. for 循环的效率是最高，也是最稳定的
2. forEach 仅次于 for 循环
3. for in 效率是最差的，性能非常不稳定，所以一般枚举对象的属性的时候才用它

for 循环应该是底层优化过的，因此也是最推荐使用的。但是 forEach、map，或者ES6 新增的一些数组方法增强了代码的可读性，也使得更简洁，对于没有很高性能要求的一般数组更推荐使用。

## 参考文档

- [js中forEach，for in，for of循环的用法](https://www.cnblogs.com/amujoe/p/8875053.html)
- [详解JS遍历 | louis blog](http://louiszhai.github.io/2015/12/18/traverse/)
- [js各种遍历总结](https://github.com/aermin/blog/issues/13)