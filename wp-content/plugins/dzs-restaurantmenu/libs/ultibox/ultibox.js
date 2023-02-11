// ==DZS ZoomTabs and Accordions
// @version 1.23
// @this is not free software
// == DZS ZoomTabs and Accordions == copyright == http://digitalzoomstudio.net


"use strict";

Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};
if(window.jQuery==undefined){
  console.log("jquery not detected ? ");
}
jQuery.fn.outerHTML = function(e) {
  return e
    ? this.before(e).remove()
    : jQuery("<p>").append(this.eq(0).clone()).html();
};

window.dzstaa_self_options = {};



window.dzsulb_inited = false;


Math.easeIn = function(t, b, c, d) {

  return -c *(t/=d)*(t-2) + b;

};

(function($) {


  var svg_close_btn = '<svg enable-background="new 0 0 40 40" id="" version="1.1" viewBox="0 0 40 40" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M28.1,26.8c0.4,0.4,0.4,1,0,1.4c-0.2,0.2-0.5,0.3-0.7,0.3s-0.5-0.1-0.7-0.3l-6.8-6.8l-6.8,6.8c-0.2,0.2-0.5,0.3-0.7,0.3   s-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l6.8-6.8l-6.8-6.8c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l6.8,6.8l6.8-6.8   c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4L21.3,20L28.1,26.8z"/></g><g><path d="M19.9,40c-11,0-20-9-20-20s9-20,20-20c4.5,0,8.7,1.5,12.3,4.2c0.4,0.3,0.5,1,0.2,1.4c-0.3,0.4-1,0.5-1.4,0.2   c-3.2-2.5-7-3.8-11-3.8c-9.9,0-18,8.1-18,18s8.1,18,18,18s18-8.1,18-18c0-3.2-0.9-6.4-2.5-9.2c-0.3-0.5-0.1-1.1,0.3-1.4   c0.5-0.3,1.1-0.1,1.4,0.3c1.8,3.1,2.8,6.6,2.8,10.2C39.9,31,30.9,40,19.9,40z"/></g></svg>';


  var svg_right_arrow = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 22.062 22.062" style="enable-background:new 0 0 22.062 22.062;" xml:space="preserve" width="512px" height="512px"> <g> <path d="M10.544,11.031l6.742-6.742c0.81-0.809,0.81-2.135,0-2.944l-0.737-0.737 c-0.81-0.811-2.135-0.811-2.945,0L4.769,9.443c-0.435,0.434-0.628,1.017-0.597,1.589c-0.031,0.571,0.162,1.154,0.597,1.588 l8.835,8.834c0.81,0.811,2.135,0.811,2.945,0l0.737-0.737c0.81-0.808,0.81-2.134,0-2.943L10.544,11.031z" fill="#696969"/> </g> </svg> ';

  $.fn.prependOnce = function(arg, argfind) {
    var _t = $(this) // It's your element


//        console.info(argfind);
    if(typeof(argfind) =='undefined'){
      var regex = new RegExp('class="(.*?)"');
      var auxarr = regex.exec(arg);


      if(typeof auxarr[1] !='undefined'){
        argfind = '.'+auxarr[1];
      }
    }


    // we compromise chaining for returning the success
    if(_t.children(argfind).length<1){
      _t.prepend(arg);
      return true;
    }else{
      return false;
    }
  };
  $.fn.appendOnce = function(arg, argfind) {
    var _t = $(this) // It's your element


    if(typeof(argfind) =='undefined'){
      var regex = new RegExp('class="(.*?)"');
      var auxarr = regex.exec(arg);


      if(typeof auxarr[1] !='undefined'){
        argfind = '.'+auxarr[1];
      }
    }
//        console.info(_t, _t.children(argfind).length, argfind);
    if(_t.children(argfind).length<1){
      _t.append(arg);
      return true;
    }else{
      return false;
    }
  };


  var _maincon = null
    ,_boxMainsCon = null
    ,_galleryClipCon = null
    ,_galleryItemsCon = null
    ,_boxMain = null
    ,_boxMainMediaCon = null
    ,_boxMainMedia = null
    ,_boxMainRealMedia = null // -- temp, the real media
    ,_boxMainUnder = null
  ;


  var id_main = '';

  var media_ratio_w_h = 0
    ,media_w = 0
    ,media_h = 0
    ,media_finalw = 0
    ,media_finalh = 0
    ,media_has_under_description = false

    ,opts_max_width = 0

    ,ulb_w = 0
    ,ulb_h = 0

    ,currNr_gal = -1

    ,bmc_w = 0 // -- box-mains-con width
    ,bmc_h = 0 // -- box-mains-con height

    ,scaling = 'proportional' // -- proportional or fill

    ,ww = 0
    ,wh = 0

    ,gallery_setup='' // -- the gallery curently setup

    ,$ultibox_items_arr = []
    ,theurl = window.location.href
  ;


  var lastargs = null
    ,lastlastargs = null
  ;

  var padding_left = 0
    ,padding_right = 0
    ,padding_top = 0
    ,padding_bottom = 0
    ,padding_hor = 30
    ,padding_ver = 30
    ,offset_v = 30
  ;

  var _targetDiv = null;


  var inter_calculate_dims_light = 0;


  // Starting time and duration.

  // Starting Target, Begin, Finish & Change
  // --- easing params

  var duration_viy = 0
  ;

  var target_viy = 0
    ,target_vix = 0
    ,target_bo = 0
  ;

  var begin_viy = 0
    ,begin_vix = 0
    ,begin_bo = 0
  ;

  var finish_viy = 0
    ,finish_vix = 0
    ,finish_bo = 0
  ;

  var change_viy = 0
    ,change_vix = 0
    ,change_bo = 0
  ;


  var _inline_content_orig_parent = null
    , _inline_content_orig_prev = null
    ,_inline_content_orig_parent_last = null
    , _inline_content_orig_prev_last = null
    ,last_ultibox_item_clicked = null
  ;




  var func_callback = null
  ;


  var ultibox_curr_margs = {


  };
  var ultibox_options = {

    'transition':'slideup'
    ,'transition_out':'same-as-in'
    ,'skin':'skin-default'
    ,settings_deeplinking: "on"
    ,nav_mode: "thumbs"
    ,settings_enable_arrows: "auto"
    ,extra_classes: ""
    ,gallery_type: "skin-default"
    ,videoplayer_settings: {}
    ,audioplayer_settings: {}


  };

  var svg_play = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="13.75px" height="12.982px" viewBox="0 0 13.75 12.982" enable-background="new 0 0 13.75 12.982" xml:space="preserve"> <path d="M11.889,5.71L3.491,0.108C3.389,0.041,3.284,0,3.163,0C2.834,0,2.565,0.304,2.565,0.676H2.562v11.63h0.003 c0,0.372,0.269,0.676,0.597,0.676c0.124,0,0.227-0.047,0.338-0.115l8.389-5.595c0.199-0.186,0.326-0.467,0.326-0.781 S12.088,5.899,11.889,5.71z"/> </svg>';

  var _body = $('body').eq(0);
  var _html = $('html').eq(0);

  window.dzsulb_main_init = dzsulb_main_init;
  function dzsulb_main_init(){


    if(_maincon){
      return false;
    }

    _body = $('body').eq(0);
    _html = $('html').eq(0);



    if(window.ultibox_options_init){
      ultibox_options = $.extend(ultibox_options, window.ultibox_options_init);
    }

    ultibox_options.videoplayer_settings = $.extend({

      settings_youtube_usecustomskin: 'on'

    }, ultibox_options.videoplayer_settings);


    offset_v = ultibox_options.offset_v;


    // console.



    var aux = '<div class="dzsulb-main-con '+ultibox_options.skin+' '+ultibox_options.extra_classes+' gallery-'+ultibox_options.gallery_type+'">';


    if(ultibox_options.skin=='skin-default'){

      if(ultibox_options.settings_enable_arrows=='auto'){
        ultibox_options.settings_enable_arrows = 'on';
      }
    }

    aux+='<div class="overlay-background"></div>';

    aux+='<div class="dzsulb-preloader preloader-fountain" > <div id="fountainG_1" class="fountainG"></div> <div id="fountainG_2" class="fountainG"></div> <div id="fountainG_3" class="fountainG"></div> <div id="fountainG_4" class="fountainG"></div> </div>';

    aux+='<div class="box-mains-con">';

    aux+='</div><!-- end .box-mains-con-->';


    if(ultibox_options.nav_mode=='thumbs'){

      aux+='<div class="gallery-clip-con"><div class="gallery-items-con">';

      aux+='</div></div><!-- end .gallery-clip-con-->';
    }


    aux+='</div>';


    _body.append(aux);

    // console.info(_body, $('body'));

    _maincon = _body.children('.dzsulb-main-con').eq(0);
    _boxMainsCon = _maincon.find('.box-mains-con').eq(0);
    _galleryClipCon = _maincon.find('.gallery-clip-con').eq(0);
    _galleryItemsCon = _maincon.find('.gallery-items-con').eq(0);

    if(ultibox_options.transition=='default'){
      ultibox_options.transition = 'fade';
    }
    if(ultibox_options.transition_out=='same-as-in'){
      ultibox_options.transition_out = ultibox_options.transition;
    }


    _maincon.addClass('transition-'+ultibox_options.transition);



    _maincon.on('click', '>.overlay-background, .close-btn-con, .ultibox-close-btn, .gallery-items-con > .gallery-thumb, .ultibox-gallery-arrow,.ultibox-prev-btn,.ultibox-next-btn',handle_mouse);
    _maincon.on('wheel','.box-main.scroll-mode,.gallery-items-con.scroll-mode',handle_scroll);



    check_deeplink();




    // window.open_ultibox = open_ultibox;
    window.close_ultibox = close_ultibox;







    window.api_ultibox_set_callback_func = function (argo) {
      func_callback = argo;
    };





    $(window).on('resize', handle_resize)
    handle_resize();

  }

  function check_deeplink(){
    if(theurl.indexOf('ultibox=')>-1){
//                console.log('testtt', get_query_arg(theurl, 'ultibox'));
      if(get_query_arg(theurl, 'ultibox')){
        var tempNr = parseInt(get_query_arg(theurl, 'ultibox'),10);
        //console.info(String(tempNr), String(tempNr)=='NaN');
        if(String(tempNr)!='NaN'){
          if(tempNr>-1){
            open_ultibox($('.ultibox-item,.ultibox-item-delegated').eq(tempNr), null, {
              from_deeplink: tempNr
            });
          }
        }else{

          var auxobj = $('#'+get_query_arg(theurl, 'ultibox'));


          open_ultibox(auxobj, null, {
            from_deeplink: '#'+get_query_arg(theurl, 'ultibox')
          });
        }
      }
      //$('.ultibox').eq
    }
  }

  function handle_scroll(e) {


    var _t = $(this);



    // console.info(e.originalEvent.wheelDelta, _t, e );


    // -- this is where the scrolling happens
    if(_t.hasClass('box-main')){

      var ch = wh;
      var th = _boxMain.children('.box-main-media-con').eq(0).outerHeight();

      var auxY = parseInt(_boxMain.css('top')) + Number(e.originalEvent.wheelDelta)*10;


      if(auxY>offset_v){
        auxY = offset_v;
      }
      if(auxY<ch - th - offset_v - (wh - _boxMain.parent().outerHeight()) ){
        auxY = ch - th - offset_v - (wh - _boxMain.parent().outerHeight()) ;
      }


      _boxMain.css({
        // 'top': auxY
      })
    }
    if(_t.hasClass('gallery-items-con')){

      var cw = ww;
      var tw = _galleryItemsCon.outerWidth();

      var auxX = parseInt(_galleryItemsCon.css('left')) + Number(e.originalEvent.wheelDelta)*10;


      if(auxX>30){
        auxX = 30;
      }
      if(auxX<cw - tw - 30){
        auxX = cw - tw - 30;
      }


      _galleryItemsCon.css({
        'left': auxX
      })
    }


  }

  function handle_mouse(e){


    var _t = $(this);

    if(e.type=='click'){
      // console.log(_t);


      if(_t.hasClass('overlay-background')){

        close_ultibox();

      }
      if(_t.hasClass('close-btn-con') || _t.hasClass('ultibox-close-btn')){

        close_ultibox();

      }

      if(_t.hasClass('gallery-thumb')){

        var ind = _t.parent().children().index(_t);

        // console.log(ind);

        goto_gallery_item(ind);

      }

      if(_t.hasClass('ultibox-gallery-arrow--left')){

        goto_gallery_item_prev();

      }

      if(_t.hasClass('ultibox-gallery-arrow--right')){

        goto_gallery_item_next();

      }


      // -- loaded-item next, .zoomed next
    }

  }
  function handle_mouse_item(e){


    var _t = $(this);

    if(e.type=='click'){
      // console.log(_t);


      if(_t.hasClass('')){

      }

      open_ultibox(_t, null);


      // -- loaded-item next, .zoomed next
    }

  }




  function goto_gallery_item_prev(){
    var tempNr = currNr_gal;
    tempNr--;




    var gal_nr_items = 0;

    if(_galleryItemsCon.length){
      gal_nr_items = _galleryItemsCon.children().length;
    }else{
      gal_nr_items = $('*[data-biggallery="'+ultibox_curr_margs.biggallery+'"]').length;
    }

    if(tempNr<0){
      tempNr=gal_nr_items-1;
    }

    //console.info(tempNr);

    goto_gallery_item(tempNr);

    return false;
  }
  function goto_gallery_item_next(){
    var tempNr = currNr_gal;
    tempNr++;


    var gal_nr_items = 0;

    if(_galleryItemsCon.length){
      gal_nr_items = _galleryItemsCon.children().length;
    }else{
      gal_nr_items = $('*[data-biggallery="'+ultibox_curr_margs.biggallery+'"]').length;
    }


    if(tempNr>=gal_nr_items){
      tempNr=0;
    }

    // console.info(tempNr);

    goto_gallery_item(tempNr);


    return false;
  }



  function goto_gallery_item(arg){

    var _c = null;
    var gallery_selection_mode = 'gallery-items';


    if(_galleryItemsCon.length && _galleryItemsCon.children().length){

      console.warn('_galleryItemsCon.length - ',_galleryItemsCon.length);
      _c = _galleryItemsCon.children().eq(arg);

      gallery_selection_mode = 'gallery-items';
    }else{


      console.info('curr gallery name',ultibox_curr_margs);


      _c = $('*[data-biggallery="'+ultibox_curr_margs.biggallery+'"]').eq(arg);

      gallery_selection_mode = 'this is the item';
    }


    console.info('goto_gallery_item()', arg, '_galleryItemsCon - ', _galleryItemsCon, '_c - ', _c, 'ultibox_curr_margs.biggallery - ',ultibox_curr_margs.biggallery, $('*[data-biggallery="'+ultibox_curr_margs.biggallery+'"]'));

    if(_c){
      console.log(_c.data('parent-item'));
    }



    if(currNr_gal>-1){
      if(arg<currNr_gal){

        _maincon.addClass('gallery-direction-reverse');
      }

      if(arg==currNr_gal){
        return false;
      }
    }



    // -- if we have _c parent-item property
    if(_c){

      window.ultibox_countdown = false;

      if(gallery_selection_mode=='gallery-items'){

        if(_c.data('parent-item')){
          open_ultibox(_c.data('parent-item'), {
            'call_from':'gallery_item'
          })
        }


      }

      if(gallery_selection_mode=='this is the item'){

        console.warn('_c - ',_c);
        open_ultibox(_c, {
          'call_from':'gallery_item'
        })


      }

      currNr_gal = arg;




      restore_target_div();



      if(_galleryItemsCon){

        _galleryItemsCon.children().removeClass('active');
        setTimeout(function () {
          _galleryItemsCon.children().eq(currNr_gal).addClass('active');
        },100)
      }

    }

  }


  window.ultibox_reset_cooldown = function(){

  }
  window.open_ultibox = function(_arg, pargs){



    var margs = {

      type: 'detect'
      ,video_type: 'detect'
      ,audio_type: 'detect'
      ,audio_thumb: ''
      ,source: ''
      ,max_width: 'default' // -- this is useful for under description feed and is mandatory actually
      ,under_description: '' // -- this is the under description
      ,right_description: '' // -- this is the under description
      ,scaling: 'proportional' // -- this is the under description
      ,inline_content_move: 'off'
      ,suggested_width: ''
      ,suggested_height: ''
      ,box_bg: ''
      ,biggallery: ''
      ,call_from: 'default'
      ,forcenodeeplink: 'off'
      ,_targetDiv: null
      ,item: null // -- we can pass the items from here too

    };




    if(pargs){
      margs = $.extend(margs,pargs);
    }


    // console.info('window.ultibox_countdown - ',window.ultibox_countdown);
    if(window.ultibox_countdown){
      return false;

    }
    window.ultibox_countdown = true;
    setTimeout(function(){
      window.ultibox_reset_cooldown();
    },100);








    if(_arg){
      console.info('arg - ',_arg);
      if(_arg.attr('data-source')){
        margs.source = _arg.attr('data-source');
      }else{
        if(_arg.attr('data-src')){
          margs.source = _arg.attr('data-src');
        }
      }
      if(_arg.attr('data-type')){
        margs.type = _arg.attr('data-type');


        if(margs.type=='vimeo'){
          margs.type='video';
          margs.video_type = 'vimeo';
        }
        if(margs.type=='youtube'){
          margs.type='video';
          margs.video_type = 'youtube';
        }
      }else{
        margs.type = detect_ultibox_type(margs.source);
      }


      if(_arg.attr('data-scaling')){
        margs.scaling = _arg.attr('data-scaling');
      }
      if(_arg.attr('data-box-bg')){
        margs.box_bg = _arg.attr('data-box-bg');
      }
      if(_arg.attr('data-audio-thumb')){
        margs.audio_thumb = _arg.attr('data-audio-thumb');
      }
      if(_arg.attr('data-inline-move')){
        margs.inline_content_move = _arg.attr('data-inline-move');
      }

      if(_arg.next().hasClass('feed-ultibox-desc') || _arg.children().hasClass('feed-ultibox-desc')){

        var _c = null;
        if(_arg.next().hasClass('feed-ultibox-desc')){
          _c = _arg.next();
        }
        if(_arg.children('.feed-ultibox-desc').length){
          _c = _arg.children('.feed-ultibox-desc').eq(0);
        }

        margs.under_description = _c.html();
      }


      if(_arg.attr('data-suggested-width')){
        margs.suggested_width = (_arg.attr('data-suggested-width'));
      }
      if(_arg.attr('data-force-nodeeplink')){
        margs.forcenodeeplink = (_arg.attr('data-force-nodeeplink'));
      }
      if(_arg.attr('data-suggested-height')){
        margs.suggested_height = (_arg.attr('data-suggested-height'));
      }

      if(typeof _arg !='string'){
        margs.item = _arg;
      }


      if(_arg.attr('data-biggallery')){
        margs.biggallery = _arg.attr('data-biggallery');
      }
    }


    if(margs.type=='detect'){
      margs.type='image';
    }

    // console.info('margs -  ',margs);
    // console.table(margs);
    if(margs.type=='video'){
      if(margs.video_type=='detect'){
        // console.info('margs -  ',margs);

        if(margs.item && margs.item.attr('data-video-type')){
          margs.video_type = margs.item.attr('data-video-type');
        }
      }

      if(margs.video_type=='detect'){
        if(margs.source.indexOf('youtube.com/')>-1){


          margs.video_type = 'youtube';

          margs.source = get_query_arg(margs.source,'v');



        }
      }
      if(margs.video_type=='detect'){

        margs.video_type = 'video';
      }

    }

    if(margs.type=='audio'){

      if(margs.audio_type=='detect'){

        margs.audio_type = 'audio';
      }

    }

    if(margs.type=='inlinecontent'){

      margs._targetDiv = $(margs.source).eq(0);

      // console.info(margs._targetDiv);

    }



    //console.info('open_ultibox()', margs);

    if(margs.under_description){
      if(margs.max_width=='default'){
        margs.max_width = 400;
      }
    }


    if(margs.biggallery){
    }


    ultibox_curr_margs = $.extend({},margs);


    _maincon.removeClass('disabled');
    _html.addClass('ultibox-opened');



    setTimeout(function(){

      _maincon.addClass('loading-item');



      if(margs.type=='image'){


        // console.info('is_image', margs);

        var newImg = new Image;
        newImg.onload = function() {

          // console.info('loaded image - ',this);




          media_w = this.naturalWidth;
          media_h = this.naturalHeight;


          setup_media(margs);


        };
        newImg.src = margs.source;
      }

      if(margs.type=='video'){

        //console.info('media_w, media_h - ',media_w, media_h)

        media_w = 800;
        media_h = 454;

        if(margs.video_type=='video' || margs.video_type=='youtube' || margs.video_type=='vimeo'){
          if($.fn.vPlayer){

            setup_media(margs);
          }else{

            console.warn("You need videogallery embedded");
            close_ultibox();
          }
        }

      }

      if(margs.type=='audio'){

        //console.info('media_w, media_h - ',media_w, media_h)

        media_w = 800;
        media_h = 'auto';

        if(margs.audio_type=='audio'){
          if($.fn.audioplayer){

            setup_media(margs);
          }else{

            console.warn("You need zoomsounds embedded");
            close_ultibox();
          }
        }

      }

      if(margs.type=='iframe'){

        //console.info('media_w, media_h - ',media_w, media_h)

        media_w = 800;
        media_h = 600;

        setup_media(margs);
      }

      if(margs.type=='inlinecontent'){

        //console.info('media_w, media_h - ',media_w, media_h)

        media_w = 800;
        media_h = 'auto';

        setup_media(margs);
      }
    },100);




    if(ultibox_options.settings_deeplinking=='on' && can_history_api()==true && margs.forcenodeeplink!='on'){
      //console.log(otherargs.item);

      $ultibox_items_arr = $('.ultibox-item,.ultibox-item-delegated')
      if(margs.item && margs.item.attr('data-ultibox-sort')){
        //$ultibox_gallery_arr = getSorted('.ultibox,.ultibox-delegated', 'data-ultibox-sort');
      }

      var ind = $ultibox_items_arr.index(margs.item);
      if(typeof($(margs.item).attr('id'))!='undefined'){

        //console.info($(margs.item).attr('id'), encodeURIComponent($(margs.item).attr('id')))


        var aux = encodeURIComponent($(margs.item).attr('id'));
        aux = aux.replace(/%/g, "8767");
        ind = aux;
      }



      theurl = window.location.href;
      var newurl = add_query_arg(theurl, 'ultibox', ind);
      if(newurl.indexOf(' ')>-1){
        newurl = newurl.replace(' ', '%20');
      }
      theurl = newurl;
      //console.info(theurl);
      history.pushState({}, "", newurl);
    }
  }





  function setup_media(margs){
    // -- appends the item to the DOM but does not necesarrly append the loaded event , that is appended only when the media is ( allegedly )

    console.info('setup_media()', margs);



    if(margs.suggested_width){
      if(isNaN(Number(margs.suggested_width))==false){

        media_w = Number(margs.suggested_width);
      }else{
        media_w = margs.suggested_width;
      }
    }
    if(margs.suggested_height){
      if(isNaN(Number(margs.suggested_height))==false){

        media_h = Number(margs.suggested_height);
      }else{
        media_h = margs.suggested_height;
      }
    }



    if(isNaN(Number(margs.suggested_height))==false) {
      media_ratio_w_h = media_w / media_h;
    }else{
      media_ratio_w_h = 1;
    }
    scaling = margs.scaling;


    var aux = '';



    if(margs.call_from=='gallery_item'){
      _boxMain.addClass('gallery-transitioning-out');
    }else{
      if(_boxMain){

        _boxMain.addClass('transitioning-out');
      }
    }

    aux+='<div class="box-main type-'+margs.type;

    if(margs.call_from=='gallery_item'){
      aux+=' gallery-preparing-transitioning-in';

      setTimeout(function () {
        _boxMain.addClass('gallery-transitioning-in')
      },10)
      setTimeout(function () {
        _maincon.find('.box-main.gallery-transitioning-out').remove();
        _boxMain.removeClass('gallery-transitioning-in')
        _boxMain.removeClass('gallery-preparing-transitioning-in')
        _maincon.removeClass('gallery-direction-reverse')
      },500)


    }


    aux+='">';


    aux+='<div class="box-main-media-con transition-target">';



    aux+='<div class="close-btn-con"> '+svg_close_btn+'</div>';

    aux+='<div class="box-main-media type-'+margs.type+'" style="';

    if(margs.box_bg){
      aux+='background-color: '+margs.box_bg+';';
    }

    aux+='"></div><div class="box-main-under"></div>';


    if(ultibox_options.settings_enable_arrows=='on'){



      aux+='<div class="ultibox-gallery-arrow ultibox-gallery-arrow--left">'+svg_right_arrow+'</div>';
      aux+='<div class="ultibox-gallery-arrow ultibox-gallery-arrow--right">'+svg_right_arrow+'</div>';




    }



    aux+='</div></div>';

    _boxMainsCon.append(aux);


    _boxMain = _maincon.find('.box-main:not(.gallery-transitioning-out)').eq(0);
    _boxMainMediaCon = _boxMain.find('.box-main-media-con').eq(0);
    _boxMainMedia = _boxMain.find('.box-main-media').eq(0);
    _boxMainUnder = _boxMain.find('.box-main-under').eq(0);



    // console.info('_boxMain - ',_boxMain);
    // console.info('_boxMainMediaCon - ',_boxMainMediaCon);
    // console.info('_boxMainMedia - ',_boxMainMedia);
    // console.info('_boxMainUnder - ',_boxMainUnder);

    if(margs.type=='image'){
      _boxMainMedia.append('<div class="imagediv real-media" style="background-image: url('+margs.source+') "></div>');
      setTimeout(function(){

        media_ready(margs);
      },50);

    }

    if(margs.type=='video'){


      console.info('( type is video ) margs.video_type - ',margs.video_type);
      if(ultibox_options.videoplayer_settings.settings_youtube_usecustomskin=='off' && (margs.video_type=='youtube' || margs.video_type=='vimeo')){



        if(margs.video_type=='youtube'){
          _boxMainMedia.append('<iframe class="real-media" width="100%" height="100%" src="https://www.youtube.com/embed/'+margs.source+'" frameborder="0" allowfullscreen></iframe>');
        }
        if(margs.video_type=='vimeo'){
          _boxMainMedia.append('<iframe src="https://player.vimeo.com/video/'+margs.source+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
        }



      }else{
        if(margs.video_type=='video' || margs.video_type=='youtube'|| margs.video_type=='vimeo'){
          if($.fn.vPlayer){


            var video_title = '';

            if(margs.item && margs.item.attr('data-videotitle')){
              video_title = margs.item.attr('data-videotitle');
            }


            console.info('margs.source - ',margs.source);

            var aux_str_videoplayer = '<div class="vplayer-tobe auto-init skin_aurora real-media " data-videoTitle="'+video_title+'"  data-src="'+margs.source+'"';


            aux_str_videoplayer+=' data-type="'+margs.video_type+'"'

            aux_str_videoplayer+='></div>';

            _boxMainMedia.append(aux_str_videoplayer);


            var args = {
              'autoplay':'off'
              ,'cue':'on'
            };

            if(ultibox_options.videoplayer_settings){
              args = $.extend(args,ultibox_options.videoplayer_settings);
            }

            var autoplay_it = args.autoplay;

            // args.autoplay = 'off';

            _boxMainMedia.find('.real-media').eq(0).vPlayer(args);

            // if(autoplay_it=='on'){
            //
            //     setTimeout(function(){
            //         _boxMainRealMedia.get(0).api_playMovie();
            //     },300)
            // }
          }
        }

      }


      // _boxMainMedia.append('<div class="imagediv real-media" style="background-image: url('+margs.source+') "></div>');
      setTimeout(function(){

        _maincon.addClass('loaded-item');
      },50);


    }


    if(margs.type=='audio'){

      if(margs.audio_type=='youtube'){
        _boxMainMedia.append('<iframe class="real-media" width="100%" height="100%" src="https://www.youtube.com/embed/'+margs.source+'" frameborder="0" allowfullscreen></iframe>');
      }


      if(margs.audio_type=='audio'){
        if($.fn.audioplayer){

          var aux = '<div class="audioplayer-tobe skin-wave real-media  button-aspect-noir button-aspect-noir--filled "   data-source="'+margs.source+'" ';


          if(margs.audio_thumb){
            aux+=' data-thumb="'+margs.audio_thumb+'"'
          }

          aux+='></div>';




          _boxMainMedia.append(aux);


          var args = {
            'autoplay':'off'
            ,'cue':'on'
            ,skinwave_mode:'small'
          };



          args = $.extend(args,ultibox_options.audioplayer_settings);

          _boxMainMedia.find('.real-media').eq(0).audioplayer(args);

          setTimeout(function(){
            _boxMainRealMedia.get(0).api_play_media();
          },300)
        }
      }

      // _boxMainMedia.append('<div class="imagediv real-media" style="background-image: url('+margs.source+') "></div>');
      setTimeout(function(){

        media_ready(margs);
      },50);


    }
    if(margs.type=='iframe'){
      _boxMainMedia.append('<div class=" real-media" style=""><iframe src="'+margs.source+'" style="" width="100%" height="100%"></iframe></div>');

      setTimeout(function(){
        media_ready(margs);

      },1500);

      // -- we leave 1500 ms time to load any iframe

    }
    if(margs.type=='inlinecontent'){


      // console.info('_boxMainMedia - ',_boxMainMedia);
      _boxMainMedia.append('<div class=" real-media" style=""></div>');



      _inline_content_orig_prev = null;
      _inline_content_orig_parent = null;

      //console.warn('margs._targetDiv.prev() - ',margs._targetDiv.prev());

      if(margs.inline_content_move=='on'){

        if(margs._targetDiv.prev().length>0){
          _inline_content_orig_prev = margs._targetDiv.prev();
        }else{

          _inline_content_orig_parent = margs._targetDiv.parent();
        }
      }



      //console.warn('margs._targetDiv - ',margs._targetDiv);
      // console.warn('_inline_content_orig_prev - ',_inline_content_orig_prev);
      // console.warn('margs.inline_content_move - ',margs.inline_content_move);


      if(margs.inline_content_move=='on'){
        _boxMainMedia.find('.real-media').append(margs._targetDiv);
      }else{
        _boxMainMedia.find('.real-media').append(margs._targetDiv.clone());
      }



      console.info('margs._targetDiv -> ',margs._targetDiv);
      if(margs._targetDiv.hasClass('cancel-inlinecontent-padding')){
        _boxMainMedia.addClass('cancel-inlinecontent-padding');
      }else{
        _boxMainMedia.removeClass('cancel-inlinecontent-padding');
      }


      if(_boxMainMedia.find('.auto-init-from-ultibox').length){
        console.info(' 1 2 3');


        if(window.dzsvg_init){
          _boxMainMedia.find('.videogallery.auto-init-from-ultibox:not(.inited)').each(function(){
            var _t2 = $(this);

            dzsvg_init(_t2,{
              init_each:true,
            });
          })
        }
      }



      _boxMainMedia.find('.toexecute').each(function(){
        var _t2 = $(this);
        if(_t2.hasClass('executed')==false){
          eval(_t2.text());
          _t2.addClass('executed');
        }
      });

      setTimeout(function(){

        media_ready(margs);
      },200);

      // -- we leave 1500 ms time to load any iframe

    }
    _boxMainRealMedia = _boxMainMedia.find('.real-media').eq(0);



    if(margs.under_description){



      _boxMainUnder.append(margs.under_description);
      _boxMainMedia.width('100%');
      media_has_under_description = true;
      _boxMain.addClass('with-description');
    }else{

      media_has_under_description = false;

    }


    if(margs.biggallery){

      if(margs.biggallery!=gallery_setup){
        console.info('margs.biggallery - ',margs.biggallery);




        if(ultibox_options.nav_mode!='none'){

          _maincon.addClass('has-gallery');
        }


        var i5= 0;
        $('*[data-biggallery="'+margs.biggallery+'"]').each(function(){
          var _t = $(this);



          // -- we check if
          if(margs.item && margs.item.get && margs.item.get(0)){
            if(margs.item.get(0) == _t.get(0)){

              currNr_gal = i5;
            }
          }

          console.info('currNr_gal from biggallery - ',currNr_gal, '_t - ',_t);
          var thumb_src = '';


          if(_t.attr('data-thumb-for-gallery')){

          }else{

            if(_t.attr('data-source')){

              thumb_src = _t.attr('data-source');
            }
            if(_t.get(0) && _t.get(0).nodeName == "IMG"){

              thumb_src = _t.attr('src');
            }
          }

          console.info('thumb_src - ',thumb_src);


          if(thumb_src){

            var aux = '<div class="gallery-thumb"><div class="gallery-thumb--image" style="background-image: url('+thumb_src+');"></div><div class="gallery-thumb--icon">';


            if(_t.attr('data-type')=='video' || _t.attr('data-type')=='audio'){

              aux+= svg_play;
            }

            aux+='</div></div>';



            _galleryItemsCon.append(aux);

            //console.info(_t.attr('data-type'));
            _galleryItemsCon.children().last().data('parent-item', _t);
          }

          i5++;

        });

        // -- end for

        gallery_setup = margs.biggallery;


        setTimeout(function () {
          _galleryClipCon.addClass('gallery-loaded');
          //console.log('_galleryItemsCon - ',_galleryItemsCon);
          _galleryItemsCon.children().eq(currNr_gal).addClass('active');
        },100)

      }else{

        _galleryClipCon.addClass('gallery-loaded');
      }
      _maincon.addClass('has-gallery');
    }else{

      _maincon.removeClass('has-gallery');
      _galleryClipCon.removeClass('gallery-loaded');
      gallery_setup = '';
    }



    if(margs.max_width){
      opts_max_width = margs.max_width;
    }else{
      opts_max_width = 0;
    }

    handle_resize(null,{
      call_calculate_dims_light: false
    })
    calculate_dims_light({
      'call_from':"setup_media"
      ,'calculate_main_con':true

    })

    lastargs = margs;



    //console.info(func_callback);
    if(func_callback){
      func_callback( margs);
    }


    // -- just want to cancel the default click behaviour on links
    //if (e != undefined && e != null) {
    //    e.preventDefault();
    //}

  }

  function media_ready(margs){

    _maincon.addClass('loaded-item');

    // console.info('media_ready() - ',margs);

    if(margs.type=='inlinecontent'){

      // console.info(_boxMainMedia.find('.contentscroller'));
      if(_boxMainMedia.find('.contentscroller').length){
        _boxMainMedia.find('.contentscroller').each(function(){
          var _t2 = $(this);

          // console.info(_t2);

          _t2.get(0).api_handleResize();
        })
      }


      if(_boxMainMedia.find('.videogallery').length){
        _boxMainMedia.find('.videogallery').each(function(){
          var _t2 = $(this);

          // console.info(_t2);

          _t2.get(0).api_handleResize(null, {
            force_resize_gallery: true
          })
        })
      }

      if(_boxMainMedia.find('.ultibox-close-btn').length){
        _boxMain.find('.close-btn-con').fadeOut('fast');
      }else{

        _boxMain.find('.close-btn-con').fadeIn('fast');
      }


      setTimeout(function(){

        calculate_dims_light();
      },500);
    }
  }


  function restore_target_div(){


    //console.info('restore_target_div()',lastargs)


    if(lastargs && lastargs.inline_content_move=='on'){

      _inline_content_orig_prev_last = _inline_content_orig_prev;
      _inline_content_orig_parent_last = _inline_content_orig_parent;

      //console.info('lastargs._targetDiv - ',lastargs._targetDiv);
      //console.info('_inline_content_orig_prev_last - ',_inline_content_orig_prev_last);
      //console.info('_inline_content_orig_parent_last - ',_inline_content_orig_parent_last);

      lastlastargs = $.extend({}, lastargs);


      setTimeout(function(){


        if(_inline_content_orig_prev_last){

          _inline_content_orig_prev_last.after(lastlastargs._targetDiv);

        }
        if(_inline_content_orig_parent_last){

          _inline_content_orig_parent_last.prepend(lastlastargs._targetDiv);

        }


        // -- TODO: maybe resize content scroller
        // lastlastargs._targetDiv.find('.contentscroller').each(function(){
        //     var _t3 = $(this);
        //
        //
        //
        //     _t3.get(0).api_handleResize();
        // })


      },300)
    }

  }



  function close_ultibox(){

    // _maincon.removeClass('disabled');
    _maincon.removeClass('loading-item');
    _maincon.removeClass('loaded-item');
    _html.removeClass('ultibox-opened');
    _galleryClipCon.removeClass('gallery-loaded');



    restore_target_div();





    if(ultibox_options.settings_deeplinking=='on' && can_history_api()==true){
      var newurl = add_query_arg(theurl, 'ultibox', "NaN");
      theurl = newurl;
      history.pushState({}, "", newurl);
    }

    setTimeout(function(){

      _maincon.addClass('disabled');

      if(_boxMainRealMedia){

        _boxMainRealMedia.remove();
      }

      if(_boxMainUnder){

        _boxMainUnder.html('');
      }

      _boxMainsCon.html('');


      window.ultibox_countdown = false;
    },300);
  }

  function handle_resize(e, pargs){



    var margs = {
      'call_from':'default'
      ,'call_calculate_dims_light':true
    };

    if(pargs){
      margs = $.extend(margs,pargs);
    }



    ww = $(window).width();
    wh = window.innerHeight;

    bmc_w = _boxMainsCon.width();
    bmc_h = _boxMainsCon.height();


    // console.info(_boxMainsCon, 'bmc_h - ', bmc_h);

    if(margs.call_calculate_dims_light){

      if(inter_calculate_dims_light){
        clearTimeout(inter_calculate_dims_light);
      }
      inter_calculate_dims_light = setTimeout(calculate_dims_light,100);
    }

    if(_boxMainMedia && _boxMainMedia.hasClass('type-inlinecontent')){
      console.info('ceva');


    }

  }


  function calculate_dims_light(pargs){


    var margs = {
      'call_from':'default'
      ,'calculate_main_con':true
    };

    if(pargs){
      margs = $.extend(margs,pargs);
    }


    if(margs.calculate_main_con){


      // console.info('calculate_dims_light()', media_w, media_h, scaling);

      media_finalw = media_w;
      media_finalh = media_h;

      if(opts_max_width){
        if(media_finalw>opts_max_width){
          media_finalw = opts_max_width;

          if(scaling!='fill'){

            media_finalh =   media_finalw / media_ratio_w_h;
          }

          // console.info('media_finalh - ',media_finalh);
        }


      }


      if(media_finalw > bmc_w - padding_hor){
        media_finalw = bmc_w - padding_hor;
        if(scaling!='fill') {
          media_finalh = media_finalw / media_ratio_w_h;
        }
      }
      if(media_finalh > bmc_h - padding_ver){
        //console.warn('media_finalh over limit', media_finalh, media_finalw, media_ratio_w_h);
        media_finalh = bmc_h - padding_ver;
        if(scaling!='fill') {
          media_finalw = media_finalh * media_ratio_w_h;
        }

      }

      // console.info('calculate_dims_light()', media_finalw, media_finalh, bmc_h - padding_ver);


      if(opts_max_width) {
        if (media_has_under_description) {
          _boxMainMediaCon.width(media_finalw);
        }
      }

      if(_boxMainMedia){

        if(media_has_under_description){
          _boxMainMedia.width('100%');
        }else{

          _boxMainMedia.width(media_finalw);
        }

        setTimeout(function(){


          // _boxMainMediaCon.width(200);
        },5000);

        _boxMainMedia.height(media_finalh);



        // console.info(_boxMain, _boxMain.outerHeight(), wh);
        _boxMain.css({
          'max-height':'none'
          ,'height':'auto'
        })
        if(_boxMain){

          // console.error(_boxMain, wh);


          setTimeout(function(){

            if(_boxMain.outerHeight() > _boxMain.parent().outerHeight() ){ // 0 = padding


              _boxMain.addClass('scroll-mode');

              if(offset_v!=30){
                _boxMain.css('top',offset_v);
              }

            }else{

              _boxMain.removeClass('scroll-mode');
              _boxMain.css({
                'top':''
              })
            }
            _boxMain.css({
              'max-height':''
              ,'height':''
            })
          },100)
        }
        if(_galleryItemsCon){

          // console.error(_boxMain, wh);

          if(_galleryItemsCon.outerWidth() > ww - 0 ){ // 0 = padding


            _galleryItemsCon.addClass('scroll-mode');

          }else{

            _galleryItemsCon.removeClass('scroll-mode');
            _galleryItemsCon.css({
              'left':''
            })
          }
          _galleryItemsCon.css({
            'max-height':''
            ,'height':''
          })
        }
      }


    }


  }






  function detect_ultibox_type(arg){

    var type = 'image';
    if(arg.indexOf('.mp4')>=arg.length - 4 || arg.indexOf('.m4v')>=arg.length - 4){
      type = 'video';
    }
    if(arg.indexOf('.mp3')>=arg.length - 4 || arg.indexOf('.m4a')>=arg.length - 4){
      type = 'audio';
    }
    if (arg.indexOf('#') == 0) {
      type = 'inlinecontent';
    }

    return type;
  }




  // -- item


  $.fn.dzsulb = function(o) {

    //==default options
    var defaults = {
      settings_slideshowTime : '5' //in seconds
      ,settings_enable_linking : 'off' // enable deeplinking on tabs
      , settings_contentHeight : '0'//set the fixed tab height
      , settings_scroll_to_start : 'off'//scroll to start when a tab menu is clicked
      , settings_startTab : 'default'// -- the start tab, default or a fixed number
      , design_skin : 'skin-default' // -- skin-default, skin-boxed, skin-melbourne or skin-blue
      , design_transition : 'default' // default, fade or slide
      , design_tabsposition : 'top' // -- set top, right, bottom or left
      , design_tabswidth : 'default' // -- set the tabs width for position left or right, if tabs position top or bottom and this is set to fullwidth, then the tabs will cover all the width
      , design_maxwidth : '4000'
      ,settings_makeFunctional: false
      ,settings_appendWholeContent: false // -- take the whole tab content and append it into the dzs tabs, this makes complex scripts like sliders still work inside of tabs
      ,toggle_breakpoint: '320' //  -- a number at which bellow the tabs will trasform to toggles
      ,toggle_type: 'accordion' // -- normally, the  toggles act like accordions, but they can act like traditional toggles if this is set to toggle
      ,refresh_tab_height: '0' // -- normally, the  toggles act like accordions, but they can act like traditional toggles if this is set to toggle
      ,outer_menu: null // -- normally, the  toggles act like accordions, but they can act like traditional toggles if this is set to toggle
      ,action_gotoItem: null // -- set a external javascript action that happens when a item is selected
      ,vc_editable: false // -- add some extra classes for the visual composer frontend edit

    };

//        console.info(this, o);

    if(typeof o =='undefined'){
      if(typeof $(this).attr('data-options')!='undefined'  && $(this).attr('data-options')!=''){
        var aux = $(this).attr('data-options');
        aux = 'window.dzstaa_self_options = ' + aux;
        eval(aux);
        o = $.extend({}, window.dzstaa_self_options);
        window.dzstaa_self_options = $.extend({},{});
      }
    }
    o = $.extend(defaults, o);
    this.each( function(){
      var cthis = $(this)
        , cclass = ''
        ,cid = ''

      ;
      var nrChildren= 0 ;
      var currNr=-1
        ,currNrEx=-1
      ;
      var mem_children = [];
      var _tabsMenu
        ,_tabsContent
        ,_itemsFeed = null // -- the main items feeder
        ,items
        ,_c
        ,_carg
      ;
      var i=0;
      var ww
        ,wh
        ,tw
        ,targeth
        ,padding_content = 20
      ;
      var busy_transition=false
        ,vc_feed_from = false // -- feed from visual composer
      ;
      var handled = false; //describes if all loaded function has been called

      var preloading_nrtotalimages = 0
        ,preloading_nrtotalimagesloaded = 0
      ;

      var animation_slide_vars = {
        'duration' : 300
        ,'queue' : false
      }

      var current_mode = 'tab';


      var selector = '.rst-menu-item:not(.processed)';


      if(vc_feed_from){
        selector='.vc_tta-panel:not(.processed)';
      }



      if(isNaN(Number(o.settings_startTab))==false){
        o.settings_startTab = parseInt(o.settings_startTab, 10);
      }

      if(can_history_api()==false){
        o.settings_enable_linking = 'off';
      }

      o.toggle_breakpoint = parseInt(o.toggle_breakpoint, 10);





      if(window.dzsulb_inited==false){
        dzsulb_init();
      }






      // -- item





      init();

      // -- init item !
      function init(){



        // console.warn('init() - ', cthis);




        //console.info(cthis);


        if(cthis.attr('data-source')){

        }else{
          if(cthis.attr('href')){
            cthis.attr('data-source',cthis.attr('href'));
          }
        }

        var src = cthis.attr('data-source');
        if(!(cthis.attr('data-type')) || cthis.attr('data-type')=='detect'){


          //console.info(src,src.indexOf('.mp4'),src.length);
          cthis.attr('data-type',detect_ultibox_type(src));

        }else{

        }



        //console.info('type - ',cthis.attr('data-type'))



        // cthis.off('click');
        cthis.off('click',handle_mouse_item);
        cthis.on('click',handle_mouse_item);

      }



      function loadedImage(){
        preloading_nrtotalimagesloaded ++ ;

        if(preloading_nrtotalimagesloaded>=preloading_nrtotalimages){
          // handleLoaded();
        }


      }








      function calculate_dims(){

        tw = cthis.width();

        // calculate_dims_for_tab_height();


        var args = {};




        if(_boxMain.hasClass('type-inlinecontent')){
          console.info('ceva');


        }



      }





      return this;
    })
  }
  window.dzsulb_init = function(selector, settings) {
    if(typeof(settings)!="undefined" && typeof(settings.init_each)!="undefined" && settings.init_each==true ){
      var element_count = 0;
      for (var e in settings) { element_count++; }
      if(element_count==1){
        settings = undefined;
      }

      $(selector).each(function(){
        var _t = $(this);
        _t.dzsulb(settings)
      });
    }else{
      $(selector).dzsulb(settings);
    }




    // console.info('get_query_arg(window.location.href,\'ultibox\') - ',get_query_arg(window.location.href,'ultibox'));

    if(get_query_arg(window.location.href,'ultibox') || get_query_arg(window.location.href,'ultibox')=='0'){

      // console.info("SCROLL TO TOP");
      $(window).scrollTop(0);
    }


  };
})(jQuery);


function can_history_api() {
  return !!(window.history && history.pushState);
}
function is_ios() {
  return ((navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1) || (navigator.platform.indexOf("iPad") != -1)
  );
}

function is_android() {    //return true;
  var ua = navigator.userAgent.toLowerCase();    return (ua.indexOf("android") > -1);
}

function is_ie() {
  if (navigator.appVersion.indexOf("MSIE") != -1) {
    return true;    }; return false;
}
;
function is_firefox() {
  if (navigator.userAgent.indexOf("Firefox") != -1) {        return true;    };
  return false;
}
;
function is_opera() {
  if (navigator.userAgent.indexOf("Opera") != -1) {        return true;    };
  return false;
}
;
function is_chrome() {
  return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
}
;
function is_safari() {
  return navigator.userAgent.toLowerCase().indexOf('safari') > -1;
}
;
function version_ie() {
  return parseFloat(navigator.appVersion.split("MSIE")[1]);
}
;
function version_firefox() {
  if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
    var aversion = new Number(RegExp.$1); return(aversion);
  }
  ;
}
;
function version_opera() {
  if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
    var aversion = new Number(RegExp.$1); return(aversion);
  }
  ;
}
;
function is_ie8() {
  if (is_ie() && version_ie() < 9) {  return true;  };
  return false;
}
function is_ie9() {
  if (is_ie() && version_ie() == 9) {
    return true;
  }
  return false;
}



