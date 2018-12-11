/**
 * 享元模式
 *
 * 定义：
 * 运用共享技术有效地支持大量细粒度的对象
 *
 * 本质：
 * 分离与共享
 *
 * 分离的是对象状态中的变与不变的部分，共享的是对象中不变的部分。享元模式的关键之处在于分离变与不变，把不变部分作为享元对象的内部状态，而变化部分则作为外部状态，由外部来维护，这样享元对象就能够被共享。
 *
 * 如果能够有效地减少对象的数量，减少重复的数据，那么就能够节省不少内存。一个基本的思路就是缓存这些包含着重复数据的对象，让这些对象只出现一次，也就只耗费一份内存。
 * 如果被缓存的对象的属性值经常变动，那就不适合缓存了。
 * 因此，需要分离出被缓存对象实例中，哪些数据是不变且重复出现的，哪些数据是经常变化的，真正应该被缓存的数据是那些不变且重复出现的数据，把它们称为对象的内部状态，而那些变化的数据就不缓存了，把它们称为对象的外部状态。
 * 这样在实现的时候，把内部状态分离出来共享，称之为享元，通过共享享元对象来减少对内存的占用。把外部状态分离出来，放到外部，让应用在使用的时候进行维护，并在需要的时候传递给享元对象使用。为了控制对内部状态的共享，并且让外部能简单地使用共享数据，提供一个工厂来管理享元，把它称为享元工厂。
 *
 * 1.变与不变
 * 享元模式的重点就在于分离变与不变。把一个对象的状态分成内部状态和外部状态，内部状态是不变的，外部状态是可变的。然后通过共享不变的部分，达到减少对象数量并节约内存的目的。在享元对象需要的时候，可以从外部传入外部状态给共享的对象，共享对象会在功能处理的时候，使用自己内部的状态和这些外部的状态。
 *
 * 2.共享与不共享
 * 在享元模式中，享元对象又有共享与不共享之分，这种情况通常出现在和组合模式合用的情况，通常共享的是叶子对象，一般不共享的部分是由共享部分组合而成的，由于所有细粒度的叶子对象已经缓存了，那么缓存组合对象就没有什么意义了。
 *
 * 3.内部状态和外部状态
 * 享元模式的内部状态，通常指的是包含享元对象内部的，对象本身的状态，是独立于使用享元的场景的信息，一般创建后就不再变化的状态，因此可以共享。
 * 外部状态指的是享元对象之外的状态，取决于使用享元的场景，会根据使用场景而变化，因此不可共享。如果享元对象需要这些外部状态的话，可以从外部传递到享元对象中，比如通过方法的参数来传递。
 * 也就是说享元模式真正缓存和共享的数据是享元的内部状态，而外部状态是不应该被缓存共享的。
 * 内部状态和外部状态是独立的。外部状态的变化不应该影响到内部状态。
 *
 * 4.实例池
 * 在享元模式中，为了创建和管理共享的享元部分，引入了享元工厂，享元工厂中一般都包含有享元对象的实例池，享元对象就是缓存在这个实例池中的。
 * 所谓实例池，指的是缓存和管理对象实例的程序，通常实例池会提供对象实例的运行环境，并控制对象实例的生存周期。
 * 工业级的实例池在实现上有两个最基本的难点，一个是动态控制实例数量，另一个是动态分配实例来提供给外部使用。这些都是需要算法来做保证的。
 * 在享元模式中，享元工厂中的实例池并没有那么复杂，因为共享的享元对象基本上都是一个实例，一般不会出现同一个享元对象有多个实例的情况。这样就不用去考虑动态创建和销毁享元对象实例的功能，也不存在动态调度的麻烦。
 *
 * 5.享元模式的调用顺序
 * 1）通过享元工厂来获取共享的享元对象
 * 2）创建相应的享元对象
 * 3）调用共享的享元对象的方法，传入外部状态
 *
 * 6.谁来初始化共享对象
 * 通常是第一次向享元工厂请求获取共享对象的时候，进行共享对象的初始化，而且多半都是在享元工厂内部实现，不会从外部传入共享对象。当然可以从外部传入一些创建共享对象需要的值，享元工厂可以按照这些值去初始化需要共享的对象，然后把创建好的共享对象的实例放入享元工厂内部的缓存中，以后再请求这个共享对象的时候就不用再创建了。
 */



