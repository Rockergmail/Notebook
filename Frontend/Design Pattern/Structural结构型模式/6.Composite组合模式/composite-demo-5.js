
// 环状引用

// 应该要检测并避免出现环状引用，否则容易引起死循环，或是同一个功能被操作多次。

class Component {
    constructor() {
        this.componentPath = '';
    }
    printStruct(preStr) { }
    getChildren() {
        throw new Error('object doesn\'t support this method');
    }
    addChild() {
        throw new Error('object doesn\'t support this method: addChild');
    }
    removeChild() {
        throw new Error('object doesn\'t support this method: removeChild');
    }
}

class Composite extends Component {
    constructor(name) {
        super();
        this.name = name;
        this.childComponents = [];
    }
    addChild(child) {
        this.childComponents.push(child);

        if (!this.componentPath || !this.componentPath.trim().length) {
            this.componentPath = this.name;
        }

        if (this.componentPath.startsWith(child.name + '.')) {
            throw new Error('该组件' + chid.name + ' 已被添加过了');
        } else {
            if (this.componentPath.indexOf('.' + child.name) < 0) {
                child.componentPath = this.componentPath + '.' + child.name;
            } else {
                throw new Error('该组件' + child.name + ' 已被添加过了');
            }
        }
    };
    printStruct(preStr) {
        console.log(preStr + '+' + this.name);

        for (var i = 0, len = this.childComponents.length; i < len; i++) {
            var c = this.childComponents[i];
            c.printStruct(preStr);
        }
    };
}

class Leaf extends Component {
    constructor(name){
        super();
        this.name = name;
    }
    printStruct(preStr) {
        preStr = preStr || '';
        console.log(preStr + '-' + this.name);
    };
}

var root = new Composite('服装');
var c1 = new Composite('男装');
var c2 = new Composite('衬衣');

root.addChild(c1);
c1.addChild(c2);
c2.addChild(c1);

root.printStruct();

    /*
    当某个组件被删除后，路径发生变化，需要修改所有相关路径记录情况。
    更好的方式是，使用动态计算路径，每次添加一个组件的时候，动态地递归寻找父组件，然后父组件再找父组件，直到根组件。
    */