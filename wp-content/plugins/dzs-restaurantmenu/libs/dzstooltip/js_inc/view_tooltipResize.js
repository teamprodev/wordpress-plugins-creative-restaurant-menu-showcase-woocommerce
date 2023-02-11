import {TOOLTIP_MARGIN_OFFSET} from "../config/_tooltip_constants";

let inter_calculate_dims_light;

/**
 *
 * @param {DzsTooltip} selfTooltip
 * @param pargs
 */
export function calculate_dims(selfTooltip, pargs) {


  let margs = {
    checkX: true,
    checkY: true,
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

  inter_calculate_dims_light = setTimeout(function () {
  }, 0);
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

  const {indicatorOffsetLeft, tooltipOffsetLeft, tooltipWidth} = selfTooltip;

  let offsetLeft = 0;
  let offsetRight = 0;

  if (tooltipOffsetLeft + tooltipWidth > selfTooltip.windowWidth - TOOLTIP_MARGIN_OFFSET) {
    offsetRight = Math.abs(selfTooltip.windowWidth - TOOLTIP_MARGIN_OFFSET - (tooltipOffsetLeft + tooltipWidth));
  }

  if (tooltipOffsetLeft < TOOLTIP_MARGIN_OFFSET) {

    offsetLeft = TOOLTIP_MARGIN_OFFSET - tooltipOffsetLeft;
  }

  let indicatorPositionInDocument = 'left';

  if (indicatorOffsetLeft > selfTooltip.windowWidth / 2) {
    indicatorPositionInDocument = 'right';
  }


  let maxWidth;
  let finalTAlignClass = '';
  let finalArrowClass = '';



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



    if (Math.abs(selfTooltip.indicatorOffsetLeft + tooltipWidth / 2 - selfTooltip.windowWidth) < TOOLTIP_MARGIN_OFFSET) {
      finalTAlignClass = ('talign-center');
    }
  }
  if (offsetLeft > 0) {



    if (selfTooltip.indicatorOffsetLeft - (tooltipWidth / 2) > 0) {

      finalTAlignClass = ('talign-center');
    }
  }

  // -- mobile ovewflow
  if (finalTAlignClass === 'talign-end' || finalArrowClass === 'arrow-right') {
    if (tooltipWidth > indicatorOffsetLeft) {
      maxWidth = selfTooltip.windowWidth - (selfTooltip.windowWidth - indicatorOffsetLeft);
    }
  }
  if (finalTAlignClass === 'talign-start' || finalArrowClass === 'arrow-left') {
    if (indicatorOffsetLeft + tooltipWidth > selfTooltip.windowWidth) {
      maxWidth = selfTooltip.windowWidth - indicatorOffsetLeft - TOOLTIP_MARGIN_OFFSET;
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

  if (selfTooltip._tooltip && selfTooltip._tooltip.offset()) {
  }
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

