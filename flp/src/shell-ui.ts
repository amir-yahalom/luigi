import { postToShell } from './base';

export interface IShellUi {
  setShellTitle(title: string): Promise<any>;
  showShellUIBlocker(show: boolean): Promise<any>;
  sendUrlAsEmail(): Promise<any>;
  getShellGroupIDs(): Promise<any>;
  setDirtyFlag(isDirty: boolean): Promise<any>;
  getFlpUrl(includeHash: boolean): Promise<any>;
  addBookmarkDialog(): Promise<any>;
}

export interface AppInfo {
  title: string;
  icon?: string;
  subtitle?: string;
  intent: string;
}

export interface Bookmark {
  title: string;
  url: string;
  icon: string;
  info?: string;
  subtitle?: string;
  serviceUrl?: string;
  serviceRefreshInterval?: string;
  numberUnit?: string;
}

export function setShellTitle(title: string): Promise<any> {
  const service = 'sap.ushell.services.ShellUIService.setTitle';
  const body = {
    sTitle: title,
  };

  return postToShell({ service, body });
}

export function showShellUIBlocker(show: boolean): Promise<any> {
  const service = 'sap.ushell.services.ShellUIService.showShellUIBlocker';
  const body = {
    bShow: show,
  };

  return postToShell({ service, body });
}

export function sendUrlAsEmail(): Promise<any> {
  const service = 'sap.ushell.services.ShellUIService.sendUrlAsEmail';
  return postToShell({ service });
}

export function getShellGroupIDs(): Promise<any> {
  const service = 'sap.ushell.services.ShellUIService.getShellGroupIDs';
  return postToShell({ service });
}

export function setDirtyFlag(isDirty: boolean): Promise<any> {
  const service = 'sap.ushell.services.ShellUIService.setDirtyFlag';
  const body = {
    bIsDirty: isDirty,
  };
  return postToShell({ service, body });
}

export function getFlpUrl(includeHash: boolean): Promise<any> {
  const service = 'sap.ushell.services.ShellUIService.getFLPUrl';
  const body = {
    bIncludeHash: includeHash,
  };
  return postToShell({ service, body });
}

/**
 * @WIP
 */
export function setHierarchy(hierarchyLevels: Array<AppInfo>): Promise<any> {
  const service = 'sap.ushell.services.ShellUIService.setHierarchy';
  const body = {
    aHierarchyLevels: hierarchyLevels,
  };
  return postToShell({ service, body });
}

/**
 * @WIP
 */
export function setRelatedApps(relatedApps: Array<AppInfo>): Promise<any> {
  const service = 'sap.ushell.services.ShellUIService.setRelatedApps';
  const body = {
    aRelatedApps: relatedApps,
  };
  return postToShell({ service, body });
}

/**
 * @WIP
 */
export function addBookmark(bookmark: Bookmark, groupId: string): Promise<any> {
  const service = 'sap.ushell.services.ShellUIService.addBookmark';
  const body = {
    oParameters: bookmark,
    groupId: groupId,
  };
  return postToShell({ service, body });
}

export function addBookmarkDialog(): Promise<any> {
  const service = 'sap.ushell.services.ShellUIService.addBookmarkDialog';
  const body = {};
  return postToShell({ service, body });
}
