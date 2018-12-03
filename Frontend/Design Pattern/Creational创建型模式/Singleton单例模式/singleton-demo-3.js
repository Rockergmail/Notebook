// 懒汉式
// 在使用对象实例的时候才会创建
const Singleton = (() => {
    // 顶一个以变量来存储创建好的类实例
    let uniqueInstance = null;
    // 单例可以有自己的属性
    let singletonData = '';

    class Singleton {
        //...
    };

    return {
        // 定义一个方法来为客户端提供类实例
        getInstance() {
            if (uniqueInstance === null) {
                uniqueInstance = new Singleton();
            }

            return uniqueInstance;
        },
        // 单例可以有自己的操作
        singletonOperation() {
            // 功能处理
        },
        // 让外部通过这些方法来访问属性的值
        getSingletonData() {
            return singletonData;
        }
    };
})();