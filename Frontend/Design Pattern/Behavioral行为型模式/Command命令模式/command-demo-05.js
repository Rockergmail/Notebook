// http://www.joezimjs.com/javascript/javascript-design-patterns-command/

// Command
class EnableAlarm {
    constructor(alarm) {
        this.alarm = alarm;
    }
    execute() {
        this.alarm.enable();
    }
}

// Command
class DisableAlarm {
    constructor(alarm) {
        this.alarm = alarm;
    }
    execute() {
        this.alarm.disable();
    }
}

// Command
class ResetAlarm {
    constructor(alarm) {
        this.alarm = alarm;
    }
    execute() {
        this.alarm.reset();
    }
}

// Command
class SetAlarm {
    constructor(alarm) {
        this.alarm = alarm;
    }
    execute() {
        this.alarm.set();
    }
}

// receiver
var alarms = [/* array of alarms */],
    i = 0, len = alarms.length;

for (; i < len; i++) {
    var enable_alarm = new EnableAlarm(alarms[i]),
        disable_alarm = new DisableAlarm(alarms[i]),
        reset_alarm = new ResetAlarm(alarms[i]),
        set_alarm = new SetAlarm(alarms[i]);

    // invoker
    new Button('enable', enable_alarm);
    new Button('disable', disable_alarm);
    new Button('reset', reset_alarm);
    new Button('set', set_alarm);
}

/**
 * 闭包方式

var makeEnableCommand = function (alarm) {
    return function () {
        alarm.enable();
    }
}

var makeDisableCommand = function (alarm) {
    return function () {
        alarm.disable();
    }
}

var makeResetCommand = function (alarm) {
    return function () {
        alarm.reset();
    }
}

var makeSetCommand = function (alarm) {
    return function () {
        alarm.set();
    }
}
 */