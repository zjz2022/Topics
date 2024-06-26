https://github.com/krislee94/docs/issues/59

https://github.com/sl1673495/blogs/issues/69

## Tailwind CSS有哪些劣势？

### 劣势1：无法处理CSS function

> 例如，我们想给一个类的宽度通过calc进行计算，这个需求是Tailwind CSS难以处理的。

```css
.test {
    width: calc(100% - 6rem);
}
```

### 劣势2：后期维护困难

> 如果一个样式是别的开发者写好的，我们在后期维护的时候可能需要重新梳理每一个类名的作用，这样后期维护存在一定的困难。

### 劣势3：框架提供的约束性和自定义需求存在一定矛盾

> 例如有时候想要根据设计稿实现页面，但是Tailwind是没有这些大小的，例如1.5rem，13px等，需要自己配置，这样在无形中也增加了一定的工作量。