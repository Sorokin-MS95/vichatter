/**
 * Created by kated on 4/13/2016.
 */
var app = angular.module('viChatter');


app.controller('LoginPageController', LoginPageController);

LoginPageController.$inject = ['$scope', 'localStorageService', 'NetworkProvider', '$timeout', 'AppConstants', '$state'];


function LoginPageController($scope, localStorageService, NetworkProvider, $timeout, AppConstants, $state) {

    $scope.user = null;
    $scope.formMessage = null;
    $scope.result = null;

    $scope.login = function () {
        NetworkProvider.login($scope.user).then(function (result) {
            localStorageService.set(AppConstants.LOCAL_STORAGE_IDENTIFIERS.ACCESS_TOKEN, result.payload.token);
            localStorageService.set(AppConstants.LOCAL_STORAGE_IDENTIFIERS.USER_ID, result.payload.userId);
            $state.go('dashboard');
        }).catch(function (result) {
            $scope.formMessage = result.message;
            $scope.result = false;
            $scope.user[result.payload.form_error.fieldName] = "";
            $scope.user["password"] = "";

            $timeout(function () {
                //todo prestine
                $scope.formMessage = "";
                $scope.result = null;
            }, 3000);
        });


    }

}
