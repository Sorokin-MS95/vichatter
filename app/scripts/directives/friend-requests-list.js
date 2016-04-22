/**
 * Created by kated on 4/14/2016.
 */
'use strict';

var app = angular.module('viChatter');


app.directive('vcFriendRequestsList', vcFriendRequestsList);

vcFriendRequestsList.$inject = ['EventsService', 'AppConstants'];

function vcFriendRequestsList(EventsService, AppConstants) {

    function link(scope) {

        scope.addFriend = function (friend) {
            EventsService.notify(AppConstants.UI_EVENTS.FRONT_END.ADD_FRIEND_NOTIFICATION, friend);
        }
    }

    return {
        restrict: 'EA',
        templateUrl: 'app/templates/dashboard/directives/friend-request-list.html',
        scope: {
            'listOfRequests': '='
        },
        link: link
    }
}