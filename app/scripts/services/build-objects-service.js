/**
 * Created by kated on 4/13/2016.
 */
angular.module('viChatter')
    .service('BuildObjectsService', BuildObjectsService);

BuildObjectsService.$inject = ['FriendListItemBuilder', 'FriendRequestItemBuilder', 'LoginDataBuilder', 'MessageBuilder', 'ProfileInfoBuilder', 'RegistrationDataBuilder'];

function BuildObjectsService(FriendListItemBuilder, FriendRequestItemBuilder, LoginDataBuilder, MessageBuilder, ProfileInfoBuilder, RegistrationDataBuilder) {

    function _buildFriendListItem(friendListItemData) {
        return FriendListItemBuilder.create(friendListItemData);
    }

    function _buildFriendListItems(friendList) {
        var results = [];
        if (angular.isArray(friendList)) {
            angular.forEach(friendList, function (friendListItem) {
                results.push(FriendListItemBuilder.create(friendListItem));
            });
        }
        return results;
    }

    function _buildFriendRequestItem(friendRequestItemData) {
        return FriendRequestItemBuilder.create(friendRequestItemData);
    }

    function _buildFriendRequestItems(friendRequests) {
        var results = [];
        if (angular.isArray(friendRequests)) {
            angular.forEach(friendRequests, function (friendRequestItem) {
                results.push(FriendRequestItemBuilder.create(friendRequestItem));
            });
        }
        return results;
    }

    function _buildLoginData(loginData) {
        return LoginDataBuilder.create(loginData);
    }

    function _buildMessage(message) {
        return MessageBuilder.create(message);
    }

    function _buildMessages(messages) {
        var results = [];
        if (angular.isArray(messages)) {
            angular.forEach(messages, function (message) {
                results.push(MessageBuilder.create(message));
            });
        }
        return results;
    }

    function _buildProfileInfo(profileInfo) {
        return ProfileInfoBuilder.create(profileInfo);
    }

    function _buildRegistrationData(registrationData) {
        return RegistrationDataBuilder.create(registrationData);
    }

    return {
        buildRegistrationData: _buildRegistrationData,
        buildProfileInfo: _buildProfileInfo,
        buildMessages: _buildMessages,
        buildMessage: _buildMessage,
        buildLoginData: _buildLoginData,
        buildFriendRequestItems: _buildFriendRequestItems,
        buildFriendRequestItem: _buildFriendRequestItem,
        buildFriendListItems: _buildFriendListItems,
        buildFriendListItem: _buildFriendListItem
    }

}