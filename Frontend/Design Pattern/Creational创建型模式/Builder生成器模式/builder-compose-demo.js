// FIXME: 看完 组合模式 之后再来看看

class Shop {
    construct(builder) {
        builder.step1();
        builder.step2();
        return builder.get();
    }
}

class CarBuilder {

    constructor() {
        this.car = null;
    }

    step1() {
        this.car = new Car();
    };
    step2() {
        this.car.addParts();
    };
    get() {
        return this.car;
    };
}

class TruckBuilder {

    constructor() {

        this.truck = null;
    }
    step1() {
        this.truck = new Truck();
    };
    step2() {
        this.truck.addParts();
    };
    get() {
        return this.truck;
    };
}

class Car {
    constructor() {
        this.doors = 0;
    }
    addParts() {
        this.doors = 4;
    };
    say() {
        log.add("I am a " + this.doors + "-door car");
    };
}

class Truck {

    constructor() {
        this.doors = 0;
    }
    addParts() {
        this.doors = 2;
    };
    say() {
        log.add("I am a " + this.doors + "-door truck");
    };
}

// log helper
const log = (function () {
    let log = "";
    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { console.log(log); log = ""; }
    }
})();

function run() {
    const shop = new Shop();

    const carBuilder = new CarBuilder();
    const truckBuilder = new TruckBuilder();

    const car = shop.construct(carBuilder);
    const truck = shop.construct(truckBuilder);

    car.say();
    truck.say();

    log.show();
}

run();