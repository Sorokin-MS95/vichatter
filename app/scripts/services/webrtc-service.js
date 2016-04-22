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
        iceServers: [
            {
                "url": "stun:turn01.uswest.xirsys.com"
            },
            {
                "username": "56940060-08bf-11e6-af90-69ff739b6a3a",
                "url": "turn:turn01.uswest.xirsys.com:443?transport=udp",
                "credential": "56940100-08bf-11e6-8fdb-3d742372965b"
            },
            {
                "username": "56940060-08bf-11e6-af90-69ff739b6a3a",
                "url": "turn:turn01.uswest.xirsys.com:443?transport=tcp",
                "credential": "56940100-08bf-11e6-8fdb-3d742372965b"
            },
            {
                "username": "56940060-08bf-11e6-af90-69ff739b6a3a",
                "url": "turn:turn01.uswest.xirsys.com:5349?transport=udp",
                "credential": "56940100-08bf-11e6-8fdb-3d742372965b"
            },
            {
                "username": "56940060-08bf-11e6-af90-69ff739b6a3a",
                "url": "turn:turn01.uswest.xirsys.com:5349?transport=tcp",
                "credential": "56940100-08bf-11e6-8fdb-3d742372965b"
            },
            /*{url: 'stun:stun01.sipphone.com'},
             {url: 'stun:stun.ekiga.net'},
             {url: 'stun:stun.fwdnet.net'},
             {url: 'stun:stun.ideasip.com'},
             {url: 'stun:stun.iptel.org'},
             {url: 'stun:stun.rixtelecom.se'},
             {url: 'stun:stun.schlund.de'},*/
            {url: 'stun:stun.l.google.com:19302'},
            {url: 'stun:stun1.l.google.com:19302'},
            {url: 'stun:stun2.l.google.com:19302'},
            {url: 'stun:stun3.l.google.com:19302'},
            {url: 'stun:stun4.l.google.com:19302'},
            /*{url: 'stun:stunserver.org'},
             {url: 'stun:stun.softjoys.com'},
             {url: 'stun:stun.voiparound.com'},
             {url: 'stun:stun.voipbuster.com'},
             {url: 'stun:stun.voipstunt.com'},
             {url: 'stun:stun.voxgratia.org'},
             {url: 'stun:stun.xten.com'},
             {url: 'stun:stun.voipplanet.nl:3478'},
             {url: 'stun:stun.webcalldirect.com:3478'},
             {url: 'stun:stun.zadarma.com:3478'},
             {url: 'stun:stun1.faktortel.com.au:3478'},
             {url: 'stun:stun.sovtest.ru:3478'},
             {url: 'stun:stun.chathelp.ru:3478'},
             {url: 'stun:stun.dcalling.de:3478'},
             {url: 'stun:stun.easycall.pl:3478'},*/
            {
                url: 'turn:numb.viagenie.ca',
                credential: 'muazkh',
                username: 'webrtc@live.com'
            },
            {
                url: 'turn:numb.viagenie.ca',
                username: 'max-kvasovka@mail.ru',
                credentials: '12345'
            },
            {
                url: 'turn:192.158.29.39:3478?transport=udp',
                credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                username: '28224511:1379330808'
            }]
    }

    return {
        prepareRtcConfiguration: _prepareRtcConfiguration,
        iceServers: _servers
    }


}
