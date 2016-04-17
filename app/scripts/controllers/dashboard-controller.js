var app = angular.module('viChatter');


app.controller('DashboardController', DashboardController);

DashboardController.$inject = ['$scope', 'SocketService', 'localStorageService', 'AuthenticationService', 'NetworkProvider',
    'BuildObjectsService', 'EventsService', 'AppConstants', '$state', '$location', 'WebRTCService'];


function DashboardController($scope, SocketService, localStorageService, AuthenticationService, NetworkProvider,
                             BuildObjectsService, EventsService, AppConstants, $state, $location, WebRTCService) {

    $scope.friendRequestsList = [];
    $scope.myProfileData = null;
    $scope.friendProfileData = null;
    $scope.messagesList = [];
    $scope.friendsList = [];

    $scope.isFriendRequestListActive = null;
    $scope.isFriendsListActive = null;
    $scope.isMyProfileDataActive = null;
    $scope.isFriendProfileDataActive = null;
    $scope.isMessagesListActive = null;
    $scope.isVideoChatActive = null;


    (function initialize() {
        WebRTCService.prepareRtcConfiguration();
        WebRTCService.prepareIceConfiguration();
        NetworkProvider.initializeConfig();
        SocketService.initialize();
        notifyFriends();
        subscribeOnSocketEvents();
        subscribeOnUiEvents();
        loadFriendsList();
        loadFriendsRequests();
        loadProfile();
    })();


    function notifyFriends() {
        EventsService.notify(AppConstants.SOCKET_EVENTS.FRONT_END.USER_LOGGED_IN_EVENT);
    }

    function subscribeOnSocketEvents() {
        EventsService.subscribe(AppConstants.SOCKET_EVENTS.BACK_END.USER_LOGGED_IN_EVENT, function (e, data) {
            console.log(data);
            //it worked!!
        })


        EventsService.subscribe(AppConstants.SOCKET_EVENTS.BACK_END.USER_LOGGED_OUT_EVENT, function (e, data) {
            console.log(data);
            //it worked
        })


        EventsService.subscribe(AppConstants.SOCKET_EVENTS.BACK_END.ADD_FRIEND_NOTIFICATION, function (e, data) {

        });

        EventsService.subscribe(AppConstants.SOCKET_EVENTS.BACK_END.MESSAGE_NOTIFICATION, function (e, data) {
            $scope.messagesList = BuildObjectsService.addItem(BuildObjectsService.buildMessage(data), $scope.messagesList);
        });

        EventsService.subscribe(AppConstants.SOCKET_EVENTS.BACK_END.USER_STATUS_NOTIFICATION, function (e, data) {

        });
    }

    function subscribeOnUiEvents() {

        EventsService.subscribe(AppConstants.UI_EVENTS.FRIEND_LIST_ITEM_SELECTED, function (e, data) {
            loadMessages(data);
            $scope.isMessagesListActive = true;
            $scope.isVideoChatActive = false;
        });

        EventsService.subscribe(AppConstants.UI_EVENTS.SHOW_FRIEND_PROFILE, function (e, data) {
            loadFriendProfileData();
            $scope.isFriendProfileDataActive = true;
            $scope.isMyProfileDataActive = false;
            $scope.isFriendsListActive = false;
            $scope.isFriendRequestListActive = false;
        });

        EventsService.subscribe(AppConstants.UI_EVENTS.SHOW_FRIENDS_LIST, function (e, data) {
            /*loadFriendsList();*/
            $scope.isFriendsListActive = true;
            $scope.isFriendRequestListActive = false;
            $scope.isFriendProfileDataActive = false;
            $scope.isMyProfileDataActive = false;
        });

        EventsService.subscribe(AppConstants.UI_EVENTS.SHOW_FRIENDS_REQUESTS_LIST, function (e, data) {
            loadFriendRequestsList();
            $scope.isFriendsListActive = false;
            $scope.isFriendRequestListActive = true;
            $scope.isFriendProfileDataActive = false;
            $scope.isMyProfileDataActive = false;

        });

        EventsService.subscribe(AppConstants.UI_EVENTS.SHOW_MY_PROFILE, function (e, data) {
            loadMyProfileData();
            $scope.isMyProfileDataActive = true;
            $scope.isFriendProfileDataActive = false;
            $scope.isFriendsListActive = false;
            $scope.isFriendRequestListActive = false;

        });

        EventsService.subscribe(AppConstants.UI_EVENTS.SHOW_VIDEO_CHAT_WINDOW, function (e, data) {
            $scope.isMessagesListActive = false;
            $scope.isVideoChatActive = true;
        });

        EventsService.subscribe(AppConstants.UI_EVENTS.LOGOUT, function (e, data) {
            EventsService.notify(AppConstants.SOCKET_EVENTS.FRONT_END.USER_LOGGED_OUT_EVENT);
            AuthenticationService.clearUserData();
            $state.go('home');
        })
    }


    $scope.sendMessage = function (message) {
        //WEBSOCKET
    }


    $scope.updateProfile = function (profileData) {

    }

    function loadFriendsList() {
        NetworkProvider.getUserFriends().then(function (result) {
            console.log('Friends : ' + result.payload.friend_list.list);
            $scope.friendsList = BuildObjectsService.buildFriendListItems(result.payload.friend_list.list);
        });
    }

    function loadProfile() {
        NetworkProvider.getProfile().then(function (result) {
            console.log('Profile : ' + result.payload.profile_info);
            console.log(result.payload.profile_info);
        })
    }

    function loadFriendsRequests() {
        NetworkProvider.getFriendsRequests().then(function (result) {
            console.log('Friends requests :' + result.payload.add_friend_list.list);
            $scope.friendRequestsList = BuildObjectsService.buildFriendRequestItems(result.payload.add_friend_list.list);
        })
    }

    function loadFriendRequestsList() {


    }

    function loadMyProfileData() {


    }

    function loadFriendProfileData() {

    }


    function loadMessages(data) {

        var data = {
            userId: data.userId,
            friendId: data.friendId,
            page: data.page,
            count: data.count
        };

        NetworkProvider.getMessages(data).then(function (result) {
            console.log('Messages :' + result.payload.messages);
            $scope.messagesList = BuildObjectsService.buildMessages(result.payload.messages);
        })

    }

    $scope.addFriend = function (friendId) {
        NetworkProvider.addFriendRequest(friendId).then(function (result) {
            if (result.status == 0) {
                console.log(result.payload.message);
            }
        })
    }
}