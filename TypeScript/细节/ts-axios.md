# ts-axios

 初始化项目 

 需求分析 

这次项目主要是我想学一学有关造轮子的方法，根据视频加上个人理解，主要目标是实现以下几个需求

**●**在浏览器端使用 XMLHttpRequest 对象通讯

●支持 Promise API

●支持请求和响应的拦截器

●支持请求数据和响应数据的转换

●支持请求的取消

●JSON 数据的自动转换

●客户端防止 XSRF





 初始化项目 

正常我们在初始化项目时需要配置很多东西，比如要初始化package.json，要选择约束代码规范的eslint，要配置一键格式化代码风格的prettier，要初始化ts文件，例如通过init来进行tsconfig.json的配置，如果是在vue项目里还要对vue.config.json进行一些配置，项目的初始化十分费时费力，所以在本项目中采用的是一个Ts开发脚手架，可以一站式生成工具



TypeScript library starter:这个工具可以快速生成ts代码

使用方式:





Plain Text

复制代码

1

2

3

git clone https://github.com/alexjoverm/typescript-library-starter.git ts-axios 

cd ts-axios 

npm install

通过 git clone 把项目代码拉下来到我们的 ts-axios 目录，然后运行 npm install 安装依赖，并且给项目命名，我们仍然使用 ts-axios。



这个脚手架集成了一些优质工具

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652444463377-150af379-36f3-46da-a3e7-29f285160f75.webp)







 初始化基础代码 

1、首先完成axios的基本传参实现

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652445002577-d196d683-4594-402c-9487-2bae9b8a594c.webp)



2、约束传入参数类型定义相应接口

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652445802273-96c29e27-abb2-49ed-9e5f-1049e5db43fe.webp)



url 为请求的地址，必选属性；而其余属性都是可选属性



3、利用 XMLHttpRequest 发送请求

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652445775809-ce34a306-cd5b-4944-afd7-74c5795e00d7.webp)



 ts-axios基本功能 

 处理Params参数 

axios里对于params转换成url需要考虑的情况

1、普通对象的情况(json.stringfied)

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652190028723-3b3ca142-5777-4c85-b97c-5c548f8489c8.webp)

===》

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652190163113-713e3dde-7687-4aa4-a9c9-4efda50491a4.webp)



2、对象中有数组的情况

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652189505872-ce80e855-2f54-45ef-beab-4736082ccd0b.webp)

===》

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652190366203-b5fe1fcc-3caa-48da-a4ae-a5d335b88548.webp)



3、对象中存在特殊字符

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652189519674-ba4e21c8-9e2f-4156-a240-8f8b7c605656.webp)

===》会将字符转换

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652190359279-1dcaedfe-f691-421d-b69e-321e40a89c41.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652190385221-d6e1503b-828c-4afe-8026-211881068d8c.webp)

(转换法)



4、对象中有null

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652189534591-f7caf851-5fae-4545-8efc-b89790444ce4.webp)

===》

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652190271989-08b1faa3-d5d6-4b91-9e8c-f27426c32ec5.webp)

会去除空值



5、对象中有对象

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652189562287-f26eb692-1c4d-4017-9cc3-2d3ec85fdaf4.webp)

===》

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652190175776-9399aaed-2b01-4216-8919-3287f425991b.webp)

会进行转换



6、去除hash值

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652190049999-8dab8512-e745-4c61-b549-9a83cb95ed33.webp)





7、date的情况

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652190003323-7c439ecf-d2d6-4001-9a34-3db31c885b2d.webp)

===》

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652190190371-f4fedf77-ea80-4ee0-8e31-cbc923125b7f.webp)





 处理data参数 

XMLHttpRequest.send()会传递一个可选的body参数

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652501028132-4fd24e53-2566-4ff0-8792-ce9f110a122d.webp)



在处理send参数时不能简单的只传递一个普通对象，应该传递处理后的json格式对象

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652501116795-219a143f-9aa8-4eea-b893-81a4ada4ec16.webp)







 处理请求头 



data参数经过处理后满足要求，但服务器却无法正确识别，这是由于请求头未正确设置所导致的原因

所以实现请求头的设置是一个必须项:首先请求的headers是一个对象，里面包含着很多的属性，这时可以使用到一个api

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652513771823-f45aa4c7-46db-4c90-8e92-f0901dca9995.webp)



通过这个api可以在客户端发送请求时设置请求头信息

注意：此方法必须在  [open()](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/open) 方法和 [send()](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/send)   之间调用。



通过封装一个方法来处理headers

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652514365202-0eaf0a42-4501-41ac-9e42-30a8ce1f110a.webp)



这个方法主要是给headers设置一个默认的contenttype的头信息，而且请求 header 属性是大小写不敏感，所以在这边要进行规范化



在处理主函数页面headers时还是和先前的逻辑一样

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652514477612-90633a51-cd76-4284-9d54-001faefc2352.webp)





在请求函数xhr中的逻辑，此时主要采用原生api，setRequestHeader来进行操作，在进行这个操作之前要对一些边界情况做处理，比如如果传入的data为null时，是不需要进行配置的

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652514584871-a3edffdf-299f-460a-a0e1-80ae4f46f048.webp)







 支持链式调用 

