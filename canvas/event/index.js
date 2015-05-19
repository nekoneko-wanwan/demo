
/***************************************
 * マウスアクション
 ***************************************/

/*
 * クリックしたところに矩形を描画する
 */
function e_click() {
    var cs = document.getElementById('e_click');
    var ctx = cs.getContext('2d');
    var w = cs.width;
    var h = cs.height;
    var x = 0;
    var y = 0;

    function onClick(e) {
        /*
         * rectでcanvasの絶対座標位置を取得し、
         * クリック座標であるe.clientX,e.clientYからその分を引く
         * ※クリック座標はdocumentからの位置を返すため
         * ※rectはスクロール量によって値が変わるので、onClick()内でつど定義
         */
        var rect = e.target.getBoundingClientRect();
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;

        draw();
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        ctx.fillRect(x, y, 10, 10);
    }

    cs.addEventListener('click', onClick, false);
}
e_click();



/*
 * ダブルクリックしたところに矩形を描画する
 */
function e_dbl_click() {
    var cs = document.getElementById('e_dbl_click');
    var ctx = cs.getContext('2d');
    var w = cs.width;
    var h = cs.height;
    var x = 0;
    var y = 0;

    function onDblClick(e) {
        var rect = e.target.getBoundingClientRect();
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;

        draw();
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2, false );
        ctx.fill();
    }

    cs.addEventListener('dblclick', onDblClick, false);
}
e_dbl_click();



/*
 * Canvasに対してマウスオーバーとアウトを感知する
 */
function m_over_out() {
    var cs = document.getElementById('e_m_over_out');
    var ctx = cs.getContext('2d');
    var w = cs.width;
    var h = cs.height;

    function onMouseOver() {
        draw();
    }

    function onMouseOut() {
        ctx.clearRect(0, 0, w, h);
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        ctx.font = "26px 'HG正楷書体-PRO'";
        ctx.fillText('Hello', 95, h / 2);
    }

    cs.addEventListener('mouseover', onMouseOver, false);
    cs.addEventListener('mouseout', onMouseOut, false);
}
m_over_out();



/*
 * 要素に対してマウスオーバーとアウトを感知する
 * Canvasは一枚絵なので、要素に対してのみ制御を行うには工夫が必要
 * つど当たり判定を入れるか、別途Canvasを生成するか...など
 * ここではつど当たり判定を入れてみる
 */
function m_over_out2() {
    var cs = document.getElementById('e_m_over_out2');
    var ctx = cs.getContext('2d');
    var w = cs.width;
    var h = cs.height;
    var targetFlag = false;
    var rect = null;

    function onMouseOver(e) {
        rect = e.target.getBoundingClientRect();
        cs.addEventListener('mousemove', onMouseMove, false);
    }
    function onMouseOut() {
        cs.removeEventListener('mousemove', onMouseMove, false);
    }
    /* マウスが動く度に要素上にヒットしているかどうかをチェック */
    /* 実行するinitは間引きを噛ませて実行する */
    function onMouseMove(e) {
        moveActions.updateTargetFlag(e);
        if (targetFlag) {
            moveActions.throttle(moveActions.over, 50);
        } else {
            moveActions.throttle(moveActions.out, 50);
        }
    }

    /* mouseMoveで実行する関数 */
    var moveActions = {
        timer: null,
        /* targetFlagの更新 */
        updateTargetFlag: function(e) {
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;

            var a = (x > w / 2 - 50);
            var b = (x < w / 2 + 50);
            var c = (y > h / 2 - 50);
            var d = (y < h / 2 + 50);

            targetFlag = (a && b && c && d);
        },
        /* 連続イベントの間引き */
        throttle: function(targetFunc, time) {
            var _time = time || 100;
            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                targetFunc();
            }, _time);
        },
        out: function() {
            drawRect();
        },
        over: function() {
            drawRectIsHover();
        }
    };

    function drawRect(color) {
        var _col = color || 'black';
        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.fillStyle = _col;
        ctx.fillRect(w / 2 - 50, h / 2 - 50, 100, 100);
    }

    function drawRectIsHover() {
        drawRect('blue');
        ctx.font = "26px 'HG正楷書体-PRO'";
        ctx.fillText('Hello', 95, 60);
    }

    cs.addEventListener('mouseover', onMouseOver, false);
    cs.addEventListener('mouseout', onMouseOut, false);

    drawRect();
}
m_over_out2();



