$(function() {
    var $slider      = $('.slider__inner');
    var $sliderLists = $slider.find('li');
    var CLASS        = 'is-active';

    /**
     * classを付け替える関数
     * @param {object} $elm: $sliderListsに含まれるliをjqueryObjectとして渡す
     */
    function switchClass($elm) {
        /* Delete */
        $sliderLists.removeClass(CLASS);
        /* Add */
        $elm.addClass(CLASS);
    }

    /* sliderのオプション */
    var options = {
        /* sliderが読み込まれたら */
        onSliderLoad: function(currentIndex) {
            var $elm = $($sliderLists[currentIndex]);
            switchClass($elm);
        },
        /* sliderが完了したら */
        onSlideAfter: function($elm, oldIndex, newIndex) {
            switchClass($elm);
        },
        randomStart: true,
        auto: true
    };

    /* コンテンツが読み込まれたら実行 */
    $(window).load(function() {
        /* bxSlider実行 */
        $('.slider__inner').bxSlider(options);
    });
});