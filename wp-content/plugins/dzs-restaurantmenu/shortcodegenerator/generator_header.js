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

var dzsrst_standard_options = ['header_skin', 'term_id'];



jQuery(document).ready(function($){





    var _feedbacker = $('.feedbacker');

    _feedbacker.fadeOut("slow");
    $('#insert_tests').unbind('click');
    $('#insert_tests').bind('click', click_insert_tests);

    $(document).delegate('.import-sample', 'click', handle_mouse);
    $(document).delegate('form.import-sample-galleries', 'submit', handle_submit);
    $(document).delegate('select[name=mode],select[name=type],select[name=linking_type], .dzs-dependency-field', 'change', handle_submit);




    function handle_mouse(e){
        var _t = $(this);

        if(e.type=='click'){
            console.info(_t);

        }
    }




    function check_dependency_settings(){
        $('*[data-dependency]').each(function(){
            var _t = $(this);


            // console.info(_t);
            var dep_arr = JSON.parse(_t.attr('data-dependency'));

            // console.warn(dep_arr);

            if(dep_arr[0]){
                var _c = $('*[name="'+dep_arr[0].lab+'"]').eq(0);

                // console.info(_c, dep_arr[0].val);

                var sw_show = false;

                for(var i3 in dep_arr[0].val){
                    if(_c.val() == dep_arr[0].val[i3]){
                        sw_show=true;
                        break;

                    }
                }

                if(sw_show){
                    _t.show();
                }else{
                    _t.hide();
                }


            }
        })
    }

    function handle_submit(e){
        var _t = $(this);

        if(e.type=='change'){
            // console.info(_t);
            if(_t.attr('name')=='mode'){
                var _con = _t.parent().parent().parent();
                _con.removeClass('mode-scrollmenu mode-list mode-ullist mode-featured mode-scroller mode-list-2 mode-zfolio mode-gallery_view');

                _con.addClass('mode-'+_t.val());
            }
            if(_t.attr('name')=='type'){
                var _con = _t.parent().parent().parent();
                _con.removeClass('type-video_items type-youtube type-vimeo');

                _con.addClass('type-'+_t.val());
            }
            if(_t.attr('name')=='linking_type'){
                var _con = _t.parent().parent().parent();
                _con.removeClass('linking_type-default linking_type-zoombox linking_type-direct_link linking_type-vg_change');

                _con.addClass('linking_type-'+_t.val());
            }
            if(_t.hasClass('dzs-dependency-field')){
                // console.info("ceva");
                check_dependency_settings();
            }
        }
        if(e.type=='submit'){
            // console.info(_t);

            if(_t.hasClass('import-sample-galleries')){

                var data = {
                    action: 'dzsrst_import_galleries'
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
            if(top.close_ultibox){
                top.close_ultibox();
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
    fout='[restaurantmenu_header';
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


    for(var key in dzsrst_standard_options){

        lab = dzsrst_standard_options[key];
        _c = $('*[name='+lab+']');
        if(_c.val()){
            fout+=' '+lab+'="' + _c.val() + '"';
        }
    }


    fout+=']';
}



