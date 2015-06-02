// 基本的な動き
// -----------------------------
/* 落下してスライドするアニメーション */
function twBasic() {
    var cs = document.getElementById('tw_basic');
    var stage = new createjs.Stage(cs);
    var myShape = new createjs.Shape();
    var myGraphics = myShape.graphics;

    function initialize() {
        stage.addChild(myShape);
        // 中心で回転させるのに必要
        myShape.x = 10;
        myShape.regX = 5;
        myShape.regY = 5;
    }

    function draw() {
        myGraphics
            .beginFill("#999")
            .rect(0, 0, 10, 10)
        ;
    }

    function setTween() {

        /* 以下のようにメソッドチェーンを行わないで処理もできる
         get()はスクリプトが見やすくするためだけでありTween()コンストラクタと同じ

         var myTween = createjs.Tween(myShape, {loop: true});
         myTween.to()...
        */
        createjs.Tween
            .get(myShape, {loop: true})
            .to({
                y: 130,
                rotation: 360
            }, 3000, createjs.Ease.bounceOut)
            .wait(1000)
            .to({
                x: 130,
                alpha: 0
            }, 2000, createjs.Ease.bounceOut)
        ;
    }

    function timer() {
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener('tick', update);
    }

    function update() {
        stage.update();
    }

    function render() {
        initialize();
        setTween();
        draw();
        update();
        timer();
    }

    render();
}


/* 開始位置をランダムにする */
function twRandom() {
    var cs = document.getElementById('tw_random');
    var stage = new createjs.Stage(cs);
    var myShape = new createjs.Shape();
    var myGraphics = myShape.graphics;

    function initialize() {
        stage.addChild(myShape);
    }

    /**
     * 位置の再定義定義
     * Tween.call()でこの関数を呼び出す
     */
    function setAppearance() {
        myShape.x = Math.random() * (cs.width - 10);
    }

    function draw() {
        setAppearance();
        myGraphics
            .beginFill("#999")
            .rect(0, 0, 10, 10)
        ;
    }

    function setTween() {
        createjs.Tween
            .get(myShape, {loop: true})
            .to({y: 130}, 1000, createjs.Ease.bounceOut)
            .call(setAppearance)
        ;
    }

    function timer() {
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener('tick', update);
    }

    function update() {
        stage.update();
    }

    function render() {
        initialize();
        setTween();
        draw();
        update();
        timer();
    }

    render();
}





twBasic();
twRandom();

