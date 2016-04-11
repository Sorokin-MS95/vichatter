var app = angular.module('viChatter');


app.controller('AuthenticationController', AuthenticationController);

AuthenticationController.$inject = ['$scope', '$state', '$timeout', 'AuthenticationService', 'localStorageService'];


function AuthenticationController($scope, $state, $timeout, AuthenticationService, localStorageService) {
    $scope.signIn = function () {

        AuthenticationService.signIn($scope.user).then(function (result) {
            var data = result.data;
            localStorageService.add('auth-token', data.token);
            localStorageService.add('userId', data.userId);
            $state.go('dashboard');
        }).catch(function (result) {
            console.log(result.data);
        });


    }

    $scope.signUp = function () {
        AuthenticationService.signUp($scope.newUser).then(function (result) {
            var data = result.data;
            localStorageService.add('auth-token', data.token);
            localStorageService.add('userId', data.userId);
            if (data.hasOwnProperty("success")) {
                $scope.signUpResult = data.success;
                $scope.result = "success";
                $timeout(function () {
                    $state.go('dashboard');
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
