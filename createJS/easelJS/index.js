// 単純な図形の描画
// -----------------------------
/* 矩形 */
function simpleRect() {
    var cs = document.getElementById('simple_rect');
    var stage = new createjs.Stage(cs);

    function initialize() {
        var myGraphics = new createjs.Graphics();
        // Shape()にはgraphicsオブジェクトが渡せる
        var myShape = new createjs.Shape(myGraphics);
        stage.addChild(myShape);
        draw(myGraphics);
    }

    function draw(myGraphics) {
        myGraphics
            .beginFill("#000")  // 必須
            .rect(0, 0, 100, 100)
        ;
        stage.update();
    }
    initialize();
}

/* 円形 */
function simpleCircle() {
    var cs = document.getElementById('simple_circle');
    var stage = new createjs.Stage(cs);

    function initialize() {
        var myGraphics = new createjs.Graphics();
        var myShape = new createjs.Shape(myGraphics);
        stage.addChild(myShape);
        myShape.x = 50;
        myShape.y = 50;
        draw(myGraphics);
    }

    function draw(myGraphics) {
        myGraphics
            .beginFill("#eee")
            .beginStroke("999")
            // Shapeの座標位置を基準とする
            .drawCircle(0, 0, 50)  // 円の中心x座標, 円の中心y座標, radius
        ;
        stage.update();
    }
    initialize();
}

/* 星形 */
function simpleStar() {
    var cs = document.getElementById('simple_star');
    var stage = new createjs.Stage(cs);

    function initialize() {
        var myGraphics = new createjs.Graphics();
        var myShape = new createjs.Shape(myGraphics);
        stage.addChild(myShape);
        myShape.x = 50;
        myShape.y = 50;
        draw(myGraphics);
    }

    function draw(myGraphics) {
        myGraphics
            .beginFill("#eee")
            /**
             * drawPolyStar(x, y, radius, sides, pointSize, angle)
             *
             * @param x: 中心x座標
             * @param y: 中心y座標
             * @param y: 中心から頂点までの半径
             * @param sides: 多角形の頂点数
             * @param pointSize: 谷の深さ（0~0.9）0は谷のない正多角形
             * @param angle: 書き始めの頂点の角度（度数） -90で書き始めを12時の方向に
             */
            .drawPolyStar(0, 0, 50, 6, 0.5, -90)
        ;
        stage.update();
    }
    initialize();
}

/* random */
function randomColor() {
    var cs = document.getElementById('random_color');
    var stage = new createjs.Stage(cs);

    function initialize() {
        var myGraphics = new createjs.Graphics();
        var myShape = new createjs.Shape(myGraphics);
        stage.addChild(myShape);
        myShape.x = 50;
        myShape.y = 50;
        draw(myGraphics);
    }

    function getRandomColor() {
        var randomNumber = Math.floor(Math.random() * 0xFFFFFF);  // 0以上0xFFFFFF未満
        // randomNumber.toString(16);してやると、見慣れた#000000のような形式（文字列）に変換される

        /* RGBカラーを整数一つで取得できる */
        var randomColor = createjs.Graphics.getRGB(randomNumber);
        return randomColor;
    }

    function draw(myGraphics) {
        myGraphics
            .setStrokeStyle(10)
            .beginStroke(getRandomColor())
            .beginFill(getRandomColor())
            .rect(0, 0, 50, 50)
        ;
        stage.update();
    }
    initialize();
}

simpleRect();
simpleCircle();
simpleStar();
randomColor();



// アニメーション
// -----------------------------
/* 単純なループ */
function animLoop() {
    var cs = document.getElementById('anim_loop');
    var stage = new createjs.Stage(cs);
    var myShape = new createjs.Shape();
    var myGraphics = myShape.graphics;


    function initialize() {
        stage.addChild(myShape);
    }

    function draw() {
        myGraphics
            .beginFill("#999")
            .rect(0, 0, 10, 10)
        ;
    }

    function update() {
        if (myShape.x > cs.width) {
            myShape.x = 0;
        } else {
            myShape.x += 5;
        }
        stage.update();
    }

    function timer() {
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener('tick', update);
    }

    function render() {
        initialize();
        draw();
        update();
        timer();
    }

    render();
}

/* 回転 */
function animRotate() {
    var cs = document.getElementById('anim_rotate');
    var stage = new createjs.Stage(cs);
    var myShape = new createjs.Shape();
    var myGraphics = myShape.graphics;

    function initialize() {
        stage.addChild(myShape);
        myShape.x = 60;
        myShape.y = 60;

        /* myGraphicsの幅 / 2で回転基準を中心にできる */
        myShape.regX = 10;
        myShape.regY = 10;
    }

    function draw() {
        myGraphics
            .beginFill("#999")
            .rect(0, 0, 20, 20)  // ここでのx,y座標は回転の円周に影響（位置自体は基準となっているmyShapeの方で調整してやる）
        ;
    }

    function update() {
        myShape.rotation += 5;
        stage.update();
    }

    function timer() {
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener('tick', update);
    }

    function render() {
        initialize();
        draw();
        update();
        timer();
    }

    render();
}


