# 虚拟dom

优点：
	●dom操作性能开销大 页面回流重绘 使用虚拟dom+diff可以有效减少dom操作
	●方便跨平台
缺点：
	●首次渲染大量 DOM 时，由于多了一层虚拟 DOM 的计算，理所当然会比 直接 innerHTML 插入慢
	●虚拟 DOM 需要在内存中的维护一份虚拟 DOM
	●面对频繁的更新，虚拟 DOM 将会花费更多的时间处理计算的工作
无虚拟dom框架：svelte solid ivi Inferno
编译时做了更多的事情