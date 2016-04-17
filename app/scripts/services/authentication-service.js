var app = angular.module('viChatter');


app.service('AuthenticationService', AuthenticationService);


AuthenticationService.$inject = ['$http', '$window', 'localStorageService', 'AppConstants'];


function AuthenticationService($http, $window, localStorageService, AppConstants) {
    function _isAuthenticated() {
        var token = localStorageService.get(AppConstants.LOCAL_STORAGE_IDENTIFIERS.ACCESS_TOKEN);
        if (token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    function _clearUserData() {
        localStorageService.remove(AppConstants.LOCAL_STORAGE_IDENTIFIERS.ACCESS_TOKEN);
        localStorageService.remove(AppConstants.LOCAL_STORAGE_IDENTIFIERS.USER_ID);
    }

    return {
        isAuthenticated: _isAuthenticated,
        clearUserData: _clearUserData
    };

}