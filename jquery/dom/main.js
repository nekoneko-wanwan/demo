$(function() {

    function counter() {
        var x = 0;
        return function() {
            return x++;
        };
    }
    var count = {
        append      : counter(),
        appendTo    : counter(),
        prepend     : counter(),
        prependTo   : counter(),
        after       : counter(),
        insertAfter : counter(),
        before      : counter(),
        insertBefore: counter(),
        wrap        : counter(),
        wrapInner   : counter(),

        dmy: null
    };


    /* append() */
    $('#method-append').on('click', function() {
        var dom = '<li class="add">&lt;li&gt;追加されました: ' + count.append() + '個目&lt;/li&gt;</li>';
        var $target = $(this).next().next('ul');
        $target.append(dom);
    });


    /* appendTo() */
    $('#method-appendTo').on('click', function() {
        var dom = '<li class="add">&lt;li&gt;追加されました: ' + count.appendTo() + '個目&lt;/li&gt;</li>';
        var $target = $(this).next().next('ul');
        $(dom).appendTo($target);
    });


    /* prepend() */
    $('#method-prepend').on('click', function() {
        var dom = '<li class="add">&lt;li&gt;追加されました: ' + count.prepend() + '個目&lt;/li&gt;</li>';
        var $target = $(this).next().next('ul');
        $target.prepend(dom);
    });


    /* prependTo() */
    $('#method-prependTo').on('click', function() {
        var dom = '<li class="add">&lt;li&gt;追加されました: ' + count.prependTo() + '個目&lt;/li&gt;</li>';
        var $target = $(this).next().next('ul');
        $(dom).prependTo($target);
    });


    /* after() */
    $('#method-after').on('click', function() {
        var dom = '<p class="add">&lt;p&gt;追加されました: ' + count.after() + '個目&lt;/p&gt;</p>';
        var $target = $(this).siblings('div.dmy-end');
        $target.after(dom);
    });


    /* insertAfter() */
    $('#method-insertAfter').on('click', function() {
        var dom = '<p class="add">&lt;p&gt;追加されました: ' + count.insertAfter() + '個目&lt;/p&gt;</p>';
        var $target = $(this).siblings('div.dmy-end');
        $(dom).insertAfter($target);
    });


    /* before() */
    $('#method-before').on('click', function() {
        var dom = '<p class="add">&lt;p&gt;追加されました: ' + count.before() + '個目&lt;/p&gt;</p>';
        var $target = $(this).siblings('div.dmy-start');
        $target.before(dom);
    });


    /* insertBefore() */
    $('#method-insertBefore').on('click', function() {
        var dom = '<p class="add">&lt;p&gt;追加されました: ' + count.insertBefore() + '個目&lt;/p&gt;</p>';
        var $target = $(this).siblings('div.dmy-start');
        $(dom).insertBefore($target);
    });


    /* wrap() */
    $('#method-wrap').on('click', function() {
        var dom = '<div class="addDiv">&lt;div class="add-' + count.wrap() +'"&gt;</div>';
        var $target = $(this).next('div.wrap').find('p.p');
        $target.wrap(dom).after('&lt;/div&gt;');
    });


    /* wrapInner() */
    $('#method-wrapInner').on('click', function() {
        var dom = '<span>&lt;span&gt;</span>';
        var $target = $(this).next().next('ul').find('.dmy');
        $target.wrapInner(dom).after('&lt;/span&gt;');
    });


    /* wrapAll() */
    $('#method-wrapAll').one('click', function() {
        var dom = '<div class="addDiv">&lt;div&gt;</div>';
        var $target = $(this).next('div.wrap').find('p.p');

        $target.wrapAll(dom);
        $('div.wrap').after('<div class="addDiv">&lt;/div&gt;</div>');
    });


});