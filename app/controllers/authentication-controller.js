var app = angular.module('viChatter');


app.controller('AuthenticationController', AuthenticationController);

AuthenticationController.$inject = ['$scope', '$state', '$timeout', 'AuthenticationService'];


function AuthenticationController($scope, $state, $timeout, AuthenticationService) {
    $scope.signIn = function () {

        AuthenticationService.signIn($scope.user).then(function (result) {
            AuthenticationService.saveToken(result.token);
            $state.go('dashboard');
        }).catch(function (result) {
            console.log(result.data);
        });


    }

    $scope.signUp = function () {
        AuthenticationService.signUp($scope.newUser).then(function (result) {
            var data = result.data;
            AuthenticationService.saveToken(data.token);
            if (data.hasOwnProperty("success")) {
                $scope.signUpResult = data.success;
                $scope.result = "success";
                $timeout(function () {

                    $state.go('sign-in');
                }, 3000)
            }
        }).catch(function (result) {
            var data = result.data;
            $scope.signUpResult = data.error;
            $scope.result = "failure";
            $scope.newUser[data.fieldName] = "";
            $scope.newUser.password = "";
            $timeout(function () {
                $scope.signUpResult = "";
                $scope.result = "";
            }, 3000);
        });
    }
}
