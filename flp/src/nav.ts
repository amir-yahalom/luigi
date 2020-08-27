import { postToShell } from './base';

export interface INavigation {
  navigateExternal(intent: Intent): Promise<any>;
  isNavigationSupported(intent: Intent): Promise<any>;
  isIntentSupported(aIntents: Array<string>): Promise<any>;
  navigateInternal(innerRoute: string): Promise<any>;
  getLinks(query: IntentQuery): Promise<IntentQueryResults>;
  historyBack(steps: number): Promise<any>;
  getInnerAppStateData(appStateKey: string): Promise<any>;
  setInnerAppStateData(data: string): Promise<any>;
  getDistinctSemanticObjects(): Promise<any>;
}

export interface Intent {
  hash?: string;
  semanticObject?: string;
  action?: string;
  params?: { [key: string]: string };
  parameters?: { [key: string]: string }; //used by isNavigationSupported
}

export interface IntentQuery {
  semanticObject: string;
  params?: { [key: string]: string };
}

export interface IntentQueryResults {
  intent: string;
  text: string;
}

export function navigateExternal({ hash, semanticObject, action, params = {} }: Intent): Promise<any> {
  const service = 'sap.ushell.services.CrossApplicationNavigation.toExternal';
  let target;

  if (hash) {
    target = { shellHash: hash };
  } else {
    target = {
      semanticObject,
      action,
    };
  }
  const body = {
    oArgs: {
      target,
      params,
    },
  };

  return postToShell({ service, body });
}

export function isNavigationSupported({ hash, semanticObject, action, parameters = {} }: Intent): Promise<any> {
  const service = 'sap.ushell.services.CrossApplicationNavigation.isNavigationSupported';
  let target;

  if (hash) {
    target = { shellHash: hash };
  } else {
    target = {
      semanticObject,
      action,
    };
  }
  const body = {
    aIntents: [
      {
        target,
        parameters,
      },
    ],
  };

  return postToShell({ service, body });
}

export function isIntentSupported(aIntents: Array<string>): Promise<any> {
  const service = 'sap.ushell.services.CrossApplicationNavigation.isIntentSupported';

  const body = {
    aIntents: [...aIntents],
  };
  return postToShell({ service, body });
}

export function navigateInternal(innerRoute: string = '/'): Promise<any> {
  const service = 'sap.ushell.services.CrossApplicationNavigation.setInnerAppRoute';
  const body = {
    appSpecificRoute: prepareInnerRoute(innerRoute),
  };
  return postToShell({ service, body });
}

export function getLinks({ semanticObject, params = {} }: IntentQuery): Promise<IntentQueryResults> {
  const service = 'sap.ushell.services.CrossApplicationNavigation.getLinks';
  const body = {
    semanticObject,
    params,
  };
  return postToShell({ service, body });
}

export function historyBack(steps: number): Promise<any> {
  const service = 'sap.ushell.services.CrossApplicationNavigation.historyBack';
  const body = {
    iSteps: steps,
  };
  return postToShell({ service, body });
}

export function getInnerAppStateData(appStateKey: string): Promise<any> {
  const service = 'sap.ushell.services.CrossApplicationNavigation.getAppStateData';
  const body = {
    sAppStateKey: appStateKey,
  };
  return postToShell({ service, body });
}

export function setInnerAppStateData(data: string): Promise<any> {
  const service = 'sap.ushell.services.CrossApplicationNavigation.setInnerAppStateData';
  const body = {
    sData: data,
  };
  return postToShell({ service, body });
}

export function getDistinctSemanticObjects(): Promise<any> {
  const service = 'sap.ushell.services.NavTargetResolution.getDistinctSemanticObjects';
  const body = {};
  return postToShell({ service, body });
}

function prepareInnerRoute(innerRoute: string = '/'): string {
  const start = innerRoute.charAt(0);
  if (start !== '/' && start !== '&') {
    innerRoute = '/' + innerRoute;
  }
  if (start !== '&') {
    innerRoute = '&' + innerRoute;
  }
  return innerRoute;
}
