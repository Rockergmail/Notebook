"use strict";

class Subject {
  constructor() {}

  Request() {}
}

class RealSubject extends Subject {
  constructor() {
    super();
    console.log("RealSubject created");
  }

  Request() {
    console.log("RealSubject handles request");
  }
}

class Proxy extends Subject {
  constructor() {
    super();
    console.log("Proxy created");
  }

  Request() {
    this.realSubject = new RealSubject();
    this.realSubject.Request();
  }
}

function init_Proxy() {
  var proxy = new Proxy();
  proxy.Request();
}

init_Proxy();