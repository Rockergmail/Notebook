
/**
 * 示例：Web 日历
 *
 * 为了演示用组合对象来保存外在状态的具体做法，下面我们要创建一个Web日历。首先实现的是一个未经优化的，未使用享元的版本。这是一个大型组合对象，位于最顶层的是代表年份的组合对象。它封装着代表月份的组合对象，而后者又封装着代表日期的叶对象。这是一个简单的例子，它会按顺序显示每月中的各天，还会按顺序显示一年中的各个月：
 */

(function () {

    // CalendarYear class, a composite
    var CalendarYear = function (year, parent) {
        // implements CalendarItem
        this.year = year;
        this.element = document.createElement('div');
        this.element.className = 'year';
        this.element.style.display = 'none';
        var title = document.createElement('h4');
        title.appendChild(document.createTextNode(year));
        parent.appendChild(this.element).appendChild(title);

        function isLeapYear(y) {
            return (y > 0) && !(y % 4) && ((y % 100) || !(y % 400));
        }

        this.months = [];
        // The number of days in each month.
        this.numDays = [31, isLeapYear(this.year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        for (var i = 0; i < 12; i++) {
            this.months[i] = new CalendarMonth(i + 1, this.numDays[i], this.element);
        }
    };
    CalendarYear.prototype = {
        display: function () {
            for (var i = 0, len = this.months.length; i < len; i++) {
                // Pass the call down to the next level
                this.months[i].display();
            }
            this.element.style.display = 'block';
        }
    };


    // CalendarMonth class, a composite
    var CalendarMonth = function (monthNum, numDays, parent) {
        // implements CalendarItem
        this.monthNum = monthNum;
        this.element = document.createElement('div');
        this.element.className = 'month';
        this.element.style.display = 'none';
        var title = document.createElement('h5');
        title.appendChild(document.createTextNode(monthNum));
        parent.appendChild(this.element).appendChild(title);

        this.days = [];
        for (var i = 0; i < numDays; i++) {
            this.days[i] = new CalendarDay(i + 1, this.element);
        }
    };
    CalendarMonth.prototype = {
        display: function () {
            for (var i = 0, len = this.days.length; i < len; i++) {
                this.days[i].display();
            }
            this.element.style.display = 'block';
        }
    };


    // CalendarDay class, a leaf
    var CalendarDay = function (date, parent) {
        // implements CalendarItem
        this.date = date;
        this.element = document.createElement('div');
        this.element.className = 'day';
        this.element.style.display = 'none';
        parent.appendChild(this.element);
    };
    CalendarDay.prototype = {
        display: function () {
            this.element.style.display = 'block';
            this.element.innerHTML = this.date;
        }
    };

    var input1 = document.getElementsByTagName('input')[0];
    input1.year = 2012;
    input1.onclick = function () {
        var a = new CalendarYear(this.year, document.getElementById('calendar-container'));
        a = new MethodProfiler(a);
        a.display();
        ++this.year;
    };

})();
/*
 这段代码的问题在于，你不得不为每一年创建365个CalendarDay对象。要创建一个显示10年的日历，需要实力花几千个CalendarDay对象。这些对象固然不大，但是无论什么类型的对象，如果其数目如此之多的话，都会给浏览器带来资源压力。更有效的做法是无论日历要显示多少年，都只用一个CalendarDay对象来代表所有日期。
 */

/*
 把日期对象转化为享元
 把CalendarDay对象转化为享元对象的过程很简单。首先，修改CalendarDay类本身，出去其中保存的所有数据，让这些数据（日期和父元素）成为外在数据：
 */
(function () {

    // CalendarYear class, a composite
    var CalendarYear = function (year, parent) {
        this.year = year;
        this.element = document.createElement('div');
        this.element.className = 'year';
        var title = document.createElement('h4');
        title.appendChild(document.createTextNode(year));
        parent.appendChild(this.element).appendChild(title);

        function isLeapYear(y) {
            return (y > 0) && !(y % 4) && ((y % 100 || !(y % 400)));
        }

        this.months = [];
        this.numDays = [31, isLeapYear(this.year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        for (var i = 0; i < 12; i++) {
            this.months[i] = new CalendarMonth(i + 1, this.numDays[i], this.element);
        }
    };
    CalendarYear.prototype = {
        display: function () {
            for (var i = 0, len = this.months.length; i < len; i++) {
                this.months[i].display();
            }
            this.element.style.display = 'block';
        }
    };

    // CalendarMonth class, a composite
    var CalendarMonth = function (monthNum, numDays, parent) {
        this.monthNum = monthNum;
        this.element = document.createElement('div');
        this.element.className = 'month';
        this.element.style.display = 'none';
        var title = document.createElement('h5');
        title.appendChild(document.createTextNode(monthNum));
        parent.appendChild(this.element).appendChild(title);

        this.days = [];
        for (var i = 0; i < numDays; i++) {
            /**------------------------------------**/
            this.days[i] = calendarDay;
            /**------------------------------------**/
        }
    };
    CalendarMonth.prototype = {
        display: function () {
            for (var i = 0, len = this.days.length; i < len; i++) {
                /**------------------------------------**/
                this.days[i].display(i + 1, this.element);
                /**------------------------------------**/
            }
            this.element.style.display = 'block';
        }
    };

    // CalendarDay class, a leaf
    /**------------------------------------**/
    var CalendarDay = function () {
    };
    CalendarDay.prototype = {
        display: function (date, parent) {
            var element = document.createElement('div');
            element.className = 'day';
            parent.appendChild(element);
            element.innerHTML = date;
        }
    };

    /*
     接下来，创建日期对象的单个实例。所有CalendarMonth对象中都要使用这个实例。这里本来也可以像第一个示例那样使用工厂来创建该类的实例，不过，因为这个类只需要创建一个实例，所以直接实例化它就行了：
     */
    // Single instance of CalendarDay
    var calendarDay = new CalendarDay();
    /**------------------------------------**/

    var input1 = document.getElementsByTagName('input')[1];
    input1.year = 2012;
    input1.onclick = function () {
        var a = new CalendarYear(this.year, document.getElementById('calendar-container'));
        a = new MethodProfiler(a);
        a.display();
        ++this.year;
    };
    /*
     现在外在数据成了display方法的参数，而不是类的构造函数的参数。这是享元的典型工作方式。因为在此情况下有些（或全部）数据被曝存在对象之外，要想实现与之前同样的功能就必须把他们提供给各个方法。
     最后，CalendarMonth类也要略作修改。原来用CalendarDay类构造函数创建该类实例的那个表达式被替换为calendarDay对象，而那些原本提供给CalendarDay类构造函数的参数现在被转而提供给display方法。
     */
})();

/*
 外在数据保存在哪里
 本例没有像前面的例子那样使用一个中心数据库来保存所有从享元对象剥离的数据。实际上，其他类基本上没做什么修改，CalendarYear根本没改，而CalendarMonth只改了两行。这都是因为组合对象的结构本身就已经包含了所有的外在数据。由于月份对象中的所有日期对象被一次存放在一个数组中，所以它知道每一个日期对象的状态，从CalendarDay构造函数中剔除的两种数据都已经存在于CalendarMonth对象中。

 这就是组合模式与享元模式配合得如此完美的原因。组合对象通常拥有大量叶对象，它还保存着许多可作为外在数据处理的数据。也对象通常只包含极少的内在数据，所以很容易被转化为共享资源。
 */