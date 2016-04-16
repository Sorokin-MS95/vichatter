var app = angular.module('viChatter');


app.service('SocketService', SocketFactory);

SocketFactory.inject = ['$rootScope', 'EventsService', 'AppConstants'];

function SocketFactory($rootScope, EventsService, AppConstants) {

    var socketConnection = null;

    var _initialize = function () {
        /*initialization of socket*/
        subscribeOnAllNotifications();

    };


    function subscribeOnAllNotifications() {
        EventsService.subscribe(AppConstants.SOCKET_EVENTS.USER_STATUS_NOTIFICATION, function (e, data) {
            /*send notification on server*/
        });

        EventsService.subscribe(AppConstants.SOCKET_EVENTS.MESSAGE_NOTIFICATION, function (e, data) {
            /*send notification on server*/
        });

        EventsService.subscribe(AppConstants.SOCKET_EVENTS.ADD_FRIEND_NOTIFICATION, function (e, data) {
            /*send notification on server*/
        });
    }

    /* var socket = io.connect('http://localhost:4000');
     return {
     on: function (eventName, callback) {
     socket.on(eventName, function () {
     var args = arguments;
     $rootScope.$apply(function () {
     callback.apply(socket, args);
     });
     });
     },
     emit: function (eventName, data, callback) {
     socket.emit(eventName, data, function () {
     var args = arguments;
     $rootScope.$apply(function () {
     if (callback) {
     callback.apply(socket, args);
     }
     });
     })
     }
     }*/
    return {
        initialize: _initialize
    }
}