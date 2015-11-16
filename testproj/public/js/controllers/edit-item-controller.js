'use strict';
angular.module('test').controller('EditItemController', function ($scope, $location, ApiService, $routeParams, Upload) {
    $scope.item = {};
    $scope.item.id = $routeParams.id;
    $scope.text_button = "Save";
    $scope.page_title = "Edit item";
    $scope.init = function () {
        ApiService.GetItemById($scope.item.id).then(function (response) {
            console.log(response.data);
            console.log(response.status);
            if (response.status == 200) {
                $scope.item.title = response.data.title;
                $scope.item.created_at =  response.data.created_at;
                $scope.item.price = response.data.price ;
                $scope.item.image =  response.data.image;
                $scope.toggle = 2;
                $scope.submitItem = function () {
                    ApiService.EditItem($scope.item.id, $scope.item).then(function (res) {
                        console.log(res);
                        console.log(res.status);
                        if (res.status == 200) {
                            $location.path('/user/items');
                        } else if (res.status == 422) {
                            $scope.errors = res.data;
                            console.log($scope.errors);
                        }
                    });
                };
                /*$scope.$watch('files', function () {
                    $scope.upload($scope.files);
                });*/
            } else if (response.status == 422) {
                $scope.errors = response.data;
                console.log($scope.errors);
            }
        });
    };


    $scope.init();
});
