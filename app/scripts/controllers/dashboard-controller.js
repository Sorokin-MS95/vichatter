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
        loadFriendsList();
        loadFriendRequestsList();
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
            loadMessages(data.id);
            $scope.isMessagesListActive = true;
            $scope.isVideoChatActive = false;
        });

        EventsService.subscribe(AppConstants.UI_EVENTS.SHOW_FRIEND_PROFILE, function (e, data) {
            loadFriendProfileData();
            $scope.isFriendProfileDataActive = true;
            $scope.isMyProfileDataActive = false;
        });

        EventsService.subscribe(AppConstants.UI_EVENTS.SHOW_FRIENDS_LIST, function (e, data) {
            loadFriendsList();
            $scope.isFriendsListActive = true;
            $scope.isFriendRequestListActive = false;
        });

        EventsService.subscribe(AppConstants.UI_EVENTS.SHOW_FRIENDS_REQUESTS_LIST, function (e, data) {
            loadFriendRequestsList();
            $scope.isFriendsListActive = false;
            $scope.isFriendRequestListActive = true;
        });

        EventsService.subscribe(AppConstants.UI_EVENTS.SHOW_MY_PROFILE, function (e, data) {
            loadMyProfileData();
            $scope.isMyProfileDataActive = true;
            $scope.isFriendProfileDataActive = false;
        });

        EventsService.subscribe(AppConstants.UI_EVENTS.SHOW_VIDEO_CHAT_WINDOW, function (e, data) {
            $scope.isMessagesListActive = false;
            $scope.isVideoChatActive = true;
        });
    }

    $scope.sendMessage = function (message) {
        //WEBSOCKET
    }

    $scope.logout = function () {
        NetworkProvider.logout().then(function() {
            AuthenticationService.clearUserData();
            $location.path('/login');
        });
    }

    $scope.updateProfile = function (profileData) {

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


    }

    function loadMyProfileData() {


    }

    function loadFriendProfileData() {


    }

    function loadMessages() {

       /* NetworkProvider.getAllAntennas(data).then(function (response) {
            if (response.success) {
                var antennasData = response.payload.antennas;
                $scope.buildItems(antennasData, BuildObjectsService.AntennaBuilder);
                $scope.countOfAllElements = response.payload.count;

            } else {
                $log.debug(response);
            }
        });*/
    }

    /*console.log('init!');
     socket.emit('user_logged_in', {
     userId : localStorageService.get('user_id')
     });*/


}