import { init, destroy, postToShell, on } from './base';
import { parseMessageData, parseService, getUrlParam } from './core/commons';
// import { AppRuntimeHandlers, registerHandlers } from './flp-handlers';
import {
    navigateInternal,
    navigateExternal,
    getLinks,
    isNavigationSupported,
    isIntentSupported,
    historyBack,
    getInnerAppStateData,
    setInnerAppStateData,
    getDistinctSemanticObjects,
} from './services/nav';

import {
    setShellTitle,
    showShellUIBlocker,
    sendUrlAsEmail,
    getShellGroupIDs,
    setDirtyFlag,
    getFlpUrl,
    addBookmarkDialog,
} from './services/shell-ui'

const facade = {
  use(handlers) {
    // this._destroyHandlers = registerHandlers(handlers);
    return this;
  },

  init(cfg = { allowedOrigins: { '*': true } }) {
    init(cfg);
    return this;
  },

  destroy() {
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
};

export default facade;
