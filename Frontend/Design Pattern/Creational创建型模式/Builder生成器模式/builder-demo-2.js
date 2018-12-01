// 生成器接口，定义创建一个输出文件对象所需的各个部件的操作
// FIXME: 接口是否这么写？
class Builder {
    // 构建输出文件的Header部分
    buildHeader(ehm) { }
    // 构建输出文件的Body部分
    buildBody(mapData) { }
    // 构建输出文件的Footer部分
    buildFooter(efm) { }
};

// 实现导出数据到文本文件的生成器对象    
class TxtBuilder extends Builder {
    constructor() {
        this.stringBuffer = '';
    }
    buildBody(mapData) {
        let tblName, edm;
        for (tblName in mapData) {
            this.stringBuffer += tblName + "\n";

            for (edm in mapData[tblName]) {
                this.stringBuffer += edm.getProductId() + ',' +
                    edm.getPrice() + ',' + edm.getAmount() + '\n';
            }
        }
    }
    buildFooter(efm) {
        this.stringBuffer += efm.getExportUser();
    }
    buildHeader(ehm) {
        this.stringBuffer += ehm.getDepId() + ',' +
            ehm.getExportDate() | '\n';
    }
    getResult() {
        return new Buffer(this.stringBuffer);
    }
}

// 实现导出数据到XML文件的生成器对象
class XmlBuilder extends Builder {
    constructor() {
        this.stringBuffer = '';
    }
    buildBody() { }
    buildFooter() { }
    buildHeader() { }
    getResult() { }
};

// 指导者，指导使用生成器的接口来构建输出的文件的对象
class Director {
    // 传入生成器对象
    constructor(builder) {

        this.builder = builder;
    }

    // 指导生成器构建最终的输出的文件的对象
    construct(ehm, mapData, efm) {
        this.builder.buildHeader(ehm);
        this.builder.buildBody(mapData);
        this.builder.buildFooter(efm);
    }
};

let textBuilder = new TxtBuilder();
let director = new Director(textBuilder);
director.construct(ehm, mapData, efm);

let xmlBuilder = new XmlBuilder();
let director2 = new Director(director);
director2.construct(ehm, mapData, efm);
