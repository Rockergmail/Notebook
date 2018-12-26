// 实现实例

// 工资表数据的整合
/*
    项目的客户方收购了一家小公司，这家小公司有自己的工资系统，现在需要整合到客户方已有的工资系统中。
    两方的工资系统数据结构可能不同，但用来描述工资的数据模型是差不多的。
     */

class Iterator {
  constructor(aggregate) {
    this.aggregate = aggregate;
    this.index = -1;
  }
  first() {
    this.index = 0;
  }
  next() {
    if (this.index < this.aggregate.size()) {
      this.index++;
    }
  }
  isDone() {
    return this.index === this.aggregate.size();
  }
  currentItem() {
    return this.aggregate.get(this.index);
  }
}

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

// 客户方已有的工资管理对象
class PayManager {
  constructor() {
    this.list = [];
  }
  createIterator() {
    return new Iterator(this);
  }
  get(index) {
    var ret = null;
    if (index < this.list.length) {
      ret = this.list[index];
    }

    return ret;
  }
  size() {
    return this.list.length;
  }

  // 计算工资，其实应该有很多参数，为了演示从简
  calcPay() {
    const pm1 = new PayModel();
    pm1.setPay(3800);
    pm1.setUserName("张三");

    const pm2 = new PayModel();
    pm2.setPay(5800);
    pm2.setUserName("李四");

    this.list.push(pm1);
    this.list.push(pm2);
  }
}

// 被客户方收购的那个公司的工资管理类
class SalaryManager {
  constructor() {
    this.pms = [];
  }
  // 获取工资列表
  getPays() {
    return this.pms;
  }
  // 计算工资
  calcSalary() {
    const pm1 = new PayModel();
    pm1.setPay(2200);
    pm1.setUserName("王五");

    const pm2 = new PayModel();
    pm2.setPay(3600);
    pm2.setUserName("赵六");

    this.pms.push(pm1);
    this.pms.push(pm2);
  }
}

function run() {
  const payManager = new PayManager();
  payManager.calcPay();
  let it = payManager.createIterator();
  console.log("集团工资列表：");
  let pm;
  it.first();
  while (!it.isDone()) {
    pm = it.currentItem();
    console.log("ths obj === " + pm);
    it.next();
  }

  const salaryManager = new SalaryManager();
  salaryManager.calcSalary();
  let pms = salaryManager.getPays();
  console.log("新收购的公司工资列表：");
  for (let i = 0; i < pms.length; i++) {
    console.log(pms[i]);
  }
}

run();
