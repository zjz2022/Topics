## Cookie

**cookie 和 token 都存放在 header 中，为什么不会劫持 token？**

​		cookie:登录后服务端生成的sessionid，并在http请求里返回到客户端，同时服务端保存sessionid，以后客户端的每次http请求都带上cookie（sessionid）,服务端会获取cookie（sessionid）然后验证用户的身份。所以拿到cookie就拿到了sessionid，就可验证通过。同时浏览器会自动携带cookie;

​		token：同样是登录后服务端返回一个token，客户端保存起来，在以后http请求里手动的加入到请求头里，服务端根据token 进行身份的校验。浏览器不会自动携带token。

​		token不是为了防止xss攻击的，以CSRF攻击为例：

​		cookie：用户点击了链接，cookie未失效，导致发起请求后后端以为是用户正常操作，于是进行扣款操作；		token：用户点击链接，由于浏览器不会自动带上token，所以即使发了请求，后端的token验证不会通过，所以不会进行扣款操作；

**相同域名不同端口的两个应用，cookie名字、路径都相同的情况下，后面的cookie会覆盖前面的cookie吗？**

如果浏览器访问的服务是ip或localhost的话,会覆盖；如果浏览器访问的是域名(在HOST中配置)的话,不会。

**Cookie的其他的重要作用：**

1. 会话管理：Cookies常常用于记录用户的登录状态。当用户登录一个网站后，服务器会返回一个包含用户ID的cookie，然后浏览器在后续的请求中将这个cookie包含在内，以便服务器知道用户的登录状态。
2. 个性化设置：许多网站允许用户个性化他们的体验，例如更改布局、设置主题、设置语言等。这些设置可以被存储在cookie中，然后在用户下次访问时使用。
3. 跟踪用户行为：Cookies可用于跟踪用户在网站上的行为。例如，网站可以记录用户访问过哪些页面，点击过哪些链接，以便了解用户的兴趣和行为习惯，然后提供个性化的内容或者广告。
4. 状态保持：在没有Cookie的情况下，HTTP协议本身是无状态的，也就是说服务器无法区分两个连续的请求是否来自同一用户。通过使用Cookie，服务器可以在用户的每次请求中识别出用户，以保持用户的状态。

**为什么有些cookie客户端访问不到但是服务端可以？**因为设置了HttpOnly后不能被doc.cookie访问。

1.1）Cookie是什么

- cookie本身是由服务器产生的，生成之后发送给浏览器，并保存在浏览器。
- cookie就是浏览器存储本地目录的一小段文本。
- cookie是以key-value形式存储的。
- cookie大小有限制，为了保证cookie不占用太多磁盘空间，每个cookie大小一般不超过4KB。
- cookie默认在会话结束后直接销毁，此种cookie称之为会话cookie。
- cookie可以设置过期时间，此种cookie称之为持久cookie。
- **相同浏览器下，并且是同源窗口（协议、域名、端口一致），不同页面可以共享localStorage，Cookies值，通过跳转的页面可以共享sessionStorage值。**

Cookie 是服务器发送到用户浏览器并保存在浏览器上的一种数据。它用于在浏览器和服务器间保持状态，例如用户登录信息。以下是一个 Cookie 的主要字段及其作用：

