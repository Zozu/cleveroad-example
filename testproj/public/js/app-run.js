angular.module('test').run(function ($rootScope, $location, $cookieStore, $http, AuthenticationService) {
    var authPages = ["/edit", "/new", "/user/search", "/user/items"];
    var nonAuthPages = ["/login", "/registration"];
    $rootScope.globals = $cookieStore.get('globals') || {};
    if (!!$rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = $rootScope.globals.token;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        //TODO
        if (!$rootScope.isLogged) {
            var isRestirected = false;
            for (var i = 0; i < authPages.length; i++) {
                if (next.indexOf(authPages[i]) > -1) {
                    isRestirected = true;
                }
            }
            if (isRestirected) {
                $rootScope.loginMessage = "You should login";
                $location.path('/login');
            }
        } else {
            var isNonAuth = false;
            for (var i = 0; i < nonAuthPages.length; i++) {
                if (next.indexOf(nonAuthPages[i]) > -1) {
                    isNonAuth = true;
                }
            }
            if (isNonAuth) {
                $location.path('/');
            }
            $rootScope.loginMessage = null;
        }

        if (current.indexOf("/login") > -1) {
            $rootScope.loginMessage = null;
        }
        var oldToken = (!!$rootScope.globals.timeLogin) ? isTokenOld($rootScope.globals.timeLogin) : undefined;


        if ($rootScope.isLogged && oldToken) {
            console.log('logout');
            AuthenticationService.Unauthorize();
            $location.path('/');
        }
    });

    $rootScope.$watch(function () {
        return $rootScope.globals.currentUser;
    }, function () {
        $rootScope.isLogged = !!$rootScope.globals.currentUser;
    }, true);

    function isTokenOld(tokenTime) {
        Date.prototype.addHours = function (h) {
            this.setHours(this.getHours() + h);
            return this;
        }

        var t = tokenTime.split(/[- :]/);
        var tokenTimeDate = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
        var date = new Date();
        if (tokenTimeDate.addHours(4) < date) return true;
        return false;
    }
});
