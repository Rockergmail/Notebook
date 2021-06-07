(function(){
    // 示例代码
     
    // 目标对象，是真正被代理的对象
    function Subject(){}
    Subject.prototype.request = function(){};
 
    /**
     * 代理对象
     * @param {Object} realSubject [持有被代理的具体的目标对象]
     */
    function Proxy(realSubject){
        this.realSubject = readSubject;
    }
    Proxy.prototype.request = function(){
        this.realSubject.request();
    };
}());