1. Name：Cookie 的名称。每个 Cookie 必须有一个唯一的名称。
2. Value：Cookie 的值。这是存储在 Cookie 中的实际数据。
3. Expires/Max-Age：Cookie 的过期时间。如果设置了 Expires 或 Max-Age，那么在指定的日期或时间后，Cookie 将失效并被浏览器删除。如果没有设置，那么 Cookie 将在浏览器关闭时删除（也就是会话Cookie）。
4. Domain：Cookie 适用的域名。如果没有指定，那么默认为创建 Cookie 的域名。
5. Path：Cookie 适用的路径。它的默认路径是创建 Cookie 的页面的路径。
6. Secure：这个字段没有值。如果指定了 Secure，那么 Cookie 只会在使用 HTTPS 的请求中被发送。
7. HttpOnly：如果cookie中设置了HttpOnly属性，那么通过js脚本将无法读取到cookie信息，这样能有效的防止XSS攻击，窃取cookie内容，这样就增加了cookie的安全性，即便是这样，也不要将重要信息存入cookie。XSS全称Cross SiteScript，跨站脚本攻击，是Web程序中常见的漏洞，XSS属于被动式且用于客户端的攻击方式，所以容易被忽略其危害性。其原理是攻击者向有XSS漏洞的网站中输入(传入)恶意的HTML代码，当其它用户浏览该网站时，这段HTML代码会自动执行，从而达到攻击的目的。如，盗取用户Cookie、破坏页面结构、重定向到其它网站等。
8. SameSite：SameSite属性可以让 Cookie 在跨站请求时不会被发送，从而阻止了跨站请求伪造攻击（CSRF）它有三个可能的值：Strict：Cookie 只会在同站请求中被发送。Lax：在跨站点的导航请求（例如从其他网站的链接到你的网站）时，Cookie 也会被发送。None：无论是否跨站，都会发送 Cookie。如果设置 SameSite=None，那么必须同时设置 Secure。

1.2）Cookie的不足

- 每个cookie容量有限，大小一般不超过4KB。
- 因为cookie由浏览器存储在本地目录，所以不方便记录敏感信息，如密码等。
- cookie不支持跨域访问。
- cookie不支持手机端方案。

2.1) Session是什么

- session是由服务器产生的，存储在服务端等（使用 session 需要把 cookie 设为 HttpOnly）。
- session的存储形式多种多样，可以是文件、数据库、缓存等，这需要靠程序如何设计。
- session也是以key-value形式存储的。
- session是没有大小限制的，这比cookie灵活很多，不过将过多的东西放在其中也并不是明智的做法。
- session也有过期时间的概念，默认为30分钟，可以通过tomcat、web.xml等方式进行配置。
- session可以主动通过invalidate()方法进行销毁。
- session通过session_id识别，如果请求持有正确的session_id，则服务器认为此请求处于session_id代表的会话中。

2.2）Session的不足

- session大小不限制，存储在服务端，本身是对资源的一种负担。
- 如何保证session的高可用、准确性，优势对整体架构的一种负担。
- 频繁的创建、查询、验证session，会对服务器造成很大的压力。
- session是有状态的。

3.1）Token是什么

