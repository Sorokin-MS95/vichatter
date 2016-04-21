/**
 * Created by kated on 4/14/2016.
 */
angular.module('viChatter')
    .factory('FriendListItemBuilder', FriendListItemBuilder);

FriendListItemBuilder.$inject = [];

function FriendListItemBuilder() {

    /**
     * Constructor for FriendListItem.
     * @param friendListItemData {object} FriendListItem data.
     * @constructor
     */
    function FriendListItem(friendListItemData) {

        this._id = angular.isDefined(friendListItemData.id) ? friendListItemData.id : null;

        this._lastName = angular.isDefined(friendListItemData.last_name) ? friendListItemData.last_name : null;

        this._nickname = angular.isDefined(friendListItemData.nickname) ? friendListItemData.nickname : null;


        this._lastMessage = angular.isDefined(friendListItemData.last_message) ? friendListItemData.last_message : null;

        this._unreadMessagesCount = angular.isNumber(friendListItemData.unread_messages_count) ? friendListItemData.unread_messages_count : null;

        this._lastMessageTime = angular.isString(friendListItemData['last_message_time']) ? new Date(friendListItemData['last_message_time']) : null;

        this._online = angular.isDefined(friendListItemData.online) ? friendListItemData.online : null;
    }

    /**
     * FriendListItem id.
     * @type {string}
     * @private
     */
    FriendListItem.prototype._id = null;

    /**
     * FriendListItem  nickname.
     * @type {string}
     * @private
     */
    FriendListItem.prototype._nickname = null;


    /**
     * FriendListItem  email.
     * @type {string}
     * @private
     */
    FriendListItem.prototype._email = null;

    /**
     * FriendListItem last message.
     * @type {string}
     * @private
     */
    FriendListItem.prototype._lastMessage = null;

    /**
     * FriendListItem last message.
     * @type {number}
     * @private
     */
    FriendListItem.prototype._unreadMessagesCount = null;

    /**
     * FriendListItem last message time.
     * @type {Date}
     * @private
     */
    FriendListItem.prototype._lastMessageTime = null;


    /**
     * FriendListItem online.
     * @type {boolean}
     * @private
     */
    FriendListItem.prototype._online = null;


    /**
     * Returns FriendListItem id.
     * @returns {string}
     */
    FriendListItem.prototype.getId = function () {
        return this._id;
    };

    /**
     * Returns FriendListItem nickname.
     * @returns {string}
     */
    FriendListItem.prototype.getNickname = function () {
        return this._nickname;
    };


    /**
     * Returns FriendListItem  email.
     * @returns {string}
     */
    FriendListItem.prototype.getEmail = function () {
        return this._email;
    };


    /**
     * Returns FriendListItem  last message.
     * @returns {string}
     */
    FriendListItem.prototype.getLastMessage = function () {
        return this._lastMessage;
    };

    /**
     * Returns FriendListItem  unread Messages Count
     * @returns {number}
     */
    FriendListItem.prototype.getUnreadMessagesCount = function () {
        return this._unreadMessagesCount;
    };

    /**
     * Returns FriendListItem  last Message Time
     * @returns {String}
     */
    FriendListItem.prototype.getLastMessageTime = function () {
        if (this._lastMessageTime != null) {
            var currentDate = new Date().getTime();
            var timeInterval = currentDate - this._lastMessageTime.getTime();
            if (timeInterval < 3600) {
                var result = new Date(timeInterval);
                return result.getSeconds() + " seconds ago";
            }

            if ((timeInterval >= 3600) && (timeInterval < 3600000)) {
                var result = new Date(timeInterval);
                return result.getMinutes() + " minutes ago";
            }

            if ((timeInterval >= 3600000) && (timeInterval < 86400000)) {
                var result = new Date(timeInterval);
                return result.getHours() + " hours ago";
            }
            if (timeInterval >= 86400000) {
                return this._lastMessageTime;
            }
        }
        else{
            return null;
        }

    };

    /**
     * Returns FriendListItem  online
     * @returns {Date}
     */
    FriendListItem.prototype.getOnline = function () {
        return this._online;
    };


    FriendListItem.prototype.setOnline = function (value) {
        this._online = value;
    }


    /**
     * Creates new FriendListItem instance.
     * @param friendListItemData {object} FriendListItem data.
     * @returns {FriendListItemBuilder.FriendListItem}
     */
    function create(friendListItemData) {
        friendListItemData = friendListItemData || {};
        return new FriendListItem(friendListItemData);
    }

    return {
        create: create,
        constructor: FriendListItem
    };
}