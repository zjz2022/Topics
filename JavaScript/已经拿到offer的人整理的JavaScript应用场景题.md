# 前端面经（Js手撕题部分）

## 10.1 并发限制

```js
class Scheduler {
    constructor(max){
        this.max = max
        this.count = 0
        this.queue = []
    }
    async add(fn){
        if(this.count >= this.max){
            await new Promise(resolve => this.queue.push(resolve))
        }
        this.count++
        const res = await fn()
        this.count--
        this.queue.length && this.queue.shift()()
        return res
    }
}

class Scheduler {
    constructor(max){
        this.max = max
        this.count = 0
        this.queue = []
    }
    add(fn){
        this.queue.push(fn)
    }
    start(){
        for(let i = 0; i < this.max; i++){
            this.doNext()
        }
    }
    doNext(){
        if(this.queue.length && this.max >= this.count){
            this.count++
            this.queue.shift()().then(()=>{
                this.count--
                this.doNext()
            })

        }
    }
}




const scheduler = new Scheduler(2)

const timeout = time => new Promise(resolve => setTimeout(resolve,time))

const addTask = (time,order) => {
    scheduler.add(() => timeout(time).then(()=>console.log(order)))
}

addTask(1000,1)
addTask(500,2)
addTask(300,3)
addTask(400,4)
function limitQueue(urls, limit) {
    // 完成任务数
    let i = 0;
    // 填充满执行队列
    for (let excuteCount = 0; excuteCount < limit; excuteCount++) {
        run();
    }
    // 执行一个任务
    function run() {
        // 构造待执行任务 当该任务完成后 如果还有待完成的任务 继续执行任务
        new Promise((resolve, reject) => {
            const url = urls[i];
            i++;
            resolve(fn(url))
        }).then(() => {
            if (i < urls.length) run()
        })
    }
}
const fn = url => {
    // 实际场景这里用axios等请求库 发请求即可 也不用设置延时
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('完成一个任务', url, new Date());
            resolve({ url, date: new Date() });
        }, 1000);
    })
};
const urls = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

(async _ => {
    await limitQueue(urls, 4);
})()
```

## 10.2 Promise输出

- [40道Promise输出题，你都会了吗？🔥 - 掘金 (juejin.cn)](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Fjuejin.cn%2Fpost%2F7151636219036696613)

## 10.3 setTimeout()

​		渲染进程所有运行在主线程上的任务都需要先添加到消息队列中,然后事件循环系统顺序执行消息队列。		eg: 解析 DOM; 改变 web 大小, 重新布局; js 垃圾回收; 异步执行 js 代码		但是定时器的任务不能直接放置在消息队列中,他需要按照时间间隔来执行。因此,chrome 除了消息队列外,新增了个延时队列,在每次执行完任务后,执行延迟队列中的任务,计算出到期任务,依次执行。最小执行时间4ms。

代码实现:

1） 在每次新增一个定时器时,将定时器添加到 DelayTask 中；2） 执行消息循环时,在当前任务执行完成时,执行延迟队列中的任务,ProcessTimerTask 函数会根据发起时间和延迟时间计算出到期的任务，然后依次执行这些到期的任务；3） 查找延迟队列中的已到期任务执行；4） 取消定时器: 从 delayed_incoming_queue 根据定时器 id 查找到定时器并删除；

```js
DelayedIncomingQueue delayed_incoming_queue;

// 当通过 JavaScript 调用 setTimeout 设置回调函数的时候，渲染进程将会创建一个回调任务，包含了回调函数 showName、当前发起时间、延迟执行时间
struct DelayTask{
  int64 id；
  CallBackFunction cbf;
  int start_time;
  int delay_time;
};
DelayTask timerTask;
timerTask.cbf = showName;
timerTask.start_time = getCurrentTime(); //获取当前时间
timerTask.delay_time = 200;//设置延迟执行时间

// 创建好回调任务之后，再将该任务添加到延迟执行队列中
delayed_incoming_queue.push(timerTask)；



void ProcessTimerTask(){
  //从delayed_incoming_queue中取出已经到期的定时器任务
  //依次执行这些任务
}

//消息循环系统是 触发延迟队列的
TaskQueue task_queue；
void ProcessTask();
bool keep_running = true;
void MainTherad(){
  for(;;){
    //执行消息队列中的任务
    Task task = task_queue.takeTask();
    ProcessTask(task);

    //执行延迟队列中的任务
    ProcessTimerTask()

    if(!keep_running) //如果设置了退出标志，那么直接退出线程循环
        break;
  }
}
```

Settimeout有4ms的延迟可以通过postMessage解决（处理页面中嵌套iframe跨域的问题，它的通信原理类似于TCP三次握手，不但能解决各种跨域问题，而且实时性高。）

参考：

https://juejin.cn/post/6961673921150238751

## 10.4 版本号排序

```js
arr.sort((a, b) => {
  let i = 0;
  const arr1 = a.split(".");
  const arr2 = b.split(".");
 
  while (true) {
    const s1 = arr1[i];
    const s2 = arr2[i];
    i++;
    if (s1 === undefined || s2 === undefined) {
      return arr2.length - arr1.length;
    }
 
    if (s1 === s2) continue;
 
    return s2 - s1;
  }
});
```

## 10.5 Sleep()

```js
const sleep = time => {
 return new Promise(resolve => setTimeout(resolve,time)
 ) } 
const sleep = time => {
 return new Promise(resolve => setTimeout(()=>{resolve()},time)
 ) } 
 sleep(1000).then(()=>{ console.log(1) })
```

## 10.6 手写JS

https://juejin.cn/post/6875152247714480136

## 10.7 缓存装饰器

```js
function cacheDecorator(func) {
  let cache = new Map();

  return function (...args) {
    let key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
	// 如果缓存中没有这个键，我们调用原来的函数 func，并将结果保存在 result 中。
    let result = func.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

## 10.8 限制次数内重试

```js
function retryPromise(func, retries = 5) {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      func().then(resolve).catch((error) => {
        if (n === 0) {
          reject(error);
        } else {
          attempt(n - 1);
        }
      });
    };
    attempt(retries);
  });
}
```

## 10.9 bigint相加

```js
let a = "9007199254740991";
let b = "1234567899999999999";

