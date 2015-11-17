'use strict';
angular.module('test').controller('ItemController', function ($scope, $location, ApiService, $route) {
    $scope.item = {}
    $scope.user = {}
    $scope.item.id = $route.current.params.id;
    $scope.init = function () {
        ApiService.GetItemById($scope.item.id).then(function (response) {
            if (response.status == 200) {
                $scope.item.title = response.data._title;
                $scope.item.time =  response.data._time;
                $scope.item.price = response.data._price ;
                $scope.item.image =  response.data._image;
                $scope.user.id =  response.data._user;
                ApiService.GetUserById($scope.user.id).then(function (res) {
                    if (response.status == 200) {
                        $scope.user.name = res.data.name;
                        $scope.user.phone =  res.data.tel;
                        $scope.user.email = res.data.email ;
                    } else if (response.status == 422) {
                    $scope.errors = res.data;
                }
                });
            } else if (response.status == 422) {
                    $scope.errors = response.data;
                }
        });
    };
    $scope.init();

});