/*
不需要共享的享元

对于使用已经缓存的享元组合出来的对象，就没有必要再缓存了。也就是把已经缓存的享元当作叶子节点，组合出来的组合对象就不需要
再被缓存了，也把这种享元成为复合享元。
*/

/*
 享元的结构
 享元模式用于减少应用程序所需对象的数量。这是通过将对象的内部状态划分为内在数据（instrinsic data）和外在数据（extrinsic data）两类而实现的。内在数据是指类的内部方法所需要的信息。没有这种数据的话类就不能正常运行。外在数据则是可以从类身上剥离并存储在其外部的信息。我们可以将内在状态相同的所有对象替换为同一个共享对象，用这种方法可以把对象数量减少到不同内在状态的数量。
 创建这种共享对象需要使用工厂，而不是普通的构造函数。这样做可以跟踪到已经实例化的各个对象，从而仅当所需对象的内在状态不同于已有对象时才创建一个新对象。对象的外在状态被曝存在一个管理器对象中。在调用对象的方法时，管理器会把这些外在状态作为参数传入。
 */

/*
 现在生成的DOM元素已减至一个。这很重要，假如你想为工具提示添加阴影或iframe垫片等特性，那么每个Tooltip对象需要生成5-10个DOM元素。要是不把它实现为享元的话，网页将被成百上千个工具提示压垮。此外，享元模式的应用还减少了对箱内部保存的数据。
 */

/*
 保存实例供以后重用

 模式对话框是享元模式的另一个适用场合。与工具提示一样，对话框对象也封装着数据和HTML内容。不过，后者包含的DOM元素要多得多，因此尽可能地减少其实例个数更显重要。问题在于网页上可能会同时出现不止一个对话框。实际上，你无法确却知道究竟需要多少对话框。既然如此，那有怎能得知需要用到多少实例呢？

 因为运行期间需要用到的实例的确却数目无法在开发期间确定，所以不能对实例的个数加以限制，而只能要用多少就创建多少，然后把它们保存起来供以后使用。这样就不用再次成熟期创建过程中的开销，而且所创建的实例的数目也刚好能满足需要。
 在这个示例中，DialogBox对象的实现细节并不重要。你只需要知道，它是资源密集型的对象，应该尽量少实例化。该类的基本框架以及它实现的接口如下：
 */

// DialogBox class
var DialogBox = function () {
    // implements DisplayModule
    this.wrapper = document.createElement('section');
    this.wrapper.className = 'dialog_wrapper';
    this.header = document.createElement('header');
    this.header.className = 'dialog_header';
    this.content = document.createElement('div');
    this.content.className = 'dialog_body';
    this.footer = document.createElement('footer');
    this.footer.className = 'dialog_footer';

    this.wrapper.appendChild(this.header);
    this.wrapper.appendChild(this.footer);
    this.wrapper.insertBefore(this.content, this.footer);
    this.wrapper.style.display = 'none';
    document.body.appendChild(this.wrapper);
};
DialogBox.prototype = {
    show: function (obj) {
        // Sets the content and shows the dialog box
        this.header.innerHTML = obj.header;
        this.content.innerHTML = obj.content;
        this.footer.innerHTML = obj.footer;

        this.wrapper.style.display = 'block';
    },
    hide: function () {
        // Hides the dialog box
        this.wrapper.style.display = 'none';
    },
    status: function () {
        // Returns 'visible' or 'hidden'
        var value = this.wrapper.style.display;
        if (!value) {
            if (document.defaultView && document.defaultView.getComputedStyle) {
                var css = document.defaultView.getComputedStyle(this.wrapper, null);
                value = css ? css.display : null;
            } else if (this.wrapper.currentStyle) {
                value = this.wrapper.currentStyle.display;
            }
        }
        return value === 'none' ? 'hidden' : 'visible';
    }
};

