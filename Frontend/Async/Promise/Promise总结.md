<!--
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-10-29 09:45:23
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-11-04 16:49:08
-->



### 成因（背景/初衷）与目的（目标/解决什么问题）



### Trade-Off（优势/劣势）

### 适用场景

### 组成部分&&关键点

### 底层原理&&关键实现

#### 设计
- 状态机

### 已有的实现和它之间的对比

### Reference
1. https://www.promisejs.org/

promise优点：
1. 解决异步嵌套问题
2. 解决异步并发问题

缺点：
1. 基于回调
2. 无法终止异步

[...x], x需要是一个iterator
Array.from(x)，x是可以类数组

类数组：
obj: {
    0: 'a',
    1: 'b',
    length: 2
}



obj: {
    0: 'a',
    1: 'b',
    length: 2
    <!-- 迭代器 -->
    [Symbol.iterator](){
        let index = 0
        return {
            next: () => {
                value: this[index],
                done: this.length === index++
            }
        }
    }
}

generator生成iterator
obj: {
    0: 'a',
    1: 'b',
    length: 2
    <!-- 迭代器 -->
    *[Symbol.iterator](){
        let index = 0
        for (let i = 0; i < this.length; i++) {
            yield this[i]
        }
    }
}

function *read() {
    let a = yield `hello`;
    console.log(a)
    let b = yield `world`
    console.log(b)
    return a + b
}
let it = read()
console.log(it.next())
console.log(it.next())
console.log(it.next())


1. 核心 then 方法，支持同步resolve和异步resolve，然后执行then回调
2. 要留意一下用户resolve的值，有可能是套娃新的promise