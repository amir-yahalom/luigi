import { postToShell } from '../base';

export function navigateExternal({ hash, semanticObject, action, params = {} }) {
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

export function isNavigationSupported({ hash, semanticObject, action, parameters = {} }) {
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

export function isIntentSupported(aIntents) {
  const service = 'sap.ushell.services.CrossApplicationNavigation.isIntentSupported';

  const body = {
    aIntents: [...aIntents],
  };
  return postToShell({ service, body });
}

export function navigateInternal(innerRoute = '/') {
  const service = 'sap.ushell.services.CrossApplicationNavigation.setInnerAppRoute';
  const body = {
    appSpecificRoute: prepareInnerRoute(innerRoute),
  };
  return postToShell({ service, body });
}

export function getLinks({ semanticObject, params = {} }) {
  const service = 'sap.ushell.services.CrossApplicationNavigation.getLinks';
  const body = {
    semanticObject,
    params,
  };
  return postToShell({ service, body });
}

export function historyBack(steps) {
  const service = 'sap.ushell.services.CrossApplicationNavigation.historyBack';
  const body = {
    iSteps: steps,
  };
  return postToShell({ service, body });
}

export function getInnerAppStateData(appStateKey) {
  const service = 'sap.ushell.services.CrossApplicationNavigation.getAppStateData';
  const body = {
    sAppStateKey: appStateKey,
  };
  return postToShell({ service, body });
}

export function setInnerAppStateData(data) {
  const service = 'sap.ushell.services.CrossApplicationNavigation.setInnerAppStateData';
  const body = {
    sData: data,
  };
  return postToShell({ service, body });
}

export function getDistinctSemanticObjects() {
  const service = 'sap.ushell.services.NavTargetResolution.getDistinctSemanticObjects';
  const body = {};
  return postToShell({ service, body });
}

function prepareInnerRoute(innerRoute = '/') {
  const start = innerRoute.charAt(0);
  if (start !== '/' && start !== '&') {
    innerRoute = '/' + innerRoute;
  }
  if (start !== '&') {
    innerRoute = '&' + innerRoute;
  }
  return innerRoute;
}
