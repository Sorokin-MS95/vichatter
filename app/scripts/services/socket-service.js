var app = angular.module('viChatter');


app.service('SocketService', SocketFactory);

SocketFactory.inject = ['$rootScope', 'EventsService', 'AppConstants', 'localStorageService'];

function SocketFactory($rootScope, EventsService, AppConstants, localStorageService) {

    var socketConnection = null;

    var _initialize = function () {
        socketConnection = io.connect(location.hostname + ':4000');
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
        });
        socketConnection.on(AppConstants.SOCKET_EVENTS.BACK_END.VIDEO_CALL_REQUEST, function (data) {
            EventsService.notify(AppConstants.SOCKET_EVENTS.BACK_END.VIDEO_CALL_REQUEST, data);
        });

        socketConnection.on(AppConstants.SOCKET_EVENTS.BACK_END.VIDEO_ALLOWED, function (data) {
            EventsService.notify(AppConstants.SOCKET_EVENTS.BACK_END.VIDEO_ALLOWED, data);
        });

        socketConnection.on(AppConstants.SOCKET_EVENTS.BACK_END.RTC_SDP_CALL_OFFER, function (data) {
            EventsService.notify(AppConstants.SOCKET_EVENTS.BACK_END.RTC_SDP_CALL_OFFER, data);
        })

        socketConnection.on(AppConstants.SOCKET_EVENTS.BACK_END.RTC_SDP_CALL_ANSWER, function (data) {
            EventsService.notify(AppConstants.SOCKET_EVENTS.BACK_END.RTC_SDP_CALL_ANSWER, data);
        })

        socketConnection.on(AppConstants.SOCKET_EVENTS.BACK_END.ICE_CANDIDATE, function (data) {
            EventsService.notify(AppConstants.SOCKET_EVENTS.BACK_END.ICE_CANDIDATE, data);
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

        EventsService.subscribe(AppConstants.SOCKET_EVENTS.FRONT_END.VIDEO_CALL_REQUEST, function (e, data) {
            socketConnection.emit(AppConstants.SOCKET_EVENTS.FRONT_END.VIDEO_CALL_REQUEST, {
                currentUserId: localStorageService.get(AppConstants.LOCAL_STORAGE_IDENTIFIERS.USER_ID),
                friendId: data.friendId
            });
        })

        EventsService.subscribe(AppConstants.SOCKET_EVENTS.FRONT_END.VIDEO_ALLOWED, function (e, data) {
            socketConnection.emit(AppConstants.SOCKET_EVENTS.FRONT_END.VIDEO_ALLOWED, {
                currentUserId: localStorageService.get(AppConstants.LOCAL_STORAGE_IDENTIFIERS.USER_ID),
                userId: data
            });
        });

        EventsService.subscribe(AppConstants.SOCKET_EVENTS.FRONT_END.RTC_SDP_CALL_OFFER, function (e, data) {
            socketConnection.emit(AppConstants.SOCKET_EVENTS.FRONT_END.RTC_SDP_CALL_OFFER, {
                sdp: data.sdp,
                userId: data.userId,
                currentUserId: localStorageService.get(AppConstants.LOCAL_STORAGE_IDENTIFIERS.USER_ID)
            })
        })

        EventsService.subscribe(AppConstants.SOCKET_EVENTS.FRONT_END.RTC_SDP_CALL_ANSWER, function (e, data) {
            socketConnection.emit(AppConstants.SOCKET_EVENTS.FRONT_END.RTC_SDP_CALL_ANSWER, {
                sdp: data.sdp,
                userId: data.userId,
                currentUserId: localStorageService.get(AppConstants.LOCAL_STORAGE_IDENTIFIERS.USER_ID)
            })
        })

        EventsService.subscribe(AppConstants.SOCKET_EVENTS.FRONT_END.ICE_CANDIDATE, function (e, data) {
            socketConnection.emit(AppConstants.SOCKET_EVENTS.FRONT_END.ICE_CANDIDATE, {
                candidate: data.candidate,
                userId: data.userId
            });
        })
    }

    return {
        initialize: _initialize
    }
}