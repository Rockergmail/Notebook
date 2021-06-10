class Employee{
    constructor(next) {
        this.next=next;
    }
}
class GroupLeader extends Employee{
    audit() {
        console.log(`组长已经审批!`);
        this.next&&this.next.audit();
    }
}
class Manager extends Employee{
    audit() {
        console.log(`经理已经审批!`);
        this.next&&this.next.audit();
    }
}
class Boss extends Employee{
    audit() {
        console.log(`老板已经审批!`);
        this.next&&this.next.audit();
    }
}
let boss=new Boss();
let manager=new Manager(boss);
let groupLeader=new GroupLeader(manager);
groupLeader.audit();
