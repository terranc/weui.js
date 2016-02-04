(function ($) {

    let $topTips = null;

    /**
     * show top tips
     * @param {String} content
     * @param {Object|Number} options
     */
    $.weui.topTips = function (content = 'topTips', options) {

        if ($topTips) {
            return;
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

        setTimeout(function () {
            $topTips.remove();
            $topTips = null;
        }, options.duration);
    };

})($);