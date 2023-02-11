<?php




/*
$arr_gals = array();
foreach ($dzsap->mainitems as $mainitem) {
    array_push($arr_gals,$mainitem['settings']['id']);

}



$arr_dbs = array();


foreach ($dzsap->dbs as $mainitem) {
    array_push($arr_dbs,$mainitem);
}

*/



//print_r($arr_gals);

//error_log(print_rr($arr_dbs, array(  'echo'=>false) ) );



$order_by_arr_opts = array(
    array(
        'label'=>__("Date")
    ,'value'=>'date'
    ),
);
$order_arr_opts = array(
    array(
        'label'=>__("Ascending")
    ,'value'=>'asc'
    ),
    array(
        'label'=>__("Descending")
    ,'value'=>'desc'
    ),
);



$feed_direction_opts = array(
    "normal" => "normal",
    "reverse" => "reverse",
);
$feed_scrollbar_opts = array(
    'off' => 'off',
    'on' => 'on',
);
$feed_breakout_opts = array(
    'off' => 'off',
    'trybreakout' => 'trybreakout',
);



if(!function_exists('sanitize_to_vc_array')){

	function sanitize_to_vc_array($arr){




		$params_arr = array();
		$ilab = 0;



//    print_r($this->options_array_player);

		foreach($arr as $lab => $opt){


			$params_arr[$ilab] = array(
				'type'=>$opt['type'],
				'param_name'=>$lab,
				'heading' => $opt['title'],
				//            'context' => $opt['context'],
			);

			if(isset($opt['type'])){
				$params_arr[$ilab]['type'] = $opt['type'];
				if($opt['type']=='select'){
					$params_arr[$ilab]['type'] = 'dropdown';
				}
				if($opt['type']=='text'){
					$params_arr[$ilab]['type'] = 'textfield';
				}
				if($opt['type']=='image'){
					$params_arr[$ilab]['type'] = 'attach_image';
				}
				if($opt['type']=='upload'){
					$params_arr[$ilab]['type'] = 'dzs_add_media_att';
				}
			}
			if(isset($opt['sidenote'])){
				$params_arr[$ilab]['description'] = $opt['sidenote'];
			}
			if(isset($opt['default'])){
				$params_arr[$ilab]['std'] = $opt['default'];
				$params_arr[$ilab]['default'] = $opt['default'];
			}
			if(isset($opt['options'])){
				$params_arr[$ilab]['value'] = $opt['options'];
			}

			if(isset($opt['library_type'])){
				$params_arr[$ilab]['library_type'] = $opt['library_type'];
			}

			if(isset($opt['class'])){
				$params_arr[$ilab]['class'] = $opt['class'];
			}

			if(isset($opt['dependency'])){
				if(isset($opt['dependency'][0])){

					$params_arr[$ilab]['dependency'] = $opt['dependency'][0];
				}else{

					$params_arr[$ilab]['dependency'] = $opt['dependency'];
				}
			}
			$ilab++;
		}

		return $params_arr;

	}
}


if(function_exists('vc_map')){





	$params_arr = sanitize_to_vc_array($this->options_array_menu);



//    print_r($params_arr);


    vc_map(array(
        "name" => __("Restaurant Menu"),
        "base" => "restaurantmenu",
        "front_enqueue_js" => $this->base_url.'vc/frontend_backbone.js',
        "class" => "",
//        "front_enqueue_js" => $this->base_url.'vc/frontend_backbone.js',
        "category" => __('Content'),
        "params" => $params_arr
    ));



	$params_arr = sanitize_to_vc_array($this->options_array_menu_header);



//    print_r($params_arr);


    vc_map(array(
        "name" => __("Restaurant Menu Header"),
        "base" => "restaurantmenu_header",
        "class" => "",
//        "front_enqueue_js" => $this->base_url.'vc/frontend_backbone.js',
        "category" => __('Content'),
        "params" => $params_arr
    ));

//    print_r($params_arr);
//    print_r($arr);

}

