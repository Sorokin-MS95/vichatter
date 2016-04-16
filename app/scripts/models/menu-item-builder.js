/**
 * Created by kated on 4/16/2016.
 */
angular.module('viChatter')
    .factory('MenuItemBuilder', MenuItemBuilder);

MenuItemBuilder.$inject = [];

function MenuItemBuilder() {

    /**
     * Constructor for MenuItem.
     * @param menuItemData {object} MenuItem data.
     * @constructor
     */
    function MenuItem(menuItemData) {

        this._id = angular.isDefined(menuItemData.id) ? menuItemData.id : null;

        this._name = angular.isDefined(menuItemData.name) ? menuItemData.name : null;

        this._counter = angular.isDefined(menuItemData.counter) ? menuItemData.counter : null;

        this._eventName = angular.isDefined(menuItemData.event_mame) ? menuItemData.event_name : null;
    }


    /**
     * MenuItem  name.
     * @type {string}
     * @private
     */
    MenuItem.prototype._name = null;

    /**
     * MenuItem  event name.
     * @type {string}
     * @private
     */
    MenuItem.prototype._eventName = null;


    /**
     * MenuItem  id.
     * @type {string}
     * @private
     */
    MenuItem.prototype._id = null;

    /**
     * MenuItem  counter.
     * @type {Number}
     * @private
     */
    MenuItem.prototype._counter = null;


    /**
     * Returns MenuItem name.
     * @returns {string}
     */
    MenuItem.prototype.getName = function () {
        return this._name;
    };

    /**
     * Returns MenuItem event name.
     * @returns {string}
     */
    MenuItem.prototype.getEventName = function () {
        return this._eventName;
    };

    /**
     * Returns MenuItem id.
     * @returns {string}
     */
    MenuItem.prototype.getId = function () {
        return this._id;
    };


    /**
     * Returns MenuItem counter.
     * @returns {number}
     */
    MenuItem.prototype.getCounter = function () {
        return this._counter;
    };



    /**
     * Creates new MenuItem instance.
     * @param menuItemData {object} MenuItem data.
     * @returns {MenuItemBuilder.MenuItem}
     */
    function create(menuItemData) {
        menuItemData = menuItemData || {};
        return new MenuItem(menuItemData);
    }

    return {
        create: create,
        constructor: MenuItem
    };
}