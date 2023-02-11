<?php


function dzsrst_view_menuMain_parallaxer(array $shortcodeAttributes, ?array $restaurantItemsTerms, array $its, DZSRestaurantMenu $dzsrst): string {


  $fout = '';


  $fout .= '<div class="dzsrst-shortcode dzsrst--mode-' . $shortcodeAttributes['mode'] . ' dzs-row dzs-row-inline">';


  $i24 = 0;
  foreach ($restaurantItemsTerms as $term_id => $term_name) {


    $args = array_merge(array(), $shortcodeAttributes);
    $args['mode'] = 'default';
    $args['cats'] = $term_id;
    $term_meta = get_option("taxonomy_$term_id");

    $mediaImageId = '';
    $mediaImageSrc = '';


    if (isset($term_meta['media_image'])) {
      $mediaImageSrc = $dzsrst->sanitize_id_to_src($term_meta['media_image']);
    }


    $mediaImageHalfHtml = '<div class="dzs-col-md-6 dzsparallaxer auto-init"  data-options=\'
{ settings_mode: "oneelement"
,direction:"reverse"
,settings_mode_oneelement_max_offset: "120"
}\'>
                            <img src="' . $mediaImageSrc . '" class="fullwidth"  style="max-width: 90vw; width: 120%;" alt=""/>
                        </div>';

    $shortcodeHalfHtml = '<div  class="dzsparallaxer dzsrst--mode-parallaxer--shortcode-half auto-init dzs-col-md-6 white-white-box"  data-options=\'
{ settings_mode: "oneelement"
,direction:"reverse"
,settings_mode_oneelement_max_offset: "180"
}\' style="">';


    $shortcodeHalfHtml .= $dzsrst->shortcode_main($args);


    $shortcodeHalfHtml .= '</div>';


    if (isset($shortcodeAttributes['mode_parallaxer__order']) && $shortcodeAttributes['mode_parallaxer__order'] == 'menu_first') {

      $fout .= $shortcodeHalfHtml;
      $fout .= $mediaImageHalfHtml;
    } else {

      $fout .= $mediaImageHalfHtml;
      $fout .= $shortcodeHalfHtml;
    }


    $i24++;
    break;
  }


  $fout .= '</div>';


  wp_enqueue_style('dzs.parallaxer', DZSRST_URL . 'libs/dzsparallaxer/dzsparallaxer.css');
  wp_enqueue_script('dzs.parallaxer', DZSRST_URL . 'libs/dzsparallaxer/dzsparallaxer.js');


  return $fout;


  return $fout;
}