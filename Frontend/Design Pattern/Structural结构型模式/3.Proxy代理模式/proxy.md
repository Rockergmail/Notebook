### 定义
通过它去访问本体的方法，符合单一职责规则

### 特性
在使用者角度，代理对象和本体是一致的，接口是一致的

### 用途
在访问真正对象之前，做一些预处理

### 实例
1. 图片预加载
1. 合并http请求
1. 缓存

###  常用的代理模式
虚拟代理
保护代理：认证
---

代理模式 VS 适配器模式 适配器提供不同接口，代理模式提供一模一样的接口
代理模式 VS 装饰器模式 装饰器模式原来的功能不变还可以使用，代理模式改变原来的功能


TODO: 所以koa那个应该是代理吧？

### Reference
《JavaScript设计模式与开发实践》