/**
 * Created by kated on 4/13/2016.
 */
'use strict';

angular.module('viChatter')
    .factory('ResponseBuilder', ResponseBuilder);

ResponseBuilder.$inject = [];

function ResponseBuilder() {

    function Response(responseCode, statusCode, payload, message) {
        this.responseCode = responseCode;
        this.statusCode = statusCode;
        this.success = statusCode === 0;
        this.payload = payload;
        this.message = angular.isDefined(message) ? message : '';
    }

    function buildResponse(data) {
        var responseCode = data.status;
        var responseData = data.data !== null ? data.data : {};
        return new Response(responseCode, responseData.status, responseData.payload, responseData.message);
    }

    return {
        create: buildResponse
    };
}