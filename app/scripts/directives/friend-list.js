/**
 * Created by kated on 4/14/2016.
 */
'use strict';

var app = angular.module('viChatter');

app.directive('vcFriendList', vcFriendList);

vcFriendList.$inject = ['EventsService', 'AppConstants'];

function vcFriendList(EventsService, AppConstants) {

    function link(scope) {

        scope.selectedFriendId = null;

        scope.isFriendItemSelected = function (id) {
            return selectedFriendId.getId() == id;
        }

        scope.selectFriend = function (friend) {
            var data = {
                id: friend.getId()
            };
            scope.selectedFriendId = friend.getId();
            EventsService.notify(AppConstants.UI_EVENTS.FRIEND_LIST_ITEM_SELECTED, data);
        }
    }

    return {
        restrict: 'EA',
        templateUrl: 'app/templates/dashboard/directives/friends-list.html',
        scope: {
            'listOfFriends': '='
        },
        link: link
    }
}