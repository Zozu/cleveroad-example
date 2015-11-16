angular.module('test').config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'tpl/main.html',
            controller: 'MainController'
        }).
        when('/main', {
            templateUrl: 'tpl/main.html',
            controller: 'MainController'
        }).
        when('/login', {
            templateUrl: 'tpl/login.html',
            controller: 'LoginController'
        }).
        when('/catalog', {
            templateUrl: 'tpl/catalog.html',
            controller: 'CatalogController'
        }).
        when('/user/items', {
            templateUrl: 'tpl/user-items.html',
            controller: 'UserItemsController'
        }).
        when('/user/:id/items', {
            templateUrl: 'tpl/other-user-items.html',
            controller: 'OtherUserItemsController'
        }).
        when('/user/edit', {
            templateUrl: 'tpl/user-edit.html',
            controller: 'UserEditController'
        }).
        when('/user/search', {
            templateUrl: 'tpl/user-search.html',
            controller: 'UserSearchController'
        }).
        when('/item/edit/:id', {
            templateUrl: 'tpl/edit-item.html',
            controller: 'EditItemController'
        }).
        when('/item/new', {
            templateUrl: 'tpl/edit-item.html',
            controller: 'NewItemController'
        }).
        when('/item/:id', {
            templateUrl: 'tpl/item.html',
            controller: 'ItemController'
        }).
        when('/registration', {
            templateUrl: 'tpl/registration.html',
            controller: 'RegistrationController'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);
