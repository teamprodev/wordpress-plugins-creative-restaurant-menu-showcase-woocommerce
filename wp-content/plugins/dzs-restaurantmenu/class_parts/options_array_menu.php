<?php

//print_r($this);


$arr_off_on = array(
    array(
        'label'=>__("Off"),
        'value'=>'off',
    ),
    array(
        'label'=>__("On"),
        'value'=>'on',
    ),
);

$arr_on_off = array(
    array(
        'label'=>__("On"),
        'value'=>'on',
    ),
    array(
        'label'=>__("Off"),
        'value'=>'off',
    ),
);


$arr_post_type = array(
	array(
		'label'=>esc_html__("Menu Items",'dzsrst'),
		'value'=>'',
	),



);

if(defined('WC_PLUGIN_FILE')){
array_push($arr_post_type, 	array(
	'label'=>esc_html__("WooCommerce Products",'dzsrst'),
	'value'=>'product',
));
}


$this->options_array_menu = array(


	'item_skin' => array(
		'type' => 'select',
		'title' => __("Type"),
		'sidenote' => sprintf(__("The skin of the items")),


		'context' => 'content',
		'options' => array(
			array(
				'label'=>esc_html__("Skin Default",'dzsrst'),
				'value'=>'rst-menu-item-skin-default',
			),
			array(
				'label'=>esc_html__("Skin Feature",'dzsrst'),
				'value'=>'rst-menu-item-skin-feature',
			),
			array(
				'label'=>esc_html__("Skin Aura",'dzsrst'),
				'value'=>'rst-menu-item-skin-aura',
			),
			array(
				'label'=>esc_html__("Skin Blackwhite",'dzsrst'),
				'value'=>'rst-menu-item-blackwhite2',
			),
			array(
				'label'=>esc_html__("Skin Piadina",'dzsrst'),
				'value'=>'rst-menu-item-skin-piadina',
			),

		),
		'default' => 'rst-menu-item-skin-default',
	),




	'mode' => array(
		'type' => 'select',
		'title' => esc_html__("Mode",'dzsrst'),
		'sidenote' => sprintf(__("the mode")),


		'context' => 'content',
		'options' => array(
			array(
				'label'=>esc_html__("Default",'dzsrst'),
				'value'=>'default',
			),
			array(
				'label'=>esc_html__("Blocks",'dzsrst'),
				'value'=>'blocks',
			),
			array(
				'label'=>esc_html__("Portfolio",'dzsrst'),
				'value'=>'zfolio',
			),
			array(
				'label'=>esc_html__("Tabs",'dzsrst'),
				'value'=>'tabs',
			),
			array(
				'label'=>esc_html__("Parallax",'dzsrst'),
				'value'=>'parallaxer',
			),

		),
		'default' => 'default',
	),
	'post_type' => array(
		'type' => 'select',
		'title' => esc_html__("Post Type",'dzsrst'),
		'sidenote' => sprintf(__("change post type")),


		'context' => 'content',
		'options' => $arr_post_type,
		'default' => '',
	),





	'term_id' => array(
		'type' => 'select',
		'title' => esc_html__("Category",'dzsrst'),
		'sidenote' => sprintf(esc_html__("select the category",'dzsrst')),


		'context' => 'content',
		'options' => array(


		),
		'default' => '',
	),


	'mode_tabs_aligment' => array(
		'type' => 'select',
		'title' => esc_html__("Tabs Aligment",'dzsrst'),



		'context' => 'content',
		'options' => array(
			array(
				'value'=>'two-columns',
				'label'=>__("Two Small Column"),
			),
			array(
				'value'=>'one-column',
				'label'=>__("One Column"),
			),
		),
		'default' => '',
		'dependency' => array(

			array(
				'element'=>'mode',
				'value'=>array('tabs'),
			),
		),
	),


	'mode_tabs_skin' => array(
		'type' => 'select',
		'title' => esc_html__("Tabs Skin",'dzsrst'),



		'context' => 'content',
		'options' => array(
			array(
				'value'=>'skin-box skin-box-alternate',
				'label'=>__("Skin box"),
			),
			array(
				'value'=>'skin-default',
				'label'=>__("Alternate"),
			),
			array(
				'value'=>'skin-chef',
				'label'=>__("Chef"),
			),
		),
		'default' => '',
		'dependency' => array(

			array(
				'element'=>'mode',
				'value'=>array('tabs'),
			),
		),
	),



	'mode_tabs_is_always_accordion' => array(
		'type' => 'select',
		'title' => esc_html__("Is accordion?",'dzsrst'),



		'description' => esc_html__("This will always make the tabs into accordions",'dzsrst'),
		'context' => 'content',
		'options' => array(
			array(
				'value'=>'off',
				'label'=>__("No"),
			),
			array(
				'value'=>'on',
				'label'=>__("Yes"),
			),
		),
		'default' => '',
		'dependency' => array(

			array(
				'element'=>'mode',
				'value'=>array('tabs'),
			),
		),
	),







	'mode_zfolio_skin' => array(
		'type' => 'select',
		'title' => esc_html__("Skin Zfolio",'dzsrst'),



		'context' => 'content',
		'options' => array(
			array(
				'value'=>'skin-forwall',
				'label'=>__("Skin Forwall"),
			),
			array(
				'value'=>'skin-alba',
				'label'=>__("Skin Alba"),
			),
		),
		'default' => '',
		'dependency' => array(

			array(
				'element'=>'mode',
				'value'=>array('zfolio'),
			),
		),
	),






	'mode_zfolio_gap' => array(
		'type' => 'select',
		'title' => esc_html__("Gap Size",'dzsrst'),



		'context' => 'content',
		'options' => array(
			array(
				'value'=>'30px',
				'label'=>__("30px"),
			),
			array(
				'value'=>'1px',
				'label'=>__("1px"),
			),
		),
		'default' => '',
		'dependency' => array(

			array(
				'element'=>'mode',
				'value'=>array('zfolio'),
			),
		),
	),




	'layout' => array(
		'type' => 'select',
		'title' => esc_html__("Layout",'dzsrst'),



		'context' => 'content',
		'options' => array(
			array(
				'value'=>'default',
				'label'=>__("Default"),
			),
			array(
				'value'=>'dzs-layout--1-cols',
				'label'=>__("1 Column"),
			),
			array(
				'value'=>'dzs-layout--2-cols',
				'label'=>__("2 Columns"),
			),
			array(
				'value'=>'dzs-layout--3-cols',
				'label'=>__("3 Columns"),
			),
			array(
				'value'=>'dzs-layout--4-cols',
				'label'=>__("4 Columns"),
			),
			array(
				'value'=>'dzs-layout--5-cols',
				'label'=>__("5 Columns"),
			),
		),
		'default' => 'default',
		'dependency' => array(

			array(
				'element'=>'mode',
				'value'=>array('zfolio','blocks','default'),
			),
		),
	),

	'item_link_thumb_con_to' => array(
		'type' => 'select',
		'title' => esc_html__("Item Thumb links to",'dzsrst'),
		'sidenote' => sprintf(__('%sDefault%s - auto select.  %s%sUltibox%s - open the image in a lightbox. %s%sDirect link%s - will link to item.  ','dzsrst'),'<strong>','</strong>','<br>','<strong>','</strong>','<br>','<strong>','</strong>'),



		'context' => 'content',
		'options' => array(
			array(
				'value'=>'default',
				'label'=>__("Default"),
			),
			array(
				'value'=>'ultibox',
				'label'=>__("Ultibox"),
			),
			array(
				'value'=>'direct_link',
				'label'=>__("Direct Link"),
			),
		),
		'default' => '',

	),

	'item_link_info_to' => array(
		'type' => 'select',
		'title' => esc_html__("Tooltip Links To",'dzsrst'),
		'sidenote' => sprintf(__('%sDefault%s - means that the item click action will depend on the mode you chose and choose its default mode.  %s%sDisable tooltip%s - open the video in a lightbox. %s%sSmall Info tooltip%s - a tooltip will appear.  ','dzsrst'),'<strong>','</strong>','<br>','<strong>','</strong>','<br>','<strong>','</strong>'),



		'context' => 'content',
		'options' => array(
			array(
				'value'=>'default',
				'label'=>__("Default"),
			),
			array(
				'value'=>'none',
				'label'=>__("Disable Tooltip"),
			),
			array(
				'value'=>'tooltip',
				'label'=>__("Small Info Tooltip"),
			),
		),
		'default' => '',

	),

	'item_link_title_to' => array(
		'type' => 'select',
		'title' => esc_html__("Tooltip Links To",'dzsrst'),
		'sidenote' => sprintf(__('%sDefault%s - means that the item click action will depend on the mode you chose and choose its default mode.  %s%sNo link%s - just the title. %s%sItem Permalink%s - links to title.  ','dzsrst'),'<strong>','</strong>','<br>','<strong>','</strong>','<br>','<strong>','</strong>'),



		'context' => 'content',
		'options' => array(
			array(
				'value'=>'default',
				'label'=>__("Default"),
			),
			array(
				'value'=>'none',
				'label'=>__("No link"),
			),
			array(
				'value'=>'direct_link',
				'label'=>__("Item Permalink"),
			),
		),
		'default' => '',

	),




    'extra_classes' => array(
        'type' => 'text',
        'title' => __("Extra Classes"),
        'sidenote' => __("some extra classes"),

        'context' => 'content',
        'default' => '',
    ),




);