animLoop();
animRotate();



// イベント
// -----------------------------
/* マウスクリック */
function evClick() {
    var cs = document.getElementById('ev_click');
    var stage = new createjs.Stage(cs);

    /**
     * @constructor
     * @param x: shape.graphicsのx座標に使用
     * @param y: shape.graphicsのy座標に使用
     * @param r: shape.graphicsの半径
     * @param {boolean} event: shapeにaddEventするかどうか
     */
    var OriginalShape = function(x, y, r, event) {
        this.shape = new createjs.Shape();
        this.initialize(x, y, r, event);
        stage.addChild(this.shape);
    };
    OriginalShape.prototype = {
        initialize: function(x, y, r, event) {
            this.shape.x = x;
            this.shape.y = y;
            this.r = r;
            this.event = event || false;
        },
        draw: function(myGraphics, r, color) {
            color = color || "#eee";
            myGraphics
                .beginFill(color)
                .drawCircle(0, 0, r)
            ;
        },
        /* クリックされたときに処理 */
        move: function(e) {
            // var instance = e.target;
            e.target.x += 10;
            stage.update();
        },
        render: function() {
            var color = false;
            var randomColor = Math.random() * 0xFFFFFF | 0;
            randomColor = createjs.Graphics.getRGB(randomColor);

            if (this.event) {
                color = randomColor;
                this.shape.addEventListener('click', this.move);
            }

            this.draw(this.shape.graphics, this.r, color);
            stage.update();
        }
    };

    function render() {
        var arr = [];
        for (var i = 1; i < 3; i++) {
            if (i === 2) {
                arr.push(new OriginalShape(50 * i , 50 * i, 30, false));
            } else {
                arr.push(new OriginalShape(50 * i , 50 * i, 30, true));
            }
        }
        for(var j = 0; j < 2; j++) {
            arr[j].render();
        }
    }

    render();
}

/* ドラッグ&ドロップ */
function evDD() {
    var cs = document.getElementById('ev_dd');
    var stage = new createjs.Stage(cs);

    /**
     * @constructor
     * @param x: shape.graphicsのx座標に使用
     * @param y: shape.graphicsのy座標に使用
     * @param r: shape.graphicsの半径
     * @param {boolean} event: shapeにaddEventするかどうか
     */
    var OriginalShape = function(x, y, r, event) {
        this.shape = new createjs.Shape();
        this.initialize(x, y, r, event);
        stage.addChild(this.shape);
    };
    OriginalShape.prototype = {
        initialize: function(x, y, r, event) {
            this.shape.x = x;
            this.shape.y = y;
            this.r = r;
            this.event = event || false;
        },
        draw: function(myGraphics, r, color) {
            color = color || "#eee";
            myGraphics
                .beginFill(color)
                .drawCircle(0, 0, r)
            ;
        },

        /*
        displayObjectにはリスナーにmousemove / mouseupが無い
        ドラッグのように利用する場合はmouse downのeventオブジェクトにpressmoveを設定する
        ※mousemove, mouseup → pressmove, pressupにEaselJS0.7.0からイベント名が変わった
        */
        startDrag: function(e) {
            var instance = e.target;
            instance.addEventListener('pressmove', this.drag);
            instance.addEventListener('pressup', this.stopDrag);

            /* マウス座標のxy座標を収めるためのPointオブジェクト */
            instance.offset = new createjs.Point(instance.x - e.stageX, instance.y - e.stageY);
        },
        /* ドラッグ終了時にイベントリスナーを削除する */
        stopDrag: function(e) {
            var instance = e.target;
            instance.removeEventListener('pressmove', this.drag);
            instance.removeEventListener('pressup', this.drag);
        },
        /* ドラッグ中の処理 */
        drag: function(e) {
            var instance = e.target;
            /* インスタンスから見た押された座標の差を加えることで、ポインタの位置を保つ */
            var offset = instance.offset;
            instance.x = e.stageX + offset.x;
            instance.y = e.stageY + offset.y;
            stage.update();
        },


        render: function() {
            var color = false;
            var randomColor = Math.random() * 0xFFFFFF | 0;
            randomColor = createjs.Graphics.getRGB(randomColor);

            if (this.event) {
                color = randomColor;
                /* イベント内でthisを使うためbindを利用（しないとthis=windowを指す） */
                this.shape.addEventListener('mousedown', this.startDrag.bind(this));
            }
            this.draw(this.shape.graphics, this.r, color);
            stage.update();
        }
    };

    function render() {
        var arr = [];
        for (var i = 1; i < 3; i++) {
            if (i === 1) {
                arr.push(new OriginalShape(50 * i , 50 * i, 30, false));
            } else {
                arr.push(new OriginalShape(50 * i , 50 * i, 30, true));
            }
        }
        for(var j = 0; j < 2; j++) {
            arr[j].render();
        }
    }

    render();
}

evClick();
evDD();

