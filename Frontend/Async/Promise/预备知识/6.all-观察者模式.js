// 观察者模式
// 基于发布订阅模式，观察者和订阅者是有关系的

// 观察者
class Observer {
    constructor(name) {
        this.name = name;
    }
    update(newState) {
        console.log(`${this.name}: 小宝宝现在${newState}了`);
    }
}

// 被观察者
class Subject {
    constructor() {
        this.state = ''
        this.observers = []
    }
    attach(o) {
        this.observers.push(o)
    }
    newState(state) {
        this.state = state
        this.observers.forEach(o => o.update(state));
    }
}

let parent1 = new Observer('爸爸');
let parent2 = new Observer('妈妈');
let child = new Subject();
child.attach(parent1)
child.attach(parent2)
child.newState('饿了')
child.newState('睡了')