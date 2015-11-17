'use strict';
angular.module('test').controller('MainController', function ($scope, $location, $rootScope, ApiService) {
    $scope.$watch(function () {
        return $rootScope.isLogged;
    }, function () {
        $scope.init();
    });
    $scope.init = function () {
        $scope.logged = $rootScope.isLogged;
        if (!$scope.logged) {
            $scope.leftTitle = "Sign in";
            $scope.leftTextH4 = "You may sign in to the system for add own items!";
            $scope.leftTextH5 = "Click here for enter login form!";

            $scope.middleTitle = "Welcome!!!";
            $scope.middleTextH4_1 = "Enjoy us!";
            $scope.middleTextH4_2 = "It's a power and simple tool to sale your useless items!";
            $scope.middleTextH5 = "Click here to explore!";

            $scope.rightTitle = "Registrate";
            $scope.rightTextH4 = "If you haven't account, you can register now!";
            $scope.rightTextH5 = "Click here and join us!";

            $scope.performLeftClick = function () {
                $location.path("/login");
            };
            $scope.performMiddleClick = function () {
                $location.path("/catalog");
            };
            $scope.performRightClick = function () {
                $location.path("/registration");
            };
        } else {
            $scope.leftTitle = (!!$rootScope.globals.currentUser) ? $rootScope.globals.currentUser.name : "";
            $scope.leftTextH4 = "You can edit your credentials!";
            $scope.leftTextH5 = "Click here for edit user info!";

            $scope.middleTitle = "Hello!!!";
            $scope.middleTextH4_1 = "";
            $scope.middleTextH4_2 = "Do you want to buy some cookies? :)";
            $scope.middleTextH5 = "Click here!";
            $scope.rightTitle = "Your items";
            $scope.rightTextH4 = "Add, edit and remove your items!";
            $scope.rightTextH5 = "Click here!";

            $scope.performLeftClick = function () {
                $location.path("/user/edit");
            };
            $scope.performMiddleClick = function () {
                $location.path("/catalog");
            };
            $scope.performRightClick = function () {
                $location.path("/user/items");
            };
        }
    };
    $scope.init();
});
