// ref: http://www.html5.jp/canvas/


/*
 * 単純な図形の描画
 */
function line() {
    var canvas = document.getElementById('line');
    var context = canvas.getContext('2d');
    context.beginPath();
    context.moveTo(20, 20);
    context.lineTo(120, 20);
    context.lineTo(120, 120);
    context.lineTo(20, 120);
    context.closePath(); // 自動でpathを閉じてくれる
    context.stroke();
}


/*
 * 矩形を描く
 * context.fillRect(x, y, width, height)
 * context.strokeRect(x, y, width, height)
 * context.clearRect(x, y, width, height)  // 削除された部分は透明になる
 */

/* 四角形: 塗りつぶし */
function rect1() {
    var canvas = document.getElementById('rect1');
    var context = canvas.getContext('2d');
    context.beginPath();
    context.fillRect(20, 20, 80, 40);
}

/* 四角形: 枠線 */
function rect2() {
    var canvas = document.getElementById('rect2');
    var context = canvas.getContext('2d');
    context.beginPath();
    context.strokeRect(20, 20, 80, 40);
}

/* 四角形: clearRectで切り抜く*/
function rect3() {
    var canvas = document.getElementById('rect3');
    var context = canvas.getContext('2d');
    context.beginPath();
    context.fillRect(20, 20, 100, 100);
    context.clearRect(50, 70, 60, 30);
}


/*
 * 円を描く
 * context.arc(x, y, radius, startAngle, endAngle, anticlockwise)
 *    @param {num} x 円の中心のx座標
 *    @param {num} y 円の中心のy座標
 *    @param {num} radius 半径
 *    @param {rad} startAngle 円弧を書き始める角度。右方向（x）からみて右回りの角度をラジアンで指定
 *    @param {rad} endAngle   円弧を書き終える角度。右方向（x）からみて右回りの角度をラジアンで指定
 *    @param {boolean} anticlockwise trueで反時計回り、falseで時計回り
 */

/* 正円 */
function circle() {
    var canvas = document.getElementById('circle');
    var context = canvas.getContext('2d');
    context.beginPath();
    context.arc(70, 70, 60, 0, Math.PI * 2, false);
    context.stroke();
}

/* 円弧: 枠線 */
function arc1() {
    var canvas = document.getElementById('arc1');
    var context = canvas.getContext('2d');
    context.beginPath();
    context.arc(70, 70, 60, 10 * Math.PI / 180, 80 * Math.PI / 180, true );
    context.stroke();
}

/* 円弧: 塗りつぶし */
function arc2() {
    var canvas = document.getElementById('arc2');
    var context = canvas.getContext('2d');
    context.beginPath();
    context.arc(70, 70, 60, 10 * Math.PI / 180, 80 * Math.PI / 180, true );
    context.fill();
}

line();
rect1();
rect2();
rect3();

circle();
arc1();
arc2();



/*
 * 色を塗る
 * context.strokeStyle = color
 * context.fillStyle = color
 */

/* 枠線のみ */
function fill1() {
    var canvas  = document.getElementById('fill1');
    var context = canvas.getContext('2d');
    var circle  = Math.PI * 2;

    /* 円 1 */
    context.beginPath();
    context.arc(70, 45, 35, 0, circle, false);
    context.strokeStyle = 'rgb(192, 80, 77)';
    context.stroke();

    /* 円 2 */
    context.beginPath();  // 初期化が必要。設定しないとつながってしまう
    context.arc(45, 95, 35, 0, circle, false);
    context.strokeStyle = 'rgb(155, 187, 89)';
    context.stroke();

    /* 円 2 */
    context.beginPath();  // 初期化が必要。設定しないとつながってしまう
    context.arc(95, 95, 35, 0, circle, false);
    context.strokeStyle = 'rgb(128, 100, 162)';
    context.stroke();
}

/* 塗りつぶし */
function fill2() {
    var canvas  = document.getElementById('fill2');
    var context = canvas.getContext('2d');
    var circle  = Math.PI * 2;

    /* 円 1 */
    context.beginPath();
    context.arc(70, 45, 35, 0, circle, false);
    context.fillStyle = 'rgb(192, 80, 77)';
    context.fill();

    /* 円 2 */
    context.beginPath();  // 初期化が必要。設定しないとつながってしまう
    context.arc(45, 95, 35, 0, circle, false);
    context.fillStyle = 'rgb(155, 187, 89)';
    context.fill();

    /* 円 2 */
    context.beginPath();  // 初期化が必要。設定しないとつながってしまう
    context.arc(95, 95, 35, 0, circle, false);
    context.fillStyle = 'rgb(128, 100, 162)';
    context.fill();
}

/* 透明度の指定 */
function fill3() {
    var canvas  = document.getElementById('fill3');
    var context = canvas.getContext('2d');
    var circle  = Math.PI * 2;

    /* 全ての図形に影響がある、もちろんfillStyleをrgbaで指定しても良い */
    context.globalAlpha = 0.3;

    /* 円 1 */
    context.beginPath();
    context.arc(70, 45, 35, 0, circle, false);
    context.fillStyle = 'rgb(192, 80, 77)';
    context.fill();

    /* 円 2 */
    context.beginPath();  // 初期化が必要。設定しないとつながってしまう
    context.arc(45, 95, 35, 0, circle, false);
    context.fillStyle = 'rgb(155, 187, 89)';
    context.fill();

    /* 円 2 */
    context.beginPath();  // 初期化が必要。設定しないとつながってしまう
    context.arc(95, 95, 35, 0, circle, false);
    context.fillStyle = 'rgb(128, 100, 162)';
    context.fill();
}

