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