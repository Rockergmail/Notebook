// 使用生成器模式构建复杂对象

// 保险合同对象
class InsuranceContract {
    constructor(builder) {
        this.contractId = builder.getContractId();
        this.personName = builder.getPersonName();
        this.companyName = builder.getCompanyName();
        this.beginDate = builder.getBeginDate();
        this.endDate = builder.getEndDate();
        this.otherDate = builder.getOtherDate();
    };
    someOperation() {
        console.log('Now in Insurance Contract someOperation = ' + this.contractId);
    }
};

// 构造保险合同对象的构造器
class ConcreteBuilder {

    constructor(contractId, beginDate, endDate) {
        this.contractId = contractId;
        this.beginDate = beginDate;
        this.endDate = endDate;
    };

    setPersonName(personName) {
        this.personName = personName;
        return this;
    }
    setCompanyName(companyName) {
        this.companyName = companyName;
        return this;
    }
    setOtherData(otherData) {
        this.otherData = otherData;
        return this;
    }
    getContractId() {
        return this.contractId;
    }
    getPersonName() {
        return this.personName;
    }
    getCompanyName() {
        return this.companyName;
    }
    getBiginDate() {
        return this.beginDate;
    }
    getEndDate() {
        return this.endDate;
    }
    getOtherData() {
        return this.otherData;
    }
    // 构建真正的对象并返回
    // 添加一些约束规则
    build() {
        if (!this.contractId || this.contractId.trim().length === 0) {
            throw new Error('合同编号不能为空');
        }
        var signPerson = this.personName && this.personName.trim().length > 0;
        var signCompany = this.companyName && this.companyName.trim().length > 0;

        if (signPerson && signCompany) {
            throw new Error('一份合同不能同时与人和公司签订');
        }

        if (!signPerson && !signCompany) {
            throw new Error('一份合同不能没有签订对象');
        }

        if (this.beginDate <= 0) {
            throw new Error('合同必须有保险开始生效的日期');
        }

        if (this.endDate <= 0) {
            throw new Error('合同必须有保险失效的日期');
        }

        if (this.endDate <= this.beginDate) {
            throw new Error('保险失效的日期必须大于生效日期');
        }

        return new InsuranceContract(this);
    }
}

const builder = new ConcreteBuilder('001', 123456, 6789);
const contract = builder.setPersonName('luke').setOtherData('test').build();
contract.someOperation();