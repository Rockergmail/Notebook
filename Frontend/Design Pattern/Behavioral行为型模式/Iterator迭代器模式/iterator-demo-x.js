/**
 * 迭代器模式
 *
 * 定义：
 * 提供一种方法顺序访问一个聚合对象中各个元素，而又不需要暴露该对象的内部表示。
 *
 * 本质：
 * 控制访问聚合对象中的元素
 *
 * 所谓聚合是指一组对象的组合结构。
 *
 * 一.功能
 * 迭代器模式的功能主要在于提供对聚合对象的迭代访问。迭代器就围绕着这个“访问”做文章，延伸出很多的功能。比如：
 * 1.以不同的方式遍历聚合对象，比如向前，向后等。
 * 2.对同一个聚合同时进行多个遍历。
 * 3.以不同的遍历策略来遍历聚合，比如是否需要过滤等。
 * 4.多态迭代，含义是：为不同的聚合结构提供统一的迭代接口，也就是说通过一个迭代接口可以访问不同的聚合结构，这就叫做多态迭代。事实上，标准的迭代模式实现基本上都是支持多态迭代的
 *
 * 二，关键思想
 * 聚合对象的类型很多，如果对聚合对象的迭代访问跟聚合对象本身融合在一起的话，会严重影响到聚合对象的可扩展性和可维护性。
 * 因此迭代器模式的关键思想就是把对聚合对象的遍历和访问从聚合对象中分离出来，放入单独的迭代器中。这样聚合对象会变得简单一些，而且迭代器和聚合对象可以独立地变化和发展，会大大加强系统的灵活性。
 *
 * 三，内部迭代器和外部迭代器
 * 所谓内部迭代器，指的是由迭代器自己来控制迭代下一个元素的步骤，客户端无法干预。因此，如果想要在迭代的过程中完成工作的话，客户端就需要把操作传递给迭代器。迭代器在迭代的时候会在每个元素上执行这个操作，即回调。
 * 所谓外部迭代，指的是客户端来控制迭代下一个元素的步骤，客户端必须显式地调用next来迭代下一个元素。
 * 总体来说外部迭代器比内部迭代器更灵活一些。
 */

 
  // 带迭代策略的迭代器示例
  /*
    在实现过滤功能的迭代器中，又有两种常见的需要过滤的情况，一种是对数据进行整条过滤，比如只能查看自己部门的数据；另外一种情况是数据进行部分过滤，比如某些人不能查看工资数据。
    带迭代策略的迭代器实现的一个基本思路，就是先把聚合对象的聚合数据获取到，并存储到迭代器中，这样迭代器就可以按照不同的策略来迭代数据了。
     */
    
  /*
谁定义遍历算法的问题

在迭代器模式的实现中，常见的有两个地方可以来定义遍历算法，一个是聚合对象本身，另外一个就是迭代器负责遍历算法。

在聚合对象本身定义遍历算法，通常会在遍历过程中，用迭代器来存储当前迭代的状态这种迭代器被称为游标，因为它仅用来指示当前的位置。

在迭代器中定义遍历算法，会比在相同的聚合上使用不同的迭代器算法容易，同事也易于在不同的聚合上重用相同的算法。比如上面带策略的迭代器示例，迭代器把需要迭代的数据从聚合对象中取出并存放到自己的对象中，然后再迭代自己的数据，除了刚开始创建迭代器的时候需要访问聚合对象外，真正的迭代过程已经跟聚合对象无关了。


迭代器健壮程度如何
在遍历一个聚合的同时更改这个聚合可能是危险的。如果在遍历的时候增加或删除该聚合元素，可能会导致两次访问同一个元素或者遗漏掉某个元素。一个简单的解决办法是拷贝该聚合，并对该拷贝实施遍历，但一般来说代价太高。

一个健壮的迭代器保证插入和删除不会干扰遍历，且不需要拷贝该聚合。有许多方法来实现健壮的迭代器。其中大多数需要向这个聚合注册该迭代器。当插入或删除时，该聚合要么调整迭代器的内部状态，要么在内部的维护额外的信息以保证正确的遍历。

空迭代器
一个空迭代器是一个退化的迭代器，它有助于处理边界条件。一个NullIterator总是已经完成了遍历。例如：叶节点元素返回NullIterator的一个实例。

 */

  /*
双向迭代器

可以同时向前和向后遍历数据的迭代器。
 */



