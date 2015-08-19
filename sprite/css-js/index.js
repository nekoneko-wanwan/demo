$(function() {



function changePosition() {
	var $target = $('.character.is-js');
	var ROW     = 64;
	var LIMIT   = 7;
	var i       = 0;

	setInterval(function(){
		// 'px ' ←半角スペース必須
		var move = -(ROW * i) + 'px ' + 0 +'px';
		$target.css({
			"background-position": move
		});
		if (i === LIMIT) {
			i = 0;
		} else {
			i++;
		}
	}, 70);
}


changePosition();


function changeClass() {
	var $target = $('.character.is-css-js');
	var LIMIT   = 7;
	var i       = 0;

	setInterval(function(){
		$target.attr('class', 'is-position-' + i).addClass('character is-css-js');
		if (i === LIMIT) {
			i = 0;
		} else {
			i++;
		}
	}, 70);
}

changeClass();



});