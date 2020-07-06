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