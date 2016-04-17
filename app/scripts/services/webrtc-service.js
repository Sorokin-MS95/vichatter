var app = angular.module('viChatter');


app.service('WebRtcService', WebRtcService);

WebRtcService.inject=['$rootScope', 'EventsService', 'AppConstants', 'localStorageService'];

function WebRtcService($rootScope, EventsService, AppConstants, localStorageService){

    var options = {
        audio : true,
        video : true
    };

    


}
