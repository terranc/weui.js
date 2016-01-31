/*!
 * WeUI.js v0.0.1 (https://github.com/progrape/weui.js)
 * Copyright 2016
 * Licensed under the MIT license
 */
'use strict';

(function ($) {
    $.weui = {
        version: '0.0.1'
    };
})($);
'use strict';

(function ($) {

    var $dialog = null;

    $.weui.dialog = function (options) {
        options = $.extend({
            title: '标题',
            content: '内容',
            className: '',
            buttons: [{
                label: '确定',
                type: 'primary',
                onClick: $.noop
            }]
        }, options);

        var buttons = options.buttons.map(function (button) {
            return '<a href="javascript:;" class="weui_btn_dialog ' + button.type + '">' + button.label + '</a>';
        }).join('\n');
        var html = '<div class="' + options.className + '">\n                <div class="weui_mask"></div>\n                <div class="weui_dialog">\n                    <div class="weui_dialog_hd">\n                        <strong class="weui_dialog_title">\n                            ' + options.title + '\n                        </strong>\n                    </div>\n                    <div class="weui_dialog_bd">\n                        ' + options.content + '\n                    </div>\n                    <div class="weui_dialog_ft">\n                        ' + buttons + '\n                    </div>\n                </div>\n            </div>';
        $dialog = $(html);
        $('body').append($dialog);
        $dialog.on('click', '.weui_btn_dialog', function () {
            var button = options.buttons[$(this).index()];
            var cb = button.onClick || $.noop;
            cb.call();
            $.weui.closeDialog();
        });
    };

    $.weui.closeDialog = function () {
        if ($dialog) {
            $dialog.off('click', '.weui_btn_dialog');
            $dialog.remove();
            $dialog = null;
        }
    };
})($);
'use strict';

(function ($) {
    /**
     * alert
     * @param {String} content
     * @param {Object} options
     * @param {Function} yes
     */
    $.weui.alert = function (content, options, yes) {

        var type = typeof options === 'function';
        if (type) {
            yes = options;
        }

        options = $.extend({
            title: '警告',
            content: content || '警告内容',
            className: '',
            buttons: [{
                label: '确定',
                type: 'primary',
                onClick: yes
            }]
        }, type ? {} : options);
        options.className = 'weui_dialog_alert ' + options.className;

        $.weui.dialog(options);
    };
})($);
'use strict';

(function ($) {
    /**
     * confirm
     * @param {String} content
     * @param {String} options
     * @param {Function} yes
     * @param {Function} no
     */
    $.weui.confirm = function (content, options, yes, no) {

        var type = typeof options === 'function';
        if (type) {
            no = yes;
            yes = options;
        }

        options = $.extend({
            title: '确认',
            content: content || '确认内容',
            className: '',
            buttons: [{
                label: '取消',
                type: 'default',
                onClick: no
            }, {
                label: '确定',
                type: 'primary',
                onClick: yes
            }]
        }, type ? {} : options);

        $.weui.dialog(options);
    };
})($);