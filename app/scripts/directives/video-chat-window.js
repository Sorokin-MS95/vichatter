/**
 * Created by kated on 4/14/2016.
 */
'use strict';

var app = angular.module('viChatter');

app.directive('vcVideoChatWindow', vcVideoChatWindow);

function vcVideoChatWindow() {

    function link(scope) {
        scope.isMicrophoneEnabled = false;
        scope.isWindowExpanded = false;
        scope.isCameraEnabled = false;
        scope.disableMicrophone = function()
        {
            scope.isMicrophoneEnabled = false;
        }
        ;

        scope.disableCamera = function()
        {
            scope.isCameraEnabled = false;
        }
        ;

        scope.expandWindow = function()
        {
            scope.isWindowExpanded = true;
        }
        ;
        scope.enableMicrophone = function()
        {
            scope.isMicrophoneEnabled = true;
        }
        ;
        scope.enableCamera = function()
        {
            scope.isCameraEnabled = true;
        }
        ;
        scope.reduceWindow = function()
        {
            scope.isWindowExpanded = false;
        }
        ;
        scope.finishCall = function()
        {
            EventsService.notify(AppConstants.SOCKET_EVENTS.FRONT_END.FINISH_CALL, scope.friendId);
        }
        ;
    }

    return {
        restrict: 'EA',
        templateUrl: 'app/templates/dashboard/directives/video-chat-window.html',
        scope: {
            'getFriendsVideo': '&',
            'getMyVideo': '&',
            'friendId': '='
        },
        link: link
    }
}