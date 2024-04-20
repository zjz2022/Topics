前端面经（Js部分）

## (一) 语法

### 1.1 数据类型

分为基本数据类型和引用数据类型，其中基本数据类型包括Undefined、Null(typeof = Object)、Boolean、Number、**String** 5种，ES6中新增一种新的基本数据类型Symbol、bigint；引用数据类型含有Object、Function、Array、Date等类型，引用类型存在堆内存，引用数据类型会在栈中存储一个指针，这个指针指向堆内存空间中该实体的起始地址，这段内存如果没有强引用时会被GC垃圾回收。

 **1）var let const的区别**

 var特点：1.存在变量提升(声明式的class不存在)； 2.一个变量可多次声明，后面的声明会覆盖前面的声明； 3.函数中使用var声明变量的时候，该变量是局部的； 4.函数内不使用var，该变量是全局的；5.win对象

 let特点：1.不存在变量提升，声明前该变量不能使用（暂时性死区）；2.let在块级作用域(词法作用域)内有效；3.let不允许在相同作用域中重复声明，不同作用域有重复声明不会报错；4. 在全局作用域声明不会被当作window对象的属性，但var会；5.由于是块级作用域，会更早的进入GC。

 const特点：1.const声明一个只读的变量，声明后，值就不能改变； 2.const必须初始化；3.const并不是变量的值不能改动，而是变量指向的内存地址所保存的数据不得改动；4.let该有的特点const都有；

 ES5里想实现const需要通过Obj.defineProperty

 原理：

```
JS 引擎在读取变量时，先找到变量绑定的内存地址，然后找到地址所指向的内存空间，最后读取其中的内容。当变量改变时，JS 引擎不会用新值覆盖之前旧值的内存空间（虽然从写代码的角度来看，确实像是被覆盖掉了），而是重新分配一个新的内存空间来存储新值，并将新的内存地址与变量进行绑定，JS 引擎会在合适的时机进行 GC，回收旧的内存空间。
const 定义变量（常量）后，变量名与内存地址之间建立了一种不可变的绑定关系，阻隔变量地址被改变，当 const 定义的变量进行重新赋值时，根据前面的论述，JS 引擎会尝试重新分配新的内存空间，所以会被拒绝，便会抛出异常。
```

 **2）symbol的应用场景**

- 使用Symbol来作为对象属性名(key)、类属性名定义私有变量。Symbol类型的key是不能通过Object.keys()或者for...in来枚举的，它未被包含在对象自身的属性名集合(property names)之中。所以，利用该特性，我们可以把一些不需要对外操作和访问的属性使用Symbol来定义。
- 使用Symbol来替代常量**const** TYPE_AUDIO = 'AUDIO' ==> const TYPE_AUDIO = Symbol()
- 利用Symbol.for()注册和获取全局Symbol

 **3）Number浮点计算**

 JS采用了IEEE 754数值一个浮点型数在计算机中的表示，它总共长度是64位，其中最高位为符号位，接下来的11位为指数位，最后的52位为小数位，即有效数字的部分。

 在进行浮点型运算时，首先将各个浮点数的小数位按照“乘2取整，顺序排列”的方法转换成二进制表示。

 可以通过parseInt或Number进行转化，使用parseInt会去掉字符串前后的空格。

 **4）new String() 和 string**

 在JS中的变量在内存中的存储有两种形式，值类型存储和引用类型存储。String在JS中是基本类型，基本类型是存储在栈(stack)内存中的,数据大小确定，内存空间大小可以分配。而引用类型是存储在堆(heap)内存中的, 栈中存在的仅仅是一个堆的指针，是new String()指向一个地址，而正真的实例对象在堆中。所以我们可以为它添加一些属性和方法。

 str.indexOf === String.prototype.indexOf //true

首先，它会从内存中读取str 的值。后台是这样进行的：创建String类型的一个实例；在实例上调用指定的方法；销毁这个实例，因此String可迭代；

### 1.2 ==号

这么理解： 当进行双等号比较时候： 先检查两个操作数数据类型，如果相同， 则进行===比较， 如果不同， 则愿意为你进行一次类型转换， 转换成相同类型后再进行比较， 而===比较时， 如果类型不同，直接就是false。

双等号==： 来进行一般比较检测两个操作数是否相等，可以允许进行类型转换

（1）如果两个值类型相同，再进行三个等号(===)的比较

（2）如果两个值类型不同，也有可能相等，需根据以下规则进行类型转换在比较：

1）如果一个是null，一个是undefined，那么相等

2）如果一个是字符串，一个是数值，把字符串转换成数值之后再进行比较

三等号===:

（1）如果类型不同，就一定不相等

（2）如果两个都是数值，并且是同一个值，那么相等；如果其中至少一个是NaN，那么不相等。（判断一个值是否是NaN，只能使用isNaN( ) 来判断）

（3）如果两个都是字符串，每个位置的字符都一样，那么相等，否则不相等。

（4）如果两个值都是true，或是false，那么相等

（5）如果两个值都引用同一个对象或是函数，那么相等，否则不相等

（6）如果两个值都是null，或是undefined，那么相等

注意：

undefined 与 null 比较特殊 要比较相等性之前，不能将 null 和 undefined 转换成其他任何值

undefined 和 null 互相比较返回 true，和自身比较也返回 true，其他情况返回 false

参考：

https://zhuanlan.zhihu.com/p/115298832

https://www.cnblogs.com/bryanfu/p/15063999.html

### 1.3 null | undefined

null：空对象指针，可用于判断真假

```
js 在底层存储变量的时候，会在变量的机器码的低位1-3位存储其类型信息。000：对象010：浮点数100：字符串110：布尔1：整数。null：所有机器码均为0因此判断为object。undefined：用 −2^30 整数来表示
typeof [] === 'array' // false obj
typeof null === object // true
typeof undefined = undefined
typeof class = function
```

① 是 JavaScript 基本类型之一，特指对象的值未设置，是表示缺少的标识，指示变量未指向任何对象，把 null 看为尚未创建的对象，也许更好理解；② 是一个字面量，不像 undefined，它不是全局对象的一个属性；③ 在布尔运算中被认为是 false；④ 与其他任何对象一样永远不会被 JavaScript 隐式赋值给变量。

判断null：`!tmp && typeof(tmp)!="undefined" && tmp!=0` 或者是 ===

 undefined:

① 是 JavaScript 基本类型之一，表示 “缺少值”，就是此处应该有一个值，但是还没有定义；② 是 JavaScript 在运行时创建的全局变量，是全局对象的一个属性；③ 在布尔运算中被认为是 false。

（1）变量被声明但没有赋值时，就等于 undefined。

（2）对象的某个属性没有赋值时，该属性的值为 undefined。

（3）调用函数过程中，应该提供的参数没有提供时，该参数就等于 undefined。

（4）函数没有返回值时，默认返回 undefined。

参考：

[Symbol() 的使用方法 - sjpqy - 博客园 (cnblogs.com)](

### 1.4 Proxy

 ES6中新增了Proxy对象，从字面上看可以理解为代理器，主要用于改变对象的默认访问行为，实际表现是在访问对象之前增加一层拦截，任何对对象的访问行为都会通过这层拦截。在拦截中，我们可以增加自定义的行为。它实际是一个构造函数，接收两个参数，一个是目标对象target；另一个是配置对象handler，用来定义拦截的行为。

**注意：**

 如果在target中使用了this关键字，再通过Proxy处理后，this关键字指向的是Proxy的实例，而不是目标对象target。

```js
const person = {
    getName: function () {
        console.log(this === proxy);
    }
};

const proxy = new Proxy(person, {});

proxy.getName();  // true
person.getName(); // false
```

使用场景：实现真正的私有、读取不存在时警告、读取负索引、属性拦截等。



 Reflect 意思是反射，反射是在程序运行中获取和动态操作自身内容的一项技术。与Proxy对象不同的是，Reflect对象本身并不是一个构造函数，而是直接提供静态函数以供调用，Reflect对象的静态函数一共有13个，和Proxy呼应。

### 1.5 Promise

 Promise 构造函数是 JavaScript 中用于创建 Promise 对象的内置构造函数。Promise 构造函数接受一个函数作为参数，该函数是同步的并且会被立即执行，所以我们称之为起始函数。起始函数包含两个参数 resolve 和 reject，分别表示 Promise 成功和失败的状态。一个 promise 对象初始化时的状态是 **pending**，调用了 resolve 后会将 promise 的状态扭转为 **fulfilled**，调用 reject 后会将 promise 的状态扭转为 **rejected**，这两种扭转一旦发生便不能再扭转该 promise 到其他状态。

 在Promise链中then()也可以返回promise对象，只有return pending状态可以**中断promise链**。

 异步实现通过then()查看pending，并将callback传给Promise对象。

 起始函数执行成功时，它应该调用 resolve 函数并传递成功的结果。当起始函数执行失败时，它应该调用 reject 函数并传递失败的原因。Promise 构造函数返回一个 Promise 对象，该对象具有以下几个方法：

- then：用于处理 Promise 成功状态的回调函数。
- catch：用于处理 Promise 失败状态的回调函数。
- finally：无论 Promise 是成功还是失败，都会执行的回调函数。

```
reject 是 Promise 的方法,而 catch 是 Promise 实例的方法
reject 是用来抛出异常，catch 是用来处理异常
reject 是 Promise 的方法，而 catch 是 Promise 实例的方法
reject后的东西，一定会进入then中的第二个回调，如果then中没有写第二个回调，则进入catch
网络异常（比如断网），会直接进入catch而不会进入then的第二个回调
```

- Promise.all

 该方法接收一个Promise数组返回一个Promise，只有当该数组中的所有Promise完成后才会由pendding状态变为resolve执行then里面的回调函数，若数组中有任意一个promise被拒绝则会执行失败回调，catch方法会捕获到首个被执行的 reject函数。该方法获得的成功结果的数组里面的数据顺序和接收到的promise数组顺序是一致的。

- Promise.any

 当传入的promise数组中有任意一个完成时就会终止，会忽略到所有被拒绝掉的promise，直到第一个promise完成。若传入所有的promise被拒绝则会执行拒绝回调。

- Promise.race

 当promise数组中任意一个promise被拒绝或者成功，则会采用第一个promise作为他的返回值。若为成功的执行then，若失败则执行catch。

- Promise.allSettled

 当给定的promise数组中的所有promise被拒绝后会返回一个拒绝的promise数组，与[]一一对应。



**async/await**

 async/await 是ES2017(ES8)提出的基于Promise的解决异步的最终方案，使异步编程看起来像同步编程，是一个语法糖。

 async是一个加在函数前的修饰符，被async定义的函数会默认返回一个Promise对象resolve的值。因此对async函数可以直接then，返回值就是then方法传入的函数。

 await 也是一个修饰符，只能放在async定义的函数内。可以理解为等待。await 修饰的如果是Promise对象：可以获取Promise中返回的内容（resolve或reject的参数），且取到值后语句才会往下执行；如果不是Promise对象：把这个非promise的东西当做await表达式的结果。

 实现原理：

```js
function request(url){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(url)
        },500)
    })
}


async function run(){
    const res1 = await request(1); // await接受一个promise对象
    const res2 = await request(res1);
    console.log(res2);
}
run() // 等待1s后得到结果1
//利用generator实现
function* generate(){
    const res1 = yield request(1); 
    const res2 = yield request(res1);
    console.log(res2)
}
const g = generate()
const {value:val1, done:done1} = g.next() 
val1.then(res=>{
    const {value:val2, done:done2} = g.next(res)
    val2.then((res2)=>{
        console.log(res2)
        g.next(res2)
    })
})
//使用递归实现
function run(){
	const g = generate()
    function exec(params){
        const {value, done} = g.next(params)
        if(!done){
            value.then(res=>exec(res))
        }
    }
}
```

 参考：

- js常见面试题——详解Promise使用与原理及实现过程（附源码） https://blog.csdn.net/weixin_56134381/article/details/115868041

### 1.6 defer|async

**异步加载：**

 当浏览器碰到 script 脚本的时候：

```
<script src="script.js"></script>
```

 没有 defer 或 async，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。

```
<script async src="script.js"></script>
```

有 async，加载和渲染后续文档元素的过程将和 script.js 的**加载与执行并行进行**（异步）。脚本加载完成后，文档停止解析，脚本执行，执行结束后文档继续解析。

```
<script defer src="myscript.js"></script>
```

有 defer，**加载**后续文档元素的过程将和 script.js 的加载并行进行（异步），但是 script.js 的**执行**要在所有文档解析完成之后，DOMContentLoaded 事件触发之前完成。**他的优点不是增加JS的并发下载数量，而是做到下载时不block解析HTML。**

然后从实用角度来说呢，首先把所有脚本都丢到 </body> 之前是最佳实践，因为对于旧浏览器来说这是唯一的优化选择，此法可保证非脚本的其他一切元素能够以最快的速度得到加载和解析。

**插入位置：**

将script放在<head>里，浏览器解析HTML，发现script标签时，会先下载完所有这些script，再往下解析其他的HTML。浏览器最多同时下载两个Js文件。

将script放在尾部的缺点，是浏览器只能先解析完整个HTML页面，再下载JS。

首先声明。这在</body>之后插入其他元素，从HTML 2.0起就是不合标准的。

带async的脚本一定会在load事件之前执行，可能会在DOMContentLoaded之前或之后执行。

情况1： HTML 还没有被解析完的时候，async脚本已经加载完了，那么 HTML 停止解析，去执行脚本，脚本执行完毕后触发DOMContentLoaded事件

情况2： HTML 解析完了之后，async脚本才加载完，然后再执行脚本，那么在HTML解析完毕、async脚本还没加载完的时候就触发DOMContentLoaded事件

**defer 和 async 的区别**

 带async的脚本一定会在load事件之前执行，可能会在DOMContentLoaded之前或之后执行。

 情况1： HTML 还没有被解析完的时候，async脚本已经加载完了，那么 HTML 停止解析，去执行脚本，脚本执行完毕后触发DOMContentLoaded事件

 情况2： HTML 解析完了之后，async脚本才加载完，然后再执行脚本，那么在HTML解析完毕、async脚本还没加载完的时候就触发DOMContentLoaded事件

 如果 script 标签中包含 defer，那么这一块脚本将不会影响 HTML 文档的解析，而是等到 HTML 解析完成后才会执行。而 DOMContentLoaded 只有在 defer 脚本执行结束后才会被触发。

 情况1：HTML还没解析完成时，defer脚本已经加载完毕，那么defer脚本将等待HTML解析完成后再执行。defer脚本执行完毕后触发DOMContentLoaded事件

 情况2：HTML解析完成时，defer脚本还没加载完毕，那么defer脚本继续加载，加载完成后直接执行，执行完毕后触发DOMContentLoaded事件

https://zhuanlan.zhihu.com/p/25876048

### 1.7拷贝

 浅克隆由于只克隆对象最外层的属性，如果对象存在更深层的属性，则不进行处理，这就会导致克隆对象和原始对象的深层属性仍然指向同一块内存。

 **1）浅克隆**

- 简单的引用复制，即遍历对象最外层的所有属性，直接将属性值复制到另一个变量中。
- ES6的Object.assign()函数

*当对象中只有一级属性，没有二级属性的时候，*`*Object.assign()*`*方法为深拷贝，但是对象中有对象的时候，此方法在二级属性以后就是浅拷贝。*

 浅克隆实现方案都会存在一个相同的问题，即如果原始对象是引用数据类型（数组、对象、函数、Date、RegExp）的值，则对克隆对象的值的修改会影响到原始对象的值。

- 利用解构{...obj}
- arr.slice(0) 拷贝数组

 **2）深克隆**

- 拓展运算符
- JSON序列化和反序列化

 如果一个对象中的全部属性都是可以序列化的，那么我们可以先使用JSON.stringify()函数将原始对象序列化为字符串，再使用JSON.parse()函数将字符串反序列化为一个对象，这样得到的对象就是深克隆后的对象。

```js
var origin = {
   a: 1,
   b: [2, 3, 4],
   c: {
       d: 'name'
   }
};
// 先反序列化为字符串，再序列化为对象，得到深克隆后的对象
var result = JSON.parse(JSON.stringify(origin));

console.log(origin); // { a: 1, b: [ 2, 3, 4 ], c: { d: 'name' } }
console.log(result); // { a: 1, b: [ 2, 3, 4 ], c: { d: 'name' } }
```

 这种方法能够解决大部分JSON类型对象的深克隆问题，但是对于以下几个问题不能很好地解决。

 (1) 无法实现对函数、RegExp等特殊对象的克隆。

 (2) 对象的constructor会被抛弃，所有的构造函数会指向Object，原型链关系断裂。

 (3) 对象中如果存在循环引用，会抛出异常。

- jQuery实现——![.clone()函数和](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/equationtex=.svg+xml).extend()函数

 在jQuery中提供了一个![.clone()函数，但是它是用于复制DOM对象的。真正用于实现克隆的函数是](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/equationtex=.svg+xml).extend()，使用$.extend()函数可以实现函数与正则表达式等类型的克隆，还能保持克隆对象的原型链关系，解决了深克隆中存在的3个问题中的前两个，但是却无法解决循环引用的问题。

- 自定义实现深克隆

```js
function deepCopy(obj) {
    let copy;

    //处理3种简单的类型，和null和undefined
    if (null == obj || "object" != typeof obj) return obj;

    // 处理Date|Array|Object
    structuredClone(obj)
    
    
    //处理Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    //处理Array
    if (obj instanceof Array) {
        copy = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = deepCopy(obj[i]);
        }
        return copy;
    }

    //处理Object
    if (obj instanceof Object) {
        copy = {};
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = deepCopy(obj[attr]);
        }
        return copy;
    }
    
    //处理function
    // 方式1， 很多函数库都是用这个方法
	var closeFunc = new Function('return ' + func.toString())();

	// 方式2 // 利用bind 返回函数
	var closeFunc = func.prototype.bind({});

    throw new Error("Unable to copy obj! Its type isn't supported.");
}
```

### 1.8 生成|迭代器

**迭代器原理**1.可迭代对象:具有专用迭代器方法(Symbol.iterator),且该方法返回迭代器对象的对象

2.迭代器对象:具有next()方法,且返回值为迭代结果对象

3.迭代结果对象:具有属性value和done的对象

迭代流程1.调用其迭代器,获得迭代对象

2.重复调用迭代器对象的next()方法

3.直至返回done为true的迭代结果对象

**生成器**

迭代器这个概念固然是好的,但是他的创建和使用会让事情变得有些复杂,因此提出生成器概念,来简化自定义迭代器的创建。

generator 函数是协程在 ES6 的实现。协程简单来说就是多个线程互相协作，完成异步任务。

1.通过在函数名前加一个*的方式创建一个生成器函数，并进入suspended状态

2.调用生成器获取一个生成器对象(调用生成器函数并不会执行该函数,而是会返回一个生成器对象,该生成器对象本质是一个迭代器)

3.调用它的next()方法进入native状态,会使生成器函数的函数体从当前位置开始执行,直到遇到一个yield语句

4.yield语句的值会成为调用迭代器的next()方法的返回值

5.可以通过.return() |.throw() 提前关闭

注:**不能使用箭头函数定义生成器函数**，**async函数却可以**

### 1.9 定时器

sleep函数实现：

```js
function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));}
async function delayedGreeting() {
  console.log('Hello');
  await sleep(2000);
  console.log('World!');
}
```

面试题：JS 中的计时器不能做到精确计时吗

1. 计算机硬件没有原子钟，无法做到精确计时
2. 操作系统的计时函数本身就有少量偏差，由于 JS 的计时器最终调用的是操作系统的函数，也就携带了这些偏差
3. 按照 W3C 的标准，浏览器实现计时器时，如果嵌套层级超过 5 层，则会带有 4 毫秒的最少时间，这样在计时时间少于 4 毫秒时又带来了偏差
4. 受事件循环的影响，计时器的回调函数只能在主线程空闲时运行，因此又带来了偏差

`setInterval()` 是window对象下内置的一个方法，接受两个参数，第一个参数允许是一个函数或者是一段可执行的 JS 代码，第二个参数则是执行前面函数或者代码的时间间隔；

- setInterval 的最短间隔时间是10毫秒， 也就是说，小于10毫秒的时间间隔会被调整到10毫秒

```js
var obj = {
    fun:function(){
        this ;
    }
}
setInterval(obj.fun,1000);      // this指向window对象,隐式丢失
setInterval('obj.fun()',1000);  // this指向obj对象
// 方式1 解决隐式丢失
setTimeout(obj.a.bind(obj), 1000);
// 方式2
setTimeout(function() {
  obj.a();
}, 1000);
```

- setTimeout 的最短时间间隔是4毫秒

调用setTimeout()或setlnterval()时创建的计时器会被放入定时器观察者内部的红黑树中，每次Tick时，会从该红黑树中检查定时器是否超过定时时间，超过的话，就立即执行对应的回调函数。

setTimeout())和setlnterval()都是当定时器使用，他们的区别在于后者是重复触发，而且由于时间设的过短会造成前一次触发后的处理刚完成后一次就紧接着触发。

