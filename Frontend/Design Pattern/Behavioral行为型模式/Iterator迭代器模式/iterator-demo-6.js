// fib示例

// 方法一：ES5方法
function fib() {
    return {
      state: 0,
      cur: 0,
      prev1: -1,
      prev2: -1,
      hasNext: function() {
        return true;
      },
      //fib数列，第一个是0，第二个是1，后面就是统一的迭代公式了
      next: function() {
        if (this.state == 0) {
          this.cur = 0;
          this.state = 1;
        } else if (this.state == 1) {
          this.cur = 1;
          this.prev2 = 0;
          this.state = 2;
        } else {
          this.prev1 = this.prev2;
          this.prev2 = this.cur;
          this.cur = this.prev1 + this.prev2;
        }
        return this.cur;
      }
      //ignore reset funciton
    };
  }
  //这是无限序列，所以改造了一下，只生成8个数
  var fibIter = fib();
  for (var i = 0; i < 8; i++) {
    console.log(fibIter.next());
    if (fibIter.hasNext()) continue;
  }
  
  // 方法二：ES6方法
  function* fib2() {
    yield 0; // 状态0，第一次调用next，返回0，并改变状态
    yield 1; // 状态1，第二次调用next，返回1，并改变状态
  
    var p1 = 0;
    var p2 = 1;
    var cur = p1 + p2;
  
    while (true) {
      yield cur; // 状态2，后面调用next，返回相应的几个，状态不再改变
  
      p1 = p2;
      p2 = cur;
      cur = p1 + p2;
    }
  }
  
  var fibIter2 = fib2();
  for (var i = 0; i < 8; i++) {
    console.log(fibIter2.next().value);
  }
  /* 0  1  1  2  3  5  8  13 */
  