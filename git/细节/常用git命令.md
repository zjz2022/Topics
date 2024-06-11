https://github.com/guanguans/notes/blob/master/Git/%E5%B8%B8%E7%94%A8Git%E5%91%BD%E4%BB%A4%E6%B8%85%E5%8D%95.md

## 常用git命令

1. git init - 初始化一个新的Git仓库。
2. git clone url - 从远程源下载一个Git仓库到本地。
3. git add file - 把文件添加到暂存区，准备提交。
4. git commit -m "message" - 提交暂存区的所有修改，message 是你的提交信息。
5. git status - 查看当前仓库的状态，包括哪些文件已修改和哪些文件未暂存或提交。
6. git pull remote branch - 从远程仓库拉取最新的代码到本地。
7. git push remote branch - 将本地的修改推送到远程仓库。
8. git branch - 查看仓库的所有分支。
9. git checkout branch - 切换到指定的分支。
10. git merge branch - 把另一个分支的代码合并到当前分支。
11. git log - 查看提交历史记录。

- add 放入暂存区
- rm --cached 删除暂存区的xxx
- commit- v 提交时显示所有diff信息，提交到版本库 -m 提示信息
- branch <新分支名> 基于当前分支，新建一个分支
- checkout 切换到本地某个分支
- push 上传所有标签
- merge：合并分支会新增一个merge commit，然后将两个分支的历史联系起来。其实是一种非破坏性的操作，对现有分支不会以任何方式被更改，但是会导致历史记录相对复杂。
- rebase会将整个分支移动到另一个分支上，进行多个分支的合并。主要的好处是历史记录更加清晰，是在原有提交的基础上将差异内容反映进去，消除了 git merge所需的不必要的合并提交
- pull <远程仓库名> <远程分支名>:<本地分支名> 拉取远程仓库的分支与本地当前分支合并(可能产生版本冲突) git pull = git fetch + git merge
- fetch 将远程主机的最新内容拉到本地，用户在检查了以后决定是否合并到工作本机分支中，通过--depth 限制拉取的历史提交记录。
- reset --hard  HEAD 回退到上一个(^回退几次或利用 SHA 哈希)，soft 保留工作区与暂存区，hard 不保留。
- revert 将回退记录生成为一次新的提交
- stash可以理解为保存当前工作进度，会把暂存区和工作区的改动进行保存，这些修改会保存在一个栈上。默认情况下，会缓存下列状态的文件：添加到暂存区的修改，Git跟踪的但并未添加到暂存区的修改。但以下状态的文件不会缓存：在工作目录中新的文件，被忽略的文件。（应用场景：当你在项目的一部分上已经工作一段时间后，所有东西都进入了混乱的状态， 而这时你想要切换到另一个分支或者拉下远端的代码去做一点别的事情）