/*
 控制享元数量的管理器。改管理器需要三个部件：一个用来显示对话框的方法，一个用来检查当前网页上正在使用的对话框的数目的方法，以及一个用来保存所生成的对话框的数据结构。我们用一个单体来包装这些部件，以确保管理器的唯一性：
 */
// DialogBox class
var DialogBox = function () {
    // implements DisplayModule
    this.wrapper = document.createElement('section');
    this.wrapper.className = 'dialog_wrapper';
    this.header = document.createElement('header');
    this.header.className = 'dialog_header';
    this.content = document.createElement('div');
    this.content.className = 'dialog_body';
    this.footer = document.createElement('footer');
    this.footer.className = 'dialog_footer';

    this.wrapper.appendChild(this.header);
    this.wrapper.appendChild(this.footer);
    this.wrapper.insertBefore(this.content, this.footer);
    this.wrapper.style.display = 'none';
    document.body.appendChild(this.wrapper);
};
DialogBox.prototype = {
    show: function (obj) {
        // Sets the content and shows the dialog box
        this.header.innerHTML = obj.header;
        this.content.innerHTML = obj.content;
        this.footer.innerHTML = obj.footer;

        this.wrapper.style.display = 'block';
    },
    hide: function () {
        // Hides the dialog box
        this.wrapper.style.display = 'none';
    },
    state: function () {
        // Returns 'visible' or 'hidden'
        var value = this.wrapper.style.display;
        if (!value) {
            if (document.defaultView && document.defaultView.getComputedStyle) {
                var css = document.defaultView.getComputedStyle(this.wrapper, null);
                value = css ? css.display : null;
            } else if (this.wrapper.currentStyle) {
                value = this.wrapper.currentStyle.display;
            }
        }
        return value === 'none' ? 'hidden' : 'visible';
    }
};

/*
 控制享元数量的管理器。改管理器需要三个部件：一个用来显示对话框的方法，一个用来检查当前网页上正在使用的对话框的数目的方法，以及一个用来保存所生成的对话框的数据结构。我们用一个单体来包装这些部件，以确保管理器的唯一性：
 */
// DialogBoxManager singleton
var DialogBoxManager = (function () {
    // Stroes created instances
    var created = [];

    return {
        displayDialogBox: function (obj) {
            // Find the number currently in use
            var inUse = this.numberInUse();
            if (inUse === created.length) {
                // Augment it if need be
                created.push(this.createDialogBox());
            }
            // show the dialog box
            created[inUse].show(obj);
        },
        createDialogBox: function () {
            // Factory method
            return new DialogBox();
        },
        numberInUse: function () {
            var inUse = 0;
            for (var i = 0, len = created.length; i < len; i++) {
                if (created[i].state() === 'visible') {
                    inUse++;
                }
            }
            return inUse;
        }
    };
})();

DialogBoxManager.displayDialogBox({
    header: '<h3>title1</h3>',
    content: '<div>this is a content</div>',
    footer: '<div>this is a footer</div>'
});


/*
 这个管理器把已经创建出来的对话框对象保存在数组created中，以便于重用。numberInUse方法用于获取现有DialogBox对象中当前正被使用的对象的个数，它通过检查DialogBox对象的状态判断其是否正被使用。displayDialogBox方法会先检查这个数字是否等于数组的长度，并且只有在不能重用现有实例的情况下才创建新实例。

 这个示例比工具提示那个要复杂一点。总结起来就是：通过把外在数据从资源密集型对象剥离以实现对这种对象的重用；用一个管理器控制对象的个数并保存外在数据，所生成的实例的个数应该刚好够用，并且在实例化开销较大的情况下，这些实例应被保存起来供以后重用。这种技术类似于服务端语言中的SQL连接池。在后一种技术中，仅当现有连接都在使用当中时才会创建新连接。
 */