要支持链式调用的话其返回的就应该是一个promise对象，所以要先对其返回值进行一个定义约束，这个接口用来约束promise的值

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652515151318-6d434ee9-0c87-43bb-8258-f2a320c48b0f.webp)



通过以下接口约束返回值类型，这样的话，当 axios 返回的是 AxiosPromise 类型，那么 resolve 函数中的参数res就是一个 AxiosResponse 类型，就可以进行如上操作

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652515278236-fde48ddd-23b7-47d9-85f0-05d75ba2529f.webp)







而返回的promise对象要在XML的方法中实行，这个方法就是

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652525254477-f21a9b05-26f0-47fa-bff7-d944ff02c1fc.webp)



XMLHttpRequest.onreadystatechange 会在 [XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 的[readyState](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState) 属性发生改变时触发 [readystatechange (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Document/readystatechange_event) 事件的时候被调用。



而readyState如下:所以此时状态不为4的全部视为未成功

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652525302157-05f929ca-e44d-45da-85fe-a0b7e11ea124.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652525335088-d2df75cc-cd5f-4425-a3f1-6ade4f90cb45.webp)



返回的是一个promise对象，这样就满足了返回值的要求

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652526623681-62455d4b-b20b-462a-a290-c7bce69c2005.webp)





将响应式对象通过resolve返回，这样就可以支持链式调用

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652526565258-c75b9c05-7dfb-4340-ba21-2bb518e8e013.webp)







 处理响应头headers 

在通过 XMLHttpRequest 对象的 getAllResponseHeaders 方法时发现获取到的值是如下一段字符串，在这个字符串中是以回车符和换行符 \r\n 结束，它们是每个 header 属性的分隔符

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652526672209-65dd0a6d-73e1-44b7-a658-2899fe02460c.webp)



这个字符串不符合想法，正常响应头中应该是一个对象的形式

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652526739201-2cfb62cb-6a11-4a13-855d-8f18755ce8cb.webp)





 处理响应data 

服务端返回的data是字符串格式

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652528404101-e36aa21c-3d22-4341-b070-1289b8a4fdf3.webp)



而我们希望data是json对象的，所以需要构造一个函数来对此进行操作

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652528381591-879a50c8-7707-4c8b-97b0-f7755d60e51a.webp)



这样就可以得到正确的data对象了

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652528435807-9ceb0f23-e57a-472b-a988-961ce6ceae23.webp)



 ts-axios 异常情况 

 处理网络异常错误 

当网络出现异常（比如不通）的时候发送请求会触发 XMLHttpRequest 对象实例的 error 事件，在此时可以捕获相应的错误

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652529093899-ff7cb21f-3177-426d-b58a-3471b6347adc.webp)







 处理超时错误 

我们可以设置某个请求的超时时间 [timeout](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout)，也就是当请求发送后超过某个时间后仍然没收到响应，则请求自动终止，并触发 timeout 事件。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652529900230-0604ecb9-f946-4f54-972b-312491daddbd.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652529921959-3922f6b1-2e83-4908-b05f-66f0d942d98a.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652529877563-61c5f936-7e8c-4fb7-8087-6e0ad7106485.webp)



 处理非 200 状态码 

对于不在200-300这个区间的状态码，我们也把它们认为是一种错误的情况做处理。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652529793366-8e249954-fe49-4af5-8e12-90ba53e88fc7.webp)



在 onreadystatechange 的回调函数中，添加了对 status 的判断，当出现网络错误或者超时错误的时候，该值都为 0。

接着我们在 handleResponse 函数中对 status 的值再次判断，如果是 200到300的状态码，则认为是一个正常的请求，否则抛错。





 错误信息增强 

前面对于错误信息进行了分项定义，但错误信息不仅仅是狭义的信息，更应该是一个错误对象，这个错误对象包含着各种信息

通过一个类可以非常完美的创建出这个对象

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652531611406-e930553c-9f9d-4dda-8e16-3a79495ae221.webp)



这边有一个注意点是Object.setPrototypeOf这个点:

当class在继承Error, Array, and Map这些内置类的时候可能出现错误，作为用 super (...)调用返回的值替换这个值的一部分，子类化 Error、 Array 等可能不再按预期工作。这是因为 Error，Array 和类似的构造函数使用 ECMAScript 6的 new.target 来调整原型链; 然而，当调用 ECMAScript 5中的构造函数时，无法确保 new.target 的值。默认情况下，其他底层编译器通常具有相同的限制。



这时候可以通过来避免这个错误:

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652532137370-cabf6749-79ce-4905-8d09-c651bf0335f8.webp)





最后通过错误信息类，使得错误信息的可拓展性增强了

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652532674072-22b57672-24a3-4a07-bd2e-5ac51c26e298.webp)







 ts-axios 接口扩展 

 拓展接口 

axios不仅仅是可以通过传入参数来发送信息，其上还有许多方法可以使用，如下:

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652532787130-76ba56f9-02fc-401c-9b43-e5973bbe5f2b.webp)



