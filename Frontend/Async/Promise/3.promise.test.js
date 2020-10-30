/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-10-29 09:45:52
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-10-29 17:55:00
 */
/**
 * 1. then方法（成功/失败）如果返回是一个Promise，那么这个promise会自动执行，并把状态带过去；如果返回的是一个非Promise值，那么也会返回一个新的promise，但是会把这个值带过去；如果不想再然后面的then执行，可以返回一个空的Promiser让它保持Pending：return new Promise(() => {})
 * 2. onrejected是可选的
 * 3. 提供defer以防嵌套
 */

const Promise = require('./3.promise.js');

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

// let _promise1 = promise1.then(result => {
//     console.log('成功1', result)
// }, error => {
//     console.log('失败1', error)
// })

// _promise1.then(result => {
//     console.log('成功2', result)
// }, error => {
//     console.log('失败2', error)
// })

/**
失败1 Error: 自定义错误
成功2 undefined
*/
// ===========================================================

// let promise2 = new Promise((resolve, reject) => {
//     resolve()
// })

// let _promise2 = promise2.then(result => {
//     return _promise2;
// })

// _promise2.then(null, err => {
//     console.log(err)
// })

/**
 [TypeError: Chaining cycle detected for promise #<Promise>]
 */

// ===========================================================

// let promise3 = new Promise((resolve, reject) => {
//     resolve()
// })

// let _promise3 = promise3.then(result => {
//     return 1000
// })

// _promise3.then(result => console.log(result), err => console.log(err))

/**
 1000
 */

// ===========================================================

// let promise4 = new Promise((resolve, reject) => {
//     resolve()
// })

// let _promise4 = promise4.then(result => {
//     return {
//         then: 1000
//     }
// })

// _promise4.then(result => console.log(result), err => console.log(err))

/**
{ then: 1000 }
 */

// ===========================================================

// let promise5 = new Promise((resolve, reject) => {
//     resolve()
// })

// let _promise5 = promise5.then(result => {
//     return {
//         then: 1000
//     }
// })

// _promise5.then(result => console.log(result), err => console.log(err))

/**
{ then: 1000 }
 */

// ===========================================================

// let promise6 = new Promise((resolve, reject) => {
//     resolve()
// })

// let _promise6 = promise6.then(result => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('user promise6')
//         }, 1000)
//     })
// })

// _promise6.then(result => console.log(result), err => console.log(err))

/**
user promise6
 */

// ===========================================================

// let promise7 = new Promise((resolve, reject) => {
//     resolve()
// })

// let _promise7 = promise7.then(result => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(new Promise((resolve, reject) => {
//                 resolve('return embed promise')
//             }))
//         }, 1000)
//     })
// })

// _promise7.then(result => console.log(result), err => console.log(err))

/**
return embed promise
 */

 // ===========================================================

let promise8 = new Promise((resolve, reject) => {
    resolve()
})

let _promise8 = promise8.then(result => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Promise((resolve, reject) => {
                resolve('return embed promise')
            }))
        }, 1000)
    })
})

_promise8.then(result => console.log(result), err => console.log(err))

/**
return embed promise
 */