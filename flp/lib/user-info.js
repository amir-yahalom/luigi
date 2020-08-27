"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
function getThemeList() {
    var service = 'sap.ushell.services.UserInfo.getThemeList';
    var body = {};
    return base_1.postToShell({ service: service, body: body });
}
exports.getThemeList = getThemeList;
