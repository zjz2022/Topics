### 一、typeof

> typeof 检测原理是：在计算机底层 `根据js数据类型的二进制的值进行检测的`。

- `typeof` 检测类型后的返回值是一个`字符串`，ES5 中对于一个未定义的变量判断类型也会抛出字符串`undefined`，而不是报错。但是用 `let, const` 声明的变量也能会导致暂时性死区，抛出 `ReferenceError`。

```js
typeof undefined    //"undefined"
typeof a // "undefined"
typeof b // "ReferenceError" 
let b

typeof 12   //"number"
typeof NaN  //"number"
typeof ''   //"string"
typeof 1n    //"bigint"
typeof function(){}     //"function"
```



- (缺点) `typeof` 可以检测除了 `null` 类型以外的数据型。`null` 被检测成 `object` 这是一个历史遗留的 bug。
- (缺点) `typeof` 不能检测出具体的 `object` 类型，因为对象类型的二进制开头都是 000。比如 `typeof []   //"object"` 检测数组，正则，日期等。
- 其他类型的二进制，`000` 对象，`00000...` null，`1` 整数，`010` 浮点数 ，`100` 字符串，`110` 布尔值 ， `-2^30` undefined

#### 思考：typeof null 检测出来的结果为什么是 `object`

> `typeof` 是根据二进制值来判断数据类型的，`null` 的二进制值是 000，而 `object` 类型的二进制值都是 000 开头的，所以 `typeof` 检测 `null` 是也被检测成 `object`，这是一个历史里留下来的bug

#### 思考：typeof 判断函数为什么可以判断出是 `function` 类型而不是 `object`

> JS 中虽然函数也是对象，但是 `typeOf` 判断函数是会调用 `call` 方法来判断。所以能判断出`function`
