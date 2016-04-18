/**
 * Created by kated on 4/17/2016.
 */
'use strict';

angular.module('viChatter')
    .service('PopupService', PopupService);

PopupService.$inject = ['ngDialog', 'EventsService', 'AppConstants'];

function PopupService(ngDialog, EventsService, AppConstants) {

    function closeAllPopups() {
        ngDialog.closeAll();
    }

    EventsService.subscribe(AppConstants.UI_EVENTS.LOGOUT, closeAllPopups);

    function showAcceptDeclinePopup(title, infoText, successCallback, cancelCallback) {
        var cancelcallback = angular.isFunction(cancelCallback) ? cancelCallback : function () {
        };
        return ngDialog.openConfirm({
            template: 'templates/common/popups/accept-cancel-popup.html',
            data: {
                title: title,
                infoText: infoText
            },
            showClose: false,
            className: 'ngdialog-info-theme info-dialog info-popup',
            controller: 'AcceptCancelPopupController'
        }).then(successCallback, cancelcallback);
    }

    return {
        closeAll: closeAllPopups,
        showAcceptDeclinePopup: showAcceptDeclinePopup
    };
}