var app = angular.module('viChatter');


app.service('AuthenticationService', AuthenticationService);


AuthenticationService.$inject = ['$http', '$window', 'localStorageService', 'AppConstants'];


function AuthenticationService($http, $window, localStorageService, AppConstants) {
    function _isAuthenticated() {
        var token = localStorageService.get(AppConstants.LOCAL_STORAGE_IDENTIFIERS.AUTH_TOKEN);
        if (token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        } else return false;
    }

    function _clearUserData() {
        localStorageService.set(AppConstants.LOCAL_STORAGE_IDENTIFIERS.AUTH_TOKEN, null);
        localStorageService.set(AppConstants.LOCAL_STORAGE_IDENTIFIERS.USER_ID, null);
    }

    return {
        isAuthenticated: _isAuthenticated,
        clearUserData: _clearUserData
    };

}