// 翻页迭代

// 工资描述模型对象
class PayModel {
  constructor() {
    // 支付工资的人员
    this.userName;
    // 支付的工资数额
    this.pay;
  }
  getUserName() {
    return this.userName;
  }
  setUserName(userName) {
    this.userName = userName;
  }
  getPay() {
    return this.pay;
  }
  setPay(pay) {
    this.pay = pay;
  }
  toString() {
    return "userName = " + this.userName + ", pay = " + this.pay;
  }
}

class SalaryManager {
  constructor() {
    this.pms = [];
  }
  getPays() {
    return this.pms;
  }
  calcSalary() {
    var pm1 = new PayModel();
    pm1.setPay(2200);
    pm1.setUserName("王五");

    var pm2 = new PayModel();
    pm2.setPay(3600);
    pm2.setUserName("赵六");

    var pm3 = new PayModel();
    pm3.setPay(2200);
    pm3.setUserName("王五二号");

    var pm4 = new PayModel();
    pm4.setPay(3600);
    pm4.setUserName("赵六二号");

    var pm5 = new PayModel();
    pm5.setPay(2200);
    pm5.setUserName("王五三号");

    this.pms.push(pm1);
    this.pms.push(pm2);
    this.pms.push(pm3);
    this.pms.push(pm4);
    this.pms.push(pm5);
  }
  // Factory Method
  createIterator(type) {
    if (type === "random") {
      return new RandomIterator(this);
    }
    return new Iterator(this);
  }
}

// 双向迭代器
class Iterator {
  constructor(aggregate) {
    this.pms = aggregate.getPays();
    this.index = 0;
  }
  hasNext() {
    return this.index <= this.pms.length - 1;
  }
  hasPrevious() {
    return this.index > 0;
  }
  // 返回当前索引到num的集合
  next(num) {
    var col = [];
    var count = 0;
    while (this.hasNext() && count++ < num) {
      col.push(this.pms[this.index++]);
    }

    return col;
  }
  // 把索引退回去num个，然后再取值。
  // 事实上有可能有多退回去的数据
  previous(num) {
    var col = [];
    var count = 0;
    this.index = num;
    while (this.hasPrevious() && count++ < num) {
      col.push(this.pms[this.index++]);
    }
    return col;
  }
}

// 随机翻页迭代器示例
class RandomIterator {
  constructor(aggregate) {
    this.pms = aggregate.getPays();
    this.index = 0;
  }
  hasNext() {
    return this.index <= this.pms.length - 1;
  }
  hasPrevious() {
    return this.index > 0;
  }
  getPage(pageNum, pageShow) {
    var col = [];
    // 需要在这里先计算需要获取的数据的开始条数和结束条数
    var start = (pageNum - 1) * pageShow;
    var end = start + pageShow - 1;

    if (start < 0) start = 0;

    if (end > this.pms.length - 1) end = this.pms.length - 1;

    this.index = 0;
    while (this.hasNext() && this.index <= end) {
      if (this.index >= start) col.push(this.pms[this.index]);
      this.index++;
    }

    return col;
  }
}

function run_itertor() {
  var salaryManager = new SalaryManager();
  salaryManager.calcSalary();
  var it = salaryManager.createIterator();

  // 获取第一页，每页显示两条
  var col = it.next(2);
  console.log("第一页数据：");
  print(col);

  var col2 = it.next(2);
  console.log("第二页数据：");
  print(col2);

  var col3 = it.previous(2);
  console.log("第三页数据：");
  print(col3);

  function print(col) {
    for (var i = 0; i < col.length; i++) {
      console.log(col[i]);
    }
  }
}

function run_random_iterator() {
  var salaryManager = new SalaryManager();
  salaryManager.calcSalary();
  var it = salaryManager.createIterator("random");

  // 获取第一页，每页显示两条
  var col = it.getPage(1, 2);
  console.log("第一页数据：");
  print(col);

  var col2 = it.getPage(2, 2);
  console.log("第二页数据：");
  print(col2);

  var col3 = it.getPage(1, 2);
  console.log("再次获取第一页数据：");
  print(col3);

  var col4 = it.getPage(3, 2);
  console.log("第三页数据：");
  print(col4);

  function print(col) {
    for (var i = 0; i < col.length; i++) {
      console.log(col[i]);
    }
  }
}

run_itertor();
run_random_iterator();
