'use strict';

class AbstractFactory {
    constructor() {
    }

    createProductA (product) {
    }

    createProductB (product) {
    }
}

class ConcreteFactory1 extends AbstractFactory {
    constructor() {
        super()
        console.log("ConcreteFactory1 class created");
    }

    createProductA (product) {
        console.log('ConcreteFactory1 createProductA')
        return new ProductA1()
    }

    createProductB (product) {
        console.log('ConcreteFactory1 createProductB')
        return new ProductB1()
    }
}

class ConcreteFactory2 extends AbstractFactory {
    constructor() {
        super()
        console.log("ConcreteFactory2 class created");
    }

    createProductA (product) {
        console.log('ConcreteFactory2 createProductA')
        return new ProductA2()
    }

    createProductB (product) {
        console.log('ConcreteFactory2 createProductB')
        return new ProductB2()
    }
}

class AbstractProductA {
    constructor() {
    }
}

class AbstractProductB {
    constructor() {
    }
}


class ProductA1 extends AbstractProductA {
    constructor() {
        super()
        console.log('ProductA1 created')
    }
}

class ProductA2 extends AbstractProductA {
    constructor() {
        super()
        console.log('ProductA2 created')
    }
}

class ProductB1 extends AbstractProductB {
    constructor() {
        super()
        console.log('ProductB1 created')
    }
}

class ProductB2 extends AbstractProductB {
    constructor() {
        super()
        console.log('ProductB2 created')
    }
}

function init_AbstractFactory() {
    const factory1 = new ConcreteFactory1()
    const productB1 = factory1.createProductB()
    
    const factory2 = new ConcreteFactory2()
    const productA2 = factory2.createProductA()
}

init_AbstractFactory();