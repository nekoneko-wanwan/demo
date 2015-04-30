(function($){
	var settings, status;
	var Status = {
		CLOSE: 0,
		OPEN: 1,
		IN_PROGRESS: 2
	};
	var smY, sfY, mfY, moveY, startY, draggedY, startTime, diffTime;


	function _open() {
		status = Status.OPEN;
		$(settings.menu + ", " + settings.main_contents).addClass('show');
		$(settings.menu_contents).show();
		$("html, body").css("overflow-x", "hidden");
		$("html").bind("touchmove.scrollContents", function() {
			event.preventDefault();
		});
		event.preventDefault();
	};

	function _close() {
		status = Status.IN_PROGRESS;
		$(settings.menu + ", " + settings.main_contents).removeClass('show');
		$("html").unbind("touchmove.scrollContents");
		event.preventDefault();
	};

	function _buttonTouchStart() {
		switch(status) {
			case Status.IN_PROGRESS:
				status = Status.CLOSE;
				break;

			case Status.OPEN:
				_close();
				break;

			case Status.CLOSE:
				break;
		}
	}

	function _buttonTouchEnd() {
		switch(status) {
			case Status.IN_PROGRESS:
				status = Status.CLOSE;
				break;

			case Status.OPEN:
				break;

			case Status.CLOSE:
				_open();
				break;
		}
	};

	function _bodyTouchStart() {
		switch(status) {
			case Status.IN_PROGRESS:
			case Status.CLOSE:
				break;

			case Status.OPEN:
				_close();
				break;
		}
	}

	$.fn.slideMenu = function(options) {
		settings = $.extend({}, $.fn.slideMenu.defaults, options);
		status = Status.CLOSE;
		var button_selector = this.selector;

		smY = 0;

		$(document).ready(function() {
			var menu_list_height;

			//menu button - touchstart
			$(button_selector).bind("touchstart.menu_button", function() {
				_buttonTouchStart();
			});

			//menu button - touchend
			$(button_selector).bind("touchend.menu_button"  , function() {
				_buttonTouchEnd();
			});

			//main contents
			$(settings.main_contents).bind("touchstart.main_contents", function() {
				_bodyTouchStart();
			});


			//scroll - touchStart
			$(settings.menu_contents).bind("touchstart.scrollMenu", function() {
				menu_list_height = $(settings.menu_list).height();
				sfY = event.touches[0].screenY;
				startTime = (new Date()).getTime();
				startY = event.changedTouches[0].clientY;
			});

			//scroll - touchMove
			$(settings.menu_contents).bind("touchmove.scrollMenu", function() {
				mfY = event.changedTouches[0].screenY;
				moveY = smY + mfY - sfY;
				draggedY = event.changedTouches[0].clientY - startY;

				$(this).css({
					'-webkit-transition': 'none',
					'-webkit-transform': 'translate3d(0px,'+ moveY +'px,0px)'
				});
			});

			//scroll - touchEnd
			$(settings.menu_contents).bind("touchend.scrollMenu", function() {
				diffTime = (new Date()).getTime() - startTime;
				smY = smY + (mfY - sfY);

				if (diffTime < 200 && draggedY > 0) { // scroll up
					moveY += Math.abs((draggedY / diffTime) * 500);
					$(settings.menu_contents).css({
						'-webkit-transition': '-webkit-transform .7s ease-out',
						'-webkit-transform': 'translate3d(0px,'+ moveY +'px,0px)'
					});
					smY = moveY;
				} else if (diffTime < 200 && draggedY < 0) { // scroll down
					moveY -= Math.abs((draggedY / diffTime) * 500);
					$(settings.menu_contents).css({
						'-webkit-transition': '-webkit-transform .7s ease-out',
						'-webkit-transform': 'translate3d(0px,'+ moveY +'px,0px)'
					});
					smY = moveY;
				}

				if (moveY > 0) {
					$(settings.menu_contents).css({
						'-webkit-transition': '-webkit-transform .5s ease-out',
						'-webkit-transform': 'translate3d(0px,'+ 0 +'px,0px)'
					});
					smY = 0;
				} else if (screen.height - menu_list_height > moveY + settings.bottom_margin) {
					$(settings.menu_contents).css({
						'-webkit-transition': '-webkit-transform .5s ease-out',
						'-webkit-transform': 'translate3d(0px,'+ (screen.height - menu_list_height - settings.bottom_margin) +'px,0px)'
					});
					smY = screen.height - menu_list_height - settings.bottom_margin;
				}
			});
		});
	};

	$.fn.slideMenu.defaults = {
		main_contents: "#main_contents",
		menu: "#slidemenu",
		menu_contents: "#slidemenu_contents",
		menu_list: "#slidemenu_list",
		speed: 200,
		width: 240,
		bottom_margin: 80
	};

})(jQuery);