describe('tab', function () {

    var $tab;
    var $tabbarItems;
    var $tabbdItems;

    before(function () {
        $('body').append(`<div class="weui_tab">
                <div class="weui_tab_bd">
                    <div class="weui_tab_bd_item"> </div>
                    <div class="weui_tab_bd_item"> </div>
                </div>
                <div class="weui_tabbar">
                    <a href="javascript:;" class="weui_tabbar_item">
                        <div class="weui_tabbar_icon">
                            <img src="https://weui.github.io/weui/images/icon_nav_button.png" alt="">
                        </div>
                        <p class="weui_tabbar_label">按钮</p>
                    </a>
                    <a href="javascript:;" class="weui_tabbar_item">
                        <div class="weui_tabbar_icon">
                            <img src="https://weui.github.io/weui/images/icon_nav_msg.png" alt="">
                        </div>
                        <p class="weui_tabbar_label">表单</p>
                    </a>
                </div>
            </div>`);
        $tab = $('.weui_tab');
        $tabbdItems = $tab.find('.weui_tab_bd_item');
        $tabbarItems = $tab.find('.weui_tabbar_item');
        $tab.tab();
    });

    it('should have $.fn.tab method', function () {
        expect($.fn.tab).to.be.a('function');
    });

    it('should have default active tab', function () {
        expect($tabbarItems.eq(0).hasClass('weui_bar_item_on')).to.be(true);
        expect($tabbarItems.eq(0).siblings().hasClass('weui_bar_item_on')).to.be(false);
        expect($tabbdItems.eq(0).is(':visible')).to.be(true);
        expect($tabbdItems.eq(0).siblings().is(':visible')).to.be(false);
    });

    it('should active the tab when tabbar_item is clicked', function(){
        for(var i = 0, len = $tabbarItems.length; i < len; i++){
            $tabbarItems.eq(i).trigger('click');
            expect($tabbarItems.eq(i).hasClass('weui_bar_item_on')).to.be(true);
            expect($tabbarItems.eq(i).siblings().hasClass('weui_bar_item_on')).to.be(false);
            expect($tabbdItems.eq(i).is(':visible')).to.be(true);
            expect($tabbdItems.eq(i).siblings().is(':visible')).to.be(false);
        }
    });

    after(function(){
        $tab.remove();
    });

});