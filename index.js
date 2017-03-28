/**
 * @fileoverview Description of file, its uses and information
 * about its dependencies.
 */

'use strict';

/**
 *
 * @type {*|exports|module.exports}
 */
var cloud;

/**
 *
 * @type {*|exports|module.exports}
 */
var utils;

/**
 *
 * @type {*|exports|module.exports}
 */
var backboneEvents;

/**
 *
 */
var transformPoint;

/**
 *
 */
var React = require('react');

/**
 *
 */
var ReactDOM = require('react-dom');

/**
 *
 * @type {string}
 */
var exId = "skraafoto";


/**
 *
 * @type {{set: module.exports.set, init: module.exports.init}}
 */

module.exports = module.exports = {

    /**
     *
     * @param o
     * @returns {exports}
     */
    set: function (o) {
        cloud = o.cloud;
        utils = o.utils;
        transformPoint = o.transformPoint;
        backboneEvents = o.backboneEvents;
        return this;
    },

    /**
     *
     */
    init: function () {

        utils.createMainTab(exId, "Skråfoto", "......", require('./../../height')().max);

        // Append to DOM
        //==============

        ReactDOM.render(
            <Skraafoto />,
            document.getElementById(exId)
        );

    },

    /**
     *
     */
    control: function () {
        if ($("#" + exId + "-btn").is(':checked')) {

            // Emit "on" event
            //================

            backboneEvents.get().trigger("on:" + exId);

        } else {

            // Emit "off" event
            //=================

            backboneEvents.get().trigger("off:" + exId);
        }
    },

    click: function (event) {
        var coords = event.getCoordinate(), p,
            url = "http://kbhkort.kk.dk/modules/oblique/html";
        p = utils.transform("EPSG:3857", "EPSG:25832", coords);
        utils.popupCenter(url + "?x=" + p.x + "&y=" + p.y,  (utils.screen().width - 100), (utils.screen().height - 100));
    },

    /**
     * Turns conflict off and resets DOM
     */
    off: function () {
        // Clean up
    }

};

class Skraafoto extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div role="tabpanel">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="togglebutton">
                            <label><input id="skraafoto-btn" type="checkbox"/>Aktiver skråfoto</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
