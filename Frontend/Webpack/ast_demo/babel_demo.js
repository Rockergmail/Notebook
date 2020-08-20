/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-08-20 12:10:23
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-08-20 15:16:26
 */
// 把ast1转换成ast2，尽量少修改，多复用

let babel = require('@babel/core')
let t = require('babel-types')
let code = `const sum = (a,b)=>a+b`;