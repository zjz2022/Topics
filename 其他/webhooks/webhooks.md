**简介：** webhooks是一个api概念，是微服务api的使用范式之一，也被成为反向api，即：前端不主动发送请求，完全由后端推送。 举个常用例子，比如你的好友发了一条朋友圈，后端将这条消息推送给所有其他好友的客户端，就是 Webhooks 的典型场景。

# 1.什么是webhook?



 webhooks是一个api概念，是微服务api的使用范式之一，也被成为反向api，即：前端不主动发送请求，完全由后端推送。 举个常用例子，比如你的好友发了一条朋友圈，后端将这条消息推送给所有其他好友的客户端，就是 Webhooks 的典型场景。



 简单来说，WebHook就是一个接收HTTP POST（或GET，PUT，DELETE）的URL。一个实现了WebHook的API提供商就是在当事件发生的时候会向这个配置好的URL发送一条信息。与请求-响应式不同，使用WebHooks，你可以实时接受到变化。



 这又是一种对客户机-服务器模式的逆转，在传统方法中，客户端从服务器请求数据，然后服务器提供给客户端数据（客户端是在拉数据）。在Webhook范式下，服务器更新所需提供的资源，然后自动将其作为更新发送到客户端（服务器是在推数据），客户端不是请求者，而是被动接收方。这种控制关系的反转可以用来促进许多原本需要在远程服务器上进行更复杂的请求和不断的轮询的通信请求。通过简单地接收资源而不是直接发送请求，我们可以更新远程代码库，轻松地分配资源，甚至将其集成到现有系统中来根据API的需要来更新端点和相关数据，唯一的缺点是初始建立困难。



# 2.主要用途



 更新客户端，在资源新建或者更新时提供更新的、指定的数据。



# 3.常见webhooks使用场景



 对于第三方平台验权、登陆等 没有前端界面做中转的场景，或者强安全要求的支付场景等，适合用 Webhooks 做数据主动推送。说白了就是在前端无从参与，或者因为前端安全问题不适合参与时，就是 Webhooks 的场景。很显然 Webhooks 也不是 Http 的替代品，不过的确是一种新的前后端交互方式。



 如果客户端要长期监听某个任务的状态，按照正常的api调用的方式去做，那么必须不停得轮训服务器来获取当前状态；使用webhook则无需轮训，通过API 可以确定是否发生了更改，如果更改了只需要等待服务器推送信息过来，然后客户端更新就可以。git webhook其实也是这方面的应用。



# 4.使用说明  



 1、webhook通过请求发送数据到你的应用后，就不再关注这些数据。也就是说如果你的应用存在问题，数据会丢失。许多webhook会处理回应，如果程序出现错误会重传数据。如果你的应用处理这个请求并且依然返回一个错误，你的应用就会收到重复数据。



 2、webhook会发出大量的请求，这样会造成你的应用阻塞。确保你的应用能处理这些请求。



Webhooks起初看起来像是API，但它们略有不同。它们之间的主要区别在于，webhooks不需要发出请求即可获得响应，而API则需要发送请求才能获得响应。使用Webhooks可以接收，而API需要您检索。



一个示例是GitHub Webhook与GitHub API。对于GitHub API，您每次需要信息时都需要发送GET请求。与GitHub Webhook相比，在GitHub webhook中，您可以打开并添加URL来发送POST数据。正确设置了Webhook之后，无论何时更新GitHub上的信息，数据都会自动发送到您在Webhook设置中拥有的URL。



# 5.Webhooks与API的区别在哪里?



Webhooks起初看起来像是API，但它们略有不同。它们之间的主要区别在于，webhooks不需要发出请求即可获得响应，而API则需要发送请求才能获得响应。使用Webhooks可以接收，而API需要您检索。



一个示例是GitHub Webhook与GitHub API。对于GitHub API，您每次需要信息时都需要发送GET请求。与GitHub Webhook相比，在GitHub webhook中，您可以打开并添加URL来发送POST数据。正确设置了Webhook之后，无论何时更新GitHub上的信息，数据都会自动发送到您在Webhook设置中拥有的URL。



为了更好地说明，我们可以看两种情况：使用Webhook和使用API。



使用API：假设我们想要某个服务的Github存储库的最新提交日期。首先GitHub Service API需要对GitHub存储库所有者帐户进行身份验证，然后可以为GET请求的正确端点调用最新的提交日期。



**使用** Webhook ： GitHub Service Webhook将需要创建自己的Webhook URL，然后将该URL放入GitHub存储库的设置中。设置好该URL后，无论何时在存储库上发生任何事件，GitHub都会将包含所有更新数据的POST请求发送到我们的webhook URL。如果Webhook正在运行，则可以轻松地在服务上显示Webhook数据中的最新提交日期。



![img](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5p6X5Lit6Z2Z5pyI5LiL5LuZ,size_20,color_FFFFFF,t_70,g_se,x_16.jpeg)



如上图所示，使用Webhook可使数据检索更加自动化。每当有更新时，GitHub Webhooks会将数据移交给我们的服务，而GitHub API要求我们从GitHub检索数据。



Webhooks的一些缺点是兼容性和支持。由于API更详细和手动，因此很容易从A点到B点快速集成它们。某些服务尚不支持Webhooks，这使得设置它们更加困难。每个服务通常都会提供一个API。