jQuery(document).ready(function($){
    //return;
     // Create the media frame.

    setTimeout(reskin_select, 10);
    $(document).undelegate(".select-wrapper select", "change");
    $(document).delegate(".select-wrapper select", "change",  change_select);


    $(document).on('change','.wpb-input[name="db"],.wpb_vc_param_value[name=post_type]', handle_input);


    setInterval(function(){

        var _c = $('.wpb_vc_param_value[name=post_type]').eq(0);
        if(_c.length){

            var _c2 = $('*[name=term_id]');



            // console.info('_c() - ',_c);
            // console.info('_c.val() - ',_c.val());
            if(_c2.children().length==0){
                get_taxonomy_terms(_c.val());
            }

        }
    },1000);


    function get_taxonomy_terms(argposttype){

        var data = {
            action: 'dzsrst_get_term_cats'
            ,post_type: argposttype
        };


        $.ajax({
            type: "POST",
            url: ajaxurl,
            data: data,
            success: function(response) {
                if(typeof window.console != "undefined" ){ console.log('Ajax - submit view - ' + response); }

                try{
                    response =JSON.parse(response);
                    // console.info(response);

                    var _cs = $('select[name=term_id]').eq(0);
                    var prevval = _cs.val();

                    if(_cs.attr('data-option')){
                        prevval = _cs.attr('data-option');
                    }

                    // console.info('select[name=term_id] - ',$('select[name=term_id]'));
                    // console.info('prevval - ',prevval);
                    _cs.val('');



                    var _c = $('select[name=term_id]').eq(0);
                    var __c = _c.get(0);

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


                    _c.val(prevval);

                    if(__c && __c.api_recheck_value_from_input){

                        __c.api_recheck_value_from_input();
                    }





                }catch (e){

                }





            },
            error:function(arg){
                if(typeof window.console != "undefined" ){ console.warn('Got this from the server: ' + arg); };
            }
        });

    }



    $(function() {

        if($.fn.wpColorPicker) {

            $('.wp-color-picker-init ').wpColorPicker();
        }else{
            setTimeout(function(){

                if($.fn.wpColorPicker) {
                    $('.wp-color-picker-init ').wpColorPicker();
                }
            },1000);
        }
    });


    function handle_input(e){
        var _t = $(this);


        if(e.type=='change'){

            if(_t.attr('name')=='post_type'){
                console.info(_t);

                get_taxonomy_terms(_t.val());

            }
            if(_t.hasClass('wpb-input')){

                var mainarray = _t.val();
                var data = {
                    action: 'dzsvg_get_db_gals',
                    postdata: mainarray
                };
                jQuery.post(ajaxurl, data, function(response) {
                    if(window.console !=undefined ){  console.log('Got this from the server: ' + response); }
                    jQuery('#save-ajax-loading').css('opacity', '0');

                    var aux = '';
                    var auxa = response.split(';');
                    for(i=0;i<auxa.length;i++){
                        aux+='<option>'+auxa[i]+'</option>'
                    }
                    jQuery('.wpb-input[name=id]').html(aux);
                    jQuery('.wpb-input[name=id]').trigger('change');

                });
            }
        }
    }






    $('.dzs-wordpress-uploader').off('click');
    $('.dzs-wordpress-uploader').on('click', function(e){
        var _t = $(this);
        var _targetInput = _t.prev();

        var searched_type = '';

        if(_targetInput.hasClass('upload-type-audio')){
            searched_type = 'audio';
        }
        if(_targetInput.hasClass('upload-type-video')){
            searched_type = 'video';
        }
        if(_targetInput.hasClass('upload-type-image')){
            searched_type = 'image';
        }


        frame = wp.media.frames.dzsp_addimage = wp.media({
            title: "Insert Media",
            library: {
                type: searched_type
            },

            // Customize the submit button.
            button: {
                // Set the text of the button.
                text: "Insert Media",
                close: true
            }
        });

        // When an image is selected, run a callback.
        frame.on( 'select', function() {
            // Grab the selected attachment.
            var attachment = frame.state().get('selection').first();

            //console.log(attachment.attributes.url);
            var arg = attachment.attributes.url;

            // console.info(attachment);
            if(_t.hasClass('insert-id')){
                arg = attachment.attributes.id;
            }

            _targetInput.val(arg);
            _targetInput.trigger('change');
//            frame.close();
        });

        // Finally, open the modal.
        frame.open();

        e.stopPropagation();
        e.preventDefault();
        return false;
    });

    $('.uploader-target').off('change');
    $('.uploader-target').on('change',function(){

        var _t = $(this);
        var val = _t.val();
        var _previewer = null;

        if(_t.prev().hasClass('uploader-preview')){
            _previewer = _t.prev();
        }

        if(_previewer){



            console.info(val);

            if(isNaN(Number(val))==false){

                var data = {
                    action: 'dzs_get_attachment_src'
                    ,id: val
                };


                jQuery.ajax({
                    type: "POST",
                    url: window.ajaxurl,
                    data: data,
                    success: function(response) {

                        // console.warn(response);

                        if(response){

                            _previewer.css('background-image', 'url('+response+')')
                            _previewer.html(' ');
                            _previewer.removeClass('empty');
                        }else{

                            _previewer.html('');
                            _previewer.addClass('empty');
                        }
                    },
                    error:function(arg){
                        if(typeof window.console != "undefined" ){ console.warn('Got this from the server: ' + arg); };
                    }
                });
            }else{

                _previewer.css('background-image', 'url('+val+')')
                _previewer.html(' ');
                _previewer.removeClass('empty');


            }

            if(val==''){

                _previewer.html('');
                _previewer.addClass('empty');
            }



        }
    });


    setTimeout(function(){
        $('.uploader-target').trigger('change');
    },500);

    function change_select(){
        var selval = ($(this).find(':selected').text());
        $(this).parent().children('span').text(selval);
    }
    function reskin_select(){
        for(i=0;i<$('select').length;i++){
            var _cache = $('select').eq(i);
            //console.log(_cache.parent().attr('class'));

            if(_cache.hasClass('styleme')==false || _cache.parent().hasClass('select_wrapper') || _cache.parent().hasClass('select-wrapper')){
                continue;
            }
            var sel = (_cache.find(':selected'));
            _cache.wrap('<div class="select-wrapper"></div>')
            _cache.parent().prepend('<span>' + sel.text() + '</span>')
        }



    }


    var aux =window.location.href;


    if(aux.indexOf('plugins.php')>-1){



    }

    if(aux.indexOf('&dzsvg_purchase_remove_binded=on')>-1){

        aux = aux.replace('&dzsvg_purchase_remove_binded=on','');
        var stateObj = { foo: "bar" };
        if(history){

            history.pushState(stateObj, null, aux);
        }
    }





















    function con_generate_buttons(){
        $('#generate-upload-page').bind('click', function(){
            var _t = $(this);

            _t.css('opacity',0.5);



            var data = {
                action: 'dzsvp_insert_upload_page'
                ,postdata: '1'
            };
            $.post(ajaxurl, data, function(response) {
                if(window.console != undefined){
                    console.log('Got this from the server: ' + response);
                }

                $('select[name=dzsvp_page_upload]').prepend('<optgroup label="Generated Pages"><option value="'+response+'">Upload</option></optgroup>')

                $('select[name=dzsvp_page_upload]').find('option').eq(0).prop('selected',true);
                $('select[name=dzsvp_page_upload]').trigger('change');

                _t.parent().parent().remove();

            });

            return false;
        })
    }

    con_generate_buttons();
    extra_skin_hiddenselect();

});





