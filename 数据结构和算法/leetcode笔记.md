> 思路+代码+时间复杂度分析

# 哈希

## 两数之和

```js
var twoSum = function (nums, target) {
  // 创建一个表，用来存放数组中的元素及其在数组中的下标
  let map = new Map()

  // 遍历数组
  for (let i = 0; i < nums.length; i++) {
    let k = target - nums[i] // 计算目标差值

    // 如果表中已经存在差值，则找到了符合条件的两个元素
    if (map.has(k)) {
      // map.get(k) 是第一个元素的数组下标， i 是当前元素的数组下标
      return [map.get(k), i]
    }

    // 将当前元素及其在数组中的下标存入表中
    map.set(nums[i], i)
  }

  // 如果没有找到符合条件的两个元素，返回空数组
  return []
}
```

## 字母异位词分组

```js
// 定义一个名为groupAnagrams的函数，接收一个string类型的数组，返回一个二维string数组。
var groupAnagrams = function (strs) {
  // 创建一个Map对象，键为排序后的字符串，值为几个不同的原字符串（排序后都一样）的数组
  const map = new Map()

  // 遍历传入的strs数组
  for (let str of strs) {
    // 对当前字符串的每个字符进行排序，并转化为字符串作为键
    const key = [...str].sort().toString()
    console.log('key')
    console.log(key)
    // 检查map中是否有当前键，如果有，取出对应的值（值为数组），否则创建一个新的空数组
    const list = map.get(key) ? map.get(key) : []
    console.log('list')
    console.log(list)

    // 往这个数组中添加当前遍历的字符串
    list.push(str)
    console.log('str')
    console.log(str)

    // 在map中设置当前键和其对应的值（值为包含当前字符串的数组）
    map.set(key, list)
    console.log('map')
    console.log(map)
  }

  // 将map的所有值（即所有的字符串数组）转换为数组并返回
  console.log('map.values()')
  console.log(map.values())
  return Array.from(map.values())
  // map.values() { [ 'cog', 'ocg', 'goc' ], [ 'dog', 'god' ] } 是一个对象哦！ 这里用 Array.from 就相当于把 {} 换成了 []
}

 console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']))
 输出：[["eat","tea","ate"], ["tan","nat"], ["bat"]]

console.log(groupAnagrams(['cog', 'dog', 'god', 'ocg', 'goc']))
 输出：[["cog", "ocg", "goc"], ["dog", "god"]]

 console.log(groupAnagrams(['room', 'moor', 'moro', 'test', 'sett']))
 输出：[["room", "moor", "moro"], ["test", "sett"]]

 console.log(groupAnagrams(['']))
 输出：[[""]]

 console.log(groupAnagrams(['a']))
 输出: [["a"]]
```

## 最长连续序列

```js
var longestConsecutive = function(nums) {
    // 转化成哈希集合，为了快速查找哈希集合中是否存在某个元素。
    // 因为在哈希集合中查找元素的时间复杂度为O(1)，从而提高了算法的效率。
    let set = new Set(nums);

    // 初始化最长连续子序列的长度为0
    let res = 0;

    // 对哈希集合中的每个元素进行迭代
    for (let num of set) {
        // 如果num-1存在于集合中，说明num不是连续子序列的第一个元素，
        // 所以我们继续下一个元素的迭代，寻找新的序列的可能起点
        if (set.has(num - 1)) continue;

        // 如果num-1不存在于集合中，说明num可以作为一个新的连续子序列的起点，
        // 因此开始向下一个元素进行检索，并计算连续子序列的长度
        let curNum = num; // 当前判断的数字
        let curLen = 1; // 初始化当前序列长度为1

        // 如果集合中存在curNum+1，将curNum更新为curNum+1，并将当前长度加1
        // 循环此过程，直到集合中不存在curNum+1为止
        while (set.has(curNum + 1)) {
            curNum += 1;
            curLen += 1;
        }
        // 比较并更新已知的最长连续子序列长度
        // Math.max是取两个参数中的最大值
        res = Math.max(res, curLen);
    }

    // 返回最长连续子序列的长度
    return res;
};
```



# 二叉树

## 二叉树的中序遍历

## 二叉树的最大深度

## 翻转二叉树

## 对称二叉树

## 二叉树的直径

## 二叉树的层序遍历

