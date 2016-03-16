(function ($) {
    var oldFnTab = $.fn.tab;
    $.fn.tab = function (options){
        options = $.extend({
            defaultIndex: 0,
            activeClass: `weui_bar_item_on`
        }, options);
        const $tabbarItems = this.find('.weui_tabbar_item, .weui_navbar_item');
        const $tabBdItems = this.find('.weui_tab_bd_item');

        // iOS 下不能点击 navbar, 先用js设一下z-index, 后面在 css 设置
        this.find('.weui_navbar').css('z-index', 1);

        this.toggle = function (index){
            const $defaultTabbarItem = $tabbarItems.eq(index);
            $defaultTabbarItem.addClass(options.activeClass).siblings().removeClass(options.activeClass);

            const $defaultTabBdItem = $tabBdItems.eq(index);
            $defaultTabBdItem.show().siblings().hide();
        };
        const self = this;

        this.on('click', '.weui_tabbar_item, .weui_navbar_item', function (e){
            const index = $(this).index();
            self.toggle(index);
        });



        this.toggle(options.defaultIndex);

        return this;
    };
    $.fn.tab.noConflict = function(){
        return oldFnTab;
    };
})($);