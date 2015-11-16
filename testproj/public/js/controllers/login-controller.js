angular.module('test').controller('LoginController', function ($scope, $location, AuthenticationService, $rootScope) {
    $scope.user = {};
    $scope.danger_mes = $rootScope.loginMessage;
    $scope.attemptLogin = function () {
        AuthenticationService.Login($scope.user.email, $scope.user.password, function (response) {
            if (response.status == 200) {
                AuthenticationService.GetCurrentUser(response.data.token, function (res) {
                    if (res.status == 200) {
                        AuthenticationService.SetToken(response.data.token, response.data.time);
                        AuthenticationService.SetCredentials(res.data.id, res.data.email, res.data.tel, res.data.name);
                        $location.path('/');
                    } else if (res.status == 422) {
                        $scope.errors = res.data;
                    }
                });
            } else if (response.status == 422) {
                $scope.errors = response.data;
            }
        });
    }
});
