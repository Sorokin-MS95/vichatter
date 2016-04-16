/**
 * Created by kated on 4/14/2016.
 */
'use strict';

var app = angular.module('antennaApp');

app.directive('vcChatWindow', vcChatWindow);

function vcChatWindow() {

    function link(scope) {

    }

    return {
        restrict: 'EA',
        templateUrl: 'templates/dashboard/directives/chat-window.html',
        scope: {
            'activePage': '='
        },
        link: link
    }
}