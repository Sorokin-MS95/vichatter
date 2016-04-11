var app = angular.module('viChatter');


app.controller('DashboardController', DashboardController);

DashboardController.$inject=['$scope', 'socket', 'localStorageService'];


function DashboardController($scope, socket, localStorageService){

    console.log('init!');
   socket.emit('user_logged_in', {
       userId : localStorageService.get('userId')
   });

}