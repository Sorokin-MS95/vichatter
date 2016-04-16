/**
 * Created by kated on 4/14/2016.
 */
'use strict';

var app = angular.module('viChatter');

app.directive('vcVideoChatWindow', vcVideoChatWindow);

function vcVideoChatWindow() {

    function link(scope) {
    }

    return {
        restrict: 'EA',
        templateUrl: 'app/templates/dashboard/directives/video-chat-window.html',
        scope: {},
        link: link
    }
}