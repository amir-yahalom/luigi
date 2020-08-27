import {
  PostMessageProxy,
  TargetWindow,
  SelfWindow,
  PostMessageRequest,
  PostMessageProxyConfig,
} from './post-message-proxy';
import { MessageData } from './commons';

export interface AppRuntimeConfig extends PostMessageProxyConfig {}

export interface IAppRuntime {
  on(service: string, handler: (msg: MessageData) => void): void;
  postToShell(msg: PostMessageRequest): Promise<any>;
}

class AppRuntime implements IAppRuntime {
  private proxy: PostMessageProxy = null as any;

  init(cfg: AppRuntimeConfig = {}): IAppRuntime {
    this.proxy = new PostMessageProxy(cfg as PostMessageProxyConfig);
    this.proxy.init();
    return this;
  }

  destroy() {
    if (this.proxy) {
      this.proxy.destroy();
    }
  }

  on(service: string, handler: (msg: MessageData) => void): void {
    this.proxy.on(service, handler);
  }

  postToShell(msg: PostMessageRequest): Promise<any> {
    return this.proxy.postToShell(msg);
  }
}

const appRuntime = new AppRuntime();

export default appRuntime;
