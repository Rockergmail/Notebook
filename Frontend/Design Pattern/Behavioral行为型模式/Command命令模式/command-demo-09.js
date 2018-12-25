// 使用命令日志实现不可逆操作的取消

/*
 * 不可逆操作：从A到B画一条线这种操作，从B到A再画一条线是无法逆转前一操作的，这只不过是在第一条线的上方又画一条线而已。
 * 取消这种操作的唯一办法是：把之前执行过的操作（不含最近那个）一次重做一遍。
 */

 /**
  * 注意此处的UndoInvoker直接调用Receivier的undo操作，这样写的方法，比较灵活，但这也导致强耦合的问题。
  */

// Command
class MoveUp {
  constructor(cursor) {
    this.cursor = cursor;
  }
  execute() {
    this.cursor.move(0, -10);
  }
}
// Command
class MoveDown {
  constructor(cursor) {
    this.cursor = cursor;
  }
  execute() {
    this.cursor.move(0, 10);
  }
}
// Command
class MoveLeft {
  constructor(cursor) {
    this.cursor = cursor;
  }
  execute() {
    this.cursor.move(-10, 0);
  }
}
// Command
class MoveRight {
  constructor(cursor) {
    this.cursor = cursor;
  }
  execute() {
    this.cursor.move(10, 0);
  }
}
// Receiver
class Cursor {
  constructor(width, height, parent) {
    this.width = width;
    this.height = height;
    this.commandStack = [];
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    parent.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.ctx.strokeStyle = "#cc0000";
    this.move(0, 0);
  }
  move(x, y) {
    this.commandStack.push(() => {
      this.lineTo(x, y);
    });
    this.executeCommands();
  }
  lineTo(x, y) {
    this.position.x += x;
    this.position.y += y;
    this.ctx.lineTo(this.position.x, this.position.y);
  }
  executeCommands() {
    this.position = {
      x: this.width / 2,
      y: this.height / 2
    };
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.beginPath();
    this.ctx.moveTo(this.position.x, this.position.y);
    for (let i = 0, len = this.commandStack.length; i < len; i++) {
      this.commandStack[i]();
    }
    this.ctx.stroke();
  }
  undo() {
    this.commandStack.pop();
    this.executeCommands();
  }
}

// Invoker
class UndoButton {
  constructor(label, parent, cursor) {
    this.element = document.createElement("button");
    this.element.innerHTML = label;
    parent.appendChild(this.element);
    addEvent(this.element, "click", function() {
      cursor.undo();
    });
  }
}
// Invoker
class CommandButton {
  constructor(label, command, parent) {
    this.element = document.createElement("button");
    this.element.innerHTML = label;
    parent.appendChild(this.element);
    addEvent(this.element, "click", function() {
      command.execute();
    });
  }
}

const body = document.body;
const cursor = new Cursor(400, 400, body);

const upCommand = new MoveUp(cursor);
const downCommand = new MoveDown(cursor);
const leftCommand = new MoveLeft(cursor);
const rightCommand = new MoveRight(cursor);

const upButton = new CommandButton("Up", upCommand, body);
const downButton = new CommandButton("Down", downCommand, body);
const leftButton = new CommandButton("Left", leftCommand, body);
const rightButton = new CommandButton("Right", rightCommand, body);
const undoButton = new UndoButton("Undo", body, cursor);
