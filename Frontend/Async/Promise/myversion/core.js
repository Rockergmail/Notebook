let LAST_ERROR = null;
let IS_ERROR = false;

function tryTwo(fn, a, b) {
    try {
        LAST_ERROR = null;
        IS_ERROR = false;
        return fn(a, b);
    } catch (e) {
        IS_ERROR = true;
        return LAST_ERROR = e;
    }
}

function Promise(fn) {
    this._status = 0
    this._value = null;
    this._defferreds = null;

    let done = false;

    function resolve(newVal) {
        if (done) {
            return
        } else {
            done = true;
        this._status = 1;
        this._value = newVal
        }
    }

    function reject(newVal) {
        if (done) {
            return
        } else {
            done = true;
        this._status = 2;
        this._value = newVal;
        }
    }

    // doResolve()
    const result = tryTwo(fn, resolve, reject)
    if (result === LAST_ERROR) {
        throw new Error(LAST_ERROR)
    } 
}

Promise.prototype.then = function(onFullfilled, onRejected) {
    setTimeout(() => {
        
        if (this._status === 1) {
            onFullfilled(this._value)
        }

        if (this._status === 2) {
            onRejected(this._value)
        }
    }, 0);
}



let promise = new Promise((resolve, reject) => {
    resolve(1000)
})

promise.then((result) => {
    console.log('suc', result)
}, (err) => {
    console.log('err', err)
})

