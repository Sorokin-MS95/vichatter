var app = angular.module('viChatter');


app.service('AuthenticationService', AuthenticationService);


AuthenticationService.$inject = ['$http'];


function AuthenticationService($http) {
    this.signIn = function (user) {
        $http.post('/api/user/signin', user).then(function (result) {
            console.log(JSON.stringify(result.data));
        }).catch(function (err) {
            console.log(err);
        });
    }
    
    this.signUp = function (user) {
        $http.post('/api/user/signup', user).then(function(result){
            console.log(result);
        }).catch(function(err){
            console.log(err);
        });
    }

    this.signinFacebook = function () {

    }
}