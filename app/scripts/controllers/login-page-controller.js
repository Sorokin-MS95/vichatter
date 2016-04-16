/**
 * Created by kated on 4/13/2016.
 */
var app = angular.module('viChatter');


app.controller('LoginPageController', LoginPageController);

LoginPageController.$inject = ['$scope', 'localStorageService', 'NetworkProvider', '$timeout'];


function LoginPageController($scope, localStorageService, NetworkProvider, $timeout) {

    $controller('BaseController', {$scope: $scope});

    $scope.userData = {};

    $scope.login = function () {

        NetworkProvider.login($scope.userData).then(function (result) {
            var data = result.data;
            localStorageService.add('auth_token', data.token);
            localStorageService.add('user_id', data.userId);
            $state.go('dashboard');
        }).catch(function (result) {
            console.log(result.data);
        });


    }

}
