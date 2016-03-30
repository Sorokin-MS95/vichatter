var app = angular.module('viChatter');


app.controller('SignInController', SignInController);


SignInController.$inject = ['$scope', '$state', '$http'];

function SignInController($scope, $state, $http){
    $scope.signIn = function(){
        $http.post('/api/user/signin', $scope.user).success(function(result){
            console.log(JSON.stringify(result));
        }).error(function(error){
            console.log(JSON.stringify(error));
        })
    }
}