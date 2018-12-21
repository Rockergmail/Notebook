'use strict';
class Handler {
    constructor() {
    }
    HandleRequest() {
    }
}

class ConcreteHandler1 extends Handler {
    constructor() {
        super()
        console.log('ConcreteHandler1 created')
    }

    setSuccessor(successor) {
        this.successor = successor
    }

    HandleRequest(request) {
        if (request === 'run')
            console.log('ConcreteHandler1 has handled the request')
        else {
            console.log('ConcreteHandler1 calls his successor')
            this.successor.HandleRequest(request)
        }
    }
}

class ConcreteHandler2 extends Handler {
    constructor() {
        super()
        console.log('ConcreteHandler2 created')
    }

    HandleRequest(request) {
        console.log('ConcreteHandler2 has handled the request')
    }
}

function init_ChainofResponsibility() {
    let handle1 = new ConcreteHandler1()
    let handle2 = new ConcreteHandler2()
    handle1.setSuccessor(handle2)
    handle1.HandleRequest('run')
    handle1.HandleRequest('stay')

}

init_ChainofResponsibility();