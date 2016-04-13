/**
 * Created by kated on 4/13/2016.
 */
'use strict';

angular.module('viChatter')
    .service('NetworkProvider', NetworkProvider);

NetworkProvider.$inject = ['$http', '$q', 'ResponseBuilder'];

function NetworkProvider($http, $q, ResponseBuilder) {

    function _post(url, data) {
        var deferred = $q.defer();

        $http.post(url, data).then(function (data) {
            var response = ResponseBuilder.create(data);
            deferred.resolve(response);
        }, function (data) {
            var response = ResponseBuilder.create(data);
            deferred.reject(response);
        });

        return deferred.promise;
    }

    function _get(url, params) {
        var deferred = $q.defer();

        $http.get(url, {
            params: params
        }).then(function (data) {
            var response = ResponseBuilder.create(data);
            deferred.resolve(response);
        }, function (data) {
            var response = ResponseBuilder.create(data);
            deferred.reject(response);
        });

        return deferred.promise;
    }


    function _login(userData) {

        var params = {
            'email': userData.email,
            'password': userData.password
        };

        return _post('/api/user/login', params);
    }

    function _register(userData) {

        var params = {
            'email': userData.email,
            'password': userData.password,
            'nickname': userData.nickname
        };

        return _post('/api/user/register', params);
    }

    function _logout() {
        return _post('/api/user/logout');
    }

    /*************
     *   Users   *
     *************/

    function _getAllUsers(attrs) {

        var data = {};
        if (attrs.hasOwnProperty("page") && attrs.page !== null) {
            data.page = attrs.page;
        }

        if (attrs.hasOwnProperty("numberOfElements") && attrs.numberOfElements !== null) {
            data.count = attrs.numberOfElements;
        }
        return _get('/api/user/all', data);
    }

    function _createUser(userModel) {

        var rolesData = [];

        angular.forEach(userModel.roles, function (role) {
            rolesData.push(role.id);
        });

        var params = {
            'email': userModel.email,
            'firstname': userModel.firstName,
            'lastname': userModel.lastName,
            'phone': userModel.phone,
            'citizenship_status': userModel.citizenship,
            'job_title': userModel.job,
            'password': userModel.password,
            'roles': rolesData
        };

        return _post('/api/user/create', params);
    }

    function _updateUser(userId, userModel) {
        var rolesData = [];

        angular.forEach(userModel.roles, function (role) {
            rolesData.push(role.id);
        });

        var params = {
            'email': userModel.email,
            'firstname': userModel.firstName,
            'lastname': userModel.lastName,
            'phone': userModel.phone,
            'citizenship_status': userModel.citizenship,
            'job_title': userModel.job,
            'password': userModel.password,
            'roles': rolesData
        };

        return _post('/api/user/' + userId + '/update', params);
    }

    function _deleteUser(userId) {
        return _post('/api/user/' + userId + '/delete');
    }

    function _getUser(userId) {
        return _get('/api/user/' + userId);
    }


    return {
        login: _login,
        register: _register,
        logout: _logout,

        getAllUsers: _getAllUsers,
        createUser: _createUser,
        updateUser: _updateUser,
        deleteUser: _deleteUser,
        getUser: _getUser
    };
}