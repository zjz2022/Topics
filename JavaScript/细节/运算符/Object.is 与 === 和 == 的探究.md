https://github.com/YvetteLau/Blog/issues/26

https://github.com/haizlin/fe-interview/issues/1320

https://github.com/Rashomon511/LearningRecord/issues/374

https://github.com/AllFE/blog/issues/6

### 等于、全等于、object.is 区别

1. == 值比较值
2. ===值和类型都比较
3. object.is 和 === 区别  +-0 false   NaN true

```javascript
console.log(+0 === -0);       //true
console.log(NaN === NaN);     //false
Object.is(+0,-0)              //false
Object.is(NaN,NaN)            //true
```

### 