```js
var levelOrder = function (root) {
  // 如果树的根节点为空（即树为空），那么函数会立即返回一个空数组。
  if (!root) return []
  // 定义了存储结果的数组 result，以及队列长度的变量 len（初始值为0），并将根节点放入队列 queue 中。
  let result = []
  let len = 0,
    // 这一步是在创建一个队列queue，并把二叉树的根节点root作为队列的第一个元素。队列是一种特殊的列表，只能在列表的一端（称为队尾）插入元素，在另一端（称为队头）移除元素。
    // queue = [root]这一步操作实际上就是初始化了一个队列，并把二叉树的根节点放入了这个队列。
    queue = [root]
  // 当队列不为空，即还有节点待处理时，进入循环。
  while (queue.length > 0) {
    // 获取当前队列的长度，即当前层的节点数。
    len = queue.length
    // 在结果数组中添加一个新的子数组，用于存放当前层的节点值。
    result.push([])
    // 遍历当前层的所有节点，将它们从队列中移出，同时将它们的值添加到结果数组的最末尾子数组中。如果这些节点有左孩子或右孩子，就将这些孩子节点加入到队列中。
    while (len--) {
      // shift是移除数组头部元素，并返回该元素的值
      const n = queue.shift()
      // 负数索引表示从数组的末尾开始计数，这里最后一个元素是一个数组，我是要添加到这个数组里面，所以我才要写 result.at(-1)
      // push() 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。
      // 这一步就是，在result数组的最后一个数组里面，添加n.val
      result.at(-1).push(n.val)
      // 如果 n.left 存在（即不为 null 或 undefined），则执行 queue.push(n.left)，即把 n.left 放入队列 queue 中
      n.left && queue.push(n.left)
      // 同理，如果右边有值，就存入队列中
      n.right && queue.push(n.right)
    }
  }
  // 在处理完所有层之后，返回结果数组。
  return result
  // 所以，最终函数返回的是一个二维数组，其中每个子数组保存了树中对应层级的所有节点值。
}
```

## 将有序数组转换为二叉搜索树

## 验证二叉搜索树

## 二叉搜索树中第K小的元素

## 二叉树的右视图

## 二叉树展开为链表

## 从前序与中序遍历序列构造二叉树

## 路径总和Ⅲ

## 二叉树的最近公共祖先

## 二叉树中的最大路径和

## 根节点到叶节点数字之和

```js
var sumNumbers = function (root) {
  // 初始化路径之和
  let sum = 0
  // 创建的递归深度优先搜索函数，参数为当前节点和当前的路径数值
  const dfs = function (root, total) {
    // 如果当前节点是叶子节点（没有左或右子节点）
    if (!root.left && !root.right) {
      // 将当前路径数值（字符串）转为数字并加到总和里
      sum = sum + (total - 0)
      // 结束当前的函数调用
      return
    }
    // 如果存在左子节点，递归调用 dfs 函数，路径数值为当前 total 和左子节点的值拼接
    if (root.left) {
      dfs(root.left, total + '' + root.left.val)
    }
    // 如果存在右子节点，递归调用 dfs 函数，路径数值为当前 total 和右子节点的值拼接
    if (root.right) {
      dfs(root.right, total + '' + root.right.val)
    }
  }
  // 对根节点调用 dfs 函数开始遍历，初始的路径数值为根节点的值
  dfs(root, root.val)
  // 返回所有路径之和
  return sum
}
```

# 链表

## 相交链表

## 回文链表

## 环形链表

## 环形链表Ⅱ

## 两数相加

## 删除链表的倒数第N个结点

## K个一组翻转链表

## 随机链表的复制

## 排序链表

## 合并K个升序链表

## LRU缓存

## 合并两个有序链表

