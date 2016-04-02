var app = angular.module('viChatter');


app.service('AuthenticationService', AuthenticationService);


AuthenticationService.$inject = ['$http'];


function AuthenticationService($http) {
    this.signIn = function (user) {
        return $http.post('/api/user/signin', user);
    }
    
    this.signUp = function (user) {
        return $http.post('/api/user/signup', user);
    }
    
}