/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-10-29 09:45:52
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-10-29 17:57:23
 */
/**
 * 1. all方法，是静态方法，等待所有都resolved就返回
 */

const Promise = require("./2.promise");

// const Promise = require('./3.promise.js');
Promise.all([])
// let promise1 = new Promise((resolve, reject) => {
//     // throw new Error('自定义错误')
//     resolve(1000)
// })

// promise1
//     .then(result => {
//         console.log('成功1', result)
//     }, error => {
//         console.log('失败1', error)
//     })
//     .then(result => {
//         console.log('成功2', result)
//     }, error => {
//         console.log('失败2', error)
//     })

/**
失败1 Error: 自定义错误
成功2 undefined
*/
