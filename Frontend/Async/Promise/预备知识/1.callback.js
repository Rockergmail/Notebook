/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-10-28 17:51:58
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-10-28 17:58:26
 */

/**
1. 回调函数是高阶函数的一种
2. 高阶函数：函数的参数是一个函数，或者一个函数返回了一个函数
3. AOP，面向切片编程。类似hook，不动核心的代码，重写一些原生方法
4. 闭包可以在函数定义的作用域之外执行
5. Vue2.x，函数劫持，在push的时候触发更新操作
 */


function say(who) {
    console.log(who + '说话')
}
Function.prototype.before = function (beforeFn) {
    return (...args) => {
        beforeFn();
        this(...args);
    }
}
let newFn = say.before(() => {
    console.log('说话前')
});
newFn('马化腾');