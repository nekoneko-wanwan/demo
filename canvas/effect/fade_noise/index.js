var alpha = 1;

function noiseFade() {
	var cs = document.getElementById('myCanvas');
	var ctx = cs.getContext('2d');
	var colors = [];
	var colSize = 30;

	var createRandomColors = function () {
		for (var i = 0; i < 3; i++) {
			colors[i] = (Math.random() * 50 + 1 | 0);
		}
	};

	ctx.globalAlpha = alpha;
	ctx.clearRect(0, 0, cs.width, cs.height);

	for (var col = 0; col < cs.height / colSize; col++) {
		for (var row = 0; row < cs.width / colSize; row++) {
			createRandomColors();
			ctx.fillStyle = "rgb(" + colors[0] + "," + colors[1] + "," + colors[2] + ")";
			ctx.fillRect(row * colSize, col * colSize, colSize, colSize);
		}
	}

	if (alpha > 0) {
		alpha -= 0.01;
		requestAnimationFrame(noiseFade);
	} else {
		ctx.clearRect(0, 0, cs.width, cs.height);
	}
}

noiseFade();

