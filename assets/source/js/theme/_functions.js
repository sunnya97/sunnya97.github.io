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