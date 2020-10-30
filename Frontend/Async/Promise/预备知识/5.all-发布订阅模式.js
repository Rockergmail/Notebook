// 发布订阅者模式

const fs = require('fs');
const path = require('path');

const event = {
    _arr: [],
    on(fn) {
        this._arr.push(fn);
    },
    emit() {
        this._arr.forEach(fn => fn());
    }
}

let english = {}

event.on(() => {
    console.log('执行一次')
})
event.on(() => {
    if (Object.keys(english).length === 2) {
        console.log(english)
    }
})

fs.readFile(path.resolve(__dirname, './1.txt'), 'utf8', (error, result) => {
    if (error) {
        console.log(error)
        return;
    }
    english.one = result;
    event.emit();
})

fs.readFile(path.resolve(__dirname, './2.txt'), 'utf8', (error, result) => {
    if (error) {
        console.log(error)
        return;
    }
    english.two = result;
    event.emit();
})