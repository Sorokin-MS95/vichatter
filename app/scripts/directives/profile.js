/**
 * Created by kated on 4/14/2016.
 */


'use strict';

var app = angular.module('viChatter');


app.directive('vcProfile', vcProfile);

vcProfile.$inject = ['EventsService', 'AppConstants', 'BuildObjectsService'];

function vcProfile(EventsService, AppConstants, BuildObjectsService) {

    function link(scope) {

        scope.profile = {
            email: null,
            nickname: null
        };

        scope.updateProfile

    }

    return {
        restrict: 'EA',
        templateUrl: 'app/templates/dashboard/directives/profile.html',
        scope: {
            'myProfileData': '='
        },
        link: link
    }
}