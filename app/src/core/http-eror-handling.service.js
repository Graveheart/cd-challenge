(function () {
    "use strict";
    angular.module('churchdeskApp.core')
	.factory('httpRequestInterceptor', ['$q', 'toaster', function ($q, toaster) {
	    return {
	        'responseError': function(rejection) {
	            switch (rejection.status) {
	            	case 404:
	            	    toaster.pop('error', "", 'Item is not found.');
	            		break;
	            	case 419:
	            	    toaster.pop('error', "", 'Your session has expired. Please log in again.');
	            		this.expiredSession = true;
	            		break;
	            	default:
	            		var message = "Error";
	            		if (rejection.data && rejection.data.message) {
	            			message = rejection.data.message;
	            		}
                        else if (rejection.statusText) {
                            message = rejection.statusText;
                        }
                        toaster.pop('error', "", message);
	            		break;
	            }
	            return $q.reject(rejection);
	         }
	     };
	}])
  	.config(['$httpProvider', function($httpProvider) {
  		$httpProvider.defaults.transformResponse.push(function (data, headerGetter) {
  		  	return data;
  		});
  	  	$httpProvider.interceptors.push('httpRequestInterceptor');
  	}]);
})();