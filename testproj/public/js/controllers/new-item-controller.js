'use strict';
angular.module('test').controller('NewItemController', function ($scope, $location, ApiService, Upload) {
    $scope.item = {};
    $scope.text_button = "Create item";
    $scope.page_title = "Create item"

    $scope.submitItem = function () {
        ApiService.CreateItem($scope.item).then(function (response) {
            if (response.status == 200) {
                if ($scope.file) {
                    $scope.item.id = response.data._id;
                    $scope.item.title = response.data._title;
                    $scope.item.time =  response.data._time;
                    $scope.item.price = response.data._price ;
                    $scope.item.image = response.data._image;
                    ApiService.UploadImage($scope.item.id, $scope.file).then(function (result) {
                        if (result.status == 200) {
                            $scope.uploadError = null;
                            ApiService.EditItem($scope.item.id, $scope.item).then(function (res) {
                                if (res.status == 200) {
                                    $location.path('/user/items');
                                } else if (res.status == 422) {
                                    $scope.errors = res.data;
                                }
                            });
                        } else {
                            $scope.uploadError = "Can't upload image";
                            $scope.file = null;
                        }
                    });
                } else {
                    $location.path('/user/items');
                }
                $scope.deleteImage = function () {
                    $scope.item.image = "";
                    $scope.file = null;
                }
            } else if (response.status == 422) {
                $scope.errors = response.data;
            }
        });
    }

});
