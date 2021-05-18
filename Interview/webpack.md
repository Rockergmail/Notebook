<!--
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2021-05-17 11:07:53
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2021-05-18 17:07:16
-->
### 为什么需要webpack
webpack之前，是gulp，gulp之前是grunt，grunt之前，都需要手动处理如改环境变量、代码压缩、文件合并、注入变量/内容等重复工作，工作繁琐且重复。grunt和gulp都是任务式的，而gulp是用了管道技术优化了流程。webpack希望把代码编译、打包文件（方便组件化组织文件）、开发服务器、优化……让代码标准化输出。

### webpack有什么功能，关键功能是什么

概念：modules、chunks、

webpack有提供输入和输出（单页的配置、多页配合htmlPlugin的配置、hash(hash难题)、vendor、manifest）、Loaders、Plugins、环境选择、开发服务器、输出优化（代码压缩、提取css并异步加载、code spliting、tree-shaking、scope-hoisting、externals）、优化构建速度（多页提取common代码、对不变的代码/包打包成dll免得每次重新构建）、sourcemap

### webpack的原理是什么，关键实现是如何实现的

构件流程：
compiler实例、loader的原理是ast转换、plugins的原理是tapable框架，通过监听webpack的生命周期，在对应的时刻执行对应的plugins

### webpack与其他构件软件对比，有什么不同
webpack: 分析依赖，合并
gulp    ：任务式，流式操作，只能人为合并代码
grunt
rollup
vite

### webpack的优点和缺点，trade-off


---
### 相关面试题

**Webpack构建流程**
1. 合并配置
2. 从入口开始分析依赖，通过loaders加载对应的资源转译成js，作为modules
3. 把modules拼接成chunk，通过plugins做一系列的处理
4. 根据输出配置得到一个bundle

**Webpack构建原理，如何设计的**
1. compiler编译
2. plugins是基于tapable框架的？

**Loaders**
1. 有什么作用
   1. 将非js的资源转译成js
2. 有些常用的loaders，有什么作用
   1. vue-loader，识别vue文件
   2. file-loader，识别图片文件
   3. url-loader，图片资源文件如果小于一定的大小，会自动转移成base64
   4. sass-loader，识别sass文件，转译成css
   5. style-loader，
   6. css-loader，创建标签加载css文件，css模块化支持
3. loaders的加载顺序是怎样的，如何保证加载顺序？
   1. 从下到上
   2. ensure方法?
4. 如何编写loaders
   1. ast相关

**Plugins**
1. 有什么作用
   1. 对chunk做处理，压缩、优化、等
   2. plugin可以在webpack构建过程中生命周期的钩子执行
2. 有哪些常用的plugins，有什么作用
   1. tracer-webpack-plugins，代码压缩
   2. html-webpack-plugins，html代码嵌入
   3. 
3. 如何编写plugins
   1. tapable框架

**优化前端性能**
1. 代码压缩
   1. tracer-webpack-plugins
   2. css-loader，开启nano选项，进行压缩
   3. sourcemap开启，方便调试
2. 按需加载
3. 图片压缩，图片
4. 资源上cdn
5. hash缓存
6. tree-shaking
   1. 如何开启？
   2. 是什么，有什么作用？对没有用到的代码删除
   3. 原理：
      1. 基于esmodule的静态分析，分析哪些变量和方法没有用到
      2. ES6的模块引入是静态分析的，故而可以在编译时正确判断到底加载了什么代码。
      3. 分析程序流，判断哪些变量未被使用、引用，进而删除此代码。
   4. 副作用：prototype有问题
7. scope-hoisting
   1. 如何开启？
   2. 原理：变量提升，代码复用
   3. 副作用？

**优化构建速度**

**开发服务器**
1. 如何监听文件的变化
2. 如何实现热更新
3. 

**输入**
1. 如何配置单页应用、多页应用

**输出**
1. hash有什么作用，怎么分类


### Reference
1. https://juejin.cn/post/6844904094281236487
2. https://zhuanlan.zhihu.com/p/44438844