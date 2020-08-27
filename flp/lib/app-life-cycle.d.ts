import { MessageData } from './internal/commons';
export interface AppLifeCycleMessageData extends MessageData {
    body: {
        sUrl: string;
    };
}
export interface AppLifeCycleHandler {
    create: (msg: AppLifeCycleMessageData) => void;
    destroy: (msg: MessageData) => void;
}
/**
 * @WIP
 */
export declare function useAppLifeCycleEvents(handler: AppLifeCycleHandler): void;
