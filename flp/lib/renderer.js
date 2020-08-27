"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
/**
 * @WIP
 */
function setHeaderTitle(title) {
    var service = 'sap.ushell.services.renderer.setHeaderTitle';
    var body = {
        sTitle: title,
    };
    return base_1.postToShell({ service: service, body: body });
}
exports.setHeaderTitle = setHeaderTitle;
/**
 * @WIP
 */
function setHeaderVisibility(show) {
    var service = 'sap.ushell.services.renderer.setHeaderVisibility';
    var body = {
        bShow: show,
    };
    return base_1.postToShell({ service: service, body: body });
}
exports.setHeaderVisibility = setHeaderVisibility;
/**
 * @WIP
 */
function addHeaderItem(headerId, desc, sapIcon, visible) {
    var service = 'sap.ushell.services.renderer.addHeaderItem';
    var body = {
        sId: headerId,
        sTooltip: desc,
        sIcon: "sap-icon://" + sapIcon,
        bVisible: visible,
    };
    return base_1.postToShell({ service: service, body: body });
}
exports.addHeaderItem = addHeaderItem;
/**
 * @WIP
 */
function addHeaderEndItem(headerId, desc, sapIcon, visible) {
    var service = 'sap.ushell.services.renderer.addHeaderEndItem';
    var body = {
        sId: headerId,
        sTooltip: desc,
        sIcon: "sap-icon://" + sapIcon,
        bVisible: visible,
    };
    return base_1.postToShell({ service: service, body: body });
}
exports.addHeaderEndItem = addHeaderEndItem;
