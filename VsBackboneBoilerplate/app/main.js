require.config({
    baseUrl: '/app/',
    paths: {
        
        // Libraries
        jquery: '/assets/js/libs/jquery',
        lodash: '../assets/js/libs/lodash',
        backbone: '/assets/js/libs/backbone',
        handlebars: '/assets/js/libs/handlebars',

        // Plug-Ins
        signalr: '/assets/js/plugins/jquery.signalr',

        // Supplements
        hubs: '/signalr/hubs?v=',
        templates: '/bundle/templates/?v='
    },
    
    shim: {
        backbone: {
            deps: ['lodash', 'jquery'],
            exports: 'Backbone'
        },

        handlebars: {
            exports: 'Handlebars'
        },
        
        templates: {
            deps: ['handlebars'],
            exports: 'JST'
        },
        
        signalr: ['jquery'],
        hubs: ['jquery', 'signalr']
    },
    
    urlArgs: 'd=' + (new Date()).getTime()
});

require(['app', 'jquery'], function(Portal, $) {
    $('body').conditionalAppend('div#main', '<div id="main"></div>');
});

require([
    // Global Application
    'app',
    
    // Libraries
    'jquery',
    'lodash',
    'backbone',
    
    // Modules
    'modules/dashboard'
],

function (App, $, _, Backbone, DashboardModule) {
    var Router = Backbone.Router.extend({
        routes: {
            '*path': 'defaultRoute'
        },
        initialize: function () {
            App.events.on('domchange:title', this.onDomChangeTitle, this);
            this.dashboardRouter = new DashboardModule.Router();
        },

        defaultRoute: function () {
            alert('Request view not found.');
        },
        
        onDomChangeTitle: function (title) {
            $(document).attr('title', title);
        }
    });

    $(function() {

        // Initialize Router
        var app = new Router();
        var pushState = (typeof history.pushState === 'function');

        // Start History
        Backbone.history.start({ pushState: pushState, silent: true });

        // Translate URLs generated in a browser supporting pushState
        // but are being opened in a browser that doesn't (and vice versa).
        if (pushState) {
            Backbone.history.loadUrl(Backbone.history.getFragment());
        }
        else {
            var rootLength = Backbone.history.options.root.length;
            var fragment = window.location.pathname.substr(rootLength);
            Backbone.history.navigate(fragment, { trigger: true });
        }
    });

    // Override default link behavior
    if (Backbone.history && Backbone.history._hasPushState) {
        $(document).delegate("a", "click", function (e) {

            var href = $(this).attr("href");
            if ((href.indexOf('#') + 1) == href.length) {
                e.preventDefault();
                return;
            }

            var target = $(this).attr('target');
            if (target == '_top' || target == '_blank') {
                return;
            }

            var protocol = this.protocol + "//";

            if (href.slice(protocol.length) !== protocol) {
                e.preventDefault();
                Backbone.history.navigate(href, true);
            }
        });
    }
});