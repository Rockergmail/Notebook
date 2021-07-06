1. 为什么选择
<!--
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2021-05-17 11:07:53
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2021-05-18 10:26:38
-->
### 为什么需要vue
mvvm

数据驱动视图 UI=render(data) 

### vue有什么功能，关键功能是什么
mvvm
vdom
data/computed/watch/method
生命周期
组件化
组件间通讯

### vue的原理是什么，关键实现是如何实现的
mvvm
vdom-diff算法

### vue与react对比，有什么不同


### vue的优点和缺点，trade-off


---
### 相关面试题

**vue如何实现mvvm**

**vue构建原理，如何设计的**

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


源码

1. 响应式
2. 响应式和更新
3. 虚拟dom与diff算法
4. watch/computed
5. 生命周期
6. 组件与webcomponent


vue采用了mvvm的思想，专注于view层，但不是mvvm框架。采纳了mvvm的思想：更新view，映射到model的变化；model的变化映射到view上，不需要用户再写逻辑去关联。专注于view层，加了虚拟dom、diff、组件

# 1.谈谈你对MVVM的理解？
mvvm是一个模式，把代码区分为数据、视图、viewModel。视图和数据的通讯由vm自动完成。当数据更新的时候，自动更新视图；当视图更新的时候会自动更新数据；实现双向绑定。但Vue本身不是一个mvvm框架，它只关注view层，为此实现了组件化、虚拟dom+diff算法等功能，也有实现数据劫持功能，以实现双向绑定。

# 2.请说一下Vue2及Vue3响应式数据的理解
响应式数据，就是监听数据改变。

通过Object.defineProperty来对数据进行拦截，在get的时候进行收集依赖，在set的时候通知更新。

当初始化的时候，会调用$mount方法，其中会新建一个new Watcher，执行构造函数，会调用get方法，收集依赖，把数据和更新函数绑定在一起。当数据改动触发更新，就会调用对应的更新函数，从而更新视图。

用Object.defineProperty有缺点：
1. 对象新增属性，是不会劫持的，需要手动调用$set方法
2. 数组无法检测数据是否变动，所以需要针对push、pop、shift、unshift、reverse、splice、sort进行劫持，其实就是新建一个对象，把对象的__proto__指向原生的Array.prototype，如果有新的值需要reactive，然后通知更新
3. 数组里面每个元素都需要reactive
Vue3的用Proxy来代替使用.Proxy可以从底层支持对数组、对象修改的监控

# 3.Vue中如何检测数组变化?
对push、pop、unshift、shift、splice、concat进行重写。调用原来的方法之后，对指定的元素进行判断，如果是对象的话进行劫持，如果是数组的话就递归处理。

# 4.Vue中如何进行依赖收集？
初始化的时候，template编译成render的时候对模板中的变量进行收集依赖，放到在object.definedproperty的getter中

# 5.如何理解Vue中模板编译原理
template --> 先解析html(正则+游标)，生成对应ast树，再解析文本，其中文本是否包括变量和过滤器，生成对应的AST -> render函数 --> VNode --> patch --> 更新DOM

# 6.Vue生命周期钩子是如何实现的
本质上就是回调函数。vue在软件不同的

# 7.Vue的生命周期方法有哪些？一般在哪一步发送请求及原因
new Vue()
初始化事件、生命周期
beforeCreated()
数据劫持
created()
模板编译成render函数
beforeMounted()
视图挂载到el上
mounted()

数据改动
beforeUpdate()
vdom diff & patch & render
updated()

beforeDestory()
卸载组件、事件监听
destory()

created发起请求，把数据赋值在data上

# 8.Vue.mixin的使用场景和原理
公用逻辑代码，原理就是合并对象，这里涉及到覆盖和冲突，优先级

# 9.Vue组件data为什么必须是个函数？
因为组件可能会被多次实例化，如果data直接返回对象，则这几个组件实例都共用同一个对象。不能做到隔离。

# 10.nextTick在哪里使用？原理是?
nextTick是希望回调函数在DOM更新之后执行。

数据变更之后不会马上更新dom，而是放到一个队列里，方便去重，然后异步更新dom

如何保证是dom更新之后才执行？只需要保证先异步执行watcher，再异步执行回调就ok

nextTick的原理是实现异步操作：Promise > MutationObserve > setImmediate > setTimeout

牵涉到js的运行机制：js是单线程，是基于事件循环的：
a. 所有同步任务都在主线程上执行，形成执行栈
b. 当异步任务有结果，会放到任务队列里。任务队列有宏任务（setTimeout、setImmediate、postMessage）、微任务（promise、MutationObserver）
c. 主线程的执行过程叫一个tick，当所有同步任务做完，就调度任务队列并执行

