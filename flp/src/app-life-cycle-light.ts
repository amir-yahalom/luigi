import { postToShell, on } from './base';
import { MessageData } from './internal/commons';
import { AppLifeCycleMessageData } from './app-life-cycle';

export interface AppLifeCycleLightHandler {
  open: (url: string) => void;
}

export function useAppLifeCycleEventsLight(handler: AppLifeCycleLightHandler) {
  // register as a stateful container in order to get events from launchpad
  postToShell({
      service: 'sap.ushell.services.appLifeCycle.setup',
      body: {
        isStateful: true,
        session: { bLogoutSupport: false }  // TODO expose this
      }
  });

  on('sap.ushell.services.appLifeCycle.create', (msg: AppLifeCycleMessageData) => {
    if (msg.body) {
      const url = msg.body.sUrl;
      setTimeout(() => handler.open(url));
      postToShell({ id: msg.request_id, service: msg.service, status: 'success', type: 'response' });
    }
  });

  on('sap.ushell.services.appLifeCycle.destroy', (msg: MessageData) => {
    postToShell({ id: msg.request_id, service: msg.service, status: 'success', type: 'response' });
  });
}
