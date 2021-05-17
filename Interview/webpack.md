### 为什么需要webpack
webpack之前，是gulp，gulp之前是grunt，grunt之前，都需要手动处理如改环境变量、代码压缩、文件合并、注入变量/内容等重复工作，工作繁琐且重复。grunt和gulp都是任务式的，而gulp是用了管道技术优化了流程。webpack希望把代码编译、打包文件（方便组件化组织文件）、开发服务器、优化……让代码标准化输出。

### webpack有什么功能，关键功能是什么

概念：modules、chunk、

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

**Webpack构建原理，如何设计的**

**Loaders**
1. 有什么作用
2. 有哪些常用的loaders，有什么作用
3. loaders的加载顺序是怎样的，如何保证加载顺序？
4. 如何编写loaders

**Plugins**
1. 有什么作用
2. 有哪些常用的plugins，有什么作用
3. 如何编写plugins

**优化前端性能**
1. 代码压缩
   1. sourcemap
   2. 
2. 按需加载
3. tree-shaking
4. scope-hoisting

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