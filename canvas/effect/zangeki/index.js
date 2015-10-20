/* 変数定義 */
var cs        = document.getElementById('myCanvas');
var ctx       = cs.getContext('2d');
var csWidth   = cs.width;
var csHeight  = cs.height;

/* 画像を生成し、読み込み後にエフェクト実行 */
var baseImg = new Image();
baseImg.src = 'img.jpg';
baseImg.onload = function() {
	zangeki();
};




/**
 * 斬撃エフェクト
 * Canvasの画像の比率が違うと、画像が変形されるのに注意
 */
var zangeki = function() {
	/* 変数定義 ----------------------------- */
	var hypotenuse; // Canvasの斜辺。動かす上限とする
	var basePos;    // 斬られる基準の位置（右上からのX座標）
	var move;       // 動く量
	var add;        // 加速度
	var alpha;      // 透明度
	var rad;        // ラジアン
	var deg;        // ラジアンを角度に変換


	/* 関数定義 ----------------------------- */
	/* 初期化。再利用しないなら、変数定義のところへまとめてしまってよい */
	var initialize = function() {
		hypotenuse = Math.sqrt(Math.pow(csWidth, 2) + Math.pow(csHeight, 2));
		basePos    = Math.round(Math.random() * csWidth / 2);
		move       = 0;
		add        = 0.1;
		alpha      = 1;

		/* 斬られる位置を元にした角度を求める */
		/* この角度を元に座標を変更していくことで移動とする */
		rad = Math.atan2(csHeight, csWidth - (basePos * 2));
		deg = rad * 180 / Math.PI;
	};

	var draw = {
		leftArea: function(isMove) {
			var x = -move * Math.cos(rad);
			var y = move * Math.sin(rad);

			ctx.save();
			/* クリッピングする範囲を設定 */
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(csWidth - basePos, 0);
			ctx.lineTo(basePos, csHeight);
			ctx.lineTo(0, csHeight);
			ctx.closePath();
			ctx.clip();
			/* 徐々に移動させる */
			if (isMove) {
				ctx.setTransform(1, 0, 0, 1, x, y);
			}
			ctx.drawImage(baseImg, 0, 0, csWidth, csHeight);
			ctx.restore();
		},
		rightArea: function(isMove) {
			var x = move * Math.cos(rad);
			var y = -move * Math.sin(rad);

			ctx.save();
			/* クリッピングする範囲を設定 */
			ctx.beginPath();
			ctx.moveTo(csWidth - basePos, 0);
			ctx.lineTo(csWidth, 0);
			ctx.lineTo(csWidth, csHeight);
			ctx.lineTo(basePos, csHeight);
			ctx.closePath();
			ctx.clip();
			/* 徐々に移動させる */
			if (isMove) {
				ctx.setTransform(1, 0, 0, 1, x, y);
			}
			ctx.drawImage(baseImg, 0, 0, csWidth, csHeight);
			ctx.restore();
		}
	};

	var render = function() {
		ctx.clearRect(0, 0, csWidth, csHeight);
		ctx.globalAlpha = alpha;
		draw.leftArea(true);
		draw.rightArea(true);

		/* 動いた量に応じて加速度を変更 */
		if (move  > 0 ) { add = 10;}
		if (move  > 50) { add = 0.2;}
		if (move  > 60) { add = 20;}

		/* 一定距離進んだら透明度を落としていく */
		if (move  > 300) {
			alpha -= 0.1;
			if (alpha < 0) {
				alpha = 0;
			}
		}

		move += add;
		var timer = requestAnimationFrame(render);

		/* 斜辺を超えたら一定時間停止し、再度エフェクトを開始する */
		if (move > hypotenuse + 10) { // +10はバッファ
			cancelAnimationFrame(timer);
			setTimeout(function() {
				initialize();
				render();
			}, 1000);
		}
	};

	initialize();
	render();
};











