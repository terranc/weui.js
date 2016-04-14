(function ($) {
    const oldFnUploader = $.fn.uploader;

    $.fn.uploader = function (options) {
        options = $.extend({
            title: '图片上传',
            maxCount: 4,
            compress: true,
            maxWidth: 500,
            auto: false,
            server: '',
            method: 'POST',
            accept: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'],
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
                                <input class="weui_uploader_input" type="file" accept="${options.accept.join(',')}">
                            </div>
                        </div>
                    </div>`;
        this.html(html);

        const $uploader = this;
        const $files = this.find('.weui_uploader_files');
        const $file = this.find('.weui_uploader_input');
        let count = 0;
        let blobs = [];

        /**
         * dataURI to blob, ref to https://gist.github.com/fupslot/5015897
         * @param dataURI
         */
        function dataURItoBlob(dataURI) {
            var byteString = atob(dataURI.split(',')[1]);
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], {type: mimeString});
        }

        /**
         * error
         */
        function error() {
            const $preview = $files.find('.weui_uploader_file').last();
            $preview.addClass('weui_uploader_status');
            $preview.html(`<div class="weui_uploader_status_content"><i class="weui_icon_warn"></i></div>`);
        }

        /**
         * success
         */
        function success() {
            const $preview = $files.find('.weui_uploader_file').last();
            $preview.removeClass('weui_uploader_status');
            $preview.html('');
        }

        /**
         * update
         * @param msg
         */
        function update(msg) {
            const $preview = $files.find('.weui_uploader_file').last();
            $preview.addClass('weui_uploader_status');
            $preview.html(`<div class="weui_uploader_status_content">${msg}</div>`);
        }

        function upload(file) {
            const fd = new FormData();
            fd.append('filename', file.name);
            fd.append('data', file.blob);
            $.ajax({
                type: options.method,
                url: options.server,
                data: fd,
                processData: false,
                contentType: false
            }).success(() => {
                success();
            }).error((err) => {
                error();
                // 抛出事件
                console.log(err);
            });
        }

        $file.on('change', function (event) {
            const files = event.target.files;

            if (files.length === 0) {
                return;
            }

            if (count >= options.maxCount) {
                $.weui.alert(`最多只能上传${options.maxCount}张图片`);
                return;
            }

            $.each(files, (idx, file) => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const img = new Image();
                    img.onload = function () {
                        // 不要超出最大宽度
                        const w = options.compress ? Math.min(options.maxWidth, img.width) : img.width;
                        // 高度按比例计算
                        const h = img.height * (w / img.width);
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        // 设置 canvas 的宽度和高度
                        canvas.width = w;
                        canvas.height = h;

                        const iphone = navigator.userAgent.match(/iPhone OS ([^\s]*)/);
                        if (iphone && iphone[1].substr(0, 1) == 7) {
                            if (img.width == 3264 && img.height == 2448) { // IOS7的拍照或选照片会被莫名地压缩，所以画板要height要*2
                                ctx.drawImage(img, 0, 0, w, h * 2);
                            } else {
                                ctx.drawImage(img, 0, 0, w, h);
                            }
                        } else {
                            ctx.drawImage(img, 0, 0, w, h);
                        }

                        const dataURL = canvas.toDataURL();
                        const blob = dataURItoBlob(dataURL);
                        blobs.push({name: file.name, blob: blob});
                        const blobUrl = URL.createObjectURL(blob);

                        $files.append(`<li class="weui_uploader_file " style="background-image:url(${blobUrl})"></li>`);
                        ++count;
                        $uploader.find('.weui_uploader_hd .weui_cell_ft').text(`${count}/${options.maxCount}`);

                        options.onChange.call($uploader, {
                            lastModified: file.lastModified,
                            lastModifiedDate: file.lastModifiedDate,
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            data: dataURL, // rename to `dataURL`, data will be remove later
                            dataURL: dataURL
                        });

                        // 如果是自动上传
                        if (options.auto) {
                            upload({name: file.name, blob: blob});
                        }
                    };

                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            });
        });

        /**
         * 主动调用上传
         */
        this.upload = function () {
            blobs.map((file) => {
                upload(file);
            });
        };

        return this;
    };
    $.fn.uploader.noConflict = function () {
        return oldFnUploader;
    };
})($);