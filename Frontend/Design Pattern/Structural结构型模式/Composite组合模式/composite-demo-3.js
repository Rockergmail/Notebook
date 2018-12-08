class Component {
    someOperation() { }
    addChild() {
        throw new Error('object doesn\'t support this method: addChild');
    }
    removeChild() {
        throw new Error('object doesn\'t support this method: removeChild');
    }
    getChild() {
        throw new Error('object doesn\'t support this method: getChild');
    }
}

// 组合对象，通常需要存储子对象，定义有子部件的部件行为
class Composite extends Component {
    constructor() {
        super();
        this.childComponents = [];
    }

    someOperation() {
        for (var i = 0, len = this.childComponents.length; i < len; i++) {
            this.childComponents.someOperation();
        }
    };
    addChild(child) {
        this.childComponents.push(child);
    };
    removeChild(child) {
        var childComponent;
        for (var i = 0, len = this.childComponents.length; i < len; i++) {
            childComponent = this.childComponents[i];

            if (childComponent == child) return true;
        }

        return false;
    };
    getChildren(index) {
        if (index >= 0 && index < this.childComponents.length) {
            return this.childComponents[index];
        }
        return null;
    };
}


// 叶子对象，也子对象不再包含其他子对象
class Leaf extends Component{
    someOperation () { };
}

var root = new Composite();
var a = new Composite();
var b = new Composite();

var leaf1 = new Leaf();
var leaf2 = new Leaf();
var leaf3 = new Leaf();

root.addChild(a);
root.addChild(b);
root.addChild(leaf1);
a.addChild(leaf2);
b.addChild(leaf3);

var o = root.getChildren(1);
console.log(o);