function extra_skin_hiddenselect(){
    for(i=0;i<jQuery('.select-hidden-metastyle').length;i++){
        var _t = jQuery('.select-hidden-metastyle').eq(i);
        if(_t.hasClass('inited')){
            continue;
        }
        //console.log(_t);
        _t.addClass('inited');
        _t.children('select').eq(0).bind('change', change_selecthidden);
        change_selecthidden(null, _t.children('select').eq(0));
        _t.find('.an-option').bind('click', click_anoption);
    }
    function change_selecthidden(e, arg){
        var _c = jQuery(this);
        if(arg!=undefined){
            _c = arg;
        }
        var _con = _c.parent();
        var selind = _c.children().index(_c.children(':selected'));
        var _slidercon = _con.parent().parent();
        //console.log(selind);
        _con.find('.an-option').removeClass('active');
        _con.find('.an-option').eq(selind).addClass('active');
        //console.log(_con);
        do_changemainsliderclass(_slidercon, selind);
    }
    function click_anoption(e){
        var _c = jQuery(this);
        var ind = _c.parent().children().index(_c);
        var _con = _c.parent().parent();
        var _slidercon = _con.parent().parent();
        _c.parent().children().removeClass('active');
        _c.addClass('active');
        _con.children('select').eq(0).children().removeAttr('selected');
        _con.children('select').eq(0).children().eq(ind).attr('selected', 'selected');
        do_changemainsliderclass(_slidercon, ind);
        //console.log(_c, ind, _con, _slidercon);
    }
    function do_changemainsliderclass(arg, argval){
        //extra function - handmade
        //console.log(arg, argval, arg.find('.mainsetting').eq(0).children().eq(argval).val());

        if(arg.hasClass('select-hidden-con')){
            arg.removeClass('mode_thumb'); arg.removeClass('mode_gallery');  arg.removeClass('mode_audio'); arg.removeClass('mode_video'); arg.removeClass('mode_youtube'); arg.removeClass('mode_vimeo'); arg.removeClass('mode_link'); arg.removeClass('mode_testimonial'); arg.removeClass('mode_link'); arg.removeClass('mode_twitter');

            arg.addClass('mode_' + arg.find('.mainsetting').eq(0).children().eq(argval).val());

        }
        if(arg.hasClass('item-settings-con')){
            arg.removeClass('type_youtube'); arg.removeClass('type_normal'); arg.removeClass('type_vimeo'); arg.removeClass('type_audio'); arg.removeClass('type_image'); arg.removeClass('type_link');

            if(argval==0){
                arg.addClass('mode_youtube')
            }
            if(argval==1){
                arg.addClass('mode_normal')
            }
            if(argval==2){
                arg.addClass('mode_vimeo')
            }
            if(argval==3){
                arg.addClass('mode_audio')
            }
            if(argval==4){
                arg.addClass('mode_image')
            }
            if(argval==5){
                arg.addClass('mode_link')
            }
        }
    }

}






