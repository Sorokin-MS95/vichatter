/**
 * Created by kated on 4/18/2016.
 */
/**
 * Created by kated on 4/14/2016.
 */
'use strict';

var app = angular.module('viChatter');
app.directive('vcFriendSearchList', vcFriendSearchList);
vcFriendSearchList.$inject = ['AppConstants', 'EventsService'];
function vcFriendSearchList(AppConstants, EventsService) {
    function link(scope) {
        scope.addFriend = function (friend) {
            EventsService.notify(AppConstants.SOCKET_EVENTS.FRONT_END.ADD_FRIEND_NOTIFICATION, friend);
        };
    }

    return {
        restrict: 'EA',
        templateUrl: 'app/templates/dashboard/directives/friend-search-list.html',
        scope: {
            'listOfSearchFriends': '='
        },
        link: link
    }
}