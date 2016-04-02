var app = angular.module('viChatter');


app.controller('AuthenticationController', AuthenticationController);

AuthenticationController.$inject = ['$scope', 'AuthenticationService'];


function AuthenticationController($scope, AuthenticationService){
    $scope.signIn = function(){
        AuthenticationService.signIn($scope.user);
    }

    $scope.signUp = function(){
        AuthenticationService.signUp($scope.newUser);
    }

    $scope.signinFacebook = function(){
        AuthenticationService.signinFacebook();
        console.log('facebook');
    }
}
