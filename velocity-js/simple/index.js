$(function() {

    // 省略記法
    $("#box1").velocity({
        top: 100,
        left: 1000
    }, 1000, "swing", function() {
        // complete
        console.log("box1 end");
    });

    // optionを細かく設定
    $("#box2").velocity({
        // ref: http://julian.com/research/velocity/
        top: 100,
        left: 500,
        backgroundColor : '#000000',  // colorの指定もできる
        color : '#fff',               // colorの指定もできる
        // tween : 1000
        rotateX    : '45deg',
        rotateY    : '45deg',
        rotateZ    : '45deg',
        skewX      : 25,
        scaleX     : 5,
        translateX : "+=10px",
        translateY : "+=100px"
    }, {
        duration : 1000,
        easing   : "ease-out",
        begin    : function(elements) {
            console.log("begin -> " + elements);
        },
        complete : function(elements) {
            console.log("complete -> " + elements);
        },
        progress : function(elements, complete, remaining, start, tweenValue) {
            console.log("elements   -> " + elements);    // object HTMLDivElement
            console.log("complete   -> " + (complete * 100 | 0) + "%"); //0 ~ 1 (1でcomplete)
            console.log("remaining  -> " + remaining);   // 残り時間
            console.log("start      -> " + start);       // この処理が始まった時間?
            console.log("tweenValue -> " + tweenValue);  //tweenで設定した時間
        },
        loop     : 1,    // ループ回数（リバースする）。trueで無限
        delay    : 500,  // 開始時・ループ時の遅延
        display  : false // "none", "block", noneにするとアニメーション以外は非表示になる
    });

    // Command: Fade & Slide
    $("#box3").velocity("fadeOut"  , {duration: 1500})
              .velocity("fadeIn"   , {duration: 1500})
              .velocity("slideUp"  , {duration: 1500})
              .velocity("slideDown", {duration: 1500});

    // Command: Scroll 読み込み時に指定箇所まで自動スクロール
    $(".box4__4").velocity("scroll", {
        container: $("#box4"),
        duration : 800,
        delay    : 500
    }).velocity("reverse", {duration: 2000});  // 処理をリバースすることも


});


/* jquery不使用の場合
   jqueryの読み込みをしないことでVeloity()が定義される模様
 */

/* 
window.onload = function() {
    var box = document.getElementById("box2");
    Velocity(box, {
        top: 100,
        left: 1000
    }, 1000);
};
*/