function add(a ,b){
   //取两个数字的最大长度
   let maxLength = Math.max(a.length, b.length);
   //用0去补齐长度
   a = a.padStart(maxLength , 0);//"0009007199254740991"
   b = b.padStart(maxLength , 0);//"1234567899999999999"
   //定义加法过程中需要用到的变量
   let t = 0;
   let f = 0;   //"进位"
   let sum = "";
   for(let i=maxLength-1 ; i>=0 ; i--){
      t = parseInt(a[i]) + parseInt(b[i]) + f;
      f = Math.floor(t/10);
      sum = t%10 + sum;
   }
   if(f == 1){
      sum = "1" + sum;
   }
   return sum;
}
```

## 10.10 防抖和节流

**使用场景：防抖和节流**

防抖：让`事件`在触发后`N`秒后执行，如果在`N`秒内重新触发，则`重新计算`时间。

场景：

- 按钮双击，我们平时电脑上快速双击就有可能触发两次点击事件
- 输入框的input或者change时间
- 轮动条

```js
function debounce(fn, delay){
    let timer
    return function(){
        if(timer) clearTimeout(timer)
        let args = arguments
        timer = setTimeout(()=>{
            fn.apply(this,args)
        }, delay)
    }
}
// input实现防抖
<div>
<input type="text" id="ipt">
</div> <script>
let ipt = document.getElementById('ipt');
let dbFun = debounce()
ipt.addEventListener('keyup', function (e) {
dbFun(e.target.value);
})
function debounce() {
let timer;
return function (value) {
clearTimeout(timer);
timer = setTimeout(() =>
{
console.log(value)
}, 500);
}
}
</script>
```

节流：在规范时间内，只能触发一次函数，如果多次触发不会执行。

```js
function throttle(func, time) {
    let lastTime = null;
    return function (...args) {
        let now = +new Date()
        if (now - lastTime > wait) {
            lastTime = now
            func.apply(this, args)
        }
    }
}
var throttle = function(fn, t) {
    let timer = null
    let tempArgs = null
  const func = function(...args) {
      if(!timer){
          fn(...args)
          timer = setTimeout(_=>{
              timer = null
              if(tempArgs){
                  func(...tempArgs)
              }
              tempArgs = null
          }, t)
      }else{
          tempArgs = args
      }
  }
  return func
};
```

## 10.11 Promise.all

```js
function promiseAll(promises) {
    return new Promise(function(resolve, reject) {
        // 记录已解决的 promise 的数量
        let resolvedCount = 0;
        // 记录每个 promise 的结果
        const promiseResults = new Array(promises.length);

        for (let i = 0; i < promises.length; i++) {
            // 立即执行每个 promise
            promises[i].then(
                // promise 成功解决
                value => {
                    resolvedCount++;
                    promiseResults[i] = value;

                    // 如果所有的 promise 都解决了，那么我们可以解决总的 promise
                    if (resolvedCount === promises.length) {
                        resolve(promiseResults);
                    }
                },
                // 如果任何一个 promise 失败了，我们都需要拒绝总的 promise
                error => {
                    reject(error);
                }
            );
        }
    });
}
const promises = [
    Promise.resolve('Promise 1'),
    Promise.resolve('Promise 2'),
    Promise.resolve('Promise 3'),
    Promise.resolve('Promise 4')
];

promiseAll(promises)
    .then((fulfilled) => {
        console.log('Fulfilled promises:', fulfilled);
    })
    .catch((reason) => {
        console.error('Error:', reason);
    });
//race
//方法接收一个包含多个 Promise 对象的可迭代对象，并返回一个新的 Promise 对象，该 Promise 对象在多个 Promise 中任意一个 Promise 对象状态变为 fulfilled 或 rejected 时立即返回该 Promise 对象的值或原因。
function promiseRace(promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            reject(new TypeError('Promises must be an array'));
            return;
        }

        if (promises.length === 0) {
            reject(new Error('Promises array must not be empty'));
            return;
        }

        promises.forEach((promise) => {
            Promise.resolve(promise)
                .then(resolve)
                .catch(reject);
        });
    });
}
//some
function PromiseSome(promises, n) {
    return new Promise((resolve, reject) => {
        if (promises.length < n) reject('Not enough promises to fulfill the request');

        let results = [];
        let settled = 0;
        let stillPending = promises.length;

        promises.forEach((promise, i) => {
            Promise.resolve(promise)
                .then(value => {
                    settled += 1;
                    results[i] = value;
                    stillPending -= 1;

                    if (settled >= n) {
                        resolve(results);
                    }
                })
                .catch(() => {
                    stillPending -= 1;

                    if (stillPending + settled < n) {
                        reject('Too many promises rejected');
                    }
                });
        });
    });
};
//any
MyPromise.any = function(promises){
  return new Promise((resolve,reject)=>{
    promises = Array.isArray(promises) ? promises : []
    let len = promises.length
    // 用于收集所有 reject 
    let errs = []
    // 如果传入的是一个空数组，那么就直接返回 AggregateError
    if(len === 0) return reject(new AggregateError('All promises were rejected'))
    promises.forEach((promise)=>{
      promise.then(value=>{
        resolve(value)
      },err=>{
        len--
        errs.push(err)
        if(len === 0){
          reject(new AggregateError(errs))
        }
      })
    })
  })
}
Promise.prototype.finally = function (callback) {
let P = this.constructor;
return this.then(
value => P.resolve(callback()).then(() => value),
reason => P.resolve(callback()).then(()
=> { throw reason })
);
};
// none
Promise.none = function(promises) {
    return Promise.all(promises.map(promise => {
        return new Promise((resolve, reject) => {
            // Promise.all里边的所有promise实例反过来就好了
            return Promise.resolve(promise).then(reject, resolve)
        })
    }))
}
// none2
Promise.none = function(promises) {
    return new Promise(function(resolve, reject) {
        let count = promises.length;
        let reasons = new Array(count);
        if (count === 0) {
            resolve(reasons);
            return;
        }

        promises.forEach(function(promise, index) {
            Promise.resolve(promise).then(function() {
                reject(new Error("At least one promise resolved"));
            }, function(reason) {
                reasons[index] = reason;
                if (--count === 0) {
                    resolve(reasons);
                }
            });
        });
    });
};
const promisesForNoneTest1= [
    Promise.reject('1'),
    Promise.reject('2'),
    Promise.resolve('3'),
    Promise.reject('4'),
]
Promise.none(promisesForNoneTest1).then(res => {
    console.log('true promises:', res);
}, res => {
    console.log('false promises:', res);
})
 Promise.first = function(promises) {
    return new Promise((resolve, reject) => {
      let rejectNum = 0
      promises.forEach(promise => {
        // 如果当前 promise 决议为reslove，那就直接执行"根promise"的resolve
        // 否则去记录到拒绝的promise中，然后判断全部的promise拒绝了，执行"根promise"的reject
        Promise.resolve(promise).then(resolve, () => {
          if (++rejectNum === promises.length) {
            // 这里可以控制reject返回的信息
            reject()
          }
        })
      })
    })
  }
Promise.map = function(arr, mapper) {
    // 首先，使用 map 将数组中的每个元素都转换为 promise。
    let promises = arr.map((item, index, arr) => Promise.resolve(mapper(item, index, arr)));

    // 然后，使用 Promise.all 来等待所有 promise 都 resolve。
    return Promise.all(promises);
};
let mapper = function(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(num);  // 输出处理的数字
            resolve(num);
        }, 1000);
    });
};
let nums = [1, 2, 3, 4, 5];
Promise.map(nums, mapper)
    .then(results => {
        console.log('All promises are resolved');
        console.log('Results:', results);  // 输出：Results: [ 1, 2, 3, 4, 5 ]
    })
    .catch(err => {
        console.log('A promise rejected with', err);
    });
