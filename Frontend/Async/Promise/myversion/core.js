const { _onHandle } = require("../sourcecode/src/core");

/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-11-12 19:10:00
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-11-26 17:49:40
 */
let LAST_ERROR = null;
let IS_ERROR = {};

function tryCallTwo (fn, a, b) {
    try {
        return fn(a, b);
    } catch (e) {
        LAST_ERROR = e
        return IS_ERROR;
    }
}

function tryCallOne (fn, a) {
    try {
        return fn(a);
    } catch (e) {
        LAST_ERROR = e
        return IS_ERROR;
    }
}

function getThen (obj) {
    try {
        return obj.then
    } catch (e) {
        LAST_ERROR = e
        return IS_ERROR
    }

}

const noop = () => { }

function Promise (fn) {
    this._status = 0
    this._value = null;
    this._defferreds = [];
    Object.defineProperty(this, Symbol.toStringTag, {
        value: 'MyPromise'
    })
    let done = false;
    if (fn === noop) return;
    const result = tryCallTwo(fn, (value) => {
        if (done) return
        done = true
        resolve(this, value)
    }, (value) => {
        if (done) return
        done = true
        reject(this, value)
    })
    if (!done && result === IS_ERROR) {
        done = true;
        reject(this, LAST_ERROR)
    }
}

Promise.prototype.then = function (onFullfilled, onRejected) {
    debugger;
    // LXRTODO: 这里的默认值应该这么设置么？
    onFullfilled = onFullfilled ? onFullfilled : (data) => data
    onRejected = onRejected ? onRejected : (e) => { throw e }
    let thenPromise = new Promise(noop);
    handle(this, {
        thenPromise,
        onFullfilled,
        onRejected
    })
    return thenPromise;
}

function resolve (self, newVal) {
    // https://promisesaplus.com/
    if (self === newVal) {
        return new TypeError('A promise cannot be resolved with itself.')
    }

    if (Object.prototype.toString.call(newVal) === '[object MyPromise]' || Object.prototype.toString.call(newVal) === '[object Function]') {
        let then = getThen(newVal);
        if (then === IS_ERROR) {
            reject(self, LAST_ERROR)
            return;
        }
        if (then === self.then && Object.prototype.toString.call(newVal) === '[object MyPromise]') {
            self._status = 3;
            self._value = newVal;
            // finale(self, self._defferreds[0]);
            return;
        } else if (Object.prototype.toString.call(newVal) === '[object Function]') {
            // TODO: 处理thenable object
            return;
        }
    }

    self._status = 1;
    self._value = newVal;
    self._defferreds[0] && handleResolved(self, self._defferreds[0])
}

function reject (self, newVal) {
    self._status = 2;
    self._value = newVal;
    self._defferreds[0] && handleResolved(self, self._defferreds[0])
}

function handle (self, deffered) {
    while (self._status === 3) {
        self = self._value
    }
    if (self._status === 0) {
        self._defferreds.push(deffered)
        return;
    }
    handleResolved(self, deffered);
}

function finale (self, deffered) {
}

function handleResolved (self, defferred) {
    // TODO: 为什么要异步操作？
    setTimeout(() => {
        let cb = self._status === 1 ? defferred.onFullfilled : defferred.onRejected
        if (cb === null) {
            console.log('这里应该是then返回的值如果是promise')
            if (self._status === 1) {
                resolve(defferred.thenPromise, self._value);
            } else if (self._status === 2) {
                reject(defferred.thenPromise, self._value);
            }
        } else {
            let result = tryCallOne(cb, self._value)
            if (result === IS_ERROR) {
                reject(defferred.thenPromise, LAST_ERROR)
            } else {
                resolve(defferred.thenPromise, result)
            }
        }
    }, 0)
}

var promise1 = new Promise((resolve, reject) => {
    // resolve(1000)
    // reject(2000)
    // throw new Error('custom error')
    // setTimeout(() => {
    //     resolve(1000)
    // }, 1000)
    // setTimeout(() => {
    //     reject(2000)
    // }, 1000)
    // resolve(new Promise(() => {}))
    // resolve(new Promise((resolve2, reject2) => { resolve2(3000) }))
    // resolve(new Promise((resolve2, reject2) => { reject2(4000) }))
    resolve(new Promise((resolve2, reject2) => { setTimeout(() => {resolve2(3000)}, 1000)}))
    // resolve(new Promise((resolve2, reject2) => { setTimeout(() => {reject2(4000)}, 1000)}))
    // resolve(new Promise((resolve2, reject2) => {resolve2(3000)}).then(_res => {console.log(_res)}));
})

// promise1.then((res) => {
//     console.log('suc', res)
// }, (err) => {
//     console.log('err', err)
// })

promise1.then(res => {
    console.log('suc', res)
    return res;
}, err => {
    console.log('err', err)
    throw new Error('custom error2')
    // return err;
}).then(res => {
    console.log('suc2', res)
}, err => {
    console.log('err2', err)
})