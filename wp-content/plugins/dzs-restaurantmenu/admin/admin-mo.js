
var sliderIndex = 0;
var itemIndex = [0];
var currSlider_nr=-1;
var currSlider;
var targetInput;
var global_items = 0;

jQuery(document).ready(function($){
//    return;

    jQuery('.saveconfirmer').fadeOut('slow');





    function mo_saveall(){
        var mainarray = jQuery('form.mainsettings').serialize();
        var data = {
            action: 'dzsrst_ajax_save_mo',
            postdata: mainarray
        };
        jQuery('.saveconfirmer').html('Options saved.');
        jQuery('.saveconfirmer').fadeIn('fast').delay(2000).fadeOut('fast');
        jQuery.post(ajaxurl, data, function(response) {
            if(window.console !=undefined ){
                console.log('Got this from the server: ' + response);
            }
        });

        return false;
    }

    $('.dzsrst-mo-save-db_mainoptions').on('click', mo_saveall);

});
