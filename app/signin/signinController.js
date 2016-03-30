var app = angular.module('viChatter');


app.controller('SignInController', SignInController);


SignInController.$inject = ['$scope', '$state', '$http'];

function SignInController($scope, $state, $http){
    $scope.signIn = function(){
        console.log('worked!');
    }
}