$(function() {

    /**************************************
    * slider
    ***************************************/
    var $slider      = $('#slider-trigger');
    var $sliderLists = $slider.find('li');
    var CLASS        = 'is-active';

    /**
     * classを付け替える関数
     * @param {object} $el: $sliderListsに含まれるliをjqueryObjectとして渡す
     */
    function switchClass($el) {
        /* Delete */
        $sliderLists.removeClass(CLASS);
        /* Add */
        $el.addClass(CLASS);
    }

    /**
     * slider
     */
    function slider() {
        var option = {
            /* sliderが読み込まれたら */
            onSliderLoad: function(currentIndex) {
                /* load後すぐに実行するとcssのtransitionと発動タイミングがずれることがあるためdelay */
                setTimeout(function() {
                    var $el = $($sliderLists[currentIndex]);
                    switchClass($el);
                }, 100);
            },
            /* sliderが完了したら */
            onSlideAfter: function($el, oldIndex, newIndex) {
                switchClass($el);
                sl.startAuto();  // クリックしてもautoを止めない
            },
            responsive: false,
            controls: false,
            pause: 6000,
            speed: 800,
            auto: true
        };
        var sl = $slider.bxSlider(option);  // optionの後に定義すること
    }

    /* コンテンツが読み込まれたら実行 */
    $(window).load(function() {
        slider();
    });

});