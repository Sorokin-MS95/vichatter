/**
 * Created by kated on 4/14/2016.
 */
'use strict';

angular.module('viChatter')
    .factory('ProfileInfoBuilder', ProfileInfoBuilder);

ProfileInfoBuilder.$inject = [];

function ProfileInfoBuilder() {

    /**
     * ProfileInfo constructor.
     * @param profileInfoData
     * @constructor
     */
    function ProfileInfo(profileInfoData) {

        this._id = angular.isDefined(profileInfoData.id) ? profileInfoData.id : null;
        
        this._lastName = angular.isDefined(profileInfoData.last_name) ? profileInfoData.last_name : null;

        this._firstName = angular.isDefined(profileInfoData.first_name) ? profileInfoData.first_name : null;

        this._nickname = angular.isDefined(profileInfoData.nickname) ? profileInfoData.nickname : null;

        this._city = angular.isDefined(profileInfoData.city) ? profileInfoData.city : null;

        this._phoneNumber = angular.isDefined(profileInfoData.phone_number) ? profileInfoData.phone_number : null;

        this._dateOfBirth = angular.isString(profileInfoData['date_of_birth']) ? new Date(profileInfoData['date_of_birth']) : null;

        this._gender = angular.isDefined(profileInfoData.gender) ? profileInfoData.gender : null;

        this._email = angular.isDefined(profileInfoData.email) ? profileInfoData.email : null;


    }

    /**
     * ProfileInfo  first name.
     * @type {string}
     * @private
     */
    ProfileInfo.prototype._firstName = null;

    /**
     * ProfileInfo last name.
     * @type {string}
     * @private
     */
    ProfileInfo.prototype._lastName = null;

    /**
     * ProfileInfo  nickname.
     * @type {string}
     * @private
     */
    ProfileInfo.prototype._nickname = null;

    /**
     * ProfileInfo city.
     * @type {string}
     * @private
     */
    ProfileInfo.prototype._city = null;


    /**
     * ProfileInfo  gender.
     * @type {string}
     * @private
     */
    ProfileInfo.prototype._gender = null;

    /**
     * ProfileInfo  phoneNumber.
     * @type {string}
     * @private
     */
    ProfileInfo.prototype._phoneNumber = null;

    /**
     * Message  email.
     * @type {string}
     * @private
     */
    Message.prototype._email = null;

    /**
     * ProfileInfo  dateOfBirth.
     * @type {Date}
     * @private
     */
    ProfileInfo.prototype._dateOfBirth = null;



    /**
     * Returns ProfileInfo first name.
     * @returns {string}
     */
    ProfileInfo.prototype.getFirstName = function() {
        return this._firstName;
    };

    /**
     * Returns ProfileInfo last name.
     * @returns {string}
     */
    ProfileInfo.prototype.getLastName = function() {
        return this._lastName;
    };


    /**
     * Returns ProfileInfo  nickname.
     * @returns {string}
     */
    ProfileInfo.prototype.getNickname = function() {
        return this._nickname;
    };

    /**
     * Returns ProfileInfo  city.
     * @returns {string}
     */
    ProfileInfo.prototype.getCity = function() {
        return this._city;
    };


    /**
     * Returns ProfileInfo  gender.
     * @returns {string}
     */
    ProfileInfo.prototype.getGender = function() {
        return this._gender;
    };

    /**
     * Returns ProfileInfo  phoneNumber.
     * @returns {string}
     */
    ProfileInfo.prototype.getPhoneNumber = function() {
        return this._phoneNumber;
    };


    /**
     * Returns ProfileInfo date of birth.
     * @returns {date}
     */
    ProfileInfo.prototype.getDateOfBirth = function() {
        return this._dateOfBirth;
    };

    /**
     * Returns Message  email.
     * @returns {string}
     */
    Message.prototype.getEmail = function () {
        return this._email;
    };

    /**
     * Creates new ProfileInfo instance.
     * @param profileInfoData
     * @returns {ProfileInfoBuilder.ProfileInfo}
     */
    function create(profileInfoData) {
        return new ProfileInfo(profileInfoData);
    }

    return {
        create: create,
        constructor: ProfileInfo
    };
}
