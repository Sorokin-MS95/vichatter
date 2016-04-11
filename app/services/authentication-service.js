var app = angular.module('viChatter');


app.service('AuthenticationService', AuthenticationService);


AuthenticationService.$inject = ['$http', '$window', 'localStorageService'];


function AuthenticationService($http, $window, localStorageService) {

    this.signIn = function (user) {
        return $http.post('/api/user/signin', user);
    }

    this.signUp = function (user) {
        return $http.post('/api/user/signup', user);
    }

    this.logout = function () {
        localStorageService.removeItem('auth-token');
    }

    this.isLoggedIn = function () {
        var token = localStorageService.get('auth-token');
        if (token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        } else return false;
    }

}