(function ($) {
    /**
     * alert
     * @param {String} content
     * @param {Object} options
     * @param {Function} yes
     */
    $.weui.alert = function (content, options, yes) {

        const type = typeof options === 'function';
        if (type) {
            yes = options;
        }

        options = $.extend({
            title: '提示',
            content: content || '提示内容',
            className: '',
            buttons: [{
                label: '确定',
                type: 'primary',
                onClick: yes
            }]
        }, type ? {} : options);
        options.className = `weui_dialog_alert ${options.className}`;

        $.weui.dialog(options);
    };
})($);