```

## 10.12 apply&bind

```js
//apply&call
Function.prototype.myApply = function (context, args) {
    console.log(this)
    context = context || window;
    const fnSymbol = Symbol();
    context[fnSymbol] = this;
    const result = context[fnSymbol](...args);
    delete context[fnSymbol];
    return result;
};
//bind
Function.prototype.myBind = function (){
    const args = [...arguments]
    const self = args.shift()
    console.log(this)
    const t = this
    return function (){
        t.apply(self,args.concat(...arguments))
    }
}
```

## 10.13 数组转树

```js
function formatToTree(ary, pid, pidName = 'parentId') {
  return ary
      .filter((item) => item[pidName] === pid)
      .map((item) => {
          // 通过父节点ID查询所有子节点
          item.children = formatToTree(ary, item.id);
        return item;
      });
}
const data = [{ id: 2, name: "研发部", parentId: 1 },...]
```

## 10.14 排序

| 冒泡排序 | O(n2)    | O(n2)    | O(1)    | 是   |
| -------- | -------- | -------- | ------- | ---- |
| 选择排序 | O(n2)    | O(n2)    | O(1)    | 不是 |
| 直接插入 | O(n2)    | O(n2)    | O(1)    | 是   |
| 归并     | O(nlogn) | O(nlogn) | O(n)    | 是   |
| 快排     | O(nlogn) | O(n2)    | O(logn) | 不是 |
| 堆排序   | O(nlogn) | O(nlogn) | O(1)    | 不是 |
| 希尔排序 | O(nlogn) | O(ns)    | O(1)    | 不是 |
| 计数排序 | O(n+k)   | O(n+k)   | O(n+k)  | 是   |
| 基数排序 | O(N*M)   | O(N*M)   | O(M)    | 是   |

```js
//归并排序
function mergeSort(arr) {
    if (arr.length === 1) return arr;
    const midIdx = Math.floor(arr.length / 2);
    return merge(mergeSort(arr.slice(0, midIdx)), mergeSort(arr.slice(midIdx)))
}

function merge(leftArr, rightArr) {
    let temp = [];
    while (leftArr.length > 0 && rightArr.length > 0) {
        if (leftArr[0] < rightArr[0]) {
            temp.push(leftArr.shift());
        } else {
            temp.push(rightArr.shift());
        }
    }
    return temp.concat(leftArr).concat(rightArr);
}
//快速排序

function quickSort(arr) {
    // 基线条件：小于或等于1个元素的数组是有序的
    if (arr.length <= 1) return arr;

    // 选择一个基准值，这里我们选择数组的中间值作为基准值
    let pivotIndex = Math.floor(arr.length / 2);
    let pivot = arr.splice(pivotIndex, 1)[0];

    // 定义两个子数组，一个用于存放比基准值小的元素，另一个用于存放比基准值大的元素
    let left = [];
    let right = [];

    // 遍历数组，将比基准值小的元素放入左边的子数组，比基准值大的元素放入右边的子数组
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    // 递归地对左右两个子数组进行快速排序，然后连接这两个子数组和基准值，得到排序后的数组
    return quickSort(left).concat([pivot], quickSort(right));
}

// 时间复杂度：平均情况下为O(n log n)，最坏情况下为O(n^2)，但在实际应用中表现良好。

console.log(quickSort([1,25,72,3,78,2,5,8,9,-2]))
快速排序的最坏情况发生在每次选择的基准值都是输入数组的最小值或最大值时。这会导致每次递归调用只能减少一个元素，从而使算法退化为O(n^2)的复杂度。

具体来说，以下是一些导致最坏情况的场景：

1. **已排序的数组**：如果输入数组已经是升序或降序，且我们每次选择第一个或最后一个元素作为基准值，那么快速排序将会退化为O(n^2)。

2. **含有许多重复值的数组**：如果数组包含许多重复的值，并且这些重复值经常被选为基准值，那么分区可能会非常不平衡。

为了避免这些最坏情况，通常有以下几种策略：

1. **随机选择基准值**：每次从数组中随机选择一个元素作为基准值，这样即使在面对已排序的数组时，平均情况下也能达到O(n log n)的性能。

2. **使用"三数取中"策略**：选择数组的第一个、中间和最后一个元素中的中值作为基准值。这可以减少对已排序输入或近似排序输入的不良性能。

3. **双基准快速排序**：这是快速排序的变种，它每次选择两个基准值并将数组分为三部分。这种方法在处理有大量重复值的数组时表现得更好。

总之，虽然快速排序在最坏情况下的性能不佳，但通过适当的策略，可以在大多数情况下获得很好的平均性能。

function quickSort(arr) {
    quickSort_c(arr, 0, arr.length - 1);
}

function quickSort_c(arr, p, r) {
    if (p >= r) return;
    let q = partition(arr, p, r);
    quickSort_c(arr, p, q - 1);
    quickSort_c(arr, q + 1, r);
}

function partition(arr, p, r) {
    let i = j = p;
    while (j < r) {
        if (arr[j] < arr[r]) {
            swap(arr, j, i);
            i++;
        }
        j++;
    }
    swap(arr, i, r)
    return i
}

function swap(arr, i, r) {
    let temp = arr[i];
    arr[i] = arr[r];
    arr[r] = temp;
}

//降序
function quickSortDesc(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[Math.floor(arr.length / 2)];
    const less = [];
    const greater = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > pivot) {
            less.push(arr[i]);
        } else if (arr[i] < pivot) {
            greater.push(arr[i]);
        }
    }

    return [...quickSortDesc(less), pivot, ...quickSortDesc(greater)];
}

// 示例用法
const array = [9, 4, 2, 7, 1, 5, 8, 3, 6];
const sortedArray = quickSortDesc(array);
console.log(sortedArray);
```

## 10.15 同一对象

```js
function areDeeplyEqual(o1, o2) {
    if (Object.prototype.toString.call(o1) !== Object.prototype.toString.call(o2)) {
        return false;
    }
    if (o1 !== null && typeof o1 === 'object') {
        const keys1 = Object.keys(o1);
        const keys2 = Object.keys(o2);
        if (keys1.length !== keys2.length) return false;
        return keys1.every((k) => areDeeplyEqual(o1[k], o2[k]));
    }

    return o1 === o2;
}
```

## 10.16数组扁平化

```js
// 1.递归
function flatDeep(arr){
	let result = [];
	for(let i = 0; i < arr.length; i++) {
		if(Array.isArray(arr[i])){
			result = result.concat(flatDeep(arr[i]))
		} else {
			result.push(arr[i])
		}
	}
	return result;
}
// 2.ES6
function flatDeep(arr) {
	return arr.flat(Infinity)
}
// 3.扩展运算符与some
function flatDeep(arr) {
	while(arr.some(item => Array.isArray(item))){
		arr = [].concat(...arr)
	}
	return arr;
}
// 4.reduce
function flatDeep(arr) {
	return arr.reduce((pre, next) => {
		return pre.concat(Array.isArray(next) ?  flatDeep(next) : next)
	},[])
}
// 5.toString
function flatDeep(arr){
	let result = [];
	return result = arr.toString().split(',').map(Number)
}
// 6.正则表达式
const res3 = JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']');
// 传参
var flat = function (arr, n) {  
    if(n === 0) return arr;
    return arr.reduce((acc, item) => {
        if (Array.isArray(item)) {
            acc.push(...flat(item, n - 1))
        } else {
            acc.push(item)
        }
        return acc
    }, [])
    
};
var flat = function (arr, n) {
    while(arr.some(item=>Array.isArray(item))&&n>0){
        arr=[].concat(...arr)
        n--;
    }
    return arr;
};



