//遊戲開關
var d1;
function startgame(){
    $('#startButton').css('display','none');
    d1 = new Date().getTime();
    //console.log(d1);
    circle();
    delayFunc();
    countdown();
    createsounds();
}

//循環生產
function circle(){
    for(i = 0;i < coincount ;i++){
        generate();
    }
}

//倒數計時
var time = 60;
var t = 1;
var delaydrop;
var allScore = {
    object: $('#rank'),
    point: $('#point')
}
function delayFunc(){
    delaydrop = setInterval(()=>{
        t += 1;
    },500);
}
function cleardelay(){
    clearInterval(delaydrop);
}
function countdown(){
    window.requestAnimationFrame(countdown);
    if(new Date().getTime()-d1 < time*1000 ){
        document.getElementById('timecount').innerHTML=parseInt((time*1000-(new Date().getTime()-d1))/1000);

        if(t < coincount){
            
            for( i=0 ;i < t; i++)
            {
                arr[i].y += arr[i].speed;
                update(arr[i]);
                collision(arr[i]);
            }
        }
        else{
            t = coincount;
            for( i=0 ;i < t; i++)
            {                            
                arr[i].y += arr[i].speed;
                update(arr[i]);
                collision(arr[i]);                     
            }
        }
        
        // for( i=0 ;i < coincount; i++)
        // {
        //     arr[i].randomT -= t;
        //     if(arr[i].randomT == 0){
        //         arr[i].y += arr[i].speed;
        //         update(arr[i]);
        //     }
        //     collision(arr[i]);
        // }
        
    }
    else{
        cleardelay();
        cancelAnimationFrame(window.requestAnimationFrame(countdown));

        allScore.object.css('display','block');
        allScore.point.html($('#count').html());
        
    }    
}

//壺 左右移動
var windoWidth = $('#wrapper').width();
var potImgWidth = parseInt($('#pot').css('width'));
var x;//用於視窗寬減壺寬
var Item = { //壺的物件
    object:$('#pot'),
    x:parseInt($('#pot').css('left')),
    y:parseInt($('#pot').css('top')),
    lightaction:$('.light')
};
var keyleft = false,keyright = false;
setInterval(()=>{
    if(keyleft==true){
        //console.log(ItemPosition);
        if(Item.x >= -10){
            Item.x = Item.x -= 10;
            Item.object.css('left', Item.x);
        }
    }
    else if(keyright == true){
        //console.log(ItemPosition);
        x = windoWidth-potImgWidth + 15;
        if(Item.x < x){
            Item.x = Item.x += 10;
            Item.object.css('left', Item.x);
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
var coincount = 30;//金幣總數量
var arrallspeed = new Array();//金幣隨機速度
var randomTdrop; //隨機時間落下倒數
var arr = new Array();
function generate(){
    randomcoinposition = Math.floor(Math.random()*windoWidth-45);
    if(randomcoinposition < 0){
        randomcoinposition = 20;
    }
    randomspeed = Math.floor(Math.random()*2.5)+2.5;
    randomTdrop = Math.floor(Math.random()*30);
    var newcoin = $('<div></div>').attr('id','coin'+idcount).addClass('coin').css('left',randomcoinposition+'px');
    idcount +=1;
    $('.boardImg').after(newcoin);
    arr[arr.length] = {
        object: newcoin,
        speed: randomspeed,
        x: randomcoinposition,
        y: -45,
        alife:true,
        randomT:randomTdrop
    };
}

//金幣落下
var windowHight = $(window).height();
function update(arrCoin){    
    arrCoin.object.css('top',arrCoin.y+'px');
    
    if(parseInt(arrCoin.object.css('top')) > windowHight && parseInt($('#timecount').html()) > 0){
        arrCoin.y = -45;
    }
    else if(parseInt(arrCoin.object.css('top')) > windowHight && parseInt($('#timecount').html()) == 0){
        arrCoin.y = windowHight + 45;
        // arrCoin.object.remove();
        // arrCoin.alife = false;
    }
    
}

//金幣與壺碰撞
function collision(arrCoin){
    var coinX,coinY;

    coinX = parseInt(arrCoin.x);
    coinY = parseInt(arrCoin.y);

    if(arrCoin.alife){
        if(coinX+20 < Item.x + 96 && coinX + 25 > Item.x +32  && coinY < Item.y+1  && 45 + coinY > Item.y){
            arrCoin.y = -45;
            light();
            score();
        }
    }
}

//金幣碰撞後壺口發光 + 聲音
function light(){
    Item.lightaction.css('display','block');
    playaudio();

    setTimeout(()=>{
        Item.lightaction.css('display','none');
        stopAudio();
    },100);
}

//計分
var add = 0;
function score(){
    add += 1;
    document.getElementById('count').innerHTML = add;
}


const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
const oscillator = audioCtx.createOscillator(); //震盪器
const gainNode = audioCtx.createGain(); //增益節點 控制音量
var isPlaying = false;

oscillator.type = 'sine'; //正弦波
oscillator.frequency.value = 440; //頻率
oscillator.detune.value = 0; //解譜
gainNode.gain.value = 0.5; //音量
oscillator.connect(gainNode);
function createsounds(){oscillator.start();}


function playaudio(){
    if(isPlaying == false){
        gainNode.connect(audioCtx.destination);
        //oscillator.start();
        isPlaying = true;
    }
    
}
function stopAudio(){
    if(isPlaying){
        gainNode.disconnect(audioCtx.destination);
        // oscillator.stop();
        isPlaying = false;
    }

}
function restart(){
    window.location.reload()    
}

