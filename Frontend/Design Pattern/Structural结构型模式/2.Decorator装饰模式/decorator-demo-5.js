// 在软件业，AOP为Aspect Oriented Programming的缩写，意为：面向切面编程
// 可以通过预编译方式和运行期动态代理实现在不修改源代码的情况下给程序动态统一添加功能的一种技术

Function.prototype.before = function(beforeFn){
    let _this = this;
    return function(){
        beforeFn.apply(this,arguments);
        return _this.apply(this,arguments);
    }
}
Function.prototype.after = function(afterFn){
    let _this = this;
    // 注意：结果不会执行两次_this.apply，因为是return且重新赋值了
    return function(){
         _this.apply(this,arguments);
        afterFn.apply(this,arguments);
    }
}
function buy(money,goods){
  console.log(`花${money}买${goods}`);
}
buy = buy.before(function(){
    console.log(`向媳妇申请1块钱.`);
});
buy = buy.after(function(){
    console.log(`把剩下的2毛钱还给媳妇.`);
});
buy(.8,'盐');