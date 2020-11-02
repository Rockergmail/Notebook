'use strict';

var asap = require('asap/raw');

function noop() {}

// States:
//
// 0 - pending
// 1 - fulfilled with _value
// 2 - rejected with _value
// 3 - adopted the state of another promise, _value
//
// once the state is no longer pending (0) it is immutable

// All `_` prefixed properties will be reduced to `_{random number}`
// at build time to obfuscate them and discourage their use.
// We don't use symbols or Object.defineProperty to fully hide them
// because the performance isn't good enough.


// to avoid using try/catch inside critical functions, we
// extract them to here.
/**
 * 把try/catch单独拎出来，让核心代码更简洁，可以借鉴
 */
var LAST_ERROR = null;
var IS_ERROR = {};
function getThen(obj) {
  try {
    return obj.then;
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

function tryCallOne(fn, a) {
  try {
    return fn(a);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}
function tryCallTwo(fn, a, b) {
  try {
    fn(a, b);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

module.exports = Promise;

function Promise(fn) {
  if (typeof this !== 'object') {
    throw new TypeError('Promises must be constructed via new');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Promise constructor\'s argument is not a function');
  }
  this._deferredState = 0;
  this._state = 0;
  this._value = null;
  this._deferreds = null;
  /**
   * 此处是为then方法的new Promise(noop);做准备
   */
  if (fn === noop) return;
  /**
   * 执行用户传进来的fn
   */
  debugger;
  doResolve(fn, this);
}
Promise._onHandle = null;
Promise._onReject = null;
Promise._noop = noop;

Promise.prototype.then = function(onFulfilled, onRejected) {
  if (this.constructor !== Promise) {
    return safeThen(this, onFulfilled, onRejected);
  }
  /**
   * 因为需要支持then的链式调用，所以需要新建一个promise实例
   * 这里为什么fn传noop，是因为不需要执行doResolve(fn, this)
   * 用户新建的Promise需要传入fn，是因为要告诉什么时候resolve和reject
   * 这里因为可以内部调用function resolve，而api resolve支持传入那个实例，所以它可以改变promise的states不为Pending
   */
  var res = new Promise(noop);
  /**
   * 注意这里传入的handle的deferred的promise是对应res。this是指向用户新建的promise实例
   */
  debugger;
  handle(this, new Handler(onFulfilled, onRejected, res));
  return res;
};
/**
 * 防止不是同一个constructor，所以用我们的constructor新建一个promise，然后执行constructor的代码
 */
function safeThen(self, onFulfilled, onRejected) {
  return new self.constructor(function (resolve, reject) {
    var res = new Promise(noop);
    res.then(resolve, reject);
    handle(self, new Handler(onFulfilled, onRejected, res));
  });
}
/**
 * 如果api resolved同步执行，那么执行回调
 * 如果api resolve异步执行，就是state为0，就是pending，就把用户新建的promise和then方法新建的实例存到this._deferreds
 */
function handle(self, deferred) {
  
  debugger;

  while (self._state === 3) {
    self = self._value;
  }
  /*
   * 如果设置了全局的_onHandle钩子，会在这里触发
   */
  if (Promise._onHandle) {
    Promise._onHandle(self);
  }
  /**
   * 如果fn异步执行api resolve/reject，那_state是pending
   */
  if (self._state === 0) {
    /**
     * 默认_deferredState是0，所以执行
     */
    if (self._deferredState === 0) {
      self._deferredState = 1;
      /**
       * 把then自己新建的promise实例存到_deferreds
       */
      self._deferreds = deferred;

      debugger;

      return;
    }
    if (self._deferredState === 1) {
      self._deferredState = 2;
      /**
       * 如果then方法新建的promise，
       */
      self._deferreds = [self._deferreds, deferred];

      debugger;
      return;
    }
    self._deferreds.push(deferred);
    debugger;
    return;
  }
  // 注意，当state等于3，然后变成1之后，deffered还是同一个，从而获取对应的值
  debugger;
  handleResolved(self, deferred);
}
/**
 * 执行onFulfilled/onRejected回调
 * function resolve/reject then方法新建的promise实例
 */
function handleResolved(self, deferred) {
  debugger;
  /**
   * asap是异步队列处理库，暂时可以简单理解为setTimeout(fn, 0)来模拟异步处理
   * TODO:这里为什么要用asap？
   * https://github.com/kriskowal/asap/blob/master/raw.js
   */
  asap(function() {
    debugger;
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;

    if (cb === null) {
      if (self._state === 1) {
        resolve(deferred.promise, self._value);
      } else {
        reject(deferred.promise, self._value);
      }
      return;
    }
    var ret = tryCallOne(cb, self._value);
    if (ret === IS_ERROR) {
      reject(deferred.promise, LAST_ERROR);
    } else {
      resolve(deferred.promise, ret);
    }
  });
}
/**
 * 根据值做不同的判断
 * 改变state为1，fullfilled，记录返回值
 * 执行存起来的_deferreds的回调
 */
function resolve(self, newValue) {
  debugger;
  // 注意self是指向谁的，从fn的执行，到then的执行，所传的self是不一样的。前者传promise实例，后者传then方法自己新建的promise实例
  // newValue是resolve的值
  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
  if (newValue === self) {
    return reject(
      self,
      new TypeError('A promise cannot be resolved with itself.')
    );
  }
  if (
    newValue &&
    (typeof newValue === 'object' || typeof newValue === 'function')
  ) {
    var then = getThen(newValue);
    if (then === IS_ERROR) {
      return reject(self, LAST_ERROR);
    }
    /**
     * 用户resolve的值如果是promise
     */
    if (
      then === self.then &&
      newValue instanceof Promise
    ) {
      debugger;
      self._state = 3;
      self._value = newValue;
      finale(self);
      return;
    /**
     * 用户resolve的值如果是function
     * 用法见：https://es6.ruanyifeng.com/#docs/promise#Promise-resolve
     * 专门用于Promise.resolve的，传入thenable，相当于自动执行then方法
     */
    } else if (typeof then === 'function') {
      debugger;
      doResolve(then.bind(newValue), self);
      return;
    }
  }
  /**
   * 此处，已经包括了处理用户返回（{then: 1}）的特殊情况
   */
  debugger;
  self._state = 1;
  self._value = newValue;
  finale(self);
  /**
   * 此处，如果用户是直接同步resolve/reject则已经执行完成；可以再去then方法、分析异步resolve/reject操作
   */
}

/**
 * 改变state为2，rejected，记录失败
 * 执行存起来的_deferreds的回调
 */
function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  /*
   * 如果设置了全局的_onHandle钩子，会在这里触发
   */
  if (Promise._onReject) {
    Promise._onReject(self, newValue);
  }
  finale(self);
}

/*
 * 执行存起来的_deferreds的回调
 */
function finale(self) {
  debugger;
  if (self._deferredState === 1) {
    debugger;
    handle(self, self._deferreds);
    self._deferreds = null;
  }
  if (self._deferredState === 2) {
    debugger;
    for (var i = 0; i < self._deferreds.length; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }
}

/**
 * 返回一个deferred格式的object
 * {
 *   promise: ...,
 *   onFulfilled: ...,
 *   onRejected: ...
 * }
 */
function Handler(onFulfilled, onRejected, promise){
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 * 
 * Makes no guarantees about asynchrony.
 * 
 * 执行fn，传入api resolve、api reject的方法
 * 因为异步的顺序不能保证，要保证onFulfilled、onFulfilled只执行一次
 */
function doResolve(fn, promise) {
  var done = false;
  var res = tryCallTwo(fn, function (value) {
    if (done) return;
    done = true;
    resolve(promise, value);
  }, function (reason) {
    if (done) return;
    done = true;
    reject(promise, reason);
  });
  if (!done && res === IS_ERROR) {
    done = true;
    reject(promise, LAST_ERROR);
  }
}
