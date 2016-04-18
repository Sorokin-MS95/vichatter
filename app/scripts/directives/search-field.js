/**
 * Created by kated on 4/14/2016.
 */
'use strict';

var app = angular.module('viChatter');

app.directive('vcSearchField', vcSearchField);

vcSearchField.$inject = ['EventsService', 'AppConstants'];

function vcSearchField(EventsService, AppConstants) {

    function link(scope) {


        scope.$watch('searchString', function () {
            if (scope.searchString.length != 0) {
                EventsService.notify(AppConstants.UI_EVENTS.SHOW_SEARCH_LIST, scope.searchString);
            }
            else {
                EventsService.notify(AppConstants.UI_EVENTS.HIDE_SEARCH_LIST);
            }
        });
    }

    return {
        restrict: 'EA',
        templateUrl: 'app/templates/dashboard/directives/search-field.html',
        scope: {
            'searchString':"="
        },
        link: link
    }
}