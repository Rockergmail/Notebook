/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-08-14 17:23:36
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-08-14 18:15:11
 */
class Father {
    constructor(name, age) {
        this.age = age
        this.name = name
    }
    static personality () {
        console.log('I am such a dick, I wish my son isn\'t');
    }
    eating () {
        console.log('eating from father', this.name);
    }
}

class Child extends Father {
    constructor(name, age) {
        super(name, age)
        this.script = 'escape from the orginial family'
    }
    swimming () {
        console.log('swimming')
    }
}

// var _createClass = function () {
//     function defineProperties (target, props) {
//         for (var i = 0; i < props.length; i++) {
//             var descriptor = props[i];
//             // 配置enumerable为false、configurable为true、writable为true
//             descriptor.enumerable = descriptor.enumerable || false;
//             descriptor.configurable = true;
//             if ("value" in descriptor) descriptor.writable = true;
//             // 如果是类方法，将方法注册在原型对象上，Constructor.prototype
//             // 如果是静态方法，将方法注册在构造函数上，Constructor
//             Object.defineProperty(target, descriptor.key, descriptor);
//         }
//     }
//     return function (Constructor, protoProps, staticProps) {
//         if (protoProps) defineProperties(Constructor.prototype, protoProps);
//         if (staticProps) defineProperties(Constructor, staticProps);
//         return Constructor;
//     };
// }();

// function _possibleConstructorReturn (self, call) {
//     if (!self) {
//         throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
//     }
//     return call && (typeof call === "object" || typeof call === "function") ? call : self;
// }

// // extends的模拟
// function _inherits (subClass, superClass) {
//     if (typeof superClass !== "function" && superClass !== null) {
//         throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
//     }
//     // 复制父类的原型对象，赋值给子类的原型对象，把constructor指向子类
//     // 以达到继承方法的效果
//     subClass.prototype = Object.create(superClass && superClass.prototype, {
//         constructor: {
//             value: subClass,
//             enumerable: false,
//             writable: true,
//             configurable: true
//         }
//     });
//     // ES6新增：把子类的__proto__指向父类
//     if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
// }

// // 不用直接调用class作为函数
// function _classCallCheck (instance, Constructor) {
//     if (!(instance instanceof Constructor)) {
//         throw new TypeError("Cannot call a class as a function");
//     }
// }

// var Father = function () {
//     function Father (name, age) {
//         _classCallCheck(this, Father);

//         this.age = age;
//         this.name = name;
//     }

//     _createClass(Father, [{
//         key: 'eating',
//         value: function eating () {
//             console.log('eating');
//         }
//     }], [{
//         key: 'personality',
//         value: function personality () {
//             console.log('I am such a dick, I wish my son isn\'t');
//         }
//     }]);

//     return Father;
// }();

// var Child = function (_Father) {
//     // extends的模拟
//     _inherits(Child, _Father);

//     function Child (name, age) {
//         _classCallCheck(this, Child);

//         // 子类的__proto__指向父类
//         // 属性的继承，原理就是call方法，把this指向子类
//         var _this = _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).call(this, name, age));

//         _this.script = 'escape from the orginial family';
//         return _this;
//     }

//     _createClass(Child, [{
//         key: 'swimming',
//         value: function swimming () {
//             console.log('swimming');
//         }
//     }]);

//     return Child;
// }(Father);

let father1 = new Father('F1', 60)
let child1 = new Child('C1', 27)
father1.eating();
child1.eating();
Father.prototype.shiting = function() {
    console.log('shiting', this.name)
}
father1.shiting()
child1.shiting()

console.log(father1)
console.log(child1)

let obj = {a: 1}
let obj2 = obj
let obj3 = Object.assign({a: 3}, obj)
let obj4 = Object.create(obj, {a: {
    value: 4
}})

console.log(obj, obj2, obj3, obj4)

