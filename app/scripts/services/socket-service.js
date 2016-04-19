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
        socketConnection.on(AppConstants.SOCKET_EVENTS.BACK_END.USER_LOGGED_IN_EVENT, function (data) {
            EventsService.notify(AppConstants.SOCKET_EVENTS.BACK_END.USER_LOGGED_IN_EVENT, data);
        });

        socketConnection.on(AppConstants.SOCKET_EVENTS.BACK_END.USER_LOGGED_OUT_EVENT, function (data) {
            EventsService.notify(AppConstants.SOCKET_EVENTS.BACK_END.USER_LOGGED_OUT_EVENT, data);
        });

        socketConnection.on(AppConstants.SOCKET_EVENTS.BACK_END.MESSAGE_NOTIFICATION, function (data) {
            EventsService.notify(AppConstants.SOCKET_EVENTS.BACK_END.MESSAGE_NOTIFICATION, data);
        });

        socketConnection.on(AppConstants.SOCKET_EVENTS.BACK_END.ADD_FRIEND_NOTIFICATION, function (data) {
            EventsService.notify(AppConstants.SOCKET_EVENTS.BACK_END.ADD_FRIEND_NOTIFICATION, data);
        });
        socketConnection.on(AppConstants.SOCKET_EVENTS.BACK_END.USER_FRIENDSHIP_REQUEST, function (data) {
            EventsService.notify(AppConstants.SOCKET_EVENTS.BACK_END.USER_FRIENDSHIP_REQUEST, data);
        })
    }


    function subscribeOnAllNotifications() {
        EventsService.subscribe(AppConstants.SOCKET_EVENTS.FRONT_END.USER_LOGGED_IN_EVENT, function (e, data) {
            socketConnection.emit(AppConstants.SOCKET_EVENTS.FRONT_END.USER_LOGGED_IN_EVENT, {
                userId: localStorageService.get(AppConstants.LOCAL_STORAGE_IDENTIFIERS.USER_ID)
            })
        });


        EventsService.subscribe(AppConstants.SOCKET_EVENTS.FRONT_END.USER_LOGGED_OUT_EVENT, function (e, data) {
            socketConnection.disconnect();
        })


        EventsService.subscribe(AppConstants.SOCKET_EVENTS.USER_STATUS_NOTIFICATION, function (e, data) {
            /*send notification on server*/
        });

        EventsService.subscribe(AppConstants.SOCKET_EVENTS.FRONT_END.MESSAGE_NOTIFICATION, function (e, data) {
            socketConnection.emit(AppConstants.SOCKET_EVENTS.FRONT_END.MESSAGE_NOTIFICATION, {
                userId: localStorageService.get(AppConstants.LOCAL_STORAGE_IDENTIFIERS.USER_ID),
                friendId: data.friendId,
                content: data.messageText
            });
            /*send notification on server*/
        });

        EventsService.subscribe(AppConstants.SOCKET_EVENTS.FRONT_END.ADD_FRIEND_NOTIFICATION, function (e, data) {
            //TODO
            socketConnection.emit(AppConstants.SOCKET_EVENTS.FRONT_END.ADD_FRIEND_NOTIFICATION, {
                senderId: localStorageService.get(AppConstants.LOCAL_STORAGE_IDENTIFIERS.USER_ID),
                userId: data._id
            });
        })

        EventsService.subscribe(AppConstants.SOCKET_EVENTS.ADD_FRIEND_NOTIFICATION, function (e, data) {
            /*send notification on server*/
        });

        EventsService.subscribe(AppConstants.SOCKET_EVENTS.FRONT_END.USER_FRIENDSHIP_REQUEST, function (e, data) {
            socketConnection.emit(AppConstants.SOCKET_EVENTS.FRONT_END.USER_FRIENDSHIP_REQUEST, {
                currentUserId: localStorageService.get(AppConstants.LOCAL_STORAGE_IDENTIFIERS.USER_ID),
                userId: data._id
            });
        });
    }

    return {
        initialize: _initialize
    }
}