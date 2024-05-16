# GIT版本控制工具

版本控制系统

1、记录历史版本信息(记录每一次修改的记录)

2、方便团队之间协作开发



常用版本控制系统

cvs/svn:集中式版本控制系统



### #svn为代表的集中式:

==>必须有一个中央总控的服务器(用来存储历史版本和代码信息)

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640835446069-e781737f-2ede-4294-9e42-c01d3cd0911d.webp)







### git:分布式版本控制系统

每个开发者本地就是一个代码管理仓库

![image.png](https://cdn.nlark.com/yuque/0/2021/png/23076793/1640835946556-101612c6-56df-4ca2-b12a-d95b6026ee60.png?x-oss-process=image%2Fformat%2Cwebp%2Fresize%2Cw_937%2Climit_0)





 GIt工作原理 

### 工作区:我们能看到的并且写代码的区域

### 暂存区:临时存储用的

### 历史区:生成历史版本



工作区===>暂存区(git add -A)

暂存区===>历史区(git commit -m)

历史区===>中央仓库(git push origin master)

中央仓库====>历史区(git pull origin master)

代码回滚git check

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1640836699610-d238ed35-8cfb-4ae9-a831-db8c8780eb56.webp)



 GIt全局配置 

第一次完成安装git后，在全局环境下配置基本信息:我是谁

$ git config -l 查看配置信息

$ git config --global -l  查看全局配置信息



### 自己配置基本信息(告诉git我是谁)

$ git config --global user.name '勒于驴'

$ git config --global user.email '1404305637@qq.com'





### 创建仓库完成版本控制

创建本地仓库 $git init

会生成一个隐藏文件夹“.git”（这个文件夹不要删，因为暂存区和历史区还有一些其它的信息都在这里，删了就不是一个完整的git仓库了）

在本地编写完成代码(在工作区),把一些文件提交到暂存区

$ git add xxx 把某一个文件或者文件夹提交到暂存区

$ git add .      把所有最新修改的文件都提交到暂存区

$ git add -A   

$ git status 查看当前文件的状态 (红色代表在工作区，绿色代表在暂存区，看不见东西证明所有修改信息都提交到历史区了)

把暂存区内容提交到历史区

$git commit -m "描述信息"

查看历史版本信息(历史记录)

$git log

$git reflog  包含回滚信息





Github

### Settings用户设置

1、Profile修改自己基本的信息

2、Account可以修改用户名

3、Security修改自己的密码

4、Email邮箱

...

### 创建仓库

 new repository

 public 公共仓库作为开源项目

 private私有项目

### 把本地仓库信息提交到远程仓库

//1.建立本地仓库和远程仓库链接

$ git remote -v  //查看本地仓库和哪些远程仓库保持连接

$ git remote add origin [GIT仓库地址] //让本地仓库和远程仓库建立一个连接，origin是随便起的一个链接名

$ git remote rm origin 删除关联信息



提交之前最好先拉取

$ git pull origin master

把本地代码提交到远程仓库(需要输入github用户密码)

$ git push origin master



### 克隆仓库 $ git clone [远程仓库git地址]



真实项目开发流程

  1.组长或者负责人先创建中央仓库

  2.小组成员基于$ git clone 把远程仓库及默认的内容克隆到本地一份(解决了3件事：初始化一个本地仓库"git init",和对应的远程仓库也保持了关联"git remote add",把远程仓库默认内容拉取到本地"git pull")





### 开发中需要基于git提交文件

提交到暂存区，离市区，远程仓库的时候，项目中很多文件是无需处理和提交的，例如:node_modules

  .idea....





### 跑环境

每次提交git时由于不提交node_modules，所以团队协作开发中，我们每当拉下程序的时候，都需要先跑环境