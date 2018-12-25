// 宏命令 （Composite模式 + Command模式）

// 做热菜的厨师
// Receiver
class HotCook {
  cook(name) {
    console.log("本厨师正在做：" + name);
  }
}
// 做凉菜的厨师
// Receiver
class CoolCook {
  cook(name) {
    console.log("凉菜" + name + "已经做好，本厨师正在装盘。");
  }
}
// 定义了三道菜，每道菜是一个命令对象
// Command
class DuckCommand {
  constructor() {
    this.cookApi = null;
  }
  setCookApi(cookApi) {
    this.cookApi = cookApi;
  }
  execute() {
    this.cookApi.cook("北京烤鸭");
  }
}
// Command
class ChopCommand {
  constructor() {
    this.cookApi = null;
  }
  setCookApi(cookApi) {
    this.cookApi = cookApi;
  }
  execute() {
    this.cookApi.cook("绿豆排骨煲");
  }
}
// Command
class PorkCommand {
  constructor() {
    this.cookApi = null;
  }
  setCookApi(cookApi) {
    this.cookApi = cookApi;
  }
  execute() {
    this.cookApi.cook("蒜泥白肉");
  }
}
// 菜单对象，宏命令对象
// Command
// Composite
class MenuCommand {
  constructor() {
    this.col = [];
  }
  addCommand(cmd) {
    this.col.push(cmd);
  }
  execute() {
    for (let i = 0, len = this.col.length; i < len; i++) {
      this.col[i].execute();
    }
  }
}
// 服务员，负责组合菜单，负责组装每个菜和具体的实现者。
// Invoker
class Waiter {
  constructor() {
    this.menuCommand = new MenuCommand();
  }
  // 客户点菜
  orderDish(cmd) {
    const hotCook = new HotCook();
    const coolCook = new CoolCook();
    if (cmd instanceof DuckCommand) {
      cmd.setCookApi(hotCook);
    } else if (cmd instanceof ChopCommand) {
      cmd.setCookApi(hotCook);
    } else if (cmd instanceof PorkCommand) {
      cmd.setCookApi(coolCook);
    }
    this.menuCommand.addCommand(cmd);
  }
  // 点菜完毕
  orderOver() {
    this.menuCommand.execute();
  }
}

var waiter = new Waiter();
var chop = new ChopCommand();
var duck = new DuckCommand();
var pork = new PorkCommand();

waiter.orderDish(chop);
waiter.orderDish(duck);
waiter.orderDish(pork);

waiter.orderOver();
