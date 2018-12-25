/**
 * 命令模式
 *
 * 定义：
 * 将一个请求封装为一个对象，从而使你可用不同的请求对客户进行参数化，对请求排队或记录请求日志，以及支持可撤销的操作。
 *
 * 本质：
 * 封装请求
 *
 * 命令模式是一种封装方法调用的方式。命令模式与普通函数所有不同。它可以用来对方法调用进行参数化处理和传送，经这样处理过的方法调用可以在任何需要的时候执行。它也可以用来消除调用操作的对象和实现操作对象之间的耦合，这位各种具体的类的更换带来了极大的灵活性。这种模式可以用在许多不同场合，不过它在创建用户界面这一方面非常有用，特别是在需要不受限的（unlimited）取消（undo）操作的时候，它还可以用来替代回调函数，因为它能够提高在对象之间传递的操作的模块化程度。
 *
 * 在命令模式中，会定义一个命令的接口，用来约束所有的命令对象，然后提供具体的命令实现，每个命令实现对象是对客户端某个请求的封装，对应于机箱上的按钮，一个机箱上可以有很多按钮，也就相当于会有多个具体的命令实现对象。
 * 在命令模式中，命令对象并不知道如何处理命令，会有相应的接收者对象来真正执行命令。就像电脑的例子，机箱上的按钮并不知道如何处理功能，而是把这个请求转发给主板，由主办来执行真正的功能，这个主板就相当于命令模式的接收者。
 * 在命令模式中，命令对象和接收者对象的关系，并不是与生俱来的，需要有一个装配的过程，命令模式中的Client对象可以实现这样的功能。这就相当于在电脑的例子中，有了机箱上的按钮，也有了主板，还需要一个连接线把这个按钮连接到主板上才行。
 * 命令模式还会提供一个Invoker对象来持有命令对象。就像电脑的例子，机箱上会有多个按钮，这个机箱就相当于命令模式的Invoker对象。这样一来，命令模式的客户端就可以通过Invoker来触发并要求执行相应的命令了，这也相当于真正的客户是按下机箱上的按钮来操作电脑一样。
 *
 * 命令模式的关键
 * 命令模式的关键之处就是把请求封装成对象，也就是命令对象，并定义了统一的执行操作的接口，这个命令对象可以被存储，转发，记录，处理，撤销等，整个命令模式都是围绕这个对象在进行。
 *
 * 命令模式的组装和调用
 * 在命令模式中经常会有一个命令的组装者，用它来维护命令的“虚”实现和真实实现之间的关系。如果是超级智能的命令，也就是说命令对象自己完全实现好了，不需要接收者，那就是命令模式的退化，不需要接受者，自然也不需要组装者了。
 * 而真正的用户就是具体化请求的内容，然后提交请求进行触发就可以了。真正的用户会通过Invoker来触发命令。
 * 在实际开发过程中，Client和Invoker可以融合在一起，由客户在使用命令模式的时候，先进行命令对象和接收者的组装，组装完成后，就可以调用命令执行请求。
 *
 * 命令模式的接收者
 * 接收者可以是任意的类，对它没有什么特殊要求，这个对象知道如何真正执行命令的操作，执行时是从Command的实现类里面转调过来。
 * 一个接收者对象可以处理多个命令，接收者和命令之间没有约定的对应关系。接收者提供的方法个数，名称，功能和命令中的可以不一样，只要能够通过调用接收者的方法来实现命令对应的功能就可以了。
 *
 * 命令模式的调用顺序
 * 使用命令模式的过程分成两个阶段，一个阶段是组装对象和接收者对象的过程，另外一个阶段是触发调用Invoker，来让命令真正的执行。
 * 组装过程：
 * 1.创建接收者对象。
 * 2.创建命令对象，设置命令对象和接收者对象的关系。
 * 3.创建Invoker对象。
 * 4.把命令对象设置到Invoker中，让Invoker持有命令对象。
 * 执行过程：
 * 1.调用Invoker的方法，触发要求执行命令。
 * 2.要求持有的命令对象只能执行功能。
 * 3.要求持有的接收者真正实现功能。
 *
 */

/*
 使用同样接口的所有命令对象都可以被同等对待，并且可以随意互换，这是命令模式的魅力之一。

 --> FIXME: 有其他模式，都是基于interface的，方便统一、随意互换。
 
 */

 /*
 所有使用命令模式的系统都有客户和调用者，但不一定有接收者。  -->  FIXME: 这不就成了 另外一种模式 我忘了名字。。？
 */

