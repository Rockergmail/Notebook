/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-10-30 21:34:41
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-10-30 21:36:31
 */
const Promise = require('../src/core');

let promise1 = new Promise((resolve, reject) => {
    resolve(new Promise((resolve2, reject2) => {
        resolve2(1000)
    }))
})

promise1.then(res => {
    console.log('result', res)
}, err => {
    console.log('err' ,err)
})