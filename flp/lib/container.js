"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
/**
 * @WIP
 */
function getFLPConfig() {
    var service = 'sap.ushell.services.Container.getFLPConfig';
    var body = {};
    return base_1.postToShell({ service: service, body: body });
}
exports.getFLPConfig = getFLPConfig;
