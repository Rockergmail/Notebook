class Duck{
    eat(food) {
        console.log('吃${food}');
    }
}

class TangDuck{
    constructor() {
        this.duck=new Duck();
    }
    eat() {
        this.duck.eat();
        console.log('谢谢');
    }
}

var duck = new TangDuck()
duck.eat()