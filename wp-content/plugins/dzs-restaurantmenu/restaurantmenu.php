<?php
/*
  Plugin Name: DZS Restaurant Menu
  Plugin URI: http://digitalzoomstudio.net/
  Description: Creates awesome and creative restaurant menus.
  Version: 1.20
  Author: Digital Zoom Studio
  Author URI: http://digitalzoomstudio.net/
 */




define('DZSRST_PATH', plugin_dir_path( __FILE__) . '/');
define('DZSRST_URL', plugins_url('', __FILE__) . '/');
const DZSRST_VERSION = '1.20';


require_once('dzs_functions.php');
require_once('class-dzsrst.php');


$dzsrst = new DZSRestaurantMenu();


if (function_exists('dzsrst_handle_activated_plugin') == false) {
  function dzsrst_handle_activated_plugin($plugin = '') {
    $isRedirect = false;
    if ($plugin == plugin_basename(__FILE__)) {

      if (get_option('dzsrst_shown_intro')) {
      } else {
        $isRedirect = true;
      }
    }
    if (defined('DZSRST_PREVIEW') && DZSRST_PREVIEW == 'YES') {

      $isRedirect = true;
    }


    if ($isRedirect) {

    }


  }
}


add_action('activated_plugin', 'dzsrst_handle_activated_plugin');
register_activation_hook(__FILE__, array($dzsrst, 'handle_plugin_activate'));
register_deactivation_hook(__FILE__, array($dzsrst, 'handle_plugin_deactivate'));