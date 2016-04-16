/**
 * Created by kated on 4/14/2016.
 */
'use strict';

var app = angular.module('viChatter');

app.directive('vcFriendList', vcFriendList);

vcFriendList.$inject = ['EventService', 'AppConstants'];

function vcFriendList(EventsService, AppConstants) {

    function link(scope) {

        scope.selectedFriendId = null;

        scope.isFriendItemSelected = function (id) {
            return selectedFriendId.getId() == id;
        }

        scope.selectFriend = function (friend) {
            scope.selectedFriendId = friend.getId();
            EventsService.notify(AppConstants.UI_EVENTS.FRIEND_LIST_ITEM_SELECTED, friend.getId());
        }
    }

    return {
        restrict: 'EA',
        templateUrl: 'templates/dashboard/directives/friends-list.html',
        scope: {
            'listOfFriends': '='
        },
        link: link
    }
}