(function() {


/* Canvas関係の変数 */
var canvas = document.getElementById('myCanvas');
var ctx    = canvas.getContext('2d');
var HEIGHT = canvas.height;
var WIDTH  = canvas.width;


/*
 * キャラクターコンストラクタ
 * @param {obj} draw 描画関数を定義
 * @param {num} x 初期x座標
 * @param {num} y 初期y座標
 * @param {num} width 横サイズ
 * @param {num} height 縦サイズ
 */
var Character = function(draw, x, y, width, height) {
    this.initialize(draw, x, y, width, height);
};

Character.prototype = {
    initialize: function(draw, x, y, width, height) {
        this.draw = draw;
        this.x = x || 0;
        this.y = y || 0;
        this.w = width  || 10;
        this.h = height || 10;
    },
    checkPosition: function() {
        if (this.x > WIDTH - this.w) {
            this.x = WIDTH - this.w - 1;
        } else if (this.x < 0) {
            this.x = 1;
        }

        if (this.y > HEIGHT - this.h) {
            this.y = HEIGHT - this.h - 1;
        } else if (this.y < 0) {
            this.y = 1;
        }
    },
    render: function() {
        this.checkPosition();
        this.draw();
    }
};


/* 各キャラクターの初期値を定義 */
var data = {
    player: {
        x: function() {
            return WIDTH / 2 - this.width;
        },
        y: function() {
            return HEIGHT / 2 - this.height;
        },
        width: 20,
        height: 20,
        moveHorizon: 20,
        moveVertical: 20
    },
    enemy: {
        x: function() {
            return Math.random() * WIDTH | 0;
        },
        y: function() {
            return Math.random() * HEIGHT | 0;
        },
        width: 10,
        height: 10,
        moveHorizon: 15,
        moveVertical: 15
    }
};

var player = new Character(
        function() {
            ctx.beginPath();
            ctx.strokeRect(this.x, this.y, this.w, this.h);
        },
        data.player.x(),
        data.player.y(),
        data.player.width,
        data.player.height
    );


/* 
 * Enemyコンストラクタ
 * Characterコンストラクタを継承する
 * 独自のプロパティとしてaddX, addYを追加
 * @param {num} addX, addY 移動量を定義
 */
var Enemy = function(addX, addY) {
    Character.call(
        this,
        function() {
            ctx.beginPath();
            ctx.fillRect(this.x, this.y, this.w, this.h);
        },
        data.enemy.x(),
        data.enemy.y(),
        data.enemy.width,
        data.enemy.height
    );
    this.addX = addX || 0;
    this.addY = addY || 0;
};
Enemy.prototype = new Character();


/* 
 * Enemyコンストラクタに、メソッドを追加・上書き
 * updatePosition(): 移動量
 * checkPosition(): Canvasのサイズを超えたら反対側へ
 * render: updatePosition(), checkPosition()を加えて実行
 */
Enemy.prototype.updatePosition = function() {
    this.x += this.addX;
    this.y += this.addY;
};
Enemy.prototype.checkPosition = function() {
    if (this.x > WIDTH) {
        this.x = 0;
    } else if (this.x < 0) {
        this.x = WIDTH - this.w;
    }
    if (this.y > HEIGHT) {
        this.y = 0;
        this.x = Math.random() * WIDTH - this.w;
    } else if (this.y < 0) {
        this.y = HEIGHT;
        this.x = Math.random() * WIDTH - this.w;
    }
};
Enemy.prototype.render = function() {
    this.updatePosition();
    this.checkPosition();
    this.draw();
};


/* 雑魚キャラの生成 */
var zakos = [];
function createZakos(max) {
    var _max = max || 1;
    var i;
    for (i = 0; i < _max; i++) {
        zakos[i] = new Enemy(0, 2 + Math.random() * 5);
    }
}
createZakos(20);

/* ボスキャラの生成 */
var boss = new Enemy(0, 7);
boss.w = 50;
boss.h = 50;


function isHit() {
    var bossX = Math.abs(player.x - boss.x) < player.w /2 + boss.w / 2;
    var bossY = Math.abs(player.y - boss.y) < player.h /2 + boss.h / 2;

    function isZako() {
        var b;
        var arr = [];
        /* zakoの中を走査してそれぞれヒット状況をbooleanでarr[]に格納する */
        for (var key in zakos) {
            arr[key] = ((Math.abs(player.x - zakos[key].x) < player.w /2 + zakos[key].w / 2) && (Math.abs(player.y - zakos[key].y) < player.h /2 + zakos[key].h / 2));
        }
        /* arrの中にtrueが見つからない場合 falseを返す */
        if (arr.indexOf(true) === -1) {
            b = false;
        } else {
            b = true;
        }
        return b;
    }

    /* boss もしくはzakoにヒットしているかどうか */
    return ((bossX && bossY) || (isZako()));
}


var mainRender = function() {

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    /* 各キャラクターの描画 */
    player.render();
    boss.addX = (Math.random() * 10) - 5 ;
    boss.render();

    for (var key in zakos) {
        zakos[key].render();
    }

    if(isHit()) {
        cancelAnimationFrame(mainRender);
        gameOver();
    } else {
        requestAnimationFrame(mainRender);
    }

};

/* Game over画面 */
function gameOver() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = '#ffffff';
    ctx.font = '30px sanserif';
    ctx.fillText('Game Over', WIDTH / 2 - 70, HEIGHT / 2);
}



/* keyが押されたらplayerのx,yを更新する */
function onKeyDown(e) {
    switch (e.keyCode) {
        case 37:
            player.x -= data.player.moveHorizon;
            break;
        case 38:
            player.y -= data.player.moveVertical;
            break;
        case 39:
            player.x += data.player.moveHorizon;
            break;
        case 40:
            player.y += data.player.moveVertical;
            break;
        default:
            break;
    }
}

document.addEventListener('keydown', onKeyDown, false);




mainRender();




})();