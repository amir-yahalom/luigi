"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var commons_1 = require("./internal/commons");
var flp_handlers_1 = require("./flp-handlers");
var nav_1 = require("./nav");
var shell_ui_1 = require("./shell-ui");
var user_info_1 = require("./user-info");
var facade = {
    use: function (handlers) {
        this._destroyHandlers = flp_handlers_1.registerHandlers(handlers);
        return this;
    },
    init: function (cfg) {
        if (cfg === void 0) { cfg = { allowedOrigins: { '*': true } }; }
        base_1.init(cfg);
        return this;
    },
    destroy: function () {
        if (this._destroyHandlers) {
            this._destroyHandlers();
        }
        base_1.destroy();
    },
    // base
    postToShell: base_1.postToShell,
    on: base_1.on,
    // utils
    parseMessageData: commons_1.parseMessageData,
    parseService: commons_1.parseService,
    getUrlParam: commons_1.getUrlParam,
    // navigation
    navigateInternal: nav_1.navigateInternal,
    navigateExternal: nav_1.navigateExternal,
    isNavigationSupported: nav_1.isNavigationSupported,
    isIntentSupported: nav_1.isIntentSupported,
    getLinks: nav_1.getLinks,
    historyBack: nav_1.historyBack,
    getInnerAppStateData: nav_1.getInnerAppStateData,
    setInnerAppStateData: nav_1.setInnerAppStateData,
    getDistinctSemanticObjects: nav_1.getDistinctSemanticObjects,
    // shell ui
    setShellTitle: shell_ui_1.setShellTitle,
    showShellUIBlocker: shell_ui_1.showShellUIBlocker,
    sendUrlAsEmail: shell_ui_1.sendUrlAsEmail,
    getShellGroupIDs: shell_ui_1.getShellGroupIDs,
    setDirtyFlag: shell_ui_1.setDirtyFlag,
    getFlpUrl: shell_ui_1.getFlpUrl,
    addBookmarkDialog: shell_ui_1.addBookmarkDialog,
    // user info
    getThemeList: user_info_1.getThemeList,
};
exports.default = facade;