由于定时器是超时触发，这会导致触发精确度降低，比如用setTimeout设定的超时时间是5秒，当事件循环在第4秒循到了一个任务，它的执行时间3秒的话，那么setTimeout的回调函数就会过期2秒执行，这就是造成精度降低的原因。

并且由于采用红黑树和迭代的方式保存定时器和判断触发，较为浪费性能。

**优化精度：**

使用process.nextTick()所设置的所有回调函数都会放置在数组中，会在下一次Tick时所有的都立即被执行，该操作较为轻量，时间精度高。setlmmediate()设置的回调函数也是在下一次Tick时被调用，其和process.nextTick0)的区别在于两点:1.他们所属的观察者被执行的优先级不一样process.nextTick()属于idle观察者,setlmmediate()属于check观察者，idle的优先级>check。2.setlmmediate()设置的回调函数是放置在一个链表中，每次Tick只执行链表中的一个回调。这是为了保证每次Tick都能快速地被执行

3.使用webworkers

在node中，所有的异步任务都会有一个观察者，操作系统会询问这个观察者，你这个异步任务执行完了没有，如果执行完了我就执行你对应的回调函数了，如果没执行完，那没关系，我下个循环再来问你一下。

而操作系统询问观察者是有顺序的，观察者分为idle观察者、check观察者和I/O观察者，每一轮循环检查中，询问观察者的顺序是idel观察者 > I/O观察者 > check观察者，而process.nextTick属于idel观察者，setImmediate属于check观察者，所以process.nextTick会先执行。

**当浏览器设为不可见状态时**，浏览器自身会对定时器进行优化导致定时器不准。谷歌浏览器中，当页面处于不可见状态时，`setInterval`的最小间隔时间会被限制为1s。火狐浏览器的`setInterval`和谷歌特性一致。ie浏览器没有对不可见状态时的`setInterval`进行性能优化，不可见前后间隔时间不变。

可以通过`webWorkers`创建一个独立的线程进行解决。还可以解决一个页面存在多个定时器时候间隔时间误差较大的问题。

```js
//专用线程由 Worker()方法创建，可以接收两个参数，第一个参数是必填的脚本的位置，第二个参数是可选的配置对象，可以指定 type、credentials、name 三个属性。
var worker = new Worker('worker.js', { name: 'dedicatedWorker'})
worker.onmessage = function(event) {
    document.getElementById("result").innerHTML = event.data;};
//由于 web worker 位于外部文件中，它们无法访问下列 JavaScript 对象：window,document,parent
```

`setTimeout`函数在JavaScript中用于设定一个特定的延迟后执行某个函数或代码。但有时候，实际的延迟时间可能会大于你设定的时间。这种情况通常是由于以下几个原因导致的：

1. JavaScript单线程模型： JavaScript是单线程的，这意味着在一个时间内只能执行一个任务。如果在调用setTimeout之前的任务需要的时间超过了你设定的延迟时间，那么setTimeout中的函数会等待这些任务执行完毕才会被执行。
2. 浏览器或者环境的因素： 在某些情况下，例如标签页处于后台，或电脑进入睡眠状态，浏览器可能会降低或暂停JavaScript的执行，这会影响setTimeout的精确性。

这是几个可能的解决方案：

1. 使用requestAnimationFrame： 如果你的代码与渲染或动画有关，那么使用requestAnimationFrame可能是更好的选择。它会在浏览器准备进行下一次渲染时运行你的代码，从而达到更精确控制的效果。
2. 使用Web Workers： Web Workers提供了在浏览器后台运行代码的能力，这个后台线程是完全独立的，可以让你的setTimeout不受主线程阻塞的影响。
3. 优化你的代码： 减少执行的任务或者优化代码，使得在setTimeout之前的代码能够更快地运行。

记住，`setTimeout`不能保证精确的时间延迟，所以在需要精确计时的情况下，可能需要寻找其他的解决方案，如使用`performance.now`来获取更精确的时间戳。

```js
function requestAnimationFrameTimeout(fn, delay) {
    let start = performance.now();
    let handle = null;
    function loop(now) {
        if (now - start >= delay) {
            cancelAnimationFrame(handle);
            fn();
        } else {
            handle = requestAnimationFrame(loop);
        }
    }
    handle = requestAnimationFrame(loop);
    return {
        cancel: function() {
            cancelAnimationFrame(handle);
        }
    };
}
// 使用示例
let timeout = requestAnimationFrameTimeout(() => {
    console.log("Hello, world!");
}, 2000);

// 取消定时器
timeout.cancel();
```

https://juejin.cn/post/6899796711401586695

https://juejin.cn/post/6844903736238669837#heading-4

### 1.10 严格模式

'use strict' 是用于对整个脚本或单个函数启用严格模式的语句。严格模式是可选择的一个限制 JavaScript 的变体一种方式 。**优点：**

- 无法再意外创建全局变量。
- 会使引起静默失败（silently fail，即：不报错也没有任何效果）的赋值操抛出异常。
- 试图删除不可删除的属性时会抛出异常（之前这种操作不会产生任何效果）。
- 要求函数的参数名唯一。
- 全局作用域下，this的值为undefined。
- 捕获了一些常见的编码错误，并抛出异常。
- 禁用令人困惑或欠佳的功能。

**缺点：**

- 缺失许多开发人员已经习惯的功能。
- 无法访问function.caller和function.arguments。
- 以不同严格模式编写的脚本合并后可能导致问题。

### 1.11 TS

 TypeScript 是 JavaScript 的类型的超集，支持ES6语法，支持面向对象编程的概念，如类、接口、继承、泛型等。主要是为了在编译阶段 catch 掉所有类型错误。

**TypeScript 的特性主要有如下：**

- 类型批注和编译时类型检查 ：在编译时批注变量类型
- 类型推断：ts 中没有批注变量类型会自动推断变量的类型
- 类型擦除：在编译过程中批注的内容和接口会在运行时利用工具擦除
- 接口：ts 中用接口来定义对象类型
- 枚举：用于取值被限定在一定范围内的场景
- Mixin：可以接受任意类型的值
- 泛型编程：写代码时使用一些以后才指定的类型
- 名字空间：名字只在该区域内有效，其他区域可重复使用该名字而不冲突
- 元组：元组合并了不同类型的对象，相当于一个可以装不同类型数据的数组

**TS 高级类型：**

Partial：转为可选型｜undefined

Required：转化为必选

Exclude<T, U>：排除 U 中的某个 T，针对联合类型

Omit<T, K extends keyof any>：删除某个接口的字段

NonNullable< T >：过滤掉 联合类型 中的 null 和 undefined 类型

Record：以 typeof 格式快速创建一个类型，此类型包含一组指定的属性且都是必填。

Pick：从类型定义的属性中，选取指定一组属性，返回一个新的类型定义。

Readonly：只读，不可以被修改

**as ！区别：**

1、`as`和`!`用于属性的读取，都可以缩小类型检查范围，都做判空用途时是等价的。只是`!`具体用于告知编译器此值不可能为空值（`null`和`undefined`），而`as`不限于此。

2、`?`可用于属性的定义和读取，读取时告诉编译器此值可能为空值（`null`和`undefined`），需要做判断。

