/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-08-20 11:42:56
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-08-20 12:08:30
 */
const esprima = require('esprima');
const estraverse = require('estraverse')
const escodegen = require('escodegen')
let code = `function ast(a, b){}`;
let ast = esprima.parseModule(code);
// 深度优先遍历
estraverse.traverse(ast, {
    enter(node) {
        console.log('enter', node.type)
        if (node.type === 'FunctionDeclaration') {
            node.id.name = 'newAst'
        }
    },
    leave(node) {
        console.log('leave', node.type)
    }
})
let result = escodegen.generate(ast)
console.log(result)
// function newAst(a, b) {}