var app = angular.module('viChatter');


app.controller('DashboardController', DashboardController);

DashboardController.$inject = ['$scope', 'socket', 'localStorageService', 'AuthenticationService', 'NetworkService', 'BuildObjectsService'];


function DashboardController($scope, socket, localStorageService, AuthenticationService, NetworkService, BuildObjectsService) {

    $controller('BaseController', {$scope: $scope});

    $scope.friendsList = [];
    $scope.friendRequestsList = [];
    $scope.myProfileData = null;
    $scope.friendProfileData = null;
    $scope.messagesList = [];


    $scope.isFriendRequestListActive = null;
    $scope.isFriendsListActive = null;
    $scope.isMyProfileDataActive = null;
    $scope.isFriendProfileDataActive = null;
    $scope.isMessagesListActive = null;
    $scope.isVideoChatActive = null;


    (function initialize() {
        $scope.activePageNumber = $scope.firstPageNumber;
        loadAntennas(
            $scope.firstPageNumber, $scope.numberOfElementsOnPage);
        EventsService.subscribe(AppConstants.SOCKET_EVENTS.ADD_FRIEND_NOTIFICATION, function (e, friend) {

        });
    })();

    function subscribeOnSocketEvents(){
        EventsService.subscribe(AppConstants.SOCKET_EVENTS.ADD_FRIEND_NOTIFICATION, function (e, friend) {

        });

        EventsService.subscribe(AppConstants.SOCKET_EVENTS.ADD_FRIEND_NOTIFICATION, function (e, friend) {

        });

        EventsService.subscribe(AppConstants.SOCKET_EVENTS.ADD_FRIEND_NOTIFICATION, function (e, friend) {

        });
    }

    function loadFriendsList() {

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

    function loadFriendRequestsList() {

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

    function loadMyProfileData() {

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

    function loadFriendProfileData() {

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

    function loadFriendProfileData() {

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
     userId : localStorageService.get('user_id')
     });*/

    /*NetworkProvider.logout().then(function() {
     AuthenticationService.clearUserData();
     $location.path('/login');
     });*/

}