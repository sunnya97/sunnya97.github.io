/**
 * Certy Options
 */
var certy = {
    vars: {
        // Set theme rtl mode
        rtl: false,

        // Set theme primary color
        themeColor: '#c0e3e7',

        // Set middle screen size, must have the same value as in the _variables.scss
        screenMd: '992px'
    },

    nav: {
        height: 'auto', // use 'auto' or some fixed value, for example 480px
        arrow: false, // activate arrow to scroll down menu items,
        sticky: {
            top: 10, // sticky position from top
            active: true // activate sticky property on window scroll
        },
        tooltip: {
            active: true
        }
    },

    sideBox: {
        sticky: {
            top: 20, // sticky position from top
            active: true // activate sticky property on window scroll
        }
    },

    progress: {
        animation: true, // animate on window scroll
        textColor: 'inherit', // set text color
        trailColor: 'rgba(0,0,0,0.07)' // set trail color
    }
};
/**
 * Certy Global vars
 */
certy.initGlobalVars = function(){
    // get document <html>
    this.vars.html = $('html');

    // get document <body>
    this.vars.body = $('body');

    // get document #footer
    this.vars.footer = $('#crt-footer');

    // get window Width
    this.vars.windowW = $(window).width();

    // get window height
    this.vars.windowH = $(window).height();

    // get window scroll top
    this.vars.windowScrollTop = $(window).scrollTop();

    // detect device type
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        this.vars.mobile = true;
        this.vars.html.addClass('mobile');
    } else {
        this.vars.mobile = false;
        this.vars.html.addClass('desktop');
    }
};
/**
 * Certy Functions
 */

/* Lock Window Scroll */
certy.lockScroll = function(){
    var initWidth = certy.vars.html.outerWidth();
    var initHeight = certy.vars.body.outerHeight();

    var scrollPosition = [
        self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    ];

    certy.vars.html.data('scroll-position', scrollPosition);
    certy.vars.html.data('previous-overflow', certy.vars.html.css('overflow'));
    certy.vars.html.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    var marginR = certy.vars.body.outerWidth() - initWidth;
    var marginB = certy.vars.body.outerHeight() - initHeight;
    certy.vars.body.css({'margin-right': marginR, 'margin-bottom': marginB});
    certy.vars.html.addClass('lock-scroll');
};

/* Unlock Window Scroll */
certy.unlockScroll = function(){
    certy.vars.html.css('overflow', certy.vars.html.data('previous-overflow'));
    var scrollPosition = certy.vars.html.data('scroll-position');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    certy.vars.body.css({'margin-right': 0, 'margin-bottom': 0});
    certy.vars.html.removeClass('lock-scroll');
};

/* Detect Device Type */
function ace_detect_device_type() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        ace.mobile = true;
        ace.html.addClass('crt-mobile');
    } else {
        ace.mobile = false;
        ace.html.addClass('crt-desktop');
    }
}

/* Certy Overlay */
function ace_append_overlay() {
    ace.body.append(ace.overlay.obj);

    // Make the element fully transparent
    ace.overlay.obj[0].style.opacity = 0;

    // Make sure the initial state is applied
    window.getComputedStyle(ace.overlay.obj[0]).opacity;

    // Fade it in
    ace.overlay.obj[0].style.opacity = 1;
}

function ace_remove_overlay() {
    // Fade it out
    ace.overlay.obj[0].style.opacity = 0;

    // Remove overlay
    ace.overlay.obj.remove();
}

/* Certy Lock Scroll */
function ace_lock_scroll() {
    var initWidth = ace.html.outerWidth();
    var initHeight = ace.body.outerHeight();

    var scrollPosition = [
        self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    ];

    ace.html.data('scroll-position', scrollPosition);
    ace.html.data('previous-overflow', ace.html.css('overflow'));
    ace.html.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    var marginR = ace.body.outerWidth() - initWidth;
    var marginB = ace.body.outerHeight() - initHeight;
    ace.body.css({'margin-right': marginR, 'margin-bottom': marginB});
    ace.html.addClass('crt-lock-scroll');
}

