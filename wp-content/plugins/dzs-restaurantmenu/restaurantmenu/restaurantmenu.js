// ==DZS ZoomTabs and Accordions
// @version 1.23
// @this is not free software
// == DZS ZoomTabs and Accordions == copyright == http://digitalzoomstudio.net


"use strict";

Object.size = function (obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};
if (window.jQuery === undefined) {
  alert("dzstabs.js -> jQuery is not defined or improperly declared ( must be included at the start of the head tag ), you need jQuery for this plugin");
}
jQuery.fn.outerHTML = function (e) {
  return e
    ? this.before(e).remove()
    : jQuery("<p>").append(this.eq(0).clone()).html();
};

window.dzstaa_self_options = {};

var settings_dzstabs = {animation_time: 300, animation_easing: 'easeOutCirc'};
(function ($) {


  $.fn.prependOnce = function (arg, argfind) {
    var _t = $(this) // It's your element


    if (typeof (argfind) == 'undefined') {
      var regex = new RegExp('class="(.*?)"');
      var auxarr = regex.exec(arg);


      if (typeof auxarr[1] != 'undefined') {
        argfind = '.' + auxarr[1];
      }
    }


    // we compromise chaining for returning the success
    if (_t.children(argfind).length < 1) {
      _t.prepend(arg);
      return true;
    } else {
      return false;
    }
  };
  $.fn.appendOnce = function (arg, argfind) {
    var _t = $(this) // It's your element


    if (typeof (argfind) == 'undefined') {
      var regex = new RegExp('class="(.*?)"');
      var auxarr = regex.exec(arg);


      if (typeof auxarr[1] != 'undefined') {
        argfind = '.' + auxarr[1];
      }
    }
    if (_t.children(argfind).length < 1) {
      _t.append(arg);
      return true;
    } else {
      return false;
    }
  };


  $.fn.dzsrst = function (o) {

    //==default options
    const defaults = {
      settings_slideshowTime: '5' //in seconds
      , settings_mode: 'default' // -- blocks or zfolio or tabs or parallaxer or blackwhite
      , layout: 'default' // -- layout-1-col or layout-3-cols or layout-4-cols
      , layout_margin: 'default' // --  margin between items
      , item_link_whole_to: 'default'
      , item_link_thumb_con_to: 'default'
      , item_link_info_to: 'default'
      , settings_contentHeight: '0'//set the fixed tab height
      , settings_scroll_to_start: 'off'//scroll to start when a tab menu is clicked
      , settings_startTab: 'default'// -- the start tab, default or a fixed number
      , design_skin: 'skin-default' // -- skin-default, skin-boxed, skin-melbourne or skin-blue
      , design_mi_skin: 'skin-default' // -- skin-default, skin-boxed, skin-melbourne or skin-blue
      , design_transition: 'default' // default, fade or slide
      , design_tabsposition: 'top' // -- set top, right, bottom or left
      , design_tabswidth: 'default' // -- set the tabs width for position left or right, if tabs position top or bottom and this is set to fullwidth, then the tabs will cover all the width
      , call_from: 'default' // -- js debug
      , design_maxwidth: '4000'
      , settings_makeFunctional: false
      , settings_appendWholeContent: false // -- take the whole tab content and append it into the dzs tabs, this makes complex scripts like sliders still work inside of tabs
      , toggle_breakpoint: '320' //  -- a number at which bellow the tabs will trasform to toggles
      , toggle_type: 'accordion' // -- normally, the  toggles act like accordions, but they can act like traditional toggles if this is set to toggle
      , refresh_tab_height: '0' // -- normally, the  toggles act like accordions, but they can act like traditional toggles if this is set to toggle
      , outer_menu: null // -- normally, the  toggles act like accordions, but they can act like traditional toggles if this is set to toggle
      , action_gotoItem: null // -- set a external javascript action that happens when a item is selected
      , vc_editable: false // -- add some extra classes for the visual composer frontend edit

    };


    if (typeof o === 'undefined') {
      if (typeof $(this).attr('data-options') !== 'undefined' && $(this).attr('data-options') !== '') {
        var aux = $(this).attr('data-options');
        aux = 'window.dzstaa_self_options = ' + aux;
        eval(aux);
        o = $.extend({}, window.dzstaa_self_options);
        window.dzstaa_self_options = $.extend({}, {});
      }
    }
    o = $.extend(defaults, o);
    this.each(function () {
      var cthis = $(this)
        , cclass = ''
        , cid = ''

      ;
      var nrChildren = 0;
      var currNr = -1
        , currNrEx = -1
      ;
      var mem_children = [];
      var _tabsMenu
        , _tabsContent
        , _itemsFeed = null // -- the main items feeder
        , _rstModeCon = null // -- the main container
        , $rstMode = null // -- the main container
        , items
        , _c
        , _carg
      ;
      var i = 0;
      var ww
        , wh
        , tw
        , targeth
        , padding_content = 20
      ;
      var busy_transition = false
        , vc_feed_from = false // -- feed from visual composer
      ;
      var handled = false; //describes if all loaded function has been called

      var preloading_nrtotalimages = 0
        , preloading_nrtotalimagesloaded = 0
      ;

      var animation_slide_vars = {
        'duration': 300
        , 'queue': false
      }

      var current_mode = 'tab';


      var selector = '.rst-menu-item:not(.processed)';


      if (vc_feed_from) {
        selector = '.vc_tta-panel:not(.processed)';
      }


      if (isNaN(Number(o.settings_startTab)) === false) {
        o.settings_startTab = parseInt(o.settings_startTab, 10);
      }

      if (can_history_api() === false) {
        o.settings_enable_linking = 'off';
      }

      o.toggle_breakpoint = parseInt(o.toggle_breakpoint, 10);

      init();

      function init(pargs) {


        let margs = {
          'call_from': 'default'
        }

        if (typeof pargs != 'undefined') {
          margs = $.extend(margs, pargs);
        }


        if ((handled || cthis.hasClass('dzstaa-loaded')) && margs.call_from !== 'reinit') {
          reinit();
          return;
        }

        if (typeof (cthis.attr('class')) == 'string') {
          cclass = cthis.attr('class');
        } else {
          cclass = cthis.get(0).className;
        }

        if (cthis.hasClass('rst-menu-item-skin-aura')) {
          o.design_mi_skin = 'skin-aura';
        }
        if (cthis.hasClass('rst-menu-item-skin-blackwhite2')) {
          o.design_mi_skin = 'skin-blackwhite2';


          if (o.layout_margin === 'default') {
            o.layout_margin = '0';
          }
        }
        if (cthis.hasClass('rst-menu-item-skin-piadina')) {
          o.design_mi_skin = 'skin-piadina';
          if (o.item_link_info_to === 'default') {
            o.item_link_info_to = 'none';
          }
        }
        if (cthis.hasClass('rst-menu-item-skin-feature')) {
          o.design_mi_skin = 'skin-feature';


          if (o.item_link_info_to === 'default') {
            o.item_link_info_to = 'none';
          }
        }


        if (o.item_link_thumb_con_to === 'default') {
          o.item_link_thumb_con_to = 'ultibox';
        }

        if (o.settings_mode === 'default') {
          o.settings_mode = 'blocks';
        }

        if (o.settings_mode === 'blocks') {

          if (o.layout == 'default') {

            if (o.design_mi_skin == 'skin-piadina') {
              o.layout = 'dzs-layout--3-cols';
            }
            if (o.design_mi_skin == 'skin-aura') {
              o.layout = 'dzs-layout--4-cols';
            }
            if (o.design_mi_skin == 'skin-blackwhite2') {
              o.layout = 'dzs-layout--4-cols';
            }
          }
        }


        if (o.settings_mode == 'blocks' && o.call_from == 'tabs') {
          o.layout = 'none';
        }
        if (o.layout_margin == 'default') {
          o.layout_margin = '30';
        }

        if (o.layout == 'default') {
          o.layout = 'none';
        }

        if (o.item_link_info_to === 'default') {
          o.item_link_info_to = 'tooltip';
        }

        if (cthis.children('.items').length) {

        } else {
          console.warn('items feed empty');
        }
        _itemsFeed = cthis.children('.items').eq(0);


        cthis.append('<div class="rst-mode-con"></div>');

        _rstModeCon = cthis.children('.rst-mode-con').eq(0);


        cthis.addClass('mode-' + o.settings_mode);


        if (o.settings_mode == 'blocks') {
          _rstModeCon.append('<div class="rst-mode mode-' + o.settings_mode + '"></div>');
          $rstMode = _rstModeCon.children('.rst-mode').eq(0);


          $rstMode.addClass(o.layout);


          if (o.layout_margin !== '30') {

            $rstMode.attr('data-margin', o.layout_margin);
          }
        }


        if (o.settings_mode === 'zfolio') {
          _rstModeCon.append('<div  class="zfolio rst-mode mode-' + o.settings_mode + '  delay-effects dzs-layout--4-cols" data-options=\'\'><div class="items "></div></div>');
          $rstMode = _rstModeCon.children('.rst-mode').eq(0);
        }


        reinit();


        handleLoaded();

      }

      function reinit() {


        if (cthis.children('.vc_tta-panel').length) {
          vc_feed_from = true;
        }


        var i5 = 0;

        if (_itemsFeed) {

          _itemsFeed.children(selector).each(function () {
            var _t = $(this);


            // -- tbc


            if (o.settings_mode === 'blocks') {

              $rstMode.append(_t);

            }
            if (o.settings_mode === 'zfolio') {


              $rstMode.find('.items').eq(0).append(_t);
            }

            nrChildren++;
          });
        } else {
          init({
            'call_from': 'reinit'
          })
        }

        var indreal = 0;
        $rstMode.find(selector).each(function () {
          var _t = $(this);
          var _ti = _t;

          if (o.settings_mode === 'blocks') {
            _t.wrapInner('<div class="rst-menu-item--inner"></div>');
            _ti = _t.children('.rst-menu-item--inner').eq(0);
          }


          if (o.layout !== 'none') {

            _t.addClass('dzs-layout-item');
          }


          if (o.settings_mode === 'zfolio') {
            _t.addClass('zfolio-item');
            if (_t.attr('data-thumb')) {
              _t.attr('data-thumbnail', _t.attr('data-thumb'));
            }
          }


          if (_t.attr('data-thumb')) {


            if (o.settings_mode === 'blocks') {
              // -- blocks

              var aux_feature = '';


              if (o.item_link_thumb_con_to === 'link') {
                aux_feature += ' <a class="the-feature-con';
              } else {
                aux_feature += ' <div class="the-feature-con';
              }


              if (o.item_link_thumb_con_to === 'ultibox' && _t.attr('data-bigimage')) {
                aux_feature += ' ultibox-item from-blocks';
              }


              aux_feature += '"';


              if (o.item_link_thumb_con_to === 'ultibox' && _t.attr('data-bigimage')) {

                aux_feature += ' data-biggallery="' + 'dzsrst' + '"';
              }

              if (o.item_link_thumb_con_to === 'ultibox' && _t.attr('data-bigimage')) {

                aux_feature += ' data-source="' + _t.attr('data-bigimage') + '"';
              }

              if (o.item_link_thumb_con_to == 'ultibox' && _t.attr('data-biggallery')) {

                aux_feature += ' data-biggallery="' + _t.attr('data-biggallery') + '"';
              }


              aux_feature += '>';


              if (o.item_link_thumb_con_to === 'ultibox') {

                aux_feature += ' <div class="feed-ultibox feed-ultibox-desc"><div class="rst-big-desc">' + _ti.children('.feed-rst').eq(0).html() + '</div></div>';
              }


              aux_feature += '<div class="the-feature" style="background-image: url(' + _t.attr('data-thumb') + '); "></div>';


              if (o.design_mi_skin === 'skin-aura') {
                aux_feature += ' <div class="dzs-button read-more-button"> <div class="the-bg"> </div> <div class="the-text"> READ MORE </div> </div>';
              }
              if (o.design_mi_skin === 'skin-blackwhite2') {
                aux_feature += ' <div class="dzs-button read-more-button"> <div class="the-bg"> </div> <div class="the-text"> READ MORE </div> </div>';
              }

              if (o.item_link_thumb_con_to === 'link') {
                aux_feature += ' </a>';
              } else {
                aux_feature += '</div>';
              }

              if (o.design_mi_skin == 'skin-aura') {
                _ti.prepend(aux_feature);
              }
              if (o.design_mi_skin == 'skin-blackwhite2') {


                _ti.prepend(aux_feature);
              }

              if (o.design_mi_skin == 'skin-default') {
                _ti.before(aux_feature);
              }
              if (o.design_mi_skin == 'skin-piadina') {
                _ti.after(aux_feature);
              }

              if (o.design_mi_skin == 'skin-feature') {
                _ti.before(aux_feature);
              }
            }
            if (o.settings_mode === 'zfolio') {
              let stringZfolioFeatureCon = '';

              if (o.design_mi_skin === 'skin-aura') {
                stringZfolioFeatureCon += '<div class="feed-zfolio feed-zfolio-append-feature-con"><div class="dzs-button read-more-button"> <div class="the-bg"> </div> <div class="the-text"> READ MORE </div> </div> </div>';
              }
              if (o.design_mi_skin === 'skin-blackwhite2') {
                stringZfolioFeatureCon += '<div class="feed-zfolio feed-zfolio-append-feature-con"><div class="dzs-button read-more-button"> <div class="the-bg"> </div> <div class="the-text"> READ MORE </div> </div> </div>';
              }
              _t.append(stringZfolioFeatureCon);

            }
          }

          if (o.design_mi_skin === 'skin-default') {

            _ti.find('.the-price').eq(0).after('<div class="clear"></div>');

            if (_ti.find('.the-price').length && _ti.find('.the-title').length) {

              _ti.find('.the-price').eq(0).before('<div class="dots"></div>');
            }

            _ti.find('.the-title').eq(0).wrapInner('<div class="title-inner"></div>');


            if (_ti.children('.feed-rst').length && o.item_link_info_to != 'none') {
              var aux = '';

              if (o.item_link_info_to === 'ultibox') {

                aux += '<a class="info-con dzstooltip-con js for-hover ';


                if (o.item_link_info_to === 'ultibox' && _t.attr('data-bigimage')) {

                  aux += ' ultibox-item  from-skin-default';
                }


                aux += '"';


                if (o.item_link_info_to === 'ultibox' && _t.attr('data-bigimage')) {

                  aux += ' data-source="' + _t.attr('data-bigimage') + '"';
                }


                if (o.item_link_thumb_con_to === 'ultibox' && _t.attr('data-biggallery')) {

                  aux += ' data-biggallery="' + _t.attr('data-biggallery') + '"';
                }

                aux += '>';


                aux += ' <div class="feed-ultibox feed-ultibox-desc"><div class="rst-big-desc">' + _ti.children('.feed-rst').eq(0).html() + '</div></div>';
              } else {

                aux += '<div class="dzstooltip-con info-con js for-hover">';
              }


              var tooltip_position = 'arrow-bottom';

              if (o.call_from === 'tabs' && indreal < 3) {
                tooltip_position = 'arrow-top';
              }


              aux += '<div class="tooltip-indicator"><div class=" ">';

              aux += '<i class="fa fa-info-circle" aria-hidden="true"></i>';

              aux += '</div></div>';

              aux += '<div class="dzstooltip style-rounded color-dark-light dims-set ' + tooltip_position + ' align-center" style="width: 350px; white-space: normal"><span class="dzstooltip--inner">' + _ti.children('.feed-rst').eq(0).html() + '</span></div> ';


              if (o.item_link_info_to === 'ultibox') {

                aux += '</a>';
              } else {

                aux += '</div>';
              }


              _ti.find('.the-title').eq(0).append(aux);
            }


            _ti.find('.the-title,.the-price,.dots').wrapAll('<div class="table-wrap"></div>');
          }
          if (o.design_mi_skin === 'skin-blackwhite2') {

            _ti.find('.the-title,.the-price,>.the-ingredients').wrapAll('<div class="desc-wrap"><div class="desc-wrap--inner"></div></div>');


            var ind = $rstMode.children().index(_ti.parent());


            if (ind % 2 === 1) {

              if (!_ti.find('.desc-wrap').eq(0).next().hasClass('the-feature-con')) {

                _ti.find('.desc-wrap').after(_ti.find('.the-feature-con'));
              }
            } else {

            }
            if (_ti.find('.the-ingredients').eq(0).next().hasClass('the-price') == false) {

              _ti.find('.the-ingredients').after(_ti.find('.the-price'));
            }

          }

          if (o.design_mi_skin === 'skin-piadina') {

            _ti.find('.the-price').eq(0).after('<div class="clear"></div>');


            _ti.find('.the-title').eq(0).wrapInner('<div class="title-inner"></div>');

            if (_ti.children('.feed-rst').length && o.item_link_info_to != 'none') {
              _ti.find('.the-title').eq(0).append('<div class="info-con dzstooltip-con js for-hover"><i class="fa fa-info-circle" aria-hidden="true"></i><div class="dzstooltip arrow-bottom align-center" style="width: 350px; white-space: normal">' + _ti.children('.feed-rst').eq(0).html() + '</div> </div>');
            }

            _ti.find('.the-title,.the-price,>.the-ingredients').wrapAll('<div class="circle-wrap-inner"></div>');
            _ti.find('.the-title').before(_ti.find('> .the-icon'));

          }

          if (o.design_mi_skin == 'skin-feature') {

            _ti.find('.the-price').eq(0).after('<div class="clear"></div>');

            if (_ti.find('.the-price').length && _ti.find('.the-title').length) {

              _ti.find('.the-price').eq(0).before('<div class="dots"></div>');
            }

            _ti.find('.the-title').eq(0).wrapInner('<div class="title-inner"></div>');

            if (_ti.children('.feed-rst').length && o.item_link_info_to != 'none') {
              _ti.find('.the-title').eq(0).append('<div class="info-con dzstooltip-con js for-hover"><i class="fa fa-info-circle" aria-hidden="true"></i><div class="dzstooltip arrow-bottom align-center" style="width: 350px; white-space: normal">' + _ti.children('.feed-rst').eq(0).html() + '</div> </div>');
            }


            _ti.find('.the-ingredients').after(_ti.find('.the-price'));
            _ti.parent().wrapInner('<div class="rst-menu-item--inne"></div>');
          }

          indreal++;

        })


        if (o.settings_mode === 'zfolio') {

          let argsForZfolio = {
            design_item_thumb_height: "1"
            , item_extra_class: ""
            , design_skin: "skin-noskin"
            , selector_con_skin: "selector-con-for-skin-melbourne"
            , excerpt_con_transition: "wipe"

          };

          argsForZfolio.item_link_thumb_con_to = o.item_link_thumb_con_to;


          $rstMode.addClass('set-height-when-final');


          dzszfl_init($rstMode, argsForZfolio);
        }


        if (o.item_link_thumb_con_to === 'ultibox') {
          if ($.fn.dzsulb) {

            cthis.find('.ultibox-item').dzsulb({})
          } else {
            console.warn('please init ultibox');
          }
        }


      }

      function loadedImage() {
        preloading_nrtotalimagesloaded++;

        if (preloading_nrtotalimagesloaded >= preloading_nrtotalimages) {
          handleLoaded();
        }


      }

      function handleLoaded() {
        if (handled == true || cthis.hasClass('dzstaa-loaded')) {
          return;
        }

        cthis.addClass('dzstaa-loaded');
        handled = true;


        if (cthis.get(0)) {
          cthis.get(0).api_goto_tab = gotoItem;
          cthis.get(0).api_reinit = reinit;
          cthis.get(0).api_handle_resize = handle_resize;
          cthis.get(0).api_goto_item_next = goto_item_next;
          cthis.get(0).api_goto_item_prev = goto_item_prev;
        }

        if (cthis.hasClass('skin-chef') || cthis.hasClass('skin-qcre')) {
          _tabsMenu.children().each(function () {
            var _t = $(this).children('.tab-menu');
            _t.prependOnce('<span class="plus-sign"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" height="12px" viewBox="0 0 12 12" enable-background="new 0 0 12 12" xml:space="preserve"> <circle fill="#999999" cx="6" cy="6" r="6"/><rect class="rect1" x="5" y="2" fill="#FFFFFF" width="2" height="8"/><rect class="rect2" x="2" y="5" fill="#FFFFFF" width="8" height="2"/></svg></span>');
          })
        }


        $(window).bind('resize', handle_resize)
        handle_resize();
        setTimeout(handle_resize, 500);


        if (o.settings_startTab == 'default') {
          if (o.toggle_type == 'toggle') {
            o.settings_startTab = -1;
          }
        }
        if (typeof get_query_arg(window.location.href, 'dzstaa_starttab_' + cid) != 'undefined') {
          o.settings_startTab = Number(get_query_arg(window.location.href, 'dzstaa_starttab_' + cid));
        }
        if (o.settings_startTab == 'default') {
          o.settings_startTab = 0;
        }


        if (Number(o.refresh_tab_height) > 0) {
          setInterval(calculate_dims_for_tab_height, Number(o.refresh_tab_height));
        }

        cthis.find('.goto-prev-tab').bind('click', goto_item_prev);
        cthis.find('.goto-next-tab').bind('click', goto_item_next);


        if (o.design_mi_skin == 'skin-piadina') {
          cthis.on('mouseover', '.rst-menu-item', handle_mouse);
          cthis.on('mouseout', '.rst-menu-item', handle_mouse);
        }

        cthis.on('click', '.add-to-cart-btn-woo,.add-to-cart-btn-woo-get', handle_mouse);
        cthis.on('change', '.rst-woo-qnt', handle_change);

        setTimeout(function () {
          cthis.find('.rst-woo-qnt').trigger('change');
        }, 1000);

        // gotoItem(o.settings_startTab, {'ignore_linking' : true});

      }


      function handle_change(e) {
        var _t = $(this);

        if (e.type == 'change') {

          if (_t.hasClass('rst-woo-qnt')) {

            var url = _t.next().attr('href');
            url = remove_query_arg(url, 'removed_item');
            url = add_query_arg(url, 'add-to-cart', _t.next().attr('data-the-post-id'));
            url = add_query_arg(url, 'quantity', _t.val());


            _t.next().attr('href', url);

          }
        }
      }


      function handle_mouse(e) {
        var _t = $(this);

        if (e.type == 'mouseover') {
          _t.parent().children().addClass('zoomed-out');
          _t.removeClass('zoomed-out');
        }
        if (e.type == 'mouseout') {
          _t.parent().children().removeClass('zoomed-out');
        }
        if (e.type === 'click') {
          if (_t.hasClass('add-to-cart-btn-woo')) {


            var data = {
              action: 'dzsrst_ajax_add_to_cart'
              , product_id: _t.parent().parent().attr('data-post-id')
            };
            $.post(dzsrst_settings.site_url + '/index.php', data, function (response) {
              console.log('Got this from the server: ' + response);


            });


          }
          if (_t.hasClass('add-to-cart-btn-woo-get')) {


          }
        }

      }

      function handle_resize(e) {

        ww = $(window).width();
        wh = $(window).height();

        calculate_dims();


        $rstMode.find(selector).each(function () {

          var _t2 = $(this);


          if (o.settings_mode === 'blocks') {


            if (o.design_mi_skin === 'skin-piadina') {

              _t2.find('.rst-menu-item--inner').height(_t2.find('.rst-menu-item--inner').width());
            } else {

              var fw = _t2.find('.the-feature').outerWidth()
              _t2.find('.the-feature').outerHeight(fw);

              if (o.design_mi_skin === 'skin-blackwhite2') {

                _t2.find('.desc-wrap').css('min-height', fw + 'px')
              }
            }
          }
        })
      }

      function calculate_dims_for_tab_height() {

        return false;

        _carg = _tabsContent.children().eq(currNr);


        if (cthis.hasClass('is-toggle')) {

          var ind2 = 0;
          _tabsMenu.find('.tab-menu-content-con').each(function () {
            var _t = $(this);
            var ind = _t.parent().parent().children('.tab-menu-con').index(_t.parent());

            _t.attr('data-targetheight', _t.children('.tab-menu-content').outerHeight());
            if (_t.parent().hasClass('active')) {
              _t.css('height', _t.children('.tab-menu-content').outerHeight());


            }

            if (o.settings_appendWholeContent) {

              _t.children('.tab-menu-content').eq(0).append(_tabsContent.find('.tab-content[data-tab-index="' + ind + '"]').eq(0));

            }

            ind2++;
          });
        }

        _carg.css({
          'display': 'block'
          //,'width' : tw
        });


        targeth = _carg.outerHeight();// + padding_content;


        if (cthis.hasClass('skin-default')) {
          targeth += 10;
        }

        _tabsContent.css({
          'height': (targeth)
        });
      }

      function calculate_dims() {

        tw = cthis.width();

        calculate_dims_for_tab_height();


        var args = {};
        if (cthis.hasClass('is-toggle')) {

          var ind = 0;
          _tabsMenu.find('.tab-menu-content-con').each(function () {
            var _t = $(this);

            _t.attr('data-targetheight', _t.children('.tab-menu-content').outerHeight());
            if (_t.parent().hasClass('active')) {
              _t.css('height', _t.children('.tab-menu-content').outerHeight());


            }

            if (o.settings_appendWholeContent) {
              if (_tabsContent.find('.tab-content').eq(0).children().length > 0) {


                _t.children('.tab-menu-content').eq(0).append(_tabsContent.find('.tab-content[data-tab-index="' + ind + '"]').eq(0));
              }
            }

            ind++;
          });
          if (o.design_tabswidth == 'fullwidth') {
            _tabsMenu.children().each(function () {
              var _t = $(this);
              _t.css({
                'width': ''
              })
              _t.find('.tab-menu').css({
                'width': ''
              })
            })
          }


          if (o.design_tabswidth != 'fullwidth') {
            _tabsMenu.css('width', '');
          }

        } else {

          if (o.design_tabswidth == 'fullwidth') {
            _tabsMenu.children().each(function () {
              var _t = $(this);
              _t.css({
                'width': Number(100 / _tabsMenu.children().length) + '%'
              })
              _t.find('.tab-menu').css({
                'width': '100%'
              })
            })
          }


          return false;
          if (o.design_tabswidth !== 'fullwidth') {
            _tabsMenu.css('width', o.design_tabswidth);
          }


          if (o.settings_appendWholeContent) {
            _tabsMenu.find('.tab-menu-content-con').each(function () {
              var _t = $(this);

              if (_t.children().eq(0).children().eq(0).hasClass('tab-content')) {
                _tabsContent.append(_t.children().eq(0).children().eq(0));
              }

            })

            for (var i3 = 0; i3 < nrChildren; i3++) {

              _tabsContent.append(_tabsMenu.find('.tab-content[data-tab-index="' + i3 + '"]').eq(0));


            }

            if (currNr > -1) {
              _tabsContent.children().eq(currNr).addClass('active');
            } else {

              _tabsContent.children().eq(0).addClass('active');
            }

          }

        }


        if (tw < o.toggle_breakpoint) {
          if (!cthis.hasClass('is-toggle')) {
            cthis.addClass('is-toggle');
            current_mode = 'toggle';

            handle_resize();

            args.ignore_arg_currNr_check = true;
            if (currNr > -1) {
              gotoItem(currNr, args);
            }
          }
        } else {

          if (cthis.hasClass('is-toggle')) {
            cthis.removeClass('is-toggle');
            current_mode = 'tab';

            args.ignore_arg_currNr_check = true;

            if (currNr > -1) {
              gotoItem(currNr, args);
            }
          }

        }


      }


      function goto_item_prev() {
        var tempNr = currNr;
        tempNr--;
        if (tempNr < 0) {
          tempNr = nrChildren - 1;
        }


        gotoItem(tempNr);

        return false;
      }

      function goto_item_next() {
        var tempNr = currNr;
        tempNr++;
        if (tempNr >= nrChildren) {
          tempNr = 0;
        }


        gotoItem(tempNr);


        return false;
      }


      function gotoItem(arg, pargs) {

        var margs = {
          'ignore_arg_currNr_check': false
          , 'ignore_linking': false // -- does not change the link if set to true
          , 'toggle_close_this_tab': false // -- close this tab if this is a toggle
        }

        if (typeof pargs != 'undefined') {
          margs = $.extend(margs, pargs);
        }

        if (arg == -1) {
          return;
        }

        if (!margs.ignore_arg_currNr_check) {
          if (arg == currNr) {
            return;
          }
        }
        if (busy_transition) {
          return;
        }

        if (margs.ignore_linking == false && o.settings_enable_linking == 'on') {
          var stateObj = {foo: "bar"};
          history.pushState(stateObj, "DZS Tabs " + arg, add_query_arg(window.location.href, 'dzstaa_starttab_' + cid, (arg)));
        }


        if (cthis.hasClass('is-toggle')) {

          if (margs.toggle_close_this_tab) {

            var _c = _tabsMenu.children().eq(arg);
            _c.removeClass('active');

            setTimeout(function () {
              _c.removeClass('active');
              _c.find('.tab-menu-content-con').eq(0).css('height', 0);
            }, 100)
          }
        }
        if (cthis.hasClass('is-toggle') && o.toggle_type === 'toggle') {


        } else {
          _tabsMenu.children().removeClass('active');

        }


        _tabsContent.children().removeClass('active');

        busy_transition = true;
        if (o.design_transition === 'slide') {
          if (currNr > -1) {
            if (o.design_tabsposition === 'top' || o.design_tabsposition === 'bottom') {
              if (arg > currNr) {
                _tabsContent.children().eq(currNr).css({
                  'left': '-100%'
                })
              } else {

                _tabsContent.children().eq(currNr).css({
                  'left': '100%'
                })
              }

            } else {
              if (arg > currNr) {
                _tabsContent.children().eq(currNr).css({
                  'top': '-100%'
                })
              } else {

                _tabsContent.children().eq(currNr).css({
                  'top': '100%'
                })
              }
            }

          }

          // --- the transition
          if (o.design_tabsposition === 'top' || o.design_tabsposition === 'bottom') {
            if (arg > currNr) {
              _tabsContent.children().eq(arg).css({
                'left': '100%'
              })
            } else {

              _tabsContent.children().eq(arg).css({
                'left': '-100%'
              })
            }

          } else {

            if (arg > currNr) {
              _tabsContent.children().eq(arg).css({
                'top': '100%'
              })
            } else {

              _tabsContent.children().eq(arg).css({
                'top': '-100%'
              })
            }
          }

          setTimeout(function () {
            _tabsContent.children('.active').css({
              'left': ''
              , 'top': ''
            })
          }, 100);
        }
        setTimeout(function () {
          busy_transition = false;
        }, 400);


        if (cthis.hasClass('is-toggle')) {
          _tabsMenu.children().eq(arg).find('.tab-menu-content-con').eq(0).css({
            'height': _tabsMenu.children().eq(arg).find('.tab-menu-content-con').eq(0).attr('data-targetheight')
          })
        }


        // --- END the transition

        var menuarg = arg; // -- the menu position of the clicked item

        if (_tabsMenu.children().eq(arg).attr('data-initial-sort')) {

        } else {

        }
        _tabsMenu.children().eq(arg).addClass('active');

        _tabsContent.children().eq(arg).addClass('active');
        currNr = arg;

        //------- currNr zone


        if (currNr > -1) {

          if (cthis.hasClass('is-toggle') && o.toggle_type == 'accordion') {
            _tabsMenu.children(":not(.active)").each(function () {
              var _t = $(this);
              _t.find('.tab-menu-content-con').eq(0).css('height', 0);
            });
          }
        }

        if (o.settings_scroll_to_start == 'on') {
          if (typeof margs != 'undefined' && margs.mouseevent && margs.mouseevent.type == 'click') {
            $(' body').animate({
              scrollTop: _tabsContent.children().eq(currNr).offset().top
            }, 300);
          }

        }


        calculate_dims();

        if (o.action_gotoItem) {
          margs.cthis = cthis;
          o.action_gotoItem(arg, margs);
        }
      }

      return this;
    })
  }
  window.dzsrst_init = function (selector, settings) {
    if (typeof (settings) != "undefined" && typeof (settings.init_each) != "undefined" && settings.init_each == true) {
      var element_count = 0;
      for (var e in settings) {
        element_count++;
      }
      if (element_count == 1) {
        settings = undefined;
      }

      $(selector).each(function () {
        var _t = $(this);
        _t.dzsrst(settings)
      });
    } else {
      $(selector).dzsrst(settings);
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
  var ua = navigator.userAgent.toLowerCase();
  return (ua.indexOf("android") > -1);
}

function is_ie() {
  if (navigator.appVersion.indexOf("MSIE") != -1) {
    return true;
  }
  ;
  return false;
}
;

function is_firefox() {
  if (navigator.userAgent.indexOf("Firefox") != -1) {
    return true;
  }
  ;
  return false;
}
;

function is_opera() {
  if (navigator.userAgent.indexOf("Opera") != -1) {
    return true;
  }
  ;
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
    var aversion = new Number(RegExp.$1);
    return (aversion);
  }
  ;
}
;

function version_opera() {
  if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
    var aversion = new Number(RegExp.$1);
    return (aversion);
  }
  ;
}
;

function is_ie8() {
  if (is_ie() && version_ie() < 9) {
    return true;
  }
  ;
  return false;
}

function is_ie9() {
  if (is_ie() && version_ie() == 9) {
    return true;
  }
  return false;
}


function get_query_arg(purl, key) {
  if (purl.indexOf(key + '=') > -1) {
    var regexS = "[?&]" + key + "=.+";
    var regex = new RegExp(regexS);
    var regtest = regex.exec(purl);


    if (regtest != null) {
      var splitterS = regtest[0];
      if (splitterS.indexOf('&') > -1) {
        var aux = splitterS.split('&');
        splitterS = aux[1];
      }
      var splitter = splitterS.split('=');

      return splitter[1];

    }
  }
}


function remove_query_arg(purl, key) {
  var s = window.dzsrst_add_query_arg(purl, key, 'NaN');
  return s;
}

function add_query_arg(purl, key, value) {
  key = encodeURIComponent(key);
  value = encodeURIComponent(value);


  var s = purl;
  var pair = key + "=" + value;

  var r = new RegExp("(&|\\?)" + key + "=[^\&]*");


  s = s.replace(r, "$1" + pair);
  var addition = '';
  if (s.indexOf(key + '=') > -1) {


  } else {
    if (s.indexOf('?') > -1) {
      addition = '&' + pair;
    } else {
      addition = '?' + pair;
    }
    s += addition;
  }

  //if value NaN we remove this field from the url
  if (value === 'NaN') {
    var regex_attr = new RegExp('[\?|\&]' + key + '=' + value);
    s = s.replace(regex_attr, '');


    if (s.indexOf('?') === -1) {
      s = s.replace('&', '?');
    }
  }


  return s;
}

window.dzsrst_add_query_arg = add_query_arg;


jQuery(document).ready(function ($) {

  dzsrst_init('.rst-menu-main-con.auto-init', {init_each: true});


});