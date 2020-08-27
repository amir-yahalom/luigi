import { PostMessageRequest, PostMessageProxyConfig } from './post-message-proxy';
import { MessageData } from './commons';
export interface AppRuntimeConfig extends PostMessageProxyConfig {
}
export interface IAppRuntime {
    on(service: string, handler: (msg: MessageData) => void): void;
    postToShell(msg: PostMessageRequest): Promise<any>;
}
declare class AppRuntime implements IAppRuntime {
    private proxy;
    init(cfg?: AppRuntimeConfig): IAppRuntime;
    destroy(): void;
    on(service: string, handler: (msg: MessageData) => void): void;
    postToShell(msg: PostMessageRequest): Promise<any>;
}
declare const appRuntime: AppRuntime;
export default appRuntime;
