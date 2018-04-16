
### 闭包

当一个函数在它的词法作用域之外被调用时，闭包可以记住并访问它的词法作用域。闭包就是对这个函数所在的词法作用域的引用。

闭包的特征：
1. 函数嵌套
1. 将内层的函数作为值一样传递
1. 外层函数被调用，内层函数对所在的词法作用域的引用，所以外层函数不会被垃圾回收

常见的闭包例子：(当你传入一个 回调函数，则产生闭包)

计时器、事件处理器、Ajax请求、跨窗口消息、web worker、或者任何其他的异步（或同步）任务

闭包最终的形态：像模块一样工作

```js
function foo() {

	/* 作用域A */

	var a = 2;

	function bar() {

		/* 作用域B */

		console.log( a );
	}

	return bar;
}

var baz = foo();

baz(); // 2 /* 闭包，即对作用域A的引用，RHS引用查询时就会到作用域A进行标识符查询 */
```

```js
function foo() {
	var a = 2;

	function baz() {
		console.log( a ); // 2
	}

	bar( baz );
}

function bar(fn) {
	fn();  // 2  /* 闭包 */
}
```

```js
var fn;

function foo() {
	var a = 2;

	function baz() {
		console.log( a );
	}

	fn = baz; // 将`baz`赋值给一个全局变量
}

function bar() {
	fn(); // 闭包
}

foo();

bar(); // 2
```

```js
function setupBot(name,selector) {
	$( selector ).click( function activator(){
		console.log( "Activating: " + name );
	} );
}

// 函数activator作为参数传递，触发时产生闭包

setupBot( "Closure Bot 1", "#bot_1" );
setupBot( "Closure Bot 2", "#bot_2" );
```

### 闭包的应用

**for循环**

```js
for (var i=1; i<=5; i++) {
	setTimeout( function timer(){
		console.log( i );
	}, i*1000 );
}

// 输出结果为每秒打印出数字6
// 因为这里的每个闭包都共享全局作用域上的i，所以打印出的结果是一样的
```

如何使得打印出的结果是1~5？这里的关键是每次要获得```i```的拷贝，以及能够被引用

```js
for (var i=1; i<=5; i++) {
	(function(){ /* 创建新的作用域 */
		var j = i;	/* 拷贝变量i*/
		setTimeout( function timer(){
			console.log( j ); /* j是引用新的作用域的那个变量 */
		}, j*1000 );
	})();
}

// 等价于


for (var i=1; i<=5; i++) {
	(function(j){
		setTimeout( function timer(){
			console.log( j );
		}, j*1000 );
	})( i );
}

// 等价于

for (var i=1; i<=5; i++) {
	(function(i){ /* 注意此i作为形参 */
		setTimeout( function timer(){
			console.log( i );
		}, i*1000 );
	})( i ); /* 注意此i作为实参 */
}

// 等价于
for (var i=1; i<=5; i++) {
	let j = i; // let关键字实现了块作用域
	setTimeout( function timer(){
		console.log( j );
	}, j*1000 );
}

// 注意区别

// 这个变量将不是只为循环声明一次，而是为每次迭代声明一次
// 每次后续的迭代中被上一次迭代末尾的值初始化

for (let i=1; i<=5; i++) {
	setTimeout( function timer(){
		console.log( i );
	}, i*1000 );
}
```


**揭示模块**

模块要求两个关键性质：
1. 一个被调用的外部包装函数，来创建外围作用域
1. 这个包装函数的返回值必须包含至少一个内部函数的引用，这个函数才拥有包装函数内部作用域的闭包

```js
function CoolModule(id) {
	function identify() {
		console.log( id );
	}

	return {
		identify: identify
	};
}

var foo1 = CoolModule( "foo 1" );
var foo2 = CoolModule( "foo 2" );

foo1.identify(); // "foo 1"
foo2.identify(); // "foo 2"
```


```js
var foo = (function CoolModule(id) {
	
	function identify() {
		console.log( id );
	}

	return {
		identify: identify
	};
})( "foo module" );

foo.identify(); // foo module
```

**模块加载器**

细节略

```js
var MyModules = (function Manager() {
	var modules = {};

	function define(name, deps, impl) {
		for (var i=0; i<deps.length; i++) {
			deps[i] = modules[deps[i]];
		}
		modules[name] = impl.apply( impl, deps );
	}

	function get(name) {
		return modules[name];
	}

	return {
		define: define,
		get: get
	};
})();
```

```js
MyModules.define( "bar", [], function(){
	function hello(who) {
		return "Let me introduce: " + who;
	}

	return {
		hello: hello
	};
} );

MyModules.define( "foo", ["bar"], function(bar){
	var hungry = "hippo";

	function awesome() {
		console.log( bar.hello( hungry ).toUpperCase() );
	}

	return {
		awesome: awesome
	};
} );

var bar = MyModules.get( "bar" );
var foo = MyModules.get( "foo" );

console.log(
	bar.hello( "hippo" )
); // Let me introduce: hippo

foo.awesome(); // LET ME INTRODUCE: HIPPO
```

注意区分es6的模块：
1. ES6将一个文件视为一个独立的模块
1. ES6模块可以被静态识别的，即编译期间可以知道对模块的引用是否存在的；而函数的模块是执行时生成的，所以对应的API是可以动态修改的
1. ES6模块文件内部的内容被视为像是包围在一个作用域闭包中，就像使用函数闭包的模块那样

### 参考资料
《You Don't Know Js》（主要参考）