//遊戲開關
var d1;
function startgame(){
    $('#startButton').css('display','none');
    d1 = new Date().getTime();
    console.log(d1);
    circle();
    countdown();
}

//循環生產
var circletime;
function circle(){
    circletime = setTimeout(()=>{
        for(i = 0;i < 5;i++){
            generate();
        }
        circle();
    },1000);
}
function stopcircle(){
    clearTimeout(circletime);
}

//倒數計時
var time = 31;
function countdown(){
    window.requestAnimationFrame(countdown);
    if(new Date().getTime()-d1 < time*1000 ){
        document.getElementById('timecount').innerHTML=parseInt((time*1000-(new Date().getTime()-d1))/1000);
        //console.log(new Date().getTime()-d1);
        for( i=0 ;i < arr.length ; i++)
        {
            arr[i].y += arr[i].speed;
            update(arr[i]);
            collision(arr[i]);
        }
    }
    else{
        stopcircle();
        for( i=0 ;i < arr.length ; i++)
        {
            arr[i].y += arr[i].speed;
            update(arr[i]);
            collision(arr[i]);
        }
    }    
}

//壺 左右移動
var windoWidth = $(window).width();
var potImgWidth = parseInt($('#pot').css('width'));
var x;//用於視窗寬減壺寬
var Item = $('#pot');
var ItemPosition = parseInt(Item.css('left'));
var keyleft = false,keyright = false;
setInterval(()=>{
    if(keyleft==true){
        //console.log(ItemPosition);
        if(ItemPosition >= 20){
            ItemPosition = ItemPosition -= 10;
            Item.css('left',ItemPosition);
        }
    }
    else if(keyright == true){
        //console.log(ItemPosition);
        x = windoWidth-potImgWidth;
        if(ItemPosition < x){
            ItemPosition = ItemPosition += 10;
            Item.css('left',ItemPosition);
        }
    }
},25);
$( document ).keydown(function() {
    var keycode = event.which;
    switch(keycode){
        case 37:
            keyleft = true;
            break;
        case 39:
            keyright = true;
            break;
    }
});
$( document ).keyup(function(){
    keyleft = false;
    keyright = false;
});


//隨機生成金幣和落下速度
var newcoin;//生成金幣
var randomcoinposition; //金幣隨機位置
var coin;
var idcount= 0;//金幣id
var coincount = 180;//金幣總數量
var arrallspeed = new Array();//金幣隨機速度
var arr = new Array();
function generate(){
    randomcoinposition = Math.floor(Math.random()*windoWidth-45);
    if(randomcoinposition < 0){
        randomcoinposition = 20;
    }
    randomspeed = Math.floor(Math.random()*2.5)+2.5;    
    var newcoin = $('<div></div>').attr('id','coin'+idcount).addClass('coin').css('left',randomcoinposition+'px');
    idcount +=1;
    $('.boardImg').after(newcoin);
    arr[arr.length] = {
        object: newcoin,
        speed: randomspeed,
        x: randomcoinposition,
        y: -45
    };
}
//console.log(arr,arrallspeed);

//金幣落下
var windowHight = $(window).height();
function update(arrCoin){    
    arrCoin.object.css('top',arrCoin.y+'px');
    if(parseInt(arrCoin.object.css('top')) > windowHight){
        arrCoin.object.remove();
    }
}

//金幣與壺碰撞
function collision(arrCoin){
    var coinX,coinY,potX,potY;

    potX = parseInt($('#pot').css('left'));
    potY = parseInt($('#pot').css('top'));
    coinX = parseInt(arrCoin.x);
    coinY = parseInt(arrCoin.y);

    if(coinX+20 < potX + 96 && coinX + 25 > potX +32  && coinY < potY+1  && 45 + coinY > potY){
        arrCoin.object.remove();
        score();
    }
}

//計分
var add = parseInt(document.getElementById('count').innerHTML);
function score(){
    add += 1;
    document.getElementById('count').innerHTML = add;
}