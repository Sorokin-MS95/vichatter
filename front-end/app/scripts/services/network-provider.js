/**
 * Created by kated on 4/9/2016.
 */
'use strict';

angular.module('antennaApp')
    .service('NetworkProvider', NetworkProvider);

NetworkProvider.$inject = ['$http', '$q', 'Configuration', 'ResponseBuilder', 'PlatformConfiguration'];

function NetworkProvider($http, $q, Configuration, ResponseBuilder, PlatformConfiguration) {

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

    function _getSVGFromGeoJson($aGeoJson, $reportOptions) {
        return _post(Configuration.BASE_URL + '/api/report/visio', {
            geojson: $aGeoJson,
            reportoptions: $reportOptions
        });
    }

    function _login(email, password) {

        var params = {
            'email': email,
            'password': password,
            'app_id': PlatformConfiguration.PLATFORM
        };

        return _post(Configuration.BASE_URL + '/api/user/login', params);
    }

    function _logout() {
        return _post(Configuration.BASE_URL + '/api/user/logout');
    }

    function _getPermissions() {
        return _get(Configuration.BASE_URL + '/api/user/permissions');
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
        return _get(Configuration.BASE_URL + '/api/user/all', data);
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

        return _post(Configuration.BASE_URL + '/api/user/create', params);
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

        return _post(Configuration.BASE_URL + '/api/user/' + userId + '/update', params);
    }

    function _deleteUser(userId) {
        return _post(Configuration.BASE_URL + '/api/user/' + userId + '/delete');
    }

    function _getUser(userId) {
        return _get(Configuration.BASE_URL + '/api/user/' + userId);
    }

    /***************
     *   Clients   *
     ***************/

    function _getAllClients(attrs) {
        var data = {};
        if (attrs.hasOwnProperty("page") && attrs.page !== null) {
            data.page = attrs.page;
        }

        if (attrs.hasOwnProperty("numberOfElements") && attrs.numberOfElements !== null) {
            data.count = attrs.numberOfElements;
        }
        return _get(Configuration.BASE_URL + '/api/client/all', data);
    }

    function _deleteClient(clientId) {
        return _post(Configuration.BASE_URL + '/api/client/' + clientId + '/delete');
    }

    function _createClient(clientModel) {
        var params = {
            name: clientModel.name,
            street: clientModel.street,
            city: clientModel.city,
            state: clientModel.state,
            zip: clientModel.zip,
            phone: clientModel.phone,
            poc: clientModel.poc
        };

        return _post(Configuration.BASE_URL + '/api/client/create', params);
    }

    function _updateClient(clientId, clientModel) {
        var params = {
            name: clientModel.name,
            street: clientModel.street,
            city: clientModel.city,
            state: clientModel.state,
            zip: clientModel.zip,
            phone: clientModel.phone,
            poc: clientModel.poc
        };

        return _post(Configuration.BASE_URL + '/api/client/' + clientId + '/update', params);
    }

    function _getAntennaCarriers(clientId) {
        var params = {
            'client_id': clientId
        };
        return _get(Configuration.BASE_URL + '/api/client/antenna_carrier', params);
    }

    function _updateAntennaCarriers(clientId, carriers) {
        var params = {
            client_id: clientId,
            carrier: {}
        };

        angular.forEach(carriers, function (carrier) {
            params.carrier[carrier.getUID()] = {
                id: carrier.getId(),
                color: carrier.getAntennaColor()
            };
        });

        return _post(Configuration.BASE_URL + '/api/client/antenna_carrier', params);
    }

    function _getThresholds(clientId) {
        var params = {
            client_id: clientId
        };
        return _get(Configuration.BASE_URL + '/api/client/eme_threshold', params);
    }

    function _updateThresholds(clientId, generalThreshold, occupationalThreshold) {
        var thresholds = {};

        if (angular.isNumber(generalThreshold)) {
            thresholds['general_value'] = generalThreshold;
        }

        if (angular.isNumber(occupationalThreshold)) {
            thresholds['occupational_value'] = occupationalThreshold;
        }

        var params = {
            'client_id': clientId,
            'eme_threshold': thresholds
        };
        return _post(Configuration.BASE_URL + '/api/client/eme_threshold', params);
    }

    /*************
     *   Antennas   *
     *************/



    function _getAllAntennas(attrs) {
        var data = {};
        if (attrs.hasOwnProperty("page") && attrs.page !== null) {
            data.page = attrs.page;
        }

        if (attrs.hasOwnProperty("numberOfElements") && attrs.numberOfElements !== null) {
            data.count = attrs.numberOfElements;
        }

        return _get(Configuration.BASE_URL + '/api/antenna/all', data);
    }

    function _createAntenna(antennaModel) {

        var frequencyRanges = {};

        angular.forEach(antennaModel.frequencyRanges, function (frequencyRange, range) {
            frequencyRanges[range] = {
                'electrical_downtilt': frequencyRange.electricalDownTilt,
                'front_to_back_ratio': frequencyRange.frontToBackRatio,
                'gain': frequencyRange.gain,
                'horizontal_beamwidth': frequencyRange.horizontalBeamWidth,
                'max_power_input': frequencyRange.maxPowerInput,
                'polarization': frequencyRange.polarization,
                'return_loss': frequencyRange.returnLoss,
                'vertical_beamwidth': frequencyRange.verticalBeamWidth
            };
        });

        var params = {
            'antenna': {
                'manufacturer': antennaModel.manufacturer,
                'model': antennaModel.model,
                'size': antennaModel.size,
                'aperture': antennaModel.aperture,
                'frequency_ranges': frequencyRanges,
                'horizontal_pattern': antennaModel.horizontalPattern,
                'vertical_pattern': antennaModel.verticalPattern,
                'datasheet_link': antennaModel.dataSheetLink
            }

        };

        return _post(Configuration.BASE_URL + '/api/antenna/create', params);
    }

    function _updateAntenna(antennaId, antennaModel) {

        var frequencyRanges = {};

        angular.forEach(antennaModel.frequencyRanges, function (frequencyRange, range) {
            frequencyRanges[range] = {
                'electrical_downtilt': frequencyRange.electricalDownTilt,
                'front_to_back_ratio': frequencyRange.frontToBackRatio,
                'gain': frequencyRange.gain,
                'horizontal_beamwidth': frequencyRange.horizontalBeamWidth,
                'max_power_input': frequencyRange.maxPowerInput,
                'polarization': frequencyRange.polarization,
                'return_loss': frequencyRange.returnLoss,
                'vertical_beamwidth': frequencyRange.verticalBeamWidth
            };
        });

        var params = {
            'antenna': {
                'manufacturer': antennaModel.manufacturer,
                'model': antennaModel.model,
                'size': antennaModel.size,
                'aperture': antennaModel.aperture,
                'frequency_ranges': frequencyRanges,
                'horizontal_pattern': antennaModel.horizontalPattern,
                'vertical_pattern': antennaModel.verticalPattern,
                'datasheet_link': antennaModel.dataSheetLink
            }
        };

        return _post(Configuration.BASE_URL + '/api/antenna/' + antennaId + '/update', params);
    }

    function _deleteAntenna(antennaId) {
        return _post(Configuration.BASE_URL + '/api/antenna/' + antennaId + '/delete');
    }

    function _getAntenna(antennaId) {
        return _get(Configuration.BASE_URL + '/api/antenna/' + antennaId);
    }



    return {
        getSVGFromGeoJson: _getSVGFromGeoJson,
        login: _login,
        logout: _logout,
        getPermissions: _getPermissions,
        getAllUsers: _getAllUsers,
        createUser: _createUser,
        updateUser: _updateUser,
        deleteUser: _deleteUser,
        getUser: _getUser,
        viewAssignUsers: _viewAssignUsers
    };
}