/*
 * マウスの押した、離したを感知する
 * downとclickの違いは downは押した時、clickは離した時
 */
function m_up_down() {
    var cs = document.getElementById('e_m_up_down');
    var ctx = cs.getContext('2d');
    var w = cs.width;
    var h = cs.height;

    function onMouseDown() {
        drawOn();
    }

    function onMouseUp() {
        drawOff();
    }

    function drawOn() {
        ctx.clearRect(0, 0, w, h);
        ctx.font = "18px 'HG正楷書体-PRO'";
        ctx.fillText('マウスが押されています', 30, h / 2);
    }

    function drawOff() {
        ctx.clearRect(0, 0, w, h);
        ctx.font = "18px 'HG正楷書体-PRO'";
        ctx.fillText('反応ありません', 60, h / 2);
    }

    cs.addEventListener('mousedown', onMouseDown, false);
    cs.addEventListener('mouseup', onMouseUp, false);

    drawOff();
}
m_up_down();



/*
 * マウスカーソルの動きに追従する
 */
function m_move() {
    var cs = document.getElementById('e_m_move');
    var ctx = cs.getContext('2d');
    var w = cs.width;
    var h = cs.height;
    var x = 0;
    var y = 0;
    var timer;

    function onMouseMove(e) {
        draw(e);
    }

    function throttle(targetFunc, time) {
        var _time = time || 100;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            targetFunc();
        }, _time);
    }

    function draw(e) {
        throttle(function() {
            var rect = e.target.getBoundingClientRect();
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            ctx.clearRect(0, 0, w, h);
            ctx.font = "18px 'HG正楷書体-PRO'";
            ctx.fillText('離ｼﾃ....離ｼﾃ....', x, y);
        }, 100);
    }

    cs.addEventListener('mousemove', onMouseMove, false);
}
m_move();



/*
 * マウスホイールを感知する
 */
function m_wheel() {
    var cs = document.getElementById('e_m_wheel');
    var ctx = cs.getContext('2d');
    var w = cs.width;
    var h = cs.height;
    var count = 0;

    function onMouseWheel(e) {
        draw();
    }

    function draw() {
        count++;
        ctx.clearRect(0, 0, w, h);
        ctx.font = "18px 'HG正楷書体-PRO'";
        ctx.fillText('ホイールが回された数: ' + count, 25, 130);
    }

    cs.addEventListener('mousewheel', onMouseWheel, false);
}
m_wheel();



/* 
 * キーの押された反応を感知する
 */
function k_up_down() {
    var cs = document.getElementById('e_k_up_down');
    var ctx = cs.getContext('2d');
    var w = cs.width;
    var h = cs.height;

    function onKeyDown(e) {
        var str = '';
        switch (e.keyCode) {
            case 65:
                str = 'a';
                break;
            case 66:
                str = 'b';
                break;
            case 67:
                str = 'c';
                break;
            default:
                str = '無効キー';
                break;
        }
        str += 'が押されました';
        draw(str);
    }

    function onKeyUp(e) {
        var str = 'キーから離れました';
        draw(str);
    }

    function draw(str) {
        ctx.clearRect(0, 0, w, h);
        ctx.font = "20px sanserif";
        ctx.fillText(str, 10, 130);
    }

    cs.setAttribute('tabindex', 0); // focusしている時のみ、keyDown,up を有効に
    cs.addEventListener('keydown', onKeyDown, false);
    cs.addEventListener('keyup', onKeyUp, false);
}
k_up_down();


