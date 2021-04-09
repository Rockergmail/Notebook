/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2021-04-09 10:36:22
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2021-04-09 10:36:42
 */
Function.prototype.mockCall = function (context) {
    context = context || window;
    context.fn = this;
    let args = []
    for (let i = 0; i <= arguments.length; i++) {
        args.push(arguments[i])
    }
    let result = context.fn(...args);
}