var array = [1, [2, [3, [4, 5]]]];
console.log(flatDeep(array));
```

## 10.17 instance

```js
function myInstanceof(L = null, R) {
    // 对于左侧参数如果是非对象直接返回false
    if (Object(L) !== L) return false
    // 对于右侧参数可以认为只能为函数且不能没有Prototype属性
    if (typeof R !== 'function' || !R.prototype) throw new TypeError('Right-hand side of 'instanceof' is not an object')
    // 声明一个变量获取对象的__proto__
    let link = L.__proto__
    // 做循环（当link最终指向null，如果指向null的情况下都找不到那就返回false）
    while (link !== null) {
        // 如果找到说明R.prototype在L的原型链上，即返回true
        if(link === R.prototype) return true
        // 逐级向下
        link = link.__proto__
    }
    return false
}
function myTypeof(params){
  const type = Object.prototype.toString.call(params).slice(8, -1).toLowerCase()
  const map = {
    'number': true,
    'string': true,
    'boolean': true,
    'undefined': true,
    'bigint': true,
    'symbol': true,
    'function': true
  }
  return map[type] ? type : 'object'
```

## 10.18 登录流程

1.前端校验

2.发送请求

3.路由跳转

```
useRouter.repalce(path)
```

4.拦截器

```js
const httpInstance = axios.create(baseURL,timeout)
httpInstance.interceptors.request.use(config=>{
	if(token){config.header.Authorization = `Bearer ${token}`} //一次配置
	return config
},e)

httpInstance.interceptors.response.use(res=>{},e=>{
    e.reponse.status == 401
})
```

5.用户管理

```
Pinia或vuex集中管理
```

6.持久化

```
本地化保存Token
```

7.更改页面显示

```
v-if
```

8.配置退出

参考：

https://juejin.cn/post/7072771035312947207

## 10.19 比较版本号

```js
function compareVersion(version1, version2) {
  const arr1 = version1.split('.')
  const arr2 = version2.split('.')
  const length1 = arr1.length
  const length2 = arr2.length
  const minlength = Math.min(length1, length2)
  let i = 0
  for (i ; i < minlength; i++) {
    let a = parseInt(arr1[i])
    let b = parseInt(arr2[i])
    if (a > b) {
      return 1
    } else if (a < b) {
      return -1
    }
  }
  if (length1 > length2) {
    for(let j = i; j < length1; j++) {
      if (parseInt(arr1[j]) != 0) {
        return 1
      }
    }
    return 0
  } else if (length1 < length2) {
    for(let j = i; j < length2; j++) {
      if (parseInt(arr2[j]) != 0) {
        return -1
      }
    }
    return 0
  }
  return 0
}
```



## 10.20 对象结构化

```js
const obj = {
    a : 1,
    b : {
        f : '2',
        g : '3'
    },
    c : [
        1,
        2,
        {
            e : true
        }
    ]
}
output: { a: 1, 'b.f': '2', 'b.g': '3', 'c[0]': 1, 'c[1]': 2, 'c[2].e': true }
let res = {};
let question1 = (obj,path) => {
    // 这里一般是数组里面的数字，如果传进来的是基本数据类型的数，就取路径直接加进结果
    if(!(obj instanceof Object)){
        res[path.slice().join('')] = obj;
    }
    // 遍历对象的键和值
    Object.entries(obj).forEach(([key,value]) => {
        // 如果值是数组
        if(value instanceof Array){
            path.push(key);
            // 遍历数组
            value.forEach((item,index) => {
                // 把索引加入路径
                path.push(`[${index}]`);
                // 如果是非数字，要加上.
                if(item instanceof Object){
                    path.push('.');
                }
                // 递归调用
                question1(item,path)
                path.pop()
            })
            // 如果是对象，加上key和.后继续递归回溯
        } else if(value instanceof Object){
            path.push(key + '.');
            question1(value,path);
            path.pop()
        } else {
            // 基本数据类型直接加入结果数组
            path.push(key);
            res[path.slice().join('')] = value;
        }
        path.pop()
    })
    return res
}

console.log(question1(obj,[]))
```

## 10.21 驼峰转下划线

```js
function getKebabCase(str) {
    let temp = str.replace(/[A-Z]/g, function(i) {
        return '_' + i.toLowerCase();
    })
    if (temp.slice(0,1) === '_') {
        temp = temp.slice(1);   //如果首字母是大写，执行replace时会多一个_，需要去掉
    }
    return temp;
}
function getKebabCase(str) {
    let arr = str.split('');
    let result = arr.map((item) => {
        if (item.toUpperCase() === item) {
            return '_' + item.toLowerCase();
        } else {
            return item;
        }
    }).join('');
    return result;
// 下划线转驼峰
function getCamelCase(str) {
    return str.replace(/-([a-z])/g, function(all, i) {
        return i.toLowerCase();
    })
}
function getCamelCase(str) {
    let arr = str.split('-');
    return arr.map((item, index) => {
        if (index === 0) {
            return item;
        } else {
           return item.charAt(0).toUpperCase() + item.slice(1); 
        }
    }).join('');
}
```

## 10.22 柯里化

```js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function add(x, y) {
  return x + y;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)); // 输出 3
console.log(curriedAdd(1, 2)); // 输出 3
```

## 10.23 Reduce

```js
Array.prototype.selfReduce = function (callback, initValue) {
        // 获取源数组
        const originArray = this;

        // 判断源数组是否为空，如果为空，抛出异常
        if(!originArray.length) {
            throw new Error('selfReduce of empty array with no initial value');
        }

        // 声明累计器
        let accumulator

        // 是否有初始值情况
        // 设置累计器初始值（如果有初始值，第一次调用`callback`时，`callback`的第一个参数的值为初始值，否则为源数组的第一项）
        if (initValue === undefined) {
            accumulator = originArray[0];
        } else {
            accumulator = initValue;
        }

        // 遍历数组，执行`callback`函数
        for (let i = 0; i < originArray.length; i++) {
            // 如果没有初始值且是最后一次循环，不再执行callback
            if (initValue === undefined && (i + 1) === originArray.length) break;

            // 循环执行 `callback`
            // 这里判断一下`currentValue`
            // 因为有初始值时，`currentValue`是`originArray[i]`
            // 没有初始值时`currentValue`是`originArray[i + 1]`
            accumulator = callback(accumulator, initValue === undefined ? originArray[i + 1] : originArray[i], i, originArray);
        }

        // 把累计器返回出去
        return accumulator
}
```

https://juejin.cn/post/7071871359986925599

## 10.24 多数组取交集

```js
function intersection(){
    if(arguments.length === 0) return [];
    const list = [...arguments];
    if(list.length === 1) return list[0];
    else{
        return list.reduce((items, item) => items.filter(a => item.includes(a)))
    }
}
```

## 10.25 控制信号灯循环

```js
function sleep(duration) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve,duration);
    })
}

