/**
 * Created by kated on 4/14/2016.
 */
'use strict';

var app = angular.module('viChatter');

app.directive('vcChatWindow', vcChatWindow);

vcChatWindow.$inject = ['EventsService', 'AppConstants', 'localStorageService'];

function vcChatWindow(EventsService, AppConstants, localStorageService) {

    function link(scope) {

        scope.messageText = null;
        scope.sendMessage = function () {
            var data = {
                messageText: scope.messageText,
                timestamp: new Date()
            };
            EventsService.notify(AppConstants.SOCKET_EVENTS.FRONT_END.MESSAGE_NOTIFICATION, data);
        }

        scope.isMessageMine = function(message)
        {
            return (localStorageService.get(AppConstants.LOCAL_STORAGE_IDENTIFIERS.USER_ID) == message.getSenderId());
        }
    }

    return {
        restrict: 'EA',
        templateUrl: 'app/templates/dashboard/directives/chat-window.html',
        scope: {
            'messagesList': '='
        },
        link: link
    }
}