扩展接口首先需要定义相应的接口类型，以类型来约束接口

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652612394715-f2deee28-a738-4042-8510-cc11f66fe2d6.webp)



接下来创建一个 Axios 类，来实现接口定义的公共方法。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652612522242-bfdad88f-a194-4c5f-abe4-ae6782659526.webp)



其中 request 方法的功能和我们之前的 axios 函数功能是一致。axios 函数的功能就是发送请求，而对于 get、delete、head、options、post、patch、put 这些方法，都是对外提供的语法糖，内部都是通过调用 request 方法实现发送请求，只不过在调用之前对 config 做了一层合并处理。

混合对象实现

混合对象实现思路很简单，首先这个对象是一个函数，其次这个对象要包括 Axios 类的所有原型属性和实例属性，我们首先来实现一个辅助函数 extend

extend 的最终目的是把 from 里的属性都扩展到 to 中，包括原型上的属性。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652613352664-09952978-2c30-44af-b88c-550455ac92d4.webp)



接下来对 axios.ts 文件做修改，我们用工厂模式去创建一个 axios 混合对象。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652613393181-5b63e1ee-db8b-4a83-b785-8b22493f2f5c.webp)



在 createInstance 工厂函数的内部，我们首先实例化了 Axios 实例 context，接着创建instance 指向 Axios.prototype.request 方法，并绑定了上下文 context；接着通过 extend 方法把 context 中的原型方法和实例方法全部拷贝到 instance 上，这样就实现了一个混合对象：instance 本身是一个函数，又拥有了 Axios 类的所有原型和实例属性，最终把这个 instance 返回。由于这里 TypeScript 不能正确推断 instance 的类型，我们把它断言成 AxiosInstance 类型。

这样我们就可以通过 createInstance 工厂函数创建了 axios，当直接调用 axios 方法就相当于执行了 Axios 类的 request 方法发送请求，当然我们也可以调用 axios.get、axios.post 等方法。





 axios 函数重载 

目前我们的 axios 函数只支持传入 1 个参数，如下：

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652621188300-4546d590-b8d5-491f-a97f-70eb83032b8f.webp)



我们希望该函数也能支持传入 2 个参数，如下：

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652621205188-26f99074-4153-451f-9b8e-6d7bff5d1adf.webp)



第一个参数是 url，第二个参数是 config，这个函数有点类似 axios.get 方法支持的参数类型，不同的是如果我们想要指定 HTTP 方法类型，仍然需要在 config 传入 method。



实现:

修改定义，使其支持两种类型

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652621784830-dfeba338-3f7f-48f8-9083-4d442e1dd13b.webp)



对于类型进行判断，这样就可以知道是指定的哪一个类型的函数

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652621812246-ef3bbe5a-5f52-475a-b624-32c2bf01ece1.webp)







 响应数据支持泛型 



通常情况下，我们会把后端返回数据格式单独放入一个接口中：

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652686726146-b563782a-e3e4-4523-bcbf-cb5c484c3acc.webp)



我们可以把 API 抽离成单独的模块：

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652686738587-9e833a1a-9c8d-4e0f-96aa-1a5284e01e19.webp)



接着我们写入返回的数据类型 User，这可以让 TypeScript 顺利推断出我们想要的类型：

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652686763650-fa93a12d-1629-4f07-b62d-3be918b5c9b4.webp)



为了实现这个功能首先要修改对应的接口文件

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652686829813-06418685-1ba7-4ee5-9fc1-090717f71d7b.webp)



这里先给 AxiosResponse 接口添加了泛型参数 T，T=any 表示泛型的类型参数默认值为 any。

接着我们为 AxiosPromise、Axios 以及 AxiosInstance 接口都加上了泛型参数。我们可以看到这些请求的返回类型都变成了 AxiosPromise<T>，也就是 Promise<AxiosResponse<T>>，这样我们就可以从响应中拿到了类型 T 了。





 ts-axios拦截器实现 

 需求分析 

我们希望能对请求的发送和响应做拦截，也就是在发送请求之前和接收到响应之后做一些额外逻辑。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652703636380-7b87f7cd-4c45-439e-95e3-4d6b028a594a.webp)



axios的请求响应拦截是一种链式调用的结合





 接口实现 

根据需求，axios 拥有一个 interceptors 对象属性，该属性又有 request 和 response 2 个属性，它们对外提供一个 use 方法来添加拦截器，我们可以把这俩属性看做是一个拦截器管理对象。use 方法支持 2 个参数，第一个是 resolve 函数，第二个是 reject 函数，对于 resolve 函数的参数，请求拦截器是 AxiosRequestConfig 类型的，而响应拦截器是 AxiosResponse 类型的；而对于 reject 函数的参数类型则是 any 类型的。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652703706421-a348bac2-79b1-481a-8a59-992520d5ff1a.webp)



这里我们定义了 AxiosInterceptorManager 泛型接口，这边使用泛型的原因是因为对于 resolve 函数的参数，请求拦截器和响应拦截器是不同的。所以要根据传入的类型自行进行判断

请求拦截器是 AxiosRequestConfig 类型的

响应拦截器是 AxiosResponse 类型的

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652703836234-8745b1b9-7489-41d8-af37-22d7bb70641f.webp)



