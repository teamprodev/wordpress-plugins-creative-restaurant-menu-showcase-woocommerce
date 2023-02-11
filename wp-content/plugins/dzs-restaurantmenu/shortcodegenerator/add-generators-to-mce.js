console.log('ceva alceva');

window.htmleditor_sel = 'notset';
window.mceeditor_sel = 'notset';
window.dzsrst_widget_shortcode = null;

jQuery(document).ready(function($){
    if(typeof(dzsrst_settings)=='undefined'){
        if(window.console){ console.log('dzsrst_settings not defined'); };
        return;
    }







    $('#wp-content-media-buttons').append('<button type="button" id="dzsrst-shortcode-generator" class="dzs-shortcode-button button " data-editor="content"><span class="the-icon"><svg height="20.412px" style="enable-background:new 0 0 30 20.412;" version="1.1" viewBox="0 0 30 20.412" width="30px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="table_setting"><g><path d="M4.5,1.165c-0.276,0-0.5,0.224-0.5,0.5v3.651c0,0.776-0.687,1.432-1.5,1.432S1,6.093,1,5.316V1.665    c0-0.276-0.224-0.5-0.5-0.5S0,1.389,0,1.665v3.651c0,1.341,1.122,2.432,2.5,2.432S5,6.658,5,5.316V1.665    C5,1.389,4.776,1.165,4.5,1.165z" style="fill:#575756;"/><path d="M2.5,6.165c0.276,0,0.5-0.224,0.5-0.5v-4c0-0.276-0.224-0.5-0.5-0.5S2,1.389,2,1.665v4    C2,5.941,2.224,6.165,2.5,6.165z" style="fill:#575756;"/><path d="M3.5,8.165c-0.276,0-0.5,0.224-0.5,0.5v10.096c0,0.261-0.224,0.473-0.5,0.473    c-0.28,0-0.5-0.208-0.5-0.473V8.665c0-0.276-0.224-0.5-0.5-0.5S1,8.389,1,8.665v10.096c0,0.813,0.673,1.473,1.5,1.473    S4,19.573,4,18.761V8.665C4,8.389,3.776,8.165,3.5,8.165z" style="fill:#575756;"/><path d="M28.491,0.84c-0.769,0-1.343,0.553-1.503,1.461l-1.046,7.657c-0.029,0.214,0.082,0.423,0.276,0.518    L27,10.854v8.029c0,0.857,0.659,1.528,1.5,1.528s1.5-0.671,1.5-1.528V2.369C30,1.511,29.337,0.84,28.491,0.84z M29,18.884    c0,0.312-0.206,0.528-0.5,0.528S28,19.195,28,18.884v-8.342c0-0.191-0.109-0.366-0.281-0.45l-0.736-0.357l0.993-7.279    c0.05-0.281,0.18-0.616,0.516-0.616C28.786,1.84,29,2.062,29,2.369V18.884z" style="fill:#575756;"/><path d="M15.5,3.404c-3.518,0-6.379,2.808-6.379,6.26c0,3.452,2.861,6.261,6.379,6.261    c3.516,0,6.376-2.809,6.376-6.261C21.876,6.212,19.016,3.404,15.5,3.404z M15.5,14.925c-2.966,0-5.379-2.36-5.379-5.261    s2.413-5.26,5.379-5.26c2.964,0,5.376,2.359,5.376,5.26S18.464,14.925,15.5,14.925z" style="fill:#575756;"/><path d="M15.5,0c-5.435,0-9.856,4.335-9.856,9.664c0,5.33,4.421,9.666,9.856,9.666    c5.435,0,9.857-4.336,9.857-9.666C25.356,4.335,20.935,0,15.5,0z M15.5,18.33c-4.883,0-8.856-3.888-8.856-8.666    C6.644,4.887,10.616,1,15.5,1s8.857,3.887,8.857,8.664C24.356,14.442,20.383,18.33,15.5,18.33z" style="fill:#575756;"/></g></g><g id="Warstwa_1"/></svg></span> <span class="the-label"> '+dzsrst_settings.translate_add_shortcode+'</span></button>');



    $('#wp-content-media-buttons').append('<button type="button" id="dzsrst-shortcode-generator-header" class="dzs-shortcode-button button " data-editor="content"><span class="the-icon"><svg enable-background="new 0 0 512 512" height="512px" id="Reception_Bell" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><circle cx="256" cy="256" fill="#7E5144" id="Background" r="256"/><path d="M497.437,170.751l-75.449-48.878l-28.395,35.677l-8.417,8.063l-7.722-15.985l-38.175,34.501  l169.882,110.053c1.863-12.458,2.838-25.208,2.838-38.183C511.999,226.108,506.855,197.421,497.437,170.751L497.437,170.751z   M507.678,302.992L282.627,157.201L80.568,348.77l239.491,155.144C415.567,479.295,489.498,400.922,507.678,302.992L507.678,302.992  z" id="_Shadow" opacity="0.1"/><g id="Reception_Bell_1_"><g id="Reception_Bell_2_"><polygon fill="#969594" id="_119550352" points="245.778,161.38 266.223,161.38 266.223,179.407 245.778,179.407   "/><path d="M231.32,156.643h49.361c2.029,0,3.688,1.659,3.688,3.688v6.376    c0,2.027-1.659,3.688-3.688,3.688H231.32c-2.028,0-3.687-1.659-3.687-3.688v-6.376    C227.633,158.301,229.291,156.643,231.32,156.643z" fill="#C2C1C1" id="_119550448"/><path d="M256,176.578c88.029,0,159.415,71.388,159.415,159.416H96.584    C96.584,247.965,167.972,176.578,256,176.578L256,176.578z" fill="#DEDEDD" id="_119550544"/><path d="M82.586,322.741h346.827c2.501,0,4.545,2.044,4.545,4.545v17.415    c0,2.5-2.044,4.545-4.545,4.545H82.586c-2.5,0-4.545-2.045-4.545-4.545v-17.415C78.041,324.785,80.085,322.741,82.586,322.741z" fill="#AAA9A9" id="_119550640"/><path d="M238.589,186.627c-22.054,22.927-69.107,47.487-78.743,117.773h-34.708    C139.859,221.4,191.479,190.177,238.589,186.627L238.589,186.627z" fill="#FFFFFF" id="_119550736"/></g><g id="Effects"><polygon fill="#FFFFFF" id="_119551240" points="339.28,184.13 379.511,138.73 386.926,158.285 421.987,121.875 386.926,183.681     376.139,157.834   "/><path d="M88.882,309.193c0,1.719-1.395,3.113-3.113,3.113c-1.719,0-3.114-1.395-3.114-3.113    c0.033-16.948,5.647-37.432,14.965-55.923c8.777-17.419,20.887-33.174,34.78-42.685c1.422-0.97,3.364-0.604,4.333,0.818    s0.604,3.364-0.818,4.333c-12.98,8.887-24.386,23.788-32.727,40.342C94.28,273.756,88.914,293.215,88.882,309.193L88.882,309.193z    " fill="#FFFFFF" id="_119551336"/><path d="M426.325,309.193c0,1.719-1.396,3.113-3.113,3.113c-1.719,0-3.113-1.395-3.113-3.113    c-0.032-15.979-5.398-35.438-14.306-53.115c-8.341-16.554-19.746-31.455-32.727-40.342c-1.422-0.97-1.788-2.912-0.818-4.333    s2.911-1.788,4.333-0.818c13.893,9.511,26.002,25.266,34.779,42.685C420.678,271.762,426.292,292.245,426.325,309.193    L426.325,309.193z" fill="#FFFFFF" id="_119551432"/><path d="M76.124,276.895c-0.444,1.664-2.157,2.654-3.821,2.211    c-1.664-0.445-2.654-2.157-2.21-3.821c2.117-7.898,5.028-15.935,8.605-23.719c3.502-7.623,7.64-14.987,12.286-21.727    c0.977-1.416,2.918-1.771,4.334-0.793c1.416,0.977,1.771,2.918,0.794,4.334c-4.447,6.449-8.404,13.491-11.75,20.774    C80.953,261.578,78.164,269.283,76.124,276.895L76.124,276.895z" fill="#FFFFFF" id="_119551528"/><path d="M438.887,275.284c0.444,1.664-0.546,3.376-2.21,3.821    c-1.664,0.443-3.376-0.547-3.82-2.211c-2.04-7.611-4.828-15.316-8.239-22.74c-3.347-7.283-7.303-14.326-11.75-20.775    c-0.977-1.416-0.622-3.358,0.794-4.334s3.357-0.623,4.334,0.794c4.646,6.739,8.784,14.104,12.286,21.726    C433.858,259.349,436.771,267.386,438.887,275.284L438.887,275.284z" fill="#FFFFFF" id="_119551624"/></g></g></svg></span> <span class="the-label"> '+dzsrst_settings.translate_add_shortcode_header+'</span></button>');




    $('#dzsrst-shortcode-generator').bind('click', function(){
        //tb_show('ZSVG Shortcodes', dzsrst_settings.thepath + 'tinymce/popupiframe.php?width=630&height=800');


        var parsel = '';
        if(jQuery('#wp-content-wrap').hasClass('tmce-active') && window.tinyMCE ){

            //console.log(window.tinyMCE.activeEditor);
            var ed = window.tinyMCE.activeEditor;
            var sel=ed.selection.getContent();

            if(sel!=''){
                parsel+='&sel=' + encodeURIComponent(sel);
                window.mceeditor_sel = sel;
            }else{
                window.mceeditor_sel = '';
            }
            //console.log(aux);


            window.htmleditor_sel = 'notset';


        }else{




            var textarea = document.getElementById("content");
            var start = textarea.selectionStart;
            var end = textarea.selectionEnd;
            var sel = textarea.value.substring(start, end);

            //console.log(sel);

            //textarea.value = 'ceva';
            if(sel!=''){
                parsel+='&sel=' + encodeURIComponent(sel);
                window.htmleditor_sel = sel;
            }else{
                window.htmleditor_sel = '';
            }

            window.mceeditor_sel = 'notset';
        }

        window.open_ultibox(null,{

            type: 'iframe'
            ,source: dzsrst_settings.shortcode_generator_url + parsel
            ,scaling: 'fill' // -- this is the under description
            ,suggested_width: 800 // -- this is the under description
            ,suggested_height: 600 // -- this is the under description
            ,item: null // -- we can pass the items from here too

        })



        return false;
    })

    $('#dzsrst-shortcode-generator-header').bind('click', function(){
        //tb_show('ZSVG Shortcodes', dzsrst_settings.thepath + 'tinymce/popupiframe.php?width=630&height=800');


        var parsel = '';
        if(jQuery('#wp-content-wrap').hasClass('tmce-active') && window.tinyMCE ){

            //console.log(window.tinyMCE.activeEditor);
            var ed = window.tinyMCE.activeEditor;
            var sel=ed.selection.getContent();

            if(sel!=''){
                parsel+='&sel=' + encodeURIComponent(sel);
                window.mceeditor_sel = sel;
            }else{
                window.mceeditor_sel = '';
            }
            //console.log(aux);


            window.htmleditor_sel = 'notset';


        }else{




            var textarea = document.getElementById("content");
            var start = textarea.selectionStart;
            var end = textarea.selectionEnd;
            var sel = textarea.value.substring(start, end);

            //console.log(sel);

            //textarea.value = 'ceva';
            if(sel!=''){
                parsel+='&sel=' + encodeURIComponent(sel);
                window.htmleditor_sel = sel;
            }else{
                window.htmleditor_sel = '';
            }

            window.mceeditor_sel = 'notset';
        }

        window.open_ultibox(null,{

            type: 'iframe'
            ,source: dzsrst_settings.shortcode_generator_header_url + parsel
            ,scaling: 'fill' // -- this is the under description
            ,suggested_width: 800 // -- this is the under description
            ,suggested_height: 600 // -- this is the under description
            ,item: null // -- we can pass the items from here too

        })

        return false;
    })




    $(document).delegate('.btn-shortcode-generator-dzsrst-showcase','click', function(){
        var _t = $(this);
        var parsel = '';

        console.info(_t.prev());

        if(_t.prev().hasClass('shortcode-generator-target')){

            window.dzsrst_widget_shortcode = _t.prev();
            parsel+='&sel=' + encodeURIComponent(_t.prev().val());
        }


        window.dzszb_open(dzsrst_settings.shortcode_showcase_generator_url+parsel, 'iframe', {bigwidth: 1200, bigheight: 700,forcenodeeplink: 'on', dims_scaling: 'fill'});

        return false;
    })
})