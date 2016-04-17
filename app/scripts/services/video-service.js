var app = angular.module('viChatter');

app.service('VideoService', VideoService);

VideoService.inject = ['$q'];

function VideoService($q){

    var stream;

    function _getStream(){
        if (stream){
            return $q.when(stream);
        } else {
            var d = $q.defer();
            navigator.getUserMedia({
                video : true,
                audio : true
            },function(s){
                stream = s;
                d.resolve(stream);
            }, function(err){
                d.reject(err);
            });
            return d.promise;
        }

    }

    return {
        getStream : _getStream
    }
}