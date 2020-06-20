# XSRF (cross site request forgery)

### 原理
1. 用户在A网站登录后，被引导到黑客开发的B网站，B网站通过```a```、```img```、```form```等标签，根据它们支持跨域请求的特性，请求A网站的接口，浏览器根据同源策略，这时候会带上网站A的cookie，这样就起到了冒用用户的信息的效果，以达到他们的目的
2. 黑客利用```form```表单达到伪造效果的demo：[https://codepen.io/rocker/pen/QWypWYG](https://codepen.io/rocker/pen/QWypWYG)

### 防御 
1. 后端返回请求的时候```setCookie```带上csrfToken，让前端每次请求都在头部的x-crsf-token带上这个值。这时候，虽然cookie带过去了，后端会另外判断头部的x-csrf-tokend的值。注意这时候的cookie不要开启httpOnly，否则不能用javascript读取该cookie的值
2. 设置Cookie的same-site值 TODO:待学习
3. 

### Refernce
1. https://www.youtube.com/watch?v=hW2ONyxAySY
2. http://evilcyberhacker.com/csrf.html
3. https://hack-yourself-first.com/
4. https://en.wikipedia.org/wiki/Cross-site_request_forgery
5. https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html