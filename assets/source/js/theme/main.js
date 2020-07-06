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