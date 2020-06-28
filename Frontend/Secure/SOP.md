<!--
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-06-22 09:11:40
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-06-28 15:43:56
--> 
# SOP (Same-origin policy)

1. 非同源之间的页面，不能读取页面的数据
   1. Cookie、LocalStorage 和 IndexDB 无法读取
   2. DOM 无法获得
   3. AJAX 请求不能发送
2. 同源，是指协议、主机名、端口号，都一样
![](images/sop001.png)
   

### 跨域方法

场景：AJAX
   1. CORS
   2. JSONP
   3. WebSocket

场景：Cookie
   1. document.domain  

场景：iFrame
   1. window.name
   2. postMessage
   3. location.hash


### 相关知识
1. CORS (Cross Origin Resource Sharing)

### Reference
1. https://en.wikipedia.org/wiki/Same-origin_policy
2. https://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html