我们定义了一个 InterceptorManager 泛型类，内部维护了一个私有属性 interceptors，它是一个数组，用来存储拦截器。该类还对外提供了 3 个方法，其中 use 接口就是添加拦截器到 interceptors 中，并返回一个 id 用于删除；forEach 接口就是遍历 interceptors 用的，它支持传入一个函数，遍历过程中会调用该函数，并把每一个 interceptor 作为该函数的参数传入；eject 就是删除一个拦截器，通过传入拦截器的 id 删除。

 链式调用实现 

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652703922997-ce43dca4-622b-47b0-a630-dcb3aa1441a7.webp)



Interceptors 类型拥有 2 个属性，一个请求拦截器管理类实例，一个是响应拦截器管理类实例。我们在实例化 Axios 类的时候，在它的构造器去初始化这个 interceptors 实例属性。

接下来，我们修改 request 方法的逻辑，添加拦截器链式调用的逻辑：

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652703983598-3db992cd-0a96-40ca-ab56-82a691a3d706.webp)



添加链式调用的逻辑，首先，构造一个 PromiseChain 类型的数组 chain，并把 dispatchRequest 函数赋值给 resolved 属性；接着先遍历请求拦截器插入到 chain 的前面；然后再遍历响应拦截器插入到 chain 后面。

接下来定义一个已经 resolve 的 promise，循环这个 chain，拿到每个拦截器对象，把它们的 resolved 函数和 rejected 函数添加到 promise.then 的参数中，这样就相当于通过 Promise 的链式调用方式，实现了拦截器一层层的链式调用的效果。

注意我们拦截器的执行顺序，对于请求拦截器，先执行后添加的，再执行先添加的；而对于响应拦截器，先执行先添加的，后执行后添加的。





 ts-axios配置化实现 

 配置合并及策略 

在发送请求的时候可以传入一个配置，来决定请求的不同行为。我们也希望 ts-axios 可以有默认配置，定义一些默认的行为。这样在发送每个请求，用户传递的配置可以和默认配置做一层合并。

和官网 axios 库保持一致，我们给 axios 对象添加一个 defaults 属性，表示默认配置，你甚至可以直接修改这些默认配置：

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652783206094-f5ae1ed7-3d59-4da3-88d2-d0083e78c55f.webp)



其中对于 headers 的默认配置支持 common 和一些请求 method 字段，common 表示对于任何类型的请求都要添加该属性，而 method 表示只有该类型请求方法才会添加对应的属性。

在上述例子中，我们会默认为所有请求的 header 添加 test 属性，会默认为 post 请求的 header 添加 Content-Type 属性。



首先先构造出一个默认配置defaults对象，这个对象对不同请求做了处理，配置了默认参数，处理过程

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652783555391-54d107f8-584e-491c-98e9-77c0d2027b9f.webp)



这里定义了 defaults 常量，它包含默认请求的方法、超时时间，以及 headers 配置。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652783530764-083ba9b5-39c6-4edb-b53a-90f65756b0f2.webp)



接下来要将defaults属性添加到 axios 对象中，并在constructor中初始化这个对象

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652784041846-11c5730d-0b87-4df5-9c18-01f28df1d738.webp)



并在对应的创建函数中传入这个对象，这样axios的实例上就成功添加上了defaults这个属性

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652784079606-e9c7657a-a30a-4830-93c9-d259114be9d2.webp)



  

完成了上述操作就可以进行合并策略，这种合并策略并不是简单的合并策略，如下例子，config1 代表默认配置，config2 代表自定义配置

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652784278709-b9814ffc-ae49-42d2-ad0c-0241da77f3e8.webp)



遵循的规则如下:

1、默认合并策略

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652785603652-3388c427-0637-4880-a8d2-68b7365e4286.webp)



它很简单，如果有 val2 则返回 val2，否则返回 val1，也就是如果自定义配置中定义了某个属性，就采用自定义的，否则就用默认配置。

2、只接受自定义配置合并策略

对于 url、params、data 这些属性，默认配置显然是没有意义的，它们是和每个请求强相关的，所以我们只从自定义配置中获取。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652785929549-4d4c8d1e-59f0-42c2-a117-d945cf7172d9.webp)



3、复杂对象合并策略

对于一些属性如 headers，合并策略如下：

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652792939536-72778831-5f97-4d90-9f1c-004f8772dd1a.webp)



对于 headers 这类的复杂对象属性，我们需要使用深拷贝的方式，同时也处理了其它一些情况，因为它们也可能是一个非对象的普通值。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652792952998-709d3ad8-79e4-4bf2-8100-14610b131cdf.webp)



经过合并后的配置中的 headers 是一个复杂对象，多了 common、post、get 等属性，而这些属性中的值才是我们要真正添加到请求 header 中的。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652792985322-2ed8720c-3695-4800-b1cf-f38cf3c09a22.webp)



这里要注意的是，对于 common 中定义的 header 字段，我们都要提取，而对于 post、get 这类提取，需要和该次请求的方法对应。

通过实现一个方法来实现以上效果

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652793020936-66a62dc7-4b69-46b4-97b6-a40bc4230952.webp)







 请求和响应配置化 

