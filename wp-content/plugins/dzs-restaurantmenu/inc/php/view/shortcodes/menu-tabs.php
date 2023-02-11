<?php


function dzsrst_view_menuMain_tabs(array $shortcodeAttributes, ?array $restaurantItemsTerms, array $its, DZSRestaurantMenu $dzsrst): string {


  $fout = '';


  $fout .= '<div class="dzs-tabs auto-init ' . $shortcodeAttributes['mode_tabs_skin'] . ' ' . $shortcodeAttributes['extra_classes'] . ' tabs-menu-align-center dzs-tabs0 " data-options=\'{"design_tabsposition" :"top"
,design_transition:"slide"
,design_tabswidth:"default"
,design_tabsposition:"top"';

  if ($shortcodeAttributes['mode_tabs_is_always_accordion'] == 'on') {
    $fout .= ',toggle_breakpoint :"5000"';
  } else {
    $fout .= ',toggle_breakpoint :"'.$shortcodeAttributes['mode_tabs__accordion_breakpoint'].'"';
  }

  $fout .= '
,settings_appendWholeContent: true
,settings_startTab:"0"
,toggle_type:"accordion"
,"call_from":"' . $shortcodeAttributes['call_from'] . '"
}\'>';


  $i24 = 0;


  foreach ($restaurantItemsTerms as $term_id => $term_name) {


    $icon = 'clock-o';


    $term_meta = get_option("taxonomy_$term_id");


    if (isset($term_meta['icon']) && $term_meta['icon']) {
      $icon = $term_meta['icon'];
    }


    $fout .= '<div class="dzs-tab-tobe">
                    <div class="tab-menu with-tooltip">';

    if ($icon != 'none') {
      $fout .= '<i class="fa fa-' . $icon . '"></i> ';
    }
    $fout .= '<span class="the-label">' . $term_name['name'] . '</span>';


    $fout .= '
                    </div>
                    <div class="tab-content">';

    $args = array_merge(array(), $shortcodeAttributes);

    $args['mode'] = 'default';
    $args['cats'] = $term_id;
    $args['term_id'] = $term_id;


    if ($shortcodeAttributes['count'] == -1 && ($shortcodeAttributes['mode_tabs_aligment'] == 'two-columns' || $shortcodeAttributes['mode_tabs_aligment'] == 'two-column')) {
      $args['count'] = ceil(count($its) / 2);
    }
    $args['paged'] = '1';


    if ($shortcodeAttributes['mode_tabs_skin'] == 'skin-box skin-box-alternate') {

      $mediaImageId = '';

      if (isset($term_meta['media_image']) && $term_meta['media_image']) {
        $mediaImageId = $term_meta['media_image'];
      }

      $fout .= '<div class="bg-pattern " style="background-image: url(http://i.imgur.com/nGqbAAv.png)">
                            <div class="gradient-pattern-over"></div>
                        </div>
                        <div class="container-absolute">

                            <div class="divimage-align-right-bottom" style="background-image: url(' . $mediaImageId . ')"></div>
                        </div>';
    }


    $subtitle = '';
    if (isset($term_meta['subtitle'])) {
      $subtitle = $term_meta['subtitle'];
    }

    $fout .= '   <div class="position-relative">
                            <div class="dzs-container">
                                <div class="subtitle-handwritten">' . $subtitle . '</div>
                                <div class="dzsrst-category-title">' . $term_name['name'] . '</div>
                                <div class="dzs-row">';


    $args['call_from'] = 'tabs';


    if ($shortcodeAttributes['mode_tabs_aligment'] == 'two-columns' || $shortcodeAttributes['mode_tabs_aligment'] == 'two-column') {

      $fout .= '   <div class="dzs-col-md-4">';


      $fout .= $dzsrst->shortcode_main($args);


      $fout .= '</div>    <div class="dzs-col-md-4">';


      $args2 = array_merge(array(), $args);
      $args2['paged'] = '2';

      $fout .= $dzsrst->shortcode_main($args2);


      $fout .= '</div>';
    }


    if ($shortcodeAttributes['mode_tabs_aligment'] == 'one-column') {

      $fout .= '   <div class="dzs-col-md-12">';


      $args2 = array_merge(array(), $args);
      $args2['posts_per_page'] = '-1';
      $fout .= $dzsrst->shortcode_main($args2);

      $fout .= '</div>';
    }


    $fout .= '</div>';
    $fout .= '</div>';
    $fout .= '</div>';


    $fout .= '
                    </div>
                </div>';
    $i24++;
  }


  $fout .= '</div>';


  return $fout;
}