<!--
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-08-17 17:54:44
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-08-17 18:02:37
-->
1. 将代码进行转换，最常用的是ES6转换成ES5，原理就是词法分析、语法分析、构建成AST树，AST进行优化、转码、生成新的代码
2. presets，就是转换规则，常用的presets是env，指把es最新的语法
3. plugins，就是插件，常用的就是runtime那个，因为presets只是语法的转换，像Promise等是没有转换的，加上这个插件，就可以在低端的浏览器使用，就是个polyfill
4. 先执行polyfill，再执行presets

https://cnodejs.org/topic/5a9317d38d6e16e56bb808d1