官方的 axios 库 给默认配置添加了 transformRequest 和 transformResponse 两个字段，它们的值是一个数组或者是一个函数。



1、其中 transformRequest 允许你在将请求数据发送到服务器之前对其进行修改，这只适用于请求方法 put、post 和 patch，如果值是数组，则数组中的最后一个函数必须返回一个字符串或 FormData、URLSearchParams、Blob 等类型作为 xhr.send 方法的参数，而且在 transform 过程中可以修改 headers 对象。

2、而 transformResponse 允许你在把响应数据传递给 then 或者 catch 之前对它们进行修改。当值为数组的时候，数组的每一个函数都是一个转换函数，数组中的函数就像管道一样依次执行，前者的输出作为后者的输入。

如以下的例子:

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652793143140-f1b4ea9e-9f62-4631-9e3e-8c1c47a15e6d.webp)



先修改 AxiosRequestConfig 的类型定义，添加 transformRequest 和 transformResponse 俩个可选属性。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652793666045-af4d3a5d-2d1e-4a16-82e8-821c73444212.webp)



接着修改默认配置，如下,把之前对请求数据和响应数据的处理逻辑，放到了默认配置中，也就是默认处理逻辑。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652793845739-889fe3f3-7543-4ec5-bf31-1112317b6d98.webp)



接下来，我们就要重构之前写的对请求数据和响应数据的处理逻辑了。由于我们可能会编写多个转换函数，我们先定义一个 transform 函数来处理这些转换函数的调用逻辑。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652794963628-ef905cc5-8fc9-4be6-92ff-1e59654ac21c.webp)



transform 函数相当于可以把transformRequest和Response中的代码连续执行，然后就可以重构修改数据的逻辑了

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652795041128-e7f7953d-55fd-42ba-9a04-7a0716d92bc6.webp)



通过demo解析了我们这个的作用

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652795097339-fc6e2fa7-5c91-47ba-9e45-9df1ad0ff3ef.webp)



我们对 transformRequest 做了修改，在执行它默认的 transformRequest 之前，我们先用 qs.stringify 库对传入的数据 data 做了一层转换。同时也对 transformResponse 做了修改，在执行完默认的 transformResponse 后，会给响应的 data 对象添加一个 data.b = 2。

因为之前我们实现了配置的合并，而且我们传入的 transformRequest 和 transformResponse 遵循默认合并策略，它们会覆盖默认的值。

至此，我们就实现了请求和响应的配置化。到目前为止，我们的 axios 都是一个单例，一旦我们修改了 axios 的默认配置，会影响所有的请求。官网提供了一个 axios.create 的工厂方法允许我们创建一个新的 axios 实例，同时允许我们传入新的配置和默认配置合并，并做为新的默认配置。下面一节课我们就来实现这个 feature。





 扩展 axios.create 静态接口 

axios允许通过调用create方法创建处一个实例，时允许我们传入新的配置和默认配置合并，并做为新的默认配置。例如:

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652795183403-641f86c9-4230-431a-82ed-a2207c9e39c5.webp)



通过拓展一个create方法来实现上述功能

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652795568940-23fe586a-b001-45d6-a1b0-43a8151786bc.webp)



AxiosStatic方法继承了AxiosInstance的所有方法，并且有了自己独有的create方法，接着我们来实现 axios.create 静态方法。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652795613899-44c8561a-1d92-4457-8874-767347e56b29.webp)



axios.create方法主要是为了创建实例的，同时也可以合并参数，所以调用函数然后传入合并后的对象即可





 取消功能 

 需求分析 

有些场景下，我们希望能主动取消请求，比如常见的搜索框案例，在用户输入过程中，搜索框的内容也在不断变化，正常情况每次变化我们都应该向服务端发送一次请求。但是当用户输入过快的时候，我们不希望每次变化请求都发出去，通常一个解决方案是前端用 debounce 的方案，比如延时 200ms 发送请求。这样当用户连续输入的字符，只要输入间隔小于 200ms，前面输入的字符都不会发请求。

但是还有一种极端情况是后端接口很慢，比如超过 1s 才能响应，这个时候即使做了 200ms 的 debounce，但是在我慢慢输入（每个输入间隔超过 200ms）的情况下，在前面的请求没有响应前，也有可能发出去多个请求。因为接口的响应时长是不定的，如果先发出去的请求响应时长比后发出去的请求要久一些，后请求的响应先回来，先请求的响应后回来，就会出现前面请求响应结果覆盖后面请求响应结果的情况，那么就乱了。因此在这个场景下，我们除了做 debounce，还希望后面的请求发出去的时候，如果前面的请求还没有响应，我们可以把前面的请求取消。

 异步分离的设计方案 

通过需求分析，我们知道想要实现取消某次请求，我们需要为该请求配置一个 cancelToken，然后在外部调用一个 cancel 方法。



请求的发送是一个异步过程，最终会执行 xhr.send 方法，xhr 对象提供了 [abort](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort) 方法，可以把请求取消。因为我们在外部是碰不到 xhr 对象的，所以我们想在执行 cancel 的时候，去执行 xhr.abort 方法。

