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
   2. http的get方法传参
   3. location的hash
   4. img标签onerror可以插入js代码，```<img src="" onerror="javascript: alert()"/>```
   5. a标签的href可以插入js代码，```<a href="javascript:alert()">```
   6. 使用```eval```执行用户提供的内容
3. XSS类型：
   1. 存储型：攻击者的恶意代码，直接存到数据库，其他用户访问对应的内容时直接执行，有经过后端
   2. 反射型：攻击者的恶意代码，放在URL后，在前端显示时变成了直接执行对应的代码，有经过后端
   3. DOM型：攻击者的恶意代码，通过绕过原有的标签，插入script执行对应的代码，没有经过后端
4. 防御手段：
   1. 不要信任用户提供的数据，无论是传给后端、还是直接展示在页面上，都需要对数据做过滤（escape）
      1. 如果读的数据是用在html，过滤 ```& --> &amp;```、```< --> &lt;```、```> --> &gt;```、```" --> &quot;```、```' --> &#x27;```、```/ --> &#x2F;```
      2. 
   2. CSP


### Reference
1. 几个XSS游戏，答案搜索对应网站+solution：
   1. https://xss-game.appspot.com/?utm_source=webopsweekly&utm_medium=email
   2. http://www.itsecgames.com/
   3. http://prompt.ml/
   4. https://alf.nu/alert1
2. https://html5sec.org/
3. https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#introduction