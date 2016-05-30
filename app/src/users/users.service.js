(function(){

    'use strict';

	angular
        .module('churchdeskApp.users')
        .service('userService', userService);

    userService.$inject = ['$http', '$q', 'API_URL', 'User'];

    function userService($http, $q, API_URL, User) {
		var service = {
		    getUser: getUser,
		    getUserRepos: getUserRepos,
		    getUserFollowers: getUserFollowers,
            getUsers: getUsers,
        };

        return service;

        function getUsers() {
            return User.query().$promise.then(function (data) {
                return {users: mapUsers(data)};
            });
        }

        function getUser(username) {
            return User.get({username: username}).$promise.then(function (userData) {
                return mapUser(userData);
            });
        }

        function getUserRepos(username) {
            var userDataPromise = getUser(username);

            return userDataPromise.then(function(userData){
                return $http.get(userData.reposUrl).then(function (reposData) {
                    return {user: userData, repos: mapRepos(reposData)};
                });
            });
        }

        function getUserFollowers(username) {
            var userDataPromise = getUser(username);

            return userDataPromise.then(function(userData){
                return $http.get(userData.followersUrl).then(function (followersData) {
                    return {user: userData, followers: mapFollowers(followersData)};
                });
            });
        }

        function mapUsers(usersData){
            return _.map(usersData, function (user) {
                return {
                    login: user.login,
                    avatar_url: user.avatar_url,
                    site_admin: user.site_admin
                };
            });
        }

        function mapUser(userData){
            return {
                name: userData.name,
                login: userData.login,
                avatarUrl: userData.avatar_url,
                repoCount: userData.public_repos,
                reposUrl: userData.repos_url,
                followersUrl: userData.followers_url
            };
        }

        function mapRepos(reposData) {
            return _.map(reposData.data, function (data) {
                return {
                    name: data.name,
                    description: data.description,
                    stars: data.stargazers_count,
                    forks: data.forks_count,
                    created_at: data.created_at,
                    updated_at: data.updated_at
                };
            });
        }

        function mapFollowers(followersData) {
            return _.map(followersData.data, function (data) {
                return {
                    login: data.login,
                    avatar_url: data.avatar_url,
                    site_admin: data.site_admin
                };
            });
        }
    }
})();