# 11.computed和watch区别
computed和watch都是基于Watcher来实现的
computed属性是具备缓存的，依赖的值不发生变化，对其取值时计算属性方法不会重新执行
watch则是监控值的变化，当值发生变化时调用对应的回调函数

# 12.Vue.set方法是如何实现的
就是Object.definedProperty，可能需要考虑层级的问题

# 13.Vue为什么需要虚拟DOM

WHY-HOW(with WHAT)，降维构建给对方听，from where to where

频繁的dom操作、整颗dom树重新渲染会导致渲染性能降低，渲染效果差。如果我们将js对象模拟dom节点，初始化渲染的时候我们得到一个vNode，在数据更新之后模板编程成新的vNode。我们把这两个vNode做对比，当大量的dom操作会导致渲染出的效果出问题，或者渲染慢。为了解决这个问题，用js的VNode对象模拟节点，数据改变之后，模板生成了新的VNode，旧VNode和新VNode对比，把要修改的进行修改，而不用一次性更新整颗dom树，大大降低性能损耗。

<!-- https://vue-js.com/learn-vue/virtualDOM/#_3-vue%E4%B8%AD%E7%9A%84%E8%99%9A%E6%8B%9Fdom -->
vNode模拟以下节点：元素节点、文本节点、注释节点、组件节点、函数组件节点、克隆节点

```html
元素节点：<div></div>
文本节点：123
静态节点：<div>123</div>（第一次渲染之后，后面的渲染不会改变，所以是静态节点）

```

# 14.Vue中diff算法原理
diff算法核心就是patch函数，对oldVNode和vNode一层一层对比，基于oldVNode做新增、删除、更新操作

1. 如果没有oldVNode，则针对VNode创建元素并挂载
2. 如果是oldVNode和VNode是相同节点（一样的标签，一样的key，一个的数据），则进行更新节点patchVNode
![](../images/patchVnode.png)

更新节点操作，无非是以下几种操作：
1. 如果节点不同，根据情况添加节点、删除节点
2. 更新节点：如果vNode没有文本节点，且oldVNode和vNode都有字节点，则进行更新子节点

更新子节点，在oldChildren和children两两比较，无非有以下几种可能：（基于oldChildren）
1. 删除节点
2. 更新节点（同patchVnode）
3. 添加节点（注意需要添加到未处理的节点之前，否则会影响后续的添加）
4. 移动节点（跟添加节点同理，需要移动到未处理的节点之前）

oldChildren和children两两对比算法优化：
1. 暴力两层for循环，对比节点。时间复杂度0(n^2)。源码虽然用了map来描述oldChildren，但是都逃不过每个oldChilren元素单独for循环children来对比，所以还是会导致时间复杂度0(n^2)
2. 两个children有两个头和尾的指针，从两边向中间靠拢迭代：oldChildren和children都有头尾两个指针oldStartIdx、oldEndIdx、newStartIdx、newEndIdx。先osi和nsi对比，如果节点相同，则进行patchVNode更新，否则对比osi和nei对比，如果节点相同，则进行移动节点并更新节点，否则对比oei和nei对比，如果节点相同，则更新节点，否则对比oei和nsi对比，如果节点相同，则进行移动节点并更新节点，否则用方法1暴力破解（注意这里只有nsi++）。当osi>oei，children剩下的节点就需要新增；当nsi>sei，oldChildren剩下的节点就需要删除

在迭代的过程，我们移动元素，会影响处理。那么diff算法是如果做到移动节点的时候不影响呢？其实删除节点、更新节点、添加接点、移动节点，都是调用dom api的，所以不会导致

最理想的情况下，全部都走优化的算法，则O(n)，最不理想的情况下爱，都走暴力算法，则O(n^2)，所以diff的时间复杂度为O(nlog^n)

diff 算法是一种通过同层的树节点进行比较的高效算法，避免了对树进行逐层搜索遍历，所以时间复杂度只有 O(n)。


# 15.既然Vue通过数据劫持可以精准探测数据变化，为什么还需要虚拟DOM进行diff检测差异
1. 给每个属性都添加watcher会降低性能
2. 粒度太细反而不利于dom的更新，次序问题

# 16.请说明Vue中key的作用和原理，谈谈你对它的理解
1. render patch的时候会判断是否同一个节点，是的话就进行更新节点进而对比
2. 当两个节点都是静态节点，且key都是相同的，可以复用节点

# 17.谈一谈对Vue组件化的理解
组件化可以实现代码高内聚低耦合，提高开发效率，代码可服用
单向数据流：属性、自定义事件、slot

