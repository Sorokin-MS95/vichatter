/**
 * Created by kated on 4/15/2016.
 */
'use strict';

angular.module('viChatter')
    .service('EventsService', eventsService);

eventsService.$inject = ['$rootScope'];

function eventsService($rootScope) {

    function _subscribe(key, callback) {
        return $rootScope.$on(key, function (event, data) {
            callback(event, data);
        });
    }

    function _notify(key, data) {
        $rootScope.$emit(key, data);
    }

    return {
        notify: _notify,
        subscribe: _subscribe
    };
}