/**
 * Created by kated on 4/14/2016.
 */
'use strict';

var app = angular.module('viChatter');

app.directive('vcChatWindow', vcChatWindow);

vcChatWindow.$inject = ['EventsService', 'AppConstants', 'localStorageService'];

function vcChatWindow(EventsService, AppConstants, localStorageService) {

    function link(scope) {

        scope.sendMessage = function () {
            var data = {
                messageText: scope.messageText,
                friendId: scope.friendId
            };
            EventsService.notify(AppConstants.SOCKET_EVENTS.FRONT_END.MESSAGE_NOTIFICATION, data);
            scope.messageText = "";
        };

        scope.showVideoChatWindow = function () {

        }

        scope.handleScrollToTop = function () {
            var data = {
                friendId: scope.friendId,
                userId: localStorageService.get(AppConstants.LOCAL_STORAGE_IDENTIFIERS.USER_ID),
            };

            EventsService.notify(AppConstants.UI_EVENTS.LOAD_MESSAGES_REQUEST, data);
            console.log('TOP!');
        }

        scope.isMessageMine = function (message) {
            return (localStorageService.get(AppConstants.LOCAL_STORAGE_IDENTIFIERS.USER_ID) == message.getSenderId());
        }
    }

    return {
        restrict: 'EA',
        templateUrl: 'app/templates/dashboard/directives/chat-window.html',
        scope: {
            'messagesList': '=',
            'friendId': '='
        },
        link: link
    }
}