### 虚拟dom实现原理？

**虚拟 DOM 的实现原理主要包括以下 3 部分：**

* 用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
* diff 算法 — 比较两棵虚拟 DOM 树的差异；
* pach 算法 — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树