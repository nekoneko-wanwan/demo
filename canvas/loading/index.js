/* アニメーションの動きをゆっくり見るために、同じ画像を複数指定している */
var images = [
    {src: 'img/ph01.jpg'},{src: 'img/ph02.jpg'},{src: 'img/ph03.jpg'},{src: 'img/ph04.jpg'},{src: 'img/ph05.jpg'},{src: 'img/ph06.jpg'},{src: 'img/ph07.jpg'},{src: 'img/ph08.jpg'},{src: 'img/ph09.jpg'},{src: 'img/ph010.jpg'},{src: 'img/ph01.jpg'},{src: 'img/ph02.jpg'},{src: 'img/ph03.jpg'},{src: 'img/ph04.jpg'},{src: 'img/ph05.jpg'},{src: 'img/ph06.jpg'},{src: 'img/ph07.jpg'},{src: 'img/ph08.jpg'},{src: 'img/ph09.jpg'},{src: 'img/ph010.jpg'},{src: 'img/ph01.jpg'},{src: 'img/ph02.jpg'},{src: 'img/ph03.jpg'},{src: 'img/ph04.jpg'},{src: 'img/ph05.jpg'},{src: 'img/ph06.jpg'},{src: 'img/ph07.jpg'},{src: 'img/ph08.jpg'},{src: 'img/ph09.jpg'},{src: 'img/ph010.jpg'}
];




