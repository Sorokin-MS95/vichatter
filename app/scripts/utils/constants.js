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
        FRONT_END: {
            USER_LOGGED_IN_EVENT: "fe_user_logged_in",
            USER_FRIENDSHIP_REQUEST : "fe_user_friendship_request",
            USER_LOGGED_OUT_EVENT: "disconnect",
            ADD_FRIEND_NOTIFICATION: 'fe_add_friend_notification',
            USER_STATUS_NOTIFICATION: 'fe_user_status_notification',
            MESSAGE_NOTIFICATION: 'fe_message_notification',
            VIDEO_CALL_REQUEST : 'fe_video_call_request',
            VIDEO_CALL_NOTIFICATION: 'fe_video_call_notification',
            ACCEPT_CALL: 'fe_accept_video_call'
        },
        BACK_END: {
            USER_LOGGED_IN_EVENT: "be_user_logged_in",
            USER_LOGGED_OUT_EVENT: "be_user_logged_out",
            ADD_FRIEND_NOTIFICATION: 'be_add_friend_notification',
            USER_STATUS_NOTIFICATION: 'be_user_status_notification',
            USER_FRIENDSHIP_REQUEST : 'be_user_friendship_request',
            MESSAGE_NOTIFICATION: 'be_message_notification',
            VIDEO_CALL_REQUEST : 'be_video_call_request',
            VIDEO_CALL_NOTIFICATION: 'be_video_call_notification',
            ACCEPT_CALL: 'be_accept_video_call'
        }
    },
    UI_EVENTS: {
        FRIEND_LIST_ITEM_SELECTED: 'friend_list_item_selected',
        SHOW_FRIENDS_LIST: 'show_friends_list',
        SHOW_MY_PROFILE: 'show_my_profile',
        SHOW_CHAT_WINDOW: 'show_chat_window',
        SHOW_VIDEO_CHAT_WINDOW: 'show_video_chat_window',
        SHOW_FRIEND_PROFILE: 'show_friend_profile',
        SHOW_FRIENDS_REQUESTS_LIST: 'show_friends_requests_list',
        LOGOUT: 'logout',
        LOAD_MESSAGES_REQUEST: 'load_messages_request',
        SHOW_SEARCH_LIST: 'show_search_list',
        HIDE_SEARCH_LIST: 'hide_search_list',
        ADD_FRIEND : "add_friend",
        REQUEST_FRIENDSHIP : "request_freindship"
    },
    FORM_FIELDS: {
        PASSOWORD_FIELD: 'password',
        EMAIL_FIELD: 'email',
        NICKNAME_FIELD: 'nickname'

    }
});