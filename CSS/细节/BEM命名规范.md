BEM命名规范

BEM 的意思就是块（block）、元素（element）、修饰符（modifier），是由 Yandex 团队提出的一种前端命名方法论。这种巧妙的命名方法让你的 CSS 类对其他开发者来说更加透明而且更有意义。BEM 命名约定更加严格，而且包含更多的信息，它们用于一个团队开发一个耗时的大项目。

> 重要的是要注意，这里使用的基于 BEM 的命名方式是经过 Nicolas Gallagher 修改过的。

## 命名约定



```
.block {}
.block__element {}
.block--modifier {}
```



之所以使用两个连字符和下划线而不是一个，是为了让 block 可以用单个连字符来界定，如：

```
.site-search {} /* 块 */
.site-search__field {} /* 元素 */
.site-search--full {} /* 修饰符 */
```



## 举个栗子



- block__element：块里的元素，如：nav（block）里的 a 标签（element）；
- block__element--modifier：块里的元素的状态、属性或修饰，如：nav 里的 a 标签，有 active、hover、normal 3 种状态（modifier）。