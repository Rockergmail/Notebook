class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(type, listener, isUnshift) {
    // if (!this.events) {
    //     this.events = {}
    // }
    if (this.events[type]) {
      if (isUnshift) {
        this.events[type].unshift(listener);
      } else {
        this.events[type].push(listener);
      }
    } else {
      this.events[type] = [listener];
    }
    // TODO: add the fucking event
  }

  emit(type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach((fn) => {
        fn.call(this, ...args);
      });
    }
  }

  off(type, listener) {
    if (this.events[type]) {
      this.events[type] = this.events[type].filter((fn) => fn !== listener);
    }
  }

  once(type, listener) {
    let that = this;
    function fn(...args) {
      listener.call(that, ...args);
      console.log(this, fn, this === fn);
      that.off(type, fn);
    }
    this.on(type, fn);
  }
}

let ev = new EventEmitter();
console.log(ev);
function shit(str) {
  console.log(str);
}
// ev.on('say', shit);

ev.once("say", function (str) {
  console.log("这是once:" + str);
});

ev.emit("say", "visa222");
ev.emit("say", "visa");
// ev.off('say', shit)
ev.emit("say", "visa333");
