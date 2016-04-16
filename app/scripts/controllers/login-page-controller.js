/**
 * Created by kated on 4/13/2016.
 */
var app = angular.module('viChatter');


app.controller('LoginPageController', LoginPageController);

LoginPageController.$inject = ['$scope', 'localStorageService', 'NetworkProvider', '$timeout', 'AppConstants'];


function LoginPageController($scope, localStorageService, NetworkProvider, $timeout, AppConstants) {

    $controller('BaseController', {$scope: $scope});

    $scope.userData = {};

    $scope.login = function () {
        NetworkProvider.login($scope.user).then(function (result) {
            localStorageService.set(AppConstants.LOCAL_STORAGE_IDENTIFIERS.AUTH_TOKEN, result.payload.token);
            localStorageService.set(AppConstants.LOCAL_STORAGE_IDENTIFIERS.USER_ID, result.payload.userId);
            //need redirect to dashboard


            $state.go('dashboard');
        }).catch(function (result) {
            // need set message to scope! Where is it on template?
            $scope.message = result.message;
            $scope.user[result.payload.form_error.fieldName] = "";
            $scope.user["password"] = "";

            //then after 3 sec delete message! Use timeout!
        });


    }

}
