// 方法性能分析器
// ListBuilder class.
// Component
class ListBuilder {
    constructor(parent, listLength) {
        this.parent = $(parent);
        this.listLength = listLength;
    }

    buildList(container) {
        var list = document.createElement('ul');
        list.setAttribute('id', container);
        this.parent.appendChild(list);
        var len = this.listLength;

        while (len) {
            var item = document.createElement('li');
            list.appendChild(item);
            --len;
        }
    }
    removeLists(id) {
        var ele = $(id);
        ele.parentNode.removeChild(ele);
    }
};

// SimpleProfiler class.
// Decorator
class SimpleProfiler {
    constructor(component) {
        this.component = component;
    }
    buildList() {
        var startTime = (new Date()).getTime();
        this.component.buildList();
        var elapsedTime = (new Date()).getTime() - startTime;
        console.log('buildList:' + elapsedTime + ' ms');
    }
};

var list = new ListBuilder('list-container', 5000);
list = new SimpleProfiler(list);
list.buildList();

// 通用化改造
// MethodProfiler class.
// Decorator
class MethodProfiler {
    constructor(component) {
        this.component = component;
        this.timers = {};
        for (var key in this.component) {
            // Ensure that the property is a function
            if (typeof this.component[key] !== 'function') {
                continue;
            }

            // Add the method
            var that = this;
            (function (methodName) {
                that[methodName] = function () {
                    that.startTimer(methodName);
                    var returnValue = that.component[methodName].apply(that.component, arguments);
                    that.displayTime(methodName, that.getElapsedTime(methodName));
                    return returnValue;
                };
            })(key);
        }
    }

    startTimer(methodName) {
        this.timers[methodName] = new Date().getTime();
    }
    getElapsedTime(methodName) {
        return new Date().getTime() - this.timers[methodName];
    }
    displayTime(methodName, time) {
        console.log(methodName + ': ' + time + ' ms');
    }

};

var list = new ListBuilder('.list-container', 5000);
list = new MethodProfiler(list);
list.buildList('ol');
list.buildList('ul');
list.removeLists('ul');
list.removeLists('ol');