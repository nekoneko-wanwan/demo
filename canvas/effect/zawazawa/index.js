


/**
 * ざわ・・・メーカー
 * @param {obj} cs: canvas object
 * @param {number} zawaNum: 生成する「ざわ・・・」の数
 * @param {boolean} isBordering: 縁取りするかどうか
 *     黒文字の場合は白フチに、白文字の場合は黒フチに
 * @param {boolean} isColorBlack: 黒文字にするかどうか（falseで白文字）
 * @param {boolean} isRightFlow: 右から流れるようにするか
 */
var zawaMaker = function(cs, zawaNum, isBordering, isColorBlack, isRightFlow ) {
    var ctx      = cs.getContext('2d');
    var csWidth  = cs.width;
    var csHeight = cs.height;
    var zawas    = [];

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
     * @constructor
     */
    var ZawaZawa = function() {
        this.initialize();
    };

    ZawaZawa.prototype = {
        initialize: function() {
            this.scale     = getRandomInt(10, 5) / 10; // 1 ~ 0.5の倍率
            this.width     = this.scale * 160;  // 元サイズを大体150pxくらいと規定
            this.height    = this.scale * 60;   // 元サイズを大体60pxくらいと規定
            this.moveX     = getRandomInt(csWidth  - this.width, 0);
            this.moveY     = getRandomInt(csHeight - this.height, 0);
            this.addMoveX  = this.scale * 5;  // 奥行きを出すために、小さい要素は移動量を少なくする
            this.alpha     = 1;
        },
        setStatus: function() {
            /* 変換マトリクスを初期化 */
            ctx.setTransform(1, 0, 0, 1, 0, 0);

            ctx.scale(this.scale, this.scale);
            ctx.translate(this.moveX, this.moveY);
            ctx.globalAlpha = this.alpha;
        },
        update: function() {
            /* scaleで座標軸がズレているので、scaleした分を割った値をCanvasサイズとする */
            var _csWidth = csWidth / this.scale;

            /* 流れる向きの条件分岐 */
            if (isRightFlow) {
                if (this.moveX + this.width + 50 < 0 ) {
                    this.alpha = 0;
                    this.moveX = _csWidth + this.width;

                    /* scaleを変えるため再設定 */
                    this.scale    = getRandomInt(10, 5) / 10;
                    this.width    = this.scale * 160;
                    this.height   = this.scale * 60;
                    this.moveY    = getRandomInt(csHeight - this.height, 0);
                    this.addMoveX = this.scale * 5;
                } else {
                    this.moveX -= this.addMoveX;
                    this.alpha += 0.01;
                }
            } else {
                if (this.moveX >_csWidth) {
                    this.alpha = 0;
                    this.moveX = - this.width;

                    /* scaleを変えるため再設定 */
                    this.scale    = getRandomInt(10, 5) / 10;
                    this.width    = this.scale * 160;
                    this.height   = this.scale * 60;
                    this.moveY    = getRandomInt(csHeight - this.height, 0);
                    this.addMoveX = this.scale * 5;
                } else {
                    this.moveX += this.addMoveX;
                    this.alpha += 0.01;
                }
            }

            /* 透明度が1以上の場合は透明度の増加を止める */
            if (this.alpha > 1) {
                this.alpha = 1;
            }
        },
        draw: function() {
            /**
             * @param {number} width: 線の太さ
             * @param {string} color: 線の色
             */
            function createZawaPath(width, color) {
                ctx.lineWidth = width;
                ctx.strokeStyle = color;
                ctx.beginPath();
                ctx.lineCap = "round";
                ctx.lineJoin = "round";

                // ざ
                ctx.moveTo(10, 45);
                ctx.lineTo(50, 45);

                ctx.moveTo(25, 35);
                ctx.lineTo(50, 60);
                ctx.lineTo(20, 60);
                ctx.bezierCurveTo(5, 60, 5, 75, 20, 75);
                ctx.lineTo(50, 75);

                ctx.moveTo(38, 30);
                ctx.lineTo(38, 36);

                ctx.moveTo(46, 30);
                ctx.lineTo(46, 36);

                // わ
                ctx.moveTo(70, 35);
                ctx.lineTo(70, 75);

                ctx.moveTo(60, 45);
                ctx.lineTo(80, 45);
                ctx.lineTo(60, 75);
                ctx.bezierCurveTo(80, 25, 120, 70, 85, 75);

                // ・・・
                ctx.moveTo(110, 60);
                ctx.lineTo(115, 60);

                ctx.moveTo(125, 60);
                ctx.lineTo(130, 60);

                ctx.moveTo(140, 60);
                ctx.lineTo(145, 60);

                ctx.closePath();
                ctx.stroke();
            }

            /* 縁取と黒・白文字の条件分岐 */
            if (isBordering && isColorBlack) {
                createZawaPath(15, 'white');
                createZawaPath(6, 'black');
            }
            if (isBordering && !isColorBlack) {
                createZawaPath(15, 'black');
                createZawaPath(6, 'white');
            }
            if (!isBordering && isColorBlack) {
                createZawaPath(6, 'black');
            }
            if (!isBordering && !isColorBlack) {
                createZawaPath(6, 'white');
            }

        },
        render: function() {
            this.setStatus();
            this.draw();
            this.update();
        }
    };


    /**
     * ざわインスタンスの作成
     * @return zawas[instance, instance...];
     */
    function createZawas(num) {
        var i = 0;
        for (; i < num; i++) {
            zawas[zawas.length] = new ZawaZawa();
        }
    }

   /**
     * 描画
     */
    function render() {
        var i = 0;
        var l = zawas.length;
        ctx.setTransform(1,0,0,1,0,0);
        ctx.clearRect(0, 0, csWidth, csHeight);
        for (; i < l; i++) {
            zawas[i].render();
        }
        requestAnimationFrame(render);
    }

    /* 実行 */
    createZawas(zawaNum);
    render();
};


var cs1 = document.getElementById('myCanvas1');
var cs2 = document.getElementById('myCanvas2');
var cs3 = document.getElementById('myCanvas3');
var cs4 = document.getElementById('myCanvas4');


/* args: canvasオブジェクト, ざわの数, 縁取りか, 黒文字か, 右から流すか */
zawaMaker(cs1, 10, false, true, false);
zawaMaker(cs2, 10, true, true, true);
zawaMaker(cs3, 10, false, false, false);
zawaMaker(cs4, 10, true, false, true);

