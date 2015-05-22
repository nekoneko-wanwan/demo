/* 
 * bezierCurveTo()
 * bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
 *     cp1: 制御点（コントロールポイント）の座標
 *     cp2: 制御点2の座標
 *     x  : 新しくパスに追加される点のx座標
 *     y  : 新しくパスに追加される点のy座標
 *
 *     ※座標はCanvas要素の左上端からの距離となる
 */


var cs = document.getElementById('myCanvas');
var ctx = cs.getContext('2d');
var isAnimation = false;

/* カウントアップとカウントダウンを繰り返す */
function elastic(max, min) {
    var _max      = max || 100;
    var _min      = min || _max - 10;
    var isReverse = false;
    var amount    = 0.5;

    return {
        count: function(num) {
            return function() {
                if (num > _max) {
                    isReverse = true;
                } else if (num <= _min) {
                    isReverse = false;
                }
                if (isReverse) {
                    num -= amount;
                } else {
                    num += amount;
                }
                return num.toFixed(1);  // 小数点第一位以下は切り捨て
            };
        }
    };
}

/* bezierCurveTo用データ */
var DATA = {
    // ここのx, yの値は、d.x, d.yと揃える）
    x: elastic(410, 390).count(400),
    y: elastic(210, 200).count(200),
    a: {
        cp1x: elastic(410, 390).count(400),
        cp1y: elastic(100,  90).count( 90),
        cp2x: elastic(310, 300).count(300),
        cp2y: elastic(10,    0).count( 10),
        x:    elastic(210, 200).count(200),
        y:    elastic(10,    0).count( 10)
    },
    b: {
        cp1x: elastic(100, 100).count(100),
        cp1y: elastic(10,   10).count( 10),
        cp2x: elastic(10,   10).count( 10),
        cp2y: elastic(100, 100).count(100),
        x:    elastic(10,    0).count( 10),
        y:    elastic(210, 200).count(200)
    },
    c: {
        cp1x: elastic(10,    0).count( 10),
        cp1y: elastic(310, 300).count(300),
        cp2x: elastic(100,  90).count( 90),
        cp2y: elastic(410, 380).count(400),
        x:    elastic(210, 200).count(200),
        y:    elastic(410, 380).count(400)
    },
    d: {
        cp1x: elastic(310, 300).count(300),
        cp1y: elastic(400, 400).count(400),
        cp2x: elastic(400, 400).count(400),
        cp2y: elastic(300, 300).count(300),
        x:    elastic(410, 390).count(400),
        y:    elastic(210, 200).count(200)
    }
};

function draw() {
    ctx.clearRect(0, 0, cs.width, cs.height);

    ctx.beginPath();
    ctx.moveTo(DATA.x(), DATA.y());
    ctx.bezierCurveTo(DATA.a.cp1x(), DATA.a.cp1y(), DATA.a.cp2x(), DATA.a.cp2y(), DATA.a.x(), DATA.a.y());
    ctx.bezierCurveTo(DATA.b.cp1x(), DATA.b.cp1y(), DATA.b.cp2x(), DATA.b.cp2y(), DATA.b.x(), DATA.b.y());
    ctx.bezierCurveTo(DATA.c.cp1x(), DATA.c.cp1y(), DATA.c.cp2x(), DATA.c.cp2y(), DATA.c.x(), DATA.c.y());
    ctx.bezierCurveTo(DATA.d.cp1x(), DATA.d.cp1y(), DATA.d.cp2x(), DATA.d.cp2y(), DATA.d.x(), DATA.d.y());
    ctx.stroke();
    ctx.closePath();

    if(isAnimation) {
        requestAnimationFrame(draw);
    } else {
        cancelAnimationFrame(draw);
    }
}

function onMouseOver() {
    isAnimation = true;
    draw();
}

function onMouseOut() {
    isAnimation = false;
    draw();
}

cs.addEventListener('mouseover', onMouseOver, false);
cs.addEventListener('mouseout', onMouseOut, false);

draw();




//----------------------------------------------------------------
/* 正円の記述サンプル */
function drawCircle() {
    ctx.beginPath();
    ctx.moveTo(200, 100);
    ctx.bezierCurveTo(200,  45, 155,   0, 100,   0);
    ctx.bezierCurveTo( 45,   0,   0,  45,   0, 100);
    ctx.bezierCurveTo(0, 155, 45, 200, 100, 200);
    ctx.bezierCurveTo(155, 200, 200, 155, 200, 100);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(400, 200);
    ctx.bezierCurveTo(400,  90, 300,   0, 200,   0);
    ctx.bezierCurveTo( 90,   0,   0,  90,   0, 200);
    ctx.bezierCurveTo(0, 300, 90, 400, 200, 400);
    ctx.bezierCurveTo(300, 400, 400, 300, 400, 200);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(100, 50);
    ctx.bezierCurveTo(100,  22, 77,   0, 50,   0);
    ctx.bezierCurveTo( 22,   0,   0,  22,   0, 50);
    ctx.bezierCurveTo(0, 77, 22, 100, 50, 100);
    ctx.bezierCurveTo(77, 100, 100, 77, 100, 50);

    ctx.stroke();
    ctx.closePath();
}

