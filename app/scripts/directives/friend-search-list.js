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

    }

    return {
        restrict: 'EA',
        templateUrl: 'app/templates/dashboard/directives/friend-search-list.html',
        scope: {
            'listOfSearchFriends': '=',
            'addFriendCallback': '&'
        },
        link: link
    }
}