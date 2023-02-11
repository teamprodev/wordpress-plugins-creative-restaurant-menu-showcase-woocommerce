<?php
global $post, $wp_version;
$struct_uploader = '<div class="dzs-wordpress-uploader insert-id">
    <a href="#" class="button-secondary">' . __('Upload', 'dzsvp') . '</a>
</div>';
?>
<div class="select-hidden-con">
    <?php
    $lab_nonce = 'dzsrst_meta_nonce';
    echo '<input type="hidden" name="'.$lab_nonce.'" value="'.wp_create_nonce($lab_nonce).'"/>';
    ?>



</div>



<div class="setting">
    <h5 class="setting-label"><?php echo __("Subtitle"); ?></h5>
	<?php
	$lab = 'dzsrst_meta_item_subtitle';

	$val = 'as_ingredients';
	if(get_post_meta($post->ID, $lab, true)){
		$val = get_post_meta($post->ID, $lab, true);
	}


	echo DZSHelpers::generate_input_textarea($lab, array(
		'class'=>'setting-field ',
		'extraattr'=>' rows="3"',
		'seekval'=>$val,
	));

	?>
    <div class="sidenote"><?php echo
		sprintf(__("if left to %s - it will show the ingredients list under the title %s if set to %s - then it will display nothing under the title %s or you can input custom content here")
			,'<strong>as_ingredients</strong>'
			,'<br>'
			,'<strong>none</strong>'
			,'<br>'
		); ?></div>
</div>

<div class="setting setting-upload">
    <h5 class="setting-label"><?php echo __("Thumbnail"); ?></h5>


    <span class="uploader-preview"></span>

    <?php
    $lab = 'dzsrst_meta_item_thumb';

    $val = get_post_meta($post->ID, $lab, true);

    echo DZSHelpers::generate_input_text($lab, array(
        'class'=>'setting-field medium uploader-target',
        'seekval'=>$val,
    ));

    echo $struct_uploader;
    ?>
    <div class="sidenote"><?php echo __("This will replace the default wordpress thumbnail"); ?></div>
</div>

<div class="setting setting-upload">
    <h5 class="setting-label"><?php echo __("Lightbox Image"); ?></h5>


    <span class="uploader-preview"></span>

    <?php
    $lab = 'dzsrst_meta_item_bigimage';

    $val = get_post_meta($post->ID, $lab, true);

    echo DZSHelpers::generate_input_text($lab, array(
        'class'=>'setting-field medium uploader-target',
        'seekval'=>$val,
    ));

    echo $struct_uploader;
    ?>
    <div class="sidenote"><?php echo __("This will replace the default wordpress thumbnail"); ?></div>
</div>

<div class="setting">
    <h5 class="setting-label"><?php echo __("Price"); ?></h5>
    <?php
    $lab = 'dzsrst_meta_item_price';

    $val = get_post_meta($post->ID, $lab, true);

    echo DZSHelpers::generate_input_text($lab, array(
        'class'=>'setting-field small-text',
        'seekval'=>$val,
    ));

    ?>
    <div class="sidenote"><?php echo __("the price of the item / leave blank if no price"); ?></div>
</div>

<div class="setting">
    <h5 class="setting-label"><?php echo esc_html__("Icon",'dzsrst'); ?></h5>
    <?php
    $lab = 'dzsrst_meta_item_icon';

    $val = get_post_meta($post->ID, $lab, true);

    echo DZSHelpers::generate_input_textarea($lab, array(
        'class'=>'setting-field ',
        'seekval'=>$val,
    ));

    ?>
    <div class="sidenote"><?php echo __("optional - will include a icon above the title for some modes"); ?></div>
</div>

<div class="setting">
    <h5 class="setting-label"><?php echo esc_html__("Ingredients",'dzsrst'); ?></h5>
    <?php
    $lab = 'dzsrst_meta_item_ingredients';

    $val = get_post_meta($post->ID, $lab, true);

    echo DZSHelpers::generate_input_textarea($lab, array(
        'class'=>'setting-field ',
        'seekval'=>$val,
    ));

    ?>
    <div class="sidenote"><?php echo __("the ingredients - will show in tooltip or under the item"); ?></div>
</div>