fill1();
fill2();
fill3();



/*
 * 線形グラデーション
 * GRAD = context.createLinearGradient(x0, y0, x1, y1);
 *     グラデーションの領域を宣言
 *     @param {num} x0 開始地点のx座標
 *     @param {num} y0 開始地点のy座標
 *     @param {num} x1 終了地点のx座標
 *     @param {num} y1 終了地点のy座標
 *
 * GRAD.addColorStop(offset, color)
 *     @param {num} offset グラデーション終点の追加
 *     @param {obj} color
 */

/* 縦グラデーション */
function l_grad1() {
    var canvas = document.getElementById('line-grad1');
    var context = canvas.getContext('2d');
    var g = context.createLinearGradient(0, 0, 0, 140);

    context.beginPath();
    g.addColorStop(0,   'rgb(192, 80, 77)');
    g.addColorStop(0.5, 'rgb(155, 187, 89)');
    g.addColorStop(1,   'rgb(128, 100, 162)');
    context.fillStyle = g;
    context.fillRect(0, 0, 140, 140);
}

/* 横グラデーション */
function l_grad2() {
    var canvas = document.getElementById('line-grad2');
    var context = canvas.getContext('2d');
    var g = context.createLinearGradient(0, 0, 140, 0);

    context.beginPath();
    g.addColorStop(0,   'rgb(192, 80, 77)');
    g.addColorStop(0.5, 'rgb(155, 187, 89)');
    g.addColorStop(1,   'rgb(128, 100, 162)');
    context.fillStyle = g;
    context.fillRect(0, 0, 140, 140);
}

/* 斜めグラデーション */
function l_grad3() {
    var canvas = document.getElementById('line-grad3');
    var context = canvas.getContext('2d');
    var g = context.createLinearGradient(0, 0, 140, 140);

    context.beginPath();
    g.addColorStop(0,   'rgb(192, 80, 77)');
    g.addColorStop(0.5, 'rgb(155, 187, 89)');
    g.addColorStop(1,   'rgb(128, 100, 162)');
    context.fillStyle = g;
    context.fillRect(0, 0, 140, 140);
}

l_grad1();
l_grad2();
l_grad3();



/*
 * GRAD = context.createRadialGradient(x0, y0, r0, x1, y1, r1);
 * 円形グラデーションの効果領域を定義
 *     @param {num} x0 開始円の中心x座標
 *     @param {num} y0 開始円の中心y座標
 *     @param {num} r0 開始円の半径
 *     @param {num} x1 終了円の中心x座標
 *     @param {num} y1 終了円の中心y座標
 *     @param {num} r1 終了円の半径
 */

/* ドーナツ型 */
function r_grad() {
    var canvas = document.getElementById('rad-grad1');
    var context = canvas.getContext('2d');
    var grad = context.createRadialGradient(70,70,20,70,70,70);

    context.beginPath();
    grad.addColorStop(0, 'red');
    grad.addColorStop(0.5, 'yellow');
    grad.addColorStop(1, 'blue');
    context.fillStyle = grad;
    context.fillRect(0, 0, 140, 140);
}

r_grad();



/* 
 * 画像の組み込み
 * context.drawImage(image, dx, dy)
 *    @param {obj} image new Image()
 *    @param {num} dx canvasのx座標
 *    @param {num} dy canvasのy座標
 *
 * context.drawImage(image, dx, dy, dw, dh)
 *    @param {num} dw, dh dw/dhが指定されるとdwを横幅dhを縦幅としたサイズに伸縮される
 *
 * context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
 *    元の画像をトリミングしたものをCanvas上に描画
 *    @param {num} sx, sy, sw, sh 元画像の(sx, sy)から縦横の幅(sw, sh)をトリミングし、
        トリミングされた部分をcanvasの(dx, dy)座標に、縦横(dw, dh)のサイズに伸縮
 */

/* 画像の単純な配置 */
function img1() {
    var canvas = document.getElementById('img1');
    var context = canvas.getContext('2d');
    var img = new Image();

    /* 画像がキャッシュされても強制的にloadイベントを発生させる */
    img.src = 'img/img01.png?' + new Date().getTime();

    img.onload = function() {
        context.drawImage(img, 0, 0);
    };
}

/* 画像のトリミング */
function trim() {
    var canvas = document.getElementById('trim');
    var context = canvas.getContext('2d');
    var img = new Image();
    img.src = 'img/img01.png?' + new Date().getTime();
    img.onload = function() {
        context.drawImage(img, 100, 80, 50, 40, 80, 60, 150, 120);
    };
}


img1();
trim();



/*
 * テキストを描く
 * context.fillText(str, x, y)
 * context.strokeText(str, x, y)
 * context.fillStyle = 'color'
 * context.font = 'normal normal 32px/40px san-serif'
 * context.textBaseline = 'top'
 * context.textAlign = 'left'
 
 * fontプロパティはcssと同じ
 *     context.font = "12px 'Times New Roman'";
 *     context.font = "18px 'Monotype Corsiva'";
 *     context.font = "italic bold 22px 'ＭＳ Ｐゴシック'";
 *     context.font = "italic bold 26px 'HG正楷書体-PRO'";
 */
function text() {
    var canvas = document.getElementById('text');
    var context = canvas.getContext('2d');

    context.font = 'normal normal 32px/40px san-serif';
    context.fillText('ほげほげ', 0, 40);

    context.font = "italic bold 26px 'HG正楷書体-PRO'";
    context.fillText('fugafuga', 0, 80);

    context.font = "italic bold 26px 'HG正楷書体-PRO'";
    context.strokeText('moge', 0, 120);

}

text();

