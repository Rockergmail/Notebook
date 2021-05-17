/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2021-04-09 10:36:22
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2021-04-29 16:38:14
 */
Function.prototype.mockCall = function (context) {
    if (this === Function.prototype) {
        return undefined
    }
    context = context || window;
    let fn = Symbol();
    context[fn] = this;
    let args = []
    for (let i = 0; i <= arguments.length; i++) {
        args.push(arguments[i])
    }
    let result = context[fn](...args);
    delete context[fn]
    return result
}

Function.prototype.mockCall2 = function (context, ...args) {
    if (this === Function.prototype) {
        return undefined
    }
    context = context || window;
    let fn = Symbol();
    context[fn] = this;
    let result = context[fn](...args);
    delete context[fn]
    return result
}

Function.prototype.mockCall3 = function (context, ...args) {
    if (this === Function.prototype) {
        return undefined
    }
    context = context || window;
    context.fn = this;
    let result = context.fn(...args);
    delete context.fn
    return result
}