/**
 * 迭代器模式的优点
 *
 * 1.更好的封装性
 * 2.迭代器模式可以让你访问一个聚合对象的内容，而无需暴露该聚合对象的内部表示，从而提高聚合对象的封装性。
 * 3.可以以不同的遍历方式来遍历一个聚合。
 * 4.使用迭代器模式，使得聚合对象的内容和具体的迭代算法分离开。这样就可以通过使用不同的迭代器的实例，不同的遍历方式来遍历一个聚合对象了。
 * 5.迭代器简化了聚合的接口。
 * 6.简化客户端调用
 * 7.同一个聚合上可以有多个遍历。
 * 8.每个迭代器保持它自己的遍历状态。
 *
 *
 * 何时选用迭代器模式
 *
 * 1.如果你希望提供访问一个聚合对象的内容，但是又不想暴露它的内部表示的时候。
 * 2.如果你希望有多种遍历方式可以访问聚合对象，可以使用迭代器模式。
 * 3.如果你希望为遍历不同的聚合对象提供一个统一的接口。
 *
 *
 * 相关模式
 *
 * 迭代器模式和组合模式
 *
 * 这两个模式可以组合使用。
 * 组合模式是一种递归的对象结构，在枚举某个组合对象的子对象的时候，通常会使用迭代器模式。
 *
 * 迭代器模式和工厂方法模式
 * 
 * 这两个模式可以组合使用。
 * 在聚合对象创建迭代器的时候，通常会采用工厂方法模式来实例化相应的迭代器对象。
 *
 * 备忘模式
 * 可使用memento来捕获一个迭代的状态。迭代器在其内部存储memento
 */



(function(){
    // http://www.dofactory.com/javascript-iterator-pattern.aspx
    
    var Iterator = function(items) {
        this.index = 0;
        this.items = items;
    };

    Iterator.prototype = {
        first: function() {
            this.reset();
            return this.next();
        },
        next: function() {
            return this.items[this.index++];
        },
        hasNext: function() {
            return this.index <= this.items.length;
        },
        reset: function() {
            this.index = 0;
        },
        each: function(callback) {
            for (var item = this.first(); this.hasNext(); item = this.next()) {
                callback(item);
            }
        }
    };

    // log helper
    var log = (function() {
        var log = "";
        return {
            add: function(msg) { log += msg + "\n"; },
            show: function() { console.log(log); log = ""; }
        }
    })();


    new function run() {

        var items = ["one", 2, "circle", true, "Applepie"];
        var iter = new Iterator(items);

        // using for loop

        for (var item = iter.first(); iter.hasNext(); item = iter.next()) {
            log.add(item);
        }

        log.add("");

        // using Iterator's each method

        iter.each(function(item) {
            log.add(item);
        });

        log.show();
    }();
}());

(function(){
    /* Title: Iterator
     Description: implements a specialized language
     */
    
    var agg = (function () {

        var index = 0,
                data = [1, 2, 3, 4, 5],
                length = data.length;

        return {

            next:function () {
                var element;
                if (!this.hasNext()) {
                    return null;
                }
                element = data[index];
                index = index + 2;
                return element;
            },

            hasNext:function () {
                return index < length;
            },

            rewind:function () {
                index = 0;
            },

            current:function () {
                return data[index];
            }

        };
    }());

    var element;
    while (element - agg.next()) {
        // do something with the element
        console.log(element);
    }

    while (agg.hasNext()) {
        // do something with the next element...
        console.log(agg.next());
    }

    // this loop logs 1, then 3, then 5
    while (agg.hasNext()) {
        console.log(agg.next());
    }

    // go back
    agg.rewind();
    console.log(agg.current()); // 1

    // reference
    // http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#iteratorpatternjquery
    // http://shop.oreilly.com/product/9780596806767.do?sortby=publicationDate
}());

