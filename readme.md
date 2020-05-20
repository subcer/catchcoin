接金幣遊戲
===================================================
製作流程
---------------------------------------------------
這個是第一次畫流程圖,
最一開始的流程圖:
![金幣流程圖](/img/flow-chart.jpg)

但後來發現,沒有壺的流程
壺在遊戲進程中,直接先生成,並且給予他左右移動的功能:

```javascript
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
```