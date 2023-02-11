var coll_buffer=0;
var func_output='';



function htmlEncode(arg){
    return jQuery('<div/>').text(arg).html();
}

function htmlDecode(value){
    return jQuery('<div/>').html(arg).text();
}

function get_shortcode_attr(arg, argtext){

    var regex_aattr = new RegExp(arg+'="(.*?)"');

    //console.log(regex_aattr, argtext);

    var aux = regex_aattr.exec(argtext);

    if(aux){
        var foutobj = {'full' : aux[0], 'val' : aux[1]};
        return foutobj;
    }



    return false;
}


// -- tbc

var dzsrst_arr_params_mode_video_gallery = []
var dzsrst_arr_params = []

//,'desc_count',
window.dzsrst_standard_options = ['mode','term_id','item_skin',  'item_link_thumb_con_to','item_link_info_to','item_link_title_to','mode_tabs_aligment','mode_tabs_skin','post_type','category_multiplication','order','orderby'];



jQuery(document).ready(function($){




    var startinit = '';

    if(dzsrst_settings && dzsrst_settings.startSetup){
        window.dzsrst_startinit = dzsrst_settings.startSetup;
    }

    startinit = window.dzsrst_startinit;

    console.info('startinit is '+startinit);

    var coll_buffer=0;
    var fout='';


    if(window.dzsrst_standard_options){

    }else{

        window.dzsrst_standard_options = [];
    }


    $('.shortcode-field').each(function(){
        var _t = $(this);

        window.dzsrst_standard_options.push(_t.attr('name'));
    })


    // console.warn(top.dzsrst_startinit);
    // ---- some custom code for initing the generator ( previous values )
    if(startinit){


        var arr_settings = [];

        // console.warn(arr_settings);
        arr_settings = arr_settings.concat(dzsrst_standard_options);
        // console.warn(arr_settings);

        $('.dzsrst-admin').append('<div class="misc-initSetup"><h5>Start Setup</h5></h5><p>'+htmlEncode(startinit)+'</p></div>');


        var res;
        var lab='';

        console.warn('arr_settings -', arr_settings);




        for(var key in arr_settings){

            // console.info(key);
            lab = arr_settings[key];
            res = get_shortcode_attr(lab, startinit);
           // console.info(res, lab, top.dzsp_startinit);
            if(res){
                if(lab=='id'){
                    lab = 'dzsrst_selectid';
                }
                if(lab=='db'){
                    lab = 'dzsrst_selectdb';
                }
                if(lab=='cat'){




                }else{

                    // console.info(lab);

                    var _c = $('*[name="'+lab+'"]');
                    if(lab=='type' || lab=='term_id'){
                        console.warn('changing now', lab, res, _c);
                    }
                    // console.warn('lab -', lab, res, _c);

                    _c.val(res['val']);
                    _c.trigger('change');
                }
            }
        }
    }



    var _feedbacker = $('.feedbacker');

    _feedbacker.fadeOut("slow");
    $('#insert_tests').unbind('click');
    $('#insert_tests').bind('click', click_insert_tests);

    $(document).delegate('.import-sample, .hide-notice', 'click', handle_mouse);
    $(document).delegate('select[name=mode],select[name=type],select[name=linking_type]', 'change', handle_submit);
    // $(document).delegate('', 'change', handle_submit);

    $(document).on('change.dzsdepe', '.dzs-dependency-field,*[name="0-settings-vpconfig"]',handle_change_dependency);
    $(document).on('submit','form.install-sample-data, form.remove-sample-data', handle_submit);


    setTimeout(function(){

        $(document).on('change','select[name=category_multiplication]', handle_submit);
    },50);
    setTimeout(function(){

        $(document).on('change','*[name=post_type]', handle_submit);
    },5000);


    // console.info(window.generator_settings.sample_data);

    var sample_data_arr = [];

    if(window.generator_settings && window.generator_settings.sample_data){
        sample_data_arr = JSON.parse(window.generator_settings.sample_data);

        // console.warn(sample_data_arr);
    }








    $("select[name=term_id_select_multiple]").chosen({
        'width': '100%'
    });

    $("select[name=term_id_select_multiple]").on('change', function(){
        var _t = $(this);

        var fout = '';

        // console.info(_t, _t.val());


        var val = _t.val();

        for(var i23 in val){
            if(fout){
                fout+=',';
            }
            fout+=val[i23];
        }

        $("input[name=term_id]").val(fout);

    });

    $("select[name=term_id_select]").on('change', function(){
        var _t = $(this);


        $("input[name=term_id]").val(_t.val());

    });





    var val = $("input[name=term_id]");

    var vals = String(val.val()).split(',');

    // console.warn(vals);






    var opts = $("select[name=term_id_select_multiple]").children('option');

    opts.each(function(){
        var _t3 = $(this);

        // console.info(_t3);

        for(var i=0;i<vals.length;i++){
            if(_t3.get(0).value == vals[i]){

                _t3.prop('selected',true);
            }
        }

    })
    $("select[name=term_id_select_multiple]").trigger('chosen:updated');



    var opts = $("select[name=term_id_select]").children('option');

    opts.each(function(){
        var _t3 = $(this);

        // console.info(_t3);

        for(var i=0;i<vals.length;i++){

            console.info('_t3.get(0).value -> ',_t3.get(0).value, vals[i]);
            if(_t3.get(0).value == vals[i]){

                _t3.prop('selected',true);
            }
        }

    })

    setTimeout(function(){

        var _c = $("select[name=term_id_select]").get(0);

        if(_c && _c.api_recheck_value_from_input){

            _c.api_recheck_value_from_input();
        }
    },1000);










    $('select[name=mode],select[name=type],select[name=linking_type]').trigger('change');






    function handle_mouse(e){
        var _t = $(this);

        if(e.type=='click'){
            console.info(_t);

            if(_t.hasClass('import-sample')){

                var fout = '';
                if(_t.hasClass('import-sample-1')){

                    if(sample_data_arr){

                        fout = '[restaurantmenu_header header_skin="skin-default" term_id="'+sample_data_arr.cats[1]+'"] [restaurantmenu item_skin="rst-menu-item-skin-feature" mode="blocks" count="2" desc_count="default" mode="blocks" term_id="'+sample_data_arr.cats[0]+'" item_skin="rst-menu-item-skin-feature" desc_count="default" item_link_thumb_con_to="default" item_link_info_to="default" layout="dzs-layout--2-cols"] <br> [restaurantmenu item_skin="rst-menu-item-skin-default" mode="default" count="5" desc_count="default" mode="default" term_id="'+sample_data_arr.cats[1]+'" item_skin="rst-menu-item-skin-default" desc_count="default" item_link_thumb_con_to="default" item_link_info_to="default"]';
                    }
                }
                tinymce_add_content(fout);
                return false;
            }



            if(_t.hasClass('hide-notice')){


                var data = {
                    action: 'dzsrst_ajax_hide_notice'
                    ,postdata: _t.attr('data-notice')
                };


                $.post(ajaxurl, data, function(response) {
                    if(window.console !=undefined ){
                        console.log('Got this from the server: ' + response);
                    }
                });

                _t.parent().parent().parent().removeClass('active');
                _t.parent().remove();


                return false;
            }



        }
    }

    function check_dependency_settings(){

        console.info('check_dependency_settings')
        $('*[data-dependency]').each(function(){
            var _t = $(this);


            //console.info(_t, _t.attr('data-dependency'));


            var margs = {
                target_attribute: 'name'
            }


            var str_dependency = _t.attr('data-dependency');
            str_dependency = str_dependency.replace(/{{quot}}/g, '"');
            var dep_arr = []


            try{
                dep_arr = JSON.parse(str_dependency);

                var target_attribute = margs.target_attribute;

                var target_con = $(document);

                //console.warn(dep_arr);

                if(dep_arr[0]){
                    var _c = null;


                    if(dep_arr[0].lab){
                        _c = $('*[name="'+dep_arr[0].lab+'"]:not(.fake-input)').eq(0);
                    }
                    if(dep_arr[0].label){
                        _c = $('*[name="'+dep_arr[0].label+'"]:not(.fake-input)').eq(0);
                    }
                    if(dep_arr[0].element){
                        _c = $('*[name="'+dep_arr[0].element+'"]:not(.fake-input)').eq(0);
                    }



                    // console.info('_c - ',_c, dep_arr[0].label, dep_arr,str_dependency);


                    if(_c){

                        var cval = _c.val();

                        // console.info(_c, dep_arr[0].val);

                        var sw_show = false;


                        if(dep_arr[0].val){

                            for(var i3 in dep_arr[0].val) {
                                if (_c.val() == dep_arr[0].val[i3]) {
                                    sw_show = true;
                                    break;

                                }
                            }
                        }

                        if(dep_arr.relation){



                            // console.error(dep_arr.relation);

                            for(var i in dep_arr){
                                if(i=='relation'){
                                    continue;
                                }


                                if(dep_arr[i].value){
                                    if(dep_arr.relation=='AND'){
                                        sw_show=false;
                                    }



                                    if(dep_arr[0].element){
                                        _c = target_con.find('*['+target_attribute+'="'+dep_arr[i].element+'"]:not(.fake-input)').eq(0);
                                    }


                                    for(var i3 in dep_arr[i].value) {


                                        // console.info('_c.val() -  ',_c.val(), dep_arr[i].value[i3]);
                                        if (_c.val() == dep_arr[i].value[i3]) {


                                            if(_c.attr('type')=='checkbox'){
                                                if(_c.val() == dep_arr[i].value[i3] && _c.prop('checked')){

                                                    sw_show = true;
                                                }
                                            }else{

                                                sw_show = true;
                                            }

                                            break;

                                        }


                                        if(dep_arr[i].value[i3]=='anything_but_blank' && cval){

                                            sw_show=true;
                                            break;
                                        }
                                    }

                                    if(dep_arr.relation=='AND'){
                                        if(sw_show==false){
                                            break;
                                        }
                                    }
                                    // console.info('sw_show - ',sw_show);
                                }

                            }

                        }else{

                            if(dep_arr[0].value){

                                for(var i3 in dep_arr[0].value) {
                                    if (_c.val() == dep_arr[0].value[i3]) {


                                        if(_c.attr('type')=='checkbox'){
                                            if(_c.val() == dep_arr[0].value[i3] && _c.prop('checked')){

                                                sw_show = true;
                                            }
                                        }else{

                                            sw_show = true;
                                        }

                                        break;

                                    }


                                    if(dep_arr[0].value[i3]=='anything_but_blank' && cval){

                                        sw_show=true;
                                        break;
                                    }
                                }
                            }
                        }

                        if(sw_show){
                            _t.show();
                        }else{
                            _t.hide();
                        }
                    }


                }
            }catch(err){
                console.error('json dependency error - ',str_dependency);
                console.error(err);
            }
        })
    }

    function handle_change_dependency(e){


        var _t = $(this);
        if(_t.hasClass('dzs-dependency-field')){
            // console.info("ceva");
            check_dependency_settings();
        }


        if(_t.attr('name')=='0-settings-vpconfig'){


            var ind = 0;

            _t.children().each(function(){
                var _t2 = $(this);

                // console.info(_t2);
                if(_t2.prop('selected')){
                    ind = _t2.parent().children().index(_t2) - 1;
                    return false;
                }
            });

            $('#quick-edit').attr('href', add_query_arg($('#quick-edit').attr('href'),'currslider',ind));
            // $('#quick-edit').attr('href', add_query_arg($('#quick-edit').attr('href'),'dbname',$('*[name=dzsvg_selectdb]').val()));
            // console.info(ind);

        }
    }
    function handle_submit(e){
        var _t = $(this);

        if(e.type=='change'){
            // console.info(_t);
            if(_t.attr('name')=='post_type'){
                // console.info("ceva");


                var data = {
                    action: 'dzsrst_get_term_cats'
                    ,post_type: _t.val()
                };


                jQuery.ajax({
                    type: "POST",
                    url: ajaxurl,
                    data: data,
                    success: function(response) {
                        if(typeof window.console != "undefined" ){ console.log('Ajax - submit view - ' + response); }

                        try{
                            response =JSON.parse(response);
                            // console.info(response);

                            $('select[name=term_id]').eq(0).val('');
                            $('select[name=term_id_select]').eq(0).val('');



                            var __c = $("select[name=term_id_select]").get(0);

                            if(__c && __c.api_recheck_value_from_input){

                                __c.api_recheck_value_from_input();
                            }

                            var _c = $('select[name=term_id_select]').eq(0);

                            _c.html('');
                            var aux_html = '<option value="">All categories</option>';
                            var aux_html_without_all = '';
                            for(var lab in response){
                                var cat = response[lab];





                                aux_html_without_all+='<option value="'+cat.value+'">'+cat.label+'</option>';


                            }
                            aux_html+=aux_html_without_all;

                            // console.warn('aux_html - ',aux_html);
                            _c.html(aux_html);


                            if(__c && __c.api_recheck_value_from_input){

                                __c.api_recheck_value_from_input();
                            }





                            _c = $('select[name=term_id_select_multiple]').eq(0);

                            _c.html(aux_html_without_all);
                            _c.trigger('chosen:updated');


                        }catch (e){

                        }





                    },
                    error:function(arg){
                        if(typeof window.console != "undefined" ){ console.warn('Got this from the server: ' + arg); };
                    }
                });



            }
            if(_t.attr('name')=='category_multiplication'){
                if(_t.val()=='multiple'){
                    $("select[name=term_id_select]").parent().hide();
                    $("select[name=term_id_select_multiple]").next().show();
                }else{

                    $("select[name=term_id_select]").parent().show();
                    $("select[name=term_id_select_multiple]").next().hide();
                }
            }
        }
        if(e.type=='submit'){
            // console.info(_t);

            if(_t.hasClass('install-sample-data')){

                var data = {
                    action: 'dzsrst_install_sample_data'
                    ,postdata: _t.serialize()
                };


                jQuery.ajax({
                    type: "POST",
                    url: ajaxurl,
                    data: data,
                    success: function(response) {
                        if(typeof window.console != "undefined" ){ console.log('Ajax - submit view - ' + response); }

                        //console.info(response);
                        show_notice(response);


                        setTimeout(function(){
                            window.location.reload();
                        },100);

                    },
                    error:function(arg){
                        if(typeof window.console != "undefined" ){ console.warn('Got this from the server: ' + arg); };
                    }
                });

                return false;
            }

            if(_t.hasClass('remove-sample-data')){

                var data = {
                    action: 'dzsrst_remove_sample_data'
                    ,postdata: _t.serialize()
                };


                jQuery.ajax({
                    type: "POST",
                    url: ajaxurl,
                    data: data,
                    success: function(response) {
                        if(typeof window.console != "undefined" ){ console.log('Ajax - submit view - ' + response); }

                        //console.info(response);
                        show_notice(response);


                        setTimeout(function(){
                            window.location.reload();
                        },100);

                    },
                    error:function(arg){
                        if(typeof window.console != "undefined" ){ console.warn('Got this from the server: ' + arg); };
                    }
                });

                return false;
            }
        }
    }



    function show_notice(response){


        if(response.indexOf('error -')==0){
            _feedbacker.addClass('is-error');
            _feedbacker.html(response.substr(7));
            _feedbacker.fadeIn('fast');

            setTimeout(function(){

                _feedbacker.fadeOut('slow');
            },1500)
        }
        if(response.indexOf('success -')==0){
            _feedbacker.removeClass('is-error');
            _feedbacker.html(response.substr(9));
            _feedbacker.fadeIn('fast');

            setTimeout(function(){

                _feedbacker.fadeOut('slow');
            },1500)
        }
    }
});
function change_selectdb(e){
    var _t = jQuery(this);

    //console.info(_t.val());



    jQuery('#save-ajax-loading').css('opacity', '1');
    var mainarray = _t.val();
    var data = {
        action: 'dzsrst_get_db_gals',
        postdata: mainarray
    };
    jQuery('.saveconfirmer').html('Options saved.');
    jQuery('.saveconfirmer').fadeIn('fast').delay(2000).fadeOut('fast');
    jQuery.post(ajaxurl, data, function(response) {
        if(window.console !=undefined ){  console.log('Got this from the server: ' + response); }
        jQuery('#save-ajax-loading').css('opacity', '0');

        var aux = '';
        var auxa = response.split(';');
        for(i=0;i<auxa.length;i++){
            aux+='<option>'+auxa[i]+'</option>'
        }
        $('select[name=dzsrst_selectid]').html(aux);
        $('select[name=dzsrst_selectid]').trigger('change');

    });

    return false;

}


