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
    }

    createProductA (product) {
        return new ProductA1()
    }

    createProductB (product) {
        return new ProductB1()
    }
}

class ConcreteFactory2 extends AbstractFactory {
    constructor() {
        super()
    }

    createProductA (product) {
        return new ProductA2()
    }

    createProductB (product) {
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
    }
}

class ProductA2 extends AbstractProductA {
    constructor() {
        super()
    }
}

class ProductB1 extends AbstractProductB {
    constructor() {
        super()
    }
}

class ProductB2 extends AbstractProductB {
    constructor() {
        super()
    }
}

function init_AbstractFactory() {
    const factory1 = new ConcreteFactory1()
    const productB1 = factory1.createProductB()
    
    const factory2 = new ConcreteFactory2()
    const productA2 = factory2.createProductA()
}

init_AbstractFactory();