'use strict';
angular.module('test').controller('OtherUserItemsController', function ($scope, $location, ApiService, $rootScope) {

    $scope.init = function () {
        var params = {
            title: null,
            order_by: null,
            order_type: null,
            user_id: $rootScope.globals.currentUser.id
        }
        ApiService.SearchItems(params).then(function (response) {
            if (response.status == 200) {
                $scope.items = response.data;
            } else if (response.status == 422) {
                $scope.errors = response.data;
            }
        });
    };
    $scope.init();
});
