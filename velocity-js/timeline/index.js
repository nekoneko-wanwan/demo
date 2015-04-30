$(function() {

/********************************************************
 * Timeline JSON
 ********************************************************/
/* フェーズ1用アニメーションの定義 */
var TIME_LINE_01 = {
    ".phase01": [{
        "anims" : [{
            // フェーズ1をフェードイン
            "properties" : "fadeIn",
            "options"    : {"duration": 1000}
        }]
    }],

    /* phase01_a, phase01_bは同時に動作する */

    ".phase01_a" : [{
        // 400ms後にアニメーションスタート
        "start" : 400,
        "anims" : [{
            // 下へ移動
            "properties" : {"top": "+=100px"},
            "options"    : {"duration": 1000}
        }, {
            // 左右の移動を3回繰り返す
            "properties" : {"left": "+=50px"},
            "options"    : {"duration": 500, "loop": 3}
        }, {
            // フェードアウト
            "properties" : "fadeOut",
            "options"    : {"duration": 1000}
        }]
    }],
    ".phase01_b" : [{
        // 800ms後にアニメーションスタート
        "start" : 800,
        "anims" : [{
            // 上へ移動
            "properties" : {"top": "-=100px"},
            "options"    : {"duration": 1000}
        }, {
            // 左右の移動を3回繰り返す
            "properties" : {"left": "+=50px"},
            "options"    : {"duration": 500, "loop": 3}
        }, {
            // 1000ms秒後にフェードアウト
            "properties" : "fadeOut",
            "options"    : {"delay": 1000, "duration": 1000, "complete":  function() {
                // アニメーション終了時にフェーズ2のタイムラインを処理開始
                play(TIME_LINE_02);
            }}
        }]
    }]
};

/* フェーズ2用アニメーションの定義 */
var TIME_LINE_02 = {
    ".phase02": [{
        "anims" : [{
            // フェーズ1をフェードイン
            "properties" : "fadeIn",
            "options"    : {"duration": 1000}
        }]
    }],

    /* phase01_a, phase01_bは同時に動作する */

    ".phase02_a" : [{
        // 400ms後にアニメーションスタート
        "start" : 400,
        "anims" : [{
            // 下へ移動
            "properties" : {"top": "+=100px"},
            "options"    : {"duration": 1000}
        }, {
            // 左右の移動を3回繰り返す
            "properties" : {"left": "+=50px"},
            "options"    : {"duration": 500, "loop": 3}
        }, {
            // 1000ms秒後にフェードアウト
            "properties" : "fadeOut",
            "options"    : {"delay": 1000, "duration": 1000, "complete": function() {
                document.writeln('終了しました');
            }}
        }]
    }]
};


/********************************************************
 * タイムラインを実行するplay()関数
 * 
 * @param {JSON}   timeline アニメーションを定義したタイムラインJSON
 * @param {string} selector JSONのキーにを$オブジェクトのセレクタとする
 * @param {object} triggers 上記セレクタをまとめたオブジェクト
 * @param {object} trigger  上記セレクタ単体オブジェクト trigger.start, trigger.animsで値を取得できる
 ********************************************************/
var play = function(timeline) {
    // Timeline JSONの各エントリを処理
    $.each(timeline, function(selector, triggers) {
        // console.log(selector);  // .phase01, .phase01_a...

        $.each(triggers, function(i, trigger) {
            // startで指定したタイミングでアニメーションを開始
            setTimeout(function() {
                // jsonのキーをセレクタとしたjQueryオブジェクトに対して、定義されたvelocityアニメーションを順次実行
                var $elm = $(selector).show();
                $.each(trigger.anims, function(j, anim) {
                    $elm.velocity(anim.properties, anim.options);
                });
            }, trigger.start || 0);
        });
    });
};



play(TIME_LINE_01);



});