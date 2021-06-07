class Plant{
    constructor(name) {
        this.name=name;
    }
    grow() {
        console.log('growing~~~~~~');    
    }
}
class Apple extends Plant{
    constructor(name) {
        super(name);
        this.taste='甜';
    }
}
class Orange extends Plant{
    constructor(name) {
        super(name);
        this.taste='酸';
    }
}
class AppleFactory{
    create() {
        return new Apple();
    }
}
class OrangeFactory{
    create() {
        return new Orange();
    }
}
const settings={
    'apple': AppleFactory,
    'orange':OrangeFactory
}
let apple=new settings['apple']().create();
console.log(apple);
let orange=new settings['orange']().create();
console.log(orange);