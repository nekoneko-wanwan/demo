/*
 * ループ
 * 領域をはみ出たら1へ戻る
 */
function loop() {
    var cs  = document.getElementById('loop');
    var ctx = cs.getContext('2d');
    var w = cs.width;
    var h = cs.height;
    var x = 0;

    (function render() {
        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.strokeRect(x, 0, 10, 10);
        if (x > cs.width) {
            x = 0;
        } else {
            x += 1;
        }
        requestAnimationFrame(render);
    })();
}


/*
 * ループ
 * 領域を交互に
 */
function loop2() {
    var cs  = document.getElementById('loop2');
    var ctx = cs.getContext('2d');
    var w = cs.width;
    var h = cs.height;
    var x = 0;
    var isReverse = false;

    (function render() {
        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.strokeRect(x, 0, 10, 10);
        if (x > cs.width - 11) {
            isReverse = true;
        } else if(x === 0) {
            isReverse = false;
        }
        if(isReverse) {
            x--;
        } else {
            x++;
        }
        requestAnimationFrame(render);
    })();
}


/*
 * mix
 * 複数のitemを同時に描画
 */
function mix() {
    var cs  = document.getElementById('mix');
    var ctx = cs.getContext('2d');
    var w = cs.width;
    var h = cs.height;

    var Draw = function(x, y, addX, addY) {
        this.initialize(x, y, addX, addY);
    };
    Draw.prototype = {
        initialize: function(x, y, addX, addY) {
            this.x = x || 0;
            this.y = x || 0;
            this.addX = addX || 0;
            this.addY = addY || 0;
        },
        updatePos: function() {
            this.x += this.addX;
            this.y += this.addY;
        },
        drawing: function() {
            ctx.beginPath();
            ctx.strokeRect(this.x, this.y, 10, 10);
            if (this.x > cs.width) {
                this.x = 0;
            }
            if (this.y > cs.height) {
                this.y = 0;
            }
        },
        render: function() {
            this.updatePos();
            this.drawing();
        }
    };

    var item1 = new Draw(1, 1, 0, 1);
    var item2 = new Draw(1, 1, 1, 0);
    var item3 = new Draw(1, 1, 1, 1);

    (function render() {
        ctx.clearRect(0, 0, w, h);
        item1.render();
        item2.render();
        item3.render();
        requestAnimationFrame(render);
    })();
}


loop();
loop2();
mix();


/*
 * sine波
 * 上下にふわふわと動かす
 */
function sine() {
    var cs  = document.getElementById('sine');
    var ctx = cs.getContext('2d');
    var w   = cs.width;
    var h   = cs.height;
    var x   = 0;
    var y   = 0;
    var deg = 0;
    var rad;

    (function render() {
        x   += 1;
        // 角度を増やす
        deg += 10;
        // 角度をラジアンに変換
        rad = deg * Math.PI / 180;
        // y座標をsinに
        y = Math.sin(rad) * 20;

        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.strokeRect(x, y + 30, 10, 10);

        if (x > w) {
            x = 0;
        }

        requestAnimationFrame(render);
    })();
}


/*
 * circle
 * 円軌道を描く
 */
function circle() {
    var cs  = document.getElementById('circle');
    var ctx = cs.getContext('2d');
    var w   = cs.width;
    var h   = cs.height;
    var x   = 0;
    var y   = 0;
    var deg = 0;
    var rad;

    (function render() {
        x   += 1;
        // 角度を増やす
        deg += 3;
        // 角度をラジアンに変換
        rad = deg * Math.PI / 180;
        // x座標 = 円の中心x座標 + 半径 * Cos
        x   = 35 + 30 * Math.cos(rad);
        // Y座標 = 円の中心y座標 + 半径 * Sin
        y   = 25 + 30 * Math.sin(rad);

        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.strokeRect(x, y + 30, 10, 10);

        requestAnimationFrame(render);
    })();
}



sine();
circle();