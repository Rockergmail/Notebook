<!--
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-08-18 14:26:17
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-08-18 14:50:40
-->
<!-- https://juejin.im/post/6859569958742196237#heading-10 -->



打包出来的main.js，源码分析：
- Object(function (){..})()，意思是执行里面的函数
- import moduleName from 'xxModule'经过webpack编译打包，出来的是一个对象，key为模块的路径，value为模块的代码，作为webpack打包出来的main.js的webpackBootstrap函数的入参
- 默认会指定入口模块，调用__webpack_require__方法，执行
- 遇到其他模块，使用__webpack_require__来引用对应模块
- 遇到import('xxModule')，webpack会把它作为一个chunk，抽出来打包，然后用jsonp动态加载其中的模块
- 其中__webpack_require__.e就是定义了如何加载jsonp，先检查installedChunks里是否有对应的chunk，有的话读缓存，没有的话，新建一个script标签，加载chunk的代码。chunk的代码的第一句（见0.main.js），注册chunk，push方法其实调用的是webpackJsonpCallback方法，它就是把chunk里面的module注册到modules里

import moduleName from 'xxModule'和import('xxModule')经过webpack编译打包后最终变成了什么？在浏览器中是怎么运行的？
- import moduleName from 'xxModule'，编译到main.js函数的入参object，key为路径，value微模块的代码
- import('xxModule')，编译成一个chunk，独立生成一个文件
- 在浏览器运行的时候，会先看看入口的module（./src/index.js）是否在缓存，有的话直接使用，没有的话通过__webpack_require__来引用它。引用其他模块，也是通过__webpack_require__来引用
- 如果引用到了chunk，会先查这个chunk是否在缓存内，没有的话新建一个script加载这个chunk，chunk执行的时候，会注册到缓存，然后把里面的模块注册到modules，然后引用