**JSDoc：**

 很多开发人员之所以选择 TypeScript，是因为强类型可以减少错误，并通过代码完成和弹出帮助等功能改善代码编辑器中的开发体验。但是使用 TypeScript 会带来额外的工具。例如，如果在 TypeScript 中构建一个库，并在另一个项目中使用该库，就不能只修改代码库还需要重新构建代码。

 而 JSDoc 也可以用于类型检查。JSDoc 是一种用于在 JavaScript 代码中编写文档和类型注释的标记语言，它使用类似于JavaDoc 的注释语法。通过在代码中添加特定的注释标记，可以生成文档，提高代码的可读性和可维护性。JSDoc不仅可以描述函数的参数和返回值类型，还可以用来描述类、对象、模块和命名空间等各种 JavaScript 实体的属性和方法。

- **渐进式采用**：可以逐渐向代码库添加JSDoc，这样可以逐步将类型检查和文档引入项目，而无需完全采用TypeScript。
- **无需构建步骤**：JSDoc不像TypeScript那样需要构建步骤进行类型检查和转译。

### 1.12 Map和{}

1 对于 `Object` 而言，它键（key）的类型只能是字符串，数字或者 `Symbol`(如果给对象传入其他类型会通过String转换成字符串)；而对于 `Map` 而言，它可以是**任何类型**。（包括 Date，Map，或者自定义对象，因为输入会通过hash运算转变为数字）

2 Map` 中的元素会保持其插入时的顺序；而 Object则不会完全保持插入时的顺序，而是根据如下规则进行排序:

- **非负整数**会最先被列出，排序是从小到大的数字顺序
- 然后所有字符串，负整数，浮点数会被列出，顺序是根据插入的顺序
- 最后才会列出 `Symbol`，`Symbol` 也是根据插入的顺序进行排序的

3 读取 `Map` 的长度很简单，只需要调用其 `.size()` 方法即可；而读取 `Object` 的长度则需要额外的计算： `Object.keys(obj).length`

4 Map 是**可迭代对象**，所以其中的键值对是可以通过 `for of` 循环或 `.foreach()` 方法来迭代的；而普通的对象键值对则默认是不可迭代的，只能通过 `for in` 循环来访问（或者使用 `Object.keys(o)、Object.values(o)、Object.entries(o)` 来取得表示键或值的数字）迭代时的顺序就是上面提到的顺序。

5 在 `Map` 中新增键时，不会覆盖其原型上的键；而在 `Object` 中新增键时，则有可能覆盖其原型上的键:

```js
Object.prototype.x = 1;
const o = {x:2};
const m = new Map([[x,2]]);
o.x; *// 2，x = 1 被覆盖了*
m.x; *// 1，x = 1 不会被覆盖*
```

6 `JSON` 默认支持 `Object` 而不支持 `Map`。若想要通过 `JSON` 传输 `Map` 则需要使用到 `.toJSON()` 方法，然后在 `JSON.parse()` 中传入**复原函数**来将其复原。

7 Map在频繁增删键值对的场景下表现更好。

8 内存占用： Map可以比Object多存储50%的键值对。

9 查找：Object更好

Weakmap对key是弱引用，其键只能是Object，不影响垃圾回收器的工作。一旦key被回收，对应的键和值就访问不到了。如果使用map，即便用户对目标对象没有任何引用，这个目标对象也不会被回收，会导致内存溢出。

### 1.13 装饰器

 **装饰模式**（Decorator Pattern）允许向一个现有的对象添加新的功能，同时又不改变其结构。 这种模式属于**结构型模式**，它是作为现有的类的一个包装。 这种模式创建了一个**装饰**类，用来包装原有的类，并在保持类方法签名完整性的前提下，提供了额外的功能。

 装饰器其实就是一个函数，通常放在类和类方法的前面，不能用于函数，因为存在函数提升。

优点：

1. 不需要通过创建子类的方式去拓展功能（不需要子类化），这样可以避免代码臃肿的问题
2. 装饰类的方法复用性很高
3. 不会影响到原对象的代码结构

### 1.14 typeOf|inst...

typeof运算符返回一个字符串，表示操作数的类型，typeof可以精准的判断基本数据类型（null）除外

```js
typeof 666 // 'number'
typeof '666' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof null // 'object'
typeof [] // 'object'
typeof {} // 'object
```

instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

内部实现机制是：通过判断对象的原型链上是否能找到对象的 `prototype`，来确定 `instanceof` 返回值

```js
console.log(Object instanceof Object) //true 
console.log(Function instanceof Function) //true 
console.log(Number instanceof Number) //false 
console.log(String instanceof String) //false 
console.log(Array instanceof Array) // false
 
console.log(Function instanceof Object) //true 
 
console.log(Foo instanceof Function) //true 
console.log(Foo instanceof Foo) //false
```

### 1.15 Weak...

**weakMap**

 与WeakSet不同的是WeakMap中存储的是键值对，WeaMap对键是弱引用的，值是正常引用，如果键在其他地方不被引用时，垃圾回收机制就会自动回收这个对象所占用的内存空间，同时移除WeakMap中的键值对，但键名对应的值如果是一个对象，则保存的是对象的强引用，不会触发垃圾回收机制被回收。

- WeakMap中存储的是许多键值对的无序列表，列表的键名必须是非null的对象，对应的值可以是任意类型
- WeaMap对键名是弱引用的，键值是正常引用
- 因为垃圾回收机制可能随时清除其中的对象，所以不可以进行forEach( )遍历等操作
- 因为弱引用，WeaMap 结构没有keys( )，values( )，entries( )等方法和 size 属性

 ES5中我们经常利用立即执行函数的方式来设置私有变量，但问题是私有变量不会随着实例对象的销毁被回收，WeakMap正好可以解决这个问题。

**weakSet**

- WeakSet结构同样不会存储重复的值，它的成员只能是对象类型。
- 因为垃圾回收机制可能随时清除其中的对象，所以不可以进行forEach()遍历、for-of循环等迭代操作
- 因为弱引用， WeakSet 结构没有keys()，alues()，entries()等方法和size属性

由于弱引用带来的限制，WeakSet只支持三种基本操作。

- add(value)：向 WeakSet 实例添加一个新成员。
- delete(value)：清除 WeakSet 实例的指定成员。
- has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。

 WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。具体一个场景就是存储DOM对象，当我们存储的DOM对象元素被另外一段脚本移除，我们也不想保留这些元素的引用而造成内存泄漏，就可以使用WeakSet来存储。

**weakRef**

 在Python和JavaScript中，`weakref`库和 `WeakRef`对象的主要用途是创建弱引用。在许多场景中，程序设计者需要引用一个对象，但又不希望该引用阻止垃圾收集器回收这个对象。这就是弱引用发挥作用的地方。

 Python中的`weakref`库：这个库提供了工具来创建，使用和测试弱引用。例如，可以用它来实现多线程缓存。弱引用不会增加对象的引用计数，因此不会阻止被引用对象被垃圾收集。

 JavaScript中的`WeakRef`：`WeakRef`对象让你能够持有一个对象的弱引用，也就是说，引用不会阻止被引用的对象被垃圾收集器回收。这在处理循环引用或管理内存占用大的资源时很有用。比如，可以通过弱引用来实现一个大对象的缓存，当内存需要回收时，这个大对象就可以被释放。请注意，弱引用不能用于所有类型的对象。具体来说，只有那些可以被垃圾收集的对象才能被弱引用（全局对象、闭包中的对象、循环引用、正在使用的数据结构不可以被弱引用）。

 JavaScript 中的 `WeakRef` 主要用于管理那些占用大量内存但又可以在不影响程序运行的情况下被垃圾收集的对象。它们对于防止内存泄露和优化性能非常有用。以下是一些具体的应用场景：

1. 缓存机制：你可以使用 WeakRef 创建一个缓存系统，其中对象只在需要时才被保存。当内存压力增大时，这些对象可以被垃圾收集器自动回收，从而避免了内存泄漏。
2. 映射和集合：WeakRef 与 FinalizationRegistry 一起可以用来创建弱映射和弱集合，它们存储的元素不会阻止垃圾收集。这在处理大型数据集时特别有用，因为你可以安全地引用对象而不必担心内存泄漏。
3. 监听或观察模式：当你需要监听或观察一个对象，但又不希望这个监听或观察过程阻止该对象被垃圾收集时，WeakRef 可以派上用场。
4. 管理大型对象：如果你的应用使用了很多大型对象，比如图像或视频，那么 WeakRef 可以帮你管理它们的生命周期。当这些对象不再需要时，它们可以被自动回收。

虽然 `WeakRef` 很有用，但它也需要谨慎使用，因为过度依赖弱引用可能会导致代码难以理解和维护。此外，`WeakRef` 的行为可能会受到 JavaScript 引擎的垃圾收集策略的影响，这可能会导致一些不可预见的行为。

### 1.16 JSON 序列化

 序列化(Serialization)是将对象的状态信息转换为可以存储或传输的形式的过程。因为对象本身存储的只是一个地址映射，如果程序停止了，映射关系就没了，所以对象obj的内容需要保存或传输，就要将对象序列化。JSON.stringify()和JSON.parse()用来序列化和反序列化js对象。

 JSON数据有一定的格式要求，在JSON.stringify()序列化后，js对象会被规范为正确的JSON格式的字符串，属性名必须使用双引号，不能使用十六进制值，对象不能以，结尾。

- undefined、任意的函数以及 symbol 作为对象属性值时 JSON.stringify() 对跳过（忽略）它们进行序列化
- undefined、任意的函数以及 symbol 作为数组元素值时，JSON.stringify() 将会将它们序列化为 null
- undefined、任意的函数以及 symbol 被 JSON.stringify() 作为单独的值进行序列化时，都会返回 undefined
- 转换值如果有 toJSON() 函数，该函数返回什么值，序列化结果就是什么值，并且忽略其他属性的值。
- NaN 和 Infinity 格式的数值及 null 都会被当做 null。
- 序列化RegExp、Error、map等对象时会得到{}空对象。
- JSON.stringify()只能序列化对象的可枚举的自有属性

### 1.17 parseInt

parseInt() 函数可解析一个字符串，并返回一个整数。它会去掉开头的空格，检查正负号，如果是英文开头则返回NAN，数字开头则会取整。

```
parseInt(string, radix)
parseInt('123', 5) // 将'123'看作 5 进制数，返回十进制数 38 => 1*5^2 + 2*5^1 + 3*5^0 = 38
filterInt = function (value) { // 一种更好的判断方式
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) return Number(value);
  return NaN;
};
```

## (二) 数组

### 2.1 判断数组或类

 1 instanceof 运算符：用来确定一个对象实例的原型链上是否有原型。内部采用Symbol.hasInstance()实现。

 instanceof 的内部机制是通过判断对象的原型链中是不是能找到类型的prototype。

```js
var a =  [1, 2, 3];
console.log(a instanceof Array);  // true
console.log(a instanceof Object); // true

var b = {name: 'kingx'};
console.log(b instanceof Array);  // false
console.log(b instanceof Object); // true

//通过原型链
console.log(a.constructor === Array);  // true
console.log(a.constructor === Object); // false
console.log(b.constructor === Array);  // false
console.log(b.constructor === Object); // true
```

 2 toString()函数

 每一个继承 Object 的对象都有 toString 方法，如果 toString 方法没有重写的话，会返回[Object type]，其中 type 为对象的类型。但当除了 Object 类型的对象外，其他类型直接使用 toString 方法时，会直接返回都是内容的字符串，所以我们需要使用 call 或者 apply 方法来改变 toString 方法的执行上下文。

```js
var a = [1, 2, 3];
var b = {name: 'kingx'};
//Object输出函数体"function Object() { [native code] }"通过call将this指向obj）
console.log(Object.prototype.toString.call(a)); // [object Array]
console.log(Object.prototype.toString.call(b)); // [object Object]
```

 3 Array.isArray() 只能判断是否是数组

当检测 Array 实例时，Array.isArray 优于 instanceof ，因为 Array.isArray 可以检测出 iframes

```js
// 下面的函数调用都返回“true”
Array.isArray([]);
Array.isArray([1]);
Array.isArray(new Array());
// 鲜为人知的事实：其实 Array.prototype 也是一个数组。
Array.isArray(Array.prototype);
 
// 下面的函数调用都返回“false”
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undeﬁned);
Array.isArray(17);
Array.isArray('Array');
Array.isArray(true);

Array.prototype.isPrototypeOf([]); // true
Array.prototype.isPrototypeOf({}); // false

Object.prototype.isPrototypeOf([]); // true
Object.prototype.isPrototypeOf({}); // true
```

 4 typeof关键字只能判断函数和对象，不能判断数组和对象

### 2.2 数组方法

改变原数组内容：push...、reverse、splice、sort

不改变数组内容：concat、join(数组合并成字符串)、toString、slice、map...、findIndex

-  如果你需要一个数据，请使用—> map()方法
-  如果你需要一个结果，请使用—> reduce()方法
-  如果你需要过滤一个结果，请使用—> filter()方法

**map()** 对数组的每个元素都遍历一次，同时返回一个新的值（不改变原数组），注：返回的数据长度和原始数据长度是一致的。

```js
// map() 方法的使用
let nums =[10,20,30,40,50]
let newnums = nums.map(function(n){
    return n * 3
})
console.log(newnums);  // 30,60,90,120,150
```

**filter()** filter() 中的回调函数有一个要求，必须返回一个boolean值！true() 当返回true时，函数内部会自动将这次回调的n加入到新的数组当中, false() 当返回的false时，函数内部会过滤掉这次的n

```js
// filter() 方法的使用
currentValue	必须。当前元素的值
index	可选。当前元素的索引值
arr	可选。当前元素属于的数组对象
let nums =[10,20,30,40,50]
let newnums = nums.filter(function(n){
   return n < 30
})
console.log(newnums);   //10 20
```

**reduce()** reduce() 作用对数组中所有的内容进行汇总

```js
//reduce() 方法的使用
arr: 表示将要原数组
prev:表示上一次调用回调时的返回值，或者初始值init
cur:表示当前正在处理的数组元素
index:表示正在处理的数组元素的索引，若提供init值，则索引为0，否则索引为1
init: 表示初始值
let nums = [10, 20, 30];
let add = nums.reduce(function(pre,cur){
    console.log(pre,cur);
    return pre + cur
},0)
console.log(add);

