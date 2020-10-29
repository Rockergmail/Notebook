const PENDING = 'PENDING';
const FULLFILLED = 'FULLFILLED';
const REJECTED = 'REJECTED';

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
    then(onfullfilled, onrejected) {
        // 解决同步的问题
        if (this.status === FULLFILLED) {
            onfullfilled(this.value);
        }
        if (this.status === REJECTED) {
            onrejected(this.error);
        }
        // 解决异步的问题
        if (this.status === PENDING) {
            this.onResolvedCallbacks.push(() => {
                onfullfilled(this.value);
            })
            this.onRejectedCallbacks.push(() => {
                onrejected(this.error);
            })
        }
    }
}

module.exports = Promise;