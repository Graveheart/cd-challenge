(function() {
    'use strict';
    angular
        .module('churchdeskApp.users')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
			{
	            state: 'users',
	            config: {
	                url: '/users/',
	                templateUrl: '/users/views/users.html',
	                controller: 'UsersController',
	                controllerAs: 'vm',
	                resolve: {
	                    userService: 'userService',
	                    data: function (userService) {
	                        return userService.getUsers();
	                    },
	                }
	            },
            },
            {
	            state: 'followers',
	            config: {
	                url: '/user/:username/followers',
	                templateUrl: '/users/views/users.html',
	                controller: 'UsersController',
	                controllerAs: 'vm',
	                resolve: {
	                    userService: 'userService',
	                    data: function (userService, $stateParams, $q) {
	                        var username = $stateParams.username;
	                        return userService.getUserFollowers(username);
	                    },
	                }
	            }
            },
            {
                state: 'repos',
                config: {
                    url: '/user/:username/repos',
                    templateUrl: '/users/views/repos.html',
                    controller: 'ReposController',
                    controllerAs: 'vm',
                    resolve: {
                        userService: 'userService',
                        data: function (userService, $stateParams, $q) {
                            var username = $stateParams.username;
                            return userService.getUserRepos(username);
                        },
                    }
                }
            }
        ];
    }
})();