//这里的 0 ，是pre 的初始值
//第一次 pre:0   cur:10
//第二次 pre:0+10  cur:20
//第三次 pre:0+10+20  cur：30
//60
```

**some()** 方法用于检测数组中的元素是否满足指定条件（函数提供）。

 参数 fn是用来测试每个元素的函数，接受三个参数：

 item：数组中正在处理的元素。

 index：数组中正在处理的元素的索引值。

 array：some()被调用的数组。

- some() 方法会依次执行数组的每个元素：
- 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。如果没有满足条件的元素，则返回false。Array.from()

 伪数组：**如果一个对象的所有键名都是正整数或零，并且有length属性**，那么这个对象就很像数组，语法上称为“类似数组的对象”(array-like object),即为伪数组。典型的“类似数组的对象”是函数的arguments对象，以及大多数 DOM 元素集，还有字符串。

 将伪数组对象或可遍历对象转换为真数组, Array.from接受三个参数，但只有input是必须的：

- input: 你想要转换的类似数组对象和可遍历对象
- map: 类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组
- context: 绑定map中用到的this

```
Array.from(obj, mapFn, thisArg) 相当于 Array.from(obj).map(mapFn, thisArg)，

那么 Array.from({length: 5},(v,i)=>i) 就相当于 Array.from({length: 5}).map((v,i)=>i)。
```

***array\*****.splice**(*index*,*howmany*,*item1*,.....,*itemX*)

如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组。

### 2.3 for

**forEach()**

```js
arr.forEach((self,index,arr) =>{},this)
self： 数组当前遍历的元素，默认从左往右依次获取数组元素。
index： 数组当前元素的索引，第一个元素索引为0，依次类推。
arr： 当前遍历的数组。
this： 回调函数中this指向。
```

forEach是ES5提出的，挂载在可迭代对象原型上的方法，例如Array Set Map。

forEach() 本身是不支持的 continue 与 break 语句的，我们可以通过 [some](https://www.runoob.com/jsref/jsref-some.html) 和 [every](https://www.runoob.com/jsref/jsref-every.html) 来实现。使用 **return** 语句实现 **continue** 关键字的效果。

**性能比较**：for > forEach > map在chrome 62 和 Node.js v9.1.0环境下：`for` 循环比 `forEach` 快1倍，`forEach` 比 `map` 快20%左右。 **原因分析**`for`：for循环没有额外的函数调用栈和上下文，所以它的实现最为简单。`forEach`：对于forEach来说，它的函数签名中包含了参数和上下文，所以性能会低于 `for` 循环。`map`：`map` 最慢的原因是因为 `map` 会返回一个新的数组，数组的创建和赋值会导致分配内存空间，因此会带来较大的性能开销。如果将`map`嵌套在一个循环中，便会带来更多不必要的内存消耗。当大家使用迭代器遍历一个数组时，如果不需要返回一个新数组却使用 `map` 是违背设计初衷的。

**for-in | for-of**

for of 遍历数组元素值：

- for-of 循环用于遍历可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments对象等等）。创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句不支持普通对象，想遍历对象的属性，可以用for in循环, 或内建的Object.keys()方法：
- Object.keys(obj)获取对象的实例属性组成的数组，不包括原型方法和属性

for-in 遍历数组的索引 对象

- for-in 循环用于遍历对象的可枚举属性。
- 索引是字符串型的数字，因而不能直接进行几何运算
- 遍历顺序可能不是实际的内部顺序
- for in会遍历数组所有的可枚举属性，**包括原型**。例如的原型方法method和name属性

## (三) 函数

### 3.1 箭头函数

箭头函数的外层如果有普通函数，那么箭头函数的this就是这个外层的普通函数的this，箭头函数的外层如果没有普通函数，那么箭头函数的this就是全局变量。箭头函数是匿名函数，不能作为构造函数，不可以使用new命令，否则后抛出错误。

```
	箭头函数不绑定arguments，取而代之用rest参数解决，同时没有super和new.target。
```

 使用call,apply,bind并不会改变箭头函数中的this指向。

 由于不可以通过new关键字调用，所以没有构建原型的需求，所以箭头函数没有prototype这个属性。箭头函数不是方法，它们是匿名函数表达式，所以将它们添加到类中的唯一方法是赋值给属性。箭头函数如果在class作为成员方法定义，是不会被添加到类的prototype上的，也就是说，伴随每一次类的实例化，箭头函数都将同时被实例化一次。

注：

1. 箭头函数不会创建自己的this；它使用封闭执行环境上下文的this值。注：严格模式下，箭头函数中的this指向window
2. 箭头函数中的this是无法被修改的（call,apply,bind）
3. 箭头函数中也没有arguments：注：箭头函数不是通过function关键字创建的，所以它内部没有this和anguments，它们使用封闭作用域中的this和anguments值。
4. 箭头函数不能用作构造器，和 new一起用会抛出错误。
5. 箭头函数返回对象字面量，要用()括起来。 var foo = () => ( { a: 2 } )
6. 箭头函数也支持三元运算符。var max = (a, b) => a>b ? a : b;
7. 箭头函数的作用域和普通函数的作用域一样。

### 3.2 this

在JS中如果开启了严格模式，函数的默认调用this默认为undefined，如果用一个对象去调用这个函数，比如obj.a（），则这个函数的this为obj这个对象，如果没有开启严格模式，函数的默认调用中的this就是window。

~~~js
//HTML事件绑定
<button onclick="console.log(this)">click</button>
// 这里的 this 是button元素
<button onclick="say()">click</button>
function say() {
    console.log(this)
}
// 这里的 this 是window
// html 事件绑定的函数在执行时，有权访问全局作用域中的任何代码。也即我们可以在 html 中可以直接调用 script 标签中定义的函数。
<button onclick="obj.say()">click</button>
let obj = {
	say: function() {
		console.log(this)
	}
}
// 这里的 this 是obj
```
总结：当绑定的函数是一个直接执行的语句（第一种），并且显示的传入一个this时，此时 this 指向该调用元素，如果是其他情况，根据 this 的定义确定即可。
缺点：
不利于表现层和逻辑层代码分离
用户可能会在HTML元素一出现在页面上就触发相应的事件，但当时的事件处理程序有可能尚不具备执行条件。以前面的例子来说明，假设 showMessage() 函数是在按钮下方、页面的最底部定义的。如果用户在页面解析 showMessage() 函数之前就单击了按钮，就会引发错误。
```


//DOM事件绑定
<button id="btn">click</button>
let oBtn = document.getElementById('btn');
oBtn.onclick = say; // 这里的 this 是button元素
function say() {
    console.log(this)
}
let obj = {
	say: function() {
		console.log(this)
	}
}
oBtn.onclick = obj.say;
// 这里的 this 也是button元素
oBtn.onclick = null;  
// 删除事件处理程序
// html 上绑定的事件也可以通过这种方式来解绑
总结：绑定的事件处理程序被附值给了元素的方法，也即 this 指向该目标元素。
缺点：一个元素只能绑定一个处理函数

//addEventListener 绑定函数
<button id="btn">click</button>

let oBtn = document.getElementById('btn');
oBtn.addEventListener('click', function(){
	console.log(this) // 这里的 this 是button元素
}, false)
oBtn.addEventListener('click', say, false)
function say() {
    console.log(this) // 这里的 this 也是button元素
}

let obj = {
	say: function() {
		console.log(this)
	}
}
oBtn.addEventListener('click', obj.say, false)
// 这里的 this 也是button元素
//总结：addEventListener 参数中回调函数的this指向目标元素。

oBtn.addEventListener('click', obj.say.bind(obj), false);
// 通过使用bind，为回调函数绑定指定的 this


var obj = {
  a: function() {
    console.log(this); //window
  }
}
var test = obj.a;
test(); 
//隐式丢失是指被隐式绑定的函数丢失绑定对象.输出结果是 window 对象，如果是直接执行 obj.a 这个方法，不进行赋值操作的话，输出结果是 obj 对象，其实就是在赋值的过程中，发生了隐式丢失。

var obj = {
  a: function() {
    console.log(this); //window
  }
};
setTimeout(obj.a, 1000);
~~~

### 3.3 方法

**1. call, apply, 和 bind**

 它们的作用是在函数调用时动态地改变函数的上下文。具体来说，它们可以指定函数中的 this 指向哪个对象，以及传递参数给函数。

```js
function.call(context, arg1, arg2, ...)
//其中，context 是指定函数中的 this 关键字指向的对象，arg1, arg2, ... 是传递给函数的参数。
function.apply(context, arguments)              
//apply 函数与 call 函数类似，它也允许你在一个特定的上下文中调用一个函数。不同之处在于，apply 函数需要将参数作为数组传递。
function.bind(thisArg, arg1, arg2, ...)
//thisArg 是指定函数中的 this 关键字指向的对象，arg1, arg2, ... 是传递给函数的参数。与 call 和 apply 不同，bind 函数不会立即调用函数，而是返回一个新的函数，你可以将它存储在变量中，然后在需要时调用。
```

 第一点是关于函数立即执行，call()函数与apply()函数在执行后会立即调用前面的函数，而bind()函数不会立即调用，它会返回一个新的函数，可以在任何时候进行调用。

 第二点是关于参数传递，call()函数与bind()函数接收的参数相同，第一个参数表示将要改变的函数执行主体，即this的指向，从第二个参数开始到最后一个参数表示的是函数接收的参数；而对于apply()函数，第一个参数与call()函数、bind()函数相同，第二个参数是一个数组，表示的是接收的所有参数，如果第二个参数不是一个有效的数组或者arguments对象，则会抛出一个TypeError异常。

**2. new.target**

 函数是否使用关键字new调用，是则返回被调用的构造函数，否则返回undefined。

### 3.4 闭包

在正常情况下，如果定义了一个函数，就会产生一个函数作用域，在函数体中的局部变量会在这个函数作用域中使用。一旦函数执行完成，函数所占空间就会被回收，存在于函数体中的局部变量同样会被回收，回收后将不能被访问到。那么如果我们期望在函数执行完成后，函数中的局部变量仍然可以被访问到，这就要用到闭包。

 闭包有两个很明显的特点。函数拥有的外部变量的引用，在函数返回时，该变量仍然处于活跃状态。闭包作为一个函数返回时，其执行上下文环境不会被销毁，仍处于执行上下文环境中。

 在JavaScript中存在一种内部函数，即函数声明和函数表达式可以位于另一个函数的函数体内，在内部函数中可以访问外部函数声明的变量，当这个内部函数在包含它们的外部函数之外被调用时，就会形成闭包。

 闭包所存在的最大的一个问题就是消耗内存，如果闭包使用越来越多，内存消耗将越来越大。

 优点：

- 保护函数内变量的安全，实现封装，防止变量流入其他环境发生命名冲突，造成环境污染。
- 在适当的时候，可以在内存中维护变量并缓存，提高执行效率。

 缺点：

- 消耗内存：通常来说，函数的活动对象会随着执行上下文环境一起被销毁，但是，由于闭包引用的是外部函数的活动对象，因此这个活动对象无法被销毁，这意味着，闭包比一般的函数需要消耗更多的内存。
- 泄漏内存：在IE9之前，如果闭包的作用域链中存在DOM对象，则意味着该DOM对象无法被销毁，造成内存泄漏。



防抖和节流：

 本质上是优化高频率执行代码的一种手段。如：浏览器的 `resize`、`scroll`、`keypress`、`mousemove` 等事件在触发时，会不断地调用绑定在事件上的回调函数，极大地浪费资源，降低前端性能

 为了优化体验，需要对这类事件进行调用次数的限制，对此我们就可以采用 **防抖（debounce）** 和 **节流（throttle）** 的方式来减少调用频率

- 节流: n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
- 防抖: n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时

防抖在连续的事件，只需触发一次回调的场景有：

- 搜索框搜索输入。只需用户最后一次输入完，再发送请求
- 手机号、邮箱验证输入检测
- 窗口大小`resize`。只需窗口调整完成后，计算窗口大小。防止重复渲染。

节流在间隔一段时间执行一次回调的场景有：

- 滚动加载，加载更多或滚到底部监听
- 搜索框，搜索联想功能

### 3.5 arguments

 arguments对象是所有函数都具有的一个内置局部变量，表示的是函数实际接收的参数，是一个类数组结构。性质：函数外部无法访问；可通过索引访问；由实参决定

...args剩余参数和 arguments对象的区别

 剩余参数只包含那些没有对应形参的实参，而 arguments 对象包含了传给函数的所有实参。 arguments对象不是一个真正的数组，而剩余参数是真正的 Array实例，也就是说你能够在它上面直接使用所有的数组方法，比如 sort，map，forEach或pop。 arguments对象还有一些附加的属性 （如callee属性：指向当前函数的指针）。

**arguments转数组：**

1. Array.prototype.slice.call(arguments)
2. [].slice.call(arguments)

### 3.6 原型链

每个函数都会创建一个prototype属性，这个属性是一个对象。这个对象被叫做原型对象，该对象上会有constructor属性指回其构造函数。每个通过`构造函数`创建出来的`实例对象`，其本身有个属性`__proto__`，这个属性会指向该`实例对象`的`构造函数`的`原型对象`。对象都会有一个属性__proto__指向构造函数的prototype原型对象。

```
__proto__ 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型，然后再来为原型添加方法/属性。
Person.prototype.__proto__ ==== Object.prototype //true
person1.__proto__ === Person.prototype //true
Person.prototype.__proto__.constructor ==== Object //true
//对于函数来说，它的__proto__属性指向了一个function Function的原型对象，该原型对象为JS中所有函数的原型对象，而其__proto__属性也还是指向了function Object的原型对象，所以验证了原型链的尽头为null，这一说法。
```

## (四) ES5对象

### 4.1 创建类

- new Object()
- 字面量法创建对象
- 自定义函数（构造函数）
- 通过工厂模式创建对象

### 4.2 属性|方法

**1.数据属性**

通过Object.defineProperty(obj, "数据名",{配置项})

- configurable:是否可以通过delete删除或修改，是否可以将其改为访问器属性；
- enumerable：是否可以通过for-in循环返回；
- writable：属性值是否可以被修改；
- value：包含属性实际的值；

**2.访问器属性** get()和set()，只定义get则不可修改。

**3.对象解构**

```js
//可以在一条语句中使用嵌套数据实现赋值操作。
let{name: personName, age: personAge} = person;
```

**4.方法**

**Object.prototype.hasOwnProperty()**能判断一个对象是否包含自定义属性而不是原型链上的属性也是 Js 中唯一一个处理属性但是不查找原型链的函数。

**Object.getOwnPropertyDescription()** 用于获取对象上的一个自有属性的属性描述包括：value、writable、get、set、configurable、enumerable

**Objec.getOwnPropertyNames()** 用于获取对象自身拥有的可枚举属性和不可枚举属性的属性名，返回一个数组。

**Object.fromEntries()** 将键值对数组转换为对象

**Object.entries()** 返回键值对数组

**`Object.getPrototypeOf()`** 静态方法返回指定对象的原型（即内部 `[[Prototype]]` 属性的值）

### 4.2 继承

**ES5和ES6继承原理**

```
1.ES5 的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到 this 上（Parent.apply(this)）
2. ES6 的继承机制完全不同，实质上是先创建父类的实例对象 this（所以必须先调用父类的 super()方法），然后再用子类的构造函数修改 this。
3. ES5 的继承时通过原型或构造函数机制来实现。
4. ES6 通过 class 关键字定义类，里面有构造方法，类之间通过 extends 关键字实现继承。
5. 子类必须在 constructor 方法中调用 super 方法，否则新建实例报错。因为子类没有自己的 this 对象，而是继承了父类的 this 对象，然后对其进行加工。如果不调用 super 方法，子类得不到 this 对象。
6. 注意 super 关键字指代父类的实例，即父类的 this 对象。
7. 注意：在子类构造函数中，调用 super 后，才可使用 this 关键字，否则报错。function 声明会提升，但不会初始化赋值。Foo 进入暂时性死区，类似于 let、const 声明变量。
```

1）原型链继承

 原型链继承的主要思想是：重写子类的prototype属性，将其指向父类的实例。

 优点：可通过子类直接访问父类原型链属性和函数；

 缺点：

-  子类的所有实例将共享父类的属性，如果父类有引用类型将会被更改；
-  在创建子类实例时，无法向父类的构造函数传递参数，在通过new操作符创建子类的实例时，会调用子类的构造函数，而在子类的构造函数中并没有设置与父类的关联，从而导致无法向父类的构造函数传递参数；
-  无法实现多继承

2） 构造继承

 构造继承的主要思想是在子类的构造函数中通过call()函数改变this的指向，调用父类的构造函数，从而能将父类的实例的属性和函数绑定到子类的this上。

 优点：

- 可解决子类实例共享父类属性的问题
- 创建子类的实例时，可以向父类传递参数
- 可以实现多继承

 缺点：

- 实例只是子类的实例，并不是父类的实例
- 能继承父类实例的属性和函数，并不能继承原型对象上的属性和函数
- 无法复用父类的实例函数

3） 复制继承

 利用for循环遍历...

4） 组合继承

 组合继承的主要思想是组合了构造继承和原型继承两种方法，一方面在子类的构造函数中通过call()函数调用父类的构造函数，将父类的实例的属性和函数绑定到子类的this中；另一方面，通过改变子类的prototype属性，继承父类的原型对象上的属性和函数。

```js
// 父类
function Animal(parentAge) {
   // 实例属性
   this.name = 'Animal';
   this.age = parentAge;
   // 实例函数
   this.sleep = function () {
       return this.name + '正在睡觉！';
   };
   this.feature = ['fat', 'thin', 'tall'];
}
// 原型函数
Animal.prototype.eat = function (food) {
   return this.name + '正在吃：' + food;
};
// 子类
function Cat(name) {
   // 通过构造函数继承实例的属性和函数
   Animal.call(this);
   this.name = name;
}
// 通过原型继承原型对象上的属性和函数
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;

