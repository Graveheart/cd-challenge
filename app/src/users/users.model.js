(function(){
    'use strict';

	angular.module('churchdeskApp.users')
        .provider('User', function() {
	        this.$get = ['$resource','API_URL', function($resource, API_URL) {
	            var User = $resource(API_URL+'users/:username');

	            return User;
            }];
        });
})();


