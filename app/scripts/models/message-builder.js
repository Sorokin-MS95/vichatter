/**
 * Created by kated on 4/14/2016.
 */
/**
 * Created by kated on 4/14/2016.
 */
'use strict';

angular.module('viChatter')
    .factory('MessageBuilder', MessageBuilder);

MessageBuilder.$inject = [];

function MessageBuilder() {

    /**
     * Message constructor.
     * @param messageData
     * @constructor
     */
    function Message(messageData) {


        this._id = angular.isDefined(messageData.id) ? messageData.id : null;

        this._senderId = angular.isDefined(messageData.sender_id) ? messageData.sender_id : null;

        this._text = angular.isDefined(messageData.text) ? messageData.text : null;

        this._timestamp = angular.isString(messageData['timestamp']) ? new Date(messageData['timestamp']) : null;

        this._lastName = angular.isDefined(messageData.last_name) ? messageData.last_name : null;

        this._firstName = angular.isDefined(messageData.first_name) ? messageData.first_name : null;

        this._email = angular.isDefined(messageData.email) ? messageData.email : null;
    }

    /**
     * Message id.
     * @type {String}
     * @private
     */
    Message.prototype._id = null;

    /**
     * Message sender id.
     * @type {String}
     * @private
     */
    Message.prototype._senderId = null;

    /**
     * Message text.
     * @type {string}
     * @private
     */
    Message.prototype._text = null;


    /**
     * Message  first name.
     * @type {string}
     * @private
     */
    Message.prototype._firstName = null;

    /**
     * Message last name.
     * @type {string}
     * @private
     */
    Message.prototype._lastName = null;

    /**
     * Message  email.
     * @type {string}
     * @private
     */
    Message.prototype._email = null;


    /**
     * Message  timestamp.
     * @type {Date}
     * @private
     */
    Message.prototype._timestamp = null;

    /**
     * Returns Message id.
     * @returns {string}
     */
    Message.prototype.getId = function () {
        return this._id;
    };

    /**
     * Returns Message sender id.
     * @returns {string}
     */
    Message.prototype.getSenderId = function () {
        return this._senderId;
    };

    /**
     * Returns Message first name.
     * @returns {string}
     */
    Message.prototype.getFirstName = function () {
        return this._firstName;
    };

    /**
     * Returns Message last name.
     * @returns {string}
     */
    Message.prototype.getLastName = function () {
        return this._lastName;
    };


    /**
     * Returns Message  email.
     * @returns {string}
     */
    Message.prototype.getEmail = function () {
        return this._email;
    };

    /**
     * Returns Message text.
     * @returns {string}
     */
    Message.prototype.getText = function () {
        return this._text;
    };


    /**
     * Returns Message date of birth.
     * @returns {date}
     */
    Message.prototype.getTimestamp = function () {
        return this._timestamp;
    };

    /**
     * Creates new Message instance.
     * @param messageData
     * @returns {MessageBuilder.Message}
     */
    function create(messageData) {
        return new Message(messageData);
    }

    return {
        create: create,
        constructor: Message
    };
}
