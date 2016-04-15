/**
 * Created by kated on 4/13/2016.
 */
'use strict';

var appModule =
    angular.module('viChatter');

appModule.constant('AppConstants', {
    LOCAL_STORAGE_IDENTIFIERS: {
        USER_ID: "user_id",
        AUTH_TOKEN: "access_token"
    },
    SOCKET_EVENTS: {
        ADD_FRIEND_NOTIFICATION: 'add_friend_notification',
        USER_STATUS_NOTIFICATION: 'user_status_notification',
        MESSAGE_NOTIFICATION: 'message_notification'
    },
    UI_EVENTS: {
        FRIEND_LIST_ITEM_SELECTED: 'friend_list_item_selected'
    }
});