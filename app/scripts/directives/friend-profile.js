/**
 * Created by kated on 4/14/2016.
 */

'use strict';

var app = angular.module('viChatter');

app.directive('vcFriendProfile', vcFriendProfile);

function vcFriendProfile() {

    function link(scope) {

    }

    return {
        restrict: 'EA',
        templateUrl: 'app/templates/dashboard/directives/friend-profile.html',
        scope: {
            'profileInfo': '@'
        },
        link: link
    }
}