$(function() {

    // インラインSVGを処理するにはこれでOKだが...
    $("#svg1")
        .velocity({ strokeDashoffset:0 }, 3000 , "swing")
        .velocity({ fill:"#00ffff" }, 1000 , "swing");


    // 外部ファイルのSVGを処理する場合
    $(window).load(function() {
        var doc        = document.getElementById('logo').contentDocument;
        var $svg       = $(doc).find("svg");
        var $path      = $svg.find("path");
        var pathLength = $path.length;

        // jsでCSS設定
        $path.css({
            stroke      : "#ff0000",
            fill        : "none",
            strokeWidth : 1
            // strokeDasharray, strokeDashoffsetは setPathLengthToStyle()で設定する
        });

        setPathLengthToStyle($path);

        // 各文字を単純に同時になぞる
        // $path
        //     .velocity({ strokeDashoffset : 0 }, 3000 , "swing")
        //     .velocity({ fill    : "#ff0000" }, 1000 , "swing")
        //     .velocity({ rotateZ : "45deg"   }, 1000);

        // 各文字を順番になぞる
        $path.each(function(i) {
            $(this).velocity({
                strokeDashoffset: 0
            }, {
                delay    : 300 * i,
                duration : 1000,
                complete : function() {
                    // 全部終わったら処理
                    // ifを外して$(this)にすると、それぞれ終わった直後に塗りつぶしされていく
                    if(i === (pathLength - 1)) {
                        $path.velocity({
                            fill: "#ff0000"
                        }, 1000, "swing");
                    }
                }
            }); // .velocity("reverse"); 書いたそばから消していく
        });



    });

    // pathの長さをcssにセットする関数
    function setPathLengthToStyle($obj) {
        var len;
        var arr = [];
        Array.prototype.slice.call($obj).forEach(function(path, i) {
            arr.push(path);
            len = arr[i].getTotalLength() + 30 + 1 | 0; // +30は、Firefox対策。+1 | 0 は小数点切り上げ
            arr[i].style.strokeDasharray  = len;
            arr[i].style.strokeDashoffset = len;
        });
    }

});
