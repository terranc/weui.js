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
    $.weui.alert = function (options) {
        options = $.extend({
            title: 'alert',
            text: ''
        }, options);

        var html = '<div class="weui_dialog_alert">\n                <div class="weui_mask"></div>\n                <div class="weui_dialog">\n                    <div class="weui_dialog_hd">\n                        <strong class="weui_dialog_title">\n                            ' + options.title + '\n                        </strong>\n                    </div>\n                    <div class="weui_dialog_bd">\n                        ' + options.text + '\n                    </div>\n                    <div class="weui_dialog_ft">\n                        <a href="javascript:;" class="weui_btn_dialog primary">确定</a>\n                    </div>\n                </div>\n            </div>';
        var $alert = $(html);
        $('body').append($alert);
        $alert.on('click', '.weui_btn_dialog', function (e) {
            $alert.remove();
        });
    };
})($);