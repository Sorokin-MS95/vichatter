var app = angular.module('viChatter');


app.controller('DashboardController', DashboardController);

DashboardController.$inject = ['$scope', 'SocketService', 'localStorageService', 'AuthenticationService', 'NetworkProvider',
    'BuildObjectsService', 'EventsService', 'AppConstants', '$state', '$location', 'WebRTCService', 'PopupService'];


function DashboardController($scope, SocketService, localStorageService, AuthenticationService, NetworkProvider,
                             BuildObjectsService, EventsService, AppConstants, $state, $location, WebRTCService, PopupService) {

    $scope.friendRequestsList = [];
    $scope.myProfileData = null;
    $scope.friendProfileData = null;
    $scope.friendsList = [];
    $scope.selectedFriendId = null;
    $scope.searchString = "";
    $scope.messagesList = [];
    $scope.isFriendRequestListActive = null;
    $scope.isFriendsListActive = null;
    $scope.isMyProfileDataActive = null;
    $scope.isFriendProfileDataActive = null;
    $scope.isMessagesListActive = null;
    $scope.isFriendSearchListActive = null;
    $scope.isVideoChatActive = null;
    $scope.messagesOnPageCount = 0;
    $scope.messagesPageNumber = 0;
    $scope.searchFriendsList = [];


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
        PopupService.showAcceptDeclinePopup("You've got new friendship request",
            'Do you want to confirm addition of friend?', function () {
            });
    })();


    function notifyFriends() {
        EventsService.notify(AppConstants.SOCKET_EVENTS.FRONT_END.USER_LOGGED_IN_EVENT);
    }

    function subscribeOnSocketEvents() {

        EventsService.subscribe(AppConstants.SOCKET_EVENTS.BACK_END.VIDEO_CALL_REQUEST, function (e, data) {
            PopupService.showAcceptDeclinePopup("You've got a call from" + data.nickname,
                'Do you want to accept call?', function () {
                    EventsService.notify(AppConstants.SOCKET_EVENTS.FRONT_END.ACCEPT_CALL, data);
                });
        });


        EventsService.subscribe(AppConstants.SOCKET_EVENTS.BACK_END.VIDEO_CALL_NOTIFICATION, function (e, data) {
                PopupService.showAcceptDeclinePopup("You've got a call from" + data.nickname,
                    'Do you want to accept call?', function () {
                        EventsService.notify(AppConstants.SOCKET_EVENTS.FRONT_END.ACCEPT_CALL, data);
                    });
            }
        );

        EventsService.subscribe(AppConstants.SOCKET_EVENTS.BACK_END.ACCEPT_CALL, function (e, data) {
                //TODO connect
            }
        );
        EventsService.subscribe(AppConstants.SOCKET_EVENTS.BACK_END.USER_LOGGED_IN_EVENT, function (e, data) {
            var user = BuildObjectsService.getItem(data.userId, $scope.friendsList);

            var index = _.findIndex($scope.friendsList, function (item) {
                return item.getId() === user.getId();
            });
            if (index >= 0) {
                $scope.$apply(function () {
                    $scope.friendsList[index].setOnline(true);
                })

            }

        });

        EventsService.subscribe(AppConstants.SOCKET_EVENTS.FRONT_END.ADD_FRIEND_NOTIFICATION, function (e, data) {
            $scope.friendsList = BuildObjectsService.pushItem(BuildObjectsService.buildFriendListItem(data), $scope.friendsList);
        });


        EventsService.subscribe(AppConstants.SOCKET_EVENTS.BACK_END.USER_LOGGED_OUT_EVENT, function (e, data) {
            var user = BuildObjectsService.getItem(data.userId, $scope.friendsList);
            var index = _.findIndex($scope.friendsList, function (item) {
                return item.getId() === user.getId();
            });
            if (index >= 0) {
                $scope.$apply(function () {
                    $scope.friendsList[index].setOnline(false);
                })
            }
        })

        EventsService.subscribe(AppConstants.SOCKET_EVENTS.BACK_END.ADD_FRIEND_NOTIFICATION, function (e, data) {

            $scope.$apply(function () {
                $scope.friendsList = BuildObjectsService.addItem(BuildObjectsService.buildFriendListItem(data), $scope.friendsList);
            })


            /* console.log('added user! Process on front-end');
             function addFriendCallback() {
             $scope.friendsList = BuildObjectsService.addItem(BuildObjectsService.buildFriendListItem(data.friend));
             }

             PopupService.showAcceptDeclinePopup("You've got new friendship request",
             'Do you want to confirm addition of friend?', addFriendCallback);*/

            //TODO it should be not here. This method needs to add user in list of friends
        });

        EventsService.subscribe(AppConstants.SOCKET_EVENTS.BACK_END.MESSAGE_NOTIFICATION, function (e, data) {
            $scope.$apply(function () {
                $scope.messagesList = BuildObjectsService.pushItem(BuildObjectsService.buildMessage(data), $scope.messagesList);
            });

        });


        EventsService.subscribe(AppConstants.SOCKET_EVENTS.BACK_END.USER_STATUS_NOTIFICATION, function (e, data) {

        });


        EventsService.subscribe(AppConstants.SOCKET_EVENTS.BACK_END.USER_FRIENDSHIP_REQUEST, function (e, data) {
            $scope.$apply(function () {
                $scope.friendRequestsList = BuildObjectsService.pushItem(BuildObjectsService.buildFriendRequestItem(data), $scope.friendRequestsList);
            });
            //todo render popup about new friends request
        });
    }

    function subscribeOnUiEvents() {

        EventsService.subscribe(AppConstants.UI_EVENTS.ADD_FRIEND, function (e, data) {
            //todo
            EventsService.notify(AppConstants.SOCKET_EVENTS.FRONT_END.ADD_FRIEND_NOTIFICATION, data);
            $scope.friendRequestsList = BuildObjectsService.removeItem(data.getId(), $scope.friendRequestsList);
        });

        EventsService.subscribe(AppConstants.UI_EVENTS.FRIEND_LIST_ITEM_SELECTED, function (e, data) {
            $scope.messagesOnPageCount = 10;
            $scope.messagesPageNumber = 1;
            data.count = $scope.messagesOnPageCount;
            data.page = $scope.messagesPageNumber;
            loadMessages(data);
            $scope.selectedFriendId = data.friendId;
            $scope.isMessagesListActive = true;
            $scope.isVideoChatActive = false;
        });

        EventsService.subscribe(AppConstants.UI_EVENTS.LOAD_MESSAGES_REQUEST, function (e, data) {
            $scope.messagesPageNumber++;
            data.count = $scope.messagesOnPageCount;
            data.page = $scope.messagesPageNumber;
            loadMoreMessages(data);
        });

        EventsService.subscribe(AppConstants.UI_EVENTS.SHOW_FRIEND_PROFILE, function (e, data) {
            loadFriendProfileData();
            $scope.isFriendProfileDataActive = true;
            $scope.isMyProfileDataActive = false;
            $scope.isFriendsListActive = false;
            $scope.isFriendRequestListActive = false;
        });

        EventsService.subscribe(AppConstants.UI_EVENTS.SHOW_SEARCH_LIST, function (e, data) {
            $scope.loadSearchFriends(data);
            $scope.isFriendSearchListActive = true;
            $scope.isFriendsListActive = false;
            $scope.isFriendRequestListActive = false;
            $scope.isFriendProfileDataActive = false;

        });

        EventsService.subscribe(AppConstants.UI_EVENTS.HIDE_SEARCH_LIST, function (e, data) {
            $scope.isFriendSearchListActive = false;
            $scope.searchFriendsList = [];
            $scope.isFriendsListActive = true;
            $scope.isFriendRequestListActive = false;
            $scope.isFriendProfileDataActive = false;

        });


        EventsService.subscribe(AppConstants.UI_EVENTS.SHOW_FRIENDS_LIST, function (e, data) {
            loadFriendsList();
            $scope.isFriendsListActive = true;
            $scope.isFriendRequestListActive = false;
            $scope.isFriendProfileDataActive = false;
            $scope.isMyProfileDataActive = false;
        });

        EventsService.subscribe(AppConstants.UI_EVENTS.SHOW_FRIENDS_REQUESTS_LIST, function (e, data) {
            loadFriendsRequests();
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
            //todo destroy controller
            $state.go('home', {reload: true});

        });

        EventsService.subscribe(AppConstants.UI_EVENTS.REQUEST_FRIENDSHIP, function (e, data) {
            EventsService.notify(AppConstants.SOCKET_EVENTS.FRONT_END.USER_FRIENDSHIP_REQUEST, data);
            $scope.searchFriendsList = BuildObjectsService.removeItem(data.getId(), $scope.searchFriendsList);
        })
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


    function loadMyProfileData() {


    }

    function loadFriendProfileData() {

    }

    $scope.loadSearchFriends = function (queryString) {
        NetworkProvider.getSearchListOfFriends(queryString).then(function (result) {
            console.log('List of search friends:' + result.payload.add_friend_list.list);
            $scope.searchFriendsList = BuildObjectsService.buildFriendRequestItems(result.payload.add_friend_list.list);
        });
    };


    function loadMessages(data) {

        var data = {
            userId: data.userId,
            friendId: data.friendId,
            page: data.page,
            count: data.count
        };

        NetworkProvider.getMessages(data).then(function (result) {
            console.log('First load messages :' + result.payload.messages);
            $scope.messagesList = BuildObjectsService.buildMessages(result.payload.messages);
        });

    }

    function loadMoreMessages(data) {
        var data = {
            userId: data.userId,
            friendId: data.friendId,
            page: data.page,
            count: data.count
        };

        NetworkProvider.getMessages(data).then(function (result) {
            $scope.messagesList = BuildObjectsService.addItems(
                BuildObjectsService.buildMessages(result.payload.messages), $scope.messagesList);
        });
    }

    $scope.addFriend = function (friend) {
        NetworkProvider.addFriendRequest(friend.getId()).then(function (result) {
            if (result.status == 0) {
                var friendData = {
                    id: friend.getId(),
                    nickname: friend.getLastName() + " " + friend.getFirstName(),
                    email: friend.getEmail()
                };
                $scope.friendsList = BuildObjectsService.addItem(BuildObjectsService.buildFriendListItem(data), $scope.friendsList);
                $scope.friendRequestsList = BuildObjectsService.removeItem(friend, $scope.friendRequestsList);
            }
        })
    }
}