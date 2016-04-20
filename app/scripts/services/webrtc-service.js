angular.module('viChatter')
    .service('WebRTCService', WebRTCService);

WebRTCService.inject = ['$rootScope', 'EventsService', 'AppConstants', 'localStorageService'];

function WebRTCService($rootScope, EventsService, AppConstants, localStorageService) {

    var iceServers;

    function _prepareRtcConfiguration() {
        window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
        window.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate;
        window.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;
        window.URL = window.URL || window.mozURL || window.webkitURL;
        window.navigator.getUserMedia = window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia;
    }


    var _servers = {
        iceServers : [
        {
            'url': 'stun:stun.l.google.com:19302'
        },
        {
            'url': 'turn:192.158.29.39:3478?transport=udp',
            'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            'username': '28224511:1379330808'
        },
        {
            'url': 'turn:192.158.29.39:3478?transport=tcp',
            'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            'username': '28224511:1379330808'
        }
    ]
    }

    return {
        prepareRtcConfiguration: _prepareRtcConfiguration,
        iceServers : _servers
    }


}
