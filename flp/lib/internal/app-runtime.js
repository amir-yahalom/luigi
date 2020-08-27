"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var post_message_proxy_1 = require("./post-message-proxy");
var AppRuntime = /** @class */ (function () {
    function AppRuntime() {
        this.proxy = null;
    }
    AppRuntime.prototype.init = function (cfg) {
        if (cfg === void 0) { cfg = {}; }
        this.proxy = new post_message_proxy_1.PostMessageProxy(cfg);
        this.proxy.init();
        return this;
    };
    AppRuntime.prototype.destroy = function () {
        if (this.proxy) {
            this.proxy.destroy();
        }
    };
    AppRuntime.prototype.on = function (service, handler) {
        this.proxy.on(service, handler);
    };
    AppRuntime.prototype.postToShell = function (msg) {
        return this.proxy.postToShell(msg);
    };
    return AppRuntime;
}());
var appRuntime = new AppRuntime();
exports.default = appRuntime;