(function () {
    // 使用命令日志实现不可逆操作的取消
    /*
     在画布上画线很容易，不过要取消这条线的绘制是不可能的。从一个点到另一个点的移动这种操作具有精确的对立操作，执行后者的结果看起来就像前者被逆转了一样。但是对于从A到B画一条线这种操作，从B到A再画一条线是无法逆转前一操作的，这只不过是在第一条线的上方又画一条线而已。

     取消这种操作的唯一办法是清除状态，然后把之前执行过的操作（不含最近那个）一次重做一遍。这很容易办到，为此需要把所有执行过的命令记录在栈中。要想取消一个操作，需要做的就是从栈中弹出最近那个命令并弃之不用，然后清理画布并从头开始重新执行记录下来的所有命令。
     */

    // Movement commands
    var MoveUp = function (cursor) {
        this.cursor = cursor;
    };
    MoveUp.prototype = {
        execute: function () {
            this.cursor.move(0, -10);
        }
    };

    var MoveDown = function (cursor) {
        this.cursor = cursor;
    };
    MoveDown.prototype = {
        execute: function () {
            this.cursor.move(0, 10);
        }
    };

    var MoveLeft = function (cursor) {
        this.cursor = cursor;
    };
    MoveLeft.prototype = {
        execute: function () {
            this.cursor.move(-10, 0);
        }
    };

    var MoveRight = function (cursor) {
        this.cursor = cursor;
    };
    MoveRight.prototype = {
        execute: function () {
            this.cursor.move(10, 0);
        }
    };

    // Cursor class, with an internal command stack
    var Cursor = function (width, height, parent) {
        this.width = width;
        this.height = height;
        this.commandStack = [];

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        parent.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.ctx.strokeStyle = '#cc0000';
        this.move(0, 0);
    };
    Cursor.prototype = {
        move: function (x, y) {
            var that = this;
            this.commandStack.push(function () {
                that.lineTo(x, y);
            });
            this.executeCommands();
        },
        lineTo: function (x, y) {
            this.position.x += x;
            this.position.y += y;
            this.ctx.lineTo(this.position.x, this.position.y);
        },
        executeCommands: function () {
            this.position = {
                x: this.width / 2,
                y: this.height / 2
            };
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.beginPath();
            this.ctx.moveTo(this.position.x, this.position.y);
            for (var i = 0, len = this.commandStack.length; i < len; i++) {
                this.commandStack[i]();
            }
            this.ctx.stroke();
        },
        undo: function () {
            this.commandStack.pop();
            this.executeCommands();
        }
    };

    // UndoButton class
    var UndoButton = function (label, parent, cursor) {
        this.element = document.createElement('button');
        this.element.innerHTML = label;
        parent.appendChild(this.element);
        addEvent(this.element, 'click', function () {
            cursor.undo();
        });
    };
    // CommandButton class
    var CommandButton = function (label, command, parent) {
        this.element = document.createElement('button');
        this.element.innerHTML = label;
        parent.appendChild(this.element);

        addEvent(this.element, 'click', function () {
            command.execute();
        });
    };

    var body = document.body;
    var cursor = new Cursor(400, 400, body);

    var upCommand = new MoveUp(cursor);
    var downCommand = new MoveDown(cursor);
    var leftCommand = new MoveLeft(cursor);
    var rightCommand = new MoveRight(cursor);

    var upButton = new CommandButton('Up', upCommand, body);
    var downButton = new CommandButton('Down', downCommand, body);
    var leftButton = new CommandButton('Left', leftCommand, body);
    var rightButton = new CommandButton('Right', rightCommand, body);
    var undoButton = new UndoButton('Undo', body, cursor);
}());

