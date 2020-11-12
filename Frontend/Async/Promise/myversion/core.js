/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-11-12 19:10:00
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-11-12 20:58:11
 */
let done = false;
let LAST_ERROR = null;
let IS_ERROR = false;

function tryCallTwo (fn, a, b) {
    try {
        LAST_ERROR = null;
        IS_ERROR = false;
        return fn(a, b);
    } catch (e) {
        IS_ERROR = true;
        return LAST_ERROR = e;
    }
}

function tryCallOne (fn, a) {
    try {
        LAST_ERROR = null;
        IS_ERROR = false;
        return fn(a);
    } catch (e) {
        IS_ERROR = true;
        return LAST_ERROR = e;
    }
}

const noop = () => { }

function Promise (fn) {
    this._status = 0
    this._value = null;
    this._defferreds = null;
    const result = tryCallTwo(fn, resolve, reject)
    if (result === LAST_ERROR) {
        reject(this, result)
    }
}

Promise.prototype.then = function (onFullfilled, onRejected) {
    onFullfilled = onFullfilled ? onFullfilled : (data) => data
    onRejected = onRejected ? onRejected : (e) => { throw e }
    let thenPromise = new Promise((resolve, reject) => {
        if (this._status === 1) {
            let result = tryCallOne(onFullfilled, this._value)
            if (result === LAST_ERROR) {
                reject(result)
            } else {
                resolve(result)
            }
        }
        if (this._status === 2) {
            let result = tryCallOne(onRejected, this._value)
            reject(result)
        }
        if (this._status === 0) {
            this._defferreds = {
                onFullfilled,
                onRejected
            }
        }
    });
    // let thenPromiseDeffered = {
    //     onFullfilled,
    //     onRejected,
    //     promise: thenPromise
    // }
    // setTimeout(() => {
    //     if (this._status === 1) {
    //         onFullfilled(this._value)
    //     }
    //     if (this._status === 2) {
    //         onRejected(this._value)
    //     }
    //     if (this._status === 0) {
    //         this._defferreds = {
    //             onFullfilled,
    //             onRejected
    //         }
    //     }
    // }, 0);


    return thenPromise;
}



let promise = new Promise((resolve, reject) => {
    reject(2000)
    resolve(1000)
})

// promise.then((result) => {
//     console.log('suc', result)
// }, (err) => {
//     console.log('err', err)
// })

// let promise = new Promise((resolve, reject) => {
//     // setTimeout(() => {
//     //     reject(2000)
//     // }, 1000)
//     setTimeout(() => {
//         resolve(1000)
//     }, 1000)
// })

promise.then((res) => {
    console.log('suc', res)
}, (err) => {
    console.log('err', err)
}).then((res) => {
    console.log('suc2', res)
}, (err) => {
    console.log('err2', err)
})


function resolve (promise, newVal) {
    if (done) {
        return
    } else {
        done = true;
        promise._status = 1;
        promise._value = newVal;
        finale();
    }
}

function reject (promise, newVal) {
    if (done) {
        return
    } else {
        done = true;
        promise._status = 2;
        promise._value = newVal;
        finale();
    }
}

function finale (resolve, reject) {
    if (!this._defferreds) {
        return
    }
    if (this._status === 1) {
        this._defferreds.onFullfilled(this._value);
    }
    if (this._status === 2) {
        this._defferreds.onRejected(this._value);
    }
}