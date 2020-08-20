/*
 * @description:
 * @author: xiangrong.liu
 * @Date: 2020-08-19 16:55:43
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-08-20 11:10:21
 */
const {
	SyncLoopHook
} = require('tapable')
let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
let hook = new SyncLoopHook(['name', 'age'])
hook.tap('1', (name, age) => {
	counter1++
	console.log(1, name, age, counter1)
	if (counter1 == 1) {
        counter1 = 0
		return
	}
	return true;
})
hook.tap('2', (name, age) => {
	counter2++
	console.log(2, name, age, counter2)
	if (counter2 == 2) {
        counter2 = 0
		return
	}
	return true;
})
// hook.tap('3', (name, age) => {
// 	console.log(3, name, age)
// })

hook.call('Rocker', 27)
// 效果是如果没有达到loop，那就重头再loop一次
// 1 Rocker 27 1
// 2 Rocker 27 1
// 1 Rocker 27 1
// 2 Rocker 27 2