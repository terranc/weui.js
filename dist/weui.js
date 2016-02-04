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

    /**
     *  weui dialog
     * @param {Object} options
     */
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

    /**
     * close dialog
     */
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

    var $actionSheetWrapper = null;

    /**
     * show actionSheet
     * @param {Array} items
     */
    $.weui.actionSheet = function () {
        var items = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        var cells = items.map(function (item, idx) {
            return '<div class="weui_actionsheet_cell">' + item.label + '</div>';
        }).join('');
        var html = '<div>\n            <div class="weui_mask_transition"></div>\n            <div class="weui_actionsheet">\n                <div class="weui_actionsheet_menu">\n                    ' + cells + '\n                </div>\n                <div class="weui_actionsheet_action">\n                    <div class="weui_actionsheet_cell">取消</div>\n                </div>\n            </div>\n        </div>';

        $actionSheetWrapper = $(html);
        $('body').append($actionSheetWrapper);

        // add class
        $actionSheetWrapper.find('.weui_mask_transition').show().addClass('weui_fade_toggle');
        $actionSheetWrapper.find('.weui_actionsheet').addClass('weui_actionsheet_toggle');

        // bind event
        $actionSheetWrapper.on('click', '.weui_actionsheet .weui_actionsheet_cell', function () {
            var item = items[$(this).index()];
            var cb = item.onClick || $.noop;
            cb.call();
            $.weui.hideActionSheet();
        }).on('click', '.weui_mask_transition', function () {
            $.weui.hideActionSheet();
        }).on('click', '.weui_actionsheet_action .weui_actionsheet_cell', function () {
            $.weui.hideActionSheet();
        });
    };

    $.weui.hideActionSheet = function () {
        if (!$actionSheetWrapper) {
            return;
        }

        var $mask = $actionSheetWrapper.find('.weui_mask_transition');
        var $actionsheet = $actionSheetWrapper.find('.weui_actionsheet');

        $mask.removeClass('weui_fade_toggle');
        $actionsheet.removeClass('weui_actionsheet_toggle');

        $actionsheet.on('transitionend', function () {
            $actionSheetWrapper.remove();
            $actionSheetWrapper = null;
        }).on('webkitTransitionEnd', function () {
            $actionSheetWrapper.remove();
            $actionSheetWrapper = null;
        });
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
                onClick: no || $.noop
            }, {
                label: '确定',
                type: 'primary',
                onClick: yes || $.noop
            }]
        }, type ? {} : options);

        $.weui.dialog(options);
    };
})($);
'use strict';

(function ($) {
    var $loading = null;

    /**
     * show loading
     * @param {String} content
     */
    $.weui.loading = function () {
        var content = arguments.length <= 0 || arguments[0] === undefined ? 'loading...' : arguments[0];

        var html = '<div class="weui_loading_toast">\n        <div class="weui_mask_transparent"></div>\n        <div class="weui_toast">\n            <div class="weui_loading">\n                <div class="weui_loading_leaf weui_loading_leaf_0"></div>\n                <div class="weui_loading_leaf weui_loading_leaf_1"></div>\n                <div class="weui_loading_leaf weui_loading_leaf_2"></div>\n                <div class="weui_loading_leaf weui_loading_leaf_3"></div>\n                <div class="weui_loading_leaf weui_loading_leaf_4"></div>\n                <div class="weui_loading_leaf weui_loading_leaf_5"></div>\n                <div class="weui_loading_leaf weui_loading_leaf_6"></div>\n                <div class="weui_loading_leaf weui_loading_leaf_7"></div>\n                <div class="weui_loading_leaf weui_loading_leaf_8"></div>\n                <div class="weui_loading_leaf weui_loading_leaf_9"></div>\n                <div class="weui_loading_leaf weui_loading_leaf_10"></div>\n                <div class="weui_loading_leaf weui_loading_leaf_11"></div>\n            </div>\n            <p class="weui_toast_content">' + content + '</p>\n        </div>\n    </div>';
        $loading = $(html);
        $('body').append($loading);
    };

    /**
     * hide loading
     */
    $.weui.hideLoading = function () {
        $loading && $loading.remove();
        $loading = null;
    };
})($);
'use strict';

(function ($) {
    $.fn.progress = function (options) {
        var _this = this;

        options = $.extend({
            value: 0
        }, options);
        if (options.value < 0) {
            options.value = 0;
        }

        if (options.value > 100) {
            options.value = 100;
        }

        var $progress = this.find('.weui_progress_inner_bar');
        if ($progress.length === 0) {
            var opr = typeof options.onClick === 'function' ? '<a href="javascript:;" class="weui_progress_opr">\n                    <i class="weui_icon_cancel"></i>\n                </a>' : '';
            var html = '<div class="weui_progress">\n                <div class="weui_progress_bar">\n                    <div class="weui_progress_inner_bar" style="width: ' + options.value + '%;"></div>\n                </div>\n                ' + opr + '\n            </div>';
            if (typeof options.onClick === 'function') {
                this.on('click', '.weui_progress_opr', function () {
                    options.onClick.call(_this);
                });
            }
            return this.html(html);
        }

        //return $progress.animate({
        //    width: `${options.value}%`
        //}, 100);
        return $progress.width(options.value + '%');
    };
})($);
'use strict';

(function ($) {

    /**
     * show toast
     * @param {String} content
     * @param {Object|Number} options
     */
    $.weui.toast = function () {
        var content = arguments.length <= 0 || arguments[0] === undefined ? 'toast' : arguments[0];
        var options = arguments[1];

        if (typeof options === 'number') {
            options = {
                duration: options
            };
        }

        options = $.extend({
            duration: 3000
        }, options);
        var html = '<div>\n            <div class="weui_mask_transparent"></div>\n            <div class="weui_toast">\n                <i class="weui_icon_toast"></i>\n                <p class="weui_toast_content">' + content + '</p>\n            </div>\n        </div>';
        var $toast = $(html);
        $('body').append($toast);

        setTimeout(function () {
            $toast.remove();
            $toast = null;
        }, options.duration);
    };
})($);
'use strict';

(function ($) {

    var $topTips = null;

    /**
     * show top tips
     * @param {String} content
     * @param {Object|Number} options
     */
    $.weui.topTips = function () {
        var content = arguments.length <= 0 || arguments[0] === undefined ? 'topTips' : arguments[0];
        var options = arguments[1];

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
        var html = '<div class="weui_toptips weui_warn" style="display: block;">' + content + '</div>';
        $topTips = $(html);
        $('body').append($topTips);

        setTimeout(function () {
            $topTips.remove();
            $topTips = null;
        }, options.duration);
    };
})($);