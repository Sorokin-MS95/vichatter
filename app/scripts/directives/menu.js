/**
 * Created by kated on 4/14/2016.
 */

'use strict';

var app = angular.module('viChatter');


app.directive('vcMenu', vcMenu);

vcMenu.$inject = ['EventsService', 'AppConstants', 'BuildObjectsService'];


function vcMenu(EventsService, AppConstants, BuildObjectsService) {

    function link(scope) {

        var menuStructure = [
            {
                id: 1,
                name: "Friends",
                counter: scope.friendsList.length,
                event_name: AppConstants.UI_EVENTS.SHOW_FRIENDS_LIST

            },
            {
                id: 2,
                name: "My profile",
                counter: null,
                event_name: AppConstants.UI_EVENTS.SHOW_MY_PROFILE
            }
        ];
        scope.menuItems = BuildObjectsService.buildMenuItems(menuStructure);

        scope.selectedMenuItem = null;

        scope.isMenuItemSelected = function (menuItem) {
            return scope.selectedMenuItem == menuItem;
        }

        scope.selectMenuItem = function (menuItem) {
            scope.selectedMenuItem = menuItem;
            EventsService.notify(menuItem.getEventName());
        };

        scope.clickOnAddFriendMenu = function () {
            if (scope.friendRequestsList.length > 0) {
                EventsService.notify(AppConstants.UI_EVENTS.SHOW_FRIENDS_REQUESTS_LIST);
                scope.selectedMenuItem = null;
            }
        }

        scope.clickLogout = function () {
            EventsService.notify(AppConstants.UI_EVENTS.LOGOUT);
        }

    }

    return {
        restrict: 'EA',
        templateUrl: 'app/templates/dashboard/directives/menu.html',
        scope: {
            'friendsList': '=',
            'friendRequestsList': '='
        },
        link: link
    }
}