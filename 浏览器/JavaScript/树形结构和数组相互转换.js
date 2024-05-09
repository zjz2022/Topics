// 实现一个函数，将输入的 arr，输出 tree。其中，id 是唯一的，pid 代表当前对象属于那个 id 的子节点，例如：pid 为 1，那它就是 id 为 1 的对象的子节点
// 结构大概是这样的
const arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门2', pid: 1 },
  { id: 4, name: '部门3', pid: 3 },
  { id: 5, name: '部门4', pid: 4 },
]

// 输出
const tree = {
  id: 1,
  name: '部门1',
  pid: 0,
  children: [
    {
      id: 2,
      name: '部门2',
      pid: 1,
      children: [],
    },
    {
      id: 3,
      name: '部门2',
      pid: 1,
      children: [
        {
          id: 4,
          name: '部门3',
          pid: 3,
          children: [
            {
              id: 5,
              name: '部门4',
              pid: 4,
              children: [],
            },
          ],
        },
      ],
    },
  ],
}
