'use strict';
angular.module('test').controller('NewItemController', function ($scope, $location, ApiService) {
    $scope.item = {};
    $scope.text_button = "Create item";
    $scope.page_title = "Create item"

    $scope.submitItem = function () {
        ApiService.CreateItem($scope.item).then(function (response) {
            if (response.status == 200) {
                $location.path("/user/items");
            } else if (response.status == 422) {
                $scope.errors = response.data;
            }
        });
    }
});
