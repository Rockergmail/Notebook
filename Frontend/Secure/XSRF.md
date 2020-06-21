# XSRF (cross site request forgery)

### 原理
1. 用户在A网站登录后，被引导到黑客开发的B网站，B网站通过```a```、```img```、```form```等标签，根据它们支持跨域请求的特性，请求A网站的接口，浏览器根据同源策略，这时候会带上网站A的cookie，这样就起到了冒用用户的信息的效果，以达到他们的目的
2. 黑客利用```form```表单达到伪造效果的demo：[https://codepen.io/rocker/pen/QWypWYG](https://codepen.io/rocker/pen/QWypWYG)

### 防御 
1. 后端返回请求的时候```setCookie```带上csrfToken，让前端每次请求都在头部的x-crsf-token带上这个值。这时候，虽然cookie带过去了，后端会另外判断头部的x-csrf-tokend的值。注意这时候的cookie不要开启httpOnly，否则不能用javascript读取该cookie的值
2. 设置Cookie的same-site值为strict或者lax
3. 后端在吐出前端页面时，在表单中新增一个```input[type=hidden][name=csrfToken][value=CSRFTOKEN]```，在提交表单时自动提交这些数据。csrftoken和会话token不一样，但是有关联，后端根据检查这两个token是否匹配，是的话才能通过
4. 客户端安装一些csrf插件，插件的原理要么是配置白名单，要么是新建tab的时候删除旧tab的cookie

### 监控
1. 根据HTTP头部referer字段和Origin是否一致来监控，因为这两个字段都是可以改的，所以只是作为监控csrf攻击的一个手段
2. 判断请求的MIME和返回的MIME是否一致，不一致，则上报。例如，请求的是图片，返回的确实JSON

### 其他知识的联系
1. SOP、CORS
2. HTTP cookie
3. XSS

### Refernce
1. https://www.youtube.com/watch?v=hW2ONyxAySY
2. http://evilcyberhacker.com/csrf.html
3. https://hack-yourself-first.com/
4. https://en.wikipedia.org/wiki/Cross-site_request_forgery
5. https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html
6. https://github.com/mqyqingfeng/Blog/issues/157
7. https://medium.com/@azure820529/chrome-80-%E5%BE%8C%E9%87%9D%E5%B0%8D%E7%AC%AC%E4%B8%89%E6%96%B9-cookie-%E7%9A%84%E8%A6%8F%E5%89%87%E8%AA%BF%E6%95%B4-default-samesite-lax-aaba0bc785a3