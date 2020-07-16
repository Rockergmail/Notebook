<!--
 * @description: 
 * @author: xiangrong.liu
 * @Date: 2020-07-16 15:39:25
 * @LastEditors: xiangrong.liu
 * @LastEditTime: 2020-07-16 17:46:42
--> 
http明文传送，不安全。
https，确保http传送：身份认证、数据安全性、数据一致性
http在第三层tcp三次手完，就在第四层传输层进行TLS握手(Transport Layer Security)，握手之后用生成的对称密钥加密、解密http的内容

tls握手过程：
1. 客户端发送一个 ClientHello 消息到服务器端，消息中同时包含了它的 Transport Layer Security (TLS) 版本，可用的加密算法和压缩算法。
2. 服务器端向客户端返回一个 ServerHello 消息，消息中包含了服务器端的TLS版本，服务器所选择的加密和压缩算法，以及数字证书认证机构（Certificate Authority，缩写 CA）签发的服务器公开证书，证书中包含了公钥。客户端会使用这个公钥加密接下来的握手过程，直到协商生成一个新的对称密钥
3. 客户端根据自己的信任CA列表，验证服务器端的证书是否可信。如果认为可信，客户端会生成一串伪随机数，使用服务器的公钥加密它。这串随机数会被用于生成新的对称密钥
4. 服务器端使用自己的私钥解密上面提到的随机数，然后使用这串随机数生成自己的对称主密钥
客户端发送一个 Finished 消息给服务器端，使用对称密钥加密这次通讯的一个散列值
5. 服务器端生成自己的 hash 值，然后解密客户端发送来的信息，检查这两个值是否对应。如果对应，就向客户端发送一个 Finished 消息，也使用协商好的对称密钥加密
6. 从现在开始，接下来整个 TLS 会话都使用对称秘钥进行加密，传输应用层（HTTP）内容

总结：
- 在第2步的时候，协商好的算法，会以类似这种字符串出现```TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256```
- 在第2步和第3步用到公钥、密钥，是用了```ECDHE_RSA```的非对称加密算法
- 在第3步和第4步用到的对称密钥，是用了```AES_128_GCM``的对称加密算法
- 在第4步和第5步用到生成的散列值，用到了```SHA256```的消息认证算算法

tcp三次握手
[](./images/tcp_3.png)
tcp四次挥手
[](./images/tcp_4.png)

### Reference
1. https://hit-alibaba.github.io/interview/basic/network/HTTPS.html
2. https://github.com/skyline75489/what-happens-when-zh_CN



