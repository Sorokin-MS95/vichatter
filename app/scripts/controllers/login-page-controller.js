/**
 * Created by kated on 4/13/2016.
 */
var app = angular.module('viChatter');


app.controller('LoginPageController', LoginPageController);

LoginPageController.$inject = ['$scope', 'localStorageService', 'NetworkProvider', '$timeout'];


function LoginPageController($scope, localStorageService, NetworkProvider, $timeout) {

    $scope.userData = {};

   /* $scope.loginDataModel = BuildObjectsService.buildLoginDataModel();*/

    $scope.login = function () {

        NetworkProvider.login($scope.userData).then(function (result) {
            var data = result.data;
            localStorageService.add('auth-token', data.token);
            localStorageService.add('userId', data.userId);
            $state.go('dashboard');
        }).catch(function (result) {
            console.log(result.data);
        });


    }

}
