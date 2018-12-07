class A {
    fuck() {

    }
}

class B {
    intercorse(){

    }
}

class AAdapter{

    constructor(A){
        this.A = A;
    }
    intercorse(){
        A.fuck();
    }
}