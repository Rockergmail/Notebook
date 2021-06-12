class Student{
    constructor(name){
        this.name = name
    }
    action() {
        console.log(`${this.name}想请假`)
    }
}

class Teacher{
    constructor(name, subject) {
        this.name = name
        this.subject = subject
        this.students = []
    }
    subscribe(stu) {
        // 避免重复订阅
        !this.students.includes(stu) && this.students.push(stu) || console.log('already subscribed')
        
    }
    notify() {
        this.students.forEach(stu => stu.action())
    }
}

let stu1 = new Student('张三')
let stu2 = new Student('李四')
let professor = new Teacher('李老师', '政治')
professor.subscribe(stu1)
professor.subscribe(stu2)
professor.subscribe(stu1)
professor.notify()