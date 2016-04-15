/**
 * Created by kated on 4/13/2016.
 */
var app = angular.module('viChatter');


app.controller('RegisterPageController', RegisterPageController);

RegisterPageController.$inject = ['$scope', 'NetworkProvider', 'localStorageService', '$timeout', 'AppConstants'];


function RegisterPageController($scope, NetworkProvider, localStorageService, $timeout, AppConstants) {

    $scope.userData = {};

    $scope.register = function () {
        NetworkProvider.register($scope.user).then(function (result) {
            localStorageService.set(AppConstants.LOCAL_STORAGE_IDENTIFIERS.AUTH_TOKEN, result.payload.token);
            localStorageService.set(AppConstants.LOCAL_STORAGE_IDENTIFIERS.USER_ID, result.payload.userId);
            // where can i set messsage?
            $scope.message = result.message;
            // timeout delete this message and state.go('dashboard');
        }).catch(function (result) {
            // need set error message to ui!!!!
            $scope.message = result.message;
            $scope.user[result.payload.form_error.fieldName] = "";
            $scope.user["password"] = "";
            //then after 3 sec delete message! Use timeout!
        });
    }


}