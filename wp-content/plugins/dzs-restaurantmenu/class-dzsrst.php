<?php
include_once DZSRST_PATH . 'inc/php/DzsrstHelpers.php';
include_once DZSRST_PATH . 'inc/php/view/shortcodes/menu-tabs.php';
include_once DZSRST_PATH . 'inc/php/view/shortcodes/menu-parallaxer.php';
include_once DZSRST_PATH . 'inc/php/view/shortcodes/menu-view-default.php';

class DZSRestaurantMenu {

  public $base_url = '';


  private $frontend_errors = array();
  private $the_shortcode = 'restaurantmenu';

  public $db_mainoptions = array();
  public $db_mainoptions_default = array();
  public $plugin_justactivated = 'off';
  public $dbname_layouts = 'dzsrst_items';
  public $dbname_mainoptions = 'dzsrst_mainoptions';
  private $dbname_sample_data = 'dzsap_sample_data';

  public $pagename_mainoptions = 'dzsrst_mainoptions';

  private $pluginmode = 'plugin';
  private $include_settings = 'off';
  private $layout_index = 0;
  private $enable_scrollbar = 'off';

  private $capability_admin = 'publish_posts';
  private $term_metas = array();


  public $sample_data = array();

  function __construct() {


    $this->base_url = plugins_url('', __FILE__) . '/';

    $this->db_mainoptions_default = array(
      'always_embed' => 'off',
      'capabilities_added' => 'off',
      'embed_fonts' => 'on',
      'currency_sign' => '',
      'extra_css' => '',
      'categories_rewrite' => 'restaurant_item_category',
      'tags_rewrite' => 'restaurant_item_tag',
    );

    $this->db_mainoptions = get_option($this->dbname_mainoptions);

    if ($this->db_mainoptions == '') {
      $this->db_mainoptions = $this->db_mainoptions_default;
    } else {

      if (is_array($this->db_mainoptions)) {

        $this->db_mainoptions = array_merge($this->db_mainoptions_default, $this->db_mainoptions);
      }
    }

    $this->sample_data = get_option($this->dbname_sample_data);




    $this->term_metas = array(
      array(
        'name' => 'icon',
        'title' => __('Icon'),
        'description' => __('A icon you can use for the '),
        'type' => 'media-upload',
      ),
      array(
        'name' => 'media_image',
        'title' => __('Media Image'),
        'description' => __('A icon you can use for the '),
        'type' => 'media-upload',
      ),
      array(
        'name' => 'subtitle',
        'title' => __('Subtitle'),
        'description' => __('A subtitle of the meta'),
        'type' => 'input',
      ),
      array(
        'name' => 'color',
        'title' => __('Tag Color'),
        'description' => __('for tag color '),
        'type' => 'color',
      ),
    );

    $this->check_posts();


    add_action('wp_ajax_dzs_get_attachment_src', array($this, 'ajax_get_attachment_src'));
    add_action('wp_ajax_dzsrst_install_sample_data', array($this, 'ajax_install_sample_data'));
    add_action('wp_ajax_dzsrst_remove_sample_data', array($this, 'ajax_remove_sample_data'));
    add_action('wp_ajax_dzsrst_get_term_cats', array($this, 'ajax_get_term_cats'));
    if (isset($_POST['action']) && $_POST['action'] == 'dzsrst_ajax_save_mo') {
      $this->ajax_save_mainoptions();
    }
    if (isset($_POST['action']) && $_POST['action'] == 'dzsrst_ajax_hide_notice') {
      update_option($_POST['postdata'], 'seen');
      die();
    }

    add_action('init', array($this, 'handle_init'));
    add_action('init', array($this, 'handle_init_end'), 9999);
    add_action('wp_loaded', array($this, 'handle_wp_loaded'));
    add_action('admin_menu', array($this, 'handle_admin_menu'));
    add_action('admin_init', array($this, 'handle_admin_init'));
    add_action('admin_head', array($this, 'handle_admin_head'));
    add_action('wp_head', array($this, 'handle_wp_head'));
    add_action('wp_footer', array($this, 'handle_wp_footer'));
    add_action('admin_menu', array($this, 'handle_admin_menu'));

    add_shortcode($this->the_shortcode, array($this, 'shortcode_main'));
    add_shortcode('dzs_' . $this->the_shortcode, array($this, 'shortcode_main'));
    add_shortcode($this->the_shortcode . '_header', array($this, 'shortcode_header'));
    add_shortcode('dzsrst_custom_content', array($this, 'shortcode_custom_content'));


    add_action('save_post', array($this, 'admin_meta_save'));
  }

  function ajax_save_mainoptions() {


    $auxarray = array();
    //parsing post data
    parse_str($_POST['postdata'], $auxarray);


    $auxarray = array_merge($this->db_mainoptions, $auxarray);

    update_option($this->dbname_mainoptions, $auxarray);
    die();
  }

  function handle_admin_init() {

    add_meta_box('dzsrst_meta_options', __('Restaurant Menu Item'), array($this, 'dzsrst_admin_meta_options'), 'dzsrst_items', 'normal');
    add_meta_box('dzsrst_meta_options', __('Restaurant Menu Item'), array($this, 'dzsrst_admin_meta_options'), 'product', 'normal');
    add_settings_section('dzsrst-permalink', __('Video Items Permalink Base', 'dzsrst'), array($this, 'permalink_settings'), 'permalink');
    add_action('vc_frontend_editor_render', array($this, 'vc_enqueue_editor_scripts_befe'));


    if ($this->db_mainoptions['capabilities_added'] == 'off') {

      $role = get_role('administrator');

      // This only works, because it accesses the class instance.
      // would allow the author to edit others' posts for current theme only
      $role->add_cap('dzsrst_make_shortcode');


      $this->db_mainoptions['capabilities_added'] = 'on';
      update_option($this->dbname_mainoptions, $this->db_mainoptions);


    }



  }

  function vc_enqueue_editor_scripts_befe() {


    wp_enqueue_style('dzsrst', $this->base_url . 'restaurantmenu/restaurantmenu.css');
    wp_enqueue_script('dzsrst', $this->base_url . 'restaurantmenu/restaurantmenu.js');


    wp_enqueue_style('dzstaa', $this->base_url . 'libs/dzstabsandaccordions/dzstabsandaccordions.css');
    wp_enqueue_script('dzstaa', $this->base_url . 'libs/dzstabsandaccordions/dzstabsandaccordions.js');


    wp_enqueue_style('dzsprx', $this->base_url . 'libs/dzsparallaxer/dzsparallaxer.css');
    wp_enqueue_script('dzsprx', $this->base_url . 'libs/dzsparallaxer/dzsparallaxer.js');
  }


  function ajax_install_sample_data() {
    include_once('class_parts/install_sample_data.php');

    die();
  }

