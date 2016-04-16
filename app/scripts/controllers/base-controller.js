/**
 * Created by kated on 4/15/2016.
 */
'use strict';

angular.module('viChatter')
    .controller('BaseController', BaseController);

BaseController.$inject = ['$scope'];

function BaseController($scope) {

    $scope.items = [];

    $scope.buildItems = function (itemsData, builder) {
        if (angular.isArray(itemsData)) {
            var items = [];
            angular.forEach(itemsData, function (itemData) {
                var item = builder.create(itemData);
                items.push(item);
            });
            $scope.items = items;
        }
    };

    $scope.getItem = function (itemId) {
        return _.find($scope.items, function (item) {
            return item.getItem().getId() === itemId;
        });
    };

    $scope.removeItem = function (itemId) {
        var items = $scope.items;
        var index = _.findIndex(items, function (item) {
            return item.getItem().getId() === itemId;
        });
        if (index >= 0) {
            items.splice(index, 1);
        }
    };

    $scope.addItem = function (item) {
        $scope.items.push(item);
    };

    $scope.replaceItem = function (item) {
        var items = $scope.items;
        var index = _.findIndex(items, function (o) {
            return o.getItem().getId() === item.getId();
        });
        if (index >= 0) {
            items[index] = item;
        }
    };

}