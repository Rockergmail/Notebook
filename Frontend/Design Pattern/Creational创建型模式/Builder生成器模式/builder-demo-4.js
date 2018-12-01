'use strict';



/**
 * 为什么要有这个director？我认为不同组合builder的抽象；方便使用者使用。
 * 
 * 我对构建者模式的理解：
 * 构建对象时，传参的集合 ~> 不同的对象或者属性
 */

class Director {
    constructor() {
        this.structure = ['Maze','Wall','Door'];
    }

    Construct (){
        for(var all in this.structure){
            let builder = new ConcreteBuilder()
            builder.BuildPart(this.structure[all]);
            builder.GetResult()
        }
    }
}

class Builder {
    constructor() {
    }

    BuildPart (){
    }
}

class ConcreteBuilder extends Builder {
    constructor() {
        super()
    }

    BuildPart (rawmaterial){
        var material = rawmaterial
        this.product = new Product(material)
    }

    GetResult (){
        return this.product
    }
}

class Product {
    constructor(material) {
        this.data = material
    }
}

function init_Builder() {
    let director = new Director()
    director.Construct()
}