  function ajax_get_term_cats() {

    $taxonomy_name = 'dzsrst_items_cat';

    if ($_POST['post_type'] == 'product') {
      $taxonomy_name = 'product_cat';
    }


    $terms = get_terms($taxonomy_name, array(
      'hide_empty' => false,
    ));

    $lab = "term_id";



    $arr_opts = array();
    foreach ($terms as $tm) {


      if ($tm && isset($tm->name)) {

        $aux = array(
          'label' => $tm->name,
          'value' => $tm->slug,
        );
        array_push($arr_opts, $aux);
      } else {
        error_log('invalid - ' . print_r($terms, true) . ' $taxonomy_name - ' . $taxonomy_name);
      }

    }


    echo json_encode($arr_opts);
    die();

  }

  function ajax_remove_sample_data() {

    $demo_data = get_option($this->dbname_sample_data);



    foreach ($demo_data['posts'] as $pid) {
      wp_delete_post($pid);
    };

    foreach ($demo_data['cats'] as $categ_ID) {
      wp_delete_term($categ_ID, 'dzsrst_items_cat');
    };

    delete_option($this->dbname_sample_data);


    die();
  }


  function dzsrst_admin_meta_options() {


    include_once('class_parts/item-meta.php');
  }

  function ajax_get_attachment_src() {

    $fout = wp_get_attachment_image_src($_POST['id'], 'full');

    echo $fout[0];
    die();
  }

