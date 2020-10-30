/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-10-29 09:45:52
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-10-30 11:52:11
 */
/**
 * 1. all方法，是静态方法，等待所有都resolved就返回，失败直接reject
 */

const Promise = require('./4.promise.js');

let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('promise1')
    }, 1000)
})

let promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('promise2')
    }, 2000)
})

let promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('promise3')
    }, 1000)
})

Promise.all([1, 2, promise1, promise2, 5, 6]).then(res => {
    console.log('promise all success', res)
}, err => {
    console.log('promise all error', err)
})
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
