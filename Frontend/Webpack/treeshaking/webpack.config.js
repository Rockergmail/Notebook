/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-08-21 11:00:20
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-08-24 16:26:37
 */
const path = require('path')
module.exports = {
    mode: 'development',
    optimization: {
      usedExports: true,
    },
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist')
    }
}