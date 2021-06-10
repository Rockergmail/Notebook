/**
 * 迭代器实现对象，示意的是聚合对象为数组的迭代器
 * 不同聚合对象相应的迭代器实现是不一样的
 * @param {Array} aggregate [聚合对象]
 */
class Iterator {
  constructor(aggregate) {
    // 可以在此处对聚合对象的数据进行过滤
    this.aggregate = aggregate;
    // 当前索引位置
    this.index = -1;
  }
  first() {
    this.index = 0;
  }
  next() {
    // 在这里对要返回的数据进行过滤，比如没有权限，则返回“无权限”
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

class Aggregate {
  constructor(ss) {
    this.ss = ss;
  }
  createIterator() {
    return new Iterator(this);
  }
  get(index) {
    var retObj = null;
    if (index < this.ss.length) {
      retObj = this.ss[index];
    }

    return retObj;
  }
  size() {
    return this.ss.length;
  }
}

function run() {
  var names = ["张三", "李四", "王五"];
  var aggregate = new Aggregate(names);
  var it = aggregate.createIterator();
  var obj;

  it.first();
  while (!it.isDone()) {
    obj = it.currentItem();
    console.log("the obj === " + obj);
    it.next();
  }
}

run();
