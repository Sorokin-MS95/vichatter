/**
 * Created by kated on 4/14/2016.
 */
angular.module('viChatter')
    .factory('LoginDataBuilder', LoginDataBuilder);

LoginDataBuilder.$inject = [];

function LoginDataBuilder() {

    /**
     * Constructor for LoginData.
     * @param loginData {object} LoginData data.
     * @constructor
     */
    function LoginData(loginData) {

        this._email = angular.isDefined(loginData.email) ? loginData.email : null;

        this._password = angular.isDefined(loginData.password) ? loginData.password : null;
    }


    /**
     * LoginData  password.
     * @type {string}
     * @private
     */
    LoginData.prototype._password = null;


    /**
     * LoginData  email.
     * @type {string}
     * @private
     */
    LoginData.prototype._email = null;


    /**
     * Returns LoginData password.
     * @returns {string}
     */
    LoginData.prototype.getPassword = function () {
        return this._password;
    };

    /**
     * Returns LoginData email.
     * @returns {string}
     */
    LoginData.prototype.getEmail = function () {
        return this._email;
    };


    /**
     * Creates new LoginData instance.
     * @param loginData {object} LoginData data.
     * @returns {LoginDataBuilder.LoginData}
     */
    function create(loginData) {
        loginData = loginData || {};
        return new LoginData(loginData);
    }

    return {
        create: create,
        constructor: LoginData
    };
}