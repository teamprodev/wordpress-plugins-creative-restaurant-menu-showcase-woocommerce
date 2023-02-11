<?php




function dzsrst_shortcode_generator_header(){

    global $dzsrst;

    $url_admin = get_admin_url();
//<script src="<?php echo site_url(); "></script>


    ?>
<div class="sc-con sc-con-for-showcase-builder">
    <div class="sc-menu">


        <div class="main-type-container">


            <div class="setting  mode-any">
                <h3><?php echo __("Header Skin"); ?></h3>
                <?php


                $lab = "header_skin";


                $arr_opts = array(
                    'skin-default',
                    'skin-nymph',
                    'skin-parallaxer',
                );


                echo DZSHelpers::generate_select($lab, array(
                    'options'=>$arr_opts,
                    'class'=>'dzs-style-me opener-listbuttons dzs-dependency-field',
                    'seekval'=>'',
                ));

                ?>
                <ul class="dzs-style-me-feeder">
                    <li ><span class="option-con"><img src="<?php echo $dzsrst->base_url; ?>assets/img/header_type1.png"/><span class="option-label"><?php echo __("Skin Default"); ?></span></span></li>
                    <li ><span class="option-con"><img src="<?php echo $dzsrst->base_url; ?>assets/img/header_type2.png"/><span class="option-label"><?php echo __("Skin Nymph"); ?></span></span></li>
                    <li ><span class="option-con"><img src="<?php echo $dzsrst->base_url; ?>assets/img/header_type3.png"/><span class="option-label"><?php echo __("Skin Parallaxer"); ?></span></span></li>
                </ul>
                <div class="sidenote"><?php echo __("This is where the showcase items will come from... "); ?></div>
            </div>






        </div>

        <div class="setting  mode-any">
            <h3><?php echo __("Category"); ?></h3>
            <?php
            $terms = get_terms( 'dzsrst_items_cat', array(
                'hide_empty' => false,
            ) );

            $lab = "term_id";

//            print_r($terms);


            $arr_opts = array();
            foreach ($terms as $tm){
                $aux = array(
                    'label'=>$tm->name,
                    'value'=>$tm->term_id,
                );

                array_push($arr_opts, $aux);
            }




            echo DZSHelpers::generate_select($lab, array(
                'options'=>$arr_opts,
                'class'=>'dzs-style-me skin-beige dzs-dependency-field',
                'seekval'=>'',
            ));

            ?>
            <ul class="dzs-style-me-feeder">
                <li ><span class="option-con"><img src="<?php echo $dzsrst->base_url; ?>assets/img/type1.png"/><span class="option-label"><?php echo __("Skin Default"); ?></span></span></li>
                <li ><span class="option-con"><img src="<?php echo $dzsrst->base_url; ?>assets/img/type2.png"/><span class="option-label"><?php echo __("Skin Feature"); ?></span></span></li>
                <li ><span class="option-con"><img src="<?php echo $dzsrst->base_url; ?>assets/img/type3.png"/><span class="option-label"><?php echo __("Skin Aura"); ?></span></span></li>
                <li ><span class="option-con"><img src="<?php echo $dzsrst->base_url; ?>assets/img/type4.png"/><span class="option-label"><?php echo __("Black & White"); ?></span></span></li>
            </ul>
            <div class="sidenote"><?php echo __("This is where the showcase items will come from... "); ?></div>
        </div>



        <div class="clear"></div>
        <button id="insert_tests" class="button-primary insert-tests"><?php echo __("Insert Header"); ?></button>
        <div class="shortcode-output"></div>
    </div>
    </div>
    <div class="feedbacker"><i class="fa fa-circle-o-notch fa-spin"></i><?php echo __(" Loading... "); ?></div>
</div><?php
}