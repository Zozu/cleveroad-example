'use strict';
angular.module('test').controller('ItemController', function ($scope, $location, ApiService, $route) {
    $scope.item = {}
    $scope.user = {}
    $scope.item.id = $route.current.params.id;
    $scope.init = function () {
        ApiService.GetItemById($scope.item.id).then(function (response) {
            if (response.status == 200) {
                $scope.item.title = response.data.title;
                $scope.item.created_at =  response.data.created_at;
                $scope.item.price = response.data.price ;
                $scope.item.image =  response.data.image;
                $scope.user.id =  response.data.user_id;
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
