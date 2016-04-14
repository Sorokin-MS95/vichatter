var app = angular.module('viChatter');


app.controller('DashboardController', DashboardController);

DashboardController.$inject=['$scope', 'socket', 'localStorageService', 'AuthenticationService'];


function DashboardController($scope, socket, localStorageService, AuthenticationService){

    (function initialize() {
        $scope.activePageNumber = $scope.firstPageNumber;
        loadAntennas(
            $scope.firstPageNumber, $scope.numberOfElementsOnPage);
    })();

    function loadDashboardData() {
        var data = {};
        if (angular.isNumber(page)) {
            data.page = page;
        }
        if (angular.isNumber(numberOfElements)) {
            data.numberOfElements = numberOfElements;
        }
        NetworkProvider.getAllAntennas(data).then(function (response) {
            if (response.success) {
                var antennasData = response.payload.antennas;
                $scope.buildItems(antennasData, BuildObjectsService.AntennaBuilder);
                $scope.countOfAllElements = response.payload.count;

            } else {
                $log.debug(response);
            }
        });
    }

    /*console.log('init!');
   socket.emit('user_logged_in', {
       userId : localStorageService.get('userId')
   });*/

    /*NetworkProvider.logout().then(function() {
        AuthenticationService.clearUserData();
        $location.path('/login');
    });*/

}