# 18.Vue的组件渲染流程
create-component.js验证组件名是否合法-->拿到继承自Vue的组件构造函数-->变成了component: (xxx) => {}-->安装组件hooks（init、prepatch、insert、destroy）这里主要是合并用户写得钩子-->穿件vNode
根组件更新-->render-->vm._update-->patch.js-->createEle-->createChildren-->createEle创建新节点-->createComponent-->执行hooks的init实例化并挂载
![?](../Interview/images/render-component.png)
https://juejin.cn/post/6847902216934653966


# 19.Vue组件更新流程
创建先父后子，挂载先子后父，递归

patchVnode-->调用prepatch钩子-->属性替换

# 1.函数组件的优势及原理
无状态、无生命周期、无this，可以渲染一些静态的组件，如404、无权限、加载完毕等等。作为性能优化，初始化比有状态组件快得多；支持多个根节点

# 2.Vue组件间传值的方式及之间区别
1).props $emit $on
3).$parent $children $ref $root
4).$attrs, $listeners ，继承父级的props和事件，批量
5).provide & inject，跨级传输
6).EventBus $on, $emit
7).Vuex

# 3.v-if和v-for哪个优先级更高？
once > for > if > template > slot
如果希望if优先，则在上层添加template v-if

# 7.Vue.use是干什么的？原理是什么？
安装插件，调用install方法，这样插件就可以不需要依赖vue

12.keep-alive平时在哪里使用？原理是？
13.Vue-Router有几种钩子函数，具体是什么及执行流程是怎样的?
14.Vue-Router的两种模式的区别
15.谈一下你对vuex的个人理解
16.mutation和action的区别
17.Vue中的性能优化有哪些？
18.Vue中使用了哪些设计模式?

### Vuex vs Redux vs mobX vs Flux

Store：
状态、改状态的函数。
特点：
1. 状态通过action来修改
2. state可以直接修改，所以无法跟踪状态是如何修改的。通过action去修改state可以实现记录state的修改、保存当前state的快照、实现时间旅行的debug的调试工具
   
Flux：一种状态模式：
1. 多个store，缺点：多个store之间会有依赖，数据处理还在store里面进行
2. 通过action来发起修改store
3. dispatcher接收所有actions，然后派发给所有stores然后修改状态
4. 如此实现了数据的单向流动：action -> dispatcher -> store -> view -> action   

Redux：
1. 一个store, state只读
2. 通过action creator来发起同步修改store，store.dispatch('xxx')
3. store调用reducer（纯函数），传入旧的state和action，生成新的state
4. 监听到state改变，更新订阅
5. 如果需要异步操作，则需要用中间件：redux-thunk / redux-promise / redux-saga
6. 框架无关

Vuex:
1. 一个store
2. 通过commit mutation进行同步修改state
3. 通过dispatch action可以进行异步操作，拿到结果之后再commit来修改state
4. 支持模块化
5. 框架有关

MobX:
1. 支持多个store
2. 对state进行监测
3. 当state改边的时候，引用到对应属性都要更新

状态管理关心：
1. 状态如何修改，维护状态
2. 状态修改之后如何更新

状态，改变
无法追踪状态改变，无法保存当前状态的快照，无法做状态的时间穿梭等功能（对于调试工具来说）
状态，状态改变的动作和流程，异步怎么做，状态改变之后

|        | store  | flux（只是一个模式） | redux | vuex | mobx |
|  ----  |  ----  |  ----  |  ----  |  ----  |  ----  |
| 状态个数  | 一个 | 多个 | 一个 | 一个 | 多个 |
| 同步修改状态流  | 函数操作state | action -> dispatcher -> state | dispatch action -> reducer -> new state -> 更新 | commit mutation -> state -> update view | --
| 异步修改状态流  | 函数操作state | 无考虑 | 中间件（thunk/promise/saga）action creator的操作 | dispatch action -> commit mutation -> state -> update view | --
| 优点  | 简单 | 1.数据单向流动 action -> state -> view -> action | 1.store是只读的，确保了状态不能直接修改；2.通过reducer纯函数返回一个新的state；3.其他框架可接入 | 1.考虑到异步操作，提供接口，方便使用；2.不需要考虑状态改变如何更新视图，已经自动绑定；3.支持模块化/getters/辅助函数 | 数据劫持，更新粒度小
| 缺点  | 1.数据流不确定；2.无法知道数据是怎么被修改的，无法保存状态快照，无法实现状态时间旅行 |  1.多个store可能互相依赖，增加了复杂度；2.状态的修改需要在state进行 | 1.异步需要单独引入中间件来操作 | 1.只能vue使用 | 规模大的应用不方便管理


