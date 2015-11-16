'use strict';
angular.module('test').controller('NavCtrl', function ($scope, $rootScope, $location, AuthenticationService, $route) {
    $scope.isLogged = $rootScope.isLogged;

    $scope.$watch(function () {
        return $rootScope.globals.currentUser;
    }, function () {
        $scope.name = $scope.name = (!!$rootScope.globals.currentUser) ? $rootScope.globals.currentUser.name : ("");
    }, true);

    $scope.$watch(function () {
        return $rootScope.isLogged;
    }, function () {
        $scope.isLogged = $rootScope.isLogged;
    }, true);

    $scope.logout = function () {
        AuthenticationService.Unauthorize();
        $location.path('/');
        $route.reload();
    }
});
