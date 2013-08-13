define([
	'jquery',
	'lodash',
	'backbone',
    'templates'
],

function ($, _, Backbone, templates) {
	'use strict';

	var api_root = "/api/";

	$.fn.conditionalAppend = function (selector, markup) {
	    if ($(selector).length <= 0) {
	        this.append(markup);
	    }
	};

	$.fn.conditionalPrepend = function (selector, markup) {
	    if ($(selector).length <= 0)
	        this.prepend(markup);
	};

    // Setup cache.
	window.cache = {};

	return {
	    templates: templates,
		modules: {},
		module: function(props) {
			return _.extend({ Views: {} }, props);
		},

		view: function(selector, url, renderDelegate) {

			var View = Backbone.View.extend({
				el: selector,
				render: renderDelegate
			});

		    return new View({ model: this.model(url) });
		},
	    
        model: function (url) {
            var Model = Backbone.Model.extend({ url: api_root + url, });
            return new Model();
        },

        fetch: function (model, options) {
            options.contentType = 'application/json';
            options.data = JSON.stringify(
                _.extend({ authToken: '' }, options.data));
            return model.fetch(options);
        },

        events: _.extend({}, Backbone.Events),

        cache: function (key, item) {
            if (typeof item == 'undefined' || item == null) {
                // No value specified, return the item matching the key from cache.
                return window.cache[key];
            }

            // Store the value in cache.
            window.cache[key] = item;

            return undefined;
        }
	};
});