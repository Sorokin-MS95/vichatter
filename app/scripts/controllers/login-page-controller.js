/**
 * Created by kated on 4/13/2016.
 */
var app = angular.module('viChatter');


app.controller('LoginPageController', LoginPageController);

LoginPageController.$inject = ['$scope', 'localStorageService', 'NetworkProvider', '$timeout', 'AppConstants', '$state'];


function LoginPageController($scope, localStorageService, NetworkProvider, $timeout, AppConstants, $state) {

    $scope.login = function () {
        NetworkProvider.login($scope.user).then(function (result) {
            localStorageService.set(AppConstants.LOCAL_STORAGE_IDENTIFIERS.AUTH_TOKEN, result.payload.token);
            localStorageService.set(AppConstants.LOCAL_STORAGE_IDENTIFIERS.USER_ID, result.payload.userId);
            $state.go('dashboard');
        }).catch(function (result) {
            // need set message to scope! Where is it on template?
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
