/**
 * Created by kated on 4/18/2016.
 */
'use strict';

var appModule = angular.module('viChatter');
appModule.controller('AcceptCancelPopupController', AcceptCancelPopupController);

AcceptCancelPopupController.$inject = ['$scope', '$log'];

function AcceptCancelPopupController($scope, $log) {
    $log.debug('[AcceptCancelPopupController] Init.');

    $scope.title = $scope.ngDialogData.title;
    $scope.infoText = $scope.ngDialogData.infoText;
}