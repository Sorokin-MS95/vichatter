var app = angular.module('viChatter');


app.service('SocketService', SocketFactory);

SocketFactory.inject = ['$rootScope', 'EventsService', 'AppConstants', 'localStorageService'];

function SocketFactory($rootScope, EventsService, AppConstants, localStorageService) {

    var socketConnection = null;

    var _initialize = function () {
        socketConnection = io.connect('localhost:4000');
        subscribeOnAllNotifications();
        initializeNotifySocketEvents();
    };


    function initializeNotifySocketEvents() {
        socketConnection.on(AppConstants.SOCKET_EVENTS.BACK_END_USER_LOGGED_IN_EVENT, function (data) {
            EventsService.notify(AppConstants.SOCKET_EVENTS.BACK_END_USER_LOGGED_IN_EVENT, data);
        });

        socketConnection.on(AppConstants.SOCKET_EVENTS.BACK_END_USER_LOGGED_OUT_EVENT, function (data) {
            EventsService.notify(AppConstants.SOCKET_EVENTS.BACK_END_USER_LOGGED_OUT_EVENT, data);
        })
    }


    function subscribeOnAllNotifications() {
        EventsService.subscribe(AppConstants.SOCKET_EVENTS.FRONT_END_USER_LOGGED_IN_EVENT, function (e, data) {
            socketConnection.emit(AppConstants.SOCKET_EVENTS.FRONT_END_USER_LOGGED_IN_EVENT, {
                userId: localStorageService.get(AppConstants.LOCAL_STORAGE_IDENTIFIERS.USER_ID)
            })
        });


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