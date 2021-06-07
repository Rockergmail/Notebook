// 5.2.1 typescript
class Window {
    constructor(name) {
        this.name = name;
    }
    static getInstance(name) {
        if (!this.instance) {
            this.instance = new Window(name);
        }
        return this.instance;
    }
}

var w1 = Window.getInstance();
var w2 = Window.getInstance();
console.log(w1 === w2);

// 5.2.2 ES5单例模式

let  Window = function(name) {
    this.name=name;
}
Window.prototype.getName=function () {
    console.log(this.name);
}
Window.getInstance=(function () {
    let window=null;
    return function (name) {
        if (!window)
           window=new Window(name);
        return window;
    }
})();
let window=Window.getInstance('zfpx');
window.getName();

// 5.2.3 透明单例

let Window=(function () {
    let window;
    let Window=function (name) {
        if (window) {
            return window;
        } else {
            this.name=name;
            return (window=this);
        }
    }
    Window.prototype.getName=function () {
        console.log(this.name);
    }
    return Window;
})();

let window1=new Window('zfpx');
let window2=new Window('zfpx');
window1.getName();
console.log(window1 === window2)

// 5.2.4 单例与构建分离

function Window(name) {
    this.name=name;
}
Window.prototype.getName=function () {
    console.log(this.name);
}

let createSingle=(function () {
    let instance;
    return function (name) {
        if (!instance) {
            instance=new Window();
        }
        return instance;
    }
})();

let window1=new createSingle('zfpx');
let window2=new createSingle('zfpx');
window1.getName();
console.log(window1 === window2)

// 5.2.5 封装变化

function Window(name) {
    this.name=name;
}
Window.prototype.getName=function () {
    console.log(this.name);
}

let createSingle=function (Constructor) {
    let instance;
    return function () {
        if (!instance) {
            Constructor.apply(this,arguments);
            Object.setPrototypeOf(this,Constructor.prototype)
            instance=this;
        }
        return instance;
    }
};
let CreateWindow=createSingle(Window);
let window1=new CreateWindow('zfpx');
let window2=new CreateWindow('zfpx');
window1.getName();
console.log(window1 === window2)