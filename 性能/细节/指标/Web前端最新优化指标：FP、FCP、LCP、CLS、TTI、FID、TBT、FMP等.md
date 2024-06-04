Web前端最新优化指标：FP、FCP、LCP、CLS、TTI、FID、TBT、FMP等

**FP**（First Paint）：首次绘制时间，这个指标用于记录页面第一次绘制像素的时间。

**FCP**（First Contentful Paint）：首次内容绘制时间，这个指标用于记录页面首次绘制文本、图片、非空白 Canvas 或 SVG 的时间。

**LCP**（Largest Contentful Paint）：最大内容绘制时间，用于记录视窗内最大的元素绘制的时间，该时间会随着页面渲染变化而变化，因为页面中的最大元素在渲染过程中可能会发生改变，另外该指标会在用户第一次交互后停止记录。

**CLS**（Cumulative Layout Shift）：累计位移偏移，记录了页面上非预期的位移波动。计算方式为：位移影响的面积 * 位移距离。

**TTI**（Time to Interactive）：首次可交互时间。这个指标计算过程略微复杂，它需要满足以下几个条件：

1. 从 FCP 指标后开始计算；
2. 持续 5 秒内无长任务（执行时间超过 50 ms）且无两个以上正在进行中的 GET 请求；
3. 往前回溯至 5 秒前的最后一个长任务结束的时间。

**FID**（First Input Delay）：首次输入延迟时间，记录在 FCP 和 TTI 之间用户首次与页面交互时响应的延迟。

**TBT**（Total Blocking Time）：阻塞总时间，记录在 FCP 到 TTI 之间所有长任务的阻塞时间总和。

![img](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1541422-20220422115412452-1290247005.png)

 

**FMP**（First Meaningful Paint）：首次有意义的渲染帧，从页面加载开始，到大部分或者主要内容已经在首屏上渲染的时间点。