var cat = new Cat('tony');
console.log(cat.name);   // tony
console.log(cat.sleep()); // tony正在睡觉！
console.log(cat.eat('猫粮'));  // tony正在吃：猫粮
```

 优点：

- 既能继承父类实例的属性和函数，又能继承原型对象上的属性和函数
- 既是子类的实例，又是父类的实例
- 不存在引用属性共享的问题
- 可以向父类的构造函数中传递参数

 缺点：

 组合继承的缺点为父类的实例属性会绑定两次。在子类的构造函数中，通过call()函数调用了一次父类的构造函数；在改写子类的prototype属性、生成父类的实例时调用了一次父类的构造函数。通过两次调用，父类实例的属性和函数会进行两次绑定，一次会绑定到子类的构造函数的this中，即实例属性和函数，另一次会绑定到子类的prototype属性中，即原型对象上的属性和函数，但是实例属性优先级会比原型对象上的属性优先级高，因此实例属性会覆盖原型对象上的属性。

5）寄生组合继承

```js
// 在进行子类的prototype属性的设置时，可以去掉父类实例的属性和函数。
// 子类
function Cat(name) {
   // 继承父类的实例属性和函数
   Animal.call(this);
   this.name = name;
}
// 立即执行函数
(function () {
   // 设置任意函数Super()
   var Super = function () {};
   // 关键语句，Super()函数的原型指向父类Animal的原型，去掉父类的实例属性
   Super.prototype = Animal.prototype;
   Cat.prototype = new Super();
   Cat.prototype.constructor = Cat;
})();
```

### 4.3 判空

```js
JSON.stringify(data) === '{}'
Object.keys(data).length
Object.values(data).length
for..in
{}.hasOwnProperty.call(obj,key)
Object.getOwnPropertyNames()
```

## (五) ES6类

### 5.1 属性|方法

**class类本质上就是一个函数**，自身指向的就是构造函数

**1.constructor方法**

 每一个类都可以有一个自己的构造函数，这个名称是固定的constructor，当我们通过new调用一个类时，这个类就会调用自己的constructor方法（构造函数）。它用于创建对象时给类传递一些参数，每一个类只能有一个构造函数，否则报错。//constructor内定义的方法和属性是实例对象自己的，而constructor外定义的方法和属性则是所有实例对象可以共享的 注意!

 **通过new调用一个类时**，会调用构造函数，执行如下操作过程：

1. 在内存中开辟一块新的空间用于创建新的对象
2. 这个对象内部的__proto__属性会被赋值为该类的prototype属性
3. 构造函数内的this，指向创建出来的新对象（实例对象）
4. 执行构造函数的内部代码
5. 如果函数没有返回对象，则返回this

```js
function myNew(Fn) {
    if (typeof Fn !== 'function') throw new TypeError('This is not a constructor') // Fn校验
    var args = Array.from(arguments).slice(1) // 取入参
    var obj = {} // 1.创建一个空的简单JavaScript对象（即`  {}  `）
    obj.__proto__ = Fn.prototype // 2.  为步骤1新创建的对象添加属性`  __proto__  `，将该属性链接至构造函数的原型对象
    var res = Fn.call(obj, ...args) // 3.  将步骤1新创建的对象作为this的上下文并传入参数；
    return Object(res) === res ? res : obj // 4.  如果该函数没有返回对象，则返回this。
}
```

在JavaScript构造函数中：如果return值类型，那么对构造函数没有影响，实例化对象返回空对象；如果return引用类型（数组，函数，对象），那么实例化对象就会返回该引用类型(不会引用原型对象)；

**2.类方法**

绑定方法：

 prototype 属性对类添加方法

 Object.assign 方法对类动态增加方法

**箭头函数：**

1. class中的方法如果是普通函数方法，该方法会绑定在构造函数的原型上；
2. 如果方法是箭头函数方法，该方法会绑定在构造函数上；
3. 通过上述方式调用class中的方法，无论是箭头函数方法还是普通函数方法，方法中的this都指向实例对象。

通过引用来调用**箭头函数**方法，方法中的this依然指向创建的实例对象。原因：箭头函数中的this，只和定义该箭头函数的位置有关系，即，箭头函数中的this始终是该箭头函数所在作用域中的this。而箭头函数所在的作用域中的this指向foo实例对象。通过引用调用**普通函数**方法，方法中的this会指向undefined。原因：因为普通函数中的this是动态绑定的，始终指向函数的执行环境，上面的例子中在全局环境中调用getAge方法，但是this却是undefined而不是window。原因在于class声明和class表达式中会默认使用严格模式。

**static方法**

**extend方法**

 `extends`关键字用于扩展子类，创建一个类作为另外一个类的一个子类。它会将父类中的属性和方法一起继承到子类。在子类的`constructor`方法中，需要使用`super`关键字，在子类中它是必须存在的，否则新建实例时会抛出异常。

 这是因为子类的this对象是继承自父类的this对象，如果不调用`super`方法，子类就得不到`this`对象。在子类的构造函数中使用`this`或者返回默认对象之前，必须先通过`super`调用父类的构造函数。

**Getter 和 Setter**

在类内部也可以使用`get`和`set`关键字，对应某个属性设置存值和取值函数，拦截属性的存取行为。

**注意：**

- `ES6`中的类只是`ES5`构造函数的一层包装，所以函数的许多属性都被`class`继承了，包括`name`属性。
- `class`不存在变量提升，这与我们在`ES5`中实现类的不同的，`function`关键字会存在变量提升。
- 有些浏览器不支持`class`语法，我们可以通过`babel`来进行转换。

## (六) JS其他

### 6.1 单线程

 JS是一门单线程的语言，JavaScript 最初被设计为一种用于浏览器的脚本语言，主要用于操作 DOM，响应用户交互等。由于浏览器本身就是单线程的，所以 JavaScript 也被设计成单线程的，以避免出现线程冲突和死锁等问题。这是因为它运行在浏览器的渲染主线程中，而渲染主线程只有一个。而渲染主线程承担着诸多的工作，渲染页面、执行 JS 都在其中运行。 如果 JavaScript 是多线程的，那么不同的线程可能会同时对同一个 DOM 元素进行操作，从而导致 DOM 状态的不一致。此外，多线程还可能会引发死锁等问题，导致程序崩溃。

 如果使用同步的方式，就极有可能导致主线程产生阻塞，从而导致消息队列中的很多其他任务无法得到执行。这样一来，一方面会导致繁忙的主线程白白的消耗时间，另一方面导致页面无法及时更新，给用户造成卡死现象。

 所以浏览器采用异步的方式来避免。具体做法是当某些任务发生时，比如计时器、网络、事件监听，主线程将任务交给其他线程去处理，自身立即结束任务的执行，转而执行后续代码。当其他线程完成时，将事先传递的回调函数包装成任务，加入到消息队列的末尾排队，等待主线程调度执行。

 在这种异步模式下，浏览器永不阻塞，从而最大限度的保证了单线程的流畅运行

### 6.2 垃圾回收(GC)

 程序的运行需要内存，当程序提出要求，操作系统就会供给内存。对于不再用到的内存，没有及时释放，就叫做内存泄漏。对于持续运行的服务进程，必须及时释放内存，否则，内存占用越来越高，轻则影响系统性能，重则导致进程崩溃。JavaScript具有垃圾收集器，垃圾收集器会按照固定的时间间隔周期性的执行。最常见的垃圾回收方式有两种：标记清除、引用计数。

1）如何观察内存泄漏？

- 如果连续五次垃圾回收之后，内存占用一次比一次大，就有内存泄漏。这就要求实时查看内存占用。
- 可以浏览器查看内存占用。通过命令行，命令行可以使用 Node process.memoryUsage提供的方法。process.memoryUsage返回一个对象，包含了 Node 进程的内存占用信息。（判断内存泄漏，以heapUsed字段为准。）

2） 标记清除

 原理：是当变量进入环境时，将这个变量标记为“进入环境”。当变量离开环境时，则将其标记为“离开环境”。标记“离开环境”的就回收内存。

- 垃圾回收器，在运行的时候会给存储在内存中的所有变量都加上标记。
- 去掉环境中的变量以及被环境中的变量引用的变量的标记。
- 再被加上标记的会被视为准备删除的变量。
- 垃圾回收器完成内存清除工作，销毁那些带标记的值并回收他们所占用的内存空间。

 使用标记清除策略的最重要的优点在于简单，无非是标记和不标记的差异。通过标记清除之后，剩余的对象内存位置是不变的，也会导致空闲内存空间是不连续的，这就造成出现内存碎片的问题。内存碎片多了后，如果要存储一个新的需要占据较大内存空间的对象，就会造成影响。对于通过标记清除产生的内存碎片，还是需要通过标记整理策略进行解决。

3） 引用计数

 引用计数是一种不常见的垃圾回收策略，其思路就是对每个值都记录其的引用次数。具体的：

- 当变量进行声明并赋值后，值的引用数为1。
- 当同一个值被赋值给另一个变量时，引用数+1
- 当保存该值引用的变量被其它值覆盖时，引用数-1
- 当该值的引用数为0时，表示无法再访问该值了，此时就可以放心地将其清除并回收内存。

 这种回收策略看起来很方便，但是当其进行**循环引用**时就会出现问题，会造成大量的内存不会被释放。当函数结束后，两个对象都不在作用域中，A 和 B 都会被当作非活动对象来清除掉，相比之下，引用计数则不会释放，也就会造成大量无用内存占用，这也是后来放弃引用计数，使用标记清除的原因之一。

4）v8优化策略----分代式垃圾回收

 V8 的垃圾回收策略主要基于分代式垃圾回收机制，V8 中将堆内存分为新生代和老生代两区域，采用不同的垃圾回收器也就是不同的策略管理垃圾回收。

 新生代的对象为存活时间较短的对象，简单来说就是新产生的对象，通常只支持 1～8M 的容量，而老生代的对象为存活事件较长或常驻内存的对象，简单来说就是经历过新生代垃圾回收后还存活下来的对象，容量通常比较大。

 V8 整个堆内存的大小就等于新生代加上老生代的内存，对于新老两块内存区域的垃圾回收，V8 采用了两个垃圾回收器来管控。



 **新生代内存回收**

 在64操作系统下分配为32MB，因为新生代中的变量存活时间短，不太容易产生太大的内存压力，因此不够大也是能够理解。

 对于新生代内存的回收，通常是通过Scavenge 的算法进行垃圾回收，就是将新生代内存进行一分为二，正在被使用的内存空间称为使用区，而限制状态的内存空间称为空闲区。

- 新加入的对象都会存放在使用区，当使用区快写满时就进行一次垃圾清理操作。
- 在开始进行垃圾回收时，新生代回收器会对使用区内的对象进行标记
- 标记完成后，需要对使用区内的活动对象拷贝到空闲区进行排序
- 而后进入垃圾清理阶段，将非活动对象占用的内存空间进行清理
- 最后对使用区和空闲区进行交换，使用区->空闲区，空闲区->使用区

 新生代中的变量如果经过回收之后依然一直存在，那么会放入到老生代内存中，只要是已经经历过一次Scavenge算法回收的，就可以晋升为老生代内存的对象。

 **老生代内存回收**

 当然，Scavenge算法也有其适用场景范围，对于内存空间较大的就不适合使用Scavenge算法。此时应该使用Mark-Sweep（标记清除）和Mark-Compact（标记整理）的策略进行老生代内存中的垃圾回收。

 首先是标记阶段，从一组根元素开始，递归遍历这组根元素，遍历过程中能到达的元素称为活动对象，没有到达的元素就可以判断为非活动对象。清除阶段老生代垃圾回收器会直接将非活动对象，也就是数据清理掉。同样的标记清除策略会产生内存碎片，因此还需要进行标记整理策略进行优化。

5）造成内存泄露的原因

- 过多的缓存。及时清理过多的缓存。
- 滥用闭包。尽量避免使用大量的闭包。
- 定时器或回调太多。与节点或数据相关联的计时器不再需要时，DOM节点对象可以清除，整个回调函数也不再需要。可是，计时器回调函数仍然没有被回收（计时器停止才会被回收）。当不需要setTimeout或setInterval时，定时器没有被清除，定时器的糊掉函数以及其内部依赖的变量都不能被回收，会造成内存泄漏。解决方法：在定时器完成工作时，需要手动清除定时器。
- 太多无效的DOM引用。DOM删除了，但是节点的引用还在，导致GC无法实现对其所占内存的回收。解决方法：给删除的DOM节点引用设置为null。
- 滥用全局变量。全局变量是根据定义无法被垃圾回收机制进行收集的，因此需要特别注意临时存储和处理大量信息的全局变量。如果必须使用全局变量来存储数据，请确保将其指定为null或在完成后重新分配它。解决方法：使用严格模式。
- 从外到内执行appendChild。此时即使调用removeChild也无法进行释放内存。解决方法：从内到外appendChild。
- 反复重写同一个数据会造成内存大量占用，但是IE浏览器关闭后会被释放。
- 注意程序逻辑，避免编写『死循环』之类的代码。
- DOM对象和JS对象相互引用。

参考：

- Javascript的垃圾回收机制知多少？ https://juejin.cn/post/7038593947995734030



### 6.3 事件循环

**1 浏览器JS异步执行原理**

 浏览器是多线程的，当 JS 需要执行异步任务时，浏览器会另外启动一个线程去执行该任务。也就是说，"JS 是单线程的”指的是执行JS 代码的线程只有一个，是浏览器提供的 JS 引警线程(主线程)。浏览器中还有定时器线程和 HTTP 请求线程等，这些线程主要不是来跑 JS 代码的。

**2 事件驱动**

 实现方式一: 事件驱动。点击按钮后，修改坐标 positionX 时，立即触发界面染的事件，触发重新渲染。 实现方式二:状态驱动或数据驱动。点击按钮后，只修改坐标 positionX，不触发界面染，在此之前会启动一个定时器 setlinterval，或者利用 requestAnimationFrame 来不断地检测 positionX 是否有变化。如果有变化，则立即重新染. 浏览器中的点击事件处理也是典型的基于事件驱动。在事件动中，当有事件触发后，被触发的事件会按顺序暂时存在一个队列中，待JS 的同步任务执行完成后，会从这个队列中取出要处理的事件并进行处理。那么具体什么时候取任务、优先取哪些任务，这就由事件循环流程来控制了。

**3 事件循环**

 事件循环又叫做消息循环，是浏览器渲染主线程的工作方式。在 Chrome 的源码中，它开启一个不会结束的 for 循环，每次循环从消息队列中取出第一个任务执行，而其他线程只需要在合适的时候将任务加入到队列末尾即可。

 过去把消息队列简单分为宏队列和微队列，这种说法目前已无法满足复杂的浏览器环境，取而代之的是一种更加灵活多变的处理方式。

 根据 W3C 官方的解释，每个任务有不同的类型，同类型的任务必须在同一个队列，不同的任务可以属于不同的队列。不同任务队列有不同的优先级，在一次事件循环中，由浏览器自行决定取哪一个队列的任务。但浏览器必须有一个微队列，微队列的任务一定具有最高的优先级，必须优先调度执行。

根据 W3C 的最新解释:

- 每个任务都有一个任务类型，同一个类型的任务必须在一个队列，不同类型的任务可以分属于不同的队列。 在一次事件循环中，浏览器可以根据实际情况从不同的队列中取出任务执行。
- 浏览器必须准备好一个微队列，微队列中的任务优先所有其他任务执行。随着浏览器的复杂度急剧提升，W3C 不再使用宏队列的说法

在目前 chrome 的实现中，至少包含了下面的队列：

- 延时队列：用于存放计时器到达后的回调任务，优先级「中」
- 交互队列：用于存放用户操作后产生的事件处理任务，优先级「高」
- 微队列：用户存放需要最快执行的任务，优先级「最高」

 在浏览器环境中，事件循环的实现主要由以下几个部分组成：宏任务、微任务和渲染阶段。在事件循环中，任务被分为两种类型：宏任务和微任务。

| setTimeout、setInterval、requestAnimationFrame、MessageChannel | process.nextTick、MutationObserver、Promise.then |
| ------------------------------------------------------------ | ------------------------------------------------ |
|                                                              |                                                  |

 宏任务是指由浏览器提供的异步任务，比如定时器、DOM事件和网络请求等。在宏任务执行阶段，事件循环会依次执行所有在事件队列中排队的宏任务，直到队列为空为止。

 微任务是指由JavaScript引擎提供的异步任务，比如Promise的回调函数、MutationObserver的回调函数等。在宏任务执行阶段中，当所有同步代码和当前宏任务中的所有异步任务（包括微任务和宏任务）都执行完成之后，事件循环会进入微任务执行阶段。在微任务执行阶段，事件循环会依次执行所有在事件队列中排队的微任务，直到微任务队列为空。

 微任务队列比宏任务队列的优先级更高，因为微任务中的操作会在下一个宏任务执行前完成，可以让我们在操作完成后立即得到结果。

 渲染阶段是浏览器特有的事件循环阶段，用于处理渲染相关的任务，比如更新DOM和执行CSS动画等。渲染阶段的任务会在**宏任务和微任务执行完毕**之后执行，每次执行完一个宏任务或微任务后都会检查是否需要执行渲染任务，如果需要就会立即执行。如果宏任务之间间隔大于60hz(16.8ms)则会在间隔时执行渲染，如果不是则会在宏任务之后进行渲染

**宏任务(script代码)** => **微任务** => **DOM渲染** => **异步宏任务**

 Node.js 的事件循环是基于 libuv 库实现的，它包含了多个阶段，每个阶段都有一个 FIFO（First In First Out）队列来执行回调。这些阶段包括 timers 阶段（处理 setTimeout 和 setInterval 回调）、I/O callbacks 阶段、idle, prepare阶段、poll阶段（最重要的阶段，处理 I/O 和连接等）、check阶段（处理 setImmediate 回调）和 close callbacks 阶段。

1. Node.js 的事件循环更复杂，包含多个不同的阶段，而浏览器只有微任务和宏任务的概念。
2. Node.js 和浏览器处理微任务的方式不同。在浏览器中，微任务在当前宏任务执行完后立即执行；而在 Node.js 中，微任务的执行时机则取决于具体的阶段。
3. Node.js 中有一些额外的API，如 setImmediate 和 process.nextTick，这些在浏览器中并不可用。
4. Node.js 的事件循环还需要处理许多非 JavaScript 任务，如网络 I/O，文件 I/O等，而浏览器主要是处理JavaScript任务和 UI 渲染。

https://zhuanlan.zhihu.com/p/267273074

### 6.4 CJS|ESM

 ES6之前，JS一直没有自己的模块体系，这一点对于大型项目的开发很不友好，所以社区出现了CommonJS和AMD，CommonJS主要是用于服务器（Node），AMD主要是用于浏览器。但是ES6引入了ESM，到此，JS终于有了自己的模块体系，基本上可以完全取代CJS和AMD。

 区别：

 1 ESM输出的是值的引用，而CJS输出的是值的拷贝；

 2 CJS的输出是运行时加载(先加载模块整体再读取)，而ESM是编译时输出接口(只加载方法，静态化设计思想)；

 3 CJS 模块的require()是同步加载模块(引入的模块是一个对象)，ESM 模块的import命令是异步加载(引入模块本身)，有一个独立的模块依赖的解析阶段。

**CommonJS**CommonJS是一种用于非浏览器环境的JavaScript模块化规范，最常见的场景是用于NodeJS。

```js
 // 引入 
