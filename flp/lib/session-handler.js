"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
function useSessionHandler(handler) {
    base_1.on('sap.ushell.sessionHandler.extendSessionEvent', function (msg) {
        handler.onExtend(msg);
    });
    if (handler.manageUserActivity || typeof handler.manageUserActivity === 'undefined') {
        return useEventListeners();
    }
    return function () { }; // empty destroy function
}
exports.useSessionHandler = useSessionHandler;
function notifyUserActivity() {
    var service = 'sap.ushell.sessionHandler.notifyUserActive';
    base_1.postToShell({ service: service });
}
exports.notifyUserActivity = notifyUserActivity;
var DefaultEvents = ['mousedown', 'mousemove', 'keyup', 'touchstart', 'touchmove'];
function useEventListeners(selfWin, events) {
    if (events === void 0) { events = DefaultEvents; }
    if (!selfWin && typeof window !== 'undefined') {
        selfWin = window;
    }
    var win = selfWin;
    var destroy = function () { };
    if (win) {
        var ctx_1 = {};
        var listener_1 = function () { return _onUserActivity(ctx_1); };
        for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
            var e = events_1[_i];
            win.addEventListener(e, listener_1);
        }
        destroy = function () {
            for (var _i = 0, events_2 = events; _i < events_2.length; _i++) {
                var e = events_2[_i];
                win.removeEventListener(e, listener_1);
            }
        };
    }
    return destroy;
}
function _onUserActivity(ctx) {
    if (!ctx.timer) {
        ctx.timer = setTimeout(function () {
            notifyUserActivity();
            ctx.timer = undefined;
        }, 1000 * 60); // debounce 60 sec instead of notifying many events
    }
}
