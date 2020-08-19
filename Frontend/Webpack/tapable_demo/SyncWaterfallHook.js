/*
 * @description:
 * @author: xiangrong.liu
 * @Date: 2020-08-19 16:55:43
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-08-19 17:46:49
 */
const {
	SyncWaterfallHook
} = require('tapable')

let hook = new SyncWaterfallHook(['name', 'age'])
hook.tap('1', (name, age) => {
	console.log(1, name, age)
	return 'Winty'
})
hook.tap('2', (name, age) => {
	console.log(2, name, age)
	// return 'RR'
})
hook.tap('3', (name, age) => {
	console.log(3, name, age)
})
hook.call('Rocker', 27)
