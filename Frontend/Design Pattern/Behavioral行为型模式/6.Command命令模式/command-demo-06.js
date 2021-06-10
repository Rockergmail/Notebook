// 命令对象的类型

/*
 简单命令对象：
 与receiver和invoker松散地偶合在一起；
 一般用来消除receiver和invoker之间的耦合
 */
class SimpleCommand {
  constructor(receiver) {
    this.receiver = receiver;
  }
  execute() {
    this.receiver.action();
  }
}

/*
 复杂指令的命令对象：
 没有接受者，因为它自己提供了操作的具体实现；
 用来封装不可分的或事务性的指令
 */
class ComplexCommand {
  constructor() {
    this.logger = new Logger();
    this.xhrHandler = XhrManager.createXhrHandler();
    this.parameters = {};
  }
  setParameter(key, value) {
    this.parameters[key] = value;
  }
  execute() {
    this.logger.log("Executing command");
    let postArray = [];
    for (let key in this.parameters) {
      if (this.parameters.hasOwnProperty(key)) {
        postArray.push(key + "=" + this.parameters[key]);
      }
    }
    let postString = postArray.join("&");
    this.xhrHandler.request("POST", "script.php", function() {}, postString);
  }
}

/*
 灰色地带命令对象：不但封装了接收者的操作，而且其execute方法中也具有一些实现代码：
 */
class GreyAreaCommand {
  constructor(receiver) {
    this.logger = new Logger();
    this.receiver = receiver;
  }
  execute() {
    this.logger.log("Executing command");
    this.receiver.prepareAction();
    this.receiver.action();
  }
}
