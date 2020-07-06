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