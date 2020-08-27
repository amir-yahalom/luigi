/// <reference types="node" />
import { EventEmitter } from 'events';
import { MessageData, Message } from './commons';
export interface TargetWindow {
    postMessage: (msg: any, origin: string) => void;
}
export interface SelfWindow {
    addEventListener: (e: string, h: (val?: any) => void) => void;
    removeEventListener: (e: string, h: (val?: any) => void) => void;
}
export interface PostMessageRequest extends MessageData {
    origin?: string;
    id?: string;
    timeout?: number;
}
interface Deferred {
    promise: Promise<any>;
    reject: (reason?: any) => void;
    resolve: (value?: any) => void;
}
export interface PostMessageProxyConfig {
    allowedOrigins?: {
        [key: string]: boolean;
    };
    targetWindow?: TargetWindow;
    selfWindow?: SelfWindow;
}
export declare class PostMessageProxy extends EventEmitter {
    targetWindow: TargetWindow;
    selfWindow: SelfWindow;
    listener: (msg: Message) => void;
    /**
     * Holds whitelisted/blacklisted origins for Post Message communication
     * @type { [string]: boolean }
     */
    origins: {
        [key: string]: boolean;
    };
    /**
     * Holds pending promises to be resolved once the shell responds
     * @type { [string]: Promise }
     */
    pending: {
        [key: string]: Deferred;
    };
    constructor(cfg: PostMessageProxyConfig);
    init(): void;
    destroy(): void;
    handleMessage(msg: Message): void;
    handleResponseMessage(data: MessageData): void;
    handleRequestMessage(data: MessageData): void;
    postErrorResponse(msg: any, e: Error): Promise<any>;
    postToShell(msg: PostMessageRequest): Promise<any>;
    private cleanPending;
    private defaultOrigin;
    removeEventListener(e: string, h: (val?: any) => void): void;
    addEventListener(e: string, h: (val?: any) => void): void;
}
export {};