/* Certy Unlock Scroll */
function ace_unlock_scroll() {
    ace.html.css('overflow', ace.html.data('previous-overflow'));
    var scrollPosition = ace.html.data('scroll-position');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    ace.body.css({'margin-right': 0, 'margin-bottom': 0});
    ace.html.removeClass('crt-lock-scroll');
}

/* Certy Close Sidebar */
function ace_open_sidebar() {
    ace.html.addClass('crt-sidebar-opened');
    ace_append_overlay();
    ace_lock_scroll();
}

function ace_close_sidebar() {
    ace.html.removeClass('crt-sidebar-opened');
    ace_remove_overlay();
    ace_unlock_scroll();
}

/* Certy Progress Circle */
function ace_progress_chart(element, text, value, duration) {
    var circle = new ProgressBar.Circle(element, {
        color: certy.vars.themeColor,
        strokeWidth: 5,
        trailWidth: 0,
        text: {
            value: text,
            className: 'progress-text',
            style: {
                top: '50%',
                left: '50%',
                color: certy.progress.textColor,
                position: 'absolute',
                margin: 0,
                padding: 0,
                transform: {
                    prefix: true,
                    value: 'translate(-50%, -50%)'
                }
            },
            autoStyleContainer: true,
            alignToBottom: true
        },
        svgStyle: {
            display: 'block',
            width: '100%'
        },
        duration: duration,
        easing: 'easeOut'
    });

    circle.animate(value); // Number from 0.0 to 1.0
}

/* Certy Progress Line */
function ace_progress_line(element, text, value, duration) {
    var line = new ProgressBar.Line(element, {
        strokeWidth: 4,
        easing: 'easeInOut',
        duration: duration,
        color: certy.vars.themeColor,
        trailColor: certy.progress.trailColor,
        trailWidth: 4,
        svgStyle: {
            width: '100%',
            height: '100%'
        },
        text: {
            value: text,
            className: 'progress-text',
            style: {
                top: '-25px',
                right: '0',
                color: certy.progress.textColor,
                position: 'absolute',
                margin: 0,
                padding: 0,
                transform: {
                    prefix: true,
                    value: 'translate(0, 0)'
                }
            },
            autoStyleContainer: true
        }
    });

    line.animate(value);  // Number from 0.0 to 1.0
}

