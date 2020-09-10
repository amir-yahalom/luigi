import appRuntime from './core/app-runtime';

// public API for app runtime base functionality

/**
 * @function init
 * @description initialize the AppRuntime instance
 * @param cfg
 * @returns AppRuntime
 */
export function init(cfg) {
  return appRuntime.init(cfg);
}

/**
 * @function destroy()
 * @description destroys the AppRuntime instance, can be re-initialized afterwards
 */
export function destroy() {
  appRuntime.destroy();
}

/**
 * @function postToShell()
 * @description posts requests to flp shell
 * @param req
 * @returns Promise<{}>
 */
export function postToShell(req) {
  return appRuntime.postToShell(req);
}

/**
 * @function on()
 * @description registers post message handlers
 * @param service
 * @param handler
 */
export function on(service, handler) {
  return appRuntime.on(service, handler);
}
