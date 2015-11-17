'use strict';
angular.module('test')
    .factory('AuthenticationService', function ($http, $cookieStore, $rootScope, ApiService) {
        var $scope = {};

        $scope.Login = Login;
        $scope.SetCredentials = SetCredentials;
        $scope.GetCurrentUser = GetCurrentUser;
        $scope.Unauthorize = ClearCredentials;
        $scope.SetToken = SetToken;

        return $scope;

        function Login(email, password, callback) {
            $http({
                    method: "POST",
                    url: "/api/login",
                    data: {
                        email: email,
                        pass: password
                    }
                })
                .then(function (response) {
                    callback(response);
                }, function (response) {
                    callback(response);
                });
        }

        function SetToken(token, time) {
            $rootScope.globals.token = token;
            $rootScope.globals.timeLogin = time;

            $http.defaults.headers.common['Authorization'] = token;
        }

        function GetCurrentUser(token, callback) {
            $http({
                    method: "GET",
                    url: "/api/me",
                    headers: {
                        'Authorization': token
                    }
                })
                .then(function (response) {
                    callback(response);
                }, function (response) {
                    callback(response);
                });
        };

        function SetCredentials(id, email, tel, name) {

            $rootScope.globals.currentUser = {
                id: id,
                email: email,
                tel: tel,
                name: name
            };

            $cookieStore.put('globals', $rootScope.globals);
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common['Authorization'] = 'Basic ';
        }

    });
