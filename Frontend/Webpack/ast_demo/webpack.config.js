/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-08-21 11:00:20
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-08-21 11:14:01
 */
const path = require('path')
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    // plugins: [[
                        // "import", {
                        //     "libraryName": "lodash",
                        //     "libraryDirectory": ""
                        //   }
                    // ]]
                }
            }]
        }]
    }
}