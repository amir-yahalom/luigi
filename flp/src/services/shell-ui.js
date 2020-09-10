import { postToShell } from '../base';

export function setShellTitle(title) {
  const service = 'sap.ushell.services.ShellUIService.setTitle';
  const body = {
    sTitle: title,
  };

  return postToShell({ service, body });
}

export function showShellUIBlocker(show) {
  const service = 'sap.ushell.services.ShellUIService.showShellUIBlocker';
  const body = {
    bShow: show,
  };

  return postToShell({ service, body });
}

export function sendUrlAsEmail() {
  const service = 'sap.ushell.services.ShellUIService.sendUrlAsEmail';
  return postToShell({ service });
}

export function getShellGroupIDs() {
  const service = 'sap.ushell.services.ShellUIService.getShellGroupIDs';
  return postToShell({ service });
}

export function setDirtyFlag(isDirty) {
  const service = 'sap.ushell.services.ShellUIService.setDirtyFlag';
  const body = {
    bIsDirty: isDirty,
  };
  return postToShell({ service, body });
}

export function getFlpUrl(includeHash) {
  const service = 'sap.ushell.services.ShellUIService.getFLPUrl';
  const body = {
    bIncludeHash: includeHash,
  };
  return postToShell({ service, body });
}

export function addBookmarkDialog() {
  const service = 'sap.ushell.services.ShellUIService.addBookmarkDialog';
  const body = {};
  return postToShell({ service, body });
}
