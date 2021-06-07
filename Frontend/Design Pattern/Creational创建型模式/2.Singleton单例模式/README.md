缓存模块、保证全局只有一个实例: alert modal toast




1. 一个类只有一个实例
2. 按照创建实例的时期，分为：
   1. 懒汉式（lazy-loading），调用getInstance方法才创建实例
   2. 饿汉式：加载类的时候就创建实例，对客户端来说是透明的，在未用到的时候回占用内存
3. 懒汉式的演化：
   1. 把getInstance写在类里面
   2. 把getInstance和类分开来
   3. 把getInstance封装成通用的类，其实就是继承了传入的类

应用：
1. alert
2. modal
3. toast
4. jQuery
5. redux的store
6. 缓存