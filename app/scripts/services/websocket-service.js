/**
 * Created by kated on 4/16/2016.
 */
var app = angular.module('viChatter');


app.service('websocket', WebsocketFactory);

WebsocketFactory.inject = ['$rootScope'];

function WebsocketFactory($rootScope) {

}