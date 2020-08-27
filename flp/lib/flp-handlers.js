"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_life_cycle_1 = require("./app-life-cycle");
var app_life_cycle_light_1 = require("./app-life-cycle-light");
var session_handler_1 = require("./session-handler");
function registerHandlers(handlers) {
    var destroyers = [];
    if (handlers.sessionHandler) {
        var destroy = session_handler_1.useSessionHandler(handlers.sessionHandler);
        destroyers.push(destroy);
    }
    if (handlers.appLifeCycle) {
        app_life_cycle_1.useAppLifeCycleEvents(handlers.appLifeCycle);
    }
    if (handlers.appLifeCycleLight) {
        app_life_cycle_light_1.useAppLifeCycleEventsLight(handlers.appLifeCycleLight);
    }
    return function () {
        for (var _i = 0, destroyers_1 = destroyers; _i < destroyers_1.length; _i++) {
            var destroy = destroyers_1[_i];
            destroy();
        }
    };
}
exports.registerHandlers = registerHandlers;
