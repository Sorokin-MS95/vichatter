/**
 * Created by kated on 4/14/2016.
 */
'use strict';

var app = angular.module('viChatter');


app.directive('vcFriendRequestsList', vcFriendRequestsList);



function vcFriendRequestsList() {

    function link(scope) {

        scope.addFriend = function (id) {
            scope.addFriendCallback(id);
        }
    }

    return {
        restrict: 'EA',
        templateUrl: 'app/templates/dashboard/directives/friend-request-list.html',
        scope: {
            'listOfRequests': '=',
            'addFriendCallback': '&'
        },
        link: link
    }
}