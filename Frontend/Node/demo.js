/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-08-11 14:21:43
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-08-11 14:45:29
 */
// 全局对象global，
console.log('hack', this) // 被修改过的，{}
// 如果是浏览器，是指向window

function damn (shit) {
    console.log(this) // this指向global对象
}
damn()

var a = 1;
global.a // undefined
window.a // 1
let b = 1;
global.b // undefined
window.b // undefined

console.log(Object.keys(global))