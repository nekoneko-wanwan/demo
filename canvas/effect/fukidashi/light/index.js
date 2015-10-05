/**
 * ランダムな整数を返す
 * @param max 最大値
 * @param min 最小値
 * @return min ~ max
 */
var getRandomInt = function(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * 円周上の座標を返す
 * @param d 角度
 * @param r 半径
 * @param cx, cy 中心座標
 */
var getCircumPos = {
    // x座標
    x: function(d, r, cx) {
        return Math.cos(Math.PI / 180 * d) * r + cx;
    },
    // y座標
    y: function(d, r, cy) {
        return Math.sin(Math.PI / 180 * d) * r + cy;
    }
};



/**
 * 光の吹き出しを作成する
 * @param {obj}    cs     : Canvasオブジェクト
 * @param {number} radiusX: 横半径
 * @param {number} radiusY: 縦半径
 * @param {number} num    : 角数
 * @param {number} cx     : 円の中心座標X
 * @param {number} cy     : 円の中心座標Y
 * @param {number} innerRadiusX : 中の円横半径
 * @param {number} innerRadiusY : 中の円縦半径
 * @param {number} addOuterLine : 外側の線のはみ出す上限
 * @param {number} addInnerLine : 内側の線のはみ出す上限
 * @param {color}  strokeStyle  : 線の色
 * @param {color}  fillStyle    : 塗りつぶしの色
 */

var createLightFukidashi = function(args) {
    var ctx = args.ctx;
    var deg = 0;
    var outerRandom;
    var innerRandom;

    // 塗りつぶしの円を描く
    // 楕円の計算が面倒なので普通に円を書いてscaleで曲げる
    // xを基準とする
    var ratio = args.innerRadiusY / args.innerRadiusX;

    ctx.scale(1, ratio);
    ctx.beginPath();
    ctx.arc(args.cx, args.cy / ratio, args.innerRadiusX, 0, Math.PI * 180, true);
    ctx.fillStyle = args.fillStyle;
    ctx.fill();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // メインの線を描く
    ctx.beginPath();

    for (var i = 0; i < args.num; i++) {
        deg += 360 / args.num;
        outerRandom = getRandomInt(args.addOuterLine, 0);
        innerRandom = getRandomInt(args.addInnerLine, 0);

        ctx.moveTo(
            getCircumPos.x(deg, args.radiusX + outerRandom, args.cx),
            getCircumPos.y(deg, args.radiusY + outerRandom, args.cy)
        );
        ctx.lineTo(
            getCircumPos.x(deg, args.innerRadiusX - innerRandom, args.cx),
            getCircumPos.y(deg, args.innerRadiusY - innerRandom, args.cy)
        );
    }
    ctx.strokeStyle = args.strokeStyle;
    ctx.stroke();
};

var lightDraw = function() {
    var cs = document.getElementById('myCanvas');
    var ctx = cs.getContext('2d');
    var csWidth = cs.width;
    var csHeight = cs.height;

    // 引数の詳細はcreateLightFukidashi()のコメントアウトを参照
    var config = {
        ctx: ctx,
        radiusX: 130,
        radiusY: 210,
        num: 300,
        cx: 160,
        cy: 250,
        innerRadiusX: 110,
        innerRadiusY: 190,
        addOuterLine: 30,
        addInnerLine: 0,
        strokeStyle: 'black',
        fillStyle: 'rgba(255,255,255,1)'
    };

    var render = function() {
        ctx.clearRect(0, 0, csWidth, csHeight);
        createLightFukidashi(config);
        setTimeout(function() {
            render();
        }, 200);
    };
    render();
};
lightDraw();
