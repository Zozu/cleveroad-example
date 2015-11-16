'use strict';
angular.module('test').controller('CatalogController', function ($scope, $location, ApiService) {
    $scope.search_title = '';
    $scope.options = [{
            id: 1,
            label: 'By price(Ascending)',
            name: 'price_asc',
            order_by: 'price',
            order_type: 'ASC'
                },
        {
            id: 2,
            label: 'By price(Descending)',
            name: 'price_desc',
            order_by: 'price',
            order_type: 'DESC'
        },
        {
            id: 3,
            label: 'By date(Ascending)',
            name: 'date_asc',
            order_by: 'created_at',
            order_type: 'ASC'
        },
        {
            id: 4,
            label: 'By date(Descending)',
            name: 'date_desc',
            order_by: 'created_at',
            order_type: 'DESC'
                        }];
    $scope.selected = $scope.options[3];

    $scope.goItem = function (id) {
        $location.path("/item/" + id);
    }

    $scope.updateSearch = function () {
        //prepare search

        if ($scope.search_title) {
            var params = {
                title: $scope.search_title,
                order_by: $scope.selected.order_by,
                order_type: $scope.selected.order_type,
                user: null
            }
            ApiService.SearchItems(params).then(function (response) {
                if (response.status == 200) {
                    $scope.items = response.data;
                } else if (response.status == 422) {
                    $scope.errors = response.data;
                }
            });
        }
    }

});
