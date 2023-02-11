"use strict";
import {tooltipDefaults} from "./config/_tooltip_defaultSettings";
import {calculate_dims} from "./js_inc/view_tooltipResize";

var dzstlt_arr_tooltips = [];

class DzsTooltip{

  constructor(argThis, argOptions, $) {

    this.windowWidth = null;
    this.windowHeight = null;
    this.tooltipOffsetTop = null;
    this.tooltipOffsetLeft = null;
    this.tooltipWidth = null;
    this.indicatorOffsetTop = null;
    this.indicatorOffsetLeft = null;
    this.spaceInContainerTop = null;
    this.windowScrollTop = null;

    this.cthis = null;
    /** @var {jQuery} _tooltip */
    this._tooltip = null;

    this.original_arrow = '';
    this.original_align = '';

    this.argThis = argThis;
    this.o = argOptions;
    this.$ = $;

    this.initTooltip();
  }


  initTooltip(){

    const o = this.o;
    const $ = this.$;
    const selfTooltip = this;

    var cthis = jQuery(this.argThis),
       cchildren = cthis.children(),
       cclass = '';
    ;
    var foundArrow
      , found_align
    ;

    selfTooltip.cthis = cthis;
    selfTooltip._tooltip = selfTooltip.cthis.find('.dzstooltip').eq(0);
    selfTooltip._tooltip_inner = null;
    var currNr = -1;



    if (cthis.hasClass("dzstooltip")) {
      selfTooltip._tooltip = cthis;
    }
    if (selfTooltip._tooltip && selfTooltip._tooltip.children('.dzstooltip--inner').length) {
      selfTooltip._tooltip_inner = selfTooltip._tooltip.children('.dzstooltip--inner').eq(0);
    }
    cclass = selfTooltip._tooltip.attr('class');


    if (o.settings_disable_include_in_tt_array !== 'on') {
      dzstlt_arr_tooltips.push(selfTooltip._tooltip);
    }




    init();

    function init() {


      $('body').addClass('js');


      if (selfTooltip._tooltip.hasClass('inited')) {
        return false;
      }
      selfTooltip._tooltip.addClass('inited');


      let reg_align = new RegExp('talign-(?:\\w*)', "g");
      let reg_arrow = new RegExp('arrow-(?:\\w*)', "g");


      found_align = reg_align.exec(cclass);
      let foundTAlign = '';


      if (found_align && found_align[0]) {
        foundTAlign = found_align[0]
      } else {
        foundTAlign = 'talign-start';
      }


      selfTooltip._tooltip.data('original-talign', foundTAlign);
      selfTooltip.original_align = foundTAlign;


      let found_arrow = reg_arrow.exec(cclass);
      let foundArrow = '';


      if (found_arrow && found_arrow[0]) {
        foundArrow = found_arrow[0]
      } else {
        foundArrow = 'arrow-left';
      }


      selfTooltip._tooltip.data('original-arrow', foundArrow);

      selfTooltip.original_arrow = foundArrow;


      // -- check structure

      if (selfTooltip._tooltip.children('.dzstooltip--inner').length === 0) {
        selfTooltip._tooltip.wrapInner('<span class="dzstooltip--inner"></span>');
      }

      if (cthis.find('.tooltip-indicator').length === 0) {


        jQuery(cthis.children().eq(0).get(0).previousSibling).wrap('<span class="tooltip-indicator"></span>');


      }

      // -- check structure END


      selfTooltip._tooltip.addClass('original-' + selfTooltip.original_align);
      selfTooltip._tooltip.addClass('original-' + selfTooltip.original_arrow);


      cthis.get(0).api_handle_resize = handleResize;

      if (cthis.hasClass('for-click')) {
        cthis.on('click', click_cthis);
      } else {

        cthis.on('mouseenter', handle_mouse);
        cthis.on('mouseleave', handle_mouse);
        cthis.on('click', handle_mouse);

      }

      jQuery(window).on('resize', handleResize);
      jQuery(window).on('scroll', handle_scroll);

      handleResize();
      handle_scroll();


      setTimeout(handleResize, 2000);
    }

    function handle_scroll(e) {



      calculate_dims(selfTooltip, {
        checkX: false,
      });
    }

    function handle_mouse(e) {

      var _t = $(this);

      if (e.type === 'mouseenter') {
        // -- mouse over


        if (cthis.hasClass('for-hover')) {


          selfTooltip._tooltip.addClass('active');
        }

        if (selfTooltip._tooltip.find('.dzstooltip--inner').eq(0).find('.audioplayer').length) {
          var _c = selfTooltip._tooltip.find('.dzstooltip--inner').eq(0).find('.audioplayer');

          if (_c.get(0) && _c.get(0).api_play_media) {
            _c.get(0).api_play_media();
            _c.get(0).api_seek_to_perc(0);
          }
        }

        if (o.settings_show_active_in_parent === 'on') {
          cthis.addClass('tooltip-is-active');
        }
      }
      if (e.type === 'mouseleave') {

        if (cthis.hasClass('for-hover')) {
          selfTooltip._tooltip.removeClass('active');
        }


        if (selfTooltip._tooltip.find('.dzstooltip--inner').eq(0).find('.audioplayer').length) {
          const $audioPlayer = selfTooltip._tooltip.find('.dzstooltip--inner').eq(0).find('.audioplayer');

          if ($audioPlayer.get(0) && $audioPlayer.get(0).api_pause_media) {
            $audioPlayer.get(0).api_pause_media();
          }
        }


        if (o.settings_show_active_in_parent === 'on') {
          cthis.removeClass('tooltip-is-active');
        }

      }
      if (e.type === 'click') {

        if (cthis.hasClass('for-click')) {
          selfTooltip._tooltip.toggleClass('active');
        }


        const $audioPlayer = selfTooltip._tooltip.find('.dzstooltip--inner').eq(0).find('.audioplayer');

        if ($audioPlayer.length) {


          if ($audioPlayer.hasClass('is-playing')) {

            if ($audioPlayer.get(0) && $audioPlayer.get(0).api_pause_media) {
              $audioPlayer.get(0).api_pause_media();
            }
          } else {

            if ($audioPlayer.get(0) && $audioPlayer.get(0).api_play_media) {
              $audioPlayer.get(0).api_play_media();
            }
          }
        }


        if (o.settings_show_active_in_parent === 'on') {
          cthis.removeClass('tooltip-is-active');
        }

      }
    }




    function handleResize(e, pargs) {
      calculate_dims(selfTooltip);
    }

    function click_cthis(e) {

      var _c = cthis.find('.dzstooltip');
      if (selfTooltip._tooltip.hasClass('active')) {
        selfTooltip._tooltip.removeClass('active');


      } else {


        if (o.settings_close_other_tooltips === 'on') {
          for (let i3 = 0; i3 < dzstlt_arr_tooltips.length; i3++) {
            if (dzstlt_arr_tooltips[i3]) {
              dzstlt_arr_tooltips[i3].removeClass('active');
            }
          }
        }

        _c.addClass('active');


        if (o.settings_show_active_in_parent === 'on') {
          cthis.addClass('tooltip-is-active');
        }


      }


    }

    return this;
  }

}

(function ($) {


  $.fn.dzstooltip = function (o) {

    o = $.extend({...tooltipDefaults}, o);
    this.each(function () {
      return new DzsTooltip(this, o, $);
    })
  }


  window.dzstt_init = function (arg, optargs) {
    $(arg).dzstooltip(optargs);
  }
})(jQuery);


if (typeof jQuery != 'undefined') {
  jQuery(document).ready(function ($) {
    var defsettings = {};

    if (window.dzstlt_init_settings) {
      defsettings = window.dzstlt_init_settings;
    }
    dzstt_init('.dzstooltip-con.js', defsettings);
  })
} else {
  alert('dzstooltip.js - this plugin is based on jQuery -> please include jQuery')
}