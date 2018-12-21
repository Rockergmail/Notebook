/* Title: Chain of responsibility
 Description: delegates commands to a chain of processing objects
 */
 
const NO_TOPIC = -1;
var Topic;
 
class Handler {
    constructor(s, t) {
        this.successor = s || null;
        this.topic = t || 0;
    }

    handle () {
        console.log(this.has());
        if (this.successor) {
            this.successor.handle();
        }
        console.log(this.topic);
    }

    has () {
        return this.topic != NO_TOPIC;
    }
}

var _handle = Handler.prototype.handle;
 
var app = new Handler({
    handle:function () {
        console.log('app handle');
    }
}, 3);
 
var dialog = new Handler(app, 1);
//dialog.handle = function () {
//if (this.has()) {
//} else {
//console.log('dialog handle');
//_handle.call(this);
//}
//}
 
var button = new Handler(dialog, 2);
//button.handle = function () {
//if (this.has()) {
//} else {
//console.log('dialog handle');
//_handle.call(this);
//}
//}
 
button.handle();
 
// reference
// https://gist.github.com/1174982
 
 
 
