/*
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-08-24 16:08:26
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-08-24 16:25:39
 */
import { cube } from './math.js';

function component () {
    const element = document.createElement('pre');

    element.innerHTML = [
        'Hello webpack!',
        '5 cubed is equal to ' + cube(5)
    ].join('\n\n');

    return element;
}

document.body.appendChild(component());