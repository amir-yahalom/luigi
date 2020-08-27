"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
function navigateExternal(_a) {
    var hash = _a.hash, semanticObject = _a.semanticObject, action = _a.action, _b = _a.params, params = _b === void 0 ? {} : _b;
    var service = 'sap.ushell.services.CrossApplicationNavigation.toExternal';
    var target;
    if (hash) {
        target = { shellHash: hash };
    }
    else {
        target = {
            semanticObject: semanticObject,
            action: action,
        };
    }
    var body = {
        oArgs: {
            target: target,
            params: params,
        },
    };
    return base_1.postToShell({ service: service, body: body });
}
exports.navigateExternal = navigateExternal;
function isNavigationSupported(_a) {
    var hash = _a.hash, semanticObject = _a.semanticObject, action = _a.action, _b = _a.parameters, parameters = _b === void 0 ? {} : _b;
    var service = 'sap.ushell.services.CrossApplicationNavigation.isNavigationSupported';
    var target;
    if (hash) {
        target = { shellHash: hash };
    }
    else {
        target = {
            semanticObject: semanticObject,
            action: action,
        };
    }
    var body = {
        aIntents: [
            {
                target: target,
                parameters: parameters,
            },
        ],
    };
    return base_1.postToShell({ service: service, body: body });
}
exports.isNavigationSupported = isNavigationSupported;
function isIntentSupported(aIntents) {
    var service = 'sap.ushell.services.CrossApplicationNavigation.isIntentSupported';
    var body = {
        aIntents: __spreadArrays(aIntents),
    };
    return base_1.postToShell({ service: service, body: body });
}
exports.isIntentSupported = isIntentSupported;
function navigateInternal(innerRoute) {
    if (innerRoute === void 0) { innerRoute = '/'; }
    var service = 'sap.ushell.services.CrossApplicationNavigation.setInnerAppRoute';
    var body = {
        appSpecificRoute: prepareInnerRoute(innerRoute),
    };
    return base_1.postToShell({ service: service, body: body });
}
exports.navigateInternal = navigateInternal;
function getLinks(_a) {
    var semanticObject = _a.semanticObject, _b = _a.params, params = _b === void 0 ? {} : _b;
    var service = 'sap.ushell.services.CrossApplicationNavigation.getLinks';
    var body = {
        semanticObject: semanticObject,
        params: params,
    };
    return base_1.postToShell({ service: service, body: body });
}
exports.getLinks = getLinks;
function historyBack(steps) {
    var service = 'sap.ushell.services.CrossApplicationNavigation.historyBack';
    var body = {
        iSteps: steps,
    };
    return base_1.postToShell({ service: service, body: body });
}
exports.historyBack = historyBack;
function getInnerAppStateData(appStateKey) {
    var service = 'sap.ushell.services.CrossApplicationNavigation.getAppStateData';
    var body = {
        sAppStateKey: appStateKey,
    };
    return base_1.postToShell({ service: service, body: body });
}
exports.getInnerAppStateData = getInnerAppStateData;
function setInnerAppStateData(data) {
    var service = 'sap.ushell.services.CrossApplicationNavigation.setInnerAppStateData';
    var body = {
        sData: data,
    };
    return base_1.postToShell({ service: service, body: body });
}
exports.setInnerAppStateData = setInnerAppStateData;
function getDistinctSemanticObjects() {
    var service = 'sap.ushell.services.NavTargetResolution.getDistinctSemanticObjects';
    var body = {};
    return base_1.postToShell({ service: service, body: body });
}
exports.getDistinctSemanticObjects = getDistinctSemanticObjects;
function prepareInnerRoute(innerRoute) {
    if (innerRoute === void 0) { innerRoute = '/'; }
    var start = innerRoute.charAt(0);
    if (start !== '/' && start !== '&') {
        innerRoute = '/' + innerRoute;
    }
    if (start !== '&') {
        innerRoute = '&' + innerRoute;
    }
    return innerRoute;
}
