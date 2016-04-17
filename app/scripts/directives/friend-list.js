/**
 * Created by kated on 4/14/2016.
 */
'use strict';

var app = angular.module('viChatter');

app.directive('vcFriendList', vcFriendList);

vcFriendList.$inject = ['EventsService', 'AppConstants', 'localStorageService'];

function vcFriendList(EventsService, AppConstants, localStorageService) {

    function link(scope) {

        scope.selectedFriendId = null;

        scope.isFriendItemSelected = function (id) {
            if (scope.selectedFriendId != null) {
                return scope.selectedFriendId == id;
            }
            else {
                return false;
            }
        }

        scope.selectFriend = function (friend) {
            var data = {
                id: friend.getId()
            };
            scope.selectedFriendId = friend.getId();

            var data = {
                friendId: scope.selectedFriendId,
                userId: localStorageService.get(AppConstants.LOCAL_STORAGE_IDENTIFIERS.USER_ID),
                count: 20,
                page: 1
            };
            
            EventsService.notify(AppConstants.UI_EVENTS.FRIEND_LIST_ITEM_SELECTED, data);
        }
    }

    return {
        restrict: 'EA',
        templateUrl: 'app/templates/dashboard/directives/friend-list.html',
        scope: {
            'listOfFriends': '='
        },
        link: link
    }
}