/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-11-12 19:10:00
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-11-18 18:09:00
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

function getThen(obj) {
    try {
        return obj.then
    } catch(e) {
        LAST_ERROR = e
        return IS_ERROR
    }
    
}

const noop = () => { }

function Promise (fn) {
    this._status = 0
    this._value = null;
    this._defferreds = null;
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
    onFullfilled = onFullfilled ? onFullfilled : (data) => data
    onRejected = onRejected ? onRejected : (e) => { console.log('haha'); throw e }
    let thenPromise = new Promise(noop);
    this._defferreds = {
        thenPromise,
        onFullfilled,
        onRejected
    }
    finale(this)
    return thenPromise;
}

function resolve (self, newVal) {
    // https://promisesaplus.com/
    if (self === newVal) {
        return new TypeError('A promise cannot be resolved with itself.')
    }

    let then = getThen(newVal);
    if (then === IS_ERROR) {
        reject(self, LAST_ERROR)
        return;
    }

    if (then === self.then && Object.prototype.toString.call(newVal) === '[object MyPromise]') {
        self._status = 3;
        self._value = newVal;
        finale(self);
        return;
    } else if (Object.prototype.toString.call(newVal) === '[object Function]') {
        return;
    }

    self._status = 1;
    self._value = newVal;
    finale(self);
}

function reject (self, newVal) {
    self._status = 2;
    self._value = newVal;
    finale(self);
}

function finale (self) {
    // console.log('final', self._defferreds);
    if (!self._defferreds) {
        return
    }

    // TODO: 应该是while，因为可能无限嵌套promise
    if (self._status === 3) {
        self = self._value;
    }

    // TODO:为什么需要异步执行？
    if (self._status === 1) {
        let result = tryCallOne(self._defferreds.onFullfilled, self._value)
        if (result === IS_ERROR) {
            reject(self._defferreds.thenPromise, LAST_ERROR)
        } else {
            resolve(self._defferreds.thenPromise, result)
        }
    }
    if (self._status === 2) {
        let result = tryCallOne(self._defferreds.onRejected, self._value)
        if (result === IS_ERROR) {
            reject(self._defferreds.thenPromise, LAST_ERROR)
        } else {
            // 注意，这里需要resolve
            resolve(self._defferreds.thenPromise, result)
        }
    }
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
    resolve(new Promise((resolve2, reject2) => {resolve2(3000)}))
})

// promise1.then((res) => {
//     console.log('suc', res)
// }, (err) => {
//     console.log('err', err)
// })

promise1.then(res => {
    console.log('suc', res)
    // return res;
}, err => {
    console.log('err', err)
    throw new Error('custom error2')
    // return err;
}).then(res => {
    console.log('suc2', res)
}, err => {
    console.log('err2', err)
})

console.log(Object.prototype.toString.call(promise1))