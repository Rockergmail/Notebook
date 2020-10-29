/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-10-29 09:45:52
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-10-29 10:19:40
 */
/**
 * 1. then支持异步
 */

const Promise = require('./2.promise.js');

let promise1 = new Promise((resolve, reject) => {
    // resolve();
    setTimeout(() => {
        resolve();
    }, 1000);
})

promise1.then(() => {
    console.log('then1')
}, () => {
    console.log('catch1')
})

promise1.then(() => {
    console.log('then2')
}, () => {
    console.log('catch2')
})

promise1.then(() => {
    console.log('then3')
}, () => {
    console.log('catch3')
})

