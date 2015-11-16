'use strict';
angular.module('test').controller('UserSearchController', function ($scope, $location, ApiService) {
    $scope.user = {};
    $scope.search_name = '';
    $scope.search_email = '';

    $scope.goUser = function (id) {
        $location.path("/user/" + id + "/items");
    }

    $scope.updateSearch = function () {
        //prepare search

        if ($scope.search_name || $scope.search_email) {
            var params = {
                email: $scope.search_email,
                name: $scope.search_name,
            }
            ApiService.SearchUsers(params).then(function (response) {
                console.log(response);
                if (response.status == 200) {
                    $scope.users = response.data;
                    console.log($scope.users);
                } else if (response.status == 422) {
                    $scope.errors = response.data;
                }
            });
        }
    }

});
