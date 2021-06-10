// 队列请求

function createCommand(name) {
  return class Command {
    constructor(tableNum) {
      this.cookApi = null;
      this.tableNum = tableNum;
    }
    setCookApi(cookApi) {
      this.cookApi = cookApi;
    }
    execute() {
      this.cookApi.cook(this.tableNum, name);
    }
  };
}
// Command
const ChopCommand = createCommand("绿豆排骨煲");
const DuckCommand = createCommand("北京烤鸭");

let CommandQueue = {
  cmds: [],
  addMenu(menu) {
    let cmds = menu.getCommands();
    for (let i = 0, len = cmds.length; i < len; i++) {
      this.cmds.push(cmds[i]);
    }
  },
  getOneCommand() {
    return this.cmds.length ? this.cmds.shift() : null;
  }
};
// Composite
// Command
class MenuCommand {
  constructor() {
    this.col = [];
  }
  addCommand(cmd) {
    this.col.push(cmd);
  }
  setCookApi(cookApi) {}
  getTableNum() {
    return 0;
  }
  getCommands() {
    return this.col;
  }
  execute() {
    CommandQueue.addMenu(this);
  }
}
// Receiver
class HotCook {
  constructor(name) {
    this.name = name;
  }
  cook(tableNum, name) {
    let cookTime = parseInt(10 * Math.random() + 3);
    console.log(this.name + "厨师正在为" + tableNum + "号桌做：" + name);

    setTimeout(() => {
      console.log(
        this.name +
          "厨师为" +
          tableNum +
          "号桌做好了：" +
          name +
          "，共计耗时=" +
          cookTime +
          "秒"
      );
    }, cookTime * 1000);
  }
  run() {
    setTimeout(() => {
      let cmd;
      while ((cmd = CommandQueue.getOneCommand())) {
        cmd.setCookApi(this);
        cmd.execute();
      }
    }, 1000);
  }
}
// Invoker
class Waiter {
  constructor() {
    this.menuCommand = new MenuCommand();
  }
  orderDish(cmd) {
    this.menuCommand.addCommand(cmd);
  }
  orderOver() {
    this.menuCommand.execute();
  }
}

const c1 = new HotCook("张三");
c1.run();

for (let i = 0; i < 5; i++) {
  const waiter = new Waiter();
  const chop = new ChopCommand(i);
  const duck = new DuckCommand(i);
  waiter.orderDish(chop);
  waiter.orderDish(duck);
  waiter.orderOver();
}