(function(){
    var CafeMenu = function(){
        Menu.apply(this);
        this.nPosition = -1;
        this.aMenuItems = [];
        this.createIterator = function(){
            return new CafeMenuIterator(this.aMenuItems);
        };
        this.addItem("Express", "Coffee from machine", false, 0.99);
        this.addItem("Long with water", "Coffee with a lot of water", false, 1.20);
        this.addItem("On the rocks", "Coffee with ice", false, 2.00);
    };
    CafeMenu.prototype.addItem = function(sName, sDescription, bVegetarian, nPrice){
        var oMenuItem = new MenuItem(sName, sDescription, bVegetarian, nPrice);
        this.aMenuItems.push(oMenuItem);
    };
    CafeMenu.prototype.getMenuItems = function(){
        return this.aMenuItems;
    };

    var CafeMenuIterator = function(aMenuItems){
        this.aMenuItems = aMenuItems;
        Iterator.apply(this);
        this.nPosition = -1;
        this.nLength = this.aMenuItems.length;
        this.hasNext = function(){
            return (this.nPosition + 1) < this.nLength;
        };
        this.next = function(){
            this.nPosition = this.nPosition + 1;
            return this.aMenuItems[this.nPosition];
        };
    };

    var DinnerMenu = function(){
        Menu.apply(this);
        this.oMenuItems = {};
        this.createIterator = function(){
            return new DinnerMenuIterator(this.oMenuItems);
        };
        this.addItem("Vegetarian BLT", "(Fakin') Bacon with lettuce and tomato on whole wheat", true, 2.99);
        this.addItem("BLT", "Bacon with lettuce and tomato on whole wheat", false, 2.99);
        this.addItem("Soup of the day", "Soup of the day, with a side of potato salad", false, 3.29);
        this.addItem("Hotdog", "A hotdog with saurkraut, relish, onions, topped with cheese", false, 3.05);
    };
    DinnerMenu.MAX_ITEMS = 6;
    DinnerMenu.prototype.addItem = function(sName, sDescription, bVegetarian, nPrice){
        if(this.length === DinnerMenu.MAX_ITEMS){
            throw new Error("Sorry menu is full! Can't add item to menu");
        }
        this.oMenuItems[sName] = new MenuItem(sName, sDescription, bVegetarian, nPrice);
        this.length = this.length + 1;
    };
    DinnerMenu.prototype.getMenuItems = function(){
        return this.oMenuItems;
    };

    var DinnerMenuIterator = function(oMenuItems){
        this.oMenuItems = oMenuItems;
        Iterator.apply(this);
        this.nPosition = -1;
        this.nLength = 0;
        this.hasNext = function(){
            return (this.nPosition + 1) < this.nLength;
        };
        this.next = function(){
            this.nPosition = this.nPosition + 1;
            return this.oMenuItems[this.aKeys[this.nPosition]];
        };
        this._getKeys = function(){
            var aKeys = [];
            var sKey = '';
            for(sKey in this.oMenuItems){
                if(this.oMenuItems.hasOwnProperty(sKey)){
                    aKeys.push(sKey);
                    this.nLength = this.nLength + 1;
                }
            }
            return aKeys;
        };
        this.aKeys = this._getKeys();
    };

    var Iterator = function(){
        this.hasNext = function(){
            throw new Error("This method must be overwritten!");
        };
        this.next = function(){
            throw new Error("This method must be overwritten!");
        };
        this.remove = function(){
            throw new Error("This method must be overwritten!");
        };
    };

    var Mattress = function(aMenus){
        this.aMenus = aMenus;
    };
    Mattress.prototype._printMenu = function(oIterator){
        var oMenuItem = null;
        while(oIterator.hasNext()){
            oMenuItem = oIterator.next();
            console.log(oMenuItem.getName() + ": " + oMenuItem.getDescription() + ", " + oMenuItem.getPrice() + "eur.");
        }
    };
    Mattress.prototype.printMenu = function(){
        var nMenu = 0;
        var nLenMenus = this.aMenus.length;
        var oMenu = null;
        var oIterator = null;

        for(; nMenu < nLenMenus;)
        {
            oMenu = this.aMenus[nMenu];
            oIterator = oMenu.createIterator();
            this._printMenu(oIterator);
            nMenu = nMenu + 1;
        }
    };

    var Menu = function(){
        this.createIterator = function(){
            throw new Error("This method must be overwritten!");
        };
    };

    var MenuItem = function(sName, sDescription, bVegetarian, nPrice){
        this.sName = sName;
        this.sDescription = sDescription;
        this.bVegetarian = bVegetarian;
        this.nPrice = nPrice;
    };
    MenuItem.prototype.getName = function(){
        return this.sName;
    };
    MenuItem.prototype.getDescription = function(){
        return this.sDescription;
    };
    MenuItem.prototype.getPrice = function(){
        return this.nPrice;
    };
    MenuItem.prototype.isVegetarian = function(){
        return this.bVegetarian;
    };

    var PancakeHouseMenu = function(){
        Menu.apply(this);
        this.nPosition = -1;
        this.aMenuItems = [];
        this.createIterator = function(){
            return new PancakeHouseMenuIterator(this.aMenuItems);
        };
        this.addItem("K&B's Pancake Breakfast", "Pancakes with scrambled eggs, and toast", true, 2.99);
        this.addItem("Regular Pancake Breakfast", "Pancakes with fried eggs, sausage", false, 2.99);
        this.addItem("Blueberry Pancakes", "Pancakes made with fresh blueberries", true, 3.49);
        this.addItem("Waffles", "Waffles, with your choice of blueberries or strawberries", true, 3.59);
    };
    PancakeHouseMenu.prototype.addItem = function(sName, sDescription, bVegetarian, nPrice){
        var oMenuItem = new MenuItem(sName, sDescription, bVegetarian, nPrice);
        this.aMenuItems.push(oMenuItem);
    };
    PancakeHouseMenu.prototype.getMenuItems = function(){
        return this.aMenuItems;
    };

    var PancakeHouseMenuIterator = function(aMenuItems){
        this.aMenuItems = aMenuItems;
        Iterator.apply(this);
        this.nPosition = -1;
        this.nLength = this.aMenuItems.length;
        this.hasNext = function(){
            return (this.nPosition + 1) < this.nLength;
        };
        this.next = function(){
            this.nPosition = this.nPosition + 1;
            return this.aMenuItems[this.nPosition];
        };
    };

    var oMattress = new Mattress([new PancakeHouseMenu(), new DinnerMenu(), new CafeMenu()]);
    console.log("---------------------------------------------");
    oMattress.printMenu();
    console.log("---------------------------------------------");

}());