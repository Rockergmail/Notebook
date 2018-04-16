允许 identify() 和 speak() 函数对多个 环境 对象（me 和 you）进行复用，
```js
function identify() {
	return this.name.toUpperCase();
}

function speak() {
	var greeting = "Hello, I'm " + identify.call( this );
	console.log( greeting );
}

var me = {
	name: "Kyle"
};

var you = {
	name: "Reader"
};

identify.call( me ); // KYLE
identify.call( you ); // READER

speak.call( me ); // Hello, I'm KYLE
speak.call( you ); // Hello, I'm READER
```
this 机制提供了更优雅的方式来隐含地“传递”一个对象引用，导致更加干净的API设计和更容易的复用。
```js
function identify(context) {
	return context.name.toUpperCase();
}

function speak(context) {
	var greeting = "Hello, I'm " + identify( context );
	console.log( greeting );
}

identify( you ); // READER
speak( me ); // Hello, I'm KYLE
```
this 实际上是在函数被调用时建立的一个绑定，它指向 什么 是完全由函数被调用的调用点来决定的。

我们早先说过，this 不是编写时绑定，而是运行时绑定。它依赖于函数调用的上下文条件。this 绑定与函数声明的位置没有任何关系，而与函数被调用的方式紧密相连。

当一个函数被调用时，会建立一个称为执行环境的活动记录。这个记录包含函数是从何处（调用栈 —— call-stack）被调用的，函数是 如何 被调用的，被传递了什么参数等信息。这个记录的属性之一，就是在函数执行期间将被使用的 this 引用。

下一章中，我们将会学习寻找函数的 调用点（call-site） 来判定它的执行如何绑定 this。