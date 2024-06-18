## Router

### 6.1 Router

`Router`组件主要做的是通过`BrowserRouter`传过来的当前值，通过`props`传进来的`path`与`context`传进来的`pathname`进行匹配，然后决定是否执行渲染组件，对应的属性如下：

- path 属性：用于设置匹配到的路径
- component 属性：设置匹配到路径后，渲染的组件
- render 属性：设置匹配到路径后，渲染的内容
- exact 属性：开启精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件

`NavLink`是在`Link`基础之上增加了一些样式属性，例如组件被选中时，发生样式变化，则可以设置`NavLink`的一下属性：

- activeStyle：活跃时（匹配时）的样式
- activeClassName：活跃时添加的class

`useHistory`可以让组件内部直接访问`history`，无须通过`props`获取

**withRouter**

​		高阶组件中的`withRouter`, 作用是将一个组件包裹进Route里面, 然后react-router的三个对象history, location, match就会被放进这个组件的props属性中。

​		`withRouter`的作用就是, 如果我们某个东西不是一个`Router`, 但是我们要依靠它去跳转一个页面, 比如点击页面的logo, 返回首页, 这时候就可以使用`withRouter`来做.

### 6.2 模式

1 Hash模式

`hash` 值改变，触发全局 `window` 对象上的 `hashchange` 事件。所以 `hash` 模式路由就是利用 `hashchange` 事件监听 `URL` 的变化，从而进行 `DOM` 操作来模拟页面跳转。react-router`也是基于这个特性实现路由的跳转。

通过window.addEventListener('hashChange',callback)监听hash值的变化，并传递给其嵌套的组件，然后通过context将location数据往后代组件传递。

### 6.3 对比Vue

**1 路由模式**

- Vue-Router支持 history、hash、abstract
- React-Router支持 history、hash、memory

​		Vue Router 中的 **abstract** 模式，是一种不依赖浏览器 history 的路由模式。在 abstract 模式下，Vue Router 会在内存中管理路由，而不会修改浏览器的 URL。

​		使用 abstract 模式的主要场景是在非浏览器环境下使用 Vue Router，比如在 Node.js 服务器端渲染中。在这种情况下，由于没有浏览器的 URL 和 history，不能使用默认的 history 模式或 hash 模式。

​		要使用 abstract 模式，需要在创建 Vue Router 实例时指定 mode 选项为 'abstract'，在 abstract 模式下，可以使用 router.push、router.replace、router.go 等方法进行路由导航，但是不会修改浏览器的 URL。在路由导航完成后，可以使用 router.currentRoute 属性获取当前路由信息。

React的**Memory**模式<MemoryRouter>在内部使用数组存储其位置。与 <BrowserHistory> 和 <HashHistory> 不同，它不与外部源（如浏览器中的历史堆栈）绑定。这使得它非常适合需要完全控制历史堆栈的场景，例如测试。

**2 路由跳转**

- Vue-Router使用<router-link />实现链接式导航
- Vue-Router使用this.$router或useRouter实现编程式导航

```js
// Vue-Router3
this.$router.push("/home")
this.$router.replace("/home")

// Vue-Router4
const router = useRouter()
router.push("/home")
router.replace("/home")
```

- React-Router使用<Link />、<NavLink />实现链接式导航
- React-Router使用history或navigate实现编程式导航

```js
// React-Router4/5 类组件
this.props.history.push("/home")
this.props.history.replace("/home")

// React-Router6 函数组件
const navigate = useNavigate()
navigate("/home")
```

**3 路由渲染**

​		在Vue-Router中，使用 <router-view /> 组件就能把匹配到组件渲染出来，而React-Router需要使用定义路由的<Route />组件或<Outlet />。

**4 路由参数**

Vue-Router 使用router传递参数

1. Vue-Router支持传递query和params两种参数，使用时需要注意以下两点。
2. query传参会在浏览器路径看到，并且刷新页面参数不会丢失。
3. params传参会在浏览器路径看不到，并且刷新页面参数会丢失。并且可以用在普通路由或动态参数路由上。但是需要注意，当应用到动态参数路由上时我们就不能通过params传参了，只能通过params动态传参。

React-Router使用history或navigate传参

1. React-Router支持传递search、params和state三种参数，使用时需要注意以下三点。
2. search传参会在浏览器路径看到，并且刷新页面参数不会丢失。但是参数需要自己获取并处理，一般我们使用URLSearchParams处理。
3. params传参只能应用在动态路由上，普通路由传参不能使用。
4. state传参不会在浏览器路径看到，在history模式下刷新页面参数不会丢失，但是在hash模式下刷新页面参数会丢失。

**5 监听路由变化**

​		Vue-Router和React-Router都支持动态路由，都能通过params获取到动态路由参数。		动态路由在Vue和React中都做了优化，也就是动态参数的变化并不会让组件重新创建和销毁。也就不会触发组件创建、绑定和销毁相关的钩子函数。所以经常会遇到我们写在mounted或者unmounted中的代码不会被重新触发的问题。

​		在Vue中我们可以通过beforeUpdate、updated、beforeRouteUpdate、watch、watchEffect五种方式来监听动态路由参数的变化。		动态路由参数的变化会触发beforeUpdate、updated生命周期函数以及beforeRouteUpdate路由组件内钩子函数。所以上面的例子，通过动态参数获取后台数据的逻辑可以在这些钩子中任选一个加上就可以。推荐使用updated。

​		在`React`中我们可以通过老版本生命周期函数`componentWillReceiveProps、componentWillUpdate、componentDidUpdate`或新版本生命周期函数`getDerivedStateFromProps、getSnapshotBeforeUpdate、componentDidUpdate`以及`watchEffect`四种方式来监听动态路由参数的变化。

​		动态路由参数的变化会触发老版本生命周期函数`componentWillReceiveProps、componentWillUpdate、componentDidUpdate`或新版本生命周期函数`getDerivedStateFromProps、getSnapshotBeforeUpdate、componentDidUpdate`生命周期函数所以上面的例子，通过动态参数获取后台数据的逻辑可以在这些钩子中任选一个加上就可以。推荐使用`componentDidUpdate`。

​		如果是函数组件还可以使用`useEffect`监听路由的方式来监听参数的变化。

**6 路由获取**

Vue任何组件都能获取在Vue中，只要使用了路由，不管是不是路由组件都可以获取到路由（也就是能方便的使用router和route）。

React非路由组件默认获取不到但是在React中，非路由组件是不会自动在props中注入路由相关参数的(也就是在props中没有history、location、match)，这就需要用到withRouter高阶组件了。使用了withRouter后才能在非路由使用history、location、match。当然如果是函数组件我们还可以使用路由相关hooks获取的。

https://juejin.cn/post/7104242876007055396#heading-17