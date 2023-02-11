<?php


class DzsrstHelpers {

  public static function view_embedScript($scriptType){


    $pluginDirUrl = DZSRST_URL . 'libs/zfolio/';

    if(defined('DZSRST_DEBUG_LOCAL_SCRIPTS') && DZSRST_DEBUG_LOCAL_SCRIPTS){
      $pluginDirUrl = 'http://devsite/zfolio/source/zfolio/';
    }
    wp_enqueue_style('dzszfl', $pluginDirUrl . 'zfolio.css');
    wp_enqueue_script('dzszfl', $pluginDirUrl . 'zfolio.js', array('jquery'), DZSRST_VERSION);

    wp_enqueue_script('dzsrst.isotope', $pluginDirUrl . 'jquery.isotope.min.js');
    wp_enqueue_script('dzsrst.isotope.packery', $pluginDirUrl . 'packery-mode.pkgd.min.js');
  }
  public static function view_embedMainScripts(){

    $pluginDirUrl = DZSRST_URL . 'restaurantmenu/';

    if(defined('DZSRST_DEBUG_LOCAL_SCRIPTS') && DZSRST_DEBUG_LOCAL_SCRIPTS){
      $pluginDirUrl = 'http://devsite/restaurantmenu/source/restaurantmenu/';
    }

    wp_enqueue_style('dzsrst', $pluginDirUrl . 'restaurantmenu.css');
    wp_enqueue_script('dzsrst', $pluginDirUrl . 'restaurantmenu.js', array('jquery'), DZSRST_VERSION);
  }
}