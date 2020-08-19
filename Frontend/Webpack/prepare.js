/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-08-18 16:34:06
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-08-18 17:50:23
 */
console.log(Object.prototype.toString.call({}))
console.log(Object.prototype.toString.call([]))
console.log(Object.prototype.toString.call(''))
console.log(Object.prototype.toString.call(true))
console.log(Object.prototype.toString.call(null))
console.log(Object.prototype.toString.call(undefined))

let obj = {}
Object.defineProperty(obj, Symbol.toStringTag, {
    value: 'CustomToStringTag'
})
console.log(Object.prototype.toString.call(obj))



let obj2 = Object.create(null) 
obj2.__proto__ === undefined



common.js1规范 exports.xxx = 
common.js2规范 module.export = 
