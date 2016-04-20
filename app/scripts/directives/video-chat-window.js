/**
 * Created by kated on 4/14/2016.
 */
'use strict';

var app = angular.module('viChatter');

app.directive('vcVideoChatWindow', vcVideoChatWindow);

vcVideoChatWindow.$inject = ['EventsService', 'AppConstants', '$sce'];

function vcVideoChatWindow(EventsService, AppConstants, $sce) {

    function link(scope) {
        scope.myTrustSrc = function () {
            if (!scope.myVideoStream) {
                return undefined;
            }

            return $sce.trustAsResourceUrl(scope.myVideoStream);
        };

        scope.remoteTrustSrc = function () {
            if (!scope.remoteVideoStream) {
                return undefined;
            }
            return $sce.trustAsResourceUrl(scope.remoteVideoStream);
        }


        scope.myVideoStream = null;
        scope.remoteVideoStream = null;
        scope.isMicrophoneEnabled = false;
        scope.isWindowExpanded = false;
        scope.isCameraEnabled = false;
        scope.disableMicrophone = function () {
            scope.isMicrophoneEnabled = false;
        };

        scope.disableCamera = function () {
            scope.isCameraEnabled = false;
        }
        ;

        scope.expandWindow = function () {
            scope.isWindowExpanded = true;
        }
        ;
        scope.enableMicrophone = function () {
            scope.isMicrophoneEnabled = true;
        }
        ;
        scope.enableCamera = function () {
            scope.isCameraEnabled = true;
        }
        ;
        scope.reduceWindow = function () {
            scope.isWindowExpanded = false;
        };
        scope.finishCall = function () {
            EventsService.notify(AppConstants.SOCKET_EVENTS.FRONT_END.FINISH_CALL, scope.friendId);
        };

        EventsService.subscribe(AppConstants.RTC.SET_LOCAL_STREAM, function (e, data) {
            console.log("Hey!");
        });

        scope.$watch('localStream', function () {
            scope.myVideoStream = window.URL.createObjectURL(scope.localStream);
        });

        scope.$watch('remoteStream', function () {
            scope.remoteVideoStream = window.URL.createObjectURL(scope.remoteStream);
        })
    }

    return {
        restrict: 'EA',
        templateUrl: 'app/templates/dashboard/directives/video-chat-window.html',
        scope: {
            'getFriendsVideo': '&',
            'getMyVideo': '&',
            'friendId': '=',
            "localStream": '=',
            "remoteStream": '='
        },
        link: link
    }
}