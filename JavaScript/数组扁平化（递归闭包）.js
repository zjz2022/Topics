function flatten() {
  let result = []
  return function flatten(arr) {
    //闭包
    arr.forEach((item) => {
      if (Array.isArray(item)) {
        //如果是数组的话，递归调用
        flatten(item)
      } else {
        result.push(item) //如果不是数组，直接放入结果中
      }
    })
    return result
  }
}
var ary = [1, [2, [3, [4, 5]]], 6]
console.log(flatten()(ary))
