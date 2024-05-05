平时我们都是写 flex:1;那么 flex:1 具体的三个值都是什么呢?

```css
flex: 1 1 auto;
```

如果不写 flex 的话,默认值是什么呢?

```css
flex: 0 1 auto;
```

所以我们设置的这个 1 其实设置的是[flex-grow](https://so.csdn.net/so/search?q=flex-grow&spm=1001.2101.3001.7020)这个属性,首先讲 flex-grow 是什么:

flex-grow:子盒子除了基础宽度外所占父盒子多余空间的比例

例子: 父盒子 500px,子盒子 1 占 1 份,基础宽度为 50px,子盒子 2 占 2 份,基础宽度为 70px,那么父盒子多余空间就是:500-50-70=380px,总共父盒子就是被分成了 3 份,子盒子 1 的真实大小为 50+380*1/3,子盒子 2 的真实大小为 70+380*2/3;

flex-basis:子盒子的基础宽度

flex-basis 决定了子盒子一开始的宽度,假如 width 设置了 200,flex-basis 不设置默认就是 auto,最终宽度就会采用 width,如果 width 不设置就是 auto,flex-basis 设置 100,最终宽度就会采用 100,如果两者都不设置,就都为 auto,那么子盒子的最终宽度就是内容大小来决定,被内容撑开;如果两者都设置,则 flex-basis 会覆盖 width,最终采用 flex-basis;

flex-shrink:子盒子除了基础宽度外所占父盒子溢出空间的比例

shrink 和 grow 则相反,假如父盒子 500,子盒子的宽度加起来为 600,那么就溢出了 100,flex-shrink 就决定了每个子盒子占 100 的比例,子盒子的最终宽度就是基础宽度或者 width 加上溢出这一部分的宽度;

最后补充一下三者的单位:flex-grow 和 flex-shrink 都是比例,flex-basis 单位可以是百分比,像素
