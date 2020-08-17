<!--
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-08-17 16:04:56
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-08-17 16:32:12
-->
1. 用vscode的shift+f12来定位函数、变量，方便阅读源码
2. requestAnimationFrame和setTimeout的区别，前者可以保证每次浏览器重绘的时候执行回调，而setTimeout不能保证，理想的情况下是60fps，那setTimeout就是1/60=16.666666，第一不精准。当渲染的任务比较重，导致30fps，rAF能保证在重绘的之前执行，而setTimeout不能感知到这个的变化
https://segmentfault.com/a/1190000019154514
3. ```wait = +wait || 0```，string转number的写法
4. ```'maxWait' in options```可以判断某个对象是否存在某个属性
5. return debounced、赋予cancel、flush、pending这三个方法，很巧妙