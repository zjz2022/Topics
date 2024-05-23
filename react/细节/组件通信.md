## 组件通信

- **父组件向子组件通信，可以通过 props 方式传递数据；也可以通过 ref 方式传递数据；**

​		父组件中通过给子组件设置属性，将数据传递给子组件，子组件通过 props 来接收，当父组件更改自己状态的时候，子组件接收到的属性就会发生改变。

```
//子组件
class Child extends Component{
  render(){
    return <h1>接收到数据为:{this.props.num}</h1>
  }
}
//父组件
class Parent extends Component{
  num=3;
  render(){
    return <Child num={this.num}></Child>
  }
}
ReactDOM.render(
  <Parent/>,
  document.getElementById('root')
);
```

React 提供的这个ref属性，表示为对组件真正实例的引用，其实就是 ReactDOM.render() 返回的组件实例，ref 可以挂载到组件上也可以挂载到dom元素上。

​		· 挂到组件(class声明的组件)上的 ref 表示对组件实例的引用。不能在函数式组件上使用 ref 属性，因为它们没有实例。		· 挂载到dom元素上时表示具体的dom元素节点。使用方法：

​		· 父组件使用 ref 属性对子组件做标记，获取到子组件的实例或者dom元素，可以调用子组件的方法，传递数据。		· 在 React 最新的版本中，要使用 ref ，需要通过 React.createRef() 方法生成一个ref。

```
//子组件
childClickHandle=(city)=>{
    this.setState({
      address:city
    })
  }
//父组件
this.childComp.current.childClickHandle("beijing");
<Child ref={this.childComp}></Child>
```

- **子组件向父组件通信，通过回调函数方式传递数据；**

```
//子组件
class Child extends Component{
   state={
     name:"admin",
     age:18
  }
  childClickHandle=()=>{
    this.props.showInfo({address:"beijing"})
  }
  render(){
    return (
	    <div>
	    	//方式一：直接调用父组件的方法
		    <button onClick={this.props.showInfo.bind(this,this.state)}>按钮</button>
		    //方式二：先调用自身的方法，再调用父组件的方法
		    <button onClick={this.childClickHandle}>按钮</button>
	    </div>
	)
  }
}

//父组件
class Parent extends Component{
  clickHandle(data){
    //data为子组件中传递过来的数据
    //{address: "beijing"}
    //{name: "admin", age: 18, sex: "woman"}
	console.log(data);
  }

  render(){
    return <Child showInfo={this.clickHandle.bind(this)}></Child>
  }
}
```

- **父组件向后代所有组件传递数据，如果组件层级过多，通过 props 的方式传递数据很繁琐，可以通过 Context.Provider 的方式；**

1. 使用 createContext() 创建一个context 对象（内容为需要传递的数据），参数为默认值；
2. 在父组件外层使用 <.Provider> 将当前 context 的值传递给内部所有的组件树。当使用了 <.Provider> 后，不再读取上面的默认值，需要设置 value 属性来进行数据传递。
3. 当组件需要读取数据时，指定 contextType 读取当前的 context 对象（即刚开始创建的 context）；
4. 通过 this.context，获取到当前 context 内的数据；

上面的方法中，我们实现了跨组件的数据传递，这种方式的缺点是只能有一个共享的数据源，也就是在 Grandson 组件中，指定 contextType 的值只能是一个。那么如果我们有多个数据源都需要进行跨组件传递，我们可以使用 <.Consumer> 来实现对多个数据源进行共享。

- **一个数据源实现跨组件通信，通过指定 contextType 的方式来实现；**
- **多个数据源实现跨组件通信，使用 Context.Consumer 方式实现；**

1. 使用 Context.Consumer ，实现多个数据源跨组件通信。具体使用方法如下：
2. 使用 import 导入要读取的数据文件。使用<.Consumer> ，它里面的语法是函数组件的语法，函数接收的 参数 为当前 createContext() 里的默认值。<.Consumer> 可以嵌套使用，也可以平级使用。