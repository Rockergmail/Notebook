/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2021-04-09 10:36:22
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2021-04-29 17:50:53
 */

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind

Function.prototype.mockBind = function (thisArg1, ...args1) {
    // 不能通过Function.prototype调用
    if (this === Function.prototype) {
        throw new TypeError('Error')
    }
    // 原来的函数
    let fn = this
    function F(thisArg2, ...args2) {
        // 如果使用new运算符构造绑定函数，则忽略thisArg1。
        if (this instanceof F) {
            return new fn(...args1, ...args2)
        }
        // 如果 bind 函数的参数列表为空，或者thisArg是null或undefined，执行作用域的 this 将被视为新函数的 thisArg。
        return fn.apply(thisArg1 || thisArg2 || window, [...args1, ...args2])
    }
    return F
}