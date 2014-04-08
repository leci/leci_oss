require.config({
    baseUrl: './web/js',
    shim: {
        'jQuery': {
            exports: '$'
        },
        'Underscore': {
            exports: '_'
        },
        'Backbone': {
            deps: ['Underscore', 'jQuery'],
            exports: 'Backbone'
        },
        'Bootstrap': {
            deps: ['jQuery']
        },
        'JST': {
            exports: 'JST'
        }
    },
    packages: ["skeleton", "misc", "config", "app"],
    paths: {
        requireLib : '../../public/components/requirejs/require',
        jQuery: '../../public/components/jquery/jquery',
        Underscore: '../../public/components/underscore/underscore',
        Backbone: '../../public/components/backbone/backbone',
        Bootstrap: '../../public/components/bootstrap/js/bootstrap',
        Holder: '../../public/components/holderjs/holder',
        JST: '../../public/build/js/templates',
        jQueryCustom: 'jquery.custom'
    },
    deps: ['app', 'misc'],
    callback: function(){},
    preserveLicenseComments: false
});