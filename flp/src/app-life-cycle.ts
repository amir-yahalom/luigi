import { on, postToShell } from './base';
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
export function useAppLifeCycleEvents(handler: AppLifeCycleHandler) {
  // register as a stateful container in order to get events from launchpad
  postToShell({ service: 'sap.ushell.services.appLifeCycle.setup', body: { isStateful: true } });

  on('sap.ushell.services.appLifeCycle.create', handler.create);
  on('sap.ushell.services.appLifeCycle.destroy', handler.destroy);
}
