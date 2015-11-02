var cs       = document.getElementById('myCanvas');
var ctx      = cs.getContext('2d');
var csWidth  = cs.width;
var csHeight = cs.height;
var ptnW     = csWidth / 10;   // 割り切れる、かつ割る値はある程度大きくないと汚くなるので注意
var ptnH     = csHeight / 10;  // 同上
var ptnSrc;


/**
 * パターンとなる画像を作成
 * @return dataURL
 */
var createPtnSrc = function() {
    cs.width      = ptnW;
    cs.height     = ptnH;
    var isReverse = false;
    var lightness = 0;
    var _csWidth  = cs.width;
    var _csHeight = cs.height;

    // 中心に移動
    ctx.translate(_csWidth/2, _csHeight/2);
    ctx.lineWidth = 1;

    for(var i = 0; i < 360; i++) {
        // 45度ずつtoggle
        if (i % 45 === 0) {
            if (isReverse) {
                isReverse = false;
            } else {
                isReverse = true;
            }
        }
        // reverseに応じて色の輝度を変更
        if(isReverse) {
            lightness += 1;
        } else {
            lightness -= 1;
        }

        // カラーの上限・下限を設定
        if (lightness < 70) {
            lightness = 70;
        }
        if (lightness > 100) {
            lightness = 100;
        }

        ctx.save();
        // 一本ずつ回転させていく
        ctx.rotate(Math.PI * i/180);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.strokeStyle = 'hsl(0, 0%, '+lightness+'%'+')';

        ctx.lineTo(0, _csWidth);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    return cs.toDataURL();
};


/**
 * キラキラした画像を描画
 */
var createBikkuri = function(src) {
    cs.width      = csWidth;
    cs.height     = csHeight;
    var _csWidth  = csWidth;
    var _csHeight = csHeight;

    var img = new Image();
    img.src = src;

    /**
     * Canvas内に渡されたパターンを敷き詰める
     */
    var drawPtn = function() {
        var ptn = ctx.createPattern(img, '');
        ctx.fillStyle = ptn;
        ctx.fillRect(0, 0, _csWidth, _csHeight);
    };

    /**
     * 彩色グラデーション
     * blendModeを変えることで、見え方が変わる
     *  - multiply
     *  - screen
     *  - overlay
     *
     * @param {obj} obj: グラデーションを以下のcolorsオブジェクトのように指定する
     */
    var colors = {
        offset: [0, 0.25, 0.5, 0.75, 1], // グラデーションの位置
        rgb   : ['33,150,243', '3,169,244', '0,188,212', '0,150,136', '76,175,80'],
        alpha : [1, 0.8, 0.6, 0.4, 0.2],
        rgba  : [],
        isReverse: []
    };
    var drawColor = function(obj) {
        var blendMode = 'screen';
        ctx.globalCompositeOperation = blendMode;
        ctx.beginPath();
        var grad  = ctx.createLinearGradient(0,0, _csWidth, _csHeight);
        for (var i = 0, l = obj.offset.length; i < l; i++) {
            grad.addColorStop(obj.offset[i], obj.rgba[i]);
        }
        ctx.fillStyle = grad;
        ctx.rect(0,0, _csWidth, _csHeight);
        ctx.fill();
    };

    /**
     * レンダリング
     * drawColorと同様に、colorsオブジェクトを渡す
     */
    var render = function(obj) {
        obj = obj || colors;
        // 渡すグラデーションのrgbaを生成する
        for (var i = 0, l = obj.rgb.length; i < l; i++) {
            obj.rgba[i] = 'rgba('+obj.rgb[i]+', '+obj.alpha[i]+')';

            // 一定の範囲で繰り返す
            if (obj.alpha[i] < 0.2) {
                obj.isReverse[i] = false;
                obj.alpha[i]     = 0.2;
            }
            if(obj.alpha[i] > 1) {
                obj.isReverse[i] = true;
                obj.alpha[i]     = 1;
            }

            // 配列に対応するisReverseをもとに増減
            if(obj.isReverse[i]) {
                obj.alpha[i] -= 0.01;
            } else {
                obj.alpha[i] += 0.01;
            }
        }

        ctx.clearRect(0, 0, csWidth, csHeight);
        drawPtn();
        drawColor(obj);
        requestAnimationFrame(function() {
            render(obj);
        });
    };

    /**
     * パターン画像を読み込んだらレンダリングを開始する
     */
    img.onload = function() {
        $(cs).removeClass('is-hide');
        render(colors);
    };
};


// パターン画像生成中はCanvasサイズが変わっているため、
// 念のためCanvasを非表示にしておく（is-hide = opacity:0）
$(cs).addClass('is-hide');

ptnSrc = createPtnSrc();
createBikkuri(ptnSrc);

