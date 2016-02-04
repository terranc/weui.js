(function ($) {

    let $actionSheetWrapper = null;

    /**
     * show actionSheet
     * @param {Array} items
     */
    $.weui.actionSheet = function (items = []) {
        const cells = items.map((item, idx) => {
            return `<div class="weui_actionsheet_cell">${item.label}</div>`;
        }).join('');
        const html = `<div>
            <div class="weui_mask_transition"></div>
            <div class="weui_actionsheet">
                <div class="weui_actionsheet_menu">
                    ${cells}
                </div>
                <div class="weui_actionsheet_action">
                    <div class="weui_actionsheet_cell">取消</div>
                </div>
            </div>
        </div>`;

        $actionSheetWrapper = $(html);
        $('body').append($actionSheetWrapper);

        // add class
        $actionSheetWrapper.find('.weui_mask_transition').show().addClass('weui_fade_toggle');
        $actionSheetWrapper.find('.weui_actionsheet').addClass('weui_actionsheet_toggle');

        // bind event
        $actionSheetWrapper.on('click', '.weui_actionsheet .weui_actionsheet_cell', function (){
            const item = items[$(this).index()];
            const cb = item.onClick || $.noop;
            cb.call();
            $.weui.hideActionSheet();
        }).on('click', '.weui_mask_transition', function (){
            $.weui.hideActionSheet();
        }).on('click', '.weui_actionsheet_action .weui_actionsheet_cell', function (){
            $.weui.hideActionSheet();
        });
    };

    $.weui.hideActionSheet = function (){
        if(!$actionSheetWrapper){
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