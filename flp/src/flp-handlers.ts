import { AppLifeCycleHandler, useAppLifeCycleEvents } from './app-life-cycle';
import { AppLifeCycleLightHandler, useAppLifeCycleEventsLight } from './app-life-cycle-light';
import { SessionHandler, useSessionHandler } from './session-handler';

export interface AppRuntimeHandlers {
  sessionHandler?: SessionHandler;
  appLifeCycle?: AppLifeCycleHandler;
  appLifeCycleLight?: AppLifeCycleLightHandler;
}

export function registerHandlers(handlers: AppRuntimeHandlers): () => void {
  const destroyers: Array<() => void> = [];
  if (handlers.sessionHandler) {
    let destroy = useSessionHandler(handlers.sessionHandler);
    destroyers.push(destroy);
  }
  if (handlers.appLifeCycle) {
    useAppLifeCycleEvents(handlers.appLifeCycle);
  }
  if (handlers.appLifeCycleLight) {
    useAppLifeCycleEventsLight(handlers.appLifeCycleLight);
  }

  return () => {
    for (let destroy of destroyers) {
      destroy();
    }
  };
}
