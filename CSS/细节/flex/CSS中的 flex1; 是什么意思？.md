#### CSS中的 "flex:1;" 是什么意思？

flex 是 flex-grow, flex-shrink 和 flex-basis的简写。

除了auto (1 1 auto) 和 none (0 0 auto)这两个快捷值外，还有以下设置方式：

- 当 flex 取值为一个非负数字，则该数字为 flex-grow 值，flex-shrink 取 1，flex-basis 取 0%，如下是等同的：

  ```css
  .item {flex: 1;}
  .item {
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: 0%;
  }
  ```

- 当 flex 取值为 0 时，对应的三个值分别为 0 1 0%

  ```css
  .item {flex: 0;}
  .item {
      flex-grow: 0;
      flex-shrink: 1;
      flex-basis: 0%;
  }
  ```

更多写法可前往 [MDN-flex](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2FCSS_Flexible_Box_Layout%2FBasic_Concepts_of_Flexbox) 查看