/**
 * Created by bearyan on 2016/2/16.
 */
(function(){
    function _validate($input){
        var input = $input[0], val = $input.val();

        if(input.tagName == "INPUT" || input.tagName == "TEXTAREA"){
            var reg =
                input.getAttribute("required")
                || input.getAttribute("pattern")
                || "";

            if(!$input.val().length){
                return "empty";
            }else if(reg){
                return new RegExp(reg).test(val) ? null : "notMatch";
            }else{
                return null;
            }
        }
        else if(
            input.getAttribute("type") == "checkbox"
            || input.getAttribute("type") == "radio"
        ){
            // 没有正则表达式：checkbox/radio要checked
            return input.checked ? null : "empty";
        }else if(val.length){
            // 有输入值
            return null;
        }

        return "empty";
    }

    $.fn.form = function(){
        $.each(this, function(index, ele){
            var $form = $(ele);
            $form.find("[required]")
                .on("blur", function(){
                    var $this = $(this), errorMsg;
                    if($this.val().length < 1) return; // 当空的时候不校验，以防不断弹出toptips

                    errorMsg = _validate($this);
                    if(errorMsg){
                        var tips =
                            $this.attr(errorMsg + "Tips")
                            || $this.attr("tips")
                            || $this.attr("placeholder");
                        if(tips) $.weui.topTips(tips);
                        $this.parents(".weui_cell").addClass("weui_cell_warn");
                    }
                })
                .on("focus", function(){
                    var $this = $(this);
                    $this.parents(".weui_cell").removeClass("weui_cell_warn");
                })
            ;
        });
        return this;
    };

    $.fn.validate = function(callback){
        var $requireds = $(this).find("[required]");
        for(var i = 0, len = $requireds.length; i < len; ++i){
            var $dom = $requireds.eq(i), error = _validate($dom);
            if(error){
                callback({
                    $dom: $dom,
                    msg: error
                });
                break;
            }
        }
        callback(null);
        return this;
    };
})();