/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-10-30 15:23:55
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-10-30 16:08:47
 */

let asyn1 = Promise.resolve(1)
let asyn2 = Promise.resolve(2)

function *read() {
    let a = yield asyn1;
    console.log(a)
    let b = yield asyn2
    console.log(b)
    return a + b
}
let it = read()

// let {value, done} = it.next();
// value.then(data => {
//     let {value, done} = it.next(data);
//     if (!done) {
//         value.then(data => {
//             let {value, done} = it.next(data);
//             if (!done) {
//                 value.then(data => {
//                     let {value, done} = it.next(data);
//                     if (!done) {
                        
//                     }
//                     console.log(value)
//                 })
//             }
//         })
//     }
// })

function co(gen) {
    return new Promise((resolve, reject) => {
        function next(data) {
            let {value, done} = gen.next(data)
            if (!done) {
                Promise.resolve(value).then(data => {
                    next(data)
                }, (err) => {
                    gen.throw(err)
                    reject()
                })
            } else {
                resolve(data)
            }
        }
        next()
    })
}

co(it)

// 需要异步递归