(function () {
    // 宏命令
    /*
     去饭店吃饭过程。

     客户： 只负责发出命令，就是点菜操作。
     命令对象： 就是点的菜。
     服务员： 知道真正的接收者是谁，同时持有菜单，当你点菜完毕，服务员就启动命令执行。
     后厨， 凉菜部： 相当于接收者。

     菜单命令包含多个命令对象
     */

    // 坐热菜的厨师
    var HotCook = function () {
    };
    HotCook.prototype = {
        cook: function (name) {
            console.log('本厨师正在做：' + name);
        }
    };

    // 做凉菜的厨师
    var CoolCook = function () {
    };
    CoolCook.prototype = {
        cook: function (name) {
            console.log('凉菜' + name + '已经做好，本厨师正在装盘。');
        }
    }

    // 定义了三道菜，每道菜是一个命令对象

    var DuckCommand = function () {
        this.cookApi = null;
    };
    DuckCommand.prototype = {
        constructor: DuckCommand,
        setCookApi: function (cookApi) {
            this.cookApi = cookApi;
        },
        execute: function () {
            this.cookApi.cook('北京烤鸭');
        }
    };

    var ChopCommand = function () {
        this.cookApi = null;
    };
    ChopCommand.prototype = {
        constructor: ChopCommand,
        setCookApi: function (cookApi) {
            this.cookApi = cookApi;
        },
        execute: function () {
            this.cookApi.cook('绿豆排骨煲');
        }
    };

    var PorkCommand = function () {
        this.cookApi = null;
    };
    PorkCommand.prototype = {
        constructor: PorkCommand,
        setCookApi: function (cookApi) {
            this.cookApi = cookApi;
        },
        execute: function () {
            this.cookApi.cook('蒜泥白肉');
        }
    };

    // 菜单对象，宏命令对象
    var MenuCommand = function () {
        var col = [];

        this.addCommand = function (cmd) {
            col.push(cmd);
        };

        this.execute = function () {
            for (var i = 0 , len = col.length; i < len; i++) {
                col[i].execute();
            }
        };
    };

    // 服务员，负责组合菜单，负责组装每个菜和具体的实现者。
    var Waiter = function () {
        var menuCommand = new MenuCommand();

        // 客户点菜
        this.orderDish = function (cmd) {
            var hotCook = new HotCook();
            var coolCook = new CoolCook();

            if (cmd instanceof DuckCommand) {
                cmd.setCookApi(hotCook);
            } else if (cmd instanceof ChopCommand) {
                cmd.setCookApi(hotCook);
            } else if (cmd instanceof PorkCommand) {
                cmd.setCookApi(coolCook);
            }

            menuCommand.addCommand(cmd);
        };

        // 点菜完毕
        this.orderOver = function () {
            menuCommand.execute();
        };
    };

    var waiter = new Waiter();
    var chop = new ChopCommand();
    var duck = new DuckCommand();
    var pork = new PorkCommand();

    waiter.orderDish(chop);
    waiter.orderDish(duck);
    waiter.orderDish(pork);

    waiter.orderOver();

}());

(function () {
    // 队列请求

    function createCommand(name) {
        function Command(tableNum) {
            this.cookApi = null;
            this.tableNum = tableNum;
        }

        Command.prototype = {
            setCookApi: function (cookApi) {
                this.cookApi = cookApi;
            },
            execute: function () {
                this.cookApi.cook(this.tableNum, name);
            }
        };

        return Command;
    }

    var ChopCommand = createCommand('绿豆排骨煲');
    var DuckCommand = createCommand('北京烤鸭');

    var CommandQueue = {
        cmds: [],
        addMenu: function (menu) {
            var cmds = menu.getCommands();
            for (var i = 0, len = cmds.length; i < len; i++) {
                this.cmds.push(cmds[i]);
            }
        },
        getOneCommand: function () {
            return this.cmds.length ? this.cmds.shift() : null;
        }
    };

    var MenuCommand = function () {
        this.col = [];
    };
    MenuCommand.prototype = {
        addCommand: function (cmd) {
            this.col.push(cmd);
        },
        setCookApi: function (cookApi) {
        },
        getTableNum: function () {
            return 0;
        },
        getCommands: function () {
            return this.col;
        },
        execute: function () {
            CommandQueue.addMenu(this);
        }
    };

    var HotCook = function (name) {
        this.name = name;
    };
    HotCook.prototype = {
        cook: function (tableNum, name) {
            var cookTime = parseInt(10 * Math.random() + 3);
            console.log(this.name + '厨师正在为' + tableNum + '号桌做：' + name);

            var me = this;
            setTimeout(function () {
                console.log(me.name + '厨师为' + tableNum + '号桌做好了：' + name + '，共计耗时=' + cookTime + '秒');
            }, cookTime * 1000);
        },
        run: function () {
            var me = this;
            setTimeout(function () {
                var cmd;

                while ((cmd = CommandQueue.getOneCommand())) {
                    cmd.setCookApi(me);
                    cmd.execute();
                }
            }, 1000);
        }
    };

    var Waiter = function () {
        this.menuCommand = new MenuCommand();
    };
    Waiter.prototype = {
        orderDish: function (cmd) {
            this.menuCommand.addCommand(cmd);
        },
        orderOver: function () {
            this.menuCommand.execute();
        }
    };

    var c1 = new HotCook('张三');
    c1.run();

    for (var i = 0; i < 5; i++) {
        var waiter = new Waiter();
        var chop = new ChopCommand(i);
        var duck = new DuckCommand(i);

        waiter.orderDish(chop);
        waiter.orderDish(duck);

        waiter.orderOver();
    }

}());

