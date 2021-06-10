[adaptor uml](./adaptor.png);

1. 结合[demo-1](./adaptor-demo-1.js)，之所以Adaptor是泛化Target，是因为Target可以写成输出Adaptor方法，当然也可以把Adaptor独立出来，示意图把他们凑在一起，是为了表示他们是有关系的。

1. Adaptor实现的时候，不要拘泥于是不是一定要继承Adaptee，而要根据实际情况来实现，参考[demo-2](./adaptor-demo-2.js)。 
   
- uml 来收集 角色、关系；时序图 从操作顺序明确 角色、动作