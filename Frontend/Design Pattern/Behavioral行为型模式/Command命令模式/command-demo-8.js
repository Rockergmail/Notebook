// 补偿式（反操作式）

// 取消操作和命令日志

// Command
class MoveUp {
    constructor(cursor) {
        this.cursor = cursor;
    }
    execute() {
        this.cursor.move(0, -10);
    }
    undo() {
        this.cursor.move(0, 10);
    }
};
// Command
class MoveDown {
    constructor(cursor) {
        this.cursor = cursor;
    }
    execute() {
        this.cursor.move(0, 10);
    }
    undo() {
        this.cursor.move(0, -10);
    }
};
// Command
class MoveLeft {
    constructor(cursor) {
        this.cursor = cursor;
    }
    execute() {
        this.cursor.move(-10, 0);
    }
    undo() {
        this.cursor.move(10, 0);
    }
};
// Command
class MoveRight {
    constructor(cursor) {
        this.cursor = cursor;
    }
    execute() {
        this.cursor.move(10, 0);
    }
    undo() {
        this.cursor.move(-10, 0);
    }
};

// Recevier，负责实现指针移动
// Cursor class 实现了命令类所要求的操作
class Cursor {
    constructor(width, height, parent) {
        this.width = width;
        this.height = height;
        this.position = {
            x: width / 2,
            y: height / 2
        };

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        parent.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = '#cc0000';
        this.move(0, 0);
    }
    move(x, y) {
        this.position.x += x;
        this.position.y += y;
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillRect(this.position.x, this.position.y, 3, 3);
    };

};
// 下面这个装饰者的作用就是在执行一个命令之前先将其压栈
// UndoDecorator class
var UndoDecorator = function (command, undoStack) {
    this.command = command;
    this.undoStack = undoStack;
};
UndoDecorator.prototype = {
    execute: function () {
        this.undoStack.push(this.command);
        this.command.execute();
    },
    undo: function () {
        this.command.undo();
    }
};

// 用户界面类，负责生成必要的HTML元素，并且为其注册click事件监听器，
// 这些监听器要么调用execute方法要么调用undo方法:
// CommandButton class
var CommandButton = function (label, command, parent) {
    this.element = document.createElement('button');
    this.element.innerHTML = label;
    parent.appendChild(this.element);

    addEvent(this.element, 'click', function () {
        command.execute();
    });
};

// UndoButton class
var UndoButton = function (label, parent, undoStack) {
    this.element = document.createElement('button');
    this.element.innerHTML = label;
    parent.appendChild(this.element);

    addEvent(this.element, 'click', function () {
        if (undoStack.length === 0) return;
        var lastCommand = undoStack.pop();
        lastCommand.undo();
    });
};
/*
 像UndoDecorator类一样，UndoButton类的构造函数也需要把命令栈作为参数传入。这个栈其实就是一个数组。调用经UndoDecorator对象装饰过的命令对象的execute方法时这个命令对象会被压入栈。为了执行取消操作，取消按钮会从命令栈中弹出最近的命令并调用其undo方法。这将逆转刚执行过的操作。
 */

// Implementation code
var body = document.body;
var cursor = new Cursor(400, 400, body);
var undoStack = [];

var upCommand = new UndoDecorator(new MoveUp(cursor), undoStack);
var downCommand = new UndoDecorator(new MoveDown(cursor), undoStack);
var leftCommand = new UndoDecorator(new MoveLeft(cursor), undoStack);
var rightCommand = new UndoDecorator(new MoveRight(cursor), undoStack);

var upButton = new CommandButton('Up', upCommand, body);
var downButton = new CommandButton('Down', downCommand, body);
var leftButton = new CommandButton('Left', leftCommand, body);
var rightButton = new CommandButton('Right', rightCommand, body);
var undoButton = new UndoButton('Undo', body, undoStack);