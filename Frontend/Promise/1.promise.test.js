/**
* 1. 有三种状态，pending、fullfilled、rejected。且pending->fullfilled或pending->rejected
* 2. 成功执行resolve，失败执行reject，其中执行resolve了就不会执行reject，执行了reject就不执行resolve。
 * 3. 先执行执行器，如跑出错误，也会执行reject
 * 4. throw new Error 的效果有二，不执行后面的同步操作，执行reject操作。如果先执行了reject就执行reject，tne的作用就只有不执行同步，且不会再次执行reject。如果先执行resolve就执行resolve，tne的作用就只有不执行同步，且不会再次执行reject
 * 5. 有then方法，第一个参数是fullfilled的回调，第二个参数是rejected的回调
 */

const Promise = require('./1.promise.js');

// let promise1 = new Promise((resolve, reject) => {
//     console.log('第一句');
//     resolve('success');
//     console.log('第二句')
//     reject('error');
//     console.log('第三句')
// })

// promise1.then((data) => {
//     console.log('成功', data)
// }, (err) => {
//     console.error('失败', err)
// })

/**
第一句
第二句
第三句
成功 success
 */

// let promise2 = new Promise((resolve, reject) => {
//     throw new Error('自定义错误');
//     console.log('第一句');
//     reject('error');
//     console.log('第二句')
//     resolve('success');
//     console.log('第三句')
// })

// promise2.then((data) => {
//     console.log('成功', data)
// }, (err) => {
//     console.error('失败', err)
// })

/**
失败 Error: 自定义错误
 */

// let promise3 = new Promise((resolve, reject) => {
//     console.log('第一句');
//     reject('error');
//     console.log('第二句')
//     throw new Error('自定义错误');
//     resolve('success');
//     console.log('第三句')
// })

// promise3.then((data) => {
//     console.log('成功', data)
// }, (err) => {
//     console.error('失败', err)
// })

/**
第一句
第二句
失败 error
 */

let promise4 = new Promise((resolve, reject) => {
    console.log('第一句');
    resolve('success');
    console.log('第二句')
    throw new Error('自定义错误');
    reject('error');
    console.log('第三句')
})

promise4.then((data) => {
    console.log('成功', data)
}, (err) => {
    console.error('失败', err)
})

/**
第一句
第二句
成功 success
 */