现在就相当于我们在 xhr 异步请求过程中，插入一段代码，当我们在外部执行 cancel 函数的时候，会驱动这段代码的执行，然后执行 xhr.abort 方法取消请求。

我们可以利用 Promise 实现异步分离，也就是在 cancelToken 中保存一个 pending 状态的 Promise 对象，然后当我们执行 cancel 方法的时候，能够访问到这个 Promise 对象，把它从 pending 状态变成 resolved 状态，这样我们就可以在 then 函数中去实现取消请求的逻辑，类似如下的代码：

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652879968590-af5ed861-6f97-4000-8668-1d9ab279baa9.webp)



首先要先实习一个CancelToken的类实现，其中 CancelToken 是实例类型的接口定义，Canceler 是取消方法的接口定义，CancelExecutor 是 CancelToken 类构造函数参数的接口定义。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652880003706-83e3e594-0ea5-4896-82bc-43e242da7fed.webp)



实现相应的cancelToken方法

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652880060960-4ad57446-c73b-43a6-a36a-cfb898d55b9c.webp)

在 

CancelToken

 构造函数内部，实例化一个 

pending

 状态的 Promise 对象，然后用一个 

resolvePromise

 变量指向 

resolve

 函数。接着执行 

executor

 函数，传入一个 

cancel

 函数，在 

cancel

 函数内部，会调用 

resolvePromise

 把 Promise 对象从 

pending

 状态变为 

resolved

 状态。



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652880098498-f15b2f87-ef33-490a-9151-bda6e199135f.webp)



接下来我们需要拓展静态接口，其中 CancelTokenSource 作为 CancelToken 类静态方法 source 函数的返回值类型，CancelTokenStatic 则作为 CancelToken 类的类类型。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652880121318-f54e7102-65d5-4038-b9ce-006c05f5ec9f.webp)



source 的静态方法很简单，定义一个 cancel 变量实例化一个 CancelToken 类型的对象，然后在 executor 函数中，把 cancel 指向参数 c 这个取消函数。

这样就满足了我们第一种使用方式，但是在第一种使用方式的例子中，我们在捕获请求的时候，通过 axios.isCancel 来判断这个错误参数 e 是不是一次取消请求导致的错误，接下来我们对取消错误的原因做一层包装，并且把给 axios 扩展静态方法

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652880146159-dd195dc6-b753-48a0-8cbc-c34627cedf33.webp)



接下来可以拓展下axios的静态方法

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652880175636-ed4096b7-4e57-4342-b638-19a9731def2e.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652880229765-6de829e1-de5a-40f6-9b35-c0c2e3583751.webp)

、

比如当一个请求携带的 

cancelToken

 已经被使用过，那么我们甚至都可以不发送这个请求，只需要抛一个异常即可



拓展相应的方法

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652880282763-6730c4b7-48e0-49d1-8a55-dfd66b825720.webp)







 ts-axios 更多功能实现 

 withCredentials 

有些时候我们会发一些跨域请求，比如 http://domain-a.com 站点发送一个 http://api.domain-b.com/get 的请求，默认情况下，浏览器会根据同源策略限制这种跨域请求，但是可以通过 [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) 技术解决跨域问题。

在同域的情况下，我们发送请求会默认携带当前域下的 cookie，但是在跨域的情况下，默认是不会携带请求域下的 cookie 的，比如 http://domain-a.com 站点发送一个 http://api.domain-b.com/get 的请求，默认是不会携带 api.domain-b.com 域下的 cookie，如果我们想携带（很多情况下是需要的），只需要设置请求的 xhr 对象的 withCredentials 为 true 即可。

首先先添加上接口属性

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652965994474-3c7991ea-b306-40b3-97f6-9c553f86cb1a.webp)



然后在发送请求的页面解构获取

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652966023110-461b8780-c17c-4a66-b490-aa5bd5d12e8d.webp)







 XSRF 防御 

XSRF 又名 [CSRF](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Website_security#Cross-Site_Request_Forgery_(CSRF))，跨站请求伪造，它是前端常见的一种攻击方式，我们先通过一张图来认识它的攻击手段。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652966101023-af60db25-9011-4746-b6a6-6dc7527dce17.webp)



CSRF 的防御手段有很多，比如验证请求的 referer，但是 referer 也是可以伪造的，所以杜绝此类攻击的一种方式是服务器端要求每次请求都包含一个 token，这个 token 不在前端生成，而是在我们每次访问站点的时候生成，并通过 set-cookie 的方式种到客户端，然后客户端发送请求的时候，从 cookie 中对应的字段读取出 token，然后添加到请求 headers 中。这样服务端就可以从请求 headers 中读取这个 token 并验证，由于这个 token 是很难伪造的，所以就能区分这个请求是否是用户正常发起的。

对于我们的 ts-axios 库，我们要自动把这几件事做了，每次发送请求的时候，从 cookie 中读取对应的 token 值，然后添加到请求 headers中。我们允许用户配置 xsrfCookieName 和 xsrfHeaderName，其中 xsrfCookieName 表示存储 token 的 cookie 名称，xsrfHeaderName 表示请求 headers 中 token 对应的 header 名称。



首先先添加接口并默认配置

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652966565108-8de1a266-46c9-4a0f-aaee-3ed94cef8f0e.webp)



