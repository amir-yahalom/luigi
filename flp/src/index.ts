import { init, destroy, postToShell, on } from './base';
import { AppRuntimeConfig, IAppRuntime } from './internal/app-runtime';
import { parseMessageData, parseService, getUrlParam, ICommon } from './internal/commons';
import { AppRuntimeHandlers, registerHandlers } from './flp-handlers';
import {
  navigateInternal,
  navigateExternal,
  getLinks,
  INavigation,
  isNavigationSupported,
  isIntentSupported,
  historyBack,
  getInnerAppStateData,
  setInnerAppStateData,
  getDistinctSemanticObjects,
} from './nav';
import {
  setShellTitle,
  showShellUIBlocker,
  IShellUi,
  sendUrlAsEmail,
  getShellGroupIDs,
  setDirtyFlag,
  getFlpUrl,
  addBookmarkDialog,
} from './shell-ui';
import { getThemeList, IUserInfo } from './user-info';

export interface AppRuntimeFacade extends ICommon, IAppRuntime, INavigation, IShellUi, IUserInfo {
  use(handlers: AppRuntimeHandlers): AppRuntimeFacade;
  destroy(): void;
  init(cfg?: AppRuntimeConfig): AppRuntimeFacade;
  _destroyHandlers?(): void;
}

const facade: AppRuntimeFacade = {
  use(handlers: AppRuntimeHandlers): AppRuntimeFacade {
    this._destroyHandlers = registerHandlers(handlers);
    return this;
  },

  init(cfg: AppRuntimeConfig = { allowedOrigins: { '*': true } }): AppRuntimeFacade {
    init(cfg);
    return this;
  },

  destroy(): void {
    if (this._destroyHandlers) {
      this._destroyHandlers();
    }
    destroy();
  },

  // base
  postToShell,
  on,

  // utils
  parseMessageData,
  parseService,
  getUrlParam,

  // navigation
  navigateInternal,
  navigateExternal,
  isNavigationSupported,
  isIntentSupported,
  getLinks,
  historyBack,
  getInnerAppStateData,
  setInnerAppStateData,
  getDistinctSemanticObjects,

  // shell ui
  setShellTitle,
  showShellUIBlocker,
  sendUrlAsEmail,
  getShellGroupIDs,
  setDirtyFlag,
  getFlpUrl,
  addBookmarkDialog,

  // user info
  getThemeList,
};

export default facade;
