<!--
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-06-22 09:11:40
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-08-17 16:38:04
-->
### 无状态协议
在建立连接的时候

http tcp链路服用、pipeline管道机制（下一个请求发起不需要等待上一个请求返回，且并发有数量限制）、分块传输 。注意有队头阻塞问题
https://www.cnblogs.com/xiongmaomengnan/p/8425724.html

<!-- TODO: http3的XXX和udp是如何实现的 -->


http2 tcp多路复用，一个tcp

### CORS
1. 简单请求
    - 请求方法：HEAD、GET、POST
    - HTTP头：Last-Event-ID、Accept、Accept-Language、Content-Language、Content-Type=application/x-www-form-urlencoded、multipart/form-data、text/plain

http://www.ruanyifeng.com/blog/2016/04/cors.html
https://imququ.com/post/four-ways-to-post-data-in-http.html