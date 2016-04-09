var app = angular.module('viChatter');


app.controller('AuthenticationController', AuthenticationController);

AuthenticationController.$inject = ['$scope', '$state', '$timeout', 'AuthenticationService'];


function AuthenticationController($scope, $state, $timeout, AuthenticationService) {
    $scope.signIn = function () {

        AuthenticationService.signIn($scope.user).then(function (result) {
            var data = result.data;
            //todo
            $state.go('dashboard');
        }).catch(function(result){
            //todo
            console.log(result.data);
        });


    }

    $scope.signUp = function () {
        AuthenticationService.signUp($scope.newUser).then(function (result) {
            var data = result.data;
            if (data.hasOwnProperty("success")) {
                $scope.signUpResult = data.success;
                $scope.result = "success";
                $timeout(function(){

                    $state.go('sign-in');
                }, 3000)
            } else {
                $scope.signUpResult = data.error;
                $scope.result = "failure";
                $timeout(function(){

                })
            }
        });
    }

    $scope.signinFacebook = function () {
        console.log('facebook');
    }
}