const doSomething = require('./doSomething.js'); 
// 导出
module.exports = function doSomething(n) { 
```

**特点：**

- 模块在运行时加载和执行，并且只在首次加载时运行一次，然后将运行结果缓存，以备后续多次加载；
- 模块加载方式为同步加载，多个模块依次按顺序加载；
- require 语句可以放在块级作用域或条件语句中

**AMD（Asynchronous Module Definition）**，即异步模块化定义规范，主要用于浏览器端，其中最具代表性的是require.js。

```js
 // 引入
require(["./amd.js"], function (m) { 
    console.log(m); 
});
// 导出
define(['dep1', 'dep2'], function (dep1, dep2) { 
    // Define the module value by returning a value. 
    return function () {}; 
});
```

**特点：**

- 异步加载模块
- 依赖前置，即模块加载前会先加载依赖，加载完成后会执行回调

**CMD** 和 AMD 一样，都是用于浏览器端的异步模块定义规范，最常见的实践是sea.js。它和AMD的最大区别是对依赖的处理时机，AMD要求先加载依赖，再执行当前模块逻辑，CMD则是执行到相应依赖时再加载依赖。

**UMD**(Universal Module Definition)，通用模块定义，顾名思义是对以上几种标准的统一，使每个版本都能兼容运行。

**特点：**

- 兼容浏览器和服务端两种场景
- 兼容 CMD、AMD、CJS 等多种规范，用法也相同

**ESM**ESM(ES Module)，基于ES的模块标准，也是当前最常使用的模块化标准。

```js
// 引入
import {foo, bar} from './myLib'; 
// 导出
export default function() { 
    // your Function 
}; 
export const function1() {...}; 
export const function2() {...}
```

- 支持大多数现代浏览器，但也存在部分浏览器兼容问题 （jakearchibald.com/2017/es-mod…）
- 它既拥有像CJS一样简洁的语法，同时又支持AMD的异步加载
- 得益于ES6 的静态模块结构（static module structure），ESM规范可以支持打包时的tree-shaking，支持移除不必要的引用
- 编译时加载
- 可以在html中引用

**可以通过webpack或esbuild进行转化。**

```js
npm install esbuild
// build.js
require("esbuild").buildSync({
  entryPoints: [''],// 待转换的文件
  outfile: "out.js",
  format: '',// 转换的目标格式，cjs、esm
});
//webpack
module.exports = {
    output: {
        library: {
            name: 'MyLibrary',
            type: 'umd',
        },
        globalObject: 'this'
    }
};
```

https://zhuanlan.zhihu.com/p/576861487

https://juejin.cn/post/7185475655943847992

### 6.5 AOP|IOC

一、IOC的概念

 IOC 全称为 Inversion of Control，翻译为 “控制反转”，它还有一个别名为 DI（Dependency Injection）,即依赖注入（在Spring框架负责创建Bean对象时，动态的将依赖对象注入到Bean组件）。 对象A依赖于对象B,当对象 A需要用到对象B的时候，IOC容器就会立即创建一个对象B送给对象A。IOC容器就是一个对象制造工厂，你需要什么，它会给你送去，你直接使用就行了，而再也不用去关心你所用的东西是如何制成的，也不用关心最后是怎么被销毁的，这一切全部由IOC容器包办。 IOC:控制反转，其实是一种思想，传统的Java se是通过new来创建一个对象，是程序主动创建依赖对象。IOC是指，利用反射的原理将创建对象的权利交给Spring容器，spring在运行的时候根据配置文件来动态的创建对象和维护对象之间的关系，实现了松耦合的思想。实现方式：配置文件，注解。 IOC的作用：消减计算机程序的耦合（只能解决程序间的依赖关系）

二、AOP的概念

1、Aop：面向切面编程，AOP 是 OOP（面向对象编程）的一种延续。

 OOP 编程思想可以解决大部分的代码重复问题。但是有一些问题是处理不了的。比如在父类 Animal 中的多个方法的相同位置出现了重复的代码，OOP 就解决不了。如下：

```java
public class Animal {
    /** 身高 */
    private String height;
    /** 体重 */
    private double weight;
    public void eat() {
        // 性能监控代码
        long start = System.currentTimeMillis();
        // 业务逻辑代码
        System.out.println("I can eat...");
        // 性能监控代码
        System.out.println("执行时长：" + (System.currentTimeMillis() - start)/1000f + "s");
    }
    public void run() {
        // 性能监控代码
        long start = System.currentTimeMillis();
        // 业务逻辑代码
        System.out.println("I can run...");
        // 性能监控代码
        System.out.println("执行时长：" + (System.currentTimeMillis() - start)/1000f + "s");
    }
}
```

2、经典应用：事务管理、性能监视、安全检查、缓存 、日志等。

3、Spring AOP使用纯Java实现，不需要专门的编译过程和类加载器，在运行期通过代理方式向目标类织入增强代码。

▲ AOP的作用：在程序运行期间，不修改源码对已有方法进行增强。

优势：减少重复代码、提高开发效率、维护方便。

参考：

- 面试被问了几百遍的 IoC 和 AOP ，还在傻傻搞不清楚？ https://zhuanlan.zhihu.com/p/141204279

### 6.6 事件流

JavaScrip 中事件流模型分为 事件捕获、事件目标、事件冒泡 三个阶段。

第一阶段：捕获阶段，从window对象传导到目标节点第二阶段：目标阶段，事件在目标节点上触发第三阶段：冒泡阶段，从目标节点传回window对象

**事件捕获：**首先由document捕获，然后沿dom树依次向下传播。但是旧浏览器不支持。

**事件冒泡：**当一个元素接收到事件的时候，开始时由具体的元素接收，然后逐级向上传播到DOM最顶层节点。

```js
// 方法一：
//标准写法：利用事件对象里面的stopPropagation()方法
var div = document.querySelector('div')
        div.addEventListener('click', function(e) {
            e.stopPropagation()
        })
// 方法二：
    <a href="https://www.csdn.net/" class="box"> 调用此方法是，连接不会被打开，但是会发生冒泡，冒泡会传递到上一层的父元素；
        <button class="btn">按钮</button>
    </a>
	$('.btn').click(function (even) { 
		even.preventDefault();
		alert('按钮被点击了');
	})
// 方法三：
//IE6-8 利用事件对象cancelBubble属性
 var div = document.querySelector('div')
        div.addEventListener('click', function(e) {
            e.cancelBubble = true // cancel 取消 Bubble 泡泡
        })
// 方法四：
Vue中可以直接通过 @click.stop
```

**事件监听**事件监听实现的功能和直接绑定差不多，但是新增了一个特点。那就是无论监听次，都不会覆盖掉前面的监听事件。本质原因是监听事件每次都会生产一个全新的匿名函数，和前面的函数完全不同，自然不会覆盖。

**事件委托**通俗的来讲就是把一个元素的响应事件函数，委托到另一个元素。举个例子，就是有一堆li标签，需要给每一个li标签添加click事件，但是如果有几万个li标签，每个标签都显式地去添加事件函数，会影响性能。这里有一个解决方案就是把li的事件函数，委托到它的上一层父级ul标签去（假如它的父级是ul）

`event.target`返回的是，触发事件的元素（当前标签下的子标签）

`event.currentTarget`返回的是，绑定事件的元素 如果说是一个单标签绑定的事件 可以使用以上任意两种方法都是可行的；

如果你所绑定事件的标签内还有多个子标签的话建议使用` event.currentTarget`。或者使用事件监听，这样，`event.currentTarget`就能拿到绑定事件的节点，而在其下的各种后代节点就可以用event.target.（各种类名，id，标签名，属性值）来具体指向到触发事件的节点。

https://juejin.cn/post/7057817598804639781

### 6.7 正则表达式

```js
[] // 匹配n个字符
\- //转义字符
^ 取反
\d 匹配所有数字 \w 匹配所有字符 \s匹配空白 \b单词边界 \D取反 

// 在[]外
^ 匹配开头第一次出现的字母，必须顶格
$ 匹配结尾
. 匹配任意单个字符
? 匹配0次或1次 
\d{8,9} 匹配8个或9个数字
\d{8,} 匹配8个以上的数字 （+等价于{1,} *等价于{0,}）

()进行分组提取提取中间的数据
(.jpg|.png)或者提取 

\1和第一个分组匹配相同的数据

js中只有前瞻没有后顾,匹配()之前的东西
正向前瞻(?=) /\d(?=[a-z])/g 匹配数字后面是字母的,返回数字,末尾/i则不区分大小写
负向前瞻(?!) /\d(?！[a-z])/g 匹配数字后面不是字母的,返回数字
判断密码强弱：
//密码为八位及以上并且字母数字特殊字符三项都包括
    var strongRegex = new RegExp(
        "^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    //密码为八位及以上并且字母、数字、特殊字符三项中有两项，强度是中等
    var mediumRegex = new RegExp(
        "^(?=.{8,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[a-z])(?=.*\\W))|((?=.*[0-9])(?=.*\\W))|((?=.*[A-Z])(?=.*\\W))).*$", "g");
    var enoughRegex = new RegExp(
        "(?=.{8,}).*", "g");
//匹配电话号码
^0\d{2}-?[1-9]\d{6}$
```

**igm**

g：表示全局（global）模式，即模式将被应用于所有字符串，而非在发现第一个匹配项时立即停止；

i：表示不区分大小写（case-insensitive）模式，即在确定匹配项时忽略模式与字符串的大小写；

m：表示多行（multiline）模式，即在到达一行文本末尾时还会继续查找下一行中是否存在与模式匹配的项。

**实例属性：**

RegExp.prototype.flags：含有 RegExp 对象 flags 的字符串。

RegExp.prototype.ignoreCase：匹配文本的时候是否忽略大小写。

RegExp.prototype.source：正则表达式的文本。

RegExp.prototype.multiline：是否进行多行搜索。

**实例方法：**

RegExp.prototype.compile()：运行脚本的期间（重新）编译正则表达式。

RegExp.prototype.test()：该正则在字符串里是否有匹配。

RegExp.prototype[@@match](https://www.nowcoder.com/creation/write/article?entryPage=https%3A%2F%2Fwww.nowcoder.com%2Fcreation%2Factivity%3FentranceType_var%3D%E5%88%9B%E4%BD%9C%E8%80%85%E4%B8%AD%E5%BF%83&type=0): 对给定字符串执行匹配并返回匹配结果。

RegExp.prototype[@@matchAll](https://www.nowcoder.com/creation/write/article?entryPage=https%3A%2F%2Fwww.nowcoder.com%2Fcreation%2Factivity%3FentranceType_var%3D%E5%88%9B%E4%BD%9C%E8%80%85%E4%B8%AD%E5%BF%83&type=0)：对给定字符串执行匹配，返回所有匹配结果。

参考：

https://regexr-cn.com/

https://codejiaonang.com/

### 6.8 ES6模块

 ES6模块的运行机制是这样的：当遇到import命令时，不会立马去执行模块，而是生成一个动态的模块只读引用，等到需要用到时，才去解析引用对应的值。

- es6: import / export
- commonjs: require / module.exports / exports
- amd: require / defined

**require与import的区别**

- require支持 动态导入，import不支持，正在提案 (babel 下可支持)
- require是 同步 导入，import属于 异步 导入
- require是 值拷贝，导出值变化不会影响导入值；import指向 内存地址，导入值会随导出值而变化

### 6.9 洋葱模型

洋葱内的每一层都表示一个独立的中间件，用于实现不同的功能，比如异常处理、缓存处理等。每次请求都会从左侧开始一层层地经过每层的中间件，当进入到最里层的中间件之后，就会从最里层的中间件开始逐层返回。因此对于每层的中间件来说，在一个 **请求和响应** 周期中，都有两个时机点来添加不同的处理逻辑。

```
在 koa 中，中间件被 next() 方法分成了两部分。next() 方法上面部分会先执行，下面部门会在后续中间件执行全部结束之后再执行。
Koa 的洋葱模型指的是以 next() 函数为分割点，先由外到内执行 Request 的逻辑，再由内到外执行 Response 的逻辑。
koa中主要使用koa-compose来实现该模式。核心内容只有十几行，但是却涉及到高阶函数、闭包、递归、尾调用优化等知识，不得不说非常惊艳没有一行是多余的。简单来说，koa-compose暴露出一个compose方法，该方法接受一个中间件数组，并返回一个Promise函数。
```

### 6.10 ES6->ES5

```
ES6 转 ES5 目前行业标配是用 Babel，转换的大致流程如下：
1 解析（Parsing）阶段：Babel 会将待转换的 ES6 代码解析成 AST（抽象语法树），这个阶段的主要任务是将代码字符串转换为可以操作的 AST 对象，同时会进行词法分析和语法分析。
2 转换（Transformation）阶段：在转换阶段中，Babel 会对 AST 进行遍历，对 AST 节点进行增、删、改、查等操作，将 ES6 语法转换为 ES5 语法。这个阶段可以根据不同的插件配置，进行自定义的转换操作。
3 生成（Code Generation）阶段：在生成阶段中，Babel 会根据转换后的 AST 对象，生成对应的 ES5 代码。这个阶段的主要任务是将 AST 对象转换为 ES5 代码字符串。
```

### 6.11 js常见的库

Lodash是最实用的JavaScript库之一，拥有大量的函数特性集，像数组、对象、字符串、数字等类型的常见处理函数。

Luxon 是一个非常流行的日期/时间 操作库，是新项目的最佳选择，因为它使用更现代的 Intl 对象，具有解析、操作和创建与时间相关的所有功能。当然还有一个类似的JavaScript库是 Moment 。

NanoID创建记录唯一的key，一般采用自递增的ID或者采用UUID，NanoID 创建一个由字母数字组成的ID，通常比UUID要小，它是用于创建安全并且唯一ID的最小库之一，本身可以缩小并压缩到仅只有 108 字节。

在现代 Web 应用程序中，身份验证可以采用多种形式。传统上，用户通过提供用户名和密码进行登录。随着社交网络的兴起，使用 OAuth 提供商（如 Facebook 或 谷歌）的单点登录已成为一种流行的身份验证方法，公开 API 的服务通常需要基于令牌的凭据来保护访问。如果自己需要去实现整个逻辑还是挺繁琐的，如果你有这方便的需求，可以考虑 Passport。

Faker 是一种将虚假数据快速添加到应用程序中以进行测试的脚本库，通过它可以生成姓名、图片、产品信息、银行信息等虚拟信息。

https://juejin.cn/post/6972916469969453070

### 6.12 ES新特性

 ES6 是 2015 年提出的，按照这个逻辑 ES2023 应该叫做 ES14。

ES2023：

Array有很多方法（比如 sort/splice 等）会改变数组自身，如果不希望改变数组自身，可以这样做：`array.toSorted()`

从尾部查找，涉及到两个函数 findLast / findLastIndex `array.findLast(n => n.value % 2 === 1);`

ES2022:

异常链，如果这个异常被重新抛出了很多次，那通过 err1.cause.cause.... 就能拿到所有相关的异常。

类静态代码块，私有属性（使用#,可以通过 in 关键字来判断）

.at 返回指定索引的元素（.at(-1)）

ES2021:

数值分割符号：如果数字比较长，可读性就比较差，通过分隔符 _ 可以提高可读性

弱引用，可以引用某个对象，而且不会阻止该对象被垃圾回收。

Promise，Promise.any只要有一个输入 resolve 了，那么它就会 resolve。Promise.allSettled无论输入的 promise 是 reject 还是 resolve，都会汇总给 then

String.prototype.replaceAll，返回一个新的字符串，该字符串匹配所有的模式都由传递的第二个参数替代

ES2020：

空值合并运算符：只有在左操作数为 null 或 undefined 时，才会返回右操作数（？？ ｜｜）

可选链，BigInt

### 6.13 作用域

在 ES5 只有**全局作用域**和**函数作用域**，没有块级作用域，内层变量可能会覆盖外层变量。

- 作用域是指程序源代码中定义变量的区域
- 作用域规定了如何查找变量，也就是确定当前执行代码对变量的权限
- javascript和大多数语言一样采用词法作用域

**编译阶段**

1. 通过 var 声明的变量，会提升到函数变量环境中
2. let、const 声明的变量会被推入词法环境中
3. 在代码块内，通过 let、const 声明的变量，既不会推入变量环境，也不会推入词法环境。

**执行阶段**

1. 代码执行到代码块，在代码块内，通过 let、const 声明的变量会被推入到词法环境，因此在代码块内这些变量是可访问的
2. 当代码块执行结束时，在代码块内，通过 let、const 声明的变量会从词法环境中推出，因此在代码块外访问不到这些变量

```js
// 实现let
var a = 2;
(function(){
    var a = 3;
    console.log(a); //3
})()
console.log(a)//2
// 实现const
因为ES5没有block的概念，因此无法完全实现const,主要挂载到某个属性下就好了，因此这个容器：无论是全局javascript中的全局对象window，还是自定义的object
function _const(data, value) {
    Object.defineProperty(window, data, {
        enumerable: false,  //是否可以被for-in循环访问属性，也就是能否在对象上定义属性。
        configurable: false,//是否可以被删除
        get: function() {
            return value;
        },
        set: function() {
            throw new TypeError('Assignment to constant variable.');
        }
    })
}
```

## (七) 设计模式

### 7.1 设计模式

为了保证代码高内聚低耦合，将对外暴露的接口灵活化，将对内封装的函数稳定化，减少内存占用。

| 创建型模式 | 单例模式、工厂模式、建造者模式                             |
| ---------- | ---------------------------------------------------------- |
| 结构型模式 | 适配器模式、装饰器模式、代理模式                           |
| 行为型模式 | 策略模式、观察者模式、发布订阅模式、职责链模式、中介者模式 |

1. **构造器模式**

 普通的class或构造函数生成，但是如果生成多个对象时会造成两个缺点。

 1）如果一个对象内部有公共方法，会造成内存不必要的占用 => 利用原型模式解决

 2）比如有三个职业，我们没必要先new三个职业再进行选择，可以先通过职业判断再new对象 => 工厂模式

1. **原型模式**
2. **工厂模式**

 通过switch进行判断后进行new对象，主要用于创建同一对象。

 `vue-router` 中使用了工厂模式的思想来获得响应路由控制类的实例，`this.history` 用来保存路由实例。

1. **抽象工厂模式**

 子继父类，完成对父类接口的重写。

1. **建造者模式**

 工厂模式只关注输入和输出，不关注中间过程。建造者模式关注过程。

1. **单例模式**

单例模式：一个类只有一个实例，并提供一个访问他的全局访问点。

- 优缺点优点： 节约资源，保证访问的一致性。缺点： 扩展性不友好，因为单例模式一般自行实例化，没有接口。
- 使用场景如果一个类实例化过程消耗资源比较多，可以使用单例避免性能浪费需要公共状态，可以使用单例保证访问一致性。
- 举例Vuex：实现了一个全局的store用来存储应用的所有状态。这个store的实现就是单例模式的典型应用。

```js
// 1
class Singleton {    
    let _instance = null;    
	static getInstance() {        
        if (!Singleton._instance) {          
            Singleton.instance = new Singleton()        
        }
        // 如果这个唯一的实例已经存在，则直接返回        
        return Singleton._instance    
    	} 
	} 
    const s1 = Singleton.getInstance() 
    const s2 = Singleton.getInstance() 
    console.log(s1 === s2)  // true
// 2
let cache;
class A {
    constructor (name) {
        this.name = name
    }
    say () { 
        console.log('hello')
    }
}
function getInstance(className) {
    if (cache) return cache;
    return cache = new className();
}
const x = getInstance(A);
const y = getInstance(A);
```

1. **装饰器模式**

 在不改变原对象的基础上，增加新属性/方法/功能。AOP面向切面编程，通常通过`.before()`实现

```js
Function.prototype.before = function(beforeFn){ // AOP装饰函数
    var _this = this
    return function(){
        beforeFn.apply(this, arguments)
        return _this.apply(this, arguments)
    }
}
```

1. **适配器模式**

 用于解决兼容问题，接口/方法/数据不兼容，将其转换成访问者期望的格式进行使用。可以使原有逻辑得到更好的复用，有助于避免大规模改写现有代码；缺点是会让系统变得零乱，明明调用 A，却被适配到了 B，如果滥用，那么对可阅读性不太友好。

1. **策略模式**

 算法的实现和算法的使用分开。场景：表单验证。

```js
function priceCalculate(discountType,price){
    if(discountType === 'discount200-20'){
        return price - Math.floor(price/200) * 20;
    }else if(discountType === 'discount300-50'){
        return price - Math.floor(price/300) * 50;
    }else if(userType === 'discount500-100'){
        return price - Math.floor(price/500) * 100;
    }
}
```

 缺点：随着折扣类型的增加，`if-else`会变得越来越臃肿。折扣活动算法改变或折扣类型增加时，都需要改动`priceCalculate`方法，违反开闭原则。复用性差，如果其他地方有类似的算法，但规则不一样，上述代码不能复用。

```js
// 算法的实现
const discountMap = {
    'discount200-20': function(price) {
        return price - Math.floor(price / 200) * 20;
    },
    'discount300-50': function(price) {
        return price - Math.floor(price/300) * 50;
    },
    'discount500-100': function(price) {
        return price - Math.floor(price/500) * 100;
    },
}
// 算法的使用
function priceCalculate(discountType,price){
    return discountMap[discountType] && discountMap[discountType](price);
}
```

1. **代理模式**

 通过一个类A调用另一个类B，实现对该类B的进一步封装校验等操作。

1. **观察者模式**

 观察者模式包含观察目标和观察者两类对象。

 观察目标和观察者是一对多的关系。

 一旦观察目标的状态发生改变，所有的观察者都将得到通知。

 例子：使用proxy和reflect实现观察者模式。

1. **发布订阅模式**

 发布/订阅者模式最大的特点就是实现了松耦合，也就是说你可以让发布者发布消息、订阅者接受消息，而不是寻找一种方式把两个分离的系统连接在一起。当然这种松耦合也是发布/订阅者模式最大的缺点，因为需要中间的代理，增加了系统的复杂度。而且发布者无法实时知道发布的消息是否被每个订阅者接收到了，增加了系统的不确定性。适合于应用程序可以向消费者发送信息，而不需要消费者的实时响应。

 在观察者模式中，主体维护观察者列表，因此主体知道当状态发生变化时如何通知观察者。然而，在发布者/订阅者中，发布者和订阅者不需要相互了解。它们只需在中间层消息代理（或消息队列）的帮助下进行通信。

 Vue数据双向绑定原理是通过数据劫持结合发布者-订阅者模式的方式来实现的，首先是对数据进行监听，然后当监听的属性发生变化时则告诉订阅者是否要更新，若更新就会执行对应的更新函数从而更新视图。

```js
class Observer {
    constructor() {
        this.message = {} // 消息队列
    }

    // on: 订阅事件的方法，根据传入的 eventName 事件名，将 handler 追加到新建或存在的事件队列中
    $on(type, callback) {
        // 判断有没有这个属性（事件类型）
        if (!this.message[type]) {
            // 如果没有这个属性，就初始化一个空的数组
            this.message[type] = [];
        }
        // 如果有这个属性，就往他的后面push一个新的callback
        this.message[type].push(callback);
    }

    // off: 取消事件订阅，根据事件名和处理函数取消事件订阅，如不传入处理函数，则清空相应的事件队列
    $off(type, callback) {
        // 判断是否有订阅，即消息队列里是否有type这个类型的事件，没有的话就直接return
        if (!this.message[type]) return;
        // 判断是否有callback这个参数
        if (!callback) {
            // 如果没有callback,就删掉整个事件
            this.message[type] = undefined;
            return;
        }
        // 如果有callback,就仅仅删掉callback这个消息(过滤掉这个消息方法)
        this.message[type] = this.message[type].filter((item) => item !== callback);
        if(!this.message[type].length) delete this.message[type];
    }

    // emit: 触发事件的方法，根据传入事件名称、参数遍历事件队列并触发事件
    $emit(type) {
        // 判断是否有订阅
        if (!this.message[type]) return;
        // 如果有订阅，就对这个`type`事件做一个轮询 (for循环)
        this.message[type].forEach(item => {
            // 挨个执行每一个消息的回调函数callback
            item()
        });
    }

    // once: 执行单次事件订阅，触发后自动清除订阅
    $once(type, callback) {
        const tempHandler = (args) => {
            this.$off(type, tempHandler);
            callback(args);
        };
        this.$on(type, tempHandler);
    }
}

function handlerA() {
    console.log('buy handlerA');
}

function handlerB() {
    console.log('buy handlerB');
}

// 使用构造函数创建一个实例
const person1 = new Observer();

person1.$on('buy', handlerA);
person1.$on('buy', handlerB);

console.log('person1 :>> ', person1);

// 触发 buy 事件
person1.$emit('buy')
person1.$off('buy', handlerA)
```

1. **模块模式、桥接模式、组合模式、命令模式、模板方法模式、迭代器模式、职责链模式**

**参考：**

- JS 常用的六种设计模式介绍 https://juejin.cn/post/7061987842473345061
- 面试官：Vue中的观察者模式 https://juejin.cn/post/7123499373832601636
- 如何理解vue数据双向绑定原理 https://zhuanlan.zhihu.com/p/138710460

## (八) Dom

### EventListener

*** element*.addEventListener**(*event*, *function*, *useCapture*)

 用于在 DOM 元素上设置事件监听器。这个方法的作用是允许你指定当特定事件发生时要执行的函数。

- event:事件名，如“click”
- function:回调函数
- useCapture：可选。布尔值，指定事件是否在捕获或冒泡阶段执行,[默认false，即事件冒泡]。

通过addEventListener()添加的事件处理程序只能使用removeEventListener()来移除；移除时传入的参数与添加处理程序时使用的参数相同。这也意味着通过addEventListener()添加的匿名函数无法移除。

注意：

通过function调用this指向该元素，通过箭头函数调用指向window

### InnerHTML

**InnerHTML和textContent**

1. 元素的innerHTML属性获取或设置该元素的HTML内容。因为textContent元素不会自动对文本进行编码和解码，所以我们只能对元素的内容部分进行操作。
2. text content只是允许你把纯文本写成字符串，但innerHTML提供了一种直接和更简单的方法，可以把HTML模板创建成字符串并插入到DOM中。
3. text content在做改变时，会删除子节点。text content具有良好的性能，它的值不被解析。而且它可以防止XSS攻击。
4. text content与innerText不同，它不知道CSS的样式，不会引起回流。只有 HTMLElement 对象有 innerText，而所有 Node 对象有 textContent。
5. innerHTML=''不会移除绑定在dom上的事件处理函数

### Attribute

** HTML Attributes 和 DOM properites**

Html Attributes指的是定义在HTML标签上的属性。 在Attributes上有与之同名的DOM properties，例如“id='mt-input'与el.id”,"class=''与el.className"。

当改变html的内容时，dom properties会发生改变，但el.getAttributes始终得到初始值。

Attributes的作用是设置与之对应的DOM properties的初始值。

### MutationObserver

 MutationObserver可监视对DOM树所做的更改，作为一个观察者对象，DOM变化执行触发回调，提供了一个接口操作DOM。

```
const observer = new MutationObserver(callback);// 创建一个观察器实例并传入回调函数
observer.observe(targetNode, config);// 以上述配置开始观察目标节点
observer.disconnect();// 之后，可停止观察
observer.takeRecords()//从通知队列中删除所有待处理的通知，并将它们返回到 MutationRecord 对象的新 Array 中。
```

作用：

1.判断vue Dom渲染完成。它的不同于events的是，所有监听操作以及相应处理都是在其他脚本执行完成之后异步执行的，并且是所以变动触发之后，将变得记录在数组中，统一进行回调的，也就是说，当你使用observer监听多个DOM变化时，并且这若干个DOM发生了变化，那么observer会将变化记录到变化数组中，等待一起都结束了，然后一次性的从变化数组中执行其对应的回调函数。

2.Element中无限滚动这个指令，为了解决滚动加载的问题，v-infinite-scroll的绑定值，就是数据的加载回调函数。而立即执行是针对初始状态下内容撑满容器的需求，必然要知道内容DOM的变化，以确认需要执行多少次回调函数：onScroll

### postMessage

**window.postMessage**

基本原理是通过postMessage来发送跨文档信息，使用message来进行监听，当收到跨文档信息后，会触发message事件

```
targetWindow.postMessage(message, targetOrigin, [transfer]);
targetWindow:
目标窗口的引用，比如执行window.open返回的窗口对象、打开当前窗口的引用window.opener、iframe的contentWindow属性，或者是命名过或数值索引的window.frames
message:
发送给目标window的数据
targetOrigin:
指定接收消息事件的窗口，其值可以是一个URI或者字符串 "*"（表示无限制）
// A.html （父）
<iframe src="http://127.0.0.1:5501/B.html" frameborder="1" id="Bframe"></iframe>
const msg = {
    name: "A"
  }
window.onload = () => {
  // 自动调用必须放在onload中,通过事件调用则不用
  // let frame = document.querySelector("#Bframe").contentWindow
  let frame = window.frames[0]
  frame.postMessage(msg, "http://127.0.0.1:5501")
}
// B.html
window.addEventListener("message", (e) => {
  console.log(e.data)
  console.log(e.origin)
  console.log(e.source)
})
```

### EventEmitter

 Node.js，其中内置的各种模块里，events就是其中比较重要的一个模块，因为Node.js的事件驱动机制就是建立在events模块上，许多需要实现异步事件驱动架构Node.js模块都内置了events，掌握其实现原理还是非常重要的。 events模块对外提供了一个EventEmitter对象，用于对Node中的事件进行统一管理。EventEmitter对象上的一些重要方法和功能如下。

- addListener(event,listener)，给指定事件添加一个监听器，on方法的别名。
- emit(event,[arg1],[arg2],[arg3]...)，根据参数的顺序执行每个监听器。
- removeListener(event,listener)，移除指定事件的某个监听器，off方法的别名。
- removeAllListener([event])，移除指定事件的所有监听器，如果没有指定事件，则是移除所有事件的监听器。
- once(event,listener)，为指定事件注册一个一次性的监听器，监听器触发一次后立即移除该监听器。
- listeners(event)，返回指定事件的监听器数组。

### Event

`event.target`返回的是，触发事件的元素（当前标签下的子标签）

 `e.target.name` 指的是赋予 `<input>` DOM 元素的 `name` 属性。

`event.currentTarget`返回的是，绑定事件的元素 如果说是一个单标签绑定的事件 可以使用以上任意两种方法都是可行的；

如果你所绑定事件的标签内还有多个子标签的话建议使用` event.currentTarget`。或者使用事件监听，这样，`event.currentTarget`就能拿到绑定事件的节点，而在其下的各种后代节点就可以用event.target.（各种类名，id，标签名，属性值）来具体指向到触发事件的节点。

- [`e.stopPropagation()`](https://developer.mozilla.org/docs/Web/API/Event/stopPropagation) 停止触发附加到上述标签的事件处理程序。
- [`e.preventDefault()`](https://developer.mozilla.org/docs/Web/API/Event/preventDefault)阻止了少数事件的默认浏览器行为。阻止表单提交刷新。

### 获取Dom

- getElementById()括号中的不需要在前面加“#”
- getElementsByClassName()括号中的不需要在前面加 “.”
- document.getElementsByTagName("p") 注意: 该方法返回的也是一个集合。
- querySelector()方法括号中的值是元素的[选择器](https://so.csdn.net/so/search?q=选择器&spm=1001.2101.3001.7020)，所以前面加了”#”符号，使用的是id选择器。此方法直接返回DOM对象本身。

注意：

- 所有获取DOM对象的方法中，只有getElementById()和querySelector()这两个方法直接返回的DOM对象本身，可直接为其绑定事件。
- getElementXXX类型的方法，除了通过Id获取元素，其他都返回一个集合，如果需要取到具体的DOM元素，需要加索引，如：document.getElementsByClassName(“box”)[0] =>获取class为box的所有元素中的第一个DOM元素。
- querySelector()与querySelectorAll()两者的联系与区别：联系： 两者括号中的取值都是选择器区别： 当有多个class相同的元素时，使用querySelector()方法只能获取到第一个class为box的元素，而querySelectorAll()获取到了所有class为box的元素集合。

### DOMContentLoaded

 当一个 HTML 文档被加载和解析完成后，DOMContentLoaded 事件便会被触发。

 当 HTML 文档解析完成就会触发 DOMContentLoaded，而所有资源加载完成之后，load 事件才会被触发。

https://zhuanlan.zhihu.com/p/25876048

## (九) html组件化

```html
<head>
    <meta charset="utf-8" />
    <title>主页面</title>
    <!--import引入-->
    <link rel="import" href="top.html" id="page1"/>
    <link rel="import" href="fotter.html" id="page2"/>
</head>

<!--注意顺序-->
        <!--import在头部引入，里面是啥就是啥-->
        <script type="text/javascript">
            document.write(page1.import.body.innerHTML);
        </script>
        你好呀！    <!--本页面写入内容-->
        <script type="text/javascript">
            document.write(page2.import.body.innerHTML);
        </script>
<!--注意顺序-->
        <!--使用js引入，引入整个文档，但是没有html和body，相当于body里面的数据-->
        <div class="top"></div>
        <div class="center">
            <p>你好，我在中间！</p>
        </div>
        <div class="footer"></div>
        
        <script src="js/jq/jquery-3.2.1.min.js"></script>
        <script type="text/javascript">
            //在js中引入by JQuery
            $(document).ready(function () {
                $('.top').load('top.html');
                $('.footer').load('fotter.html');
            });
        </script>
//include 引入(涉及到一个从网上扒的封装函数,下面有)（head和body标签中的数据直接引入）,利用正则化
<body>
        <!--include引入，顺序很重要-->
        <script src="js/include.js"></script>
        <include src="top.html"></include>
        <include src="center.html"></include>
        <div id="">
            <p>你没有看错，我在这！</p>
        </div>
        <include src="fotter.html"></include>
    </body>
```