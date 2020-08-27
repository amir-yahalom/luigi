import { AppRuntimeConfig, IAppRuntime } from './internal/app-runtime';
import { PostMessageRequest } from './internal/post-message-proxy';
export declare function init(cfg?: AppRuntimeConfig): IAppRuntime;
export declare function destroy(): void;
export declare function postToShell(req: PostMessageRequest): Promise<any>;
export declare function on(service: string, handler: (...args: any[]) => void): void;
