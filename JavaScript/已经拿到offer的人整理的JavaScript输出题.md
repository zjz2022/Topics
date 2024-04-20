前端面经（Js习题部分）

```
var a = 10;
(function () {
console.log(a)
a = 5
console.log(window.a)
var a = 20;
console.log(a)})()
分别为 undefined 10 20，原因是作用域问题，在内部声名 var a = 20;相当于
先声明 var a;然后再执行赋值操作，这是在ＩＩＦＥ内形成的独立作用域，如果
把 var a=20 注释掉，那么 a 只有在外部有声明，显示的就是外部的Ａ变量的值
了。结果Ａ会是 10 5 5
使用 sort() 对数组[3, 15, 8, 29, 102, 22] 进行排序，输出结果
输出：[102, 15, 22, 29, 3, 8]
解析：根据 MDN 上对 Array.sort()的解释，默认的排序方法会将数组元素转换
为字符串，然后比较字符串中字符的 UTF-16 编码顺序来进行排序。所以'102' 会
排在 '15' 前面。
var obj = {
'2': 3,
'3': 4,
'length': 2,
'splice': Array.prototype.splice,
'push':
Array.prototype.push
}
obj.push(1)obj.push(2)console.log(obj)
结果：[,,1,2], length 为 4
伪数组（ArrayLike）
const p = new Promise(resolve => {
    console.log(0) // 1
    resolve()
  })
p.then(res => {
  console.log(1) // 2
}).then(res => {
  console.log(2) // 6
}).then(res => {
  console.log(3) // 7
})
p.then(res => {
  console.log(4) //3
})
p.then(res => {
  console.log(5) // 4
})
p.then(res => {
  console.log(6) //5
})
example 1
var a={}, b='123', c=123;
a[b]='b';
a[c]='c';
console.log(a[b]);
---------------------
example 2
var a={}, b=Symbol('123'), c=Symbol('123');
a[b]='b';
a[c]='c';
console.log(a[b]);
---------------------
example 3
var a={}, b={key:'123'}, c={key:'456'};
a[b]='b';a[c]='c';
console.log(a[b]);
答：
1. 对象的键名只能是字符串和 Symbol 类型。
2. 其他类型的键名会被转换成字符串类型。
3. 对象转字符串默认会调用 toString 方法。
async function async1 () {
    console.log('async1 start') // 1
    await async2();
    console.log('async1 end') // 5
}
async function async2 () {
    console.log('async2') // 2
}
console.log('script start') // 0
setTimeout(function () {
    console.log('setTimeout') // 7
}, 0)
async1();
new Promise (function (resolve) {
    console.log('promise1') // 3
    resolve();
}).then (function () {
    console.log('promise2') // 6
})
console.log('script end') // 4
const obj = {
    name : 'yy',
    getInfo(){
        return{
            name:'ll',
            getName(){
                console.log(this.name)
            }

        }
    }
}

obj.getInfo().getName() // ll
function bar() {
    console.log(myName); // 快手
}

function foo() {
    var myName = '快手';
    bar();
}

var myName = '用户增长';
foo();

function bar() {
    console.log(this.myName); // 快手
}

function foo() {
    this.myName = '快手';
    bar.call(this);
}

var myName = '用户增长';
foo();
var name = 'window';
const person1 = {
    name: 'person1',
sayName: () => {
    console.log(this.name);
}
}
person1.sayName();


在JavaScript中，箭头函数并没有自己的this，它会捕获自己在定义时所处的上下文的this值，并在其作用域内使用。你的代码中，箭头函数是在全局上下文中定义的，所以this会指向全局对象。在浏览器环境中，全局对象是window，在Node.js环境中，全局对象是global。

所以，person1.sayName()的输出取决于你的运行环境和this.name在全局作用域下的值。在浏览器环境中，如果没有在全局作用域下定义name，那么输出应该是undefined。如果你在全局作用域下定义了name（比如var name = 'window'），那么输出就应该是'window'。

在Node.js环境中，全局变量需要使用global.name进行定义，所以即使你用var name = 'window'，输出还是undefined，因为var name在Node.js环境下并不会绑定到全局对象global。

总的来说，你的代码中person1.sayName()的输出有可能是'window'或者undefined，具体取决于运行环境和全局作用域下name变量的定义。
var a = 'globalA';
var obj = {
    a: 'objA',
    test
}
function test() {
    console.log(this.a)
}
obj.test(); // objA
const globalTest = obj.test;
globalTest(); // undefined | globalA
console.log('script start'); // 1
setTimeout(function() {
    console.log('setTimeout'); // 5
}, 0);
Promise.resolve().then(function() {
    console.log('promise1'); // 3
}).then(function() {
    console.log('promise2'); // 4
});
console.log('script end'); // 2
var x = +'1';
console.log(typeof x);
console.log(x)
var y = '1' + 2;
console.log(typeof y);
console.log(y);

number
1     
string
12    
<div id="father">
    <div id="child">
        123
    </div>
</div>

document.getElementById('father').addEventListener('click', function(event) {
    console.log('father');
})

document.getElementById('child').addEventListener('click', function(event) {
    console.log('child');
})
if(!("a" in window)) {
    var a = 1;
}
alert(a);    //    undefiend
因为 "a" 事实上是存在于 window 对象中的（因为它已经被声明了--变量提升），所以 ("a" in window) 的结果为 true。因此，a = 1 这一句并未被执行，所以 a 的值保持为 undefined。
var name = "222"
var a = {
        name: "111",
    say: function(){
    console.info(this.name);
}
}
var fun = a.say;
fun(); // undefined
a.say(); // 111

var b = {
    name: "333",
    say: function(fun) {
        fun();
    }
}
b.say(a.say); // undefined
b.say = a.say;
b.say(); // 333
for(var i = 0; i < 5; i++){
    setTimeout(function(){
        console.log(i);
    },1000);
} // 5 5 5 5 5
for(var i = 0; i < 5; i++){
    (function(i){
        setTimeout(function(){
            console.log(i);
        },1000);
    })(i);
}
console.log(i); // 5 0 1 2 3 4
new Promise((resolve, reject) => {
    reject(1);
    console.log(6); // 1
}).catch(() => {
    console.log(2); // 3
}).then(() => console.log(3), // 4
    (v) => console.log(v))
    .then(console.log)
console.log(5); // 2
console.log([] == []) //false
console.log([] === []) //false
["1", "2", "3"].map(parseInt)

// A. ["1", "2", "3"]
// B. [1, 2, 3]
// C. [0, 1, 2]
// D. other
在JavaScript中，`Array.prototype.map`方法会把数组中的每个元素都执行给定的函数，并返回一个新数组。然而，使用`parseInt`函数可能不会像您想象的那样工作，原因是`map`函数为它提供了三个参数：当前元素、元素的索引和原始数组，而`parseInt`接受两个参数：字符串和基数。

因此，对于数组['1', '2', '3']，执行`.map(parseInt)`将产生以下结果：

- 对于元素 '1', `parseInt('1', 0)`，0表示将根据字符串决定基数，对于字符串开头为'1'到'9'，基数为10，所以返回1。
- 对于元素 '2', `parseInt('2', 1)`，1是非法的基数，所以返回NaN。
- 对于元素 '3', `parseInt('3', 2)`，2是有效的基数，但'3'在二进制中是非法的，所以返回NaN。

所以，输出是 `[1, NaN, NaN]`。
function Animal (){
const cat = new Animal ()
Animal.prototype = { bark: true }
const dog = new Animal ()
console.log (cat.bark) // undefine
console.log (dog.bark) // true
//创建对象后原型链会锁定
```

https://mp.weixin.qq.com/s/hZkLk60nYQrj2ZN80-PbJQ 44道JS难题，做对一半就是高手

http://javascript-puzzlers.herokuapp.com/