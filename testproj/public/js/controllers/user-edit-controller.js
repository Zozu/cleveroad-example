'use strict';
angular.module('test').controller('UserEditController', function ($scope, $location, ApiService, $rootScope, AuthenticationService) {
    $scope.user = {};
    $scope.user.id = $rootScope.globals.currentUser.id;
    $scope.init = function () {
        ApiService.GetUserById($scope.user.id).then(function (res) {
            if (res.status == 200) {
                $scope.user = res.data;
                $scope.saveUser = function () {
                    ApiService.UserSave($scope.user).then(function (response) {
                        if (response.status == 200) {
                            $scope.user = response.data;
                            $scope.errors = null;
                            AuthenticationService.SetCredentials($scope.user.id, $scope.user.email, $scope.user.tel, $scope.user.name);
                            $location.path('/');
                        } else if (response.status == 422) {
                            $scope.errors = response.data;
                        }
                    });
                }
            }
        });
    }();
});
