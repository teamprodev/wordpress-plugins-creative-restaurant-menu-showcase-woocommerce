<?php




function dzsrst_shortcode_generator(){

    global $dzsrst;


    $startinit = '';

    if(isset($_GET['sel'])){
        $startinit = stripslashes($_GET['sel']);
    }

    $url_admin = get_admin_url();
//<script src="<?php echo site_url(); "></script>


    ?>
    <script>
        window.generator_settings = {
            'sample_data' : '<?php echo json_encode($dzsrst->sample_data); ?>'
        };
        window.dzsrst_startinit = '<?php
                        echo $startinit;

             ?>';

    </script>

<div class="sc-con sc-con-for-showcase-builder">
    <div class="sc-menu">


        <div class="main-type-container">


            <div class="setting  mode-any">
                <h3><?php echo __("Item Skin"); ?></h3>
                <?php


                $lab = "item_skin";


                $arr_opts = array(
                    'rst-menu-item-skin-default',
                    'rst-menu-item-skin-feature',
                    'rst-menu-item-skin-aura',
                    'rst-menu-item-skin-blackwhite2',
                    'rst-menu-item-skin-piadina',
                );


                echo DZSHelpers::generate_select($lab, array(
                    'options'=>$arr_opts,
                    'class'=>'dzs-style-me opener-listbuttons dzs-dependency-field',
                    'seekval'=>'',
                ));

                ?>
                <ul class="dzs-style-me-feeder">
                    <li ><span class="option-con"><img src="<?php echo $dzsrst->base_url; ?>assets/img/type1.png"/><span class="option-label"><?php echo __("Skin Default"); ?></span></span></li>
                    <li ><span class="option-con"><img src="<?php echo $dzsrst->base_url; ?>assets/img/type2.png"/><span class="option-label"><?php echo __("Skin Feature"); ?></span></span></li>
                    <li ><span class="option-con"><img src="<?php echo $dzsrst->base_url; ?>assets/img/type3.png"/><span class="option-label"><?php echo __("Skin Aura"); ?></span></span></li>
                    <li ><span class="option-con"><img src="<?php echo $dzsrst->base_url; ?>assets/img/type4.png"/><span class="option-label"><?php echo __("Black & White"); ?></span></span></li>
                    <li ><span class="option-con"><img src="<?php echo $dzsrst->base_url; ?>assets/img/item_skin_piadina.png"/><span class="option-label"><?php echo __("Piadina"); ?></span></span></li>
                </ul>
                <div class="sidenote"><?php echo __("The skin of the items"); ?></div>
            </div>



<!--            <div class="setting type-any ">-->
<!--                <h3>--><?php //echo __("Type"); ?><!--</h3>-->
<!--                --><?php
//
//
//                $lab = "type";
//
//
//                $arr_opts = array(
//                    array(
//                        'lab'=>__('Latest Videos'),
//                        'val'=>'latest',
//                    ),
//                    array(
//                        'lab'=>__('Most Viewed'),
//                        'val'=>'mostviewed',
//                    ),
//                    array(
//                        'lab'=>__('Most Liked'),
//                        'val'=>'mostliked',
//                    ),
//                    array(
//                        'lab'=>__("Playlist"),
//                        'val'=>'mostliked',
//                    ),
//                );
//
//
//                echo DZSHelpers::generate_select($lab, array(
//                    'options'=>$arr_opts,
//                    'class'=>'dzs-style-me skin-beige',
//                ));
//
//                ?>
<!--            </div>-->

            <?php

            // -- for future we can do a logical set like "(" .. ")" .. "AND" .. "OR"
            $dependency = array(

                array(
                    'lab'=>'type',
                    'val'=>array('video_gallery'),
                ),
            );
            
            

            ?>











            <!-- end type-container-->
        </div>
        <div class="setting  mode-any">
            <h3><?php echo __("Mode"); ?></h3>
            <?php


            $lab = "mode";


            $arr_opts = array(
                'default',
                'blocks',
                'zfolio',
                'tabs',
                'parallaxer',
            );


            echo DZSHelpers::generate_select($lab, array(
                'options'=>$arr_opts,
                'class'=>'dzs-style-me opener-listbuttons  dzs-dependency-field',
                'seekval'=>'',
            ));

            ?>
            <ul class="dzs-style-me-feeder">
                <li ><span class="option-con"><img src="<?php echo $dzsrst->base_url; ?>assets/svg/style_ullist.svg"/><span class="option-label"><?php echo __("Default"); ?></span></span></li>
                <li ><span class="option-con"><img src="<?php echo $dzsrst->base_url; ?>assets/svg/style_ullist.svg"/><span class="option-label"><?php echo __("Blocks"); ?></span></span></li>
                <li ><span class="option-con"><img src="<?php echo $dzsrst->base_url; ?>assets/svg/style_list.svg"/><span class="option-label"><?php echo __("Portfolio");?></span></span></li>
                <li ><span class="option-con"><img src="<?php echo $dzsrst->base_url; ?>assets/svg/style_list-2.svg"/><span class="option-label"><?php echo __("Tabs");?></span></span></li>
                <li ><span class="option-con"><img src="<?php echo $dzsrst->base_url; ?>assets/svg/style_list-2.svg"/><span class="option-label"><?php echo __("Parallaxer");?></span></span></li>
            </ul>
        </div>




        <div class="setting  mode-any">
            <h3><?php echo __("Post Type"); ?></h3>
            <?php


            $lab = "post_type";


            $arr_opts = array(
                array(
                    'value'=>'',
                    'label'=>__("Menu Items"),
                ),
                array(
                    'value'=>'product',
                    'label'=>__("WooCommerce Products"),
                ),
            );


            echo DZSHelpers::generate_select($lab, array(
                'options'=>$arr_opts,
                'class'=>'dzs-style-me skin-beige  dzs-dependency-field',
                'seekval'=>'',
            ));
            ?>
        </div>






        <div class="setting  mode-any" style="position:relative;">

            <select class="category-quantification-selector dzs-style-me opener-listbuttons skin-nova dzs-dependency-field " name="category_multiplication">
                <option value=""></option>
                <option value="multiple"></option>
            </select>
            <ul class="dzs-style-me-feeder">
                <li ><span class=""><?php echo __("Single Category"); ?></span></li>
                <li ><span class=""><?php echo __("Multiple Categories"); ?></span></li>
            </ul>


            <h3><?php echo __("Category"); ?></h3>
            <?php



            $taxonomy_name = 'dzsrst_items_cat';
            if(strpos($startinit,'post_type="product"')){
                $taxonomy_name = 'product_cat';
            }


//            print_r($_GET['sel']);

            $terms = get_terms( $taxonomy_name, array(
                'hide_empty' => false,
            ) );

            $lab = "term_id";

            //            print_r($terms);


            $arr_opts = array();
            foreach ($terms as $tm){

//                print_rr($tm);
                $aux = array(
                    'label'=>$tm->name,
                    'value'=>$tm->slug,
                );

                array_push($arr_opts, $aux);
            }




            echo DZSHelpers::generate_input_text($lab, array(
                'class'=>'',
                'input_type'=>'hidden',
                'seekval'=>'',
            ));

            $arr_opts_and_blank = array(
                array(
                    'label'=>__("All Categories"),
                    'value'=>'',
                )
            );

            foreach ($arr_opts as $lab=>$val){
                array_push($arr_opts_and_blank, $val);
            }

            $lab = "term_id_select";
            echo DZSHelpers::generate_select($lab, array(
                'options'=>$arr_opts_and_blank,
                'class'=>'dzs-style-me skin-beige',
                'seekval'=>'',
                'extraattr'=>' ',
            ));



            $lab = "term_id_select_multiple";
            echo DZSHelpers::generate_select($lab, array(
                'options'=>$arr_opts,
                'class'=>'make-chosen ',
                'seekval'=>'',
                'extraattr'=>' multiple',
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


        <?php




        $dependency = array(

            array(
                'element'=>'mode',
                'value'=>array('tabs'),
            ),
        )
        ;

        $aux = json_encode($dependency);

        ?>


        <div class="setting  mode-any"  data-dependency='<?php echo $aux;?>'>
            <h3><?php echo esc_html__("Tabs inner layout",'dzsrst'); ?></h3>
            <?php


            $lab = "mode_tabs_aligment";


            $arr_opts = array(
                array(
                    'value'=>'two-columns',
                    'label'=>__("Two Small Column"),
                ),
                array(
                    'value'=>'one-column',
                    'label'=>__("One Column"),
                ),
            );


            echo DZSHelpers::generate_select($lab, array(
                'options'=>$arr_opts,
                'class'=>'dzs-style-me skin-beige  dzs-dependency-field ',
                'seekval'=>'',
            ));
            ?>
        </div>



        <div class="setting  mode-any"  data-dependency='<?php echo $aux;?>'>
            <h3><?php echo esc_html__("Tabs skin",'dzsrst'); ?></h3>
		    <?php

            // -- skin for tabs

		    $lab = "mode_tabs_skin";


		    $arr_opts = array(
			    array(
				    'value'=>'skin-box skin-box-alternate',
				    'label'=>__("Skin box"),
			    ),
			    array(
				    'value'=>'skin-default',
				    'label'=>__("Alternate"),
			    ),
		    );


		    echo DZSHelpers::generate_select($lab, array(
			    'options'=>$arr_opts,
			    'class'=>'dzs-style-me skin-beige  dzs-dependency-field',
			    'seekval'=>'',
		    ));
		    ?>
        </div>




        <?php




        $dependency = array(

            array(
                'element'=>'item_skin',
                'value'=>array('rst-menu-item-skin-piadina'),
            ),

            array(
                'element'=>'item_skin',
                'value'=>array('rst-menu-item-skin-aura'),
            ),
            array(
                'element'=>'item_skin',
                'value'=>array('rst-menu-item-skin-blackwhite2'),
            ),
          'relation'=>'OR',
        )
        ;

        $aux = json_encode($dependency);

        ?>


        <div class="setting  mode-any"  data-dependency='<?php echo $aux;?>'>
            <h3><?php echo __("Layout"); ?></h3>
            <?php


            $lab = "layout";


            $arr_opts = array(
                array(
                    'value'=>'',
                    'label'=>__("Default layout"),
                ),
                array(
                    'value'=>'dzs-layout--3-cols',
                    'label'=>__("Three columns"),
                ),
                array(
                    'value'=>'dzs-layout--4-cols',
                    'label'=>__("Four columns"),
                ),
                array(
                    'value'=>'dzs-layout--5-cols',
                    'label'=>__("Five columns"),
                ),
            );


            echo DZSHelpers::generate_select($lab, array(
                'options'=>$arr_opts,
                'class'=>'dzs-style-me skin-beige  dzs-dependency-field shortcode-field',
                'seekval'=>'',
            ));
            ?>
        </div>





        <div class="setting  mode-scrollmenu">
            <h4><?php echo __("Scroll Menu Height");?></h4>
            <input class="regular-text" name="mode_scrollmenu_height" value="300"/>


        </div>



        <div class="setting  mode-zfolio">
            <h3><?php echo __("Grid skin"); ?></h3>
            <?php


            $lab = "mode_zfolio_skin";


            $arr_opts = array(
                array(
                    'value'=>'skin-forwall',
                    'label'=>__("Skin Forwall"),
                ),
                array(
                    'value'=>'skin-alba',
                    'label'=>__("Skin Alba"),
                ),
            );


            echo DZSHelpers::generate_select($lab, array(
                'options'=>$arr_opts,
                'class'=>'dzs-style-me skin-beige  dzs-dependency-field',
                'seekval'=>'',
            ));
            ?>
        </div>

        <div class="setting  mode-zfolio">
            <h3><?php echo __("Grid Gap Size"); ?></h3>
            <?php


            $lab = "mode_zfolio_gap";


            $arr_opts = array(
                array(
                    'value'=>'30px',
                    'label'=>__("30px"),
                ),
                array(
                    'value'=>'1px',
                    'label'=>__("1px"),
                ),
            );


            echo DZSHelpers::generate_select($lab, array(
                'options'=>$arr_opts,
                'class'=>'dzs-style-me skin-beige  dzs-dependency-field',
                'seekval'=>'',
            ));
            ?>
        </div>

        <div class="setting  mode-zfolio">
            <h3><?php echo __("Grid Layout"); ?></h3>
            <?php


            $lab = "mode_zfolio_layout";


            $arr_opts = array(
                array(
                    'value'=>'3columns',
                    'label'=>__("3 Columns"),
                ),
                array(
                    'value'=>'4columns',
                    'label'=>__("4 Columns"),
                ),
                array(
                    'value'=>'5columns',
                    'label'=>__("5 Columns"),
                ),
            );


            echo DZSHelpers::generate_select($lab, array(
                'options'=>$arr_opts,
                'class'=>'dzs-style-me skin-beige  dzs-dependency-field',
                'seekval'=>'',
            ));
            ?>
        </div>










        <div class="setting  mode-zfolio">
            <h3><?php echo __("Grid Enable Special Layout"); ?></h3>
            <?php


            $lab = "mode_zfolio_enable_special_layout";


            ?><div class="dzscheckbox skin-nova"><?php
            echo DZSHelpers::generate_input_checkbox($lab,array(
                'id' => $lab,
                'val' => 'on',
                'class' => ' dzs-dependency-field',));
            ?>
                <label for="<?php echo $lab; ?>"></label>
            </div>
        </div>




            <br>


        <link href='https://fonts.googleapis.com/css?family=Open+Sans:700' rel='stylesheet' type='text/css'>
        <style id="dzstabs_accordio_styling"></style>
        <div id="dzstabs_accordio" class="dzs-tabs auto-init skin-melbourne tab-menu-content-con---no-padding" data-options="{ 'design_tabsposition' : 'top'
,design_transition: 'fade'
,design_tabswidth: 'default'
,toggle_breakpoint : '10000'    
,refresh_tab_height: '2000'
,settings_appendWholeContent: true
,design_tabswidth: 'fullwidth'
,toggle_type: 'accordion'}">

            <div class="dzs-tab-tobe">
                <div class="tab-menu "><?php echo __("Linking Settings"); ?></div>
                <div class="tab-content">

                    <div class="sidenote" style="font-size:14px;"><?php echo __('Choose what clicking on the video item does','dzsrst'); ?></div>

                    <div class="linking_type-con">
                        <div class="setting  linking_type-all">
                            <h3><?php echo __("Thumbnails Links To"); ?></h3>
                            <?php


                            $lab = "item_link_thumb_con_to";


                            $arr_opts = array(
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
                            );


                            echo DZSHelpers::generate_select($lab, array(
                                'options'=>$arr_opts,
                                'class'=>'dzs-style-me skin-beige  dzs-dependency-field',
                                'seekval'=>'',
                            ));
                            ?>
                            <div class="sidenote" style=";"><?php echo sprintf(__('%sDefault%s - auto select.  %s%sUltibox%s - open the image in a lightbox. %s%sDirect link%s - will link to item.  ','dzsrst'),'<strong>','</strong>','<br>','<strong>','</strong>','<br>','<strong>','</strong>'); ?></div>
                        </div>



                        <div class="setting  linking_type-all">
                            <h3><?php echo __("Tooltip Links To"); ?></h3>
                            <?php


                            $lab = "item_link_info_to";


                            $arr_opts = array(
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
                            );


                            echo DZSHelpers::generate_select($lab, array(
                                'options'=>$arr_opts,
                                'class'=>'dzs-style-me skin-beige  dzs-dependency-field',
                                'seekval'=>'',
                            ));
                            ?>
                            <div class="sidenote" style=";"><?php echo sprintf(__('%sDefault%s - means that the item click action will depend on the mode you chose and choose its default mode.  %s%sDisable tooltip%s - open the video in a lightbox. %s%sSmall Info tooltip%s - a tooltip will appear.  ','dzsrst'),'<strong>','</strong>','<br>','<strong>','</strong>','<br>','<strong>','</strong>'); ?></div>
                        </div>

                        <div class="setting  linking_type-all">
                            <h3><?php echo __("Title Links to"); ?></h3>
                            <?php


                            $lab = "item_link_title_to";


                            $arr_opts = array(
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
                            );


                            echo DZSHelpers::generate_select($lab, array(
                                'options'=>$arr_opts,
                                'class'=>'dzs-style-me skin-beige  dzs-dependency-field',
                                'seekval'=>'',
                            ));
                            ?>
                            <div class="sidenote" style=";"><?php echo sprintf(__('%sDefault%s - means that the item click action will depend on the mode you chose and choose its default mode.  %s%sNo link%s - just the title. %s%sItem Permalink%s - links to title.  ','dzsrst'),'<strong>','</strong>','<br>','<strong>','</strong>','<br>','<strong>','</strong>'); ?></div>
                        </div>







                    </div>

                    <br>
                    <br>





                </div>
            </div>


            <div class="dzs-tab-tobe">
                <div class="tab-menu "><?php echo __("Ordering settings"); ?></div>
                <div class="tab-content">

                    <div class="sidenote" style="font-size:14px;"><?php echo __('Choose what clicking on the video item does','dzsrst'); ?></div>

                    <div class="linking_type-con">
                        <div class="setting  linking_type-all">
                            <h3><?php echo __("Order by"); ?></h3>
                            <?php


                            $lab = "orderby";


                            $arr_opts = array(
                                array(
                                    'value'=>'default',
                                    'label'=>__("Default"),
                                ),
                                array(
                                    'value'=>'title',
                                    'label'=>__("Title"),
                                ),

                            );


                            echo DZSHelpers::generate_select($lab, array(
                                'options'=>$arr_opts,
                                'class'=>'dzs-style-me skin-beige  dzs-dependency-field',
                                'seekval'=>'',
                            ));
                            ?>
                            <div class="sidenote" style=";"><?php echo sprintf(__('%sDefault%s - custom order with drag and drop.  %s%sTitle%s - by title.  ','dzsrst'),'<strong>','</strong>','<br>','<strong>','</strong>'); ?></div>
                        </div>



                        <div class="setting  linking_type-all">
                            <h3><?php echo __("Order"); ?></h3>
                            <?php


                            $lab = "order";


                            $arr_opts = array(
	                            array(
		                            'value'=>'desc',
		                            'label'=>esc_html__("Descending",'dzsrst'),
	                            ),
                                array(
                                    'value'=>'asc',
                                    'label'=>esc_html__("Ascending",'dzsrst'),
                                ),

                            );


                            echo DZSHelpers::generate_select($lab, array(
                                'options'=>$arr_opts,
                                'class'=>'dzs-style-me skin-beige  dzs-dependency-field',
                                'seekval'=>'',
                            ));
                            ?>
                            <div class="sidenote" style=";"><?php echo esc_html__("order ascending / descending",'dzsrst'); ?></div>
                        </div>









                    </div>

                    <br>
                    <br>





                </div>
            </div>









            <div class="dzs-tab-tobe">
                <div class="tab-menu ">

                    <?php

                    $lab = 'dzsrst_notice_sample_data';

                    $notice_sample_data = get_option($lab);



                    if($notice_sample_data=='seen'){


                    ?>

                        <div class="toggle-title dzstooltip-con  js for-hover" style=""><?php echo __('Sample Data'); ?><span style="text-transform: none" class="dzstooltip arrow-bottom align-left active" style=""><?php echo __("Did you know you can import sample data from the demo with one click ?")?> <a href="#" class="hide-notice" data-notice="<?php echo $lab; ?>"><?php echo __("hide"); ?></a></span></div>
                        <?php


                        }else{

                        ?>
                        <?php echo __("Sample Data"); ?>


                            <?php
                            }


                    ?>

                </div>
                <div class="tab-content">

                    <div class="sidenote-import">

                        <?php

                        if($dzsrst->sample_data){


                        ?>

                        <form class="no-style remove-sample-data" method="post"><button class="button-secondary" name="action" value="dzsrst_remove_sample_data"><?php echo ("Remove sample data"); ?></button></form> <div class="sidenote" style="font-size:14px;"><?php echo __('delete the sample data','dzsrst'); ?>
                            <?php


                        }else{


?>

                        <form class="no-style install-sample-data" method="post"><button class="button-secondary" name="action" value="dzsrst_install_sample_data"><?php echo ("Install sample data"); ?></button></form> <div class="sidenote" style="font-size:14px;"><?php echo __('sample data must first be imported for examples to work ','dzsrst'); ?>
                            <?php


                        }
                        ?>

                        </div>
                    </div>

                    <div class="dzs-container">
                        <div class="dzs-row ">
                            <div class="dzs-col-md-4">
                            <div class="feat-sample-con  import-sample import-sample-1<?php

                            if($dzsrst->sample_data==''){
    echo ' disabled';
                            }
                            ?>
">

                                <img class="feat-sample " src="http://i.imgur.com/uzl5Vc2.jpg"/>
                                <h4><?php echo __("Setup Example"); ?></h4>
                            </div>
                            </div>
                            <br>
                            <br>
                        </div>
<!--                        <div class="one-fourth ">-->
<!--                            <div class="feat-sample-con  import-sample import-sample-2">-->
<!---->
<!--                                <img class="feat-sample " src="--><?php //echo $dzsrst->base_url; ?><!--img/sample_2.jpg"/>-->
<!--                                <h4>--><?php //echo __("YouTube Channel"); ?><!--</h4>-->
<!--                            </div>-->
<!--                        </div>-->
<!---->
<!---->
<!--                        <div class="one-fourth ">-->
<!--                            <div class="feat-sample-con  import-sample import-sample-3">-->
<!---->
<!--                                <img class="feat-sample " src="--><?php //echo $dzsrst->base_url; ?><!--img/sample_3.jpg"/>-->
<!--                                <h4>--><?php //echo __("Ad Before Video"); ?><!--</h4>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="one-fourth ">-->
<!--                            <div class="feat-sample-con  import-sample import-sample-4">-->
<!---->
<!--                                <img class="feat-sample " src="--><?php //echo $dzsrst->base_url; ?><!--img/sample_4.jpg"/>-->
<!--                                <h4>--><?php //echo __("Balne Layout"); ?><!--</h4>-->
<!--                            </div>-->
<!--                        </div>-->
                    </div>



                </div>
            </div>


        </div>
        <div class="clear"></div>
        <br/>
        <br/>
        <button id="insert_tests" class="button-primary insert-tests"><?php echo __("Insert Shortcode"); ?></button>
        <div class="shortcode-output"></div>
    </div>
    <div class="feedbacker"><i class="fa fa-circle-o-notch fa-spin"></i><?php echo __(" Loading... "); ?></div>








    <div style="display:none">


        <div class="dzs-tab-tobe">
            <div class="tab-menu "><?php echo __("Description Settings"); ?></div>
            <div class="tab-content">

                <div class="sidenote" style="font-size:14px;"><?php echo __('Use these settings to control how many characters get shown from the video content.','dzsrst'); ?></div>

                <div class="setting  mode-any">
                    <h3><?php echo __("Number of Characters");?></h3>
                    <input name="desc_count" value="default"/>

                    <div class="sidenote" style=";"><?php echo __('Leave this to <strong>default</strong> in order for the number of characters to get best displayed based on the Mode.. ','dzsrst'); ?></div>
                </div>

                <br>
                <br>





            </div>
        </div>

        <div class="dzs-tab-tobe ">
            <div class="tab-menu ">
                <?php echo __("Pagination Settings"); ?>
            </div>
            <div class="tab-content">
                <div class="sidenote" style="font-size:14px;"><?php echo __('Useful if you have many videos and you want to separate them somehow.','dzsrst'); ?></div>

                <!--                <div class="setting  mode-any">-->
                <!--                    <h3>--><?php //echo __("Select a Pagination Method"); ?><!--</h3>-->
                <!--                    <select class="styleme" name="dzsrst_settings_separation_mode">-->
                <!--                        <option>normal</option>-->
                <!--                        <option>pages</option>-->
                <!--                        <option>scroll</option>-->
                <!--                        <option>button</option>-->
                <!--                    </select>-->
                <!---->
                <!--                </div>-->
                <div class="setting  mode-any">
                    <h3><?php echo __("Select Number of Items per Page");?></h3>
                    <input name="count" value="5"/>


                </div>
                <br>
                <br>
            </div>
        </div>


    </div>
</div><?php
}