接下来我们要做三件事：

●首先判断如果是配置 withCredentials 为 true 或者是同域请求，我们才会请求 headers 添加 xsrf 相关的字段。

●如果判断成功，尝试从 cookie 中读取 xsrf 的 token 值。

●如果能读到，则把它添加到请求 headers 的 xsrf 相关字段中。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652967104523-8350f15a-24a4-4e52-a813-9bd6e719c47d.webp)



通过上述方法可以进行同源判断，通过创建a标签可以获得域名和端口，以此来来判断是否同源，而后根据正则读取cookie

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652967999010-6de83591-f756-4566-8a6b-4660054f2bc3.webp)



最后在满足同源，且withCredentials满足且有相应cookiename的时候进行写入

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652968033214-c9a63607-0f21-43ed-bc7f-74d537df9086.webp)







 上传和下载的进度监控 

有些时候，当我们上传文件或者是请求一个大体积数据的时候，希望知道实时的进度，甚至可以基于此做一个进度条的展示。

我们希望给 axios 的请求配置提供 onDownloadProgress 和 onUploadProgress 2 个函数属性，用户可以通过这俩函数实现对下载进度和上传进度的监控。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652968661368-ca34a870-7a2e-4ada-9749-b1a293c44e71.webp)



xhr 对象提供了一个 [progress](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/progress_event) 事件，我们可以监听此事件对数据的下载进度做监控；另外，[xhr.uplaod](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload) 对象也提供了 [progress](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/progress_event) 事件，我们可以基于此对上传进度做监控。首先修改接口和添加相应定义

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652969221839-c23e1eeb-0c7c-4740-a2c8-8253c37fc120.webp)



另外，如果请求的数据是 FormData 类型，我们应该主动删除请求 headers 中的 Content-Type 字段，让浏览器自动根据请求数据设置 Content-Type。比如当我们通过 FormData 上传文件的时候，浏览器会把请求 headers 中的 Content-Type 设置为 multipart/form-data。

我们先添加一个判断 FormData 的方法。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1653016525958-41bb9f9c-e6e1-40dc-8263-3b33ec3250a2.webp)



我们发现，xhr 函数内部随着需求越来越多，代码也越来越臃肿，我们可以把逻辑梳理一下，把内部代码做一层封装优化。

我们把整个流程分为 7 步：

●创建一个 request 实例。

●执行 request.open 方法初始化。

●执行 configureRequest 配置 request 对象。

●执行 addEvents 给 request 添加事件处理函数。

●执行 processHeaders 处理请求 headers。

●执行 processCancel 处理请求取消逻辑。

●执行 request.send 方法发送请求。





 HTTP 授权 

HTTP 协议中的 [Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization) 请求 header 会包含服务器用于验证用户代理身份的凭证，通常会在服务器返回 401 Unauthorized 状态码以及 WWW-Authenticate 消息头之后在后续请求中发送此消息头。

axios 库也允许你在请求配置中配置 auth 属性，auth 是一个对象结构，包含 username 和 password 2 个属性。一旦用户在请求的时候配置这俩属性，我们就会自动往 HTTP 的 请求 header 中添加 Authorization 属性，它的值为 Basic 加密串。 这里的加密串是 username:password base64 加密后的结果。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1653016617153-99222828-2d47-47be-98e5-2904e9ed2381.webp)



首先要修改类型定义

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1653016636768-a7c59690-9892-4f5d-9dff-c4c345a43ca4.webp)



接着修改合并规则，因为 auth 也是一个对象格式，所以它的合并规则是 deepMergeStrat。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1653034190838-028a9a48-310b-4ad0-84fd-5e52aabb929e.webp)



然后修改发送请求前的逻辑。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1653034180084-8882913e-8674-4478-848d-e5a1e14fa71a.webp)









 自定义合法状态码 

之前 ts-axios 在处理响应结果的时候，认为 HTTP [status](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status) 在 200 和 300 之间是一个合法值，在这个区间之外则创建一个错误。有些时候我们想自定义这个规则，比如认为 304 也是一个合法的状态码，所以我们希望 ts-axios 能提供一个配置，允许我们自定义合法状态码规则。如下：

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1653034330353-399467d8-fcf2-4374-a4ee-99b88baff5ea.webp)



通过在请求配置中配置一个 validateStatus 函数，它可以根据参数 status 来自定义合法状态码的规则。

首先先修改定义

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1653034408077-b34016e4-4a80-4c99-b156-1a8f4b6b0952.webp)



如果没有配置 validateStatus 以及 validateStatus 函数返回的值为 true 的时候，都认为是合法的，正常 resolve(response)，否则都创建一个错误

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1653038858886-bed16fc4-eb6a-4dfa-afe0-a6cd53a78b55.webp)









 自定义参数序列化 

