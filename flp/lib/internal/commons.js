"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function constructHash(semanticObject, action, params, innerAppRoute) {
    var paramsFlat = [];
    for (var k in params) {
        paramsFlat.push(k + "=" + params[k]);
    }
    if (innerAppRoute.indexOf('/') !== 0) {
        innerAppRoute += '/';
    }
    return "#" + semanticObject + "-" + action + "?" + paramsFlat.join('&') + "&" + innerAppRoute;
}
exports.constructHash = constructHash;
function getUrlParam(param, url) {
    var parsed = new RegExp("[?&]" + param + "=([^&#]*)", 'i').exec(url);
    return parsed ? parsed[1] : '';
}
exports.getUrlParam = getUrlParam;
function parseMessageData(data) {
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        }
        catch (e) {
            // not a message from cflp shell
            return { service: '', body: {} };
        }
    }
    return data;
}
exports.parseMessageData = parseMessageData;
function parseService(service) {
    if (service === void 0) { service = ''; }
    var parts = [];
    if (typeof service === 'string') {
        parts = service.split('.');
    }
    var _a = parts.reverse(), action = _a[0], name = _a[1], namespace = _a.slice(2);
    return { namespace: namespace.reverse().join('.'), name: name, action: action };
}
exports.parseService = parseService;
function uuid() {
    var dt = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}
exports.uuid = uuid;