async function changeLightColor(duration, color){
    document.getElementById('light').style.background = color
    console.log('color', color)
    await sleep(duration)
}
async function act() {
    while (true) {
        await changeLightColor(30000, 'green');
        await changeLightColor(3000, 'yellow');
        await changeLightColor(20000, 'red');
    }
}
act()
```

## 10.26 倒计时|格式化

```js
// Vue3 封装倒计时逻辑函数
import { computed, onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'
export const useCountDown = () => {
  // 1. 响应式的数据
  let timer = null
  const time = ref(0)
  // 格式化时间 为 xx分xx秒
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
  // 2. 开启倒计时的函数
  const start = (currentTime) => {
    // 开始倒计时的逻辑
    // 核心逻辑的编写：每隔1s就减一
    time.value = currentTime
    timer = setInterval(() => {
      time.value--
    }, 1000)
  }
  // 组件销毁时清除定时器
  onUnmounted(() => {
    timer && clearInterval(timer)
  })
  return {
    formatTime,
    start
  }
}
```

## 10.27 PoweSet幂集

```js
var subsets = function(nums) {
    const ans = [];
    const n = nums.length;
    for (let mask = 0; mask < (1 << n); ++mask) { //一共2^n种可能
        const t = [];
        for (let i = 0; i < n; ++i) {
            if (mask & (1 << i)) {
                t.push(nums[i]);
            }
        }
        ans.push(t);
    }
    return ans;
};
```

## 10.28 分割URL

```js
var url = "http://131.41.230.135:81/baseUser/pageQuery?page=1&pageSize=5"
var obj = {}
var str = url.split("?")[1].split("&")
for (var i = 0; i < str.length; i++) {
    var a = str[i].split('=')
    obj[a[0]] = a[1]
}
console.log(obj)
```

## 10.29 数组去重

```js
//1
const result = Array.from(new Set(arr))
//2
function removeDuplicate(arr) {
  const newArr = []
  arr.forEach(item => {
    if (newArr.indexOf(item) === -1) {
      newArr.push(item)
    }
  })
  return newArr // 返回一个新数组
}
//3
unction removeDuplicate(arr) {
  const newArr = []
  arr.forEach(item => {
    if (!newArr.includes(item)) {
      newArr.push(item)
    }
  })
  return newArr
}
//4
function removeDuplicate(arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
}
//5
function removeDuplicate(arr) {
  const map = new Map()
  const newArr = []
  arr.forEach(item => {
    if (!map.has(item)) { // has()用于判断map是否包为item的属性值
      map.set(item, true) // 使用set()将item设置到map中，并设置其属性值为true
      newArr.push(item)
    }
  })

  return newArr
}
```

## 10.30 new实现

```js
function _new(constructor, ...arg) {
  var obj = {}; // 对应于上面的步骤 1
  obj.__proto__ = constructor.prototype; // 对应于上面的步骤 2

  var res = constructor.apply(obj, arg); // 对应于上面的步骤 3

  return Object.prototype.toString.call(res) === '[object Object]' ? res : obj; // 对应于上面的步骤 4
}

const Fun = function(name) {
  this.name = name;
};



function objectFactory() {
    var obj = new Object(); 
    Constructor = [].shift.call(arguments);// arguments 一个用于被 constructor 调用的参数列表。
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);
    
    // ret || obj 这里这么写考虑了构造函数显示返回 null 的情况
    return typeof ret === 'object' ? ret || obj : obj;
};
```

## 10.31 单例模式

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

## 10.32 发布订阅

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
    // 和emit一致
    $trigger(type, eventData){
          if(this.message[type]){
               this.message[type].forEach((fn) => {
                    fn.call(this, eventData);
                    if(fn.once){
                         this.off(type, fn);
                    }
               })
          }
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
person1.$trigger("buy", 'data');// 执行qq事件 并传入数据 data  下同
person1.$trigger("buy", 'data');//因为执行了once方法  所以qq事件只执行一次  第二次执行无效
```

## 10.33 深拷贝

```js
/**
 * 类型判断
 */
(function (_) {
   // 列举出可能存在的数据类型
   var types = 'Array Object String Date RegExp Function Boolean Number Null Undeﬁned'.split(' ');

   function type() {
       // 通过调用toString()函数，从索引为8时截取字符串，得到数据类型的值
       return Object.prototype.toString.call(this).slice(8, -1);
   }

   for (var i = types.length; i--;) {
        _['is' + types[i]] = (function (self) {
           return function (elem) {
               return type.call(elem) === self;
           };
       })(types[i]);
   }
   return _;
})(_ = {});
/**
  * 深克隆实现方案
  * @param source 待克隆的对象
  * @returns {*} 返回克隆后的对象
  */
function deepClone(source) {
   // 维护两个储存循环引用的数组
   var parents = [];
   var children = [];
   // 用于获得正则表达式的修饰符,/igm
   function getRegExp(reg) {
       var result = '';
       if (reg.ignoreCase) {
           result += 'i'; // 不区分大小写
       }
       if (reg.global) {
           result += 'g'; //g：表示全局（global）模式
       }
       if (reg.multiline) {
           result += 'm'; //m：表示多行（multiline）模式
   }
       return result;
   }
   // 便于递归的_clone()函数
   function _clone(parent) {
       if (parent === null) return null;
       if (typeof parent !== 'object') return parent;
       var child, proto;
       // 对数组做特殊处理
       if (_.isArray(parent)) {
           child = [];
       } else if (_.isRegExp(parent)) {
           // 对正则对象做特殊处理
           //source正则表达式文本
           child = new RegExp(parent.source, getRegExp(parent));
           if (parent.lastIndex) child.lastIndex = parent.lastIndex;
       } else if (_.isDate(parent)) {
           // 对Date对象做特殊处理
           child = new Date(parent.getTime());
       } else {
           // 处理对象原型
           proto = Object.getPrototypeOf(parent);
           // 利用Object.create切断原型链
           child = Object.create(proto);
       }
       // 处理循环引用
       var index = parents.indexOf(parent);
       if (index !== -1) {
           // 如果父数组存在本对象，说明之前已经被引用过，直接返回此对象
           return children[index];
       }
       // 没有引用过，则添加至parents和children数组中
       parents.push(parent);
       children.push(child);
       // 遍历对象属性
       for (var prop in parent) {
           if (parent.hasOwnProperty(prop)) {
               // 递归处理
               child[prop] = _clone(parent[prop]);
           }
       }
       return child;
   }
   return _clone(source);
}

// 测试-----
var origin = {
   a: 1,
   b: [2, 3, 4],
   c: {
       d: 'name'
   }
};
var result = deepClone(origin);

console.log(origin); // { a: 1, b: [ 2, 3, 4 ], c: { d: 'name' } }
console.log(result); // { a: 1, b: [ 2, 3, 4 ], c: { d: 'name' } }


function Animal(name) {
   this.name = name;
}
var animal = new Animal('tom');

var origin = {
   a: function () {
       return 'a';
   },
   b: new RegExp('\d', 'g'),
   c: animal
};
var result = deepClone(origin);

console.log(origin); // { a: [Function: a], b: /d/g, c: Animal { name: 'tom' } }
console.log(result); // { a: [Function: a], b: /d/g, c: Animal { name: 'tom' } }
```

