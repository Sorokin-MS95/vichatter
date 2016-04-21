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

        this._nickname = angular.isDefined(profileInfoData.nickname) ? profileInfoData.nickname : null;

        this._email = angular.isDefined(profileInfoData.email) ? profileInfoData.email : null;

    }

    /**
     * ProfileInfo  id.
     * @type {number}
     * @private
     */
    ProfileInfo.prototype._id = null;

    /**
     * ProfileInfo  nickname.
     * @type {string}
     * @private
     */
    ProfileInfo.prototype._nickname = null;


    /**
     * ProfileInfo  email.
     * @type {string}
     * @private
     */
    ProfileInfo.prototype._email = null;


    /**
     * Returns ProfileInfo  id.
     * @returns {number}
     */
    ProfileInfo.prototype.getId = function () {
        return this._id;
    };

    /**
     * Returns ProfileInfo  nickname.
     * @returns {string}
     */
    ProfileInfo.prototype.getNickname = function () {
        return this._nickname;
    };

    /**
     * Returns ProfileInfo  email.
     * @returns {string}
     */
    ProfileInfo.prototype.getEmail = function () {
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
