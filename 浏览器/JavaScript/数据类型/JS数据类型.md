## 数据类型（3.13滴滴一面）

### 2.1 数据类型有哪些

**基本数据类型：**

number，string，boolean，null，undefined，symbol，bigint

**引用数据类型：**

object，function

object：普通对象，数组对象，正则对象，日期对象，math数学函数对象。

**两种数据存储方式：**

基本数据类型是直接存储再栈中的简单数据段，占据空间小、大小固定，属于被频繁使用的数据。栈是存储基本数据类型值和执行代码的空间。

引用数据类型是存储在堆内存中，占据空间大、大小不固定。引用数据类型在栈中存储了指针，该指针指向队中该实体的起始地址，当解释器寻找引用值时，会检索其在栈中的地址，取得地址后从堆中获得实体。

**两种数据类型的区别：**

1. 堆比栈空间大，栈比堆运行速度快
2. 堆内存是无序存储，可以根据引用直接获取
3. 基础数据类型比较稳定，而且相对来说占用的内存小
4. 引用数据类型大小是动态的，而且是无限的

### 2.2 判断数据类型的方法（3.13滴滴一面）

#### 2.2.1 JavaScript有几种方法判断变量的类型?

在JavaScript中，确定数据类型的方法有很多种，比如typeof操作符、instanceof操作符、constructor属性、Object.prototype.toString方法等，但这些方法各有其优点和限制。

1. typeof操作符: 可以判断基本数据类型（undefined，boolean，number，string，symbol，bigint），但不能判断出null，object，Array，因为它们的返回值都是object，Array属于object。typeof判断是由他们前三位的二进制决定的，null由于它的二进制都是0，object的前三位为0，所以typeof判断出它们都是object。

2. instanceof操作符: 主要是用来判断一个实例是否属于某个类，或者一个对象是否是某个构造函数的实例，因此，它不能判断基本数据类型。另外，在多全局环境下，比如iframe，instanceof的判断结果可能会出问题。

3. constructor属性: 可以用来判断大部分类型，它指向创建当前对象的构造函数，但是可能会被改变，所以不是特别安全。

4. Object.prototype.toString.call()方法: 这是最准确的判断数据类型的方法，它可以识别所有的内置对象类型。在使用它来判断数据类型时，需要通过call方法来调用它，并且将待判断的数据作为它的this值。

判断Null:

- 使用typeof操作符，结果会返回"object"，这是JavaScript的一个历史遗留问题。
- 使用Object.prototype.toString.call(data)，结果会返回"[object Null]"，可以准确判断。

判断数组：

- 最直观的方法是使用Array.isArray()方法，这是最直接也最准确的方法。
- 可以使用instanceof操作符，如 data instanceof Array。
- 使用Object.prototype.toString.call(data)，结果会返回"[object Array]"，可以准确判断。

总的来说，如果需要准确判断数据类型，最准确的方法是使用Object.prototype.toString.call()方法。

#### 2.2.3 instanceof  和 typeof 区别

instanceof和typeof都是JavaScript中用于判断数据类型的操作符，但它们应用的场景和工作方式不同。下面是它们的主要区别：

1. 工作原理

- typeof是一个一元操作符，返回一个字符串，表示未经计算的操作数的类型。对于非对象类型，如number、boolean、undefined、string、symbol、function以及bigint它都能正确的返回。然而对于null，object，Array，它都会返回"object"，这是一个历史问题。

- instanceof是一个二元操作符，检测构造函数的prototype属性是否存在于某个实例对象的原型链上。简单的说，instanceof主要用来判断一个实例是否属于某种类型。适用于判断复杂数据类型，但无法准确判断基本数据类型。

2. 适用范围

- typeof适合用来判断基本数据类型（undefined，boolean，number，string，symbol，bigint、function）。

- instanceof适合用来判断复杂的引用类型，如自定义对象、Array、Function等。

3. 多全局环境下的表现

在多全局环境（如iframe）下，每个全局环境都有独立的全局对象，拥有各自的内置对象构造函数。这将导致instanceof在这些环境下可能会出现问题，因为同一类型的对象在不同的全局环境中可能会返回不同的构造函数。

总结： typeof适用于判断基本类型，而instanceof适用于判断引用类型。但如果你的代码需要在多不同的执行环境下运行，或者你需要对结果有严格的要求，那么Object.prototype.toString.call可能会是一个更好的选择。

#### 2.2.4 typeof的缺点

虽然 typeof 是一个在 JavaScript 中广泛使用的用于检测变量类型的操作符，但是它也有一些明显的缺点：

1. 对于 null 类型，使用 typeof 操作符会返回 "object"。这是一个历史遗留的问题，实际上 null 更应该被认为是一个特殊值。

2. 对于数组、以及常规对象，typeof 都会返回 "object"。这使得我们无法使用 typeof 来区分这些类型。

3. typeof 无法用来判断自定义的对象类型。例如，如果你有一个由特定构造函数创建的对象，typeof 无法告诉你这个对象的确切类型。

4. 对于未定义的变量，typeof 会返回 "undefined"。但如果你的目的是判断一个变量是否已经声明，typeof操作符可能会给出误导，因为对于未声明的变量，它也会返回 "undefined"。

5. typeof 返回的所有有效类型都是以小写形式的字符串，这可能会引发一些不期望的字符大小写问题。

总的来说，typeof 表现最好的情况是用来检查基本数据类型，不过，如果你需要得到更详细的类型信息，或者需要区分对象、数组和函数，那么你可能需要考虑其他的类型检查方法，例如 Object.prototype.toString.call() 或 Array.isArray()。

null被判断成object是因为在底层实现类型的时候，只判断了前三位，而 object 前三位刚好都是0。null 通常在含义上为空指针之类的，一般都是赋值为全0，所以导致的判断异常

#### 2.2.5 typeof null是什么

在JavaScript中，typeof null的结果会返回 "object"。这实质上是JavaScript早期设计的一个错误，但由于修复它会破坏现有的代码，因此这个错误一直保留到现在。在理想情况下，null应该没有类型，因为它代表"没有值"或"无"。这就是为什么typeof null返回 "object"这件事被广泛认为是JavaScript中的一个bug。

#### 2.2.6 typeof function呢

#### 2.2.7 如何判断数组类型，不同方法的优势

### 2.3 null 和 undefined 的区别，如何让一个属性变为null

**undefined 。 **

1. 声明了一个变量，但没有赋值
2. 访问对象上不存在的属性
3. 函数定义了形参，但没有传递实参
4. 使用 void 对表达式求值

**null**

1. null是一个空值
2. null 有属于自己的类型 Null，而不属于Object类型
3. 二进制的前三位为 0 会被 typeof 判断为对象类型



### 2.5 基本数据类型和引用数据类型的区别

- 如果去拷贝一个基本数据类型和拷贝一个引用数据类型，有什么区别

### 2.6 

### 2.7 JS数据类型以什么形式存在浏览器里的，储存的在浏览器的哪个位置，生命周期呢？













## instanceOf

instanceof主要作用就是判断一个实例是否属于某种类型

```javascript
function new_instance_of(leftVaule, rightVaule) {
    let rightProto = rightVaule.prototype; // 取右表达式的 prototype 值
    leftVaule = leftVaule.__proto__; // 取左表达式的__proto__值
    while (true) {
        if (leftVaule === null) {
            return false;
        }
        if (leftVaule === rightProto) {
            return true;
        }
        leftVaule = leftVaule.__proto__
    }
}
```

其实 instanceof 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可。因此，instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype，如果查找失败，则会返回 false，告诉我们左边变量并非是右边变量的实例。





