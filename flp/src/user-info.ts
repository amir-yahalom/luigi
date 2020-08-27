import { postToShell } from './base';

export interface IUserInfo {
  getThemeList(title: string): Promise<any>;
}

export function getThemeList(): Promise<any> {
  const service = 'sap.ushell.services.UserInfo.getThemeList';
  const body = {};

  return postToShell({ service, body });
}
