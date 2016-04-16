/**
 * Created by kated on 4/13/2016.
 */
var app = angular.module('viChatter');


app.controller('RegisterPageController', RegisterPageController);

RegisterPageController.$inject = ['$scope', 'NetworkProvider', 'localStorageService', '$timeout', 'AppConstants', '$state'];


function RegisterPageController($scope, NetworkProvider, localStorageService, $timeout, AppConstants, $state) {

    $scope.register = function () {
        NetworkProvider.register($scope.user).then(function (result) {
            localStorageService.set(AppConstants.LOCAL_STORAGE_IDENTIFIERS.ACCESS_TOKEN, result.payload.token);
            localStorageService.set(AppConstants.LOCAL_STORAGE_IDENTIFIERS.USER_ID, result.payload.userId);
            $scope.formMessage = result.message;
            $scope.result = true;
            $timeout(function () {
                $scope.formMessage = "";
                $state.go('dashboard');
            }, 3000);
        }).catch(function (result) {

            $scope.formMessage = result.message;
            $scope.user[result.payload.form_error.fieldName] = "";
            $scope.result = false;
            $scope.user["password"] = "";

            $timeout(function () {
                //todo prestine
                $scope.formMessage = "";
                $scope.result = null;
            }, 3000);

        });
    }


}