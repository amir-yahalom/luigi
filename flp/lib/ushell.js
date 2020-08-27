"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
/**
 * @WIP
 */
function themeChange(currentTheme) {
    var service = 'sap.ushell.appRuntime.themeChange';
    var body = {
        currentThemeId: currentTheme
    };
    return base_1.postToShell({ service: service, body: body });
}
exports.themeChange = themeChange;
