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

