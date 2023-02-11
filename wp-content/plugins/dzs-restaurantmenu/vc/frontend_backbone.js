window.InlineShortcodeView_restaurantmenu = window.InlineShortcodeView.extend({
    render: function() {
        window.InlineShortcodeView_restaurantmenu.__super__.render.call(this);
//        console.info(jQuery('.dzs-progress-bar'));

        var _tel = this.$el;

        //console.info(_tel, this);


            var _t = jQuery(this);
//            console.info(_t);

        console.warn("TRYING TO INIT _TEL",_tel, _tel.find('.rst-menu-main-con.auto-init'));
        if(window.dzsrst_init){

            dzsrst_init(_tel.find('.rst-menu-main-con.auto-init'), {init_each: true});
        }
        if(window.dzszfl_init){

            dzszfl_init('.zfolio.auto-init', {init_each: true});
        }
        if(window.dzstaa_init){

            dzstaa_init('.dzs-tabs.auto-init', {init_each: true});
        }

            if(_t.hasClass('dzstaa-loaded')){
                //if(typeof(_t.get(0))!='undefined' && typeof(_t.get(0).api_restart_and_reinit)!='undefined'){
                //    _t.get(0).api_restart_and_reinit();
                //}

            }else{
                if(jQuery.fn.zoomtimeline){

                    _t.zoomtimeline();
                }else{
                    console.log('zoomtimeline not definied');
                }
            }




//
//
//        setTimeout(function(){
//            jQuery(window).trigger('resize');
//        },50);
        return this;
    }
});


