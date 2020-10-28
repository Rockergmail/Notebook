/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-10-28 17:51:58
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-10-28 17:58:26
 */
function say(who) {
    console.log(who + '说话')
}
Function.prototype.before = function (beforeFn) {
    return (...args) => {
        beforeFn();
        this(...args);
    }
}
let newFn = say.before(() => {
    console.log('说话前')
});
newFn('马化腾');