function test() {
    // 日志请求
    // TODO 该示例在写入文件内容的时候并不能把实例的原型对象序列化，
    // 因此读取文件内容后，反序列化后没有原型对应的方法
    var fs = require('fs');
    var Promise = require('d:\\node\\node_modules\\rsvp');

    var FileOpeUtil = {
        readFile: function (pathName) {
            var def = Promise.defer();

            fs.open(pathName, 'r', function opened(err, fd) {
                if (err) {
                    def.reject();
                    fs.close(fd);
                    throw err;
                }

                var readBuffer = new Buffer(1024);
                var bufferOffset = 0;
                var bufferLength = readBuffer.length;
                var filePosition = null;

                fs.read(
                    fd,
                    readBuffer,
                    bufferOffset,
                    bufferLength,
                    filePosition,
                    function read(err, readBytes) {
                        if (err) {
                            def.reject(err);
                            fs.close(fd);
                            return;
                        }

                        if (readBytes >= 0) {
                            try {
                                def.resolve(JSON.parse(readBuffer.slice(0, readBytes).toString('utf8')));
                            } catch (e) {
                                def.reject(e);
                            }

                            fs.close(fd);
                        }
                    }
                );
            });

            return def.promise;
        },
        writeFile: function (pathName, list) {
            var def = Promise.defer();

            fs.open(pathName, 'w', function opened(err, fd) {
                if (err) {
                    def.reject();
                    fs.close(fd);
                    throw err;
                }

                var writeBuffer = new Buffer(JSON.stringify(list));
                var bufferPosition = 0;
                var bufferLength = writeBuffer.length;
                var filePosition = null;

                fs.write(
                    fd,
                    writeBuffer,
                    bufferPosition,
                    bufferLength,
                    filePosition,
                    function wrote(err, written) {
                        if (err) {
                            def.reject(err);
                            fs.close(fd);
                            return;
                        }

                        console.log('wrote ' + written + ' bytes');
                        def.resolve(written);
                        fs.close(fd);
                    }
                );
            });

            return def.promise;
        }
    };

    function createCommand(name) {
        function Command(tableNum) {
            this.cookApi = null;
            this.tableNum = tableNum;
        }

        Command.prototype = {
            setCookApi: function (cookApi) {
                this.cookApi = cookApi;
            },
            execute: function () {
                this.cookApi.cook(this.tableNum, name);
            }
        };

        return Command;
    }

    var ChopCommand = createCommand('绿豆排骨煲');
    var DuckCommand = createCommand('北京烤鸭');

    var MenuCommand = function () {
        this.col = [];
    };
    MenuCommand.prototype = {
        addCommand: function (cmd) {
            this.col.push(cmd);
        },
        setCookApi: function (cookApi) {
        },
        getTableNum: function () {
            return 0;
        },
        getCommands: function () {
            return this.col;
        },
        execute: function () {
            CommandQueue.addMenu(this);
        }
    };

    var HotCook = function (name) {
        this.name = name;
    };
    HotCook.prototype = {
        cook: function (tableNum, name) {
            var cookTime = parseInt(10 * Math.random() + 3);
            console.log(this.name + '厨师正在为' + tableNum + '号桌做：' + name);

            var me = this;
            setTimeout(function () {
                console.log(me.name + '厨师为' + tableNum + '号桌做好了：' + name + '，共计耗时=' + cookTime + '秒');
            }, cookTime * 1000);
        },
        run: function () {
            var me = this;
            setTimeout(function () {
                var cmd;

                while ((cmd = CommandQueue.getOneCommand())) {
                    cmd.setCookApi(me);
                    cmd.execute();
                    break;
                }
            }, 1000);
        }
    };

    var Waiter = function () {
        this.menuCommand = new MenuCommand();
    };
    Waiter.prototype = {
        orderDish: function (cmd) {
            this.menuCommand.addCommand(cmd);
        },
        orderOver: function () {
            this.menuCommand.execute();
        }
    };


    var CommandQueue = {
        cmds: [],
        addMenu: function (menu) {
            var cmds = menu.getCommands();
            for (var i = 0, len = cmds.length; i < len; i++) {
                this.cmds.push(cmds[i]);
            }
            FileOpeUtil.writeFile('./test.txt', this.cmds);
        },
        getOneCommand: function () {
            var cmd = null;

            if (this.cmds.length) {
                cmd = this.cmds.shift();
                FileOpeUtil.writeFile('./test.txt', this.cmds);
            }

            return cmd;
        }
    };

    var FILE_NAME = './test.txt';

    FileOpeUtil.readFile(FILE_NAME)
        .then(function (data) {
            console.log(data);
            data.map(function () {

            });

            CommandQueue.cmds = data;
            main();
        }, function () {
            main();
        });

    function main() {
        var c1 = new HotCook('张三');
        c1.run();

        for (var i = 0; i < 5; i++) {
            var waiter = new Waiter();
            var chop = new ChopCommand(i);
            var duck = new DuckCommand(i);

            waiter.orderDish(chop);
            waiter.orderDish(duck);

            waiter.orderOver();
        }
    }
}

