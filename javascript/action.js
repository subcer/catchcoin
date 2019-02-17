//遊戲開關
var d1;
function startgame(){
    $('#startButton').css('display','none');
    d1 = new Date().getTime();
    console.log(d1);
    for(i = 0; i < 10 ; i++){        
        generate();
    }
    console.log(arr);
    
}

//倒數計時
var time = 5;
var controlcoin = 0; //控制金幣掉落順序
function countdown(){    
    window.requestAnimationFrame(countdown);
    if(new Date().getTime()-d1 < time*1000 ){
        document.getElementById('timecount').innerHTML=time*1000-(new Date().getTime()-d1);
        console.log(new Date().getTime()-d1);
        for( i=0 ;i < arr.length ; i++)
        {
            arr[i].y += arr[i].speed;
            update(arr[i]);            
        }      

        droptest();
        collision();
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
        console.log(ItemPosition);
        if(ItemPosition >= 20){            
            ItemPosition = ItemPosition -= 20;
            Item.css('left',ItemPosition);
        }
    }
    else if(keyright == true){
        console.log(ItemPosition);
        x = windoWidth-potImgWidth;
        if(ItemPosition < x){            
            ItemPosition = ItemPosition += 20;
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
    randomcoinposition = Math.floor(Math.random()*windoWidth);
    randomspeed = Math.floor(Math.random()*2.5)+2.5;

    var newcoin = $('<div></div>').attr('id','coin'+idcount).addClass('coin').css('left',randomcoinposition+'px');
    $('.boardImg').after(newcoin);
    arr[arr.length] = {
        object: newcoin,
        speed: randomspeed,
        x: randomcoinposition,
        y: -45
    };    
}
console.log(arr,arrallspeed);

//金幣落下
var windowHight = $(window).height();
function update(arrCoin){
    /*console.log(arrCoin);
    console.log(idcount);*/
    // let coinPostion = parseInt(arrCoin.css('top'));
    // if(coinPostion <= windowHight){            
    //     coinPostion += arrCointSpeed;
    //     arrCoin.css('top',coinPostion+'px');
    // }
    // else{
    //     arrCoin.remove();
    // }    
    arrCoin.object.css('top',arrCoin.y+'px');
}

function droptest(){
    var tt = parseInt($('#cointest').css('top'));
    
    if(tt <= windowHight)
    {
        tt += 20;
        $('#cointest').css('top',tt);
    }
    else{
        $('#cointest').remove();
    }

}

function collision(){
    var coinX,coinY;
    var potX,potYrange;
    var potImgHeight = parseInt($('#pot').css('height'));
    var winpotDistance = windowHight - potImgHeight;
    
    potX = parseInt($('#pot').css('left'));
    potY = parseInt($('#pot').css('top'));
    //console.log(potX,potY);
  
    coinX = parseInt($('#cointest').css('left'))+22.5;
    coinY = parseInt($('#cointest').css('top'));
    
    console.log(coinX,coinY);
    //console.log(winpotDistance,windowHight,potImgHeight);

    //potYrange = (((Math.floor((winpotDistance+45)/arrallspeed[1])+1)*arrallspeed[1])-(winpotDistance+45));//金幣與壺口的重疊部分
    //potYrange = ((Math.floor((winpotDistance)/arrallspeed[1])+1)*arrallspeed[1]);共用寫法
    potYrange = ((Math.floor((winpotDistance)/20)+1)*20);
    //console.log(potYrange);

    if(coinY == potYrange && coinX >= potX+32 && coinX <= potX + 96){
        $('#cointest').remove();
        score();
    }
}

//計分
var add =  parseInt(document.getElementById('count').innerHTML);
function score(){
    add += 1;
    document.getElementById('count').innerHTML = add;
}

var rect1 = {x: 5, y: 5, width: 50, height: 50}
var rect2 = {x: 20, y: 10, width: 10, height: 10}
if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.height + rect1.y > rect2.y) {
    // collision detected!
}
// filling in the values =>
if (5 < 30 &&
    55 > 20 &&
    5 < 20 &&
    55 > 10) {
    // collision detected!
}