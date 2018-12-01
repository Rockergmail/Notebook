```json with comment
{
    // 666
  "name": "example",
  "version": "1.0.0",
  "description": "to explain this file",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Rocker Lau",
  "license": "ISC",
  "dependencies" :
    { "foo" : "1.0.0 - 2.9999.9999"
    , "bar" : ">=1.0.2 <2.1.2"
    , "baz" : ">1.0.2 <=2.3.4"
    , "boo" : "2.0.1"
    , "qux" : "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0"
    , "asd" : "http://asdf.com/asdf.tar.gz"
    , "til" : "~1.2"
    , "elf" : "~1.2.3"
    , "two" : "2.x"
    , "thr" : "3.3.x"
    , "lat" : "latest"
    , "dyl" : "file:../dyl"
    }
}
```

一些常用的：

npm bin 查看当前的npm目录

设置限制：
**engines** 限制node、npm版本

如果是私用的：
```{ "license": "UNLICENSED" }```
``````

npm版本特性

目录架构

package-lock.json
package.json

版本的表示


安装
升级
缓存

dependance
devDependance
bandledDependance
peerDependance


命令，简写，常用的