- token是一种轻量级的用户验证方式。
- token是无状态的。
- token允许跨域访问。
- token是服务端生成的一个字符串，保存在客户端（一般放在localStorage中，也可以放在cookie中），作为请求服务的验证令牌。
- token无需存放在服务端，这样服务端无需存放用户信息。
- token对服务端压力极小`，因为服务端只需存储秘钥，并支持生成token的算法，无需存储token。
- token最简单的构造：用户唯一的身份标识(辨识用户) + 时间戳(用于过期校验) + 签名(防止第三方恶意冒充)。
- token无法主动过期，只能等待它达到过期时间后才会失效。
- token的产生：首次请求时，服务器对请求参数（如账号、密码）验证通过，则根据用户标识，加上服务的密钥，通过生成算法，生成token。
- token的验证：再次请求时，携带此token，则服务端再次根据用户标识，生成token，根据两个token是否一致且未过期来判定用户是否已授权。

3.2）token的不足

- token无法主动过期，只能等待它达到过期时间后才会失效。
- token本身比session_id要大，会消耗更多的流量与贷款。

3.4）Token的组成

​		token 其实就是一串字符串而已，只不过它是被加密后的字符串，它通常使用 uid(用户唯一标识)、时间戳、签名以及一些其它参数加密而成。我们将 token 进行解密就可以拿到诸如 uid 这类的信息，然后通过 uid 来进行接下来的鉴权操作。**被存放在****`config.headers.Authorization`**

**关于为什么不把****`token`****放在****`Cookie`****里**，实际上，一些应用确实会将`token`存储在`Cookie`中。然而，这样做有一些风险：

1. **跨站请求伪造（CSRF）**：如果`token`被存储在`Cookie`中，攻击者可能会利用用户在浏览器中的登录状态，伪造请求到服务器。这是因为浏览器在向服务器发送请求时会自动带上`Cookie`，攻击者可以利用这个特性进行攻击。
2. **跨站脚本（XSS）**：`token`在`Cookie`中可能会被恶意脚本访问，如果网站有XSS漏洞，那么这些`Cookie`就可能被盗取。

因此，有些应用选择将`token`存储在`localStorage`或`sessionStorage`中，或者在每次请求时在`HTTP`头部中明确地发送`token`，以减少安全风险。然而，这些方法也有自己的风险，例如，`localStorage`也容易受到XSS攻击。因此，安全性的实现需要根据具体的应用场景和需求来考虑。

**Token放在localStorage安全吗**

Web存储（localStorage/sessionStorage）可以通过同一域商Javascript访问。这意味着任何在你的网站上的运行的JavaScript都可以访问Web存储，所以容易受到XSS攻击。尤其是项目中用到了很多第三方JavaScript类库。

为了防止XSS，一般的处理是避开和编码所有不可信的数据。但这并不能百分百防止XSS。比如我们使用托管在CDN或者其它一些公共的JavaScript库，还有像npm这样的包管理器导入别人的代码到我们的应用程序中。

关于token 存在cookie还是localStorage有两个观点。

- 支持Cookie的开发人员会强烈建议不要将敏感信息（例如JWT)存储在localStorage中，因为它对于XSS毫无抵抗力。
- 支持localStorage的一派则认为：撇开localStorage的各种优点不谈，如果做好适当的XSS防护，收益是远大于风险的。

**4）浏览器关闭**

​		session保存在服务器端，会一直存在，默认存在时间30分钟；cookie保存sessionid，服务器会根据cookie中sessionid获取session；

两种类型的Cookie：

- 临时Cookie（会话Cookie）
- 永久Cookie

​		不设置过期时间，则表示这个cookie生命周期为浏览器会话期间，只要关闭浏览器窗口，cookie就消失了。这种生命期为浏览会话期的cookie被称为会话cookie。会话cookie一般不保存在硬盘上而是保存在内存里。

​		设置了过期时间，浏览器就会把cookie保存到硬盘上，关闭后再次打开浏览器，这些cookie依然有效直到超过设定的过期时间。

​		存储在硬盘上的cookie可以在不同的浏览器进程间共享，比如两个IE窗口。而对于保存在内存的cookie，不同的浏览器有不同的处理方式。

​		为何关闭浏览器后，再次访问会觉得session失效了呢，这里的失效意思是session的数据丢失了？

​		其实这里session数据并没有丢失，只是关闭浏览器后，因为默认的cookie生命周期为浏览器的缓存，即关掉浏览器之后cookie就失效了，此时sessionid也就没有了。再次访问后，服务器又生成一个新的sessionid，此时request.getSession()通过sessionid获取到的session就不是之前的session了。		系统在关闭之后再次打开，如果此时的token没有过期的话，用户无需登录就可以进入主页。

5）总结

| Cookie  | 1.存储在客户端。2.请求自动携带 cookie。3.存储大小 4KB。 | 1.兼容性好，因为是比较老的技术。2.很容易实现，因为 cookie 会自动携带和存储。 | 1.需要单独解决跨域携带问题，比如多台服务器如何共享 cookie。2.会遭受 CSRF 攻击。3.存储在客户端，不够安全。 |
| ------- | ------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Session | 1.存储在服务端。2.存储大小无限制。                      | 1.查询速度快，因为是个会话，相当于是在内存中操作。2.结合 cookie 后很容易实现鉴权。3.安全，因为存储在服务端。 | 1.耗费服务器资源，因为每个客户端都会创建 session。2.占据存储空间，session 相当于存储了一个完整的用户信息。 |
| Token   | 1.体积很小。2.自由操作存储在哪里。                      | 1.安全，因为 token 一般只有用户 id，就算被截取了也没什么用。2.无需消耗服务器内存资源，它相当于只存了用户 id，session 相当于存储了用户的所有信息。3.跨域处理较为方便，比如多台服务器之间可以共用一个 token。 | 1.查询速度慢，因为 token 只存了用户 id，每次需要去查询数据库。 |

## 