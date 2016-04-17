/**
 * Created by kated on 4/13/2016.
 */
angular.module('viChatter')
    .service('BuildObjectsService', BuildObjectsService);

BuildObjectsService.$inject = ['FriendListItemBuilder', 'MenuItemBuilder', 'FriendRequestItemBuilder', 'LoginDataBuilder', 'MessageBuilder', 'ProfileInfoBuilder', 'RegistrationDataBuilder'];

function BuildObjectsService(FriendListItemBuilder, MenuItemBuilder, FriendRequestItemBuilder, LoginDataBuilder, MessageBuilder, ProfileInfoBuilder, RegistrationDataBuilder) {


    var _buildItems = function (itemsData, builder) {
        if (angular.isArray(itemsData)) {
            var items = [];
            angular.forEach(itemsData, function (itemData) {
                var item = builder.create(itemData);
                items.push(item);
            });

        }

        return items;
    };

    var _getItem = function (itemId, itemsList) {
        return _.find(itemsList, function (item) {
            return item.getItem().getId() === itemId;
        });
    };

    var _removeItem = function (itemId, itemsList) {
        var items = itemsList;
        var index = _.findIndex(items, function (item) {
            return item.getItem().getId() === itemId;
        });
        if (index >= 0) {
            items.splice(index, 1);
        }

        return items;
    };

    var _addItem = function (item, itemsList) {
        itemsList.push(item);
        return itemsList;
    };

    var _replaceItem = function (item, itemsList) {
            var items = itemsList;
            var index = _.findIndex(items, function (o) {
                return o.getItem().getId() === item.getId();
            });
            if (index >= 0) {
                items[index] = item;

            }
            return itemsList;
        }
        ;

    function _buildMenuItem(menuItemData) {
        return MenuItemBuilder.create(menuItemData);
    }

    function _buildMenuItems(menuItemDataList) {
        var results = [];
        if (angular.isArray(menuItemDataList)) {
            angular.forEach(menuItemDataList, function (menuItem) {
                results.push(MenuItemBuilder.create(menuItem));
            });
        }
        return results;
    }

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
        buildItems: _buildItems,
        addItems: _addItem,
        getItem: _getItem,
        replaceItem: _replaceItem,
        removeItem: _replaceItem,
        buildRegistrationData: _buildRegistrationData,
        buildProfileInfo: _buildProfileInfo,
        buildMessages: _buildMessages,
        buildMessage: _buildMessage,
        buildLoginData: _buildLoginData,
        buildFriendRequestItems: _buildFriendRequestItems,
        buildFriendRequestItem: _buildFriendRequestItem,
        buildFriendListItems: _buildFriendListItems,
        buildFriendListItem: _buildFriendListItem,
        buildMenuItem: _buildMenuItem,
        buildMenuItems: _buildMenuItems
    }

}