$(function () {
    $('.container').on('click', '#btnAlert', function (e) {
        $.weui.alert('警告你', function () {
            console.log('知道了...');
        });
    }).on('click', '#btnConfirm', function (e) {
        $.weui.confirm('确认删除吗？', function () {
            console.log('删除了...');
        }, function () {
            console.log('不删除...');
        });
    }).on('click', '#btnDialog', function (e) {
        $.weui.dialog({
            title: '自定义标题',
            content: '自定义内容',
            buttons: [{
                label: '知道了',
                type: 'default',
                onClick: function () {
                    console.log('知道了......');
                }
            }, {
                label: '好的',
                type: 'primary',
                onClick: function () {
                    console.log('好的......');
                }
            }]
        });
    }).on('click', '#btnToast', function (e) {
        $.weui.toast('已完成');
    }).on('click', '#btnLoading', function (e) {
        $.weui.loading('数据加载中...');
        setTimeout($.weui.hideLoading, 3000);
    }).on('click', '#btnTopTips', function (e) {
        $.weui.topTips('格式不对');
    }).on('click', '#btnActionSheet', function (e) {
        $.weui.actionSheet([{
            label: '示例菜单',
            onClick: function () {
                console.log('click1');
            }
        }, {
            label: '示例菜单',
            onClick: function () {
                console.log('click2');
            }
        }, {
            label: '示例菜单',
            onClick: function () {
                console.log('click3');
            }
        }]);
    });

    $('#uploader').uploader({
        maxCount: 2,
        onChange: function (file) {
            // uploading....
            var progress = 0;
            var self = this;

            function uploading() {
                progress = ++progress % 100;
                self.update(progress);

                if (progress === 99) {
                    self.success();
                }
                else {
                    setTimeout(uploading, 10);
                }
            }

            setTimeout(uploading, 10);
        }
    });

    // 为表单加入检测功能，当required的元素blur时校验，并弹出错误提示
    var $form = $("#form");
    $form.form();

    // 表单校验，并返回错误的$dom和对应的错误信息
    $("#formSubmitBtn").on("click", function(){
        var error = $form.validate();
        if(error){
            var $dom = error.$dom, msg = error.msg,
                tips =
                $dom.attr(error + "Tips")
                || $dom.attr("tips")
                || $dom.attr("placeholder");
            if(tips) $.weui.topTips(tips);
            $dom.parents(".weui_cell").addClass("weui_cell_warn");
        }
    });
});

