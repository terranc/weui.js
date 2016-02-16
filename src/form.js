/**
 * Created by bearyan on 2016/2/16.
 */
(function () {
    function _validate($input) {
        var reg =
            $input[0].getAttribute("required")
            || $input[0].getAttribute("pattern")
            || "";

        if (reg) {
            // 有正则表达式时 要符合正则
            if (new RegExp(reg).test($input.val())) return null;
            else return "notMatch";
        }
        else if (
            $input[0].getAttribute("type") == "checkbox"
            || $input[0].getAttribute("type") == "radio"
        ) {
            // 没有正则表达式：checkbox/radio要checked
            return $input[0].checked ? null : "empty";
        }
        else if ($input.val().length) {
            // 有输入值
            return null;
        }

        return "empty";
    }

    $.fn.form = function () {
        var $form = $(this);
        $form.find("[required]")
            .on("blur", function () {
                var $this = $(this), error = _validate($this);
                if (error) {
                    var tips =
                        $this.attr(error + "Tips")
                        || $this.attr("tips")
                        || $this.attr("placeholder");
                    if (tips) $.weui.topTips(tips);
                    $this.parents(".weui_cell").addClass("weui_cell_warn");
                }
            })
            .on("focus", function () {
                var $this = $(this);
                $this.parents(".weui_cell").removeClass("weui_cell_warn");
            })
        ;
    };

    $.fn.validate = function (callback) {
        var $requireds = $(this).find("[required]");
        for (var i = 0, len = $requireds.length; i < len; ++i) {
            var $dom = $requireds.eq(i), error = _validate($dom);
            if (error) {
                callback({
                    $dom: $dom,
                    msg: error
                });
            }
            else {
                callback(null);
            }
        }
        return this;
    };
})();