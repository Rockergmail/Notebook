### 函数作用域的优点：

1. 隐藏内部实现，最小特权原则的软件设计理念；
1. 避免同名标识符之间的冲突

### 函数的形态：

```js
// 如果function是声明中的第一个词，那么就是一个函数声明，否则就是一个函数表达式

// 函数声明
// foo 被绑定在所在作用域中，可以直接通过foo() 来调用它
function foo () {...}

// 函数表达式
// foo 被绑定在函数表达式自身的函数中而不是所在作用域中
// foo 只能在...所代表的位置中被访问，外部作用域则不行
// FIXME: 函数表达式自身的函数 不就是 一个作用域么？
(function foo () {...})()

// 匿名函数表达式
(function () {...})()

// 函数表达式
var foo = function () {...}

// 立即执行函数表达式（Immediately Invoked Function Expression）
// 这两种形式在功能上是一致的，选择哪个全凭个人喜好

(function () {...})()
(function () {...}())
```

**具名函数**

特点：
1. “污染”了所在作用域
1. 必须显式地调用函数名才能运行其中的代码


**匿名函数表达式**

优点：书写起来简单快捷

缺点：
1. 匿名函数在栈追踪中不会显示出有意义的函数名，使得调试很困难。
2. 如果没有函数名，当函数需要引用自身时只能使用已经过期的arguments.callee引用，比如在递归中。另一个函数需要引用自身的例子，是在事件触发后事件监听器需要解绑自身。
3. 匿名函数省略了对于代码可读性/可理解性很重要的函数名。一个描述性的名称可以让代码不言自明。

**IIFE的应用场景：**
 
```js
var a = 2;
(function IIFE(win) {
   console.log(win);
})(window);
```

```js
var a = 2;
(function IIFE(def) {
    def(window);
    // 注意，是可以访问全局的window
})(function def(global) {
    var a = 3;
    console.log(a);
    // 3   
    console.log(global.a);
    // 2     
});
```

### 块作用域

块作用域是一个用来对最小授权原则进行扩展的工具，将代码从在函数中隐藏信息扩展为在块中隐藏信息。
函数作用域和块作用域的行为是一样的，任何声明在某个作用域内的变量，都将附属于这个作用域。

ES5中的块作用域：
1. with
1. try / catch 的 catch 分句

ES6中的块作用域：
1. let
1. const


### 不懂的地方

函数作用域的含义是指，属于这个函数的全部变量都可以在整个函数的范围内使用及复用（事实上在嵌套的作用域中也可以使用）。这种设计方案是非常有用的，能充分利用JavaScript变量可以根据需要改变值类型的“动态”特性。

// FIXME: how it works exactly


另外一种避免冲突的办法和现代的模块 机制很接近，就是从众多模块管理器中挑i选一个来使用。使用这些工具，任何库都无需将标识符加入到全局作用域中，而是通过依赖管理器的机制将库的标识符显式地导入到另外一个特定的作用域中。

显而易见，这些工具并没有能够违反词法作用域规则的“神奇”功能。它们只是利用作用域的规则强制所有标识符都不能注入到共享作用域中，而是保持在私有、无冲突的作用域中，这样可以有效规避掉所有的意外冲突。

因此，只要你愿意，即使不使用任何依赖管理工具也可以实现相同的功效。第5章会介绍模块模式的详细内容。

// FIXME: how it works exactly


```js
function process(data) {
    // 在这里做点有趣的事情 
}
var someReallyBigData = {
    // .. 
};
process(someReallyBigData);
var btn = document.getElementById("my_button");
btn.addEventListener("click", function click(evt) {
    console.log("button clicked");
},
/*<i>apcturingPhase</i>=*/false);
```

click 函数的点击回调并不需要 someReallyBigData 变量。理论上这意味着当process(..) 执行后，在内存中占用大量空间的数据结构就可以被垃圾回收了。但是，由于click 函数形成了一个覆盖整个作用域的闭包，JavaScript引擎极有可能依然保存着这个结构（取决于具体实现）。
//FIXME: 怎么说

```js

function process(data) {
    // 在这里做点有趣的事情
}
// 在这个块中定义的内容可以销毁了！   
{
    let someReallyBigData = {
        //. ..  
    };
    process(someReallyBigData);
}
var btn = document.getElementById("my_button");
btn.addEventListener("click", function click(evt) {
    console.log("button clicked");
},
/*<i>capturingPhase</i>=*/false);
```

### 参考资料
《You Don't Know Js》（主要参考）