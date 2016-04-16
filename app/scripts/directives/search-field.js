/**
 * Created by kated on 4/14/2016.
 */
'use strict';

var app = angular.module('viChatter');

app.directive('vcSearchField', vcSearchField);

function vcSearchField() {

    function link(scope) {

    }

    return {
        restrict: 'EA',
        templateUrl: 'app/templates/dashboard/directives/search-field.html',
        scope: {
            'callbackToLoadElements': "&"
        },
        link: link
    }
}