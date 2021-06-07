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
class Factory{
    static create(name) {
        switch (name) {
            case 'apple':
                return new Apple('苹果');
            case 'orange':
                return new Orange('橘子');
        }
    }
}
let apple=Factory.create('apple');
console.log(apple);
let orange=Factory.create('orange');
console.log(orange);