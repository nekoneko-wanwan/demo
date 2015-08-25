var myCanvas = document.getElementById('myCanvas');
var context  = myCanvas.getContext('2d');

/* Canvasにgridを描画 */
var drawCanvas = function() {
	var drawGrid = function() {
		var row = 10;
		var col = 10;
		var width = myCanvas.width;
		var height = myCanvas.height;
		var len = {
			x: width / row,
			y: height / col
		};
		context.clearRect(0,0, width, height);

		context.lineWidth = 1;
		context.strokeStyle = '#ccc';

		for (var i = 1; i < len.x; i++) {

			if (i % 10 === 0) {
				context.strokeStyle = 'red';
			} else {
				context.strokeStyle = '#ccc';
			}

			context.beginPath();
			context.moveTo(i * row, 0);
			context.lineTo(i * row, height);
			context.stroke();
		}

		for (var j = 1; j < len.y; j++) {
			if (j % 10 === 0) {
				context.strokeStyle = 'red';
			} else {
				context.strokeStyle = '#ccc';
			}

			context.beginPath();
			context.moveTo(0, j * row);
			context.lineTo(width, j * row);
			context.stroke();
		}
	};
	drawGrid();
};


// ------------------------------------------------


$(function() {

	var $svg            = $('#mySvg');
	var $ranges         = $('input[type=range]');
	var $viewboxRanges  = $('.is-viewbox input[type=range]');
	var $svgRanges      = $('.is-svg input[type=range]');
	var $viewportRanges = $('.is-viewport input[type=range]');

	var update = {
		rangeVal: function() {
			$ranges.each(function() {
				var val = $(this).val();
				$(this).next('.slider__val').text(val);
			});
		},
		getVals: function(arr) {
			var vals = [];
			arr.each(function(i) {
				vals[i] = $(this).val();
			});
			return vals;
		},
		drawViewPort: function() {
			var viewport = this.getVals($viewportRanges);
			var w = viewport[0];
			var h = viewport[1];
			/* viewportとcanvasのサイズを更新 */
			$svg.attr('width', w).attr('height',h);
			myCanvas.width = w;
			myCanvas.height =h;

			/* 結果表示用テキストの更新 */
			var svgText = '<svg width="' + w + '" height="' + h + '" ...>';
			$('.is-viewport').find('.slider__result').text(svgText);

			/* wrapperも更新する */
			$('.wrapper').height(viewport[1]);
			drawCanvas();
		},
		drawSvg: function() {
			var viewBoxVals = this.getVals($viewboxRanges);
			var svgVals     = this.getVals($svgRanges);

			/* 結果表示用テキストの更新 */
			var viewBoxText = '<svg viewbox="' + viewBoxVals[0] + ' ' + viewBoxVals[1] + ' ' + viewBoxVals[2] + ' ' + viewBoxVals[3] + '" ...>';
			var svgText     = '<circle cx="' + svgVals[0] + '" cy="' + svgVals[1] + '" r="' + svgVals[2] + '" ...>';
			$('.is-viewbox').find('.slider__result').text(viewBoxText);
			$('.is-svg').find('.slider__result').text(svgText);

			/* SVGの描画 */
			$svg[0].setAttribute('viewBox', viewBoxVals[0] + ' ' + viewBoxVals[1] + ' ' + viewBoxVals[2] + ' ' + viewBoxVals[3]);
			$('#svgCircle').attr({
				cx: svgVals[0],
				cy: svgVals[1],
				r: svgVals[2]
			});
		},
		init: function() {
			this.rangeVal();
			this.drawViewPort();
			this.drawSvg();
		}
	};

	/* event */
	$ranges.on('change input', function() {
		update.init();
	});



	update.init();


});






