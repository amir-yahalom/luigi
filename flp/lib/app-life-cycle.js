"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
/**
 * @WIP
 */
function useAppLifeCycleEvents(handler) {
    // register as a stateful container in order to get events from launchpad
    base_1.postToShell({ service: 'sap.ushell.services.appLifeCycle.setup', body: { isStateful: true } });
    base_1.on('sap.ushell.services.appLifeCycle.create', handler.create);
    base_1.on('sap.ushell.services.appLifeCycle.destroy', handler.destroy);
}
exports.useAppLifeCycleEvents = useAppLifeCycleEvents;
