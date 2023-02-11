<?php

//print_r($this->db_mainoptions);


//        print_r($this->db_mainoptions);
?>

<div class="wrap">
    <h2><?php echo __('Restaurant Menu Settings', 'dzsrst'); ?></h2>
    <br/>

    <form class="mainsettings">

        <a class="zoombox button-secondary" href="<?php echo $this->base_url; ?>readme/index.html"
           data-bigwidth="1100" data-scaling="fill"
           data-bigheight="700"><?php echo __("Documentation"); ?></a>

        <a href="<?php echo admin_url('admin.php?page='.$this->pagename_mainoptions.'&dzsrst_shortcode_generator=on'); ?>" target="_blank"
           class="button-secondary action"><?php _e('Showcase Shortcode Generator', 'dzsrst'); ?></a>


        <?php
        do_action('dzsrst_db_mainoptions_before_tabs');
        ?>

        <h3><?php echo __("Admin Options"); ?></h3>

        <div class="dzs-tabs auto-init" data-options="{ 'design_tabsposition' : 'top'
                ,design_transition: 'fade'
                ,design_tabswidth: 'default'
                ,toggle_breakpoint : '400'
                 ,toggle_type: 'accordion'
                 ,toggle_type: 'accordion'
                         ,settings_enable_linking : 'on'
                 ,settings_appendWholeContent: true
                 ,refresh_tab_height: '1000'
                 }">

            <div class="dzs-tab-tobe">
                <div class="tab-menu with-tooltip">
                    <i class="fa fa-tachometer"></i> <?php echo __("Settings"); ?>
                </div>
                <div class="tab-content">
                    <br>


                    <div class="setting">

                        <?php
                        $lab = 'always_embed';
                        echo DZSHelpers::generate_input_text($lab, array('id' => $lab, 'val' => 'off', 'input_type' => 'hidden'));
                        ?>
                        <h4 class="setting-label"><?php echo __('Always Embed Scripts?', 'dzsapp'); ?></h4>
                        <div class="dzscheckbox skin-nova">
                            <?php
                            echo DZSHelpers::generate_input_checkbox($lab, array('id' => $lab, 'val' => 'on', 'seekval' => $this->db_mainoptions[$lab])); ?>
                            <label for="<?php echo $lab; ?>"></label>
                        </div>
                        <div
                            class="sidenote"><?php echo __('by default scripts and styles from this gallery are included only when needed for optimizations reasons, but you can choose to always use them ( useful for when you are using a ajax theme that does not reload the whole page on url change )', 'dzsapp'); ?></div>
                    </div>


                    <div class="setting">

                        <?php
                        $lab = 'embed_fonts';
                        echo DZSHelpers::generate_input_text($lab, array('id' => $lab, 'val' => 'off', 'input_type' => 'hidden'));
                        ?>
                        <h4 class="setting-label"><?php echo __('Embed Fonts?', 'dzsapp'); ?></h4>
                        <div class="dzscheckbox skin-nova">
                            <?php
                            echo DZSHelpers::generate_input_checkbox($lab, array('id' => $lab, 'val' => 'on', 'seekval' => $this->db_mainoptions[$lab])); ?>
                            <label for="<?php echo $lab; ?>"></label>
                        </div>
                        <div
                            class="sidenote"><?php echo __('embed the google fonts that restaurant menu uses in the preview', 'dzsapp'); ?></div>
                    </div>





                    <!-- end general settings -->


                </div>
            </div>

            <div class="dzs-tab-tobe tab-disabled">
                <div class="tab-menu ">
                    &nbsp;&nbsp;
                </div>
                <div class="tab-content">

                </div>
            </div>




            <div class="dzs-tab-tobe">
                <div class="tab-menu with-tooltip">
                    <i class="fa fa-paint-brush"></i> <?php echo __("Appearance") ?>
                </div>
                <div class="tab-content">
                    <br>

                    <?php
                    $lab = 'currency_sign';
                    ?>
                    <div class="setting">
                        <h4 class="setting-label"><?php echo __('Currency Sign', 'dzsp'); ?></h4>
                        <?php echo DZSHelpers::generate_input_text($lab, array( 'seekval' => $this->db_mainoptions[$lab])); ?>
                        <div class="sidenote"><?php echo __('choose an optional currency sign to prepend the price', 'dzsp'); ?></div>
                    </div>


                    <div class="setting">
                        <h4 class="setting-label"><?php echo __('Extra CSS', 'dzsp'); ?></h4>
                        <?php echo DZSHelpers::generate_input_textarea('extra_css', array('val' => '', 'seekval' => $this->db_mainoptions['extra_css'])); ?>
                        <div class="sidenote"><?php echo __('', 'dzsp'); ?></div>
                    </div>

                </div>
            </div>


            



            <!-- system check -->
            <div class="dzs-tab-tobe tab-disabled">
                <div class="tab-menu ">
                    &nbsp;&nbsp;
                </div>
                <div class="tab-content">

                </div>
            </div>

            <div class="dzs-tab-tobe">
                <div class="tab-menu with-tooltip">
                    <i class="fa fa-gear"></i> <?php echo __("System Check"); ?>
                </div>
                <div class="tab-content">
                    <br>



                    <div class="setting">

                        <h4 class="setting-label">GetText <?php echo __("Support"); ?></h4>


                        <?php
                        if (function_exists("gettext")) {
                            echo '<div class="setting-text-ok"><i class="fa fa-thumbs-up"></i> '.''.__("supported").'</div>';
                        } else {

                            echo '<div class="setting-text-notok">'.''.__("not supported").'</div>';
                        }
                        ?>

                        <div class="sidenote"><?php echo __('translation support'); ?></div>
                    </div>


                    <div class="setting">

                        <h4 class="setting-label">ZipArchive <?php echo __("Support"); ?></h4>


                        <?php
                        if (class_exists("ZipArchive")) {
                            echo '<div class="setting-text-ok"><i class="fa fa-thumbs-up"></i> '.''.__("supported").'</div>';
                        } else {

                            echo '<div class="setting-text-notok">'.''.__("not supported").'</div>';
                        }
                        ?>

                        <div class="sidenote"><?php echo __('zip making for album download support'); ?></div>
                    </div>
                    <div class="setting">

                        <h4 class="setting-label">Curl <?php echo __("Support"); ?></h4>


                        <?php
                        if (function_exists('curl_version')) {
                            echo '<div class="setting-text-ok"><i class="fa fa-thumbs-up"></i> '.''.__("supported").'</div>';
                        } else {

                            echo '<div class="setting-text-notok">'.''.__("not supported").'</div>';
                        }
                        ?>

                        <div class="sidenote"><?php echo __('for making youtube / vimeo api calls'); ?></div>
                    </div>



                    <div class="setting">

                        <h4 class="setting-label"><?php echo __("PHP Version"); ?></h4>

                        <div class="setting-text-ok">
                            <?php
                            echo phpversion();
                            ?>
                        </div>

                        <div class="sidenote"><?php echo __('the install php version, 5.4 or greater required for facebook api'); ?></div>
                    </div>



                    <div class="setting">

                        <h4 class="setting-label"><?php echo __("SSL Version"); ?></h4>

                        <div class="setting-text-ok">
                            <?php
//                            echo $this->main_settings['ssl_protocol'];
                            ?>
                        </div>

                        <div class="sidenote"><?php echo __('the ssl version - will be needed for correct communication to PayPal'); ?></div>
                    </div>



                    <div class="setting">

                        <h4 class="setting-label"><?php echo __("TLS Version"); ?></h4>

                        <div class="setting-text-ok">
                            <?php
//                            echo $this->main_settings['tls_protocol'];
                            ?>
                        </div>

                        <div class="sidenote"><?php echo __('the tls version - will be needed for correct communication to PayPal'); ?></div>
                    </div>







                </div>
            </div>
            <!-- system check END -->

        </div><!-- end .dzs-tabs -->


        <?php


        do_action('dzsrst_db_mainoptions_extra');
        ?>
        <br/>
        <a href='#'
           class="button-primary dzsrst-mo-save-db_mainoptions"><?php echo __('Save Options', 'dzsrst'); ?></a>
    </form>
    <br/><br/>

    <br/>

    <div class="saveconfirmer" style=""><img alt="" style="" id="save-ajax-loading2"
                                             src="<?php echo site_url(); ?>/wp-admin/images/wpspin_light.gif"/>
    </div>
</div>
<div class="clear"></div><br/>
<?php
