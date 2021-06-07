// 饿汉式
// 在装载类的时候就创建对象实例。
const Singleton = (() => {
    var uniqueInstance = new Singleton();
    var singletonData = '';

    class Singleton { }

    return {
        getInstance() {
            return uniqueInstance;
        },
        singletonOperationL() { },
        // 让外部通过这些方法来访问属性的值
        getSingletonData() {
            return singletonData;
        }
    };
})();