"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var commons_1 = require("./commons");
var logger = console;
var DEFAULT_TIMEOUT = 7 * 1000; // 7 sec
var PostMessageProxy = /** @class */ (function (_super) {
    __extends(PostMessageProxy, _super);
    function PostMessageProxy(cfg) {
        var _this = _super.call(this) || this;
        _this.origins = __assign({}, (cfg.allowedOrigins || {}));
        _this.pending = {};
        // enables to inject targetWindow
        // fallback to window.parent
        if (!cfg.targetWindow && typeof window !== 'undefined') {
            cfg.targetWindow = window.parent;
        }
        _this.targetWindow = cfg.targetWindow;
        // same approach for the app window
        if (!cfg.selfWindow && typeof window !== 'undefined') {
            cfg.selfWindow = window;
        }
        _this.selfWindow = cfg.selfWindow;
        _this.listener = null;
        return _this;
    }
    PostMessageProxy.prototype.init = function () {
        var _this = this;
        if (!this.listener) {
            this.listener = function (msg) {
                _this.handleMessage(msg);
            };
            this.addEventListener('message', this.listener);
        }
    };
    PostMessageProxy.prototype.destroy = function () {
        if (this.listener) {
            this.listener = null;
            this.cleanPending('');
            this.removeEventListener('message', this.listener);
        }
    };
    PostMessageProxy.prototype.handleMessage = function (msg) {
        if (!msg) {
            return;
        }
        logger.log('handle message:', msg.data);
        var data = commons_1.parseMessageData(msg.data);
        if (msg.origin && !this.origins[msg.origin] && !this.origins['*']) {
            logger.warn("origin not allowed:\n" + msg.origin);
            return;
        }
        switch (data.type) {
            case 'request': {
                this.handleRequestMessage(data);
                break;
            }
            case 'response': {
                this.handleResponseMessage(data);
                break;
            }
            default: {
                logger.warn("unknown message type " + data.type);
            }
        }
    };
    PostMessageProxy.prototype.handleResponseMessage = function (data) {
        if (data.request_id) {
            var deferred = this.pending[data.request_id];
            if (!deferred) {
                // was never requested or the consumer does wait for response
                logger.log("incoming message with unknown id:\n" + data.request_id);
                return;
            }
            delete this.pending[data.request_id];
            if (data.status === 'success') {
                var body = data.body;
                deferred.resolve(body && body.result);
            }
            else {
                deferred.reject();
            }
        }
    };
    PostMessageProxy.prototype.handleRequestMessage = function (data) {
        var service = commons_1.parseService(data.service);
        if (service.name) {
            // service call
            this.emit(data.service, data);
        }
    };
    PostMessageProxy.prototype.postErrorResponse = function (msg, e) {
        return this.postToShell(__assign(__assign({}, msg), { type: 'response', status: 'error', body: { message: e.message } }));
    };
    PostMessageProxy.prototype.postToShell = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, service, _b, origin, _c, type, _d, body, _e, status, _f, timeout, request_id, req, pending_1;
            var _this = this;
            return __generator(this, function (_g) {
                _a = msg || {}, id = _a.id, service = _a.service, _b = _a.origin, origin = _b === void 0 ? this.defaultOrigin() : _b, _c = _a.type, type = _c === void 0 ? 'request' : _c, _d = _a.body, body = _d === void 0 ? {} : _d, _e = _a.status, status = _e === void 0 ? 'success' : _e, _f = _a.timeout, timeout = _f === void 0 ? DEFAULT_TIMEOUT : _f, request_id = _a.request_id;
                req = {
                    request_id: id || request_id || commons_1.uuid(),
                    type: type,
                    service: service,
                    body: body,
                };
                id = req.request_id;
                switch (type) {
                    case 'response': {
                        req.status = status;
                        return [2 /*return*/, postMessage(this.targetWindow, req, origin)];
                    }
                    case 'request': {
                        pending_1 = this.pending;
                        if (pending_1[id]) {
                            // duplicated request id -> not supported
                            logger.log('request id already exist, still pending...');
                            return [2 /*return*/, pending_1[id].promise];
                        }
                        pending_1[id] = defer();
                        setTimeout(function () { return _this.cleanPending(id); }, timeout);
                        postMessage(this.targetWindow, req, origin);
                        return [2 /*return*/, pending_1[id].promise];
                    }
                    default: {
                        throw new Error("message type \"" + type + "\" is unknown");
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    PostMessageProxy.prototype.cleanPending = function (id) {
        if (!id) {
            this.pending = {};
        }
        else if (id in this.pending) {
            logger.log("clean pending request: " + id);
            delete this.pending[id];
        }
    };
    PostMessageProxy.prototype.defaultOrigin = function () {
        return Object.keys(this.origins)[0] || '*';
    };
    PostMessageProxy.prototype.removeEventListener = function (e, h) {
        return this.selfWindow && this.selfWindow.removeEventListener(e, h);
    };
    PostMessageProxy.prototype.addEventListener = function (e, h) {
        return this.selfWindow && this.selfWindow.addEventListener(e, h);
    };
    return PostMessageProxy;
}(events_1.EventEmitter));
exports.PostMessageProxy = PostMessageProxy;
function postMessage(targetWindow, req, origin) {
    if (targetWindow === void 0) { targetWindow = { postMessage: function (r, o) { } }; }
    if (req === void 0) { req = {}; }
    if (origin === void 0) { origin = '*'; }
    if (typeof req !== 'string') {
        req = JSON.stringify(req);
    }
    logger.log('sending message:', req);
    targetWindow.postMessage(req, origin);
}
function defer() {
    var resolve = function () { };
    var reject = function () { };
    var promise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });
    return {
        promise: promise,
        reject: reject,
        resolve: resolve,
    };
}
