/**
 * Created by kated on 4/13/2016.
 */
'use strict';

var appModule =
    angular.module('viChatter');

appModule.constant('AppConstants', {
    LOCAL_STORAGE_IDENTIFIERS: {
        USER_ID: "user_id",
        ACCESS_TOKEN: "access_token"
    },
    SOCKET_EVENTS: {
        FRONT_END_USER_LOGGED_IN_EVENT: "fe_user_logged_in",
        BACK_END_USER_LOGGED_IN_EVENT: "be_user_logged_in",
        BACK_END_USER_LOGGED_OUT_EVENT : "be_user_logged_out",
        FRONT_END_USER_LOGGED_OUT_EVENT : "disconnect",
        ADD_FRIEND_NOTIFICATION: 'add_friend_notification',
        USER_STATUS_NOTIFICATION: 'user_status_notification',
        MESSAGE_NOTIFICATION: 'message_notification'
    },
    UI_EVENTS: {
        FRIEND_LIST_ITEM_SELECTED: 'friend_list_item_selected',
        SHOW_FRIENDS_LIST: 'show_friends_list',
        SHOW_MY_PROFILE: 'show_my_profile',
        SHOW_CHAT_WINDOW: 'show_chat_window',
        SHOW_VIDEO_CHAT_WINDOW: 'show_video_chat_window',
        SHOW_FRIEND_PROFILE: 'show_friend_profile',
        SHOW_FRIENDS_REQUESTS_LIST: 'show_friends_requests_list',
        LOGOUT: 'logout'
    },
    FORM_FIELDS: {
        PASSOWORD_FIELD: 'password',
        EMAIL_FIELD: 'email',
        NICKNAME_FIELD: 'nickname'

    }
});