## 10.34 千分位格式化

```js
function format_with_mod(number) {
    let n = number;
    let r = '';
    let temp = '';
    let mod;
    do {
        // 求模的值， 用于获取高三位，这里可能有小数
        mod = n % 1000;
        // 值是不是大于1，是继续的条件

        n = n / 1000;
        // 高三位，取整
        /*
        1将数字转换为32位有符号整数。
		2对该整数执行按位取反操作。
		3再次对结果进行按位取反操作。
        */
        temp = ~~mod;
        // 1.填充: n > 1 循环未结束， 就要填充为比如 1 => 001
        // 不然temp = ~~mod的时候, 1 001， 就会变成 "11"
        // 2.拼接“,”
        r = (n >= 1 ? `${temp}`.padStart(3, '0') : temp) + (!!r ? ',' + r : '');
    } while (n >= 1);
    const strNumber = number + '';
    let index = strNumber.indexOf('.');
    // 拼接小数部分
    if (index >= 0) {
        r += strNumber.substring(index);
    }
    return r;
}
console.log(format_with_mod(1234567893.99));
function format_with_substring(number) {
  // 数字转为字符串，并按照 .分割
  let arr = (number + '').split('.');
  let int = arr[0] + '';
  let fraction = arr[1] || '';
  // 多余的位数
  let f = int.length % 3;
  // 获取多余的位数，f可能是0， 即r可能是空字符串
  let r = int.substring(0, f);
  // 每三位添加','金额对应的字符
  for (let i = 0; i < Math.floor(int.length / 3); i++) {
    r += ',' + int.substring(f + i * 3, f + (i + 1) * 3);
  }
  // 多余的位数，上面
  if (f === 0) {
    r = r.substring(1);
  }
  // 调整部分和小数部分拼接
  return r + (!!fraction ? '.' + fraction : '');
}
console.log(format_with_substring(12112123313.78));
```

## 35 查找对象

```js
function find(obj,path){
    const arr = Array.isArray(path) ? path : path.split('.')
    for(let j = 0; j < arr.length; j++){
        obj = obj[arr[j]] ? obj[arr[j]] :undefined;
    }
    return obj
}
const obj = {a:{b:1,c:{e:2,f:4}},d:3}
console.log(find(obj,'a.c.e'))
console.log(obj)
```

## 36 函数链式调用

```js
function find(data) {
  let results = data;

  function where(key, re) {
    results = results.filter(item => re.test(item[key]));
    return operations;
  }

  function orderBy(key, direction) {
    results.sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'desc' ? 1 : -1;
      }
      if (a[key] > b[key]) {
        return direction === 'desc' ? -1 : 1;
      }
      return 0;
    });
    return operations;
  }

  function exec() {
    return results;
  }

  const operations = { where, orderBy, exec };
  return operations;
}

// 使用
let data = [
  { title: 'test1', userId: 1 },
  { title: 'test2', userId: 2 },
  { title: 'not test', userId: 3 },
  { title: 'test4', userId: 4 },
];

const result = find(data).where('title', /\d$/).orderBy('userId', 'desc').exec();

console.log(result);
```

## 37 数组交集

```js
const arr1 = [1,2,3,4,5],
      arr2 = [5,6,7,8,9];

// 交集
let intersection = arr1.filter(function (val) { return arr2.indexOf(val) > -1 })

// 并集
let union = arr1.concat(arr2.filter(function (val) { return !(arr1.indexOf(val) > -1) }))

// 补集 两个数组各自没有的集合
let complement = arr1.filter(function (val) { return !(arr2.indexOf(val) > -1) })
.concat(arr2.filter(function (val) { return !(arr1.indexOf(val) > -1) }))

// 差集 数组arr1相对于arr2所没有的
let diff = arr1.filter(function (val) { return arr2.indexOf(val) === -1 })

console.log('arr1: ', arr1);
console.log('arr2: ', arr2);
console.log('交集', intersection);
console.log('并集', union);
console.log('补集', complement);
console.log('差集', diff);
const arr1 = [1,2,3,4,5],
      arr2 = [5,6,7,8,9],
      _arr1Set = new Set(arr1),
      _arr2Set = new Set(arr2);


// 交集
let intersection = arr1.filter(item => _arr2Set.has(item))

// 并集
let union = Array.from(new Set([...arr1, ...arr2]))

// 补集 两个数组各自没有的集合
let complement = [...arr1.filter(item => !_arr2Set.has(item)), ...arr2.filter(item => !_arr1Set.has(item))]

// 差集 数组arr1相对于arr2所没有的
let diff = arr1.filter(item => !_arr2Set.has(item))
console.log('arr1: ', arr1);
console.log('arr2: ', arr2);
console.log('交集', intersection);
console.log('并集', union);
console.log('补集', complement);
console.log('差集', diff);
```

## 38 getElementById

为了实现一个自定义的`getElementById`函数，我们需要使用递归遍历DOM树。以下是如何用JavaScript来实现它：

```js
function getElementById(rootNode, id) {
    if (rootNode.id === id) {
        return rootNode;
    }
    for (let i = 0; i < rootNode.childNodes.length; i++) {
        let foundNode = getElementById(rootNode.childNodes[i], id);
        if (foundNode !== null) {
            return foundNode;
        }
    }
    return null;
}
```

你可以像这样调用这个函数：

```js
let rootNode = document.body;  // 或其他根节点
let id = "yourId";  // 想要找的id
let element = getElementById(rootNode, id);
console.log(element); // 打印找到的元素
```

需要注意的是，这个函数只在DOM树中找到的第一个匹配的元素会被返回。如果在DOM树中有多个元素具有相同的ID，这个函数将只返回第一个找到的元素。



## 39 打乱数组(洗牌)

原理：**从原始数组中随机抽取一个新的元素到新数组中**

1. 从还没处理的数组（假如还剩n个）中，产生一个[0, n]之间的随机数 random
2. 从剩下的n个元素中把第 random 个元素取出到新数组中
3. 删除原数组第random个元素
4. 重复第 2 3 步直到所有元素取完
5. 最终返回一个新的打乱的数组

