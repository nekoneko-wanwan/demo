
var $btn = $('button');
var BUTTON_INIT_MEG = "Animation Start (add '_on' class)";

$btn.on('click', function() {
	var $siblings = $(this).siblings('.block');
	var that = this;
	$(that).prop('disabled', true);
	$siblings.addClass('_on');

	setTimeout(function() {
		$(that).prop('disabled', false);
		$siblings.removeClass('_on');
	}, 1100);

});

