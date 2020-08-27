import { AppLifeCycleHandler } from './app-life-cycle';
import { AppLifeCycleLightHandler } from './app-life-cycle-light';
import { SessionHandler } from './session-handler';
export interface AppRuntimeHandlers {
    sessionHandler?: SessionHandler;
    appLifeCycle?: AppLifeCycleHandler;
    appLifeCycleLight?: AppLifeCycleLightHandler;
}
export declare function registerHandlers(handlers: AppRuntimeHandlers): () => void;
