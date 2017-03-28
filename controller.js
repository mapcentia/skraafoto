/**
 * @fileoverview Description of file, its uses and information
 * about its dependencies.
 */

'use strict';

/**
 *
 */
var skraafoto;

/**
 *
 */
var backboneEvents;

/**
 *
 */
var cloud;

/**
 *
 * @type {string}
 */
var exId = "skraafoto";

/**
 *
 * @type {boolean}
 */
var active = false;

/**
 *
 */
var clicktimer;

/**
 *
 * @returns {*}
 */
module.exports = {
    set: function (o) {
        cloud = o.cloud;
        backboneEvents = o.backboneEvents;
        skraafoto = o.extensions.skraafoto.index;
        return this;
    },
    init: function () {

        var mapObj = cloud.get();

        // Click event for conflict search on/off toggle button
        // ====================================================

        $("#" + exId +"-btn").on("click", function () {
            skraafoto.control();
        });

        // Listen to on event
        // ==================

        backboneEvents.get().on("on:" + exId, function () {

            active = true;

            // Turn info click off
            backboneEvents.get().trigger("off:infoClick");
            console.info("Starting Skråfoto");
        });

        // Listen to off event
        // ==================

        backboneEvents.get().on("off:" + exId, function () {

            active = false;

            skraafoto.off();

            // Turn info click on again
            backboneEvents.get().trigger("on:infoClick");
            console.info("Stopping Skråfoto");
        });

        // Handle click events on map
        // ==========================

        mapObj.on("dblclick", function () {
            clicktimer = undefined;
        });
        mapObj.on("click", function (e) {
            var event = new geocloud.clickEvent(e, cloud);
            if (clicktimer) {
                clearTimeout(clicktimer);
            }
            else {
                if (active === false) {
                    return;
                }

                clicktimer = setTimeout(function (e) {
                    clicktimer = undefined;
                    skraafoto.click(event);

                }, 250);
            }
        });

    }
};