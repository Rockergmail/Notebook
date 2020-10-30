const PENDING = 'PENDING';
const FULLFILLED = 'FULLFILLED';
const REJECTED = 'REJECTED';

class Promise {
    constructor(exec) {
        this.status = PENDING;
        this.value = undefined;
        this.error = undefined;
        let resolve = (data) => {
            if (this.status === PENDING) {
                this.status = FULLFILLED;
                this.value = data;
            }
        }
        let reject = (err) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.error = err;
            }
        }
        try {
            exec(resolve, reject);
        } catch (e) {
            reject(e)
        }
    }
    then(onfullfilled, onrejected) {
        if (this.status === FULLFILLED) {
            onfullfilled(this.value);
        }
        if (this.status === REJECTED) {
            onrejected(this.error);
        }
    }
}

module.exports = Promise;