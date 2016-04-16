/**
 * Created by kated on 4/13/2016.
 */
'use strict';

angular.module('viChatter')
    .service('NetworkProvider', NetworkProvider);

NetworkProvider.$inject = ['$http', '$q', 'ResponseBuilder', 'localStorageService', 'AppConstants'];

function NetworkProvider($http, $q, ResponseBuilder, localStorageService, AppConstants) {

    var config = {
        headers: {
            'access_token': localStorageService.get(AppConstants.LOCAL_STORAGE_IDENTIFIERS.ACCESS_TOKEN)
        }
    };

    function _post(url, data) {
        var deferred = $q.defer();

        $http.post(url, data, config).then(function (data) {
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
        }, config).then(function (data) {
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
        return _post('/api/auth/login', params);
    }

    function _register(userData) {

        var params = {
            'email': userData.email,
            'password': userData.password,
            'nickname': userData.nickname
        };

        return _post('/api/auth/register', params);
    }

    function _logout(userId) {
        var data = {};
        data.userId = userId;
        return _post('/api/auth/logout');
    }

    function _getFirstLoadData(userId) {
        var data = {};

        if (userId !== null) {
            data.user_id = userId;
        }

        return _get('/api/profile', data);
    }

    function _getFriendProfile(friendId) {

        var data = {};

        if (friendId !== null) {
            data.friend_id = friendId;
        }

        return _get('/api/profile', data);

    }

    function _getMessages(attrs) {
        var data = {};

        if (attrs.hasOwnProperty("userId") && attrs.userId !== null) {
            data.page = attrs.page;
        }

        if (attrs.hasOwnProperty("friendId") && attrs.friendId !== null) {
            data.friend_id = attrs.friend_id;
        }

        if (attrs.hasOwnProperty("page") && attrs.page !== null) {
            data.page = attrs.page;
        }

        if (attrs.hasOwnProperty("count") && attrs.count !== null) {
            data.count = attrs.count;
        }

        return _get('/api/messages', data);
    }

    function _getSearchListOfFriends(attrs) {
        var data = {};

        if (attrs.hasOwnProperty("userId") && attrs.userId !== null) {
            data.page = attrs.page;
        }

        if (attrs.hasOwnProperty("searchString") && attrs.searchString !== null) {
            data.search_string = attrs.search_string;
        }

        return _get('/api/messages', data);

    }

    function _updateProfile(profileInfoModel) {
        var params = {
            profile_info: {
                id: profileInfoModel.id,
                first_name: profileInfoModel.firstName,
                last_name: profileInfoModel.lastName,
                email: profileInfoModel.email,
                nickname: profileInfoModel.nickname
            }
        };

        return _post('/api/profile/', params);
    }


    return {
        login: _login,
        register: _register,
        logout: _logout,
        getFirstLoadData: _getFirstLoadData,
        getFriendProfile: _getFriendProfile,
        getMessages: _getMessages,
        getSearchListOfFriends: _getSearchListOfFriends,
        updateProfile: _updateProfile
    };
}