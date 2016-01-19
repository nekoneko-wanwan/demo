(function() {

	var $flexContainer   = $('#js-flexbox-container');
	var $containerSelect = $('select', '#js-select-area');
	var $itemSelect      = $('select', $flexContainer);

	var CONTAINER_CLASS_NAME = '.flexbox-container';
	var ITEM_CLASS_NAME      = '.flexbox-item';

	var showPropertyList = [
		'display',
		'flex-direction',
		'flex-wrap',
		'justify-content',
		'align-items',
		'align-content'
	];



	/**
	 * containerに指定されている特定のスタイル返す
	 * @param {array} arr cssプロパティを配列で渡す
	 * @return {obj} {property: val,...}形式で返す
	 */
	/* cssプロパティを配列 */
	var getContainerStyle = function(arr) {
		var i = 0;
		var l = arr.length;
		var hash = {};
		for (; i < l; i++) {
			hash[arr[i]] = $flexContainer.css(arr[i]) + ';';
		}
		return hash;
	};



	/**
	 * cssのプロパティと値をhtml上に表示する
	 * @param {hash} {property: val,...}形式で渡す
	 */
	var showSelectedStyle = function(hash) {
		var str = '/* flexbox関連のみ, prefixは省略 */\n' + CONTAINER_CLASS_NAME + ' ' + JSON.stringify(hash, null, '    ');
		str = str.replace(/\"/g, '');
		str = str.replace(/,/g, '');
		$('#js-shorthand').html(str);
	};



	/* containerのselect内が変更されたら実行する */
	var changeStyle = function($target) {
		var name   = $(this).attr('name');
		var val    = $(this).val();
		var regexp = new RegExp('is-' + name + '(\\S+)', 'g');

		// is-{name}のついたclass名を一括削除して、新しいclassを付与
		// select内の値は一意のため
		$target.removeClass(function(index, className) {
			// console.log(className.match(regexp));
			return (className.match(regexp) || []).join(' ');
		})
		.addClass(val);

		showSelectedStyle(getContainerStyle(showPropertyList));
	};



	/* 読み込み時に適用 */
	var initStyle  = function() {
		$containerSelect.each(function() {
			$flexContainer.addClass($(this).val()).addClass('is-shown');
		});
		$itemSelect.each(function() {
			$(this).parent(ITEM_CLASS_NAME).addClass($(this).val());
		});

		showSelectedStyle(getContainerStyle(showPropertyList));
	};



	$(function() {
		// load
		initStyle();

		// change Event
		$containerSelect.on('change', function() {
			changeStyle.call(this, $flexContainer);
		});
		$itemSelect.on('change', function() {
			changeStyle.call(this, $(this).parent(ITEM_CLASS_NAME));
		});
	});



})();