```js
var mergeTwoLists = function (list1, list2) {
  // 创建一个新的节点实例作为结果链表的头部
  var head = new ListNode(0)

  // 创建一个变量result，让其指向新链表的最后一个节点
  var result = head

  // 循环比较两个列表的节点，直到其中一个列表为null
  while (list1 !== null && list2 !== null) {
    if (list1.val < list2.val) {
      // 如果list1的当前节点值小于list2的，将list1的当前节点添加到结果链表
      result.next = list1
      // 将list1的当前节点指针向后移动一位
      list1 = list1.next
    } else {
      // 如果list1的当前节点值大于等于list2的，将list2的当前节点添加到结果链表
      result.next = list2
      // 将list2的当前节点指针向后移动一位
      list2 = list2.next
    }
    // 将result向后移动一位以准备下次添加新的节点
    result = result.next
  }

  // 如果一个列表先为null，那么result的next指针应该直接指向另一个还有剩余节点的列表
  if (list1 != null) {
    result.next = list1
  } else {
    result.next = list2
  }

  // 返回结果链表，注意我们的结果链表实际上是从dummy的next开始的，所以要返回head.next
  return head.next
}
// @lc code=end

// 首先定义一个ListNode构造函数
function ListNode(val) {
  this.val = val
  this.next = null
}

// 创建第一个链表：1 -> 2 -> 4
var l1 = new ListNode(1)
l1.next = new ListNode(2)
l1.next.next = new ListNode(4)

// 创建第二个链表：1 -> 3 -> 4
var l2 = new ListNode(1)
l2.next = new ListNode(3)
l2.next.next = new ListNode(4)

var node = mergeTwoLists(l1, l2)
while (node !== null) {
  console.log(node.val)
  node = node.next
}
```

## 反转链表

```js
// 定义一个名为 reverseList 的函数，其参数为链表的头节点 head
var reverseList = function (head) {
  // 初始化两个指针节点，a 和 b，同时初始化临时节点 c
  let a = null
  let b = head
  let c = null

  // 从头节点开始进行循环
  while (b) {
    // 记录 b 的后续节点 next，因为后续会改变 b 的 next 属性
    c = b.next

    // b 的 next 属性 现在应指向其前一个节点 a
    b.next = a

    // 移动 a 和 b 的指针位置，为下一轮循环做准备
    // a 现在应该指向 b，即 a 向后移动一位
    a = b
    // b 现在应该指向 c，即 b 向后移动一位
    b = c
  }

  // 当 b 为空（即 b 已经指向原链表的末尾），完成循环
  // 此时 a 指向新链表的头节点

  return a // 返回新的头节点
}

// @lc code=end
function ListNode(val) {
  this.val = val
  this.next = null
}

let l1 = new ListNode(1)
l1.next = new ListNode(3)
l1.next.next = new ListNode(6)

let node = reverseList(l1)
while (node !== null) {
  console.log(node.val)
  node = node.next
}
```

# 普通数组

## 最大子数组和

## 合并区间

## 轮转数组

## 除自身以外数组的乘积

## 缺失的第一个正数

# 矩阵

## 矩阵置零

## 螺旋矩阵

## 旋转图像

## 搜索二维矩阵Ⅱ

# 滑动窗口

## 无重复字符的最长子串

```js
var lengthOfLongestSubstring = function (s) {
  let window = new Map() // 创建一个 Map 来储存字符及其出现次数。
  let left = 0,
    right = 0,
    res = 0 // 初始化左、右指针和结果值。
  while (right < s.length) {
    // 当右指针还没有到达字符串的尾端时，继续循环。
    let c = s[right] // 取出右指针所在位置的字符。
    right++ // 向右移动右指针。
    // 在一个表达式 A || B 中，如果 A 为真（也就是 Boolean 值为 true），则返回 A 的值。否则，返回 B 的值。
    window.set(c, (window.get(c) || 0) + 1) // 在 Map 中更新此字符的计数，如果字符不存在，则初始化其计数为 1。
    while (window.get(c) > 1) {
      // 当字符的计数大于1时（说明字符重复），因此需要收缩窗口。
      let d = s[left] // 取出左指针所在位置的字符。
      left++ // 向右移动左指针，也就是收缩窗口。
      // 左指针会一直移动，穿过所有的 d，直到它碰到 c，便会停下来。这样，我们就成功地消除了窗口内的重复字符，保证了窗口内的所有字符都是唯一的。
      window.set(d, window.get(d) - 1) // 在Map中更新此字符的计数，减小其计数值。
    }
    res = Math.max(res, right - left) // 更新最大无重复字符子串的长度，取当前最大长度和新窗口长度的较大值。
  }
  return res // 返回最大无重复字符子串的长度。
}
```

## 找到字符串中所有字母异位词

# 双指针

## 移动零

