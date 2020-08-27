"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
function useAppLifeCycleEventsLight(handler) {
    // register as a stateful container in order to get events from launchpad
    base_1.postToShell({ service: 'sap.ushell.services.appLifeCycle.setup', body: { isStateful: true } });
    base_1.on('sap.ushell.services.appLifeCycle.create', function (msg) {
        if (msg.body) {
            var url_1 = msg.body.sUrl;
            setTimeout(function () { return handler.open(url_1); });
            base_1.postToShell({ id: msg.request_id, service: msg.service, status: 'success', type: 'response' });
        }
    });
    base_1.on('sap.ushell.services.appLifeCycle.destroy', function (msg) {
        base_1.postToShell({ id: msg.request_id, service: msg.service, status: 'success', type: 'response' });
    });
}
exports.useAppLifeCycleEventsLight = useAppLifeCycleEventsLight;
