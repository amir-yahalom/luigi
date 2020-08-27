"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_runtime_1 = require("./internal/app-runtime");
function init(cfg) {
    app_runtime_1.default.init(cfg);
    return app_runtime_1.default;
}
exports.init = init;
function destroy() {
    app_runtime_1.default.destroy();
}
exports.destroy = destroy;
function postToShell(req) {
    return app_runtime_1.default.postToShell(req);
}
exports.postToShell = postToShell;
function on(service, handler) {
    return app_runtime_1.default.on(service, handler);
}
exports.on = on;
