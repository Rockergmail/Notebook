// 父组件引用

class Component {
    constructor() {
        this.parent = null;
    }

    getChildren() {
        throw new Error('object doesn\'t support this method');
    }
    addChild() {
        throw new Error('object doesn\'t support this method: addChild');
    }
    removeChild() {
        throw new Error('object doesn\'t support this method: removeChild');
    }
    getChild() {
        throw new Error('object doesn\'t support this method: getChild');
    }
    printStruct() {
        throw new Error('object doesn\'t support this method');
    }
}


class Composite extends Component {
    constructor(name) {
        super();
        this.childComponents = [];
        this.name = name;
    }

    addChild(child) {
        this.childComponents.push(child);
        // 父组件引用
        child.parent = this;
    };
    removeChild(child) {
        var idx = this.childComponents.indexOf(child);

        if (idx !== -1) {
            for (var i = 0, len = child.getChildren().length; i < len; i++) {
                var c = child.getChildren()[i];
                c.parent = this;
                this.childComponents.push(c);
            }

            this.childComponents.splice(idx, 1);
        }
    };
    getChildren() {
        return this.childComponents;
    };
    printStruct(preStr) {
        preStr = preStr || '';
        console.log(preStr + '+' + this.name);
        preStr += '  ';
        for (var i = 0, len = this.childComponents.length; i < len; i++) {
            var c = this.childComponents[i];
            c.printStruct(preStr);
        }
    };
}



class Leaf extends Component {
    constructor(name) {
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
var c2 = new Composite('女装');

var leaf1 = new Leaf('衬衣');
var leaf2 = new Leaf('夹克');
var leaf3 = new Leaf('裙子');
var leaf4 = new Leaf('套装');

root.addChild(c1);
root.addChild(c2);
c1.addChild(leaf1);
c1.addChild(leaf2);
c2.addChild(leaf3);
c2.addChild(leaf4);

root.printStruct("*** ");
// console.log('-----------------------------');

// root.removeChild(c1);
// root.printStruct();