//--------------------------------------------------------------------------
/* 矩形でローディング */
/* line */
function rect_line(zero_point) {
    var canvas = document.getElementById('rect_line');
    var ctx = canvas.getContext('2d');
    function draw() {
        var percentage = (zero_point * 100).toFixed(0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // メインの矩形描画
        ctx.beginPath();
        ctx.fillRect(0, 0, percentage, 7);

        // テキスト
        ctx.font = "18px 'MS Pゴシック'";
        ctx.fillText(percentage + '%', 0, 40);
    }
    return draw();
}
/* line reverse */
function rect_line2(zero_point) {
    var canvas = document.getElementById('rect_line2');
    var ctx = canvas.getContext('2d');
    function draw() {
        var percentage = (zero_point * 100).toFixed(0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // メインの矩形描画
        ctx.beginPath();
        ctx.fillRect(canvas.width - (canvas.width * zero_point), 0, 100, 7);

        // テキスト
        ctx.font = "18px 'MS Pゴシック'";
        ctx.fillText(percentage + '%', 0, 40);
    }
    return draw();
}

/* bg */
function rect_bg(zero_point) {
    var canvas = document.getElementById('rect_bg');
    var ctx = canvas.getContext('2d');
    function draw() {
        var percentage = (zero_point * 100).toFixed(0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // メインの矩形描画
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width * zero_point, canvas.height);

        // テキスト
        ctx.fillStyle = "#ffffff";
        ctx.font = "18px 'MS Pゴシック'";
        ctx.fillText(percentage + '%', 20, 75);
    }
    return draw();
}

/* bg reverse */
function rect_bg2(zero_point) {
    var canvas = document.getElementById('rect_bg2');
    var ctx = canvas.getContext('2d');
    function draw() {
        var percentage = (zero_point * 100).toFixed(0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // メインの矩形描画
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, canvas.height - (canvas.height * zero_point), canvas.width, canvas.height);

        // テキスト
        ctx.fillStyle = "#ffffff";
        ctx.font = "18px 'MS Pゴシック'";
        ctx.fillText(percentage + '%', 20, 75);
    }
    return draw();
}

/* alpha */
function alpha(zero_point) {
    var canvas = document.getElementById('alpha');
    var ctx = canvas.getContext('2d');
    function draw() {
        var percentage = (zero_point * 100).toFixed(0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // メインの矩形描画
        ctx.globalAlpha = zero_point;
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width * zero_point, canvas.height);

        // テキスト
        ctx.font = "18px 'MS Pゴシック'";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(percentage + '%', 45, 75);
    }
    return draw();
}





// ------------------------------------
/* 円でローディング */
/* circle_line */
function circle_line(zero_point) {
    var canvas = document.getElementById('circle_line');
    var ctx = canvas.getContext('2d');
    function draw() {
        var percentage = (zero_point * 100).toFixed(0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // メインの円枠描画
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.arc(70, 70, 60, Math.PI * 1.5, Math.PI * 2 * zero_point + Math.PI * 1.5, false);
        ctx.stroke();

        // テキスト
        ctx.font = "18px 'MS Pゴシック'";
        ctx.fillText(percentage + '%', 45, 75);
    }
    return draw();
}

/* circle_fill */
function circle_fill(zero_point) {
    var canvas = document.getElementById('circle_fill');
    var ctx = canvas.getContext('2d');
    var x = 70;
    var y = 70;
    var r = 60;
    function draw() {
        var percentage = (zero_point * 100).toFixed(0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 背景
        ctx.beginPath();
        ctx.fillStyle = '#eeeeee';
        ctx.arc(x, y, r, Math.PI * 1.5, Math.PI * 2 + Math.PI * 1.5, false);
        ctx.fill();

        // メインの円描画
        ctx.beginPath();
        ctx.moveTo(x, y);  // 開始点を決めるミソ
        ctx.fillStyle = '#000000';
        ctx.lineWidth = 5;
        ctx.arc(x, y, r, Math.PI * 1.5, Math.PI * 2 * zero_point + Math.PI * 1.5, false);
        ctx.fill();

        // テキスト
        ctx.fillStyle = '#aaa';
        ctx.font = "18px 'MS Pゴシック'";
        ctx.fillText(percentage + '%', 45, 75);
    }
    return draw();
}



// ------------------------------------
/* マスクでローディング */
/* 円形 */
function mask(zero_point) {
    var canvas = document.getElementById('mask');
    var ctx = canvas.getContext('2d');

    function draw() {
        var percentage = (zero_point * 100).toFixed(0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(70, 70, 60, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.clip();

        /* ただの矩形だがクリッピングされて円形となる */
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, canvas.height - (canvas.height * zero_point), canvas.width, canvas.height);

        // テキスト
        ctx.font = "18px 'MS Pゴシック'";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(percentage + '%', 45, 75);
    }
    return draw();
}

/* 複雑な形 */
function mask2(zero_point) {
    var canvas = document.getElementById('mask2');
    var ctx = canvas.getContext('2d');

    function draw() {
        var percentage = (zero_point * 100).toFixed(0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        /* キャラ本体 */
        ctx.beginPath();
        ctx.fillStyle = "#eeeeee";
        ctx.arc(70, 70, 60, Math.PI / 10, - Math.PI / 10,false);
        ctx.lineTo(60,70);
        ctx.fill();
        ctx.clip();

        /* ただの矩形だがクリッピングされてキャラの形となる */
        ctx.beginPath();
        ctx.fillStyle = "#f2ca27";
        ctx.fillRect(0, canvas.height - (canvas.height * zero_point), canvas.width, canvas.height);

        /* キャラの目 */
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.arc(85, 40, 5, 0, 10, false);
        ctx.fill();

        // テキスト
        ctx.font = "18px 'MS Pゴシック'";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(percentage + '%', 45, 110);
    }
    return draw();
}








//--------------------------------------------------------------------------
/* preloadJS */
var preload = new createjs.LoadQueue();

// 同時接続数
// preload.setMaxConnections(1);

/* progress イベントを使用する */
preload.on("progress", function(e) {
    var zero_point = (e.progress).toFixed(2);  // 0.01 ~ 1.00

    /* 各Canvasを実行 */
    rect_line(zero_point);
    rect_line2(zero_point);
    rect_bg(zero_point);
    rect_bg2(zero_point);
    alpha(zero_point);
    circle_line(zero_point);
    circle_fill(zero_point);
    mask(zero_point);
    mask2(zero_point);

    /* 完了したら... */
    if(e.progress === 1) {}

});

/* falseで保留状態にできる */
preload.loadManifest(images, false);

/* 保留にした時、実行する */
preload.load();
