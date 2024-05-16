## Storage

Web Storage 包含如下两种机制：

- sessionStorage 为每一个给定的源（given origin）维持一个独立的存储区域，该存储区域在页面会话期间可用（即只要浏览器处于打开状态，包括页面重新加载和恢复）。用于进行页面传值
- localStorage 同样的功能，但是在浏览器关闭，然后重新打开后数据仍然存在。用于存储适合长期保存在本地的数据、存储该浏览器对该页面的访问次数

作为 Web Storage API 的接口，Storage 提供了访问特定域名下的会话存储或本地存储的功能，例如，可以添加、修改或删除存储的数据项。**两者其实都拥有一个相同的原型对象 Storage。**

```
一些方法：
Storage.getItem() | key() | clear() | length只读 | setItem() | removeItem()
```

- 浏览器差异性可以通过storageAvailable('localStorage') === true判断
- 二者存储大小都是5MB
- 同源域名下面是可以共享 sessionStorage 的

**cookie和localStorage的区别：**

1. **生命周期**：`Cookie`的生命周期由其`Expires`或`Max-Age`属性决定，这些属性定义了`Cookie`的过期时间。如果不设置这些属性，`Cookie`则为`session`类型，会在用户关闭浏览器窗口后被删除。相比之下，`localStorage`数据没有过期时间，只有在用户手动清理浏览器数据或者使用 JavaScript 删除数据时，数据才会消失。
2. **存储容量**：`Cookie`的大小通常被限制在4KB左右，这对于大多数类型的数据都很小。`localStorage`的容量远大于`Cookie`，在大多数现代浏览器中，它可以存储5MB或更多的数据。
3. **与服务器的交互**：每次浏览器向服务器发送请求时，它都会自动附带`Cookie`，无论这些请求是否需要它。这可能会导致额外的流量，尤其是在`Cookie`非常大的情况下。相比之下，`localStorage`数据只在客户端使用，不会被自动发送到服务器。

**设置localStorage过期时间：**

直接使用 `xijs` 这个 `javascript` 工具库

在key-value上添加过期时间，比如("token"| 20min )，获取的时候判断是否过期，如果过期再去清除该项

**不同网站之间的存储可以互读吗**

​		另外，不同浏览器无法共享localStorage和sessionStorage中的信息。同一浏览器的相同域名和端口的不同页面间可以共享相同的 localStorage，但是不同页面间无法共享sessionStorage的信息。这里需要注意的是，页面仅指顶级窗口，如果一个页面包含多个iframe且他们属于同源页面，那么他们之间是可以共享sessionStorage的。`cookies` 的生命周期取决于设置的过期时间。如果设置了过期时间，那么在到达过期时间后，`cookies` 会被自动删除。如果没有设置过期时间，那么 `cookies` 会在浏览器关闭后被删除。但是，有一些浏览器可能会将这类 `cookies` 保留到浏览器完全关闭（包括所有的标签页和窗口）。

​		如何解决？目前广泛采用的是postMessage和iframe相结合的方法。postMessage(data,origin)方法允许来自不同源的脚本采用异步方式进行通信，可以实现跨文本档、多窗口、跨域消息传递。接受两个参数：

- data：要传递的数据，[HTML5](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Flink.jianshu.com%2F%3Ft%3Dhttp%3A%2F%2Flib.csdn.net%2Fbase%2Fhtml5)规范中提到该参数可以是[JavaScript](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Flink.jianshu.com%2F%3Ft%3Dhttp%3A%2F%2Flib.csdn.net%2Fbase%2Fjavascript)的任意基本类型或可复制的对象，然而并不是所有浏览器支持任意类型的参数，部分浏览器只能处理字符串参数，所以在传递参数时需要使用JSON.stringify()方法对对象参数序列化。
- origin：字符串参数，指明目标窗口的源，协议+主机+端口号[+URL]，URL会被忽略，所以可以不写，只是为了安全考虑，postMessage()方法只会将message传递给指定窗口，当然也可以将参数设置为"*"，这样可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"。

**判断sessionStorage大小**

你可以使用以下的函数来估计 sessionStorage 的大小。这个函数的工作原理是遍历 sessionStorage 中的所有键值对，并计算它们的字节数。注意，这是一个近似值，实际的存储开销可能会因为浏览器的实现细节而略有不同。

```js
function sessionStorageSize() {
    let total = 0;
    for(let x in sessionStorage) {
        let amount = (sessionStorage[x].length * 2) / 1024 / 1024; // x.length * 2 是因为 sessionStorage 中的键和值都是以 UTF-16 格式存储的，每个字符占用 2 字节
        if (!isNaN(amount) && sessionStorage.hasOwnProperty(x)) {
            total += amount;
        }
    }
    return total.toFixed(2);
}

console.log(sessionStorageSize() + " MB");
```

## 