/* Certy Element In Viewport */
function ace_is_elem_in_viewport(el, vpart) {
    var rect = el[0].getBoundingClientRect();

    return (
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.top + vpart <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function ace_is_elems_in_viewport(elems, vpart) {
    for (var i = 0; i < elems.length; i++) {
        var item = $(elems[i]);

        if (item.hasClass('crt-animate') && ace_is_elem_in_viewport(item, vpart)) {
            item.removeClass('crt-animate').addClass('crt-animated');

            // Animate Circle Chart
            if(item.hasClass('progress-chart')){
                var chart = item.find('.progress-bar');
                ace_progress_chart(chart[0], chart.data('text'), chart.data('value'), 1000);
            }

            // Animate Line Chart
            if(item.hasClass('progress-line')){
                var line = item.find('.progress-bar');
                ace_progress_line(line[0], line.data('text'), line.data('value'), 1000);
            }
        }
    }
}

function ace_appear_elems(elems, vpart) {
    ace_is_elems_in_viewport(elems, vpart);

    $(window).scroll(function () {
        ace_is_elems_in_viewport(elems, vpart);
    });

    $(window).resize(function () {
        ace_is_elems_in_viewport(elems, vpart);
    });
}

/* Certy Google Map */
function initialiseGoogleMap() {
    var latlng;
    var lat = 44.5403;
    var lng = -78.5463;
    var map = $('#map');
    var mapCanvas = map.get(0);
    var map_styles = [
        {"elementType": "labels.text", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [
            {"color": "#f5f5f2"},
            {"visibility": "on"}
        ]},
        {"featureType": "administrative", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "transit", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "poi.attraction", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [
            {"color": "#ffffff"},
            {"visibility": "on"}
        ]},
        {"featureType": "poi.business", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "poi.medical", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "poi.place_of_worship", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "poi.school", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "poi.sports_complex", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "road.highway", "elementType": "geometry", "stylers": [
            {"color": "#ffffff"},
            {"visibility": "simplified"}
        ]},
        {"featureType": "road.arterial", "stylers": [
            {"visibility": "simplified"},
            {"color": "#ffffff"}
        ]},
        {"featureType": "road.highway", "elementType": "labels.icon", "stylers": [
            {"color": "#ffffff"},
            {"visibility": "off"}
        ]},
        {"featureType": "road.highway", "elementType": "labels.icon", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "road.arterial", "stylers": [
            {"color": "#ffffff"}
        ]},
        {"featureType": "road.local", "stylers": [
            {"color": "#ffffff"}
        ]},
        {"featureType": "poi.park", "elementType": "labels.icon", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "poi", "elementType": "labels.icon", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "water", "stylers": [
            {"color": "#71c8d4"}
        ]},
        {"featureType": "landscape", "stylers": [
            {"color": "#e5e8e7"}
        ]},
        {"featureType": "poi.park", "stylers": [
            {"color": "#8ba129"}
        ]},
        {"featureType": "road", "stylers": [
            {"color": "#ffffff"}
        ]},
        {"featureType": "poi.sports_complex", "elementType": "geometry", "stylers": [
            {"color": "#c7c7c7"},
            {"visibility": "off"}
        ]},
        {"featureType": "water", "stylers": [
            {"color": "#a0d3d3"}
        ]},
        {"featureType": "poi.park", "stylers": [
            {"color": "#91b65d"}
        ]},
        {"featureType": "poi.park", "stylers": [
            {"gamma": 1.51}
        ]},
        {"featureType": "road.local", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "road.local", "elementType": "geometry", "stylers": [
            {"visibility": "on"}
        ]},
        {"featureType": "poi.government", "elementType": "geometry", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "landscape", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "road", "elementType": "labels", "stylers": [
            {"visibility": "off"}
        ]},
        {"featureType": "road.arterial", "elementType": "geometry", "stylers": [
            {"visibility": "simplified"}
        ]},
        {"featureType": "road.local", "stylers": [
            {"visibility": "simplified"}
        ]},
        {"featureType": "road"},
        {"featureType": "road"},
        {},
        {"featureType": "road.highway"}
    ];

    if (map.data("latitude")) lat = map.data("latitude");
    if (map.data("longitude")) lng = map.data("longitude");

    latlng = new google.maps.LatLng(lat, lng);

    // Map Options
    var mapOptions = {
        zoom: 14,
        center: latlng,
        scrollwheel: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: map_styles
    };

    // Create the Map
    map = new google.maps.Map(mapCanvas, mapOptions);

    /*var marker = new Marker({
     map: map,
     position: latlng,
     icon: {
     path: SQUARE_PIN,
     fillColor: '',
     fillOpacity: 0,
     strokeColor: '',
     strokeWeight: 0
     },
     map_icon_label: '<span class="map-icon map-icon-postal-code"></span>'
     });*/

    // Keep Marker in Center
    google.maps.event.addDomListener(window, 'resize', function () {
        map.setCenter(latlng);
    });
}
/**
 * Certy Navigation
 */

// Navigation With Scroll and Arrow
certy.nav.initScroll = function( el ){
    // Set Nav Height
    // certy.nav.scroll = el;

    el.height(el.height()).animate({height: certy.nav.height}, 700, function(){

        // Mouse Scroll
        el.mCustomScrollbar({
            axis: "y",
            scrollbarPosition: "outside"
        });
    });

    // Arrow Scroll
    if (certy.nav.arrow){
        $("#crt-nav-tools").removeClass('hidden');

        $("#crt-nav-arrow").on("click", function () {
            el.mCustomScrollbar('scrollTo', '-='+certy.nav.height);
        });
    }
};

// Sticky Navigation
certy.nav.exists = false;
certy.nav.makeSticky = function(){

    // check sticky option, device type and screen size
    if ( this.sticky.active && !certy.vars.mobile && Modernizr.mq('(min-width: ' + certy.vars.screenMd + ')') ) {

        // check if nav nodes exists
        if ( this.exists ){

            // check if window scroll pass element
            if ( certy.vars.windowScrollTop > this.wrap.offset().top ) {
                this.el.css({
                    'top': this.sticky.top + 'px',
                    'left': this.wrap.offset().left,
                    'width': this.wrap.width(),
                    'bottom': 'auto',
                    'position': 'fixed'
                });
            } else {
                this.el.css({
                    'top': '0',
                    'left': 'auto',
                    'width': 'auto',
                    'bottom': 'auto',
                    'position': 'relative'
                });
            }
        } else {
            this.el = $('#crt-nav-inner');
            this.wrap = $('#crt-nav-wrap');

            if ( this.el.length > 0 && this.wrap.length > 0 ) {
                this.exists = true;
            }
        }
    }
};

// Navigation Tooltips
certy.nav.tooltip.timer = 0;
certy.nav.tooltip.el = '';

certy.nav.tooltip.show = function(current){
    certy.nav.tooltip.timer = setTimeout(function () {

        certy.nav.tooltip.el = $('<div class="crt-tooltip"></div>');

        // Init vars
        var top = current.offset().top;
        var left = current.offset().left;
        var right = left + current.outerWidth();
        var width = current.outerWidth();
        var height = 0; //(ace.nav.tooltip.height() - $(this).height() )/2;

        // Append tooltip
        certy.vars.body.append( certy.nav.tooltip.el );

        // Set tooltip text
        certy.nav.tooltip.el.text( current.data('tooltip') );

        // Positioning tooltip
        if (right + certy.nav.tooltip.el.outerWidth() < certy.vars.windowW) {
            certy.nav.tooltip.el.addClass('arrow-left').css({"left": right + "px", "top": (top + height) + "px"});
        } else {
            certy.nav.tooltip.el.addClass('arrow-right text-right').css({
                "left": (left - certy.nav.tooltip.el.outerWidth() - 10) + "px",
                "top": (top + height) + "px"
            });
        }

        // Show Tooltip
        certy.nav.tooltip.el.fadeIn(150);

    }, 150);
};

certy.nav.tooltip.hide = function(){
    clearTimeout(certy.nav.tooltip.timer);
    if (certy.nav.tooltip.el.length > 0) {
        certy.nav.tooltip.el.fadeOut(150, function () {
            certy.nav.tooltip.el.remove();
        });
    }
};
/**
 * Certy Side Box
 */
certy.sideBox.exists = false;
certy.sideBox.makeSticky = function(){

    // check sticky option, device type and screen size
    if ( this.sticky.active && !certy.vars.mobile && Modernizr.mq('(min-width: ' + certy.vars.screenMd + ')') ) {

        // check if nav nodes exists
        if ( this.exists ){

            // check if window scroll pass element
            if ( certy.vars.windowScrollTop > this.wrap.offset().top ) {
                this.el.css({
                    'top': this.sticky.top + 'px',
                    'left': this.wrap.offset().left,
                    'width': this.wrap.width(),
                    'bottom': 'auto',
                    'position': 'fixed'
                });
            } else {
                this.el.css({
                    'top': '0',
                    'left': 'auto',
                    'width': 'auto',
                    'bottom': 'auto',
                    'position': 'relative'
                });
            }
        } else {
            this.el = $('#crt-side-box');
            this.wrap = $('#crt-side-box-wrap');

            if ( this.el.length > 0 && this.wrap.length > 0 ) {
                this.exists = true;
            }
        }
    }
};
/**
 * Certy Slider
 */

// Slider
certy.slider = function(slider){
    for (var i = 0; i < slider.length; i++) {

       if( $(slider[i]).data("init") != "none" ){
           $(slider[i]).slick();
       }
    }
};

// Carousel
certy.carousel = function(carousel){
    for (var i = 0; i < carousel.length; i++) {
        if( $(carousel[i]).data("init") !== "none" ){
            $(carousel[i]).slick({
                "dots" : true
            });
        }
    }
};


/**
 * Certy Portfolio
 */

certy.portfolio = {};

certy.portfolio.initGrid = function(el){
    // isotope initialization
    var grid = el.isotope({
        isOriginLeft: !certy.vars.rtl,
        itemSelector: '.pf-grid-item',
        percentPosition: true,
        masonry: {
            columnWidth: '.pf-grid-sizer'
        }
    });

    // layout isotope after each image loads
    grid.imagesLoaded().progress( function() {
        grid.isotope('layout');
    });

    // isotope filter
    var filter = el.closest('.pf-wrap').find('.pf-filter');
    if (filter.length > 0) {
        var filter_btn = filter.find('button');
        var filter_btn_first = $('.pf-filter button:first-child');

        filter_btn_first.addClass('active');

        filter_btn.on('click', function () {
            filter_btn.removeClass('active');
            $(this).addClass('active');

            var filterValue = $(this).attr('data-filter');
            grid.isotope({ filter: filterValue });
        });
    }
};

certy.portfolio.openPopup = function(el){
    // add opened class on html
    certy.vars.html.addClass('cr-portfolio-opened');

    // append portfolio popup
    this.popup_wrapper = $('<div id="pf-popup-wrap">'+
        '<div class="pf-popup-inner">'+
        '<div class="pf-popup-middle">'+
        '<div class="pf-popup-container">'+
        '<button id="pf-popup-close"><i class="rsicon rsicon-close"></i></button>'+
        '<div id="pf-popup-content" class="pf-popup-content"></div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>');

    certy.vars.body.append( this.popup_wrapper );

    // add portfolio popup content
    this.popup_content = $('#pf-popup-content');
    this.popup_content.append( el.clone() );

    // add slick slider
    $('#pf-popup-content .pf-popup-media').slick({
        dots: true,
        arrows: false
    });

    $('#pf-popup-content .pf-rel-list').slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });

    // make portfolio popup visible
    this.popup_wrapper.addClass('pf-opened');

    // lock window scroll
    certy.lockScroll();
};

