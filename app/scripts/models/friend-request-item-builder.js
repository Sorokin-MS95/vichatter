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

        this._id = angular.isNumber(friendRequestItemData.id) ? friendRequestItemData.id : null;

        this._lastName = angular.isDefined(friendRequestItemData.last_name) ? friendRequestItemData.last_name : null;

        this._firstName = angular.isDefined(friendRequestItemData.first_name) ? friendRequestItemData.first_name : null;

        this._email = angular.isDefined(friendRequestItemData.email) ? friendRequestItemData.email : null;
    }

    /**
     * FriendRequestItem id.
     * @type {string}
     * @private
     */
    FriendRequestItem.prototype._id = null;

    /**
     * FriendRequestItem  first name.
     * @type {string}
     * @private
     */
    FriendRequestItem.prototype._firstName = null;

    /**
     * FriendRequestItem last name.
     * @type {string}
     * @private
     */
    FriendRequestItem.prototype._lastName = null;

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
     * Returns FriendRequestItem first name.
     * @returns {string}
     */
    FriendRequestItem.prototype.getFirstName = function () {
        return this._firstName;
    };

    /**
     * Returns FriendRequestItem last name.
     * @returns {string}
     */
    FriendRequestItem.prototype.getLastName = function () {
        return this._lastName;
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