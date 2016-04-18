/**
 * Created by kated on 4/14/2016.
 */
angular.module('viChatter')
    .factory('FriendRequestItemBuilder', FriendRequestItemBuilder);

FriendRequestItemBuilder.$inject = [];

function FriendRequestItemBuilder() {

    /**
     * Constructor for FriendRequestItem.
     * @param friendRequestItemData {object} FriendRequestItem data.
     * @constructor
     */
    function FriendRequestItem(friendRequestItemData) {

        this._id = angular.isDefined(friendRequestItemData.id) ? friendRequestItemData.id : null;

        this._nickname = angular.isDefined(friendRequestItemData.nickname) ? friendRequestItemData.nickname : null;

        this._email = angular.isDefined(friendRequestItemData.email) ? friendRequestItemData.email : null;
    }

    /**
     * FriendRequestItem id.
     * @type {string}
     * @private
     */
    FriendRequestItem.prototype._id = null;

    /**
     * FriendRequestItem  nickname.
     * @type {string}
     * @private
     */
    FriendRequestItem.prototype._nickname = null;


    /**
     * FriendRequestItem  email.
     * @type {string}
     * @private
     */
    FriendRequestItem.prototype._email = null;

    /**
     * Returns FriendRequestItem id.
     * @returns {string}
     */
    FriendRequestItem.prototype.getId = function () {
        return this._id;
    };


    /**
     * Returns FriendRequestItem nickname
     * @returns {string}
     */
    FriendRequestItem.prototype.getNickname = function () {
        return this._nickname;
    };


    /**
     * Returns FriendRequestItem  email.
     * @returns {string}
     */
    FriendRequestItem.prototype.getEmail = function () {
        return this._email;
    };


    /**
     * Creates new FriendRequestItem instance.
     * @param friendRequestItemData {object} FriendRequestItem data.
     * @returns {FriendRequestItemBuilder.FriendRequestItem}
     */
    function create(friendRequestItemData) {
        friendRequestItemData = friendRequestItemData || {};
        return new FriendRequestItem(friendRequestItemData);
    }

    return {
        create: create,
        constructor: FriendRequestItem
    };
}