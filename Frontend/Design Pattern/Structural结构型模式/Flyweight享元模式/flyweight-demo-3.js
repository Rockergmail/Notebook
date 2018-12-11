/**
 * 享元对象。封装Flyweight的内部状态，提供功能方法。
 * @param state 享元对象的内部状态的数据
 */
class ConcreteFlyweight {
  constructor(state) {
    this.intrinsicState = state;
  }
  operation(extrinsicState) {
    // 具体的功能处理，可能会用到享元内部，外部的状态
  }
}

/**
 * 不需要共享的flyweight对象
 * 通常是将被共享的享元对象作为子结点组合出来的对象
 */
class UnsharedConcreteFlyweight {
  // 描述对象的状态
  constructor() {
    this.allState;
  }
  operation(extrinsicState) {
    // 具体的功能处理
  }
}

// 享元工厂
// 客户端不能直接创建共享享元对象实例，必须通过享元工厂来创建。
const FlyweightFactory = (function() {
  // 缓存多个Flyweight对象
  var fsMap = {};

  return class FlyweightFactory {
    getFlyweight(key) {
      var f = fsMap[key];

      if (f == null) {
        f = new ConcreteFlyweight(key);
        fsMap[key] = f;
      }

      return f;
    }
  };
})();
