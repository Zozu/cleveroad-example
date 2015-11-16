angular.module('test').controller('RegistrationController', function ($scope, ApiService, $location, AuthenticationService) {
    $scope.user = {};

    $scope.attemptRegistration = function () {
        AuthenticationService.ClearCredentials();
        ApiService.Registrate($scope.user)
            .then(function (response) {
                if (response.status == 200) {
                    AuthenticationService.SetToken(response.data.token);
                    AuthenticationService.GetCurrentUser(response.data.token, function (res) {
                        if (res.status == 200) {
                            AuthenticationService.SetCredentials(res.data.id, res.data.email, res.data.phone, res.data.name);
                        } else if (res.status == 422) {
                            $scope.errors = res.data;
                        }
                        $location.path('/');
                    });
                } else if (response.status == 422) {
                    $scope.errors = response.data;
                }
            });
    }
});
