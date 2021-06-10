/*
 示例：汽车登记
 假设要开发一个系统，用以代表一个城市的所有汽车。你需要保存每一辆汽车的详细情况（品牌，型号和出厂日期）及其所有权的详细情况（车主姓名，车牌号和最近登记日期）。当然，你决定把每辆汽车表示为一个对象：
 */
// Car class, un-optimized.
/**
 * Car类
 * @param make 品牌
 * @param model 型号
 * @param year 出厂日期
 * @param owner 车主姓名
 * @param tag 车牌号
 * @param renewDate 最近登记日期
 * @constructor Car
 */
class Car {
  constructor(make, model, year, owner, tag, renewDate) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.owner = owner;
    this.tag = tag;
    this.renewDate = renewDate;
  }
  getMake() {
    return this.make;
  }
  getModel() {
    return this.model;
  }
  getYear() {
    return this.year;
  }

  transferOwnership(newOwner, newTag, newRenewDate) {
    this.owner = newOwner;
    this.tag = newTag;
    this.renewDate = newRenewDate;
  }
  renewRegistration(newRenewDate) {
    this.renewDate = newRenewDate;
  }
  isRegistrationCurrent() {
    var today = new Date();
    return today.getTime() < Date.parse(this.renewDate);
  }
}
/*
 这个系统最初表现不错。但是随着城市人口的增长，你发现它一天天地变慢。数以十万计的汽车对象耗尽了可用的计算资源。要想优化这个系统，可以采用享元模式减少所需对象的数目。
 优化工作的第一步是把内在状态与外在状态分开。
 */

/*
 内在状态和外在状态
 将对象数据划分为内在和外在部分的过程有一定的随意性。既要维持每个对象的模块性，又想把尽可能多的数据作为外在数据处理。划分依据的选择多少有些主观性。在本例中，车的自然数据（品牌，型号和出厂日期）属于内在数据，而所有权数据（车主姓名，车牌号和最近登记日期）则属于外在数据。这意味着对于品牌，型号和出厂日期的每一种组合，只需要一个汽车对象就行，这个数目还是不少，不过与之前相比已经少了几个数量级。每个品牌-型号=出厂日期组合对应的那个实例将被所有该类型汽车的车主共享。下面是新版Car类的代码：
 */
// Car class, optimized as a flyweight
// ConcreteFlyweight
class Car {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
  getMake() {
    return this.make;
  }
  getModel() {
    return this.model;
  }
  getYear() {
    return this.year;
  }
}
/*
 上面的代码删除了所有外在数据。所有处理登记事宜的方法都被转移到一个管理其对象中（不过，也可以将这些方法留在原地，并为其增加对应于各种外在数据的参数）。因为现在对象的数据已被分为两大部分，所以必须用工厂来实例化它。
 */

/*
 用工厂进行实例化
 这个工厂很简单。它会检查之前是否已经创建过对应于指定品牌-型号-出厂日期组合的汽车，如果存在这样的汽车那就返回它，否则创建一辆新车，并把它包村起来供以后使用。这就确保了对应于每个唯一的内在状态，只会创建一个实例：
 */
// CarFactory singleton
// Flyweight Factory
class CarFactory {
  constructor() {
    this.createdCars = {};
  }
  createCar(make, model, year) {
    // Check to see if this particular combination has
    // been created before.
    if (this.createdCars[make + "-" + model + "-" + year]) {
      return this.createdCars[make + "-" + model + "-" + year];
    } else {
      // Otherwise create a new instance and save it.
      const car = new Car(make, model, year);
      this.createdCars[make + "-" + model + "-" + year] = car;
      return car;
    }
  }
}

/*
 封装在管理器中的外在状态
 要完成这种优化还需要一个对象。所有那些从Car对象中删除的数据必须有个保存地点，我们用一个单体来做封装这些数据的管理器。原先的每一个Car对象现在都被分割为外在数据及其所属的共享汽车对象的引用这样两部分。Car对象与车主数据的组合称为汽车记录（car record）。管理器存储着这两方面的信息。它还包含着从原先的Car类删除的方法：
 */
// CarRecordManager singleton
// UnsharedConcreteFlyweight
class CarRecordManager {
  constructor() {
    this.carRecordDatabase = {};
  }

  // Add a new car record into the city's system
  addCarRecord(make, model, year, owner, tag, renewDate) {
    var car = new CarFactory().createCar(make, model, year);
    this.carRecordDatabase[tag] = {
      owner: owner,
      renewDate: renewDate,
      car: car
    };
  }
  // Methods previously contained in the Car class.
  transferOwnership(tag, newOwner, newTag, newRenewDate) {
    var record = this.carRecordDatabase[tag];
    record.owner = newOwner;
    record.tag = newTag;
    record.renewDate = newRenewDate;
  }
  renewRegistration(tag, newRenewDate) {
    this.carRecordDatabase[tag].renewDate = newRenewDate;
  }
  isRegistrationCurrent(tag) {
    var today = new Date();
    return today.getTime() < Date.parse(this.carRecordDatabase[tag].renewDate);
  }
}
/*
 从Car类剥离的所有数据现在都保存在CarRecordManager这个单体的私用属性carRecordDatabase中。这个carRecordDatabase对象要比以前使用的一大批对象高效得多。那些处理所有权事宜的方法现在也被封装在这个单体中，因为他们处理的都是外在数据。
 可以看出，这种优化是以复杂为代价的。原先有的只是一个类，而现在却变成了一个类和两个单体对象。把一个对象的数据保存在两个不同的地方这种做法有点令人困惑，但与所解决的性能问题相比，这两点都只是小问题。如果运用得当，那么享元模式能够显著的提升程序的性能。
 */

/*
 管理外在状态
 管理享元对象的外在数据有许多不同方法。使用管理器对象是一种常见做法，这种对象有一个集中管理的数据库（centralized database），用于存放外在状态及其所属的享元对象。汽车登记那个示例就采用了这种方案。其优点在于简单，容易维护。这也是一种比较轻便的方案，因为用来保存外在数据的只是一个数组或对象字面量。
 另一种管理外在状态的办法是使用组合模式。你可以用对象自身的层次体系来保存信息，而不需要另外使用一个集中管理的数据库。组合对象的叶节点全都可以是享元对象，这样一来这些享元对象就可以在组合对象层次体系中多个地方被共享。对于大型的对象层次体系这非常有用，因为同样的数据用这种方案来表示时所需对象的数量要少得多。
 */
