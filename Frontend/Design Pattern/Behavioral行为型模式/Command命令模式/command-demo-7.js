// 实例： 菜单项
// 菜单组合对象
/*
 接下来要实现的事Menubar，Menu和MenuItem类，作为一个整体，他们要能显示所有可用操作，并且根据要求调用这些操作，Menubar和Menu都是组合对象类，而MenuItem则是叶类。Menubar类保存着所有Menu实例：
 */
// MenuBar class, a composite
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

// Menu class, a composite
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

// 调用者类
// MenuItem class, a leaf
class MenuItem {
  constructor(name, command) {
    this.name = name;
    this.element = document.createElement("li");
    this.element.style.display = "none";
    this.anchor = document.createElement("a");
    this.anchor.href = "#";
    this.element.appendChild(this.anchor);
    this.anchor.innerHTML = this.name;
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
  //   addEvent(this.anchor, "click", function(e) {
  //     e = e || window.event;
  //     if (typeof e.preventDefault === "function") {
  //       e.preventDefault();
  //     } else {
  //       e.returnValue = false;
  //     }
  //     command.execute();
  //   });
}

// 命令类
// MenuCommand class, a command object
class MenuCommand {
  constructor(action) {
    this.action = action;
  }
  execute() {
    this.action.action();
  }
}

// Receiver objects, instantiated from existing classes
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
}

// Create the receiver
const test1 = new Test1();
const test2 = new Test2();
const test3 = new Test3();

// Create the menu bar
const appMenuBar = new MenuBar();

// The File menu
const fileMenu = new Menu("File");

const test1Command1 = new MenuCommand(test1);

fileMenu.add(new MenuItem("test1-1", test1Command1));

appMenuBar.add(fileMenu);

var insertMenu = new Menu("Insert");
var test2Command2 = new MenuCommand(test2);
insertMenu.add(new MenuItem("test2-1", test2Command2));

appMenuBar.add(insertMenu);

document.body.appendChild(appMenuBar.getElement());
appMenuBar.show();