function get_query_arg(purl, key){
  //console.info(purl);

  // console.info("THIS", purl, key);
  if (purl.indexOf(key + '=') > -1) {
    //faconsole.log('testtt');
    var regexS = "[?&]" + key + "(.+?)(?=&|$)";
    var regex = new RegExp(regexS);
    var regtest = regex.exec(purl);


    //console.info(regex, regtest);
    if (regtest != null) {
      //var splitterS = regtest;


      if (regtest[1]) {
        var aux = regtest[1].replace(/=/g, '');
        return aux;
      } else {
        return '';
      }


    }
    //$('.zoombox').eq
  }
}


function add_query_arg(purl, key,value){
  key = encodeURIComponent(key); value = encodeURIComponent(value);

  //if(window.console) { console.info(key, value); };

  var s = purl;
  var pair = key+"="+value;

  var r = new RegExp("(&|\\?)"+key+"=[^\&]*");


  //console.info(pair);

  s = s.replace(r,"$1"+pair);
  //console.log(s, pair);
  var addition = '';
  if(s.indexOf(key + '=')>-1){


  }else{
    if(s.indexOf('?')>-1){
      addition = '&'+pair;
    }else{
      addition='?'+pair;
    }
    s+=addition;
  }

  //if value NaN we remove this field from the url
  if(value=='NaN'){
    var regex_attr = new RegExp('[\?|\&]'+key+'='+value);
    s=s.replace(regex_attr, '');
  }


  //if(!RegExp.$1) {s += (s.length>0 ? '&' : '?') + kvp;};

  return s;
}




jQuery(document).ready(function($){

  // console.info($('.rst-menu-main-con.auto-init'));

  //console.warn($('.ultibox-item'));
  dzsulb_init('.ultibox-item', {init_each: true});

  window.dzsulb_main_init();




  $(document).off('click','.ultibox-item-delegated');
  $(document).on('click','.ultibox-item-delegated', function(){
    window.open_ultibox($(this));

    return false;
  });


  // dzsulb_init('.ultibox-item', {init_each: true});


});