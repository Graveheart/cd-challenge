(function(){

    'use strict';

	angular.module('churchdeskApp.users').controller('UsersController', UsersController);

	UsersController.$inject = ['$scope', 'userService', '$state','data'];

	function UsersController($scope, userService, $state, data) {
		var vm = this;

		init();

		function init() {
			vm.heading = '';
			if (data.user) {
				vm.user = data.user;
				vm.users = data.followers;
				vm.heading = 'Followers of '+vm.user.login;
			}
			else {
				vm.users = data.users;
				vm.heading = 'Github Users';
			}

			vm.viewFollowers = viewFollowers;
			vm.viewRepos = viewRepos;
		}

		function viewFollowers(user) {
			$state.go('followers', {username: user.login});
		}

		function viewRepos(user) {
            $state.go('repos', {username: user.login});
        }
	}

})();


