### 定义

保证一个类只有一个实例，并提供一个访问它的全局访问点

### 核心

用一个变量判断是否存在，以判断是否已经创建过实例，未则创建实例，存在则返回对应的实例

### 传统方法实现

```js
// 实现方法一

var Singleton = function(name) {
  this.name = name;
};
Singleton.prototype.getName = function() {
  alert(this.name);
};
// 静态方法
Singleton.getInstance = function(name) {
  // 这里的this指向的是构造函数，而不是指向实例
  // 所以this.instance，相当于是静态变量
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
};
var a = Singleton.getInstance("sven1");
var b = Singleton.getInstance("sven2");
alert(a === b); // true
```

```js
// 实现方法一的变式

var Singleton = function(name) {
  this.name = name;
};
Singleton.prototype.getName = function() {
  alert(this.name);
};
Singleton.getInstance = (function() {
  var instance = null;
  return function(name) {
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  };
})();
```

缺点：增加了这个类的“不透明性”，也就是说跟一般我们用 new 来新建实例不一样，不友好

---

```js
// 实现方法二

var CreateDiv = (function() {
  var instance;
  var CreateDiv = function(html) {
    if (instance) {
      return instance;
    }
    this.html = html;
    this.init();

    return (instance = this);
  };
  CreateDiv.prototype.init = function() {
    var div = document.createElement("div");
    div.innerHTML = this.html;
    document.body.appendChild(div);
  };
  return CreateDiv;
})();
var a = new CreateDiv("sven1");
var b = new CreateDiv("sven2");
alert(a === b); // true
```

优点：增加了这个类的“透明性”

缺点：增加了复杂度，不便阅读

---

```js
// 实现方法三

var CreateDiv = function(html) {
  this.html = html;
  this.init();
};
CreateDiv.prototype.init = function() {
  var div = document.createElement("div");
  div.innerHTML = this.html;
  document.body.appendChild(div);
};
// 引入代理类
var ProxySingletonCreateDiv = (function() {
  var instance;
  return function(html) {
    if (!instance) {
      instance = new CreateDiv(html);
    }
    // 构造函数，如果不写return，默认是return this；写了就会像普通函数一样返回对应的对象
    return instance;
  };
})();
var a = new ProxySingletonCreateDiv("sven1");
var b = new ProxySingletonCreateDiv("sven2");
alert(a === b);
```

优点：增加了代理类，使得代码遵循单一责任原则

### JavaScript 中的单例模式

惰性单例模式

```html
<body>
  <button id="loginBtn">登录</button>
</body>
```

```js
var getSingle = function(fn) {
  var result;
  return function() {
    return result || (result = fn.apply(this, arguments));
  };
};

var createLoginLayer = function() {
  var div = document.createElement("div");
  div.innerHTML = "我是登录浮窗";
  div.style.display = "none";
  document.body.appendChild(div);
  return div;
};

var createSingleLoginLayer = getSingle(createLoginLayer);

document.getElementById("loginBtn").onclick = function() {
  var loginLayer = createSingleLoginLayer();
  loginLayer.style.display = "block";
};
```

优点：代码遵循单一责任原则

### 降低全局变量带来的命名污染

1. 使用命名空间
2. 使用闭包封装私有变量

---

### Reference

《JavaScript 设计模式与开发实践》
