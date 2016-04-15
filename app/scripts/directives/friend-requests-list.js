/**
 * Created by kated on 4/14/2016.
 */
'use strict';

var app = angular.module('viChatter');

app.directive('vcFriendRequestsList', vcFriendRequestsList);

function vcFriendRequestsList() {

    function link(scope) {

        scope.selectedFriendId = null;

        scope.isFriendItemSelected = function (id) {
            return selectedFriendId.getId() == id;
        }
    }

    return {
        restrict: 'EA',
        templateUrl: 'templates/web/common/tn-pagination.html',
        scope: {
            'listOfFriends': '=',
            'messageWindowActive': '='
        },
        link: link
    }
}