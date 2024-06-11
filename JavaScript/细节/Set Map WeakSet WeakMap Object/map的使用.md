## map

> map是一个键值对表格，先键后值，无论是set，get，has
>
> set 是 (key, value)
>
> get 是 输入key返回value
>
> has 是 找key 有就1 没有0

### map.set(nums[i], i)  和  map.set(i, nums[i])有区别吗？

> 第一个是key，第二个设置的是value
>
> 区别在于用途，你是要用元素值找索引，还是要通过索引找元素值

是的，`map.set(nums[i], i)` 和 `map.set(i, nums[i])` 之间的区别在于键和值的设置方式不同。

在 `map.set(nums[i], i)` 中，你将数组 `nums` 的第 i 个元素作为键（key），并将索引 `i` 作为此键的值（value）。这意味着你可以通过数组中的元素值来获取其在数组中的位置或索引。

対照的，在 `map.set(i, nums[i])` 中，你将索引 `i` 作为键（key），将数组 `nums` 的第 i 个元素值作为此键的值（value）。这意味着你可以通过索引来直接获取相应的数组元素值。

使用哪种方式取决于你希望如何从 Map 中检索信息。如果你想通过元素值来查找其索引，使用 `map.set(nums[i], i)`将会比较有利。如果你希望通过索引来查找相应的元素值，那么使用 `map.set(i, nums[i])` 更为合适。

### 那么我是  map.set(nums[i],i)  ，然后我 map.get(k)  ，那么获取的是key还是value？

map.get(k) 是在 map中找到k元素，然后返回k的索引值

当你使用 `map.get(k)` 时，你实际上是在寻找键 `k` 对应的元素值，也就是键`k`在数组中的索引 `i`。

### map.has(k)是找k？还是找k的索引？

`map.has(k)` 方法是用来判断 Map 对象中是否含有特定的键 `k`。

在你使用 `map.set(nums[i],i)` 的情况下，数组的元素 `nums[i]` 被设定为了键，所以 `map.has(k)` 实际上是在检查 Map 对象中是否存在键 `k`。它并不直接寻找 `k` 的索引。

简单来说，如果 `k` 是 Map 中的一个键，那么 `map.has(k)` 将会返回 `true`，否则将返回 `false`。并不涉及到关联的值或者说索引部分。

### map.values()

`map.values()` 是 Map 对象的一个方法，用来**返回一个新的 Iterator 对象**，该对象**包含 Map 对象中每个元素的值**，元素的插入顺序将被用来定义迭代的顺序。

要明白这个，让我们来看一个简单的示例：

```javascript
let myMap = new Map();
myMap.set('a', 1);
myMap.set('b', 2);
myMap.set('c', 3);

let values = myMap.values();

for(let value of values) {
  console.log(value);   // 依次打印出：1, 2, 3
}
```

在上面的代码中，我们首先创建了一个新的 Map 对象，然后插入了三个键值对(`a:1`, `b:2`, `c:3`)。之后, 我们使用 `map.values()` 方法获取 Map 对象的所有值，然后用 for...of 循环遍历和打印出每个值。

在你的函数中，`Array.from(map.values())` 会将这个 Iterator 对象转换为一个数组，每个 Map 对象的值（也就是一个数组）为一个元素，然后返回这个新的数组。