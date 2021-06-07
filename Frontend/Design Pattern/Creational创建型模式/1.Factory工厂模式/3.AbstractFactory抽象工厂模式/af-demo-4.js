// http://www.dofactory.com/javascript-abstract-factory-pattern.aspx

class Employee {
    constructor(name) {
        this.name = name;
    }

    say() {
        log.add("I am employee " + this.name);
    };
}

class EmployeeFactory {
    create(name) {
        return new Employee(name);
    };
}

class Vendor {
    constructor(name) {
        this.name = name;
    }
    say() {
        log.add("I am vendor " + this.name);
    };
}

class VendorFactory {
    create(name) {
        return new Vendor(name);
    };
}

// log helper
var log = (function () {
    var log = "";
    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () {
            console.log(log);
            log = "";
        }
    }
})();


function run() {
    var persons = [];
    var employeeFactory = new EmployeeFactory();
    var vendorFactory = new VendorFactory();

    persons.push(employeeFactory.create("Joan DiSilva"));
    persons.push(employeeFactory.create("Tim O'Neill"));
    persons.push(vendorFactory.create("Gerald Watson"));
    persons.push(vendorFactory.create("Nicole McNight"));

    for (var i = 0, len = persons.length; i < len; i++) {
        persons[i].say();
    }
    log.show();
}

run();