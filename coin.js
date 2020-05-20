function Basic()
{
    this.x=0;
    this.y=0;
    this.dom=null;//=$('');
    this.speed = 1;
    this.point=1;

    var thisObj = this;
    thisObj.update = function () {

        console.log('bbb');
        thisObj.x += thisObj.speed;
    }

    thisObj.collision = function () {
        if (true/* cup */) {
            Total += thisObj.point;
            thisObj.Y = 0;
        }

        if (thisObj.Y > 10) {
            thisObj.Y = 0;
        }
    };
}

function coin()
{
    //繼承Basic
    this.prototype = Object.create(Basic.prototype);
    Basic.call(this);
}

function star()
{
    //繼承Basic
    this.prototype = Object.create(Basic.prototype);
    Basic.call(this);

    this.point=10;
    this.aaa=5;

    this.sss=function(){
        
    };
}

function rock() {

    //繼承Basic
    this.prototype = Object.create(Basic.prototype);
    Basic.call(this);

    var ThisRock=this;
    ThisRock.point=-1;

    ThisRock.update=function(){
        ThisRock.x += ThisRock.speed*0.5;
    };
}

function Cup()
{
    //繼承Basic
    this.prototype = Object.create(Basic.prototype);
    Basic.call(this);
}

var arr=[];
var Total=0;    //總分

for (var i = 0; i < 25; i++) {
    arr[arr.length] = new coin();
}
for (var i = 0; i < 5; i++) {
    arr[arr.length] = new star();
}
for (var i = 0; i < 5; i++) {
    arr[arr.length] = new rock();
}

function dropdown()
{
    //frame

    //upate
    for (var i = 0; i < 30; i++) {
        arr[i].update();
    }

    //collision
    for (var i = 0; i < 30; i++) {
        arr[i].collision();
    }

    //
}