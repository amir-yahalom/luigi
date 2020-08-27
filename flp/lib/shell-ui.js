"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
function setShellTitle(title) {
    var service = 'sap.ushell.services.ShellUIService.setTitle';
    var body = {
        sTitle: title,
    };
    return base_1.postToShell({ service: service, body: body });
}
exports.setShellTitle = setShellTitle;
function showShellUIBlocker(show) {
    var service = 'sap.ushell.services.ShellUIService.showShellUIBlocker';
    var body = {
        bShow: show,
    };
    return base_1.postToShell({ service: service, body: body });
}
exports.showShellUIBlocker = showShellUIBlocker;
function sendUrlAsEmail() {
    var service = 'sap.ushell.services.ShellUIService.sendUrlAsEmail';
    return base_1.postToShell({ service: service });
}
exports.sendUrlAsEmail = sendUrlAsEmail;
function getShellGroupIDs() {
    var service = 'sap.ushell.services.ShellUIService.getShellGroupIDs';
    return base_1.postToShell({ service: service });
}
exports.getShellGroupIDs = getShellGroupIDs;
function setDirtyFlag(isDirty) {
    var service = 'sap.ushell.services.ShellUIService.setDirtyFlag';
    var body = {
        bIsDirty: isDirty,
    };
    return base_1.postToShell({ service: service, body: body });
}
exports.setDirtyFlag = setDirtyFlag;
function getFlpUrl(includeHash) {
    var service = 'sap.ushell.services.ShellUIService.getFLPUrl';
    var body = {
        bIncludeHash: includeHash,
    };
    return base_1.postToShell({ service: service, body: body });
}
exports.getFlpUrl = getFlpUrl;
/**
 * @WIP
 */
function setHierarchy(hierarchyLevels) {
    var service = 'sap.ushell.services.ShellUIService.setHierarchy';
    var body = {
        aHierarchyLevels: hierarchyLevels,
    };
    return base_1.postToShell({ service: service, body: body });
}
exports.setHierarchy = setHierarchy;
/**
 * @WIP
 */
function setRelatedApps(relatedApps) {
    var service = 'sap.ushell.services.ShellUIService.setRelatedApps';
    var body = {
        aRelatedApps: relatedApps,
    };
    return base_1.postToShell({ service: service, body: body });
}
exports.setRelatedApps = setRelatedApps;
/**
 * @WIP
 */
function addBookmark(bookmark, groupId) {
    var service = 'sap.ushell.services.ShellUIService.addBookmark';
    var body = {
        oParameters: bookmark,
        groupId: groupId,
    };
    return base_1.postToShell({ service: service, body: body });
}
exports.addBookmark = addBookmark;
function addBookmarkDialog() {
    var service = 'sap.ushell.services.ShellUIService.addBookmarkDialog';
    var body = {};
    return base_1.postToShell({ service: service, body: body });
}
exports.addBookmarkDialog = addBookmarkDialog;
