var app = angular.module('viChatter');


app.service('AuthenticationService', AuthenticationService);


AuthenticationService.$inject = ['$http', '$window'];


function AuthenticationService($http, $window) {


    this.saveToken = function (token) {
        $window.localStorage['auth-token'] = token;
    }

    this.getToken = function () {
        return $window.localStorage['auth-token'];
    }


    this.signIn = function (user) {
        return $http.post('/api/user/signin', user);
    }

    this.signUp = function (user) {
        return $http.post('/api/user/signup', user);
    }

    this.logout = function () {
        $window.localStorage.removeItem('auth-token');
    }

    this.isLoggedIn = function () {
        var token = this.getToken();
        if (token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        } else return false;
    }

}