```js
function shuffle(arr){
    var result = [], random;
    while(arr.length>0){
        random = Math.floor(Math.random() * arr.length);
        result.push(arr[random])
        arr.splice(random, 1)
    }
    return result;
}
```

**Fisher–Yates shuffle 洗牌算法每次从未处理的数组中随机取一个元素，然后把该元素放到数组的尾部，即数组的尾部放的就是已经处理过的元素**，这是一种原地打乱的算法，每个元素随机概率也相等，时间复杂度从 Fisher 算法的 O(n2)提升到了 O(n)

1. 选取数组(长度n)中最后一个元素(arr[length-1])，将其与n个元素中的任意一个交换，此时最后一个元素已经确定
2. 选取倒数第二个元素(arr[length-2])，将其与n-1个元素中的任意一个交换
3. 重复第 1 2 步，直到剩下1个元素为止

```js
function shuffle(arr){
    var length = arr.length,
        temp,
        random;
    while(0 != length){
        random = Math.floor(Math.random() * length)
        length--;
        // swap
        temp = arr[length];
        arr[length] = arr[random];
        arr[random] = temp;
    }
    return arr;
}
Array.prototype.shuffle = function() {
  let array = this;
  let len = array.length;
  for (let i = len - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
// 随机打乱，不在原来的位置
function shuffleArray(arr) {
    let n = arr.length;
    for (let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i+1));
        if (j === i) {
            j = i === n - 1 ? 0 : i + 1;
        }
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
const arr = [1,2]
console.log(shuffleArray(arr.slice(0)))
```

## 40 随机数

```js
//求n个a-b之间的随机数
function randomNumbersInRange(a, b, n) {
    if ((b-a+1) < n) {
        throw new Error("范围过小，无法产生所需数量的不重复随机数");
    }

    let numbers = new Set();  // 使用Set来存储随机数，Set的一个特性就是所有的元素都是唯一的

    while(numbers.size < n) {
        let randomNumber = Math.floor(Math.random() * (b - a + 1)) + a;  // 生成在a和b之间的随机整数
        numbers.add(randomNumber);
    }

    return Array.from(numbers);  // 转换Set为Array并返回
}

// 测试函数
let a = 1;
let b = 10;
let n = 8;
console.log(randomNumbersInRange(a, b, n));
//求一个a-b之间的随机数，可以是小数
function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

// 测试函数
let a = 0.5;
let b = 10.5;
console.log(getRandomFloat(a, b));
```

## 41 compose函数

请你编写一个函数，它接收一个函数数组 `[f1, f2, f3，…， fn]` ，并返回一个新的函数 `fn` ，它是函数数组的 **复合函数** 。

```
输入：functions = [x => x + 1, x => x * x, x => 2 * x], x = 4
输出：65 从右向左计算......
var compose = function(functions) {
	return function(x) {
        for(let i = functions.length-1; i >= 0; i--){
            x = functions[i](x)
        }
        return x
    }
};

var compose = function(functions) {
    return function (x) {
        return functions.reduceRight((target, fn) => fn(target), x)
    }
};
```

## 42 两数之和

```js
//得出arr中有几对相加等于target，不能复用数字
function TwoNums(arr, target){
    const map = new Map();
    let res = 0;
    arr.forEach(item => {
        if(map.has(item)){
            map.set(item, map.get(item) + 1);
        }else {
            map.set(item, 1);
        }
    })

    map.forEach(function (value, key, map) {
        while(value > 0 && map.get(target - key) > 0){
            value--;
            map.set(target - key, map.get(target - key) - 1);
            map.set(key, value);
            res++;
        }
    })
    return res;
}

console.log(TwoNums([1,1,2,3,4,4],5))
```

## 43 0-1转化

```js
function flip(input) {
    return input ^ 1;
}
function flip(input) {
    return 1 - input;
}
function flip(input) {
    return input === 1 ? 0 : 1;
}
function flip(input) {
    if (input === 1) {
        return 0;
    } else if (input === 0) {
        return 1;
    }
}
```

## 44 格式化对象

```js
const obj = {
    data: [
        ['xiaoming', 'male', '18', 'beijing', '2020-01-02'],
        ['xiaofang', 'female', '18', 'shanghai', '2020-03-02']
    ],
    columns: [
        { name: 'name', note: '' },
        { name: 'gender', note: '' },
        { name: 'age', note: '' },
        { name: 'address', note: '' },
        { name: 'registerTime', note: '' },
    ]
}
function format(obj) {
 const res = []
    obj.data.forEach(item => {
        const row = {}
        obj.columns.forEach((it,index) => {
            row[it.name] = item[index]
        })
        res.push(row)
    })
    return res
}
console.log(format(obj))
// 输出下面结果
[
    { name: 'xiaoming', 'gender': 'male', age: '18', address: 'beijing', registerTime: '2020-01-02' },
    
    { name: 'xiaofang', 'gender': 'female', age: '18', address: 'shanghai', registerTime: '2020-03-02' },
]
```

## 45 lodash.get

```js
//根据 object对象的path路径获取值。 如果解析 value 是 undefined 会以 defaultValue 取代。
object (Object): 要检索的对象。
path (Array|string): 要获取属性的路径。
[defaultValue] (*): 如果解析值是 undefined ，这值会被返回。
var object = { 'a': [{ 'b': { 'c': 3 } }] };
 
_.get(object, 'a[0].b.c');
// => 3
_.get(object, ['a', '0', 'b', 'c']);
// => 3
_.get(object, 'a.b.c', 'default');
// => 'default'
function get(object, path, defaultVal='undefined') {
    // 先将path处理成统一格式
    let newPath = [];
    if (Array.isArray(path)) {
        newPath = path;
    } else {
        // 先将字符串中的'['、']'去除替换为'.'，split分割成数组形式
        newPath = path.replace(/\[/g,'.').replace(/\]/g,'').split('.');
    }
 
    // 递归处理，返回最后结果
    return newPath.reduce((o, k) => {
        console.log(o, k); // 此处o初始值为下边传入的 object，后续值为每次取的内部值
        return (o || {})[k]
    }, object) || defaultVal;   
}
```

## 46 最大岛屿(坐标)

```js
function dfs(grid, i, j) {
    if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] === 0) {
        return 0;
    }
    grid[i][j] = 0; // 标记已访问过的岛屿单元格，避免重复计算
    let area = 1;
    area += dfs(grid, i+1, j);
    area += dfs(grid, i-1, j);
    area += dfs(grid, i, j+1);
    area += dfs(grid, i, j-1);
    return area;
}

function maxAreaOfIsland(coords) {
    let islands = new Set(coords.map(coord => coord.join(',')));
    let maxArea = 0;

    function dfs(coord) {
        let [x, y] = coord.split(',').map(Number);

        if (!islands.has(coord)) {
            return 0;
        }

        islands.delete(coord);

        let area = 1;
        area += dfs([x-1, y].join(','));
        area += dfs([x+1, y].join(','));
        area += dfs([x, y-1].join(','));
        area += dfs([x, y+1].join(','));

        return area;
    }

    for (let coord of Array.from(islands)) {
        maxArea = Math.max(maxArea, dfs(coord));
    }

    return maxArea;
}


let coords = [
    [0, 2], 
    [0, 3], 
    [1, 0], 
    [1, 1], 
    [1, 3], 
    [2, 1], 
    [2, 2]
];
console.log(maxAreaOfIsland(coords)); // 输出：7
```