(function(){

    /**
     * 利用享元实现简单的引用计数和垃圾回收 TODO
     *
     * 实现引用计数的基本思路
     * 要实现引用计数，就在享元工厂中定义一个Map，它的key值与缓存享元对象的key是一样的，而value就是被引用的次数，这样当外部每次获取该享元的时候，就把对应的引用计数取出来加上1，然后再记录回去。
     *
     * 实现垃圾回收的基本思路
     * 1）为了确定哪些是垃圾，一个简单的方案，定义一个缓存对象的配置对象，在这个对象中描述了缓存的开始时间和最长不被使用的时间，这个时候判断是否垃圾的计算公式如下：当前的时间 - 缓存的开始时间 >= 最长不被使用的时间。当然，每次这个对象被使用的时候，就把那个缓存开始时间更新为使用时的当前时间，也就是说如果一直有人用的话，这个对象是不会被判断为垃圾。
     * 2）何时回收的问题，当然是判断出来是垃圾了就可以回收了。
     * 3)怎么回收？直接从缓存的Map对象中删除相应的对象，让这些对象没有引用的地方，那么这些对象就可以等着被回收了。
     */

    // 描述享元对象缓存的配置对象
    function CacheConfModel(){
        // 缓存开始计时的开始时间
        this.beginTime = null;
        this.durableTime = null;
        // 缓存对象需要被永久存储，也就是不需要从缓存中删除
        this.forever = false;
    }

    var flyweightFactory = {
        fsMap: {},
        cacheConfMap: {},
        countMap: {},
        DURABLE_TIME: 6 * 1000,
        init: function(){
            clearCache();
        },
        getUserTimes: function(key){
            var count = this.countMap[key];
            return count || 0;
        },
        getFlyweight: function(key){
            var f = this.fsMap[key], cm;

            if(f == null){
                f = new AuthorizationFlyweight(key);
                this.fsMap[key] = f;
                this.countMap[key] = 1;

                cm = new CacheConfModel();
                cm.beginTime = Date.now();
                cm.forever = false;
                cm.durableTime = this.DURABLE_TIME;

                this.cacheConfMap[key] = cm;
            } else {
                cm = this.cacheConfMap[key];
                cm.beginTime = Date.now();
                this.cacheConfMap[key] = cm;
                this.countMap[key]++;
            }

            return f;
        },
        removeFlyweight: function(key){
            delete this.fsMap[key];
            delete this.cacheConfMap[key];
            delete this.countMap[key];
        }
    };

    function UnsharedConcreteFlyweight(){
        this.list = [];
    }
    UnsharedConcreteFlyweight.prototype = {
        add: function(flyweight){
            this.list.push(flyweight);
        },
        match: function(securityEntity, permit){
            for(var i = 0; i < this.list.length; i++){
                var f = this.list[i];
                if(f.match(securityEntity, permit))
                    return true;
            }

            return false;
        }
    };

    function clearCache(){
        setInterval(function(){
            var tempSet = [];
            var set = Object.keys(flyweightFactory.cacheConfMap);

            for(var i = 0; i < set.length; i++){
                var key = set[i];
                var ccm = flyweightFactory.cacheConfMap[key];

                if(Date.now() - ccm.beginTime >= ccm.durableTime){
                    tempSet.push(key);
                }
            }

            for(i = 0; i < tempSet.length; i++){
                flyweightFactory.removeFlyweight(key);
            }

            console.log('now thread = ' + Object.keys(flyweightFactory.fsMap).length + ', fsMap = ' + Object.keys(flyweightFactory.fsMap));
        }, 1000);
    }

    var SecurityMgr = {
        hasPermit: function(user, securityEntity,
             permit){
            var col = this.queryByUser(user);

            if(!col || col.length === 0){
                console.log(user + '没有登录或是没有被分配任何权限');
                return false;
            }

            for(var i = 0; i < col.length; i++){
                var fm = col[i];
                if(fm.match(securityEntity, permit)){
                    return true;
                }
            }
            return false;
        },
        queryByUser: function(user){
            var col = [];

            for(var i = 0; i < DataBase.length; i++){
                var s = DataBase[i];
                var ss = s.split(',');

                if(ss[0] === user){
                    var fm;

                    if(ss[3] == 2){
                        fm = new UnsharedConcreteFlyweight();
                        var tempSs = DataBase[ss[1]];

                        for(var prop in tempSs){
                            var tempS = tempSs[prop];
                            fm.add(flyweightFactory.getFlyweight(tempS));
                        }
                    } else {
                        fm = flyweightFactory.getFlyweight(ss[1] + ',' + ss[2])
                    }

                    col.push(fm);
                }
            }

            return col;
        }
    };

    // mock data
    var DataBase = {
        colDB: [
            '张三,人员列表,查看,1',
            '李四,人员列表,查看,1',
            '李四,操作薪资数据,,2'
        ],
        mapDB: {
            '操作薪资数据': ''
        }
    };

    for (var i = 0; i < 3; i++) {
        DataBase.push('张三' + i + ',人员列表,查看');
    }


    new function(){
        var f1 = SecurityMgr.hasPermit('张三', '薪资数据', '查看');
        var f2 = SecurityMgr.hasPermit('李四', '薪资数据', '查看');
        var f3 = SecurityMgr.hasPermit('李四', '薪资数据', '修改');

        for(var i =0; i < 3; i++){
            SecurityMgr.hasPermit('张三' + i, '薪资数据', '查看');
        }

        console.log('薪资数据，查看 被引用了' + flyweightFactory.getUserTimes('薪资数据,查看' + '次'));
        console.log('薪资数据，修改 被引用了' + flyweightFactory.getUserTimes('薪资数据,修改' + '次'));
        console.log('人员列表，查看 被引用了' + flyweightFactory.getUserTimes('人员列表,查看' + '次'));
    };
}());

