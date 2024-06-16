# Cookie顶级域名、二级域名、三级域名共享

**首先说明一点：cookie在不同域名之间是无法共享的，即跨域问题！但是在顶级域名、二级域名、三级域名中是可以共享的！**

------

准备如下三个域名：

**顶级域名**：dalomao.com

**二级域名**：super.dalomao.com

**三级域名**：big.super.dalomao.com

## 访问顶级域名

访问顶级域名 dalomao.com，设置如下四种情况的cookie

Y表示可以共享cookie，N表示无法共享

| domain参数                                              | dalomao.com | super.dalomao.com | big.super.dalomao.com | 备注                               |
| ------------------------------------------------------- | ----------- | ----------------- | --------------------- | ---------------------------------- |
| setcookie(‘name’, time()+1)                             | Y           | Y                 | Y                     | 默认设置当前访问的域名，即顶级域名 |
| setcookie(‘name’, time()+1),’/’,‘dalomao.com’           | Y           | Y                 | Y                     | 设置顶级域名，全部共享             |
| setcookie(‘name’, time()+1),’/’,‘super.dalomao.com’     | N           | N                 | N                     |                                    |
| setcookie(‘name’, time()+1),’/’,‘big.super.dalomao.com’ | N           | N                 | N                     |                                    |

## 访问[二级域名](https://so.csdn.net/so/search?q=二级域名&spm=1001.2101.3001.7020)

访问二级域名 super.dalomao.com，设置如下四种情况的cookie

Y表示可以共享cookie，N表示无法共享

| domain参数                                              | dalomao.com | super.dalomao.com | big.super.dalomao.com | 备注                               |
| ------------------------------------------------------- | ----------- | ----------------- | --------------------- | ---------------------------------- |
| setcookie(‘name’, time()+1)                             | N           | Y                 | Y                     | 默认设置当前访问的域名，即二级域名 |
| setcookie(‘name’, time()+1),’/’,‘dalomao.com’           | Y           | Y                 | Y                     | 设置顶级域名，全部共享             |
| setcookie(‘name’, time()+1),’/’,‘super.dalomao.com’     | N           | Y                 | Y                     |                                    |
| setcookie(‘name’, time()+1),’/’,‘big.super.dalomao.com’ | N           | N                 | N                     |                                    |

## 访问三级域名

访问三级域名 big.super.dalomao.com，设置如下四种情况的cookie

Y表示可以共享cookie，N表示无法共享

| domain参数                                              | dalomao.com | super.dalomao.com | big.super.dalomao.com | 备注                               |
| ------------------------------------------------------- | ----------- | ----------------- | --------------------- | ---------------------------------- |
| setcookie(‘name’, time()+1)                             | N           | N                 | Y                     | 默认设置当前访问的域名，即三级域名 |
| setcookie(‘name’, time()+1),’/’,‘dalomao.com’           | Y           | Y                 | Y                     | 设置顶级域名，全部共享             |
| setcookie(‘name’, time()+1),’/’,‘super.dalomao.com’     | N           | Y                 | Y                     |                                    |
| setcookie(‘name’, time()+1),’/’,‘big.super.dalomao.com’ | N           | N                 | Y                     |                                    |

## 总结

- 在setcookie中省略domain参数，那么domain默认为当前域名
- domain参数可以设置父域名以及自身，但不能设置其它域名，包括子域名，否则cookie不起作用
- 如果cookie设置为顶级域名，则**全部的域名**，包括顶级域名、二级域名、三级域名等，都可以共享该cookie
- 如果cokkie设置为当前域名，则**当前域名及其下面的所有子域名**可以共享该cookie

