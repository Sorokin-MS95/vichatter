var app = angular.module('viChatter');


app.controller('DashboardController', DashboardController);

DashboardController.$inject=['$scope', 'socket'];


function DashboardController($scope, socket){
    socket.on('user_connected', function(data){
        console.log(data);
    })
}