certy.portfolio.closePopup = function(el){
    // remove opened class from html
    certy.vars.html.removeClass('cr-portfolio-opened');

    // make portfolio popup invisible
    this.popup_wrapper.removeClass('pf-opened');

    setTimeout(function(){
        certy.portfolio.popup_wrapper.remove();
        certy.unlockScroll();
    }, 500);
};

(function ($) {
    "use strict";

    $(function () { // start: document ready

        /**
         *  Set Global Vars
         */
        certy.initGlobalVars();

        /**
         *  Navigation
         */
        if (certy.vars.html.hasClass('crt-nav-on')) { // Check If Nav Exists

            // Scrolled Navigation ( large screens )
            if ( Modernizr.mq('(min-width: '+certy.vars.screenMd+')') && certy.nav.height !== 'auto' ) {
                certy.nav.initScroll( $('#crt-nav-scroll') );
            }

            // Sticky Navigation
            certy.nav.makeSticky();

            // Navigation Tooltips
            if(certy.nav.tooltip.active){
                $('#crt-nav a').hover(function () {
                    certy.nav.tooltip.show( $(this) );
                },function () {
                    certy.nav.tooltip.hide();
                });
            };

            // Anchor Navigation
            $('#crt-nav').onePageNav({
                changeHash: true,
                filter: ':not(.external)'
            });
        }

        /**
         *  Fixed Side Box
         */
        certy.sideBox.makeSticky();

        /** Portfolio */
        var pf_grid = $('.pf-grid');

        if (pf_grid.length > 0) {

            // init portfolio grid
            certy.portfolio.initGrid(pf_grid);

            // open portfolio popup
            $(document).on('click', '.pf-project', function() {
                var id = $(this).attr('href');

                certy.portfolio.openPopup( $(id) );

                return false;
            });

            // close portfolio popup
            $(document).on('touchstart click', '.cr-portfolio-opened #pf-popup-wrap', function (e) {
                var container = $('#pf-popup-content');

                // if the target of the click isn't the container... nor a descendant of the container
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    certy.portfolio.closePopup();
                }
            });
        }

        /** Components */
        // init sliders
        certy.slider( $(".cr-slider") );

        // init carousel
        certy.carousel( $(".cr-carousel") );

        console.log(certy);
    }); // end: document ready



    $(window).on('resize', function () { // start: window resize

        // Re Init Vars
        certy.vars.windowW = $(window).width();
        certy.vars.windowH = $(window).height();
        certy.vars.windowScrollTop = $(window).scrollTop();

        // Sticky Navigation
        certy.nav.makeSticky();

        // Sticky Side Box
        certy.sideBox.makeSticky();

    }); // end: window resize



    $(window).on('scroll', function () { // start: window scroll

        // Re Init Vars
        certy.vars.windowScrollTop = $(window).scrollTop();

        // Sticky Navigation
        certy.nav.makeSticky();

        // Sticky Side Box
        certy.sideBox.makeSticky();

        // Remove Tooltip
        if(certy.nav.tooltip.el.length > 0){
            certy.nav.tooltip.el.remove();
        }

    }); // end: window scroll



    $(window).on('load', function () { // start: window load

    }); // end: window load

})(jQuery);
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

