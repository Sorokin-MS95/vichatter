var app = angular.module('viChatter');


app.controller('DashboardController', DashboardController);

DashboardController.$inject=['$scope', 'socket', 'localStorageService', 'AuthenticationService'];


function DashboardController($scope, socket, localStorageService, AuthenticationService){

    console.log('init!');
   socket.emit('user_logged_in', {
       userId : localStorageService.get('userId')
   });

    NetworkProvider.logout().then(function() {
        AuthenticationService.clearUserData();
        $location.path('/login');
    });

}