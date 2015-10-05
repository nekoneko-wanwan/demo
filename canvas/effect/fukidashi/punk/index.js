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
 * 激しい吹き出しを作成する
 * @param {number} radiusX: 縦半径
 * @param {number} radiusY: 横半径
 * @param {number} num    : 角数
 * @param {number} cx     : 円の中心座標X
 * @param {number} cy     : 円の中心座標Y
 * @param {number} punkLineMax : パンクの最大の高さ
 * @param {number} punkLineMin : パンクの最小の高さ
 * @param {color}  fillStyle   : 塗りつぶしの色
 * @param {color}  strokeStyle : 線の色
 * @param {number} lineWidth   : 線の太さ
 */
var createPunkFukidashi = function(args) {
    var ctx = args.ctx;
    var deg = 0;
    var addDeg = 360 / args.num;
    var random;
    var beginX, beginY, endX, endY;
    var cp1x, cp2x, cp1y, cp2y;

    // 共通設定
    ctx.beginPath();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.fillStyle = args.fillStyle;
    ctx.strokeStyle = args.strokeStyle;
    ctx.lineWidth = args.lineWidth;

    for (var i = 0; i < args.num; i++) {
        deg += addDeg;
        random = getRandomInt(args.punkLineMax, args.punkLineMin);

        // 始点・終点
        beginX = getCircumPos.x(deg, args.radiusX, args.cx);
        beginY = getCircumPos.y(deg, args.radiusY, args.cy);
        endX   = getCircumPos.x(deg + addDeg, args.radiusX, args.cx);
        endY   = getCircumPos.y(deg + addDeg, args.radiusY, args.cy);

        // 制御値
        cp1x = getCircumPos.x(deg, args.radiusX - random, args.cx);
        cp1y = getCircumPos.y(deg, args.radiusY - random, args.cy);
        cp2x = getCircumPos.x(deg + addDeg, args.radiusX - random, args.cx);
        cp2y = getCircumPos.y(deg + addDeg, args.radiusY - random, args.cy);

        // 開始点と最終点のズレを調整する
        if (i === 0) {
            ctx.arcTo(beginX, beginY, endX, endY, args.punkLineMax);
        }

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
    }

    ctx.fill();
    ctx.stroke();
};


// wには文字の大体の横幅を入れる
var createText = function(ctx, text, color, x, y, w) {
    ctx.fillStyle = color;
    ctx.font = "bold 24px 'ＭＳ Ｐゴシック'";
    ctx.fillText(text, x - (w/2), y + 10 );  // yには文字の高さの半分を加える
};


var punkDraw = function() {
    var cs = document.getElementById('myCanvas');
    var ctx = cs.getContext('2d');
    var csWidth = cs.width;
    var csHeight = cs.height;

    // 引数の詳細はcreatePunkFukidashi()のコメントアウトを参照
    var config = {
        ctx: ctx,
        radiusX: 120,
        radiusY: 80,
        num: 18,
        cx: 100,
        cy: 100,
        punkLineMax: 30,
        punkLineMin: 20,
        fillStyle: 'rgba(255,255,255,0.9)',
        strokeStyle: 'black',
        lineWidth: 3
    };

    // 固定した吹き出しを作成
    var fixedFukidashi = function() {
        var _config = {
            ctx: ctx,
            radiusX: 110,
            radiusY: 70,
            num: 16,
            cx: 290,
            cy: 420,
            punkLineMax: 40,
            punkLineMin: 40,
            fillStyle: 'red',
            strokeStyle: 'black',
            lineWidth: 4
        };
        createPunkFukidashi(_config);
        createText(ctx, 'まだです！！', 'white', _config.cx, _config.cy, 120);
    };

    var render = function() {
        ctx.clearRect(0, 0, csWidth, csHeight);
        fixedFukidashi();
        for (var i = 0; i < 3; i++) {
            config.cx = getRandomInt(csWidth - config.radiusX, config.radiusX / 2);
            config.cy = getRandomInt(csHeight - config.radiusY, config.radiusY / 2);
            createPunkFukidashi(config);
            createText(ctx, '進捗どうですか', 'black',config.cx, config.cy, 150);
        }

        setTimeout(function() {
            render();
        }, 500);
    };

    render();
};
punkDraw();
