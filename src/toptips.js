(function ($) {

    let $topTips = null;
    let timer = null;

    /**
     * show top tips
     * @param {String} content
     * @param {Object|Number} options
     */
    $.weui.topTips = function (content = 'topTips', options) {

        if ($topTips) {
            $topTips.remove();
            timer && clearTimeout(timer);
            $topTips = null;
        }

        if (typeof options === 'number') {
            options = {
                duration: options
            };
        }

        options = $.extend({
            duration: 3000
        }, options);
        const html = `<div class="weui_toptips weui_warn" style="display: block;">${content}</div>`;
        $topTips = $(html);
        $('body').append($topTips);

        timer = setTimeout(function () {
            $topTips && $topTips.remove();
            $topTips = null;
        }, options.duration);
    };

})($);