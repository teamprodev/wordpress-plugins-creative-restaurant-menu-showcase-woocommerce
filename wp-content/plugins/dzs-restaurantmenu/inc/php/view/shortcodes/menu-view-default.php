<?php

function dzsrst_view_menuMain_view_default(array $shortcodeAttributes, string $restaurant_menu_mode, array $its, DZSRestaurantMenu $dzsrst): string {


  $fout = '';





  $sanitized_item_skin = $shortcodeAttributes['item_skin'];

  // -- make sure class is rst-menu-item-skin-
  if (strpos($sanitized_item_skin, 'skin-') !== false) {
    $sanitized_item_skin = str_replace($shortcodeAttributes['item_skin'], 'item-', 'item-skin-');
  }


  // -- the main con
  $fout .= '<div class="rst-menu-main-con ' . $shortcodeAttributes['item_skin'] . ' ' . $sanitized_item_skin;


  if ($shortcodeAttributes['item_skin'] == 'rst-menu-item-skin-piadina') {
    $fout .= ' dzs-layout--3-cols';
  }

  $fout .= ' ' . $shortcodeAttributes['theme'] . ' auto-init" data-options=\'{
settings_mode: "' . $restaurant_menu_mode . '"
,item_link_thumb_con_to: "' . $shortcodeAttributes['item_link_thumb_con_to'] . '"
,item_link_info_to: "' . $shortcodeAttributes['item_link_info_to'] . '"';

  $fout .= ',"call_from":"' . $shortcodeAttributes['call_from'] . '"';
  if ($shortcodeAttributes['layout']) {
    $fout .= ',layout: "' . $shortcodeAttributes['layout'] . '"';
  }

  $fout .= '}\'>';

  $fout .= '<div class="items">';



  $iout = '';

  $iout = $dzsrst->parse_items($its, $shortcodeAttributes);


  $fout .= $iout;

  if ($shortcodeAttributes['return_only_items'] == 'on') {
    return $iout;
  }

  $fout .= '</div>'; // -- end items


  $fout .= '</div>';

  return $fout;
}