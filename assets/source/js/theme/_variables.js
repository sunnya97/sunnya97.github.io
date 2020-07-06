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