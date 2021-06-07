// babel支持decorators
// "plugins": [
//     ["@babel/plugin-proposal-decorators", { "legacy": true }],
//     ["@babel/plugin-proposal-class-properties", { "loose" : true }]
//   ]

@testable
class Person {}

function testable(target) {
  target.testable = true;
}

console.log(Person.testable);

// ================================

let Hooks={
    componentWillMount() {
        console.log('componentWillMount');
    },
    componentDidMount() {
        console.log('componentDidMount');
    }
}
function mixins(...others) {
    return function (target) {
        Object.assign(target.prototype,...others);
    }
}
@mixins(Hooks)
class Component{

}
let c=new Component();
console.log(c);

// ==================================

function readonly(target,attr,descriptor) {
    descriptor.writable=false;
}
class Circle{
    @readonly
    PI=3.14;
}
let c=new Circle();
c.PI=100;
console.log(c.PI)

// ==================================

let oldVal=descriptor.value;
descriptor.value=function (...args) {
    console.log(`参数:${args}`);
    return oldVal(...args);
}
}
class Caculator{
@logger
sum(a,b) {
    return a+b;
}
}
let c=new Caculator();
let ret=c.sum(1,2);
console.log(ret);