/**
 * 享元模式的适用场合
 *
 * 1.如果一个应用程序使用了大量的细粒度对象，可以使用享元模式来减少对象数量。
 * 2.如果由于使用大量的对象，造成很大的存储开销，可以使用享元模式来减少对象水昂，并节约内存。
 * 3.如果对象的大多数状态都可以转变为外部状态，比如通过计算得到，或是从外部传入等，可以使用享元模式来实现内部状态和外部状态的分离。
 * 4.如果不考虑对象的外部状态，可以用相对较少的共享对象取代很多组合对象，可以使用享元模式来共享对象，然后组合对象来使用这些共享对象。
 */

/**
 * 享元模式之利
 *
 * 减少对象数量，节省内存空间。
 *
 * 享元模式之弊
 *
 * 维护共享对象，需要额外开销。
 *
 * 你必须在运行效率和可维护性之间进行权衡，然而这种权衡正是工程学的精髓所在。享元模式适合的是系统资源已经用的差不多而且明显需要进行某种优化这样一类场合。这正是其利大于弊的时候。
 *
 *
 * 相关模式
 *
 * 享元模式与单例模式
 * 可以组合使用
 * 通常情况下，享元模式中的工厂可以实现成为单例。另外，享元工厂中缓存的享元对象，都是单例的，可以看成是单例模式的一种变形控制。
 *
 * 享元模式与组合模式
 * 可以组合使用
 * 在享元模式中，存在不需要共享的享元实现，这些不需要共享的享元通常是对共享的享元对象的组合对象。也就是说，享元模式通常会和组合模式组合使用，来实现更复杂的对象层次结构。
 *
 * 享元模式与状态模式
 * 可以组合使用
 * 可以使用享元模式来共享状态模式中的状态对象。通常在状态模式中，会存在数量很大的，细粒度的状态对象，而且它们基本上都是可以重复使用的，都是用来处理某一个固定的状态的，它们需要的数据通常都是由上下文传入，也就是变化部分都分离出去了，所以可以用享元模式来实现这些状态对象。
 *
 * 享元模式与策略模式
 * 可以组合使用
 * 同状态模式。
 */