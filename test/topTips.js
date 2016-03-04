describe('topTips', function () {
    it('should have $.weui.topTips method', function () {
        expect($.weui.topTips).to.be.a('function');
    });

    it('should render topTips with `.weui_warn` class when $.weui.topTips is called', function () {
        $.weui.topTips();
        var $topTips = $('.weui_toptips');
        expect($topTips.length).not.to.be(0);
        expect($topTips.hasClass('weui_warn')).to.be(true);
        $topTips.remove();
    });
});