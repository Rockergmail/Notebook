<!--
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-10-29 09:45:23
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-11-09 15:30:27
-->



### 成因（背景/初衷）与目的（目标/解决什么问题）

异步处理callback方案的缺点：
1. 【代码层面-可维护性】回调地狱。本质上就是不支持流程控制，需要另外写订阅发布才可以支持，所以只能一个函数嵌套一个callback。
2. 【代码层面-鲁棒性】不确定是同步回调还是异步回调，容易导致[release Zalgo](https://zhuanlan.zhihu.com/p/30630902)问题
3. 【代码层面-可维护性】参数是基于约定的
    ```javascript
    function asyncCall(...params, asyncCallback)
    function asyncCallback(err, ...params)
    ```
4. 【代码层面-鲁棒性】无法区分异步任务 callback（针对单一结果的处理） 和 listener（针对一类结果的处理） <!-- TODO: 不是很明白 -->
5. 【代码层面-鲁棒性】需要手动支持错误处理

### Trade-Off（优势/劣势）

promise优点：
1. 一定只针对单一结果
2. 必然是异步
3. 基于明确的API，而不是基于约定
4. 不需要语言外的错误处理机制

promise缺点：
1. 无法cancel
2. Observable ？

### 适用场景

### 组成部分&&关键点

### 底层原理&&关键实现

### 已有的实现和它之间的对比

### Reference
1. promise的实施 https://www.promisejs.org/
2. promise规范 https://promisesaplus.com/
3. callback的缺点 https://github.com/hax/hax.github.com/issues/11
4. release zalgo https://zhuanlan.zhihu.com/p/30630902 

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


目标：
0. 和其他对比，补充笔记
1. 整理笔记，为以后自己回看建立索引，画架构图、流程图
2. 自己写一个demo，可行的
3. 弄清楚组件之间的关系，最好就是可以整理出测试用例。
4. 架构的设计、功能设计、api设计、目录设计
5. 存在的目的（why promise、why callback sucks）

功能点：
1. 流控制
   1. 状态机+immutable+once
   2. 回调必定是异步的
   3. 支持chainable
   4. 支持转化成promise
   5. 支持错误处理
2. api是标准的