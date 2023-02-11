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


$terms = get_terms( 'dzsrst_items_cat', array(
	'hide_empty' => false,
) );

$lab = "term_id";

//            print_r($terms);


$arr_opts = array();

//error_log(print_r($terms,true));
foreach ($terms as $tm){

	if($tm && isset($tm->name)){

		$aux = array(
			'label'=>$tm->name,
			'value'=>$tm->slug,
		);

		array_push($arr_opts, $aux);
	}
}


$this->options_array_menu_header = array(


	'header_skin' => array(
		'type' => 'select',
		'title' => __("Type"),
		'sidenote' => sprintf(__("The skin of the items")),


		'context' => 'content',
		'options' => array(
			array(
				'label'=>esc_html__("Skin Default",'dzsrst'),
				'value'=>'skin-default',
			),
			array(
				'label'=>esc_html__("Skin Nymp",'dzsrst'),
				'value'=>'skin-nymph',
			),
			array(
				'label'=>esc_html__("Skin Aura",'dzsrst'),
				'value'=>'rst-menu-item-skin-aura',
			),
			array(
				'label'=>esc_html__("Skin Parallaxer",'dzsrst'),
				'value'=>'skin-parallaxer',
			),

		),
		'default' => 'skin-default',
	),



	'term_id' => array(
		'type' => 'select',
		'title' => __("Type"),
		'sidenote' => sprintf(__("The skin of the items")),


		'context' => 'content',
		'options' => $arr_opts,
		'default' => 'skin-default',
	),





);