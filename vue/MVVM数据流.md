## MVVM数据流

​		MVVM 和 MVC都是一种设计思想，都是为了保证高内聚低耦合和可重用性的优点。MVVM 与 MVC 最大的区别就是：它实现了View和Model的自动同步，当Model属性改变时，不用手动操作Dom元素去改变View的显示。而改变属性后，该属性对应View的显示会自动改变，因此开发者只需要专注对数据的维护操作即可，而不需要一直操作 dom。

**1 阐述一下你所理解的MVVM响应式原理**

​		vue是采用数据劫持配合发布者-订阅者的模式的方式，通过Object.defineProperty()来劫持各个属性的getter和setter，在数据变动时，发布消息给依赖收集器（dep中的subs），去通知（notify）观察者，做出对应的回调函数，更新视图。MVVM作为绑定的入口，整合Observer,Compile和Watcher三者，通过Observer来监听model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer，Compile之间的通信桥路，达到数据变化Observer）=>视图更新；视图交互变化=>数据model变更的双向绑定效果。

**2 双向数据流**

​		在双向数据流中，Model（可以理解为状态的集合） 中可以修改自己或其他Model的状态， 用户的操作（如在输入框中输入内容）也可以修改状态。（双向数据流也可以叫双向数据绑定）

双向数据流 - 优点

1. 数据模型变化与更新，会自动同步到页面上，用户在页面的数据操作，也会自动同步到数据模型
2. 无需进行和单向数据绑定的那些相关操作；
3. 在表单交互较多的场景下，会简化大量业务无关的代码。

双向数据流 - 缺点

1. 无法追踪局部状态的变化；
2. “暗箱操作”，增加了出错时 debug 的难度；
3. 由于组件数据变化来源入口变得可能不止一个，数据流转方向易紊乱。
4. 改变一个状态有可能会触发一连串的状态的变化，最后很难预测最终的状态是什么样的。使得代码变得很难调试

**3 单项数据流**

对于 Vue 来说，组件之间的数据传递具有单向数据流这样的特性。

1. 父组件总是通过 props 向子组件传递数据；
2. 所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定；
3. 父级 prop 的更新会向下流动到子组件中，但是反过来则不行；
4. 这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解；
5. 每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值；
6. 这意味着不应该在一个子组件内部改变 prop。如果这样做，Vue 会在浏览器的控制台中发出警告。

单向数据流 - 优点

1. 所有状态的改变可记录、可跟踪，源头易追溯；
2. 所有的数据，具有唯一出口和入口，使得数据操作更直观更容易理解，可维护性强；
3. 当数据变化时，页面会自动变化
4. 当你需要修改状态，完全重新开始走一个修改的流程。这限制了状态修改的方式，让状态变得可预测，容易调试。

单向数据流 - 缺点

1. 页面渲染完成后，有新数据不能自动更新，需要手动整合新数据和模板重新渲染
2. 代码量上升，数据流转过程变长，代码重复性变大
3. 由于对应用状态独立管理的严格要求(单一的全局 store，如：Vuex)，在处理局部状态较多的场景时(如用户输入交互较多的“富表单型”应用)，会显得啰嗦及繁琐。

**4 依赖收集**

​		我们知道，当一个可观测对象的属性被读写时，会触发它的getter/setter方法。如果我们可以在可观测对象的getter/setter里面，去执行监听器里面的onComputedUpdate()方法，是不是就能够实现让对象主动发出通知的功能呢？由于监听器内的onComputedUpdate()方法需要接收回调函数的值作为参数，而可观测对象内并没有这个回调函数，所以我们需要借助一个第三方来帮助我们把监听器和可观测对象连接起来。这个第三方就做一件事情——收集监听器内的回调函数的值以及onComputedUpdate()方法。

​		Vue为数据中的每一个key维护一个订阅者列表。对于生成的数据，通过`Object.defineProperty`对其中的每一个key进行处理，主要是为每一个key设置`get`, `set`方法，以此来为对应的key收集订阅者，并在值改变时通知对应的订阅者。

在对key进行取值时，如果`Dep.target`有值，除正常的取值操作外会进行一些额外的操作来添加订阅者。大多数时间里，`Dep.target`的值都为`null`，只有订阅者在进行订阅操作时，`Dep.target`才有值，为正在进行订阅的订阅者。此时进行取值操作，会将订阅者加入到对应的订阅者列表中。

订阅者在进行订阅操作时，主要包含以下3个步骤：

- 将自己放在`Dep.target`上
- 对自己依赖的key进行取值
- 将自己从`Dep.target`移除

Vue 的响应式系统中的一个重要部分是依赖收集。这个过程确保只有当某个状态改变时，依赖于这个状态的计算值或组件才会重新计算或渲染。

以下是一个简化的依赖收集系统的实现：

```js
class Dep {
  //这个例子中，我们创建了一个Dep类，它代表了一个依赖项。每个依赖项都有一个subscribers集合，用于存储所有依赖于这个依赖项的更新函数。
  constructor() {
    this.subscribers = new Set();
  }

  depend() {
    if (activeUpdate) {
      this.subscribers.add(activeUpdate);
    }
  }

  notify() {
    this.subscribers.forEach(sub => sub());
  }
}
//autorun函数接收一个更新函数，并将其包装在一个新的函数中，这个新的函数会在每次运行更新函数时将自己设置为activeUpdate。这样，当我们访问响应式对象的某个属性时，我们就可以将 activeUpdate 添加到这个属性对应的依赖项的 subscribers集合中。
let activeUpdate;
function autorun(update) {
  function wrappedUpdate() {
    activeUpdate = wrappedUpdate;
    update();
    activeUpdate = null;
  }

  wrappedUpdate();
}
//最后，当我们修改响应式对象的某个属性的值时，我们会通知这个属性对应的依赖项，让其调用所有的更新函数，这就实现了状态改变时的响应更新。
function reactive(obj) {
  const deps = new Map();
  return new Proxy(obj, {
    get(obj, key) {
      let dep = deps.get(key);
      if (!dep) {
        dep = new Dep();
        deps.set(key, dep);
      }

      dep.depend();
      return obj[key];
    },
    set(obj, key, newVal) {
      obj[key] = newVal;
      const dep = deps.get(key);
      if (dep) {
        dep.notify();
      }
      return true;
    }
  });
}

const state = reactive({ count: 0 });

autorun(() => {
  console.log(state.count);
});

state.count++; // 控制台输出：1
```

https://www.jianshu.com/p/e6e1fa824849