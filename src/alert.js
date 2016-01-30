
(function ($){
    $.weui.alert = function (options){
        options = $.extend({
            title: 'alert',
            text: ''
        }, options);

        const html = `<div class="weui_dialog_alert">
                <div class="weui_mask"></div>
                <div class="weui_dialog">
                    <div class="weui_dialog_hd">
                        <strong class="weui_dialog_title">
                            ${options.title}
                        </strong>
                    </div>
                    <div class="weui_dialog_bd">
                        ${options.text}
                    </div>
                    <div class="weui_dialog_ft">
                        <a href="javascript:;" class="weui_btn_dialog primary">确定</a>
                    </div>
                </div>
            </div>`;
        const $alert = $(html);
        $(`body`).append($alert);
        $alert.on(`click`, '.weui_btn_dialog', (e) => {
            $alert.remove();
        });
    };
})($);