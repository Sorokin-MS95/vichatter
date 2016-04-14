/**
 * Created by kated on 4/13/2016.
 */
var app = angular.module('viChatter');


app.controller('RegisterPageController', RegisterPageController);

RegisterPageController.$inject = ['$scope', 'NetworkProvider', 'localStorageService', '$timeout'];


function RegisterPageController($scope, NetworkProvider, localStorageService, $timeout) {

    $scope.userData = {};

    $scope.register = function () {
        NetworkProvider.register($scope.userData).then(function (result) {
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
            $scope.userData[data.fieldName] = "";
            $scope.userData.password = "";
            $timeout(function () {
                $scope.signUpResult = "";
                $scope.result = "";
            }, 3000);
        });
    }


}