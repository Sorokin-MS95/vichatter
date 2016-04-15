/**
 * Created by kated on 4/14/2016.
 */
'use strict';

var app = angular.module('antennaApp');

app.directive('vcChatWindow', vcChatWindow);

function vcChatWindow() {

    function link(scope) {

        scope.activePage = null;
        scope.pageCounters = [];
        scope.isPreviousPageControlActive = true;
        scope.isNextPageControlActive = true;

        var getAllPagesCount = function () {
            return Math.ceil(scope.countOfAllElements / scope.numberOfElementsOnPage);
        }

        scope.isPageControlActive = function (pageCounter) {
            return pageCounter == scope.activePage;
        }



        scope.$watch('countOfAllElements', function () {
            updatePageCounters();
        });
    }

    return {
        restrict: 'EA',
        templateUrl: 'templates/web/common/tn-pagination.html',
        scope: {
            'numberOfElementsOnPage': '@',
            'countOfAllElements': '@',
            'numberOfPagesOnScreen': "@",
            'callbackToLoadElements': "&",
            'activePage': '='
        },
        link: link
    }
}