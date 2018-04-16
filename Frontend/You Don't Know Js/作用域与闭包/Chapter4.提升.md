
### 提升

在编译阶段中，编译器会找到所有的声明，声明被提升，并关联到对应的作用域起来，赋值或其他运行逻辑会留在原地不动，然后才执行代码。在这个过程中，变量和函数声明从它们在代码中出现的位置被“移动”到了最上面，就叫做提升。

---

```js
a = 2;
var a;
console.log(a); // 2
```

更准确的解析：

```js
var a; /* 变量声明提升，默认值为undefined */
a = 2;
console.log(a); // 2
```

---

```js
console.log(a); // undefined
var a = 2; 
```

更准确的解析：

```js
var a; /* 变量声明提升，默认值为undefined */
console.log(a); // undefined
a = 2;
```

---

**每个作用域都会进行提升操作**

```js
foo();
 
function foo() {
    console.log(a); // undefined    
    var a = 2;
}
```

更准确的解析：

```js
function foo() { /* 函数声明提升 */
    var a; /* 变量声明提升 */
    console.log(a); // undefined 
    a = 2;
}
foo();
```

---

```js
foo(); // TypeError /* 注意这里不是ReferenceError */
bar(); // ReferenceError 
var foo = function bar() {
    // ...    
};
```

更准确的解析：

```js
var foo;
foo(); // TypeError  /* 因为foo的值为undefined，对undefined作函数调用，所以是TypeError，不是ReferenceError */
bar(); // ReferenceError /* 具名的函数表达式的标识符不可用 */
foo = function () {  /* 函数声明会被提升，但是函数表达式却不会被提升 */
    var bar = 'whatever' 
}
```

---

**函数优先提升**

```js
foo(); // 1  
var foo;
function foo() {
    console.log(1);
}
foo = function () {
    console.log(2);
};
```

更准确的解析：

```js
function foo() {
    console.log(1);
}
foo(); // 1 /* 如果已经声明了，后面再遇到var foo就自动忽略 */
foo = function () {
    console.log(2);
};
```

---

**后续的函数声明会覆盖前一个**

```js
foo(); // 3
 
function foo() {
    console.log(1);
}
var foo = function () {
    console.log(2);
};
 
function foo() {
    console.log(3);
}
```

更准确的解析：

```js
function foo() {
    console.log(3);
}
foo(); // 3
```

### 参考资料
《You Don't Know Js》（主要参考）