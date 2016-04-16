var app = angular.module('viChatter');


app.controller('DashboardController', DashboardController);

DashboardController.$inject = ['$scope', 'socket', 'localStorageService', 'AuthenticationService', 'NetworkProvider', 'BuildObjectsService', 'EventsService', 'AppConstants'];


function DashboardController($scope, socket, localStorageService, AuthenticationService, NetworkProvider, BuildObjectsService, EventsService, AppConstants) {

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

    })();

    function subscribeOnSocketEvents() {
        EventsService.subscribe(AppConstants.SOCKET_EVENTS.ADD_FRIEND_NOTIFICATION, function (e, data) {

        });

        EventsService.subscribe(AppConstants.SOCKET_EVENTS.MESSAGE_NOTIFICATION, function (e, data) {

        });

        EventsService.subscribe(AppConstants.SOCKET_EVENTS.USER_STATUS_NOTIFICATION, function (e, data) {

        });
    }

    function subscribeOnUiEvents() {

        EventsService.subscribe(AppConstants.UI_EVENTS.FRIEND_LIST_ITEM_SELECTED, function (e, data) {

        });

        EventsService.subscribe(AppConstants.UI_EVENTS.SHOW_CHAT_WINDOW, function (e, data) {

        });

        EventsService.subscribe(AppConstants.UI_EVENTS.SHOW_FRIEND_PROFILE, function (e, data) {

        });

        EventsService.subscribe(AppConstants.UI_EVENTS.SHOW_FRIENDS_LIST, function (e, data) {

        });

        EventsService.subscribe(AppConstants.UI_EVENTS.SHOW_MY_PROFILE, function (e, data) {

        });

        EventsService.subscribe(AppConstants.UI_EVENTS.SHOW_VIDEO_CHAT_WINDOW, function (e, data) {

        });
    }

    $scope.sendMessage = function(message){

    }

    $scope.logout = function(message){

    }

    $scope.updateProfile = function(profileData){

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

        NetworkProvider.getMy(data).then(function (response) {
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