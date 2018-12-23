/*
 用闭包创建命令对象
 
    优点（好处）：不需要创建一个具有execute方法的对象，而是把想要执行的方法包装在闭包中；方便
    适合：命令对象有且只有一个方法
    缺点（代价）：可扩展性差
    不适合：命令对象有多个方法的场合
 */

// Command using closures
function makeSart(adObject) {
    return function () {
        adObject.start();
    };
}
function makeStop(adObject) {
    return function () {
        adObject.stop();
    };
}

// Implementation code
var startCommand = makeStart(ads[0]);
var stopCommand = makeStop(ads[0]);

startCommand();
stopCommand();