```js
var moveZeroes = function (nums) {
  let slowIndex = 0
  for (let fastIndex = 0; fastIndex < nums.length; fastIndex++) {
    if (nums[fastIndex] !== 0) {
      ;[nums[fastIndex], nums[slowIndex]] = [nums[slowIndex], nums[fastIndex]]
      slowIndex++
    }
  }
}
```



## 盛最多水的容器

```js
var maxArea = function (height) {
  let l = 0,
    r = height.length - 1
  let ans = Math.min(height[l], height[r]) * (r - l)
  while (l < r) {
    if (height[l] < height[r]) l++
    else r--
    ans = Math.max(ans, Math.min(height[l], height[r]) * (r - l))
  }
  return ans
}
```



## 三数之和

```js
var threeSum = function (nums) {
  nums.sort((a, b) => a - b)
  let ans = []
  for (let i = 0; i < nums.length; i++) {
    // i && 是为了防止在 i = 0 时去比较 nums[0] 和 nums[-1]
    if (i && nums[i] == nums[i - 1]) continue
    let j = i + 1,
      k = nums.length - 1
    while (j < k) {
      let sum = nums[j] + nums[k]
      if (sum == -nums[i]) {
        ans.push([nums[i], nums[j], nums[k]])
        // j++后，我从nums[j]移动到了nums[j+1]上，还是同一个值，没变
        while (j < k && nums[j] == nums[j + 1]) j++
        while (j < k && nums[k] == nums[k - 1]) k--
        // 所以我要改变值，就要j++
        j++
        k--
      } else if (sum < -nums[i]) {
        j++
      } else {
        k--
      }
    }
  }
  return ans
}
看起来你分享了一个在JavaScript中解决 "3Sum"算法题的方法。这是一个经典的双指针技巧应用题。给定包含n个整数的数组nums，你的解决方案是寻找数组中是否存在三个元素a, b, c，使得b + c = -a，并返回所有满足条件且不重复的三元组。

你的解决方案大致过程如下：

1. 首先，你将数组进行了从小到大的排序。
2. 然后，你遍历了整个数组，如果当前的元素和前一个元素相同，你会跳过这个元素以避免重复的三元组出现。
3. 对于每一个不同的元素，你都设置了两个指针，一个指向它后面的第一个元素，另一个指向数组的最后一个元素。然后，你开始移动这两个指针，寻找能满足三数之和为0的情况。
4. 如果三数之和小于0，你就让前面的指针向后移动一位（因为数组是有序的，所以这样可以让三数之和变大）。如果三数之和大于0，你就让后面的指针向前移动一位（可以让三数之和变小）。
5. 当两个指针未相遇，并找到三数之和为0的情况时，你把这三个数添加进结果数组中。然后你移动两个指针，跳过所有相同的元素，以避免重复的三元组出现。

这个方法的时间复杂度为O(n^2)，因为需要对每个元素进行一次两层循环的确证。其中n为数组的长度。
```



## 接雨水

# 子串

## 和为K的子数组

## 滑动窗口最大值

## 最小覆盖子串

# 图论

## 岛屿数量

## 腐烂的橘子

## 课程表

## 实现 Trie（前缀树）

# 回溯

## 全排列

## 子集

## 电话号码的字母组合

## 组合总和

## 括号生成

## 单词搜索

## 分割回文串

## N皇后

# 二分查找

## 搜索插入位置

## 搜索二维矩阵

## 在排序数组中查找元素的第一个和最后一个位置

## 搜索旋转排序数组

## 寻找旋转排序数组中的最小值

## 寻找两个正序数组的中位数

# 栈

## 有效的括号

## 最小栈

## 字符串解码

## 每日温度

## 柱状图中最大的矩形

# 堆

## 数组中第K个最大元素

## 前K个高频元素

## 数据流的中位数

# 贪心算法

## 买卖股票的最佳时机

