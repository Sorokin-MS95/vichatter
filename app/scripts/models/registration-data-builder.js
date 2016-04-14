/**
 * Created by kated on 4/13/2016.
 */
angular.module('viChatter')
    .factory('RegistrationDataBuilder', RegistrationDataBuilder);

RegistrationDataBuilder.$inject = [];

function RegistrationDataBuilder() {

    /**
     * Constructor for RegistrationData.
     * @param registrationData {object} RegistrationData data.
     * @constructor
     */
    function RegistrationData(registrationData) {

        this._email = angular.isDefined(registrationData.email) ? registrationData.email : null;

        this._password = angular.isDefined(registrationData.password) ? registrationData.password : null;

        this._nickname = angular.isDefined(registrationData.password) ? registrationData.password : null;
    }

    /**
     * RegistrationData  first name.
     * @type {string}
     * @private
     */
    RegistrationData.prototype._password = null;


    /**
     * RegistrationData  email.
     * @type {string}
     * @private
     */
    RegistrationData.prototype._email = null;


    /**
     * RegistrationData  nickname
     * @type {string}
     * @private
     */
    RegistrationData.prototype._nickname = null;


    /**
     * Returns RegistrationData password.
     * @returns {string}
     */
    RegistrationData.prototype.getPassword = function () {
        return this._password;
    };

    /**
     * Returns RegistrationData email.
     * @returns {string}
     */
    RegistrationData.prototype.getEmail = function () {
        return this._email;
    };

    /**
     * Returns RegistrationData nickname.
     * @returns {string}
     */
    RegistrationData.prototype.getNickname = function () {
        return this._nickname;
    };


    /**
     * Creates new RegistrationData instance.
     * @param registrationData {object} RegistrationData data.
     * @returns {RegistrationDataBuilder.RegistrationData}
     */
    function create(registrationData) {
        registrationData = registrationData || {};
        return new RegistrationData(registrationData);
    }

    return {
        create: create,
        constructor: RegistrationData
    };
}