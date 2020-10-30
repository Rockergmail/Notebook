/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-10-29 10:11:35
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-10-30 14:48:31
 */
const PENDING = 'PENDING';
const FULLFILLED = 'FULLFILLED';
const REJECTED = 'REJECTED';

function resolvePromise (_promise, x, resolve, reject) {
    let called; // 防止多次调用成功和失败
    if (_promise === x) {
        return reject('[TypeError: Chaining cycle detected for promise #<Promise>]')
    }
    // if (Object.prototype.toString.call(x) === "[object Promise]") {

    // } else 
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x,
                    // y 还是有可能是一个promise，所以继续解释，直到其他类型为止
                    y => {
                        if (called) return;
                        called = true;
                        resolvePromise(_promise, y, resolve, reject)
                        // resolve(y)
                    },
                    r => {
                        if (called) return;
                        called = true;
                        resolvePromise(_promise, r, resolve, reject)
                        // reject(r)
                    })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e)
        }
    } else {
        resolve(x)
    }
}

class Promise {
    constructor(exec) {
        this.status = PENDING;
        this.value = undefined;
        this.error = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        let resolve = (data) => {
            if (this.status === PENDING) {
                this.status = FULLFILLED;
                this.value = data;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }
        let reject = (err) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.error = err;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }
        try {
            exec(resolve, reject);
        } catch (e) {
            reject(e)
        }
    }
    then (onfullfilled, onrejected) {

        onfullfilled = typeof onfullfilled === 'function' ? onfullfilled : data => data
        onrejected = typeof onrejected === 'function' ? onrejected : err => {
            throw err
        }

        let _promise = new Promise((resolve, reject) => {
            if (this.status === FULLFILLED) {
                // 异步操作是为了拿到_promise变量
                setTimeout(() => {
                    // try-catch是为了解决异步操作中，onfullfilled可能会出错
                    try {
                        const x = onfullfilled(this.value);
                        resolvePromise(_promise, x, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    const x = onrejected(this.error);
                    resolvePromise(_promise, x, resolve, reject);
                }, 0)
            }
            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        const x = onfullfilled(this.value);
                        resolvePromise(_promise, x, resolve, reject);
                    }, 0)
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        const x = onrejected(this.error);
                        resolvePromise(_promise, x, resolve, reject);
                    }, 0)
                })
            }
        })
        return _promise
    }

    finally(onFinally) {
        return this.then(onFinally, onFinally)
    }

}

// 可以解决少嵌套问题
Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}

function isPromise (data) {
    if (typeof data === 'object' && data !== null || typeof data === 'function') {
        if (typeof data.then === 'function') {
            return true
        }
    }
    return false;
}

Promise.all = function (values) {
    return new Promise((resolve, reject) => {

        let result = [];
        let index = 0
        function processData (k, v) {
            result[k] = v;
            if (++index === values.length) {
                resolve(result)
            }
        }

        for (let i = 0; i < values.length; i++) {
            let current = values[i]
            if (isPromise(current)) {
                current.then(data => {
                    processData(i, data)
                }, err => {
                    reject(err)
                })
            } else {
                processData(i, current)
                // result[i] = current
            }
        }
    })
}



Promise.any = function () {}
Promise.any = function () {}

module.exports = Promise;