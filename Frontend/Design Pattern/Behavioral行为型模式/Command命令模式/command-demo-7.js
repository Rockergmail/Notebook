// 实例： 菜单项（组合模式 + 命令模式）

// Composite
class MenuBar {
  constructor() {
    this.menus = {};
    this.element = document.createElement("ul");
    this.element.style.display = "none";
  }
  add(menuObject) {
    this.menus[menuObject.name] = menuObject;
    this.element.appendChild(this.menus[menuObject.name].getElement());
  }
  remove(name) {
    delete this.menus[name];
  }
  getChild(name) {
    return this.menus[name];
  }
  getElement() {
    return this.element;
  }
  show() {
    this.element.style.display = "";
    for (let name in this.menus) {
      this.menus[name].show();
    }
  }
}

// Composite
class Menu {
  constructor(name) {
    this.name = name;
    this.items = {};
    this.element = document.createElement("li");
    this.element.style.display = "none";
    this.container = document.createElement("ul");
    this.element.appendChild(this.container);
  }
  add(menuItemObject) {
    this.items[menuItemObject.name] = menuItemObject;
    this.container.appendChild(this.items[menuItemObject.name].getElement());
  }
  remove() {
    delete this.items[name];
  }
  getChild(name) {
    return this.items[name];
  }
  getElement() {
    return this.element;
  }
  show() {
    this.element.style.display = "";
    for (var name in this.items) {
      this.items[name].show();
    }
  }
}

// Leaf
class MenuItem {
  constructor(name, command) {
    this.name = name;
    this.element = document.createElement("li");
    this.element.style.display = "none";
    this.anchor = document.createElement("a");
    this.anchor.href = "#";
    this.element.appendChild(this.anchor);
    this.anchor.innerHTML = this.name;

    // Invoker
    addEvent(this.anchor, "click", function(e) {
      e = e || window.event;
      if (typeof e.preventDefault === "function") {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
      command.execute();
    });

  }
  add() {}
  remove() {}
  getChild() {}
  getElement() {
    return this.element;
  }
  show() {
    this.element.style.display = "";
  }
}

// Command
class MenuCommand {
  constructor(action) {
    this.action = action;
  }
  execute() {
    this.action.action();
  }
}

// Receiver
class Test1 {
  constructor() {
    console.log("test1");
  }
  action() {
    console.log("this is test1 fn1");
  }
}
class Test2 {
  constructor() {
    console.log("test2");
  }
  action() {
    console.log("this is test2 fn1");
  }
}
class Test3 {
  constructor() {
    console.log("test3");
  }
  action() {
    console.log("this is test3 fn1");
  }
}

// Create the receiver
const test1 = new Test1();
const test2 = new Test2();
const test3 = new Test3();

// Composite_MB
const appMenuBar = new MenuBar();
// Composite_M
const fileMenu = new Menu("File");
// Command
const test1Command1 = new MenuCommand(test1);
// Composite_M Add Leaf
fileMenu.add(new MenuItem("test1-1", test1Command1));
// Composite_MB add Composite_M
appMenuBar.add(fileMenu);
// Composite_M
const insertMenu = new Menu("Insert");
// Command
const test2Command2 = new MenuCommand(test2);
// Composite_M Add Leaf
insertMenu.add(new MenuItem("test2-1", test2Command2));
// Composite_MB Add Composite_M
appMenuBar.add(insertMenu);

document.body.appendChild(appMenuBar.getElement());
appMenuBar.show();
