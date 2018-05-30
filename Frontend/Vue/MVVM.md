MVC、MVP、MVVM，它们的作用是把代码分层，职能划分，方便维护。

它们的本质区别就是MV之间的通讯方法不同。

MVC和MVP最大的区别是：
1. MVC中，MV可以直接通讯
2. MVP中，MV只可以通过P通讯

MVP和MVVM的最大区别是：MVVM中，V和VM是双向绑定的

双向绑定 data binding：


数据劫持、发布订阅模式

0. 迭代处理object，是的数据劫持
1. this.x  this._data.x
2. computed 缓存？


---

### Reference
[MVC，MVP 和 MVVM 的图示](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)

[浅谈开发中的MVVM模式及与MVP和MVC的区别](https://www.jianshu.com/p/ffcb84dc4ebc)

[你对MVC、MVP、MVVM 三种组合模式分别有什么样的理解？](https://www.zhihu.com/question/20148405)