function tinymce_add_content(arg){
    //console.log('tinymce_add_content()', arg);
    if(top==window){

        jQuery('.shortcode-output').text(arg);
    }else{


        if(top.dzsrst_widget_shortcode){
            top.dzsrst_widget_shortcode.val(arg);

            top.dzsrst_widget_shortcode = null;

            console.info(top.close_zoombox2);
            if(top.close_zoombox2){
                top.close_zoombox2();
            }
        }else{

            console.info(top.dzsrst_receiver);
            if(typeof(top.dzsrst_receiver)=='function'){
                top.dzsrst_receiver(arg);
            }
        }

    }

}

function click_insert_tests(e){

    //console.info('click_insert_tests');
    //console.log(jQuery('#mainsettings').serialize());
    prepare_fout();
    tinymce_add_content(fout);
    return false;
}

function add_attribute_to_shortcode(lab){
    var $ = jQuery;

    var _c = $('*[name='+lab+']');
    var fout2 = '';
    if(_c.val()){
        fout2+=' '+lab+'="' + _c.val() + '"';
    }

    return fout2;
}

var fout='';
function prepare_fout(){
    var $ = jQuery;
    fout='[restaurantmenu';
    var _c
        ,_c2
        ,lab=''
        ,val=''
        ;
    /*
     _c = $('input[name=settings_width]');
     if(_c.val()!=''){
     fout+=' width=' + _c.val() + '';
     }
     _c = $('input[name=settings_height]');
     if(_c.val()!=''){
     fout+=' height=' + _c.val() + '';
     }
     */

        
    lab = 'item_skin';
    _c = $('select[name='+lab+']');
    val = _c.val();
    if(val){
        fout+=' '+lab+'="' + val + '"';

  }


    lab = 'mode';
    _c = $('select[name='+lab+']');
    val = _c.val();
    if(val){
        fout+=' '+lab+'="' + val + '"';



        if(val=='video_gallery'){

            lab = 'dzsrst_selectid';
            _c = $('*[name='+lab+']');
            // console.info("HMM DADA", val, _c);
            val = _c.val();
            if(val){


                fout+=' '+lab+'="' + val + '"';
            }
        }
    }





    lab = 'count';
    _c = $('*[name='+lab+']');
    if(_c.val()){
        fout+=' '+lab+'="' + _c.val() + '"';
    }



    // lab = 'desc_count';
    // _c = $('*[name='+lab+']');
    // if(_c.val()){
    //     fout+=' '+lab+'="' + _c.val() + '"';
    // }




    lab = 'vimeo';
    _c = $('*[name='+lab+']');
    if(_c.val()){
        fout+=' '+lab+'="' + _c.val() + '"';
    }

    lab = 'max_videos';
    _c = $('*[name='+lab+']');
    if(_c.val()){
        fout+=' '+lab+'="' + _c.val() + '"';
    }


    for(var key in dzsrst_standard_options){

        lab = dzsrst_standard_options[key];



        if(lab!='mode' && lab!='item_skin'){
            _c = $('*[name='+lab+']');


            // console.info(_c, _c.parent().hasClass('setting'), _c.parent().css('display')=='none');


            var _con = null;


            if( _c.parent().hasClass('setting') ){

                _con = _c.parent()
            }

            if( _c.parent().parent().hasClass('setting') ){

                _con = _c.parent().parent();
            }

            if( ( _con && _con.css('display')=='none') == false  ){

                if(_c.val()){
                    fout+=' '+lab+'="' + _c.val() + '"';
                }
            }

        }

    }


    lab = 'vpconfig';
    _c = $('*[name='+lab+']');
    if(_c.val()){
        fout+=' '+lab+'="' + _c.val() + '"';
    }


    // if($('select[name=dzsrst_settings_separation_mode]').val()!='normal'){
    //     _c = $('select[name=dzsrst_settings_separation_mode]');
    //     if(_c.val()!=''){
    //         fout+=' settings_separation_mode="' + _c.val() + '"';
    //     }
    //     _c = $('input[name=dzsrst_settings_separation_pages_number]');
    //     if(_c.val()!=''){
    //         fout+=' settings_separation_pages_number="' + _c.val() + '"';
    //     }
    // }

    fout+=']';
}