/*
 用于崩溃恢复的命令日志

 命令日志的一个有趣的用途是在程序崩溃后恢复其状态。在前面这个示例中，可以用XHR把经过序列化处理的命令记录到服务器上。用户下次访问该网页的时候，系统可以找出这些命令并用其将画布上的图案精确恢复到浏览器关闭时的状态。这可以替用户把应用程序状态保管下来，以便其撤销先前的任何一次浏览器会话中执行的操作。如果应用系统比较复杂，那么这种类型的命令日志会很大的存储需求。为此你可以提供一个按钮，用户可以用它提交到当时为止的所有操作，从而清空命令栈。
 */

/*
 命令模式的适用场合

 1.如果需要抽象出需要执行的动作，并参数化这些对象，可以选用命令模式。将这些需要执行的动作抽象成为命令，然后实现命令的参数化配置。
 2.如果需要在不同的时刻指定，排列和执行请求。将这些请求封装成为命令对象，然后实现请求队列化。
 3.如果需要支持取消操作，可以选用，通过管理命令对象，能很容易的实现命令的恢复和重做功能。
 4.如果需要支持当系统奔溃时，能将系统的操作功能重新执行一遍时。将这些操作功能的请求封装成命令对象，然后实现日志命令，就可以在系统恢复以后，通过日志获取命令列表，从而重新执行一遍功能。
 5.在需要事务的系统中，命令模式提供了对事务进行建模的方法。


 命令模式之利

 1.更松散的耦合
 命令模式使得发起命令的对象--客户端，和具体实现命令的对象--接收者对象完全解耦，也就是说发起命令的对象完全不知道具体实现对象是谁，也不知道如何实现。
 2.更动态的控制
 命令模式把请求封装起来，可以动态地对它进行参数化，队列花和日志化等操作，从而使得系统更灵活。
 3.很自然的复合命令
 很容易地组合符合命令，也就是宏命令。
 4.更好的扩展性
 


 命令模式之弊

 如果一个命令对象只包装了一个方法调用，而且其唯一目的就是这层对象包装的话，那么这种做法是一种浪费。如果你不需要命令模式给予的任何额外特性，也不需要具有一致接口的类所带来的模块性，那么直接使用方法引用而不是完整的命令对象也许更恰当。命令对象也会增加代码调试的难度，因为在应用了命令模式之后原有的方法之上又多了一层可能出错的代码。


 相关模式

 命令模式和组合模式
 可以组合使用
 宏命令的功能就可以使用组合模式。

 命令模式和备忘录模式
 可以组合使用
 在实现可撤销功能时，如果采用保存命令执行前的状态，撤销的时候就把状态恢复，就可以考虑使用备忘录模式。

 命令模式和模板方法模式
 命令模式可以作为模板方法的一种替代模式，也就是说命令模式可以模仿实现模板方法模式的功能。
 */


/* Title: Command
 Description: creates objects which encapsulate actions and parameters
 */

(function () {

    var CarManager = {

        /* request information */
        requestInfo: function (model, id) {
            return 'The purchase info for ' + model + ' with ID ' + id + ' is being processed...';
        },

        /* purchase the car */
        buyVehicle: function (model, id) {
            return 'You have successfully purchased Item ' + id + ', a ' + model + '.';
        }

    };

    CarManager.execute = function (commad) {
        return CarManager[commad.request](commad.model, commad.carID);
    };

    var actionA = CarManager.execute({request: 'requestInfo', model: 'Ford Mondeo', carID: '543434'});
    console.log(actionA);
    var actionB = CarManager.execute({request: 'buyVehicle', model: 'Ford Mondeo', carID: '543434'});
    console.log(actionB);

})();

