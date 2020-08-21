/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-08-20 12:10:23
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-08-21 10:51:36
 */
// 把ast1转换成ast2，尽量少修改，多复用

let babel = require('@babel/core')
let t = require('babel-types')
let code = `const sum = (a,b)=>a+b`;

const ArrayFunctionPlugin = {
    visitor: {
        ArrowFunctionExpression: (path) => {
            // console.log(path)
            let node = path.node
            let id = node.id
            let params = node.params
            let body = t.blockStatement([t.returnStatement(node.body)], [])
            let generator = false
            let async = false
            let functionExpression = t.functionExpression(id, params, body, generator, async)
            path.parentPath.parent.kind = 'var'
            path.replaceWith(functionExpression)
        }
    }
}

let result = babel.transform(code, {
    plugins: [ArrayFunctionPlugin]
})

console.log(result.code)
/**
 * var sum = function (a, b) {
    return a + b;
   };
 */