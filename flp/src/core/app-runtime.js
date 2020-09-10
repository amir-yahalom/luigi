import {PostMessageProxy} from './post-message-proxy';

class AppRuntime {
  // proxy = null;

  init(cfg = {}) {
    if (!this.proxy) {
        this.proxy = new PostMessageProxy(cfg);
        this.proxy.init();
    }
    return this;
  }

  destroy() {
    if (this.proxy) {
      this.proxy.destroy();
    }
  }

  on(service, handler) {
    this.proxy.on(service, handler);
  }

  postToShell(msg) {
    return this.proxy.postToShell(msg);
  }
}

const appRuntime = new AppRuntime();

export default appRuntime;
