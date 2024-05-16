## 你有听过`RESTful`的设计模式吗？以团队为例，会有增删改查四个接口，对于这四个接口的`api`请求路径是怎么进行设计的呢？

RESTful（Representational State Transfer）是一种用于构建网络应用的架构风格。在RESTful设计中，每个资源通常都有一个与之对应的URI（统一资源标识符），并通过HTTP方法（如GET、POST、PUT、DELETE等）来进行操作。

以一个团队管理系统为例，你可能会有以下几个主要的API接口：

**增（Create） - POST**

- **路径**: `/api/teams`
- **操作**: 创建一个新的团队
- **HTTP 方法**: POST

**删（Delete） - DELETE**

- **路径**: `/api/teams/{teamId}`
- **操作**: 删除一个指定ID的团队
- **HTTP 方法**: DELETE

**改（Update） - PUT 或 PATCH**

- **路径**: `/api/teams/{teamId}`
- **操作**: 更新一个指定ID的团队的信息
- **HTTP 方法**: PUT 或 PATCH（PUT通常用于更新所有信息，PATCH用于部分更新）

**查（Read） - GET**

- **路径**: `/api/teams` 或 `/api/teams/{teamId}`
- **操作**: 获取所有团队或获取一个指定ID的团队的信息
- **HTTP 方法**: GET

