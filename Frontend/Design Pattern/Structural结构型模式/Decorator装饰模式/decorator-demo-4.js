
/* Title: Decorator
Description: dynamically adds/overrides behaviour in an existing method of an object
*/

var tree = {};
tree.decorate = function () {
    console.log('Make sure the tree won\'t fall');
};

tree.getDecorator = function (deco) {
    tree[deco].prototype = this;
    // console.log(tree[deco].prototype);
    /*
     tree
     tree.BlueBalls
     tree.Angel
     */
    return new tree[deco];
};

tree.RedBalls = function () {
    this.decorate = function () {
        this.RedBalls.prototype.decorate();
        console.log(this.RedBalls.prototype.decorate);
        /*
         function () {
         this.Angel.prototype.decorate();
         console.log(this.Angel.prototype.decorate);
         console.log('An angel on the top');
         }
         */
        console.log('Put on some red balls');
    }
};

tree.BlueBalls = function () {
    this.decorate = function () {
        this.BlueBalls.prototype.decorate();
        //console.log(this.BlueBalls.prototype.decorate);
        /*
         function () {
         console.log('Make sure the tree won\'t fall');
         }
         */
        console.log('Add blue balls');
    }
};

tree.Angel = function () {
    this.decorate = function () {
        this.Angel.prototype.decorate();
        //console.log(this.Angel.prototype.decorate);
        /*
         this.BlueBalls.prototype.decorate();
         console.log(this.BlueBalls.prototype.decorate);
         console.log('Add blue balls');
         */
        console.log('An angel on the top');
    }
};

console.log(tree);

tree = tree.getDecorator('BlueBalls');
tree = tree.getDecorator('Angel');
tree = tree.getDecorator('RedBalls');

tree.decorate();