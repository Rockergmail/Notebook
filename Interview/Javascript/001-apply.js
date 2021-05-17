/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2021-04-09 10:36:22
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2021-04-29 16:35:31
 */
Function.prototype.mockApply = function (context, args) {
    if (this === Function.prototype) {
        return undefined
    }
    context = context || window;
    let fn = Symbol();
    context[fn] = this;
    let result
    if (Array.isArray(args)) {
        // 注意，这里要这样赋值，因为本质上，是对应着fn的参数
        result = context[fn](...args);
    } else {
        result = context[fn]()
    }
    delete context[fn]
    return result
}