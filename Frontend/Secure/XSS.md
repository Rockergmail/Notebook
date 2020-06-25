<!--
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-06-22 15:06:34
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-06-24 18:29:42
--> 
### XSS (Cross Site Scripting)
1. 攻击者提交恶意代码（script），中间有可能经过后端，最后再浏览器执行恶意代码
2. 恶意代码注入的途径
   1. input输入框
   2. URL参数
   3. img标签onerror可以插入js代码，```<img src="" onerror="javascript: alert()"/>```，a标签的href可以插入js代码，```<a href="javascript:alert()">```
   4. 元素属性值逃逸
   5. 更多见[https://html5sec.org](https://html5sec.org)
3. XSS类型：
   1. 存储型：攻击者的恶意代码，直接存到数据库，其他用户访问对应的内容时直接执行，有经过后端
   2. 反射型：攻击者的恶意代码，放在URL后，在前端显示时变成了直接执行对应的代码，有经过后端
   3. DOM型：攻击者的恶意代码，通过绕过原有的标签，插入script执行对应的代码，没有经过后端
4. 防御手段：不要信任用户提供的数据，无论是传给后端、还是直接展示在页面上，都需要对数据做过滤（escape）
      1. 如果用户的数据是用在html，过滤 ```& --> &amp;```、```< --> &lt;```、```> --> &gt;```、```" --> &quot;```、```' --> &#x27;```、```/ --> &#x2F;```
      2. 如果用户的数据用在标签的属性值，允许```/[0-9a-zA-Z]/```，控制值得长度为256，其他值用过滤为HTML Entities，防止逃逸
      3. 对javascript的url做过滤，如iframe的src、a标签的href属性，要做协议的过滤，只允许http、https协议
      4. 对URL的参数做encode
      5. 对css的background-url做协议的限制
      6. JSON的值把<、>转换成unicode
      7. cookie开启httpOnly，因为攻击者的目的之一，就是想知道你的会话cookie，开启了httpOnly之后就不可以用JS获取
      8. CSP
      9. 使用现代的模板引擎，已经有很成熟的xss防御体系
      10. 使用安全的方法：innerText、setAttribute

### 总结
1. 页面中引用到用户可输入的内容（input、URL之类的），就要留个心眼，是否有可能被xss攻击
2. xss的防御手段总结：对输入的内容做限制，要么是协议白名单，要么是除了数字字母之外的字符串变成body entities，要么就是CSP

### Reference
1. 几个XSS游戏，答案搜索对应网站+solution：
   1. https://xss-game.appspot.com/?utm_source=webopsweekly&utm_medium=email
   2. http://www.itsecgames.com/
   3. http://prompt.ml/
   4. https://alf.nu/alert1
2. https://html5sec.org/
3. https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#introduction
4. https://owasp.org/www-community/attacks/xss/#stored-and-reflected-xss-attacks