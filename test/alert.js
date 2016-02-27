describe('alert', function () {
    it('should have $.weui.alert method', function () {
        expect($.weui.alert).to.be.a('function');
    });

    it('should render alert when $.weui.alert is called', function () {
        $.weui.alert();
        var $alert = $('.weui_dialog_alert');
        expect($alert.length).to.not.be(0);
        $alert.remove();
    });

    it('should render alert with mask when $.weui.alert is called', function () {
        $.weui.alert();
        var $alert = $('.weui_dialog_alert');
        var $mask = $alert.find('.weui_mask');
        expect($mask.length).to.not.be(0);
        $alert.remove();
    });

    ['this is content'].map(function (content) {
        it('should render with content when $.weui.alert is called with one params', function () {
            $.weui.alert(content);
            var $alert = $('.weui_dialog_alert');
            var $content = $alert.find('.weui_dialog_bd');
            expect($content.html().trim()).to.equal(content);
            $alert.remove();
        });
    });

    ['this is title'].map(function (title) {
        it('should render with title when $.weui.alert is called with two params', function () {
            $.weui.alert('content', {title: title});
            var $alert = $('.weui_dialog_alert');
            var $title = $alert.find('.weui_dialog_title');
            expect($title.text().trim()).to.equal(title);
            $alert.remove();
        });
    });

    ['className', ''].map(function (className) {
        it('should render with className when $.weui.alert is called with two params', function () {
            $.weui.alert('content', {className: className});
            var $alert = $('.weui_dialog_alert');
            expect($alert.hasClass(className)).to.be.ok();
            $alert.remove();
        });
    });
});