## 字节

```js
实现一个定时器函数myTimer(fn, a, b)，
让fn执行，
第一次执行是a毫秒后，
第二次执行是a+b毫秒后，
第三次是a+2b毫秒，
第N次执行是a+Nb毫秒后

要求：
1、使用js
2、myTimer要有返回值，并且返回值是一个函数，调用该函数，可以让myTimer停掉

function myTimer(fn, a, b) {
    let count = 0;
    let isCancelled = false;

    function schedule() {
        if (!isCancelled) {
            setTimeout(() => {
                fn();
                count++;
                schedule();
            }, a + count * b);
        }
    }

    schedule();

    // 返回一个函数，调用这个函数将停止定时器
    return function cancel() {
        isCancelled = true;
    }
}

// 用法
const fn = () => console.log('Hello!', new Date() );
const timer1 = myTimer(fn, 1000, 500);
// const timer2 = myTimer(fn, 1000, 500);

// 一些时间后...
// timer();  // 停止定时器
写一个构造函数Foo，该函数每个实例为一个对象，形如{id:N},其中N表示第N次调用得到的。
要求：
1、不能使用全局变量
2、直接调用Foo()也会返回实例化的对象
3、实例化的对象必须是Foo的实例

function Foo() {
    // 如果调用者忘记使用 new 关键字，此处的代码会保证正确的行为
    if (!(this instanceof Foo)) {
        return new Foo();
    }

    // 使用构造函数自身的一个属性来跟踪调用次数
    Foo.count = (Foo.count || 0) + 1;

    // 将 id 属性设置为调用次数
    this.id = Foo.count;
}

// 测试
const obj1 = new Foo();
console.log(obj1);  // 输出: { id: 1 }

const obj2 = new Foo();
console.log(obj2);  // 输出: { id: 2 }

const obj3 = Foo();  // 不使用 new 关键字
console.log(obj3);  // 输出: { id: 3 }

console.log(obj3 instanceof Foo);  // 输出: true
某公司 1 到 12 月份的销售额存在一个对象里面
如下：{1:222, 2:123, 5:888}，请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。
let obj = {1:222, 2:123, 5:888};
const result = Array.from({ length: 12 }).map((_, index) => obj[index +1] || null);
console.log(result)
class MyClass {
    constructor() {
        this.queue = [];
    }

    add(fn) {
        this.queue.push({
            type: 'function',
            action: fn
        });
        return this; // 返回this以支持链式调用
    }

    sleep(time) {
        this.queue.push({
            type: 'sleep',
            action: time
        });
        return this; // 返回this以支持链式调用
    }

    start() {
        let p = Promise.resolve(); // 创建一个初始Promise
        for (const item of this.queue) {
            if (item.type === 'function') {
                p = p.then(item.action); // 如果是函数，将其添加到Promise链中
            } else if (item.type === 'sleep') {
                p = p.then(() => new Promise(resolve => setTimeout(resolve, item.action))); // 如果是等待，创建一个延迟的Promise
            }
        }
        return p; // 返回Promise，这样可以知道何时结束
    }
}


const myClass = new MyClass();

myClass.add(() => console.log('Hello'))
    .sleep(2000)
    .add(() => console.log('World'))
    .start();
function calculate(s) {
    let stack = [];
    let num = 0;
    let sign = "+";

    for (let i = 0; i < s.length; i++) {
        let c = s[i];

        if (!isNaN(c)) {
            num = num * 10 + parseInt(c);
        }

        if (isNaN(c) || i === s.length - 1) {
            if (sign === "+") {
                stack.push(num);
            } else if (sign === "-") {
                stack.push(-num);
            } else if (sign === "*") {
                stack.push(stack.pop() * num);
            } else if (sign === "/") {
                stack.push(Math.trunc(stack.pop() / num)); // 整数除法仅保留整数部分
            }

            sign = c;
            num = 0;
        }
    }

    return stack.reduce((a, b) => a + b, 0); // 把栈中的所有元素加起来
}

console.log(calculate("3+2*2")); // 输出 7
console.log(calculate(" 3/2 ")); // 输出 1
console.log(calculate(" 3+5 / 2 ")); // 输出 5
```

## 快手

```js
//使用list实现一个map方法
// 创建一个链表 1 -> 2 -> 3 -> null
let list = new ListNode(1, new ListNode(2, new ListNode(3, null)));

// 定义一个函数，将每个元素乘以2
function double(x) {
  return x * 2;
}

// 使用mapLinkedList函数，将double函数应用到链表的每个节点
let newList = mapLinkedList(list, double);

// 打印新链表的元素
let current = newList;
while (current !== null) {
  console.log(current.value);  // 这将会打印出 2, 4, 6
  current = current.next;
}

// 创建一个链表 1 -> 2 -> 3 -> null
let list = new ListNode(1, new ListNode(2, new ListNode(3, null)));

// 定义一个函数，将每个元素乘以2
function double(x) {
  return x * 2;
}

// 使用mapLinkedList函数，将double函数应用到链表的每个节点
let newList = mapLinkedList(list, double);

// 打印新链表的元素
let current = newList;
while (current !== null) {
  console.log(current.value);  // 这将会打印出 2, 4, 6
  current = current.next;
}
//传入index，且不能被用户修改
// 首先定义一个链表节点
class ListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

// 然后定义一个链表的 map 函数
function mapLinkedList(node, fn) {
  return mapLinkedListHelper(node, fn, 0);
}

// 定义辅助函数
function mapLinkedListHelper(node, fn, index) {
  // 如果节点为空，返回 null
  if (node === null) return null;

  // 应用函数到当前节点的值和索引
  let newValue = fn(node.value, index);

  // 递归地应用函数到其余的链表，并增加索引
  let newNext = mapLinkedListHelper(node.next, fn, index + 1);

  // 返回新的链表节点
  return new ListNode(newValue, newNext);
}

// 创建一个链表 1 -> 2 -> 3 -> null
let list = new ListNode(1, new ListNode(2, new ListNode(3, null)));

// 定义一个函数，将每个元素和其索引相加
function addIndex(x, i) {
  return x + i;
}

// 使用mapLinkedList函数，将addIndex函数应用到链表的每个节点
let newList = mapLinkedList(list, addIndex);

// 打印新链表的元素
let current = newList;
while (current !== null) {
  console.log(current.value);  // 这将会打印出 1, 3, 5
  current = current.next;
```

[#前端面经#]()[#校招#]()[#前端#]()[#手撕题#]()



作者：夏目又三
链接：https://www.nowcoder.com/?type=818_1
来源：牛客网