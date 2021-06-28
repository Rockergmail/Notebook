1. super方法es6子类继承父类属性的方法，相当于Father.call(this, args)
2. 在contructor下，在调用super之前不能调用this，js引擎这样考虑是什么？我猜是在未完成属性继承的时候，调用是没有意义的，且this指向的对象未初始化
3. component构造函数的有入参prop，并定义this.props = props。子类构造函数调用super(props)就是传入了props属性，得到了继承和覆盖，所在在construtor内可以调用this.props。所以super()在construtor之内调用this.props为undefined
4. React有一个机制，就是实例化组件的时候会默认新增props属性，所以如果直接调用super()且contructor内不需要用到props属性的也是可以的