(function ($) {
    var oldFnUploader = $.fn.uploader;
    $.fn.uploader = function (options) {
        options = $.extend({
            title: '图片上传',
            maxCount: 4,
            maxWidth: 500,
            onChange: $.noop
        }, options);

        const html = `<div class="weui_uploader">
                        <div class="weui_uploader_hd weui_cell">
                            <div class="weui_cell_bd weui_cell_primary">${options.title}</div>
                            <div class="weui_cell_ft">0/${options.maxCount}</div>
                        </div>
                        <div class="weui_uploader_bd">
                            <ul class="weui_uploader_files">
                            </ul>
                            <div class="weui_uploader_input_wrp">
                                <input class="weui_uploader_input" type="file" accept="image/jpg,image/jpeg,image/png,image/gif">
                            </div>
                        </div>
                    </div>`;
        this.html(html);

        const $uploader = this;
        const $files = this.find('.weui_uploader_files');
        const $file = this.find('.weui_uploader_input');
        var count = 0;
        $file.on('change', function (event) {
            var files = event.target.files;

            if (files.length === 0) {
                return;
            }

            if (count >= options.maxCount) {
                $.weui.alert(`最多只能上传${options.maxCount}张图片`);
                return;
            }

            $.each(files, (idx, file) => {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var img = new Image();
                    img.onload = function () {
                        // 不要超出最大宽度
                        var w = Math.min(options.maxWidth, img.width);
                        // 高度按比例计算
                        var h = img.height * (w / img.width);
                        var canvas = document.createElement('canvas');
                        var ctx = canvas.getContext('2d');
                        // 设置 canvas 的宽度和高度
                        canvas.width = w;
                        canvas.height = h;
                        ctx.drawImage(img, 0, 0, w, h);
                        var base64 = canvas.toDataURL('image/png');

                        $files.append(`<li class="weui_uploader_file " style="background-image:url(${base64})"></li>`);
                        ++count;
                        $uploader.find('.weui_uploader_hd .weui_cell_ft').text(`${count}/${options.maxCount}`);

                        options.onChange.call($uploader, {
                            lastModified: file.lastModified,
                            lastModifiedDate: file.lastModifiedDate,
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            data: base64
                        });
                    };

                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            });
        });

        this.update = function (progress) {
            var $preview = $files.find('.weui_uploader_file').last();
            $preview.addClass('weui_uploader_status');
            $preview.html(`<div class="weui_uploader_status_content">${progress}%</div>`);
        };

        this.success = function () {
            var $preview = $files.find('.weui_uploader_file').last();
            $preview.removeClass('weui_uploader_status');
            $preview.html('');
        };

        this.error = function () {
            var $preview = $files.find('.weui_uploader_file').last();
            $preview.addClass('weui_uploader_status');
            $preview.html(`<div class="weui_uploader_status_content"><i class="weui_icon_warn"></i></div>`);
        };

        return this;
    };
    $.fn.uploader.noConflict = function(){
        return oldFnUploader;
    };
})($);