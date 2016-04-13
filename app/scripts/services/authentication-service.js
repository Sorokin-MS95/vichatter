var app = angular.module('viChatter');


app.service('AuthenticationService', AuthenticationService);


AuthenticationService.$inject = ['$http', '$window', 'localStorageService'];


function AuthenticationService($http, $window, localStorageService) {
    function _isAuthenticated() {
        var token = localStorageService.get('auth-token');
        if (token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        } else return false;
    }

    function _clearUserData() {
        localStorageService.set('auth-token', null);
        localStorageService.set('userId', null);
    }

    return {
        isAuthenticated: _isAuthenticated,
        clearUserData: _clearUserData
    };

}