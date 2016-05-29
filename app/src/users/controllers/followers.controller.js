(function(){

    'use strict';

	angular.module('churchdeskApp.users').controller('ReposController', ReposController);

	ReposController.$inject = ['$scope', 'userService', '$state','data'];

	function ReposController($scope, userService, $state, data) {
		var vm = this;

		init();

		function init() {
			vm.user = data.user;
			vm.repos = data.repos;

			console.warn(data);
		}
	}

})();


