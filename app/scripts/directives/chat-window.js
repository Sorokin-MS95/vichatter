/**
 * Created by kated on 4/14/2016.
 */
'use strict';

var app = angular.module('viChatter');

app.directive('vcChatWindow', vcChatWindow);

function vcChatWindow() {

    function link(scope) {

    }

    return {
        restrict: 'EA',
        templateUrl: 'app/templates/dashboard/directives/chat-window.html',
        scope: {
        },
        link: link
    }
}