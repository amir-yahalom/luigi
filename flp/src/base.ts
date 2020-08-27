import appRuntime, { AppRuntimeConfig, IAppRuntime } from './internal/app-runtime';
import { PostMessageRequest, SelfWindow, TargetWindow } from './internal/post-message-proxy';

export function init(cfg?: AppRuntimeConfig): IAppRuntime {
  appRuntime.init(cfg);
  return appRuntime;
}

export function destroy(): void {
  appRuntime.destroy();
}

export function postToShell(req: PostMessageRequest): Promise<any> {
  return appRuntime.postToShell(req);
}

export function on(service: string, handler: (...args: any[]) => void) {
  return appRuntime.on(service, handler);
}
