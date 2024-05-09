// 方法 1
var nums = [1, [2, 3, [4, 5]]]

function flatten(arr) {
  let result = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result
}

console.log(flatten(nums))

/*
1. 定义一个名为flatten的函数，接收一个数组参数arr。在函数内部，定义一个空数组result，它的作用是用来存储扁平化后的所有元素。

2. 接着，用一个for循环来遍历输入的数组arr。

3. 在循环内部，通过Array.isArray(arr[i])判断当前元素是否为数组：
    如果当前元素是数组，那么会递归调用flatten(arr[i])函数，然后使用concat方法将返回的结果与result合并。这个递归过程会一直持续到所有元素都不再是数组为止。
    如果当前元素不是数组，那么直接通过result.push(arr[i])将其添加到结果数组中。

4. 一旦for循环结束，flatten函数就返回处理后的result，这个结果就是扁平化后的数组。
*/