```js
var maxProfit = function (prices) {
  const len = prices.length
  let maxProfit = 0,
    maxPrice = prices[len - 1]
  for (let i = len - 2; i >= 0; i--) {
    maxProfit = Math.max(maxProfit, maxPrice - prices[i])
    maxPrice = Math.max(maxPrice, prices[i])
  }
  return maxProfit
}

/*
这段代码是一个寻找最大利润的算法，股票价格存储在一个数组prices之中。算法的主要目标是找到最佳的买入和卖出时间，以此获得最大利润。

现在我将以一种算法可视化的方式描述这段代码的运行过程。

1. 起始状态：这里我们有一个数组prices，它表示每一天的股票价格。maxPrice的初始值是数组最后一项的值，表示未来的最高价格。maxProfit初始化为0，表示当前的最大利润。

2. 开始反向遍历数组：从倒数第二个元素开始，算法会逐一检查每一个元素。在每一步中，都会尝试计算出如果在这一天买入股票（prices[i]），然后在未来的最高价（maxPrice）卖出，能得到多少利润（maxPrice - prices[i]）。

3. 更新最大利润和最高价格：如果新计算出的利润大于当前的最大利润，则更新maxProfit。同时，我们还需要更新maxPrice，使其始终保持是当前元素之后的最大元素值，也就是说在当前日期之后的可以卖出的最高价格。

4. 结束后返回最大利润：遍历完成后，maxProfit就是我们可以通过买卖股票获取的最大利润。

可视化表示如下（以prices = [7,1,5,3,6,4]为例）：

- 初始状态：
    - maxPrice = 4（prices最后一项），maxProfit = 0
    - prices = [7,1,5,3,6,4]

- 第一步（i=4）：
    - prices[i] = 6，尝试计算利润： maxPrice - prices[i] = 4 - 6 = -2。这是一个亏本的交易，所以我们不会更新maxProfit。
    - 因为prices[i] > maxPrice，所以更新maxPrice = 6。

- 第二步（i=3）：
    - prices[i] = 3，尝试计算利润：maxPrice - prices[i] = 6 - 3 = 3。这比当前的maxProfit大，所以我们更新maxProfit = 3。
    - 因为prices[i] < maxPrice，所以maxPrice保持不变。

- 第三步（i=2）...
    - 以此类推，一直到i=0，也就是价格数组的开始。

在这整个过程中，通过反向遍历和不断更新maxPrice和maxProfit，保证了每次都是以最高可能的价格售出股票，从而最终得到最大可能的利润。并且，由于这个算法只需要遍历一遍数组，所以时间复杂度是O(n)。
*/
```

## 跳跃游戏

```js
var canJump = function (nums) {
  if (nums.length == 1) return true
  // 在现在这个位置上，需要移动count次才能到达最近的目标（目标指的是能到达结尾或者能到达最近的目标，其中最后一个目标能到达结尾）
  // 只有不行了，才会count++  如果距离为1，值为1，则1>0，所以重置   如果距离为1，值为0，则0<=0，不行了，count++,count表示，你等下得有一次跳count次数的数，才能救的了，否则救不活了  
  let count = 0
  // 注意，我是从nums.length-2开始的，所以最后一个元素的值根本无所谓，10000000还是-2222222222222都无所谓
  for (let i = nums.length - 2; i >= 0; i--) {
    console.log('在数组nums[', i, ']上的值是', nums[i], '当前count是', count)
    if (nums[i] <= count) {
      console.log('因为', nums[i], '小于等于', count, '所以')
      count++
      console.log('增加count，现在的count是', count)
    } else {
      console.log('因为', nums[i], '大于', count, '所以')
      count = 0
      console.log('重置count，现在的count是', count)
    }
  }
  console.log('结束遍历,最终的count是：', count)
  return count == 0
}

// 测试用例
console.log(canJump([4, 2, 1, 0, 4]))
```

## 跳跃游戏Ⅱ

```js
var jump = function (nums) {
  let n = nums.length
  let maxPos = 0 // maxPos表示，在下一步，你能到达的最远距离 i+nums[i]
  let end = 0 // end表示，在当前步，你能到达的最远距离,用maxPos记录
  let steps = 0

  for (let i = 0; i < n - 1; i++) {
    // 在无法到达的第一时间停止循环，避免了无谓的计算
    if (i <= maxPos) {
      console.log('maxPos为', maxPos)
      console.log('i为', i)
      console.log('nums[i]为', nums[i])
      console.log('i + nums[i]为', i + nums[i])
      maxPos = Math.max(maxPos, i + nums[i])
      console.log(`在索引${i}处，能跳到最远的位置是取maxPos和i+nums[i]两者的较大值${maxPos}`)
      if (i == end) {
        console.log('i为', i)
        console.log('更新前，end为', end)

        console.log('因为i == end，所以要更新end = maxPos')
        console.log('maxPos为', maxPos)

        end = maxPos
        steps++
        console.log(`在索引${i}处，增加步数，新步数为${steps}`)
      }
    }
  }

  return steps
}

jump([2, 3, 1, 1, 4])

```