在之前的章节，我们对请求的 url 参数做了处理，我们会解析传入的 params 对象，根据一定的规则把它解析成字符串，然后添加在 url 后面。在解析的过程中，我们会对字符串 encode，但是对于一些特殊字符比如 @、+ 等却不转义，这是 axios 库的默认解析规则。当然，我们也希望自己定义解析规则，于是我们希望 ts-axios 能在请求配置中允许我们配置一个 paramsSerializer 函数来自定义参数的解析规则，该函数接受 params 参数，返回值作为解析后的结果，如下：

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1653039047131-31ddc7c6-2396-4919-a093-d9fbc8cb327d.webp)



这里我们给 buildURL 函数新增了 paramsSerializer 可选参数，另外我们还新增了对 params 类型判断，如果它是一个 URLSearchParams 对象实例的话，我们直接返回它 toString 后的结果。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1653039620228-bc37534d-4774-4de4-98ad-cea8db5b88d5.webp)



判断是否为URLSearchParams的实例

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1653039674494-3052c5b1-c47c-4305-b974-0d890faffb76.webp)



最后我们要修改 buildURL 调用的逻辑。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1653039661033-6eccba1e-ee04-460c-a029-b28b7a0b0d11.webp)









 baseURL 

有些时候，我们会请求某个域名下的多个接口，我们不希望每次发送请求都填写完整的 url，希望可以配置一个 baseURL，之后都可以传相对路径。如下：

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1653039795357-c488a1d9-785d-4d66-82de-921602c5a486.webp)



我们一旦配置了 baseURL，之后请求传入的 url 都会和我们的 baseURL 拼接成完整的绝对地址，除非请求传入的 url 已经是绝对地址。

首先修改一下类型定义。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1653039820716-5943b49f-0964-4911-81e0-9180386c61c3.webp)



实现两个函数，一个是判断是否是相对路径地址，另一个是合并URL参数的

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1653040262260-ef4ced4e-fe3d-4bf9-b7c2-bc0c26507cf3.webp)



调用相应的辅助函数

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1653040298431-e4e985c8-2824-4db9-bd77-f74c9a0a7473.webp)





 静态方法拓展 

实际上，axios.all 就是 Promise.all 的封装，它返回的是一个 Promise 数组，then 函数的参数本应是一个参数为 Promise resolves（数组）的函数，在这里使用了 axios.spread 方法。所以 axios.spread 方法是接收一个函数，返回一个新的函数，新函数的结构满足 then 函数的参数结构。

个人认为 axios 这俩静态方法在目前看来很鸡肋，因为使用 Promise 一样可以完成这俩需求。





 ts-axios 单元测试 

 Jest 安装和配置 

安装

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1653133854614-d0500d31-fbf2-4de7-a11d-3909f74868d4.webp)



配置

在 package.json 文件中有 jest 字段，对应 Jest 配置：

1、转换器配置

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1653133918992-33242c82-a716-4079-a65c-a4961bc33345.webp)



表示的就是使用 ts-jest 工具把 .ts 和 .tsx 文件内容转换成 JavaScript，因为我们也是使用 TypeScript 编写测试代码，而 Node.js 是不能直接支持 TypeScript 的，所以需要配置转换器。

2、测试环境

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1653133946075-8c785c90-989a-4dd1-a265-1ce0bf44f9b6.webp)



表示它是一个类浏览器的测试环境，我们可以使用浏览器环境中的一些 API。

3、要测试文件的正则表达式

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1653133994919-51bba071-bea4-42d9-81fc-35b02e0dc789.webp)



表示 test 目录下所有以 .test.ts 和 .spec.ts 的文件都需要跑测试。

4、模块文件扩展名

，当你去引入一个模块并没有指定扩展名的时候，它会依次尝试去添加这些扩展名去找你引入的模块文件。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1653134028289-2333fac5-29bb-4dde-a9ea-9940c0940bde.webp)



表示优先找 .ts 的模块、然后是 .tsx，最后是 .js。

5、测试覆盖率的阈值设定，当我们的测试覆盖率达不到阈值的时候，测试会失败。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1653134059440-1f18580d-2d00-4f56-b678-1d23f35decbe.webp)



表示全局的代码分支覆盖率要达到 90%，方法覆盖率要达到 95%，代码行数覆盖率达到 95%，声明覆盖率达到 95%

6、收集指定文件的测试覆盖率(即使你没为这些文件编写测试，它的值为 [glob patterns](https://github.com/jonschlinkert/micromatch) 类型。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1653134096729-3c3d7602-2ace-42de-ad31-5a8af60a85a8.webp)

、



表示收集 src 目录以及它的所有子目录中的 js 和 ts 文件的测试覆盖率。

7、测试框架安装后立即执行的代码文件列表

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1653134129757-76abdc15-18ed-4d52-b3ba-d0f91927edfd.webp)



表示每次跑具体测试代码之前会先运行 <rootDir>/test/boot.ts 中的代码，<rootDir> 表示当前项目的根目录。这个配置在之后的章节我们会具体介绍。







 ts-axios 编译与发布 





 全局拓展 

 将库和内部依赖导出 

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1652530210745-9ff957b8-0ecc-460a-b3e4-144a9b003b5c.webp)



这里的export * 会将types和utils里的内置方法全部导出供测试使用