// Contact Form
$(function() {	
	
	function isValidEmail(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    };
	
	/** Contact Form */
	$('.crtFormSubmit').on('click', function (e) {
		
		var crtForm = $(this).closest('.contact-form');
		var crtFormErrocrt = false;
		var crtFormAction = crtForm.attr('action');	
		var crtFormFields = crtForm.find('.form-group');		           	
		var crtFormName = crtForm.find("[name='crtName']");						
		var crtFormEmail = crtForm.find("[name='crtEmail']");
		var crtFormMessage = crtForm.find("[name='crtMessage']");			
		var crtFormResponce = crtForm.find('.crtFormResponce');			
		var crtFormPrivacy = crtForm.find("[name='crtPivacyPolicy']");
		
		// Reset form errocrt
		crtFormFields.removeClass('error');
		crtFormErrocrt = false;

		// Validate form fields	
		if(!crtFormName.val()) {
			crtFormErrocrt = true;
			crtFormName.parent().addClass('error');
		}
		if(!crtFormPrivacy.prop('checked')) {
			crtFormErrocrt = true;
			crtFormPrivacy.parent().addClass('error');
		}
		
		if(!crtFormEmail.val() || !isValidEmail(crtFormEmail.val())) {
			crtFormErrocrt = true;
			crtFormEmail.parent().addClass('error');
		}
		
		if(!crtFormMessage.val()) {
			crtFormErrocrt = true;
			crtFormMessage.parent().addClass('error');
		}
								
		if(crtFormErrocrt) {
			// if has errocrt - do nothing
			return false;
		} else {	
			$.post( crtFormAction,
					crtForm.serialize(),
					function (response) {
						var data = jQuery.parseJSON( response );
						if(data){								
							crtForm.append('<div class="crtFormResponce"><strong>Congratulation!</strong><br>Your email was sent successfully!</div>');
						} else {
							crtForm.append('<div class="crtFormResponce"><strong>OOPS!</strong> Something went wrong.<br>Please try again.</div>');
						}							
					}
				);
			return false;
		}					                         
	});
})
