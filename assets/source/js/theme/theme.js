// Theme Variables
var ace = {
    html: '',
    body: '',
    mobile: '',

    sidebar: {
        obj: '',
        btn: ''
    },

    nav: {
        obj: '',
        tooltip: $('<div class="crt-tooltip"></div>')
    },

    overlay: {
        obj: $('<div id="crt-overlay"></div>')
    },

    progress: {
        lines: '',
        charts: '',
        bullets: ''
    }
};


$(function () { // start: document ready

    /**
     * Certy Init Main Vars
     */
    ace.html = $('html');
    ace.body = $('body');

    /**
     * Certy Detect Device Type
     */
    ace_detect_device_type();

    /**
     * Certy Mobile Navigation
     */
    $('#crt-main-nav-sm .has-sub-menu > a').on('click touchstart', function(){
        if( $(this).hasClass('hover') ){
            return true;
        } else {
            $(this).addClass('hover');
            $(this).next().slideDown(500);
            return false;
        }
    });

    /**
     * Certy Sidebar
     */
    ace.sidebar.obj = $('#crt-sidebar');
    ace.sidebar.btn = $('#crt-sidebar-btn');

    // Open Sidebar
    ace.sidebar.btn.on('touchstart click', function () {
        ace_open_sidebar();
    });

    // Close Sidebar Through Overlay
    $(document).on('touchstart click', '.crt-sidebar-opened #crt-overlay', function (e) {
        var container = ace.sidebar.obj;
        // if the target of the click isn't the container... nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            ace_close_sidebar();
        }
    });

    // Close Sidebar Using Button
    $('#crt-sidebar-close').on('click', function () {
        ace_close_sidebar();
    });

    // Sidebar Custom Scroll
    $("#crt-sidebar-inner").mCustomScrollbar({
        axis: "y",
        theme: "minimal-dark",
        autoHideScrollbar: true,
        scrollButtons: { enable: true }
    });

    /**
     * Certy Circle & Line Charts
     */
    if(!certy.progress.animation || ace.mobile) {
        // Circle Chart
        ace.progress.charts = $('.progress-chart .progress-bar');
        for (var i = 0; i < ace.progress.charts.length; i++) {
            var chart = $(ace.progress.charts[i]);

            ace_progress_chart(chart[0], chart.data('text'), chart.data('value'), 1);
        }

        // Line Chart
        ace.progress.lines = $('.progress-line .progress-bar');
        for (var i = 0; i < ace.progress.lines.length; i++) {
            var line = $(ace.progress.lines[i]);

            ace_progress_line(line[0], line.data('text'), line.data('value'), 1);
        }
    }

    /**
     * Certy Animate Elements
     */
    if(certy.progress.animation && !ace.mobile) {
        ace_appear_elems($('.crt-animate'), 150);
    }

    /**
     * Code Highlight
     */
    $('pre').each(function (i, block) {
        hljs.highlightBlock(block);
    });

    /**
     * Certy Alerts
     */
    $('.alert .close').on('click', function () {
        var alert = $(this).parent();

        alert.fadeOut(500, function () {
            alert.remove();
        });
    });

    /**
     * Certy Slider
     */
    $('.slider').slick({
        dots: true
    });

    /**
     * Certy Google Map Initialisation
     */
    if ($('#map').length > 0) {
        initialiseGoogleMap();
    }

    /**
     *  Tabs
     */
    var tabActive = $('.tabs-menu>li.active');
    if( tabActive.length > 0 ){
        for (var i = 0; i < tabActive.length; i++) {
            var tab_id = $(tabActive[i]).children().attr('href');

            $(tab_id).addClass('active').show();
        }
    }

    $('.tabs-menu a').on('click', function(e){
        var tab = $(this);
        var tab_id = tab.attr('href');
        var tab_wrap = tab.closest('.tabs');
        var tab_content = tab_wrap.find('.tab-content');

        tab.parent().addClass("active");
        tab.parent().siblings().removeClass('active');
        tab_content.not(tab_id).removeClass('active').hide();
        $(tab_id).addClass('active').fadeIn(500);

        e.preventDefault();
    });

    /**
     * ToggleBox
     */
    var toggleboxActive = $('.togglebox>li.active');
    if( toggleboxActive.length > 0 ){
        toggleboxActive.find('.togglebox-content').show();
    }

    $('.togglebox-header').on('click', function(){
        var toggle_head = $(this);

        toggle_head.next('.togglebox-content').slideToggle(300);
        toggle_head.parent().toggleClass('active');
    });


    /**
     * Accordeon
     */
    var accordeonActive = $('.accordion>li.active');
    if( accordeonActive.length > 0 ){
        accordeonActive.find('.accordion-content').show();
    }

    $('.accordion-header').on('click', function(){
        var acc_head = $(this);
        var acc_section = acc_head.parent();
        var acc_content = acc_head.next();
        var acc_all_contents = acc_head.closest('.accordion').find('.accordion-content');

        if(acc_section.hasClass('active')){
            acc_section.removeClass('active');
            acc_content.slideUp();
        }else{
            acc_section.siblings().removeClass('active');
            acc_section.addClass('active');
            acc_all_contents.slideUp(300);
            acc_content.slideDown(300);
        }
    });

    /**
     * Comments Open/Close
     */
    $('.comment-replys-link').on('click', function(){
        $(this).closest('.comment').toggleClass('show-replies');

        return false;
    });

    /**
     * Portfolio Popup
     */
    var pf_popup = {};
    pf_popup.wrapper = null;
    pf_popup.content = null;
    pf_popup.slider = null;

    pf_popup.open = function ( el ){
        // Append Portfolio Popup
        this.wrapper = $('<div id="pf-popup-wrap" class="pf-popup-wrap">'+
        '<div class="pf-popup-inner">'+
        '<div class="pf-popup-middle">'+
        '<div class="pf-popup-container">'+
        '<button id="pf-popup-close"><i class="rsicon rsicon-close"></i></button>'+
        '<div id="pf-popup-content" class="pf-popup-content"></div>'+
        '</div>'+
        '</div>'+
        '</div>');

        ace.body.append(this.wrapper);

        // Add Portfolio Popup Items
        this.content = $('#pf-popup-content');
        this.content.append( el.clone() );

        // Make Portfolio Popup Visible
        pf_popup.wrapper.addClass('opened');
        ace_lock_scroll();
    };

    pf_popup.close = function(){
        this.wrapper.removeClass('opened');
        setTimeout(function(){
            pf_popup.wrapper.remove();
            ace_unlock_scroll();
        }, 500);
    };

    // Open Portfolio Popup
    $(document).on('click', '.pf-btn-view', function() {
        var id = $(this).attr('href');
        pf_popup.open( $(id) );

        ace.html.addClass('crt-portfolio-opened');

        return false;
    });

    // Close Portfolio Popup
    $(document).on('touchstart click', '.crt-portfolio-opened #pf-popup-wrap', function (e) {
        var container = $('#pf-popup-content');

        // if the target of the click isn't the container... nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            pf_popup.close();
            ace.html.removeClass('crt-portfolio-opened');
        }
    });

    /**
     * Show Code <pre>
     */
    $('.toggle-link').on('click', function(){
        var id = $(this).attr('href');

        if($(this).hasClass('opened')){
            $(id).slideUp(500);
            $(this).removeClass('opened');
        } else {
            $(id).slideDown(500);
            $(this).addClass('opened');
        }

        return false;
    });

    /**
     * Share Button
     */
    $('#btn-share').on( "mouseenter", function(){
        $(this).parent().addClass('hovered');
    });

    $('.crt-share-box').on( "mouseleave", function(){
        var share_box = $(this);

        if(share_box.hasClass('hovered')){
            share_box.addClass('closing');
            setTimeout(function() {
                share_box.removeClass('hovered');
                share_box.removeClass('closing');
            },300);
        }
    });

}); // end: document ready