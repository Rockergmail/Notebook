class AMDCPU {
    constructor(id) {
        this.id = id;
    }
};

class MSIMainboard {
    constructor(id) {
        this.id = id;
    }
};

class Schema1 {
    createCPUApi() {
        return new AMDCPU(939);
    }
    createMainboardApi() {
        return new MSIMainboard(939);
    }
};

class Schema2 {
    reateCPUApi() {
        return new AMDCPU(1000);
    }
    createMainboardApi() {
        return new MSIMainboard(1000);
    }
};

const ComputerEngineer = (() => {
    let cpu;  // 私有属性
    let mainboard; // 私有属性
    const prepareHardWare = Symbol('prepareHardWare');  // 私有方法的key

    return class ComputerEngineer {

        constructor() {
            cpu = null;
            mainboard = null;
        }

        // 私有方法
        [prepareHardWare](schema) {
            cpu = schema.createCPUApi();
            mainboard = schema.createMainboardApi();
            console.log('prepared');
        }

        // 公有方法
        makeComputer (schema) {
            // 调用私用方法
            this[prepareHardWare](schema);
        }
    };
})();

let engineer = new ComputerEngineer();
let schema = new Schema1();
engineer.makeComputer(schema);
engineer = schema = null;