## 划分字母区间

```js
var partitionLabels = function (s) {
  let map = new Map()
  let result = []
  let start = 0,
    end = 0
  for (let i = 0; i < s.length; i++) {
    map[s[i]] = i
  }
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, map[s[i]])
    if (i == end) {
      result.push(end - start + 1)
      start = i + 1
    }
  }
  return result
}
/*
步骤1: 创建一个哈希映射 map，来保存字符串 s 中每个字符最后一次出现的索引：

s: ababcbacadefegdehijhklij
map (字符:最后一次出现的索引): {'a': 8, 'b': 5, 'c': 7, 'd': 14, 'e': 15, 'f': 11, 'g': 13, 'h': 19, 'i': 22, 'j': 23, 'k': 20, 'l': 21}


步骤2: 创建两个变量 start 和 end 来记录每个分区的起始和结束位置，即初始值都是0。

步骤3: 遍历字符串 s，通过 map 得到当前字符最后一次出现的位置，用 end 记录当前准备切割的分区中，字符最后一次出现的最大索引。

例如：
- 当 i=0 (字符'a') 时，map 中 'a' 的最后一次出现位置是 8，因此 end 更新为 8。
- 当 i=1 (字符'b') 时，map 中 'b' 的最后一次出现位置是 5，但 end 仍然保持为 8，因为 8 是大于 5 的。

步骤4: 当遍历到的位置 i 到达当前分区的 end 时（也就是说我们已经到达了当前准备切割的分区中，字符最后一次出现的最大索引位置），这时候我们可以开始切割分区了。通过 end - start + 1 来计算当前分区的长度，并添加到结果集 result 中。然后更新 start 为下一个分区的起始位置，也就是当前结束位置 end 的下一个位置，即 i+1。

举个例子：
- 当 i/end =1, end（即1）计算的分区中字符最后一次出现的最大索引，然后将分区长度 end-start+1（即2）添加到结果数组，然后更新 start 为 i+1（即2）。

这个过程循环下去，直至整个字符串遍历完毕。这样我们就得到了每个符合条件的分区长度。

例如，对于 "ababcbacadefegdehijhklij" 这个字符串，最终会划分出三个分区：ababcbaca, defegde, hijhklij，他们的长度分别是：9,7,8。所以函数最后返回的结果是：9,7,8。
*/
```

# 动态规划

## 爬楼梯

```js
// 定义一个函数 climbStairs, 接收一个参数 n， 表示楼梯阶数
var climbStairs = function (n) {
  // 定义一个数组 dp, 用于存放每一阶对应的爬升方式数量
  let dp = []
  // 初始化dp数组的前三个值
  dp[0] = 0 // 无阶，爬楼梯方式为0
  dp[1] = 1 // 一阶，只能一次爬完，爬楼梯方式为1
  dp[2] = 2 // 二阶，可以一次爬两阶，或者一阶一阶爬，所以爬楼梯方式为2
  //从第 3 阶开始，计算每阶楼梯的爬升方式（dp[i] = dp[i - 1] + dp[i - 2]）
  // 每个阶梯的爬升方式都等于前两阶爬升方式之和
  // 使用 "for (let i = 3; i < n; i++)"，那么循环将在 i 等于 n-1 时停止，这意味着我们没有计算出爬到第 n 阶的所有可能的方法，只计算到了爬到第 n-1 阶的方法
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  // 返回n个楼梯的爬升方式
  return dp[n]
}
```

## 杨辉三角

## 打家劫舍

## 完全平方数

## 零钱兑换

## 单词拆分

## 最长递增子序列

## 乘积最大子数组

## 分割等和子集

## 最长有效括号

# 多维动态规划

## 不同路径

## 最小路径和

## 最长回文子串

## 最长公共子序列

## 编辑距离

# 技巧

## 只出现一次的数字

## 多数元素

## 颜色分类

## 下一个排列

## 寻找重复数
