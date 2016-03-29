var app = angular.module('viChatter');


app.controller('SignUpController', SignUpController);


SignUpController.$inject = ['$scope', '$state', '$http'];

function SignUpController($scope, $state, $http){

    $scope.createAccount = function(){
        $http.post('api/user/signup', $scope.newUser).success(function(response){
            console.log("Success " + JSON.stringify(response));
        }).error(function(error){
            console.log("Error " + error);
        })
    }

}