  function admin_meta_save($post_id) {

    global $post;
    if (!$post) {
      return;
    }
    if (isset($post->post_type) && !($post->post_type == 'dzsrst_items')) {
//            return $post_id;
    }
    /* Check autosave */
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
      return $post_id;
    }
//        if (isset($_REQUEST['dzsvp_nonce'])) {
//            $nonce = $_REQUEST['dzsvp_nonce'];
//            if (!wp_verify_nonce($nonce, 'dzsvp_nonce')) {
//                wp_die('Security check');
//            }
//        }
    if (is_array($_POST)) {
      $auxa = $_POST;
      foreach ($auxa as $label => $value) {

        //print_r($label); print_r($value);
        if (strpos($label, 'dzsrst_meta_item_') !== false) {
          dzs_savemeta($post_id, $label, $value, 'html');
        }
      }
    }
  }


  function handle_init() {

    wp_enqueue_script('jquery');
    if (is_admin()) {


      wp_enqueue_style('dzsrst.admin-global', $this->base_url . 'admin/admin_global.css');
      wp_enqueue_script('dzsrst.admin-global', $this->base_url . 'admin/admin_global.js');

      if (isset($_GET['taxonomy'])) {

        if ($_GET['taxonomy']) {

          wp_enqueue_media();
        }

      }
      if (isset($_GET['page']) && $_GET['page'] == $this->pagename_mainoptions) {
        wp_enqueue_style('dzsrst_admin', $this->base_url . 'admin/admin-mo.css');
        wp_enqueue_script('dzsrst_admin', $this->base_url . "admin/admin-mo.js");
        wp_enqueue_style('dzs.checkbox', $this->base_url . 'libs/dzscheckbox/dzscheckbox.css');
        wp_enqueue_script('jquery-ui-core');
        wp_enqueue_script('jquery-ui-sortable');


        wp_enqueue_style('fontawesome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.0/css/font-awesome.min.css');


//                wp_enqueue_style('dzstabsandaccordions', $this->thepath . 'assets/dzstabsandaccordions/dzstabsandaccordions.css');
//                wp_enqueue_script('dzstabsandaccordions', $this->thepath . "assets/dzstabsandaccordions/dzstabsandaccordions.js");
//
//
//                wp_enqueue_style('dzs.dzscheckbox', $this->thepath . 'assets/dzscheckbox/dzscheckbox.css');
//
//
        wp_enqueue_style('dzs.dzstoggle', $this->base_url . 'libs/dzstoggle/dzstoggle.css');
        wp_enqueue_script('dzs.dzstoggle', $this->base_url . 'libs/dzstoggle/dzstoggle.js');

        wp_enqueue_style('dzstabsandaccordions', $this->base_url . 'libs/dzstabsandaccordions/dzstabsandaccordions.css');
        wp_enqueue_script('dzstabsandaccordions', $this->base_url . "libs/dzstabsandaccordions/dzstabsandaccordions.js");

        if (isset($_GET['dzsrst_shortcode_generator']) && $_GET['dzsrst_shortcode_generator'] == 'on') {

          wp_enqueue_style('dzsrst_shortcode_builder', $this->base_url . 'shortcodegenerator/generator.css');
          wp_enqueue_script('dzsrst_shortcode_builder', $this->base_url . 'shortcodegenerator/generator.js');


          wp_enqueue_style('chosen', $this->base_url . 'libs/chosen/chosen.css');
          wp_enqueue_script('chosen', $this->base_url . 'libs/chosen/chosen.js');


          wp_enqueue_style('dzstlt', $this->base_url . 'libs/dzstooltip/dzstooltip.css');
          wp_enqueue_script('dzstlt', $this->base_url . 'libs/dzstooltip/dzstooltip.js');


          wp_enqueue_style('dzsselector', $this->base_url . 'libs/dzsselector/dzsselector.css');
          wp_enqueue_script('dzsselector', $this->base_url . 'libs/dzsselector/dzsselector.js');


        }
        if (isset($_GET['dzsrst_shortcode_generator_header']) && $_GET['dzsrst_shortcode_generator_header'] == 'on') {

          wp_enqueue_style('dzsrst_shortcode_builder', $this->base_url . 'shortcodegenerator/generator.css');
          wp_enqueue_script('dzsrst_shortcode_builder', $this->base_url . 'shortcodegenerator/generator_header.js');


          wp_enqueue_style('dzsselector', $this->base_url . 'libs/dzsselector/dzsselector.css');
          wp_enqueue_script('dzsselector', $this->base_url . 'libs/dzsselector/dzsselector.js');


        }


      }


      if (current_user_can('manage_options') || current_user_can('dzsrst_make_shortcode')) {

        wp_enqueue_script('dzsrst-add-generators', $this->base_url . 'shortcodegenerator/add-generators-to-mce.js');
        wp_enqueue_script('dzsrst-shortcode-receiver', $this->base_url . 'shortcodegenerator/shortcode-receiver.js');

      }


      if (current_user_can('edit_posts') || current_user_can('edit_pages')) {


        wp_enqueue_style('dzsulb', $this->base_url . 'libs/ultibox/ultibox.css');
        wp_enqueue_script('dzsulb', $this->base_url . 'libs/ultibox/ultibox.js');
      }

    } else {


    }


    $this->register_links();
    require_once("class_parts/options_array_menu.php");
    require_once("class_parts/options_array_header.php");


    include_once('vc/part-vcintegration.php');
  }


  public function handle_plugin_activate() {
    $this->plugin_justactivated = "on";
//        echo 'ceva';

//        error_log('activation_hook');

    error_log("JUST ACTIVATED DZSRST");

    if (get_option('dzsrst_shown_intro')) {

    } else {

    }

  }


  public function redirect_to_intro_page_func() {

  }

  public function handle_plugin_deactivate() {

    flush_rewrite_rules();
    error_log("JUST DEACTIVATED dzsrst");
  }


  function handle_init_end() {

    if (is_admin()) {

      include_once('assets/termreorder/dzs_term_reorder.php');

      $dzs_term_reorder = new Dzs_Term_Reorder(array('dzsrst_items'), array('dzsrst_items' => array(
        'dzsrst_items_cat'
      )), array('dzsrst_items_cat'), $this->base_url . 'assets/termreorder/');
    }
    if ($this->plugin_justactivated == 'on') {

      flush_rewrite_rules();
    }
  }


  function handle_wp_head() {


    if (isset($this->db_mainoptions['extra_css']) && $this->db_mainoptions['extra_css']) {
      echo '<style class="dzsrst-extra-css">';
      echo $this->db_mainoptions['extra_css'];
      echo '</style>';
    }


    if ($this->db_mainoptions['embed_fonts'] == 'on') {
      echo '<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,600,700,900" rel="stylesheet">';
    }


    ?>
    <script>
      var dzsrst_settings = {
        site_url: "<?php echo site_url(); ?>"
      };
    </script><?php

    ?>
    <style>
      <?php
      if($this->db_mainoptions['embed_fonts']=='on'){
          ?>

      <?php
      }
      ?>

    </style>
    <?php

  }

  function handle_wp_footer() {


  }


  function handle_admin_menu() {

//		add_options_page('Layouter Options', 'Layouter Options', $this->admin_cap, $this->pagename_main, array($this, 'page_mainoptions'));


    $admin_cap = $this->capability_admin;

    $dzsrst_page = add_menu_page(__('Restaurant Menu', 'dzsrst'), __('Restaurant Menu', 'dzsrst'), $admin_cap, $this->pagename_mainoptions, array($this, 'admin_page_mainoptions'), 'div');
    $dzsrst_subpage = add_submenu_page($this->pagename_mainoptions, __('Restaurant Menu Settings', 'dzsrst'), __('Settings', 'dzsrst'), $this->capability_admin, $this->pagename_mainoptions, array($this, 'admin_page_mainoptions'));

  }

  function admin_page_mainoptions() {

    if (isset($_GET['dzsrst_shortcode_generator']) && $_GET['dzsrst_shortcode_generator'] == 'on') {

      dzsrst_shortcode_generator();
    } else {

      if (isset($_GET['dzsrst_shortcode_generator_header']) && $_GET['dzsrst_shortcode_generator_header'] == 'on') {

        dzsrst_shortcode_generator_header();
      } else {

        include_once "class_parts/admin-page-mainoptions.php";
      }

    }
  }


  function handle_admin_head() {
    ?>
    <script>
      var dzsrst_settings = {
        translate_add_shortcode: "<?php echo __('Add Restaurant Menu'); ?>"
        ,
        translate_add_shortcode_header: "<?php echo __('Add Category Header'); ?>"
        ,
        shortcode_generator_url: "<?php echo admin_url('admin.php?page=' . $this->pagename_mainoptions); ?>&dzsrst_shortcode_generator=on"
        ,
        shortcode_generator_header_url: "<?php echo admin_url('admin.php?page=' . $this->pagename_mainoptions); ?>&dzsrst_shortcode_generator_header=on"
      };
    </script><?php
  }


  function check_posts() {

    if (isset($_GET['dzsrst_shortcode_generator']) && $_GET['dzsrst_shortcode_generator'] == 'on') {
//            dzsrst_shortcode_builder();

      include_once(dirname(__FILE__) . '/shortcodegenerator/generator.php');
      define('DONOTCACHEPAGE', true);
      define('DONOTMINIFY', true);

    }
    if (isset($_GET['dzsrst_shortcode_generator_header']) && $_GET['dzsrst_shortcode_generator_header'] == 'on') {
//            dzsrst_shortcode_builder();

      include_once(dirname(__FILE__) . '/shortcodegenerator/generator_header.php');
      define('DONOTCACHEPAGE', true);
      define('DONOTMINIFY', true);

    }
  }

  function check_posts_wp_loaded() {

    if (isset($_POST['action'])) {
//            dzsrst_shortcode_builder();

      if ($_POST['action'] == 'dzsrst_ajax_add_to_cart') {

        global $woocommerce;

//                echo 'ceva';

        $product_id = $_POST['product_id'];
        if ($woocommerce->cart->add_to_cart($product_id)) {
          $data = apply_filters('woocommerce_add_to_cart_fragments', array());
          do_action('woocommerce_ajax_added_to_cart', $product_id);
        } else {
          $data = array('success' => false, 'product_id' => $product_id);
        }

        print_r($woocommerce->cart);

        die();
      }

    }
  }

  function handle_wp_loaded() {
    $this->check_posts_wp_loaded();
  }

  function register_links() {


    register_taxonomy('dzsrst_items_cat', 'dzsrst_items', array('label' => __('Categories', 'dzsrst'), 'query_var' => true, 'show_ui' => true, 'hierarchical' => true, 'rewrite' => array('slug' => $this->db_mainoptions['categories_rewrite']),));
    register_taxonomy('dzsrst_items_tag', 'dzsrst_items', array('label' => __('Tags', 'dzsrst'), 'query_var' => true, 'show_ui' => true, 'hierarchical' => false, 'rewrite' => array('slug' => $this->db_mainoptions['tags_rewrite']),));

//        register_taxonomy('dzsrst_sliders', 'dzsrst_items', array('label' => __('Audio Galleries', 'dzsrst'), 'query_var' => true, 'show_ui' => true, 'hierarchical' => false, 'rewrite' => array('slug' => $this->mainoptions['dzsrst_sliders_rewrite']),));


//        add_action( 'dzsrst_items_cat_add_form_fields', array($this,'add_feature_group_field'), 10, 2 );
    add_action('dzsrst_items_cat_edit_form_fields', array($this, 'term_meta_fields'), 10, 10);
    add_action('product_cat_edit_form_fields', array($this, 'term_meta_fields'), 10, 10);


    add_action('dzsrst_items_tag_edit_form_fields', array($this, 'term_meta_fields'), 10, 10);


    add_action('edited_dzsrst_items_cat', array($this, 'save_taxonomy_custom_meta'), 10, 2);
    add_action('edited_product_cat', array($this, 'save_taxonomy_custom_meta'), 10, 2);
    add_action('edited_dzsrst_items_tag', array($this, 'save_taxonomy_custom_meta'), 10, 2);
//        add_action( 'create_dzsrst_items_cat', array($this,'save_taxonomy_custom_meta'), 10, 2 );

//        add_action( 'dzsrst_sliders_add_tag_form_fields', 'add_feature_group_field', 10, 2 );
//        add_action( 'dzsrst_sliders_add_form_fields', 'add_feature_group_field', 10, 2 );
//        add_action( 'dzsrst_sliders_edit_form_fields', 'add_feature_group_field', 10, 10 );

//        add_action( 'created_dzsrst_sliders', 'save_feature_meta', 10, 2 );
//        add_action( 'edited_dzsrst_sliders', 'save_feature_meta', 10, 2 );


    $labels = array('name' => 'Menu Items', 'singular_name' => 'Menu Item',);

    $permalinks = get_option('dzsrst_permalinks');
    //print_r($permalinks);

    $item_slug_permalink = empty($permalinks['item_base']) ? _x('menu_item', 'slug', 'dzsrst') : $permalinks['item_base'];


    $args = array('labels' => $labels, 'public' => true, 'has_archive' => true, 'hierarchical' => false, 'supports' => array('title', 'editor', 'author', 'thumbnail', 'post-thumbnail', 'comments', 'excerpt'), 'rewrite' => array('slug' => $item_slug_permalink), 'yarpp_support' => true, 'capabilities' => array(),//'taxonomies' => array('categoryportfolio'),
    );
    register_post_type('dzsrst_items', $args);
  }


  function term_meta_fields($term) {
    // this will add the custom meta field to the add new term page

    $struct_uploader = '<div class="dzs-wordpress-uploader insert-id">
<a href="#" class="button-secondary">' . __('Upload', 'dzsvp') . '</a>
</div>';

    foreach ($this->term_metas as $tem) {
      ?>

      <?php


      $t_id = $term->term_id;

      // retrieve the existing value(s) for this meta field. This returns an array
      $term_meta = get_option("taxonomy_$t_id"); ?>
      <tr class="form-field">
        <th scope="row" valign="top"><label
            for="term_meta[<?php echo $tem['name']; ?>]"><?php echo $tem['title']; ?></label></th>
        <td class="<?php
        if ($tem['type'] == 'media-upload') {
          echo 'setting-upload';
        }
        ?>">


          <?php

          if ($tem['type'] == 'media-upload') {
            echo '<span class="uploader-preview"></span>';
          }
          ?>



          <?php
          $lab = 'term_meta[' . $tem['name'] . ']';

          $val = '';

          if (isset($term_meta[$tem['name']])) {

            $val = esc_attr($term_meta[$tem['name']]) ? esc_attr($term_meta[$tem['name']]) : '';
          }

          $class = 'setting-field medium';


          if ($tem['type'] == 'media-upload') {
            $class .= ' uploader-target';
          }

          if ($tem['type'] == 'color') {
            $class .= ' wp-color-picker-init';
          }
          if ($tem['type'] == 'media-upload' || $tem['type'] == 'text' || $tem['type'] == 'input') {
          }


          echo DZSHelpers::generate_input_text($lab, array(
            'class' => $class,
            'seekval' => $val,
            'id' => $lab,
          ));

          if ($tem['type'] == 'color') {
//                DZSHelpers::generate_input_text($lab, array('val' => '', 'class' => 'wp-color-picker-init ', 'seekval' => $val));
          }

          if ($tem['type'] == 'media-upload') {
            echo $struct_uploader;
          }
          ?>
          <?php

          ?>
          <p class="description"><?php _e('Enter a value for this field', 'pippin'); ?></p>
        </td>
      </tr>
      <?php
    }
  }

  function save_taxonomy_custom_meta($term_id) {
    if (isset($_POST['term_meta'])) {
      $t_id = $term_id;
      $term_meta = get_option("taxonomy_$t_id");
      $cat_keys = array_keys($_POST['term_meta']);
      foreach ($cat_keys as $key) {
        if (isset ($_POST['term_meta'][$key])) {
          $term_meta[$key] = $_POST['term_meta'][$key];
        }
      }
      // Save the option array.
      update_option("taxonomy_$t_id", $term_meta);
    }
  }


  function shortcode_custom_content($pargs = array(), $content = null) {
    $fout = '';

//        $fout.='<div style="display:none">';
    if ($content) {

    }

//        $fout.='</div>';

    return $fout;
  }


  function sanitize_term_slug_to_id($arg) {

    $taxonomy_name = 'dzsrst_items_cat';
    if (is_numeric($arg)) {

    } else {

      $term = get_term_by('slug', $arg, $taxonomy_name);

      if ($term) {
        $arg = $term->term_id;
      }
//                    echo 'new term_id - '; print_r($term_id);
    }


    return $arg;
  }

  function shortcode_main($pargs = array(), $content = null) {

    $fout = '';

    $debug_mode = 'off';

    wp_enqueue_style('fontawesome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

    DzsrstHelpers::view_embedMainScripts();


    $shortcodeAttributes = array(
      'media' => '',
      'item_skin' => 'rst-menu-item-skin-default',
      'mode' => 'default',
      'mode_tabs_skin' => 'skin-box skin-box-alternate',
      'mode_tabs__accordion_breakpoint' => '500',
      'mode_tabs_is_always_accordion' => 'off',
      'call_from' => 'default',
      'total_height' => '600',
      'direction' => 'reverse',
      'enable_scrollbar' => 'off',
      'breakout' => 'off',
      'count' => 'default',
      'term_id' => '',
      'mother_term_id' => '', // -- the mother term id,used for sorting
      'item_link_thumb_con_to' => 'default',
      'item_link_info_to' => 'default',
      'item_link_title_to' => 'default',
      'mode_tabs_aligment' => 'two-columns',
      'post_type' => 'default',
      'post_type_product_show_quantity' => 'off',
      'taxonomy' => 'default',
      'paged' => '',
      'layout' => 'default',
      'theme' => '',
      'extra_classes' => '',
      'cats' => '', // -- input here some cats ids so only those cats get pulled
      'return_only_items' => 'off',
      'order' => '',
      'orderby' => '',
    );

    $shortcodeAttributes = array_merge($shortcodeAttributes, $pargs);


    if (isset($_GET['dzsrst_debug_mode']) && $_GET['dzsrst_debug_mode'] == 'on') {
      $debug_mode = $_GET['dzsrst_debug_mode'];
    }


    $restaurant_menu_mode = $shortcodeAttributes['mode'];


    if ($shortcodeAttributes['post_type'] == 'default') {
      $shortcodeAttributes['post_type'] = 'dzsrst_items';
    }

    $taxonomy_name = 'dzsrst_items_cat';
    if ($shortcodeAttributes['post_type'] == 'dzsrst_items') {
      if ($shortcodeAttributes['taxonomy'] == 'default') {
        $shortcodeAttributes['taxonomy'] = 'dzsrst_items_cat';
      }
    }


    if ($shortcodeAttributes['post_type'] == 'product') {
      if ($shortcodeAttributes['taxonomy'] == 'default') {
        $shortcodeAttributes['taxonomy'] = 'product_cat';
        $taxonomy_name = 'product_cat';
      }
    }

    if ($shortcodeAttributes['item_skin'] == 'rst-menu-item-skin-default') {

      if ($shortcodeAttributes['item_link_info_to'] == 'default') {
        $shortcodeAttributes['item_link_info_to'] = 'tooltip';
      }
    }


    if ($shortcodeAttributes['item_skin'] == 'rst-menu-item-skin-piadina') {
      $shortcodeAttributes['mode'] = 'blocks';
    }


    if ($shortcodeAttributes['post_type'] == 'product') {

      if (class_exists('WC_Product_Factory')) {

      } else {
        $shortcodeAttributes['post_type'] = 'dzsrst_items';
      }
    }

    if ($shortcodeAttributes['item_link_info_to'] == 'default') {
      $shortcodeAttributes['item_link_info_to'] = 'none';
    }
    if ($shortcodeAttributes['item_link_thumb_con_to'] == 'default') {
      $shortcodeAttributes['item_link_thumb_con_to'] = 'ultibox';
    }
    if ($shortcodeAttributes['item_link_title_to'] == 'default') {
      $shortcodeAttributes['item_link_title_to'] = 'direct_link';
    }
    if ($shortcodeAttributes['item_link_info_to'] == 'tooltip') {
      wp_enqueue_style('dzstlt', $this->base_url . 'libs/dzstooltip/dzstooltip.css');
      wp_enqueue_script('dzstlt', $this->base_url . 'libs/dzstooltip/dzstooltip.js');
    }
    if ($shortcodeAttributes['item_link_thumb_con_to'] == 'ultibox') {
      wp_enqueue_style('dzsulb', $this->base_url . 'libs/ultibox/ultibox.css');
      wp_enqueue_script('dzsulb', $this->base_url . 'libs/ultibox/ultibox.js');
    }
    if ($shortcodeAttributes['mode'] == 'tabs') {
      wp_enqueue_style('dzstaa', $this->base_url . 'libs/dzstabsandaccordions/dzstabsandaccordions.css');
      wp_enqueue_script('dzstaa', $this->base_url . 'libs/dzstabsandaccordions/dzstabsandaccordions.js');

      $restaurant_menu_mode = 'default';

      if ($this->db_mainoptions['embed_fonts']) {

        wp_enqueue_style('fonts-pacifico', 'https://fonts.googleapis.com/css?family=Pacifico');
      }
    }
    if ($shortcodeAttributes['mode'] == 'zfolio') {

      DzsrstHelpers::view_embedScript('zfolio');

    }


    if ($shortcodeAttributes['count'] == 'default') {
      $shortcodeAttributes['count'] = '-1';
    }

    if ($shortcodeAttributes['layout'] == '' || $shortcodeAttributes['layout'] == 'default') {


      if ($shortcodeAttributes['item_skin'] == 'rst-menu-item-skin-piadina') {
        $shortcodeAttributes['layout'] = 'dzs-layout--3-cols';
      } else {

      }

    }


    $wpqargs = array(
      'post_type' => $shortcodeAttributes['post_type'],
      'posts_per_page' => $shortcodeAttributes['count'],


    );



    if ($shortcodeAttributes['cats']) {

    } else {

    }


    if ($shortcodeAttributes['term_id']) {
      $shortcodeAttributes['cats'] = $shortcodeAttributes['term_id'];

      if (strpos($shortcodeAttributes['term_id'], ',') === false) {
        $shortcodeAttributes['mother_term_id'] = $this->sanitize_term_slug_to_id($shortcodeAttributes['term_id']);
      }
    }



    /** @var  $restaurantItemsTerms ?array name, order */
    $restaurantItemsTerms = null;
    $cats = null;
    if ($shortcodeAttributes['cats']) {

      $cats = explode(',', $shortcodeAttributes['cats']);

      $cats = array_values($cats);


    }


    $meta_key = 'dzs_meta_order_for_term';


    if ($cats && is_array($cats) && count($cats) == 1) {

      $term_id = $cats[0];

      $term_id_nr = $this->sanitize_term_slug_to_id($term_id);
      $meta_key = 'dzs_meta_order_for_term_' . $term_id_nr;
    }

    if ($shortcodeAttributes['mother_term_id']) {

      $meta_key = 'dzs_meta_order_for_term_' . $shortcodeAttributes['mother_term_id'];
    }


    if ($cats) {
      foreach ($cats as $lab => $cat) {
        $cats[$lab] = dzs_sanitize_term_slug_to_id($cat, $taxonomy_name);

      }

      // -- if single and has children we will retrieve the childs


      if (is_array($cats) && count($cats) == 1) {

        $original_cat = $cats[0];
        $term_children = get_term_children($original_cat, $taxonomy_name);


        if ($term_children && count($term_children)) {
          $cats = $term_children;

          array_push($cats, $original_cat);
        }
      }



      $wpqargs['tax_query'] = array(array('taxonomy' => $shortcodeAttributes['taxonomy'], 'field' => 'id', 'terms' => $cats,),);
    }


    $wpqargs['orderby'] = array('meta_key' => 'DESC',
      'meta_value_num' => 'DESC',
      'date' => 'DESC');


    if ($shortcodeAttributes['orderby'] && $shortcodeAttributes['orderby'] != 'default') {

      $wpqargs['orderby'] = $shortcodeAttributes['orderby'];
    }


    if ($shortcodeAttributes['order'] && $shortcodeAttributes['order'] != 'default') {

      $wpqargs['order'] = $shortcodeAttributes['order'];
    }


    $wpqargs['meta_query'] = array(
      'relation' => 'OR',
      array(
        'key' => $meta_key,
        'compare' => 'EXISTS'
      ),
      array(
        'key' => $meta_key,
        'compare' => 'NOT EXISTS'
      )
    );


    if ($shortcodeAttributes['paged'] !== '') {
      $wpqargs['paged'] = $shortcodeAttributes['paged'];
    }
    if ($shortcodeAttributes['mode'] == 'tabs') {
      $wpqargs['posts_per_page'] = -1;
    }




    $query = new WP_Query($wpqargs);




    $its = $this->sanitize_to_array_for_parse($query->posts, $shortcodeAttributes);


    $cats = array();
    $index3 = 0;

    // -- let us settle categories
    foreach ($its as $it) {

      $terms = wp_get_post_terms($it['ID'], $shortcodeAttributes['taxonomy'], array(
        'parent' => 0
      ));


      if ($terms) {
        foreach ($terms as $term) {

          $restaurantItemsTerms[$term->term_id] = array(
            'name' => $term->name,
            'order' => $index3,
          );


          $index3++;
        }

      }
    }


    $first_order = explode(',', $shortcodeAttributes['cats']);


    if (is_array($first_order) && count($first_order) > 1) {
      $index4 = 0;
      $first_order_arr = array();

      foreach ($first_order as $fo) {

        $first_order_arr[$fo] = $index4;
        $index4++;

        if (isset($restaurantItemsTerms[$fo])) {
          $restaurantItemsTerms[$fo]['order'] = $index4;
        }

      }



      uasort($restaurantItemsTerms, "sort_by_order3");
    }



    if ($shortcodeAttributes['mode'] == 'parallaxer') {

      $restaurant_menu_mode = 'blocks';


    }


    if ($shortcodeAttributes['mode'] == 'tabs') {
      return dzsrst_view_menuMain_tabs($shortcodeAttributes, $restaurantItemsTerms, $its, $this);
    }

    if ($shortcodeAttributes['mode'] == 'parallaxer') {
      return dzsrst_view_menuMain_parallaxer($shortcodeAttributes, $restaurantItemsTerms, $its, $this);
    }


    $fout = dzsrst_view_menuMain_view_default($shortcodeAttributes, $restaurant_menu_mode, $its, $this);


    $this->layout_index++;
    return $fout;


  }

  function shortcode_header($pargs = array(), $content = null) {

    $fout = '';


    wp_enqueue_style('fontawesome', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

    DzsrstHelpers::view_embedMainScripts();

    $margs = array(
      'term_id' => '',
      'header_skin' => 'skin-default',
      'taxonomy' => 'dzsrst_items_cat'
    );

    $margs = array_merge($margs, $pargs);


    $margs['term_id'] = dzs_sanitize_term_slug_to_id($margs['term_id'], $margs['taxonomy']);
    $term = get_term($margs['term_id'], $margs['taxonomy']);


//        print_r($term);


    $fout .= '<div class="dzsrst-header ' . $margs['header_skin'] . '">';


    if ($margs['header_skin'] == 'skin-default') {
      $fout .= '<h3>' . $term->name . '</h3> ';

      $fout .= '<p>' . $term->description . '  </p>';

      $fout .= '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="131.08px" height="12px" viewBox="0 0 31.08 3.651" enable-background="new 0 0 31.08 3.651" xml:space="preserve"> <g id="cutlery"> <path fill="#000100" d="M15,1.917c0-0.746-2.008-1.734-3.541-1.734c-1.01,0-1.559,0.338-1.814,0.844 C9.437,1.433,9,1.672,8.545,1.628L1.119,0.901c-0.286-0.028-0.571,0.066-0.784,0.26C0.121,1.354,0,1.628,0,1.917 s0.121,0.562,0.335,0.756c0.213,0.193,0.498,0.287,0.784,0.26l7.426-0.728C9,2.16,9.437,2.4,9.645,2.807 c0.256,0.506,0.805,0.844,1.814,0.844C12.992,3.651,15,2.702,15,1.917z"/> <path fill="#000100" d="M16.08,0.417c0,0.138,0.111,0.249,0.25,0.249h3.062c0.139,0,0.25,0.112,0.25,0.25s-0.111,0.25-0.25,0.25 H16.33c-0.139,0-0.25,0.111-0.25,0.249v0.002c0,0.138,0.111,0.249,0.25,0.249h3.062c0.139,0,0.25,0.112,0.25,0.25 c0,0.138-0.111,0.25-0.25,0.25H16.33c-0.139,0-0.25,0.111-0.25,0.249v0.002c0,0.138,0.111,0.248,0.25,0.248h3.062 c0.139,0,0.25,0.112,0.25,0.25c0,0.139-0.111,0.25-0.25,0.25H16.33c-0.139,0-0.25,0.112-0.25,0.249 c0,0.131,0.105,0.236,0.236,0.236c0.775,0,3.201,0,3.305,0c1.01,0,1.559-0.339,1.815-0.844c0.208-0.408,0.644-0.646,1.099-0.602 l7.426,0.727c0.286,0.027,0.571-0.066,0.784-0.26c0.214-0.194,0.335-0.468,0.335-0.756c0-0.289-0.121-0.562-0.335-0.757 c-0.213-0.192-0.498-0.288-0.784-0.26l-7.426,0.728c-0.455,0.044-0.891-0.195-1.099-0.603c-0.257-0.505-0.806-0.843-1.815-0.842 c-0.104,0-2.529,0-3.305,0C16.186,0.181,16.08,0.287,16.08,0.417z"/> </g> </svg>';

    }


    if ($margs['header_skin'] == 'skin-nymph') {
      $assetNymphHeaderIcon = include('assets/svg/nymph-header-icon.php');
      $fout .= '<div class="header---top">
                            <div class="header---icon">
                                ' . $assetNymphHeaderIcon . '

                            </div>
                        </div>
                        <h3>' . $term->name . '</h3>

                        <div class="header---bottom">
                            <div class="header---bar"></div>
                        </div>';

    }


    if ($margs['header_skin'] == 'skin-parallaxer') {


      wp_enqueue_style('dzs.parallaxer', $this->base_url . 'libs/dzsparallaxer/dzsparallaxer.css');
      wp_enqueue_script('dzs.parallaxer', $this->base_url . 'libs/dzsparallaxer/dzsparallaxer.js');

      $term_meta = get_option("taxonomy_$term->term_id");

//            print_r($term);

      $fout .= '<section class="dzsparallaxer auto-init height-is-based-on-content  use-loading "  data-options=\'{
       direction: "reverse"
,settings_mode_oneelement_max_offset: "150"
       }\'>
                        <div class="divimage dzsparallaxer--target " style="width: 101%; height: 140%; background-image: url(' . $this->sanitize_id_to_src($term_meta['media_image']) . ')">
                        </div>
                        <div class="semi-black-overlay"></div>
                        <div class="container" style="color: #fff; padding: 0px 3%;  position:relative; ">

                            <br>
                            <br>
                            <br>
                            <br>
                            <div class="row row-inline">
                                <div class="col-md-12 align-center" style="text-align: center; font-size: 25px; text-shadow: 0 1px 3px rgba(0,0,0,0.3);">
                                    <h2 style="margin-top:0; font-weight: bold; color: #fff;">' . $term->name . '</h2>
                                </div>
                            </div>
                            <br>
                            <br>
                            <br>
                            <br>
                        </div>
                    </section>';

    }


    $fout .= '
                        
                    </div>';


    $this->layout_index++;
    return $fout;


  }

  function parse_items($its, $margs) {

    $iout = '';
    foreach ($its as $it) {

      $iout .= '<div class="rst-menu-item" data-post-id="' . $it['ID'] . '" ';


//            print_r($it);
//            echo get_post_meta($it['ID'], 'dzsrst_meta_item_bigimage',true);

      $iout .= ' data-bigimage="' . $it['bigimage'] . '"';

      if (isset($it['thumbnail']) && $it['thumbnail']) {
        $iout .= ' data-thumb="' . $this->sanitize_id_to_src($it['thumbnail']) . '"';
      }


      $terms = wp_get_post_terms($it['ID'], $margs['taxonomy'], array(
        'parent' => 0,
      ));

//            print_r($margs);
//            print_rr($terms);

      if ($terms) {


        if ($margs['mode'] == 'zfolio') {

          $iout .= ' data-category="';
        } else {

          $iout .= ' data-term_names="';
        }
        $i2 = 0;
        foreach ($terms as $term) {

          if ($i2) {
            $iout .= ',';
          }

          $iout .= $term->name;
          $i2++;
        }
        $iout .= '"';

        $iout .= ' data-term_ids="';
        $i2 = 0;
        foreach ($terms as $term) {

          if ($i2) {
            $iout .= ',';
          }

          $iout .= $term->term_id;
        }
        $iout .= '"';
      }


      $price = $it['price'];

      if ($margs['post_type'] != 'product' && $this->db_mainoptions['currency_sign']) {
        $price = $this->db_mainoptions['currency_sign'] . $price;
      }

      $iout .= ' >';


      // dzsrst_meta_item_icon


      $lab = 'dzsrst_meta_item_icon';

      if ($margs['item_skin'] === 'rst-menu-item-skin-piadina' && get_post_meta($it['ID'], $lab, true)) {

        $iout .= '<div class="the-icon" style=";"  >' . get_post_meta($it['ID'], $lab, true) . '</div>';
      }

      $iout .= '<div class="the-title">';


//            print_rr($margs);
      if ($margs['item_link_title_to'] == 'direct_link') {

        $iout .= '<a href="' . $it['title_permalink'] . '">';
      }

      $iout .= $it['post_title'];

      if ($margs['item_link_title_to'] == 'direct_link') {
        $iout .= '</a>';
      }


      $iout .= '</div>
                                    <div class="the-price">' . $price . '</div>
                                    <!-- from automated -->';


      if ($margs['post_type'] == 'product') {
//                $iout.='<a class="dzs-button add-to-cart-btn add-to-cart-btn-woo" > <span class="the-bg"> </span> <span class="the-text">'.__('ADD TO CART').'</span> </a>';


      }


//            $buy_link =site_url().'/cart/?add-to-cart='.$it['ID'];
      $buy_link = DZSHelpers::add_query_arg(dzs_curr_url(), 'add-to-cart', $it['ID']);
      if ($margs['post_type_product_show_quantity'] == 'on') {
        $buy_link = DZSHelpers::add_query_arg($buy_link, 'quantity', '1');
      }
      if ($margs['post_type'] == 'product') {


        $iout .= '<div class="add-to-cart-btn-con">';


        if ($margs['post_type_product_show_quantity'] == 'on') {
//                    $iout.='<input class="rst-woo-qnt" type="text" value="1"/>';
        }


//                $iout.='<a href="'.$buy_link.'" class="dzs-button add-to-cart-btn  add-to-cart-btn-woo-get" data-the-post-id="'.$it['ID'].'" > <span class="the-bg"> </span> <span class="the-text">'.__('ADD TO CART').'</span> </a>';


        if (class_exists('WC_Product_Factory')) {
          $_pf = new WC_Product_Factory();
          $product = $_pf->get_product($it['ID']);


//                    print_rr($product);
          if ($product->is_purchasable()) {

//                        print_rr($product);
            if ($product && $product->is_type('simple')) {


              if ($product->is_in_stock() && !$product->is_sold_individually()) {

                $iout .= '<form action="' . esc_url($product->add_to_cart_url()) . '" class="cart" method="post" enctype="multipart/form-data">';
                $iout .= woocommerce_quantity_input(array(), $product, false);
                $iout .= '<button type="submit" class="button alt">' . esc_html($product->add_to_cart_text()) . '</button>';
                $iout .= '</form>';
              }
            } else {

//	                        echo 'whaaa';
              $iout .= '<a class="dzs-button" href="' . get_permalink($it['ID']) . '"><span class="the-bg"></span><span class="the-text">' . esc_html__("Choose options", 'dzsrst') . '</span></a>';
            }
          }
        }
        $iout .= '</div>';


      }

      $subtitle = '';

      $lab = 'dzsrst_meta_item_subtitle';

      $val = 'as_ingredients';
      if (get_post_meta($it['ID'], $lab, true)) {
        $val = get_post_meta($it['ID'], $lab, true);
        $subtitle = $val;
      }

      if ($val == 'as_ingredients') {
        $subtitle = $it['ingredients'];
      }
      if ($val == 'none') {
        $subtitle = '';
      }


      if ($margs['item_skin'] != 'rst-menu-item-skin-aura') {

        $iout .= '<div class="the-ingredients  sub-title">' . $subtitle . '</div>';
      }
      $tags = wp_get_post_terms($it['ID'], 'dzsrst_items_tag');

      if ((is_array($tags) && count($tags)) || $it['ingredients'] || $it['post_content']) {

        $iout .= '
                                    <div class="feed-rst">
                                        <ul class="the-mentions">
                                        ';


//            print_r($tags);

        foreach ($tags as $tag) {
          $iout .= '<li style="text-transform: uppercase; ';

          $term_id = $tag->term_id;

          $term_meta = get_option("taxonomy_$term_id");

//                print_rr($term_meta);

          if (isset($term_meta['color']) && $term_meta['color']) {
            $iout .= ' background-color: ' . $term_meta['color'] . ';';
          }

          $iout .= '">' . $tag->name . '</li>';
        }

        $iout .= '
                                        </ul>
                                        <h6>' . __("Description") . '</h6><p> ' . $it['post_content'] . '  </p>';

        if ($it['ingredients']) {
          $iout .= '<h6>' . __("Ingredients") . '</h6><p class="the-ingredients">' . $it['ingredients'] . '</p>';
        }
        $iout .= '
                                    </div><!-- .feed-rst -->';
      }


      $iout .= '
                                </div>';
    }

    return $iout;
  }

  function get_post_thumb_src($it_id) {
    $imgsrc = wp_get_attachment_image_src(get_post_thumbnail_id($it_id), "full");

    if (isset($imgsrc[0])) {

      return $imgsrc[0];
    }

    return '';
  }

  function object_to_array($data) {
    if (is_array($data) || is_object($data)) {
      $result = array();
      foreach ($data as $key => $value) {
        $result[$key] = object_to_array($value);
      }
      return $result;
    }
    return $data;
  }

  function sanitize_id_to_src($arg) {

//        echo ' arg - '.$arg;
    if (is_numeric($arg)) {

      $imgsrc = wp_get_attachment_image_src($arg, 'full');
//            print_r($imgsrc);
//            echo ' $imgsrc - '.$imgsrc;
      if (isset($imgsrc[0])) {

        return $imgsrc[0];
      }
    } else {
      return $arg;
    }

    return '';


  }

  function sanitize_to_array_for_parse($its, $margs) {
//        print_r($its);
//        print_r($margs);

    foreach ($its as $lab => $it) {
//            $its[$lab] = $this->object_to_array($it);
      $its[$lab] = (array)$it;


      $thumb = $this->get_post_thumb_src($it->ID);

//            echo ' thumb - ';
//            print_r($thumb);


      $thumb_from_meta = get_post_meta($it->ID, 'dzsrst_meta_item_thumb', true);

      if ($thumb_from_meta) {

        $thumb = $thumb_from_meta;
      }

      if ($thumb) {
//                $its[$lab]->thumbnail = $thumb;
        $its[$lab]['thumbnail'] = $thumb;
      }

//            print_r($margs);


      $its[$lab]['title_permalink'] = get_permalink($it->ID);

      $its[$lab]['price'] = get_post_meta($it->ID, 'dzsrst_meta_item_price', true);

      if ($margs['post_type'] == 'product') {
        if (get_post_meta($it->ID, '_regular_price', true)) {
          $its[$lab]['price'] = '';
          if (function_exists('get_woocommerce_currency_symbol')) {
            $its[$lab]['price'] .= get_woocommerce_currency_symbol();
          }
          $its[$lab]['price'] .= get_post_meta($it->ID, '_regular_price', true);
        }
      }

      $its[$lab]['ingredients'] = get_post_meta($it->ID, 'dzsrst_meta_item_ingredients', true);
      $its[$lab]['bigimage'] = $this->sanitize_id_to_src(get_post_meta($it->ID, 'dzsrst_meta_item_bigimage', true));
    }

    return $its;
  }


  function import_demo_insert_post_complete($pargs = array()) {


    $margs = array(

      'post_title' => '',

      'post_content' => '',
      'post_type' => 'dzsrst_items',
      'post_status' => 'publish',
      'post_name' => '',
      'img_url' => '',
      'img_path' => '',
      'term' => '',
      'taxonomy' => '',
      'attach_id' => '',
      'dzsvp_thumb' => '',
      'dzsvp_item_type' => 'detect',
      'dzsvp_featured_media' => '',


    );

    $margs = array_merge($margs, $pargs);


    if ($margs['post_name']) {


      $ind = 1;
      $breaker = 100;


      $the_slug = $margs['post_name'];
      $original_slug = $margs['post_name'];
      $args = array(
        'name' => $the_slug,
        'post_type' => $margs['post_type'],
        'post_status' => 'publish',
        'numberposts' => 1
      );
      $my_posts = get_posts($args);
      if ($my_posts) {


        while (1) {

          $the_slug = $margs['post_name'];
          $original_slug = $margs['post_name'];
          $args = array(
            'name' => $the_slug,
            'post_type' => $margs['post_type'],
            'post_status' => 'publish',
            'numberposts' => 1
          );
          $my_posts = get_posts($args);
          if ($my_posts) {

            $ind++;
            $margs['post_name'] = $original_slug . '-' . $ind;
          } else {
            break;
          }

          $breaker--;

          if ($breaker < 0) {
            break;
          }
        }

        $ind++;

        $margs['post_name'] = $original_slug . '-' . $ind;
      } else {

      }


    }

    $args = array(
      'post_type' => $margs['post_type'],
      'post_title' => $margs['post_title'],

      'post_content' => $margs['post_content'],
      'post_status' => $margs['post_status'],


      /*other default parameters you want to set*/
    );


    if ($margs['post_name']) {
      //            $args['name']=$margs['post_name'];
      $args['post_name'] = $margs['post_name'];
    }


    if ($margs['term']) {

      $term = $margs['term'];
    }
    $taxonomy = $margs['taxonomy'];

    if ($margs['img_url']) {

      $img_url = $margs['img_url'];
    }
    $img_path = $margs['img_path'];


    //        print_rr($margs);


    error_log(' item import - ' . print_rr($margs, true) . print_rr($args, true));
    $port_id = $this->import_demo_create_portfolio_item($args);

    if ($margs['term']) {
      $term = $margs['term'];


      if (is_object($margs['term']) && isset($margs['term']->term_id)) {
        $term = $margs['term']->term_id;
      } else {

        if (is_array($margs['term']) && isset($margs['term']['term_id'])) {
          $term = $margs['term']['term_id'];
        }
      }
      wp_set_post_terms($port_id, $term, $taxonomy);
    }


    foreach ($margs as $lab => $val) {
      if (strpos($lab, 'dzsrst_meta') === 0) {

        update_post_meta($port_id, $lab, $val);
      }
    }


    //        update_post_meta($port_id,'q_meta_post_media',$img_url);


    if ($margs['attach_id']) {

      set_post_thumbnail($port_id, $margs['attach_id']);
    } else {

      if ($margs['img_url']) {
        $attach_id = $this->import_demo_create_attachment($img_url, $port_id, $img_path);
        set_post_thumbnail($port_id, $attach_id);

        $this->import_demo_last_attach_id = $attach_id;
      }

    }


    return $port_id;


  }

  function import_demo_create_portfolio_item($pargs = array()) {


    $margs = array(

      'post_title' => '',
      'post_content' => '',
      'post_status' => '',
      'post_type' => 'dzsvcs_port_items',
    );

    $margs = array_merge($margs, $pargs);


    $args = array(
      'post_type' => $margs['post_type'],
      'post_title' => $margs['post_title'],
      'post_content' => $margs['post_content'],
      'post_status' => $margs['post_status'],


      /*other default parameters you want to set*/
    );


    $post_id = wp_insert_post($args);

    return $post_id;


  }


  function import_demo_create_attachment($img_url, $port_id, $img_path) {


    $attachment = array(
      'guid' => $img_url,
      'post_mime_type' => 'image/jpeg',
      'post_title' => preg_replace('/\.[^.]+$/', '', basename($img_url)),
      'post_content' => '',
      'post_status' => 'inherit'
    );

    // Insert the attachment.
    $attach_id = wp_insert_attachment($attachment, $img_url, $port_id);


    require_once(ABSPATH . 'wp-admin/includes/image.php');

    // Generate the metadata for the attachment, and update the database record.
    $attach_data = wp_generate_attachment_metadata($attach_id, $img_path);
    //        die();
    wp_update_attachment_metadata($attach_id, $attach_data);

    return $attach_id;
  }


  function import_demo_create_term_if_it_does_not_exist($pargs = array()) {


    $margs = array(

      'term_name' => '',
      'slug' => '',
      'taxonomy' => '',
      'description' => '',
      'parent' => '',
    );

    $margs = array_merge($margs, $pargs);

    $term = get_term_by('slug', $margs['slug'], $margs['taxonomy']);


    if ($term) {

    } else {


      $args = array(
        'description' => $margs['description'],
        'slug' => $margs['slug'],


      );

      if ($margs['parent']) {
        $args['parent'] = $margs['parent'];
      }

      $term = wp_insert_term($margs['term_name'], $margs['taxonomy'], $args);

    }
    return $term;

  }


}

if (function_exists('sort_by_order3') == false) {

  function sort_by_order3($a, $b) {
    return $a['order'] - $b['order'];
  }

}

