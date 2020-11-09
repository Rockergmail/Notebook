/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-10-30 21:34:41
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-11-09 18:14:25
 */
const Promise = require('../src/core');

function promiseTest1() {
    let promise = new Promise((resolve, reject) => {
        resolve(1000)
    })
    promise.then(res => {
        console.log('result', res)
    }, err => {
        console.log('err', err)
    })
}


function promiseTest2() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1000)
        }, 0)
    })
    promise.then(res => {
        console.log('result', res)
    }, err => {
        console.log('err', err)
    })
}

function promiseTest3 () {
    let promise = new Promise((resolve, reject) => {
        resolve(new Promise((resolve2, reject2) => {
            resolve2(1000)
        }))
    })
    promise.then(res => {
        console.log('result', res)
    }, err => {
        console.log('err', err)
    })
}

function promiseTest4 () {
    let promise = new Promise((resolve, reject) => {
        resolve(1000)
    })
    promise.then(res => {
        debugger;
        console.log('res')
        return new Promise((resolve2, reject2) => {
            resolve2(2000)
        })
    }, err => {
        console.log('err', err)
    }).then(res2 => {
        debugger;
        console.log('res2', res2)
    }, err2 => {
        console.log('err2', err2)
    })

}

function promiseTest5 () {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1000)
        }, 0)
    })
    promise.then(res => {
        console.log('res')
        debugger;
        return new Promise((resolve2, reject2) => {
            resolve2(2000)
        })
    }, err => {
        console.log('err', err)
    }).then(res2 => {
        console.log('res2', res2)
    }, err2 => {
        console.log('err2', err2)
    })
}

promiseTest1()
// promiseTest2()