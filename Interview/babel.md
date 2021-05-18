<!--
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-08-17 17:54:44
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2021-05-18 17:11:18
-->
1. 将代码进行转换，最常用的是ES6转换成ES5，原理就是词法分析、语法分析、构建成AST树，AST进行优化、转码、生成新的代码
2. presets，就是转换规则，从下到上执行，常用的presets是@babel/preset-env，兼容新的API指把es最新的语法，
3. plugins，就是插件，常用的就是runtime那个，因为presets只是语法的转换，像Promise等是没有转换的，加上这个插件，就可以在低端的浏览器使用，就是个polyfill，从上到下执行。参数：loose，是否严格按照es6标准来转化
4. 先执行plugins，再执行presets

https://cnodejs.org/topic/5a9317d38d6e16e56bb808d1

- babel-loader，让webpack识别babel

nrm ls 看registry