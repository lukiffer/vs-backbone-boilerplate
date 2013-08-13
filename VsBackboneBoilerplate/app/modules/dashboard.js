define([
	'app',
	'jquery',
	'lodash',
	'backbone',
    'hubs'
],

function (App, $, _, Backbone) {
    'use strict';

	var DashboardModule = App.module();

    // Setup Router
	DashboardModule.Router = Backbone.Router.extend({
	    initialize: function () {
	        this.on('route', function () {
	            App.events.trigger('navigate:interior', null);
	        });
	    },
	    routes: {
	        '' : 'index'
	    },
	    index: function () {
	        App.events.trigger('domchange:title', 'Dashboard');

	        DashboardModule.Views.Index.render();
	    }
	});

    //VIEW: Index
	DashboardModule.Views.Index = App.view('#main', 'example', function () {
	    var that = this;
	    this.options.model.fetch({
	        type: 'GET',
	        success: function (result) {
	            // Render result from Web API
	            that.$el.html(App.templates['dashboard/index'](result.attributes));
	            
                // Setup SignalR Hub
	            var hub = $.connection.exampleHub;
	            hub.client.process = function (hubtext) {
	                $('#hub_result').text(hubtext);
	            };

	            $.connection.hub.start().done(function() {
	                $('#hub_button').click(function () {
	                    hub.server.example();
	                });
	            });
	        },
	        error: function(e) {
	            console.log(e);
	        }
	    });
    });

	return DashboardModule;
});