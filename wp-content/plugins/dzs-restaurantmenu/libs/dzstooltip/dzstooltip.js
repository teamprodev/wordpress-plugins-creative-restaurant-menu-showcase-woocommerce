(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.TOOLTIP_MARGIN_OFFSET=void 0;const TOOLTIP_MARGIN_OFFSET=10;exports.TOOLTIP_MARGIN_OFFSET=10;
},{}],2:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.tooltipDefaults=void 0;const tooltipDefaults={settings_slideshowTime:"5",settings_autoHeight:"on",settings_skin:"skin-default",settings_close_other_tooltips:"off",settings_disable_include_in_tt_array:"off",settings_show_active_in_parent:"off"};exports.tooltipDefaults=tooltipDefaults;
},{}],3:[function(require,module,exports){
"use strict";

var _tooltip_defaultSettings = require("./config/_tooltip_defaultSettings");

var _view_tooltipResize = require("./js_inc/view_tooltipResize");

var dzstlt_arr_tooltips = [];

class DzsTooltip {
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

  initTooltip() {
    const o = this.o;
    const $ = this.$;
    const selfTooltip = this;
    var cthis = jQuery(this.argThis),
        cchildren = cthis.children(),
        cclass = '';
    ;
    var foundArrow, found_align;
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
        foundTAlign = found_align[0];
      } else {
        foundTAlign = 'talign-start';
      }

      selfTooltip._tooltip.data('original-talign', foundTAlign);

      selfTooltip.original_align = foundTAlign;
      let found_arrow = reg_arrow.exec(cclass);
      let foundArrow = '';

      if (found_arrow && found_arrow[0]) {
        foundArrow = found_arrow[0];
      } else {
        foundArrow = 'arrow-left';
      }

      selfTooltip._tooltip.data('original-arrow', foundArrow);

      selfTooltip.original_arrow = foundArrow; // -- check structure

      if (selfTooltip._tooltip.children('.dzstooltip--inner').length === 0) {
        selfTooltip._tooltip.wrapInner('<span class="dzstooltip--inner"></span>');
      }

      if (cthis.find('.tooltip-indicator').length === 0) {
        jQuery(cthis.children().eq(0).get(0).previousSibling).wrap('<span class="tooltip-indicator"></span>');
      } // -- check structure END


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
      (0, _view_tooltipResize.calculate_dims)(selfTooltip, {
        checkX: false
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
      (0, _view_tooltipResize.calculate_dims)(selfTooltip);
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
    o = $.extend({ ..._tooltip_defaultSettings.tooltipDefaults
    }, o);
    this.each(function () {
      return new DzsTooltip(this, o, $);
    });
  };

  window.dzstt_init = function (arg, optargs) {
    $(arg).dzstooltip(optargs);
  };
})(jQuery);

if (typeof jQuery != 'undefined') {
  jQuery(document).ready(function ($) {
    var defsettings = {};

    if (window.dzstlt_init_settings) {
      defsettings = window.dzstlt_init_settings;
    }

    dzstt_init('.dzstooltip-con.js', defsettings);
  });
} else {
  alert('dzstooltip.js - this plugin is based on jQuery -> please include jQuery');
}

},{"./config/_tooltip_defaultSettings":2,"./js_inc/view_tooltipResize":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculate_dims = calculate_dims;

var _tooltip_constants = require("../config/_tooltip_constants");

let inter_calculate_dims_light;
/**
 *
 * @param {DzsTooltip} selfTooltip
 * @param pargs
 */

function calculate_dims(selfTooltip, pargs) {
  let margs = {
    checkX: true,
    checkY: true
  };

  if (pargs) {
    margs = jQuery.extend(margs, pargs);
  }

  selfTooltip.windowWidth = document.querySelector('body').clientWidth;
  selfTooltip.windowHeight = window.innerHeight;

  if (margs.checkX) {
    selfTooltip._tooltip.css('max-width', '');

    selfTooltip._tooltip.removeClass('arrow-left arrow-right  talign-start talign-center talign-end');

    selfTooltip._tooltip.addClass(selfTooltip.original_align);

    if (selfTooltip.original_arrow === 'arrow-left' || selfTooltip.original_arrow === 'arrow-right') {
      selfTooltip._tooltip.addClass(selfTooltip.original_arrow);
    }
  }

  if (margs.checkY) {
    selfTooltip._tooltip.removeClass('arrow-top arrow-bottom');

    selfTooltip._tooltip.addClass(selfTooltip.original_arrow);

    if (selfTooltip.original_arrow === 'arrow-top' || selfTooltip.original_arrow === 'arrow-bottom') {
      selfTooltip._tooltip.addClass(selfTooltip.original_arrow);
    }
  }

  if (inter_calculate_dims_light) {
    clearTimeout(inter_calculate_dims_light);
  }

  inter_calculate_dims_light = setTimeout(function () {}, 0);
  calculate_dims_light(selfTooltip, margs);
}
/**
 *
 * @param {DzsTooltip} selfTooltip
 * @param {"talign"|"arrow"} classStrategy
 */


function calculateDimsEvaluateHorizontal(selfTooltip, classStrategy = 'talign') {
  selfTooltip.indicatorOffsetLeft = selfTooltip.cthis.offset().left;
  selfTooltip.tooltipOffsetLeft = selfTooltip._tooltip.offset().left;
  selfTooltip.tooltipWidth = selfTooltip._tooltip.outerWidth();
  const {
    indicatorOffsetLeft,
    tooltipOffsetLeft,
    tooltipWidth
  } = selfTooltip;
  let offsetLeft = 0;
  let offsetRight = 0;

  if (tooltipOffsetLeft + tooltipWidth > selfTooltip.windowWidth - _tooltip_constants.TOOLTIP_MARGIN_OFFSET) {
    offsetRight = Math.abs(selfTooltip.windowWidth - _tooltip_constants.TOOLTIP_MARGIN_OFFSET - (tooltipOffsetLeft + tooltipWidth));
  }

  if (tooltipOffsetLeft < _tooltip_constants.TOOLTIP_MARGIN_OFFSET) {
    offsetLeft = _tooltip_constants.TOOLTIP_MARGIN_OFFSET - tooltipOffsetLeft;
  }

  let indicatorPositionInDocument = 'left';

  if (indicatorOffsetLeft > selfTooltip.windowWidth / 2) {
    indicatorPositionInDocument = 'right';
  }

  let maxWidth;
  let finalTAlignClass = '';
  let finalArrowClass = '';
  console.log({
    offsetLeft,
    offsetRight,
    indicatorPositionInDocument
  });

  if (offsetLeft > 0 || offsetRight > 0) {
    if (classStrategy === 'talign') {
      selfTooltip._tooltip.removeClass('talign-center talign-start talign-end');
    }

    if (classStrategy === 'arrow') {
      selfTooltip._tooltip.removeClass('arrow-left arrow-right');
    }

    if (indicatorPositionInDocument === 'right') {
      finalTAlignClass = 'talign-end';
      finalArrowClass = 'arrow-right';
    }

    if (indicatorPositionInDocument === 'left') {
      finalTAlignClass = 'talign-start';
      finalArrowClass = 'arrow-left';
    }
  }

  if (offsetRight > 0) {
    console.log('selfTooltip._tooltip - ', classStrategy, selfTooltip._tooltip.get(0).classList);

    if (Math.abs(selfTooltip.indicatorOffsetLeft + tooltipWidth / 2 - selfTooltip.windowWidth) < _tooltip_constants.TOOLTIP_MARGIN_OFFSET) {
      finalTAlignClass = 'talign-center';
    }
  }

  if (offsetLeft > 0) {
    if (selfTooltip.indicatorOffsetLeft - tooltipWidth / 2 > 0) {
      finalTAlignClass = 'talign-center';
    }
  } // -- mobile ovewflow


  if (finalTAlignClass === 'talign-end' || finalArrowClass === 'arrow-right') {
    if (tooltipWidth > indicatorOffsetLeft) {
      maxWidth = selfTooltip.windowWidth - (selfTooltip.windowWidth - indicatorOffsetLeft);
    }
  }

  if (finalTAlignClass === 'talign-start' || finalArrowClass === 'arrow-left') {
    if (indicatorOffsetLeft + tooltipWidth > selfTooltip.windowWidth) {
      maxWidth = selfTooltip.windowWidth - indicatorOffsetLeft - _tooltip_constants.TOOLTIP_MARGIN_OFFSET;
    }
  }

  console.log('selfTooltip._tooltip - ', classStrategy, selfTooltip._tooltip.get(0).classList);

  if (classStrategy === 'talign') {
    selfTooltip._tooltip.addClass(finalTAlignClass);
  }

  if (classStrategy === 'arrow') {
    selfTooltip._tooltip.addClass(finalArrowClass);
  }

  if (maxWidth) {
    selfTooltip._tooltip.css('max-width', maxWidth);
  }
}

function calculate_dims_light(selfTooltip, calculateDimsSettings) {
  const cthis = selfTooltip.cthis;
  let maxWidth = null;
  selfTooltip.tooltipOffsetTop = selfTooltip._tooltip.offset().top;
  selfTooltip.spaceInContainerTop = cthis.parent().offset().top - selfTooltip.tooltipOffsetTop;

  if (selfTooltip._tooltip && selfTooltip._tooltip.offset()) {}

  if (selfTooltip._tooltip.hasClass('arrow-top') || selfTooltip._tooltip.hasClass('arrow-bottom')) {
    if (calculateDimsSettings.checkX) {
      calculateDimsEvaluateHorizontal(selfTooltip, 'talign');
    }

    if (calculateDimsSettings.checkY) {
      if (selfTooltip._tooltip.hasClass('arrow-bottom')) {
        selfTooltip.windowScrollTop = window.pageYOffset;

        if (selfTooltip.windowScrollTop > selfTooltip.tooltipOffsetTop) {
          selfTooltip._tooltip.addClass('arrow-top');

          selfTooltip._tooltip.removeClass('arrow-bottom');
        }
      }
    }
  } else {
    // -- arrow-left or arrow-right
    if (calculateDimsSettings.checkX) {
      calculateDimsEvaluateHorizontal(selfTooltip, 'arrow');
    }
  }
}

},{"../config/_tooltip_constants